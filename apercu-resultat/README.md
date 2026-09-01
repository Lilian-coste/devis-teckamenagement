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
- sans paramètre, la pastille dit « Votre projet a été estimé » et le titre garde
  sa moitié commune aux trois profils
- `?m2=24&cp=83000` affiche la fourchette d'estimation ; sans eux, la carte dit ce qui lui
  manque et pourquoi (⚠️ le quiz ne pose pas encore ces deux paramètres, voir plus bas)

## La grammaire visuelle vient de `apercu-moins-15k` (27/08/2026)

Lilian, sur enregistrement : « je veux beaucoup m'inspirer de cette page-là ». Tout ce qui a
été repris l'a été VALEUR PAR VALEUR depuis `apercu-moins-15k/index.html`, pas réécrit :

| Élément | Source là-bas | Nom ici |
|---|---|---|
| Le halo, deux masses floues qui dérivent | `.page .hero .halo` | `.halo` |
| La pastille « Votre diagnostic » | `.page .surtitre` | `.surtitre` |
| La flèche de défilement animée | `.page .suite` | `.fleche-suite` |
| Les sections nues, rond + titre + sous-titre | `.page section.sect` / `.bloc` | `section.sect` / `.bloc` |
| Les cartes numérotées 01-04 | `.page .facteurs` | `.facteurs` |
| L'apparition en cascade | `.page .reveal` | `.facteurs li.avant-vue` |

**La couleur du bandeau** est celle du halo : `rgba(62,142,180,.30)`, soit **#3E8EB4**, appliqué
en opaque. La seconde masse du halo est #7EC4FF. ⚠️ Blanc sur #3E8EB4 donne 3,66:1, sous les
4,5:1 du WCAG AA pour du texte de cette taille.

⚠️ **Le filet bleu de la carte de Franck n'existe PAS sur la page -15K.** Là-bas,
`.facteurs li::before` est un liseré de 3px qui balaie le bord HAUT seulement. Le filet qui
fait le tour est le mécanisme du `.border-beam-container` de cette page-ci. Les deux ont été
composés dans `.carte-filet`, rien n'a été inventé.

## L'ordre de la page (27/08/2026)

Tant que la VSL n'existe pas : bandeau → pastille « Jean, votre projet a été estimé » →
titre « Jean, votre projet a bien été pris en compte » → air → carte d'estimation → flèche
de défilement → section nue « l'échange avec Franck » avec sa carte au filet et son bouton
→ section nue « votre fiche projet » avec ses quatre cartes numérotées.

**`?video=1` montre l'autre version**, celle du jour où la VSL sera tournée : bandeau →
pastille → titre → phrase de vidéo → vidéo → bouton → carte d'estimation → fiche projet, et
**la section « échange avec Franck » disparaît**, la vidéo fait son travail. L'ordre est
obtenu par les `order` du CSS, aucun nœud n'est déplacé. La vidéo est celle de Villa
Impian, provisoire ; si le fichier manque, un cadre gris de la bonne taille prend sa place.

## La phrase de profil est en chapô sous le titre

« Vous faites partie des personnes qui aiment… » était le gros titre du 16/08 au 26/08. Le
titre porte maintenant « Jean, votre projet a bien été pris en compte », et la phrase reprend
sa place juste dessous, en **chapô** (`#hero-chapo`), rallumée par Lilian le 27/08/2026. Le
script de profil la remplit selon `?profil=` ; sans paramètre elle garde sa moitié commune
aux trois profils.

## ⚠️ Deux régressions du 27/08/2026, et leur cause unique

Lilian : « tu as réduit la largeur et la taille de la carte », et « le titre a été réduit sans
qu'on le détermine ensemble ». Aucune valeur de largeur ni de police n'avait pourtant bougé.

La cause était `.hero-bulle`, passée en `display: flex` pour porter les `order` de la variante
vidéo. **Un enfant de conteneur flex dont les marges latérales valent `auto` ne s'étire plus**,
il se dimensionne sur son contenu. `.hero-ttl` et `.estim-scene` sont tous deux en
`margin: 0 auto` : la carte est tombée de **880px à 508px**, le titre de **880px à 630px**.

Le correctif rend un `width: 100%` explicite à ces enfants. Ne jamais le retirer.

**La taille de police du titre, elle, n'a jamais changé** : 24px sur téléphone, 32px à partir
de 768px depuis le 16/08/2026, et c'est encore la valeur d'aujourd'hui. Si Lilian veut
vraiment l'augmenter, les deux valeurs de référence du dossier sont 28/38px (`.adv-ttl`, la
typo dont le hero est issu) et 28/42px (le `h1` de la page -15K, d'où vient ce titre).
**À décider avec lui, rien n'a été changé sans décision.**

## La carte grise « Réservez votre appel »

L'accroche et les quatre points ont quitté la bulle blanche le 27/08/2026 (« il y a trop de
texte dans la carte, ça fait vraiment trop compact »). Ils vivent maintenant dans une carte
grise à deux colonnes, avec sa propre pastille. Les ronds sont **cerclés au trait fin**
(`.liste-coches`) : les pastilles bleues pleines de `.suite-liste` ont été supprimées, Lilian
n'en veut plus. La bulle blanche ne garde que les deux phrases de réassurance, le bouton et
la mention d'avis.

## ⚠️ Ce qui manque pour que l'estimation s'affiche vraiment

Le quiz ne pose que `?profil=`, `&aussi=` et `&prenom=` dans l'URL de redirection
(`saas-interne/Fillout/app-quiz/lib/profil.ts`, fonction `urlAvecProfil`). Tant que `m2` et
`cp` n'y sont pas ajoutés, la carte gardera son texte « il nous manque la superficie » en
production. C'est volontaire : mieux vaut dire ce qui manque qu'afficher un montant faux.

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
