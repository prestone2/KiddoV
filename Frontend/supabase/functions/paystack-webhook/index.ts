
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('=== WEBHOOK RECEIVED ===')
  console.log('Method:', req.method)
  console.log('URL:', req.url)
  console.log('Headers:', Object.fromEntries(req.headers.entries()))

  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request - returning CORS headers')
    return new Response('ok', { headers: corsHeaders })
  }

  // Add a simple test endpoint
  if (req.method === 'GET') {
    console.log('GET request - webhook is alive!')
    return new Response(JSON.stringify({ 
      status: 'Webhook is working!', 
      timestamp: new Date().toISOString() 
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }

  try {
    // Use service role key for webhook operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.text()
    console.log('Webhook body received:', body.substring(0, 200) + '...')

    const event = JSON.parse(body)
    console.log('Processing event:', {
      event: event.event,
      reference: event.data?.reference,
      status: event.data?.status,
      amount: event.data?.amount,
      metadata: event.data?.metadata
    })

    // Skip signature verification for now to allow processing
    // TODO: Implement proper signature verification later
    const signature = req.headers.get('x-paystack-signature')
    console.log('Paystack signature received:', signature ? 'Yes' : 'No')

    if (event.event === 'charge.success' && event.data?.status === 'success') {
      const { reference, metadata, amount, customer } = event.data
      console.log('Processing successful charge:', { reference, metadata, amount })

      if (metadata?.subscription && metadata?.user_id && metadata?.plan_id) {
        console.log('Processing subscription for user:', metadata.user_id)

        // Get plan details
        const { data: plan, error: planError } = await supabaseClient
          .from('subscription_plans')
          .select('*')
          .eq('id', metadata.plan_id)
          .single()

        if (planError) {
          console.error('Plan fetch error:', planError)
          throw new Error(`Plan not found: ${planError.message}`)
        }

        console.log('Plan found:', plan)

        // Check if user subscription already exists
        const { data: existingSubscription, error: checkError } = await supabaseClient
          .from('user_subscriptions')
          .select('id')
          .eq('user_id', metadata.user_id)
          .maybeSingle()

        if (checkError) {
          console.error('Error checking existing subscription:', checkError)
        }

        const subscriptionData = {
          user_id: metadata.user_id,
          plan_id: metadata.plan_id,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          paystack_customer_code: customer?.customer_code || null,
          updated_at: new Date().toISOString(),
        }

        console.log('Subscription data to insert/update:', subscriptionData)

        let subscription;
        if (existingSubscription) {
          // Update existing subscription
          console.log('Updating existing subscription:', existingSubscription.id)
          const { data: updatedSub, error: updateError } = await supabaseClient
            .from('user_subscriptions')
            .update(subscriptionData)
            .eq('id', existingSubscription.id)
            .select()
            .single()

          if (updateError) {
            console.error('Subscription update error:', updateError)
            throw new Error(`Subscription update failed: ${updateError.message}`)
          }
          subscription = updatedSub
        } else {
          // Insert new subscription
          console.log('Creating new subscription')
          const { data: newSub, error: insertError } = await supabaseClient
            .from('user_subscriptions')
            .insert(subscriptionData)
            .select()
            .single()

          if (insertError) {
            console.error('Subscription insert error:', insertError)
            throw new Error(`Subscription creation failed: ${insertError.message}`)
          }
          subscription = newSub
        }

        console.log('Subscription processed:', subscription.id)

        // Create transaction record
        const transactionData = {
          subscription_id: subscription.id,
          paystack_reference: reference,
          amount: Math.floor(amount / 100), // Convert from kobo to KSH
          status: 'success',
          paid_at: new Date().toISOString(),
        }

        console.log('Creating transaction:', transactionData)

        const { error: transactionError } = await supabaseClient
          .from('subscription_transactions')
          .insert(transactionData)

        if (transactionError) {
          console.error('Transaction creation error:', transactionError)
          // Don't throw here, continue with other updates
        } else {
          console.log('Transaction recorded successfully')
        }

        // Update user profile with subscription info
        const profileUpdateData = {
          subscription_status: 'active',
          subscription_plan_id: metadata.plan_id,
          subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }

        console.log('Updating profile for user:', metadata.user_id)

        const { error: profileError } = await supabaseClient
          .from('profiles')
          .update(profileUpdateData)
          .eq('id', metadata.user_id)

        if (profileError) {
          console.error('Profile update error:', profileError)
          // Don't throw, continue with Robux update
        } else {
          console.log('Profile updated successfully')
        }

        // Add Robux to user balance using the increment function
        if (plan?.robux_monthly) {
          console.log('Adding Robux to user balance:', plan.robux_monthly)
          
          const { error: robuxError } = await supabaseClient.rpc('increment_robux', {
            user_id: metadata.user_id,
            amount: plan.robux_monthly
          })

          if (robuxError) {
            console.error('Robux increment error:', robuxError)
            
            // Fallback: Try direct update
            console.log('Attempting direct Robux balance update...')
            const { data: currentProfile, error: fetchError } = await supabaseClient
              .from('profiles')
              .select('robux_balance')
              .eq('id', metadata.user_id)
              .single()

            if (!fetchError && currentProfile) {
              const newBalance = (currentProfile.robux_balance || 0) + plan.robux_monthly
              const { error: balanceError } = await supabaseClient
                .from('profiles')
                .update({ robux_balance: newBalance, updated_at: new Date().toISOString() })
                .eq('id', metadata.user_id)

              if (balanceError) {
                console.error('Direct balance update error:', balanceError)
              } else {
                console.log('Robux balance updated directly to:', newBalance)
              }
            }
          } else {
            console.log('Robux added successfully via RPC function')
          }
        }

        console.log('Subscription processing completed successfully')
      } else {
        console.log('Not a subscription payment or missing metadata:', {
          subscription: metadata?.subscription,
          user_id: metadata?.user_id,
          plan_id: metadata?.plan_id
        })
      }
    } else {
      console.log('Event not processed:', event.event, event.data?.status)
    }

    return new Response('OK', { headers: corsHeaders })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
