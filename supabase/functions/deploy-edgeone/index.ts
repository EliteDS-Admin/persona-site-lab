import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const EDGEONE_API_TOKEN = Deno.env.get('EDGEONE_API_TOKEN');
    const EDGEONE_PROJECT_ID = Deno.env.get('EDGEONE_PROJECT_ID');
    const EDGEONE_API_BASE = Deno.env.get('EDGEONE_API_BASE') ?? 'https://api.edgeone.ai';

    if (!EDGEONE_API_TOKEN || !EDGEONE_PROJECT_ID) {
      return new Response(
        JSON.stringify({
          skipped: true,
          reason: 'EdgeOne credentials are not configured.',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { slug, html, metadata } = await req.json();

    if (!slug || typeof slug !== 'string') {
      throw new Error('A valid slug is required for deployment');
    }

    if (!html || typeof html !== 'string') {
      throw new Error('Static HTML is required to deploy');
    }

    const payload = {
      slug,
      html,
      metadata: metadata ?? {},
    };

    const response = await fetch(`${EDGEONE_API_BASE}/pages/deploy/${EDGEONE_PROJECT_ID}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${EDGEONE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('EdgeOne deployment failed:', response.status, errorText);
      throw new Error(`EdgeOne deployment error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify({ ok: true, ...data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in deploy-edgeone:', error);
    const message = error instanceof Error ? error.message : 'Failed to deploy to EdgeOne';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
