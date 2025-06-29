
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user_id, amount } = await req.json()

    if (!user_id || !amount) {
      throw new Error('Missing user_id or amount')
    }

    // Update user's Robux balance
    const { data, error } = await supabaseClient
      .from('profiles')
      .update({
        robux_balance: supabaseClient.raw(`COALESCE(robux_balance, 0) + ${amount}`)
      })
      .eq('id', user_id)
      .select('robux_balance')
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, new_balance: data.robux_balance }),
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
