# Déploiement et coûts

Ce projet est conçu pour être déployé facilement sur [Vercel](https://vercel.com) tout en maintenant un coût quasi nul, même avec des milliers de visiteurs.

## Pourquoi Vercel
- **Routing SPA gratuit** : avec le fichier `vercel.json`, toutes les routes `/preview/:slug` et `/site/:slug` sont servies côté client, évitant les 404 et sans coût supplémentaire.
- **Mise en cache CDN** : les assets statiques générés par `npm run build` sont distribués via CDN gratuitement sur les plans Hobby.
- **Fonctions edge facultatives** : les étapes lourdes (génération IA) sont déportées dans Supabase, donc Vercel n’exécute aucun code coûteux.

## Procédure optimisée
1. **Configurer les variables d’environnement** dans Vercel (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`).
2. **Déployer** via `vercel --prod` ou connexion Git. Chaque commit sur `main` déclenche un build statique.
3. **Supabase** conserve le code HTML généré par l’IA (`site_code`) et l’edge function `archive-site-code` stocke en plus un fichier `.html` statique par slug dans le bucket `site-archives`. Vous disposez ainsi d’une archive téléchargeable pour chaque projet.

## Réduction des coûts IA
- Le code du site est généré à la demande via l’API OpenAI (`gpt-4o-mini`).
- Mettez en place une **politique de régénération** : ne relancez la génération que si l’utilisateur modifie ses réponses.
- Surveillez les appels depuis le [dashboard Supabase Edge Functions](https://supabase.com/docs/guides/functions), ce qui permet de fixer des quotas si nécessaire.

## Alternatives gratuites
- **Netlify** : similaire à Vercel, compatible avec le build Vite. Vous pouvez pointer les webhooks GitHub vers Netlify tout en conservant Supabase pour la persistance.
- **GitHub Pages** : pour un rendu totalement statique (sans formulaire), exportez le contenu du site généré (champ `site_code` ou fichier depuis le bucket `site-archives`) et committez-le sur une branche dédiée.

## Déploiement automatique vers EdgeOne (optionnel)

Une fonction edge `deploy-edgeone` est disponible pour pousser automatiquement le HTML statique vers l’API EdgeOne Pages. Pour l’activer :

1. Définissez les variables d’environnement suivantes côté Supabase Functions :
   - `EDGEONE_API_TOKEN` (ne jamais exposer le token en front, utilisez les secrets Supabase).
   - `EDGEONE_PROJECT_ID` correspondant au projet EdgeOne cible.
   - Facultatif : `EDGEONE_API_BASE` si votre instance EdgeOne utilise une URL personnalisée.
2. Le front appelle automatiquement la fonction après l’archivage. Si les variables d’environnement sont absentes, le déploiement est ignoré et l’interface indique "Déploiement optionnel".
3. Surveillez les logs Supabase pour vérifier les retours de l’API EdgeOne et renouvelez le token avant son expiration (rotation recommandée).

> ⚠️ **Ne collez jamais votre token EdgeOne dans le code source.** Utilisez uniquement les secrets d’environnement pour éviter toute fuite.

Pour l’IA, ajoutez :

- Une clé Azure Bing Search (`AZURE_SEARCH_KEY`) pour alimenter la recherche d’inspirations réelles. Vous pouvez personnaliser l’URL via `AZURE_SEARCH_ENDPOINT` si votre ressource Azure utilise un endpoint personnalisé (par défaut `https://api.bing.microsoft.com/v7.0`).
- Une clé OpenAI (`OPENAI_API_KEY`) qui sert de solution de secours lorsque la recherche Azure n’est pas disponible ou qu’elle renvoie trop peu de résultats. Les réponses génératives (structuration du profil et génération du HTML) continuent d’utiliser cette clé.

Ajoutez également les secrets Supabase suivants :

- `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` pour permettre à la fonction `archive-site-code` de créer/mettre à jour le bucket `site-archives`. Sans ces valeurs, l’archivage est automatiquement ignoré.
- `EDGEONE_API_TOKEN` et `EDGEONE_PROJECT_ID` pour autoriser le déploiement automatique sur EdgeOne (optionnel).

Ces valeurs doivent être ajoutées aux secrets Supabase (ou via `supabase secrets set`). Le front-end ne voit jamais ces clés : seules les fonctions `structure-profile`, `search-inspirations`, `archive-site-code`, `deploy-edgeone` et `generate-site-code` y accèdent côté serveur et retournent les résultats au navigateur.

> Exemple de configuration CLI :
>
> ```bash
> supabase secrets set \
>   OPENAI_API_KEY=sk-xxx \
>   AZURE_SEARCH_KEY=xxx \
>   SUPABASE_URL=https://<project>.supabase.co \
>   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJ... \
>   EDGEONE_API_TOKEN=eo-xxx \
>   EDGEONE_PROJECT_ID=proj_xxx
> ```

Adaptez les valeurs à votre projet (`project-ref`) si vous utilisez la CLI (`--project-ref`).

Dans tous les cas, le stockage du HTML dans Supabase garantit que vous conservez une copie exploitable du site de chaque utilisateur, sans coûts d’hébergement supplémentaires.
