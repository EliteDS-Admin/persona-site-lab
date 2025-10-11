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
    const { deepAnswers, siteType, language } = await req.json();
    console.log('Searching inspirations for:', { siteType, language, answersLength: deepAnswers.length });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const prompt = language === 'fr' 
      ? `Basé sur ces informations utilisateur pour un site ${siteType === 'personal' ? 'personnel' : 'professionnel'}: "${deepAnswers}"

Génère exactement 5 inspirations de sites web réels et existants. Pour chaque inspiration, fournis:
- title: Nom du site (court et descriptif)
- url: URL réelle du site
- domain: Nom de domaine uniquement
- justification: Pourquoi ce site est pertinent (1 phrase en français)

Format JSON uniquement, aucun texte supplémentaire.`
      : `Based on this user information for a ${siteType === 'personal' ? 'personal' : 'business'} website: "${deepAnswers}"

Generate exactly 5 real, existing website inspirations. For each inspiration, provide:
- title: Site name (short and descriptive)
- url: Real site URL
- domain: Domain name only
- justification: Why this site is relevant (1 sentence in English)

JSON format only, no additional text.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a web design expert. Return only valid JSON array with exactly 5 items. Each item must have: id (uuid), title, url, image (use https://images.unsplash.com/photo-* URLs), domain, justification.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    let inspirations;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      inspirations = JSON.parse(jsonStr);
      
      // Ensure each inspiration has an id and proper image
      inspirations = inspirations.map((insp: any, idx: number) => ({
        id: insp.id || crypto.randomUUID(),
        title: insp.title,
        url: insp.url,
        image: insp.image || `https://images.unsplash.com/photo-${1486312338219 + idx}?w=400&h=300&fit=crop`,
        domain: insp.domain,
        justification: insp.justification
      }));
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse inspirations from AI response');
    }

    console.log('Generated inspirations:', inspirations.length);

    return new Response(JSON.stringify({ inspirations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in search-inspirations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to search inspirations';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
