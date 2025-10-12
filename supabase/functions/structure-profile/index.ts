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
    const { deepAnswers, siteType, selectedInspirations, language } = await req.json();
    console.log('Structuring profile for:', { siteType, language, inspirationsCount: selectedInspirations.length });

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const inspirationsText = selectedInspirations.map((i: any) => 
      `${i.title} (${i.domain}): ${i.justification}`
    ).join('\n');

    const prompt = language === 'fr'
      ? `Transforme ces informations en un profil structuré pour un site ${siteType === 'personal' ? 'personnel' : 'professionnel'}:

RÉPONSES: "${deepAnswers}"

INSPIRATIONS CHOISIES:
${inspirationsText}

Génère un JSON avec cette structure exacte:
{
  "name": "Nom complet de la personne/entreprise",
  "title": "Titre professionnel ou slogan",
  "description": "Description courte (2-3 phrases)",
  "sections": [
    {
      "title": "Titre de section",
      "content": "Contenu développé"
    }
  ],
  "cta": {
    "text": "Texte du bouton",
    "link": "https://wa.me/XXXXXXXXXXX"
  },
  "colors": {
    "primary": "Couleur primaire en hex",
    "secondary": "Couleur secondaire en hex"
  }
}

3-4 sections minimum. Texte professionnel en français. JSON uniquement.`
      : `Transform this information into a structured profile for a ${siteType === 'personal' ? 'personal' : 'business'} website:

ANSWERS: "${deepAnswers}"

CHOSEN INSPIRATIONS:
${inspirationsText}

Generate JSON with this exact structure:
{
  "name": "Full name of person/company",
  "title": "Professional title or tagline",
  "description": "Short description (2-3 sentences)",
  "sections": [
    {
      "title": "Section title",
      "content": "Developed content"
    }
  ],
  "cta": {
    "text": "Button text",
    "link": "https://wa.me/XXXXXXXXXXX"
  },
  "colors": {
    "primary": "Primary color in hex",
    "secondary": "Secondary color in hex"
  }
}

Minimum 3-4 sections. Professional text in English. JSON only.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert copywriter and web designer. Return only valid JSON with the exact structure requested. No markdown, no explanations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI error (structure-profile):', response.status, errorText);
      throw new Error(`OpenAI error: ${response.status}`);
    }

    const data = await response.json();
    const choice = data.choices?.[0];
    let content: string | undefined;

    if (Array.isArray(choice?.message?.content)) {
      content = choice?.message?.content.map((part: { text?: string }) => part?.text ?? '').join('').trim();
    } else {
      content = choice?.message?.content;
    }

    if (!content) {
      throw new Error('Empty response from AI when structuring profile');
    }
    
    // Parse the JSON response
    let structuredProfile;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      structuredProfile = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse structured profile from AI response');
    }

    console.log('Generated structured profile for:', structuredProfile.name);

    return new Response(JSON.stringify({ structuredProfile }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in structure-profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to structure profile';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
