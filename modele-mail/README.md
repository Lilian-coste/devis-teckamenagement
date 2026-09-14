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

## Le modèle coule à gauche, sans conteneur

Les media queries ne survivent à aucun collage, ni dans Mail, ni dans Gmail, ni
dans aucun éditeur de texte enrichi. Or c'est le bloc `<style>` du gabarit qui
adapte le mail au téléphone. Les deux Gmail se comportent alors de façon opposée,
mesuré sur le mail réellement reçu le 14/09/2026 :

- sur **téléphone**, Gmail dimensionne le message sur la largeur que son contenu
  réclame, puis dézoome le tout pour le faire tenir. Le gabarit réclamant 624 px,
  tout tombait à 62 %, texte compris ;
- sur **ordinateur**, Gmail se rétracte sur le contenu, et un conteneur en
  pourcentage s'y effondre, jusqu'à environ 250 px.

Quatre réglages ont été essayés, chacun réglant un côté en cassant l'autre. Il
n'y avait pas de cinquième réglage à trouver : tant qu'il y a un conteneur de
largeur fixe à faire tenir, les deux sont irréconciliables.

La sortie, proposée par Lilian : **supprimer le conteneur**. Plus de bloc de
600 px centré, le mail coule à gauche comme n'importe quel mail écrit à la main,
sur le principe des signatures Merlin. Il n'y a alors plus aucune largeur à faire
tenir, donc plus rien à dézoomer ni à effondrer. La seule largeur qui reste est
celle de l'image d'en-tête, 440 px, avec `max-width:100%` pour qu'elle redescende
à la largeur de l'écran.

Mesuré sur le fichier généré, bloc `<style>` retiré :

| contexte | bloc | en-tête | débordement |
| --- | --- | --- | --- |
| ordinateur, conteneur large | 440 px | 440 px | aucun |
| ordinateur, conteneur rétractable | 440 px | 440 px | aucun |
| téléphone 390 px | 390 px | 390 px | aucun |
| téléphone 430 px | 430 px | 430 px | aucun |
| vieux téléphone 320 px | 320 px | 320 px | aucun |

Le point décisif est la deuxième ligne : les deux modèles d'ordinateur donnent
enfin la **même** réponse. C'est leur désaccord qui produisait les allers-retours.

Validé par Lilian le 14/09/2026, signature posée dans Mail et mail envoyé, lu
correctement dans Gmail sur ordinateur et sur téléphone.

⚠️ Ce que ça change par rapport au gabarit : plus de centrage, et le bloc fait
440 px au lieu de 600. L'en-tête garde exactement les 440 px validés par Franck.

Le numéro de téléphone reçoit `white-space:nowrap` : sur un écran étroit il se
coupait entre « 06 16 90 82 » et « 18 ».

⚠️ Ces réécritures ne valent QUE pour le modèle. `gabarit-mail.js` n'est pas
touché, et les treize mails de la séquence gardent exactement la forme validée
par Franck. Le script échoue bruyamment si le gabarit change de forme, plutôt que
de laisser le modèle repartir cassé sans prévenir.
