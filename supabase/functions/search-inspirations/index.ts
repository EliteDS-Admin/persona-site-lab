import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

type InspirationItem = {
  id: string;
  title: string;
  url: string;
  image: string;
  domain: string;
  justification: string;
};

type AzureWebPage = {
  url?: string;
  name?: string;
  snippet?: string;
  description?: string;
  thumbnailUrl?: string;
};

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

    const AZURE_SEARCH_KEY = Deno.env.get('AZURE_SEARCH_KEY');
    const AZURE_SEARCH_ENDPOINT = Deno.env.get('AZURE_SEARCH_ENDPOINT') ?? 'https://api.bing.microsoft.com/v7.0';
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

    if (!AZURE_SEARCH_KEY && !OPENAI_API_KEY) {
      throw new Error('Neither AZURE_SEARCH_KEY nor OPENAI_API_KEY are configured');
    }

    const truncate = (text: string, length: number) =>
      text.length > length ? `${text.slice(0, length - 1).trim()}…` : text;

    const deepAnswersForQuery = truncate(deepAnswers.replace(/\s+/g, ' ').trim(), 180);

    const queryParts = [
      language === 'fr' ? 'inspiration site web' : 'website inspiration',
      siteType ? (language === 'fr' ? `type ${siteType === 'personal' ? 'personnel' : 'professionnel'}` : `${siteType} type`) : null,
      deepAnswersForQuery,
    ].filter(Boolean);

    const searchQuery = queryParts.join(' ');
    const inspirationsByDomain = new Map<string, InspirationItem>();
    const pushInspiration = (item: InspirationItem) => {
      if (!item?.domain || inspirationsByDomain.has(item.domain)) {
        return;
      }
      inspirationsByDomain.set(item.domain, item);
    };

    let azureInspirations: InspirationItem[] | undefined;

    if (AZURE_SEARCH_KEY) {
      try {
        const params = new URLSearchParams({
          q: searchQuery,
          count: '12',
          responseFilter: 'Webpages',
          mkt: language === 'fr' ? 'fr-FR' : 'en-US',
          safeSearch: 'Moderate',
          textDecorations: 'true',
        });
        const searchUrl = `${AZURE_SEARCH_ENDPOINT.replace(/\/$/, '')}/search?${params.toString()}`;
        const searchResponse = await fetch(searchUrl, {
          headers: {
            'Ocp-Apim-Subscription-Key': AZURE_SEARCH_KEY,
            'Accept': 'application/json',
          },
        });

        if (!searchResponse.ok) {
          const errorText = await searchResponse.text();
          console.error('Azure Search error:', searchResponse.status, errorText);
          throw new Error(`Azure Search error: ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();
        const results = Array.isArray(searchData?.webPages?.value)
          ? (searchData.webPages.value as AzureWebPage[])
          : [];

        const hasUrlAndName = (item: AzureWebPage): item is AzureWebPage & { url: string; name: string } =>
          typeof item.url === 'string' && typeof item.name === 'string';

        azureInspirations = results
          .filter(hasUrlAndName)
          .slice(0, 12)
          .map((item, idx) => {
            let domain = item.url;
            try {
              domain = new URL(item.url).hostname;
            } catch (error) {
              console.warn('Unable to parse domain from Azure result', error);
            }

            const image = typeof item.thumbnailUrl === 'string'
              ? `${item.thumbnailUrl}&w=800&h=600`
              : `https://images.unsplash.com/photo-${1486312338219 + (idx % 5)}?w=800&h=600&fit=crop`;

            const inspiration: InspirationItem = {
              id: crypto.randomUUID(),
              title: item.name,
              url: item.url,
              image,
              domain,
              justification: truncate(item.snippet ?? item.description ?? '', language === 'fr' ? 160 : 180) ||
                (language === 'fr'
                  ? 'Inspirations issues de la recherche Azure Bing.'
                  : 'Inspiration surfaced from Azure Bing search.'),
            };

            pushInspiration(inspiration);
            return inspiration;
          });

        if (azureInspirations.length > 0) {
          console.log('Azure search provided inspirations:', azureInspirations.length);
        } else {
          console.warn('Azure search returned no inspirations, falling back entirely to OpenAI');
        }
      } catch (error) {
        console.error('Azure Search failed:', error);
        azureInspirations = undefined;
      }
    }

    const neededCount = Math.max(5 - inspirationsByDomain.size, 0);

    if (neededCount > 0 && OPENAI_API_KEY) {
      const prompt = language === 'fr'
        ? `Basé sur ces informations utilisateur pour un site ${siteType === 'personal' ? 'personnel' : 'professionnel'}: "${deepAnswers}"

Génère exactement ${neededCount} inspirations de sites web réels et existants qui ne répètent pas les mêmes domaines que ${azureInspirations?.length ? 'ceux trouvés via Azure Bing' : 'ceux déjà fournis'}. Pour chaque inspiration, fournis:
- title: Nom du site (court et descriptif)
- url: URL réelle du site
- domain: Nom de domaine uniquement
- justification: Pourquoi ce site est pertinent (1 phrase en français)

Format JSON uniquement, aucun texte supplémentaire.`
        : `Based on this user information for a ${siteType === 'personal' ? 'personal' : 'business'} website: "${deepAnswers}"

Generate exactly ${neededCount} real, existing website inspirations that avoid repeating the same domains as ${azureInspirations?.length ? 'those found via Azure Bing' : 'the ones already provided'}. For each inspiration, provide:
- title: Site name (short and descriptive)
- url: Real site URL
- domain: Domain name only
- justification: Why this site is relevant (1 sentence in English)

JSON format only, no additional text.`;

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
              content: `You are a web design expert. Return only valid JSON array with exactly ${neededCount} items. Each item must have: id (uuid), title, url, image (use https://images.unsplash.com/photo-* URLs), domain, justification.`
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
        console.error('OpenAI error (search-inspirations):', response.status, errorText);
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
        throw new Error('Empty response from AI when searching inspirations');
      }

      try {
        const jsonMatch = content.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
        const jsonStr = jsonMatch ? jsonMatch[1] : content;
        const parsed = JSON.parse(jsonStr) as unknown;
        const candidates = Array.isArray(parsed) ? parsed : [];

        (candidates as Record<string, unknown>[]).forEach((raw, idx) => {
          const title = typeof raw.title === 'string' ? raw.title : undefined;
          const url = typeof raw.url === 'string' ? raw.url : undefined;
          const domain = typeof raw.domain === 'string' ? raw.domain : undefined;
          const justification = typeof raw.justification === 'string' ? raw.justification : undefined;
          const image = typeof raw.image === 'string'
            ? raw.image
            : `https://images.unsplash.com/photo-${1486312338219 + idx}?w=400&h=300&fit=crop`;
          const id = typeof raw.id === 'string' ? raw.id : crypto.randomUUID();

          if (!title || !url || !domain || !justification) {
            return;
          }

          const inspiration: InspirationItem = {
            id,
            title,
            url,
            image,
            domain,
            justification,
          };

          pushInspiration(inspiration);
        });
      } catch (parseError) {
        console.error('Failed to parse AI response:', content);
        throw new Error('Failed to parse inspirations from AI response');
      }
    }

    const inspirations = Array.from(inspirationsByDomain.values()).slice(0, 5);

    if (!inspirations.length) {
      throw new Error('No inspiration provider returned results');
    }

    console.log('Returning inspirations:', inspirations.length);

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
