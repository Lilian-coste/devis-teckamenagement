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

⚠️ Les media queries ne survivent pas au collage, comme dans Gmail. Le modèle
posé porte la taille ordinateur partout ; sur un téléphone, l'en-tête se remet
à la largeur de l'écran grâce au `max-width` de l'image.
