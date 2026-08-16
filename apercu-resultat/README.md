# Aperçu de la nouvelle page de résultat — TEMPORAIRE

**URL** : [https://devis.teckamenagement.fr/apercu-resultat/](https://devis.teckamenagement.fr/apercu-resultat/)

Créée le 15/08/2026. Copie de travail du chantier de la page de résultat, publiée sous le
sous-domaine Teck **uniquement pour que Lilian puisse la faire analyser par une IA**, qui
a besoin d'une URL publique pour aller la lire.

## ⚠️ Ce que cette page N'EST PAS

**Ce n'est pas la page d'atterrissage du quiz.** La vraie page de résultat reste
`561d79a-47b15060-85cc2f7b/`, dans son état d'avant le chantier, et c'est elle que Fillout
sert aux prospects. Cette copie n'est référencée nulle part.

## Les trois différences avec le chantier d'origine

1. **AUCUN PIXEL META, et c'est le point critique.** La vraie page tire un événement
   `Lead` à chaque chargement, et son garde-fou l'autorise précisément sur
   `devis.teckamenagement.fr`. Publier la copie telle quelle sous ce domaine aurait envoyé
   une fausse conversion à chaque visite, dans le pixel qui pilote les campagnes payantes
   de Franck. Le bloc a été **retiré**, pas désactivé. **Ne jamais le remettre ici.**
2. **`noindex, nofollow`** : rien à faire dans Google.
3. **Images et vidéo empruntées** au dossier de la vraie page
   (`../561d79a-47b15060-85cc2f7b/`). La VSL provisoire pèse 49 Mo, la recopier aurait
   doublé le poids du dépôt pour rien.

## À supprimer quand ?

Dès que l'analyse est faite et que le chantier repart en production, ou est abandonné.
C'est une page de travail, elle n'a pas vocation à rester.

## Pour la partager avec les paramètres de personnalisation

- `?prenom=Jean&profil=receveurs`
- profils possibles : `receveurs`, `cocon`, `quotidien`, plus `&aussi=` pour les secondaires
- sans paramètre, le badge dit « Félicitations ! » et la phrase de profil ne s'affiche pas

## Pour mettre cette page en production

⚠️ **La procédure par `git checkout 599e81d` est PÉRIMÉE.** Elle valait le 15/08, quand le
chantier vivait encore dans les commits `4c95d41` → `599e81d`. Depuis, **tout le travail est
allé dans ce dossier-ci**, pas dans ces commits : le titre par profil, la phrase sous le
titre, la flèche ➱, les libellés de bouton, le calage de largeur sur la vidéo. Reprendre
`599e81d` ferait perdre tout ça.

La procédure à jour est décrite pas à pas dans
`~/mes-clients/teck-amenagement/_handover-quiz-resultat-pdf.md`, section 2.3. En résumé :
copier `index.html` d'ici vers la vraie page, **y remettre le bloc pixel Meta**, retirer le
`noindex`, copier `reserver/`, et régler la question de la vidéo (le dossier `videos/` de la
vraie page est dans le `.gitignore`, il n'a jamais été déployé).
