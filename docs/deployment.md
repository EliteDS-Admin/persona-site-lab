# Déploiement et coûts

Ce projet est conçu pour être déployé facilement sur [Vercel](https://vercel.com) tout en maintenant un coût quasi nul, même avec des milliers de visiteurs.

## Pourquoi Vercel
- **Routing SPA gratuit** : avec le fichier `vercel.json`, toutes les routes `/preview/:slug` et `/site/:slug` sont servies côté client, évitant les 404 et sans coût supplémentaire.
- **Mise en cache CDN** : les assets statiques générés par `npm run build` sont distribués via CDN gratuitement sur les plans Hobby.
- **Fonctions edge facultatives** : les étapes lourdes (génération IA) sont déportées dans Supabase, donc Vercel n’exécute aucun code coûteux.

## Procédure optimisée
1. **Configurer les variables d’environnement** dans Vercel (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`).
2. **Déployer** via `vercel --prod` ou connexion Git. Chaque commit sur `main` déclenche un build statique.
3. **Supabase** conserve le code HTML généré par l’IA (`site_code`). Cela vous donne une copie persistante et réutilisable du site généré sans stocker des fichiers sur Vercel.

## Réduction des coûts IA
- Le code du site est généré à la demande via l’API AI Gateway (modèle `openai/gpt-4o-mini`).
- Mettez en place une **politique de régénération** : ne relancez la génération que si l’utilisateur modifie ses réponses.
- Surveillez les appels depuis le [dashboard Supabase Edge Functions](https://supabase.com/docs/guides/functions), ce qui permet de fixer des quotas si nécessaire.

## Alternatives gratuites
- **Netlify** : similaire à Vercel, compatible avec le build Vite. Vous pouvez pointer les webhooks GitHub vers Netlify tout en conservant Supabase pour la persistance.
- **GitHub Pages** : pour un rendu totalement statique (sans formulaire), exportez le contenu du site généré (champ `site_code`) et committez-le sur une branche dédiée.

Dans tous les cas, le stockage du HTML dans Supabase garantit que vous conservez une copie exploitable du site de chaque utilisateur, sans coûts d’hébergement supplémentaires.
