import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BUCKET_ID = 'site-archives';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { slug, html } = await req.json();

    if (!slug || typeof slug !== 'string') {
      throw new Error('A valid slug is required to archive site code');
    }

    if (!html || typeof html !== 'string') {
      throw new Error('A valid HTML payload is required to archive site code');
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('Supabase service credentials missing, skipping archive.');
      return new Response(
        JSON.stringify({
          skipped: true,
          reason: 'Supabase service credentials are not configured',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
      },
    });

    const { data: buckets, error: listBucketsError } = await supabase.storage.listBuckets();
    if (listBucketsError) {
      console.error('Failed to list storage buckets:', listBucketsError.message);
      throw new Error('Unable to inspect storage buckets');
    }

    const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_ID) ?? false;

    if (!bucketExists) {
      const { error: createBucketError } = await supabase.storage.createBucket(BUCKET_ID, {
        public: true,
        fileSizeLimit: 15 * 1024 * 1024, // 15MB safety limit per archive
        allowedMimeTypes: ['text/html'],
      });

      if (createBucketError && createBucketError.message !== 'Bucket already exists') {
        console.error('Failed to create archive bucket:', createBucketError.message);
        throw new Error('Unable to create archive bucket');
      }
    }

    const archivePath = `${slug}/index.html`;

    const blob = new Blob([html], { type: 'text/html; charset=utf-8' });
    const { error: uploadError } = await supabase.storage.from(BUCKET_ID).upload(archivePath, blob, {
      upsert: true,
      contentType: 'text/html; charset=utf-8',
    });

    if (uploadError) {
      console.error('Failed to upload archive file:', uploadError.message);
      throw new Error('Unable to store archived site code');
    }

    const { data: publicUrlData } = supabase.storage.from(BUCKET_ID).getPublicUrl(archivePath, {
      download: slug,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        publicUrl: publicUrlData?.publicUrl ?? null,
        path: archivePath,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in archive-site-code:', error);
    const message = error instanceof Error ? error.message : 'Failed to archive site code';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
