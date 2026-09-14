# Le modèle de mail de Franck

Servi sur `https://devis.teckamenagement.fr/modele-mail/`, en `noindex`.

Franck écrit ses propres mails depuis sa boîte. Les treize mails de la séquence
partent de Brevo sans qu'il y touche, mais rien ne permettait à ses mails à lui
d'avoir la même allure. Cette page lui donne le modèle validé, prêt à poser.

## Les quatre pages

| Adresse | Ce que c'est |
| --- | --- |
| `/modele-mail/` | La page que Franck ouvre : le mode d'emploi, les aperçus, les boutons de copie |
| `/modele-mail/nu/` | Le modèle seul, rien autour, pour un ⌘A ⌘C propre depuis Safari |
| `/modele-mail/nu-signature/` | La signature seule, pour les réponses |
| `/modele-mail/nu-images/` | Le modèle avec les cinq images en `data:`, gardé en repli |

⚠️ Ces pages sont **générées**, jamais retouchées ici. La source vit dans
`~/os-marketing/QG/1-projets/teck-amenagement/production/publie/emails/generer-modele-franck.js`,
et la mise en forme vient de `gabarit-mail.js`, le même gabarit que les treize
mails de la séquence. Une retouche directe ici serait écrasée au prochain rendu,
et ce modèle deviendrait le seul mail de Teck à l'ancienne taille.

## L'application Mail du Mac

Vérifié le 14/09/2026 sur macOS 26.6.2, Mail 16 : la papeterie n'existe plus
dans l'application, son dossier a disparu du paquet. La signature est donc le
seul mécanisme qui pose du contenu tout seul dans un nouveau message, d'où le
choix de faire du modèle complet une signature, en-tête comprise.

Trois pièges, tous rencontrés pendant la mise au point :

- La case **« Toujours utiliser ma police de message par défaut »**, cochée par
  défaut sur une signature neuve, efface toute la mise en forme au collage.
- Le menu **« Choisir la signature : »** ne liste que les signatures du compte
  sélectionné dans la colonne de gauche. S'il paraît vide, c'est la sélection.
- L'éditeur de signature affiche des **cadres vides** à la place de l'en-tête et
  du logo. Il ne télécharge pas les images, alors que la fenêtre d'écriture, elle,
  les affiche. Ce n'est pas un échec du collage, c'est l'éditeur.

Chaîne vérifiée de bout en bout le 14/09/2026 : signature posée, mail envoyé,
en-tête et logo corrects à la réception dans Gmail. La variante `nu-images/`
n'a donc pas servi, elle reste au cas où un autre Mac se comporterait autrement.

## La largeur fixe est sur l'en-tête, pas sur le conteneur

Les media queries ne survivent à aucun collage, ni dans Mail ni dans Gmail. Or
c'est le bloc `<style>` du gabarit qui repasse le conteneur de `width:600px` à
`width:100%` sous 620 px. Le modèle collé doit donc s'adapter sans elles, et les
deux Gmail se comportent de façon opposée. Mesuré sur le mail réellement reçu,
le 14/09/2026 :

- sur **téléphone**, Gmail dimensionne le message sur la largeur que son contenu
  réclame, puis dézoome le tout pour le faire tenir. Le gabarit réclamant 624 px,
  tout le message tombait à 62 %, texte compris ;
- sur **ordinateur**, Gmail se rétracte sur le contenu. Un conteneur en
  pourcentage s'y effondre, il est descendu à environ 250 px.

Toute largeur fixe déclenche donc le dézoom sur téléphone, et son absence fait
s'effondrer l'ordinateur. Sans media query, aucune écriture ne satisfait les deux.

La sortie retenue déplace la largeur fixe du conteneur vers l'en-tête. Le
conteneur passe en pourcentage, et c'est l'image d'en-tête, en 440 px fixes, qui
donne sa largeur au bloc sur ordinateur. Comme 440 px tiennent presque dans un
écran de téléphone, le dézoom devient négligeable là où il valait 62 %.

Mesuré sur le fichier généré, bloc `<style>` retiré, dans les quatre contextes :

| contexte | conteneur | en-tête | débordement |
| --- | --- | --- | --- |
| ordinateur, conteneur large | 600 px | 440 px | aucun |
| ordinateur, conteneur rétractable | 440 px | 440 px | aucun |
| téléphone 390 px | 366 px | 366 px | aucun |
| téléphone 430 px | 406 px | 406 px | aucun |

⚠️ Le prix payé : sur ordinateur le bloc peut faire 440 px au lieu de 600 selon
la façon dont le client dimensionne le message. L'en-tête, elle, garde exactement
les 440 px validés par Franck.

Le numéro de téléphone reçoit `white-space:nowrap` : à 366 px il se coupait entre
« 06 16 90 82 » et « 18 ».

⚠️ Ces trois réécritures ne valent QUE pour le modèle. `gabarit-mail.js` n'est
pas touché, et les treize mails de la séquence gardent exactement la forme validée
par Franck. Le script échoue bruyamment si le gabarit change de forme, plutôt que
de laisser le modèle repartir cassé sans prévenir.

## Ce qui reste ouvert, au 14/09/2026

La voie du copier-coller dans une signature est un cul-de-sac, et c'est acquis :
l'éditeur supprime le bloc `<style>`, donc la règle qui adapte le mail au
téléphone. Sans elle, une largeur fixe fait dézoomer le téléphone et son absence
fait s'effondrer l'ordinateur. Quatre essais l'ont montré, chacun réglant un côté
en cassant l'autre. Il n'y a pas de cinquième réglage à trouver, il faut changer
de voie.

Le modèle reste en l'état, en ligne et fonctionnel, avec le compromis décrit
plus haut. Rien n'a été transmis à Franck.

Trois pistes à instruire, par ordre de solidité :

1. **Une page pour écrire**, sur le modèle de `/relance-sms/` que Franck utilise
   déjà. Il tape son destinataire et son message, le mail part par l'API avec le
   gabarit exact, media queries comprises. Aucun collage, donc aucun de ces
   problèmes. C'est la seule piste qui garantit le résultat.
2. **Outlook**, évoqué par Lilian. À vérifier avant toute promesse : le moteur
   Windows ignore `max-width` et les media queries, et l'Outlook récent sur Mac
   n'a pas le même moteur. Rien ne dit pour l'instant que sa signature conserve
   le `<style>`.
3. **Écrire le fichier de signature directement** dans `~/Library/Mail`, avec le
   `<style>` intact. Le dossier est protégé par macOS, il faudrait un accès disque
   complet, et rien ne garantit que Mail conserve le bloc à l'envoi.
