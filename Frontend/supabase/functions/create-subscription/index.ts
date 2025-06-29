import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { planId, email } = await req.json()
    console.log('Creating subscription for:', { userId: user.id, planId, email })

    // Get plan details
    const { data: plan, error: planError } = await supabaseClient
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single()

    if (planError || !plan) {
      console.error('Plan error:', planError)
      throw new Error('Plan not found')
    }

    console.log('Plan found:', plan)

    // Get the origin for proper callback URL
    const origin = req.headers.get('origin') || req.headers.get('referer')?.split('/').slice(0, 3).join('/') || 'https://preview--blox-page-replica.lovable.app'
    
    // Initialize Paystack transaction with proper callback
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: plan.price_ksh * 100, // Convert to kobo
        email: email,
        currency: 'KES',
        callback_url: `${origin}/subscription?payment=success`,
        metadata: {
          user_id: user.id,
          plan_id: planId,
          subscription: true,
          plan_name: plan.name,
          robux_monthly: plan.robux_monthly,
          custom_fields: [
            {
              display_name: "User ID",
              variable_name: "user_id",
              value: user.id
            },
            {
              display_name: "Plan ID", 
              variable_name: "plan_id",
              value: planId
            },
            {
              display_name: "Subscription",
              variable_name: "subscription", 
              value: "true"
            }
          ]
        },
        channels: ['card', 'bank', 'ussd', 'mobile_money'],
      }),
    })

    const paystackData = await paystackResponse.json()
    console.log('Paystack response:', paystackData)

    if (!paystackData.status) {
      console.error('Paystack error:', paystackData.message)
      throw new Error(paystackData.message || 'Failed to initialize payment')
    }

    console.log('Payment initialized successfully with reference:', paystackData.data.reference)

    return new Response(
      JSON.stringify({
        authorization_url: paystackData.data.authorization_url,
        reference: paystackData.data.reference,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
