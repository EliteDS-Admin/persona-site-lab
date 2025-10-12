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
    const { structuredProfile, deepAnswers, selectedInspirations, language } = await req.json();

    if (!structuredProfile) {
      throw new Error('structuredProfile is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const inspirationsText = (selectedInspirations || [])
      .map((inspiration: any) => `${inspiration.title} (${inspiration.domain}): ${inspiration.justification}`)
      .join('\n');

    const baseInstruction = `Tu es un designer front-end expert qui génère un site unique pour un client novice. Respecte ses réponses et gardes un ton accessible.`;

    const prompt = language === 'fr'
      ? `${baseInstruction}

DONNÉES DU CLIENT:
${JSON.stringify(structuredProfile, null, 2)}

CONTEXTE LIBRE:
${deepAnswers || 'Pas de précisions supplémentaires.'}

INSPIRATIONS DU CLIENT:
${inspirationsText || 'Aucune inspiration particulière'}

CONSIGNE:
Rédige un unique objet JSON avec cette forme exacte:
{
  "html": "..."
}

Le champ html doit contenir un template HTML réactif (sans <html> ni <body>) composé de sections modernes (hero, valeurs, services, témoignage ou appel à l'action) adaptés aux informations du client.
Utilise seulement des balises HTML sémantiques et du CSS inline ou des balises <style>. Aucune balise <script>, aucun import externe, aucune référence à la marque Site-Factory. Mets en avant les couleurs primaires et secondaires fournies. Utilise un ton chaleureux et professionnel.
`
      : `You are an expert front-end designer generating a unique website for a novice client. Honour their answers and keep the tone approachable.

CLIENT DATA:
${JSON.stringify(structuredProfile, null, 2)}

RAW CONTEXT:
${deepAnswers || 'No extra details provided.'}

CLIENT INSPIRATIONS:
${inspirationsText || 'No inspiration provided'}

INSTRUCTIONS:
Return a single JSON object with this exact shape:
{
  "html": "..."
}

The html field must contain a responsive HTML template (no <html> or <body> tags) with modern sections (hero, value proposition, services, testimonial or CTA) tailored to the client.
Use only semantic HTML tags with inline CSS or <style> blocks. No <script> tags, no external imports, and no mention of Site-Factory. Highlight the provided primary and secondary colours. Keep the tone warm and professional.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a front-end generator AI. You MUST respond with valid JSON only. No explanations, no markdown. Avoid <script> tags and unsafe attributes.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error (generate-site-code):', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from AI when generating site code');
    }

    let html: string | undefined;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      const parsed = JSON.parse(jsonStr);
      html = parsed.html;
    } catch (parseError) {
      console.error('Failed to parse AI HTML response:', content);
      throw new Error('Failed to parse generated HTML from AI response');
    }

    if (!html || typeof html !== 'string') {
      throw new Error('AI response did not include html content');
    }

    return new Response(JSON.stringify({ html }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-site-code:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate site code';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
