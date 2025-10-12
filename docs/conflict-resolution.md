# Résoudre les conflits de fusion pour `persona-site-lab`

Ce guide explique comment rétablir une branche de travail afin que la PR puisse
être fusionnée avec `main` sans erreur 404 sur Vercel.

## 1. Mettre à jour `main`

```bash
git checkout main
git pull origin main
```

Assurez-vous que la branche `main` reflète bien la version déployée.

## 2. Rebaser votre branche de travail

```bash
git checkout work
git fetch origin
# Si la branche distante s'appelle `work`, récupérez-la d'abord.
git rebase origin/main
```

Le rebase applique vos commits au sommet de la version actuelle de `main`.

## 3. Résoudre les conflits listés par GitHub

Pour chaque fichier signalé (ex. `src/components/steps/StepGeneration.tsx`),
ouvrez le fichier et gardez la version qui correspond à votre dernière
implémentation. Supprimez les marqueurs `<<<<<<<`, `=======`, `>>>>>>>`, puis
validez le fichier :

```bash
# après modification manuelle
git add src/components/steps/StepGeneration.tsx
```

Répétez jusqu'à ce que `git status` n'affiche plus de conflits.

## 4. Finaliser le rebase

```bash
git rebase --continue
```

S'il reste d'autres conflits, Git vous redemandera de les résoudre.

## 5. Tester localement

```bash
npm install
npm run build
```

Le build garantit que la version compilée (celle servie par Vercel) n'aura pas
d'erreur 404 et que la page `/site/:slug` est bien accessible.

## 6. Pousser les changements rebases

```bash
git push --force-with-lease origin work
```

Le `--force-with-lease` met à jour la PR sans écraser les commits des autres
contributeurs.

## 7. Relancer la prévisualisation Vercel

Une fois la PR rafraîchie, Vercel reconstruit automatiquement la preview. Vous
pouvez aussi déclencher un redeploy depuis le dashboard si nécessaire.

---

En suivant ces étapes, la PR n'affichera plus le message « Checks awaiting
conflict resolution » et le lien « Voir le site » pointera vers la version
fonctionnelle générée par l'IA.
