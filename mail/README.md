# Images des emails Teck

Servies sur `https://devis.teckamenagement.fr/mail/`.

Un client mail ne sait pas embarquer une image : il lui faut une **URL absolue
publique**. Ce dossier existe pour ça, et il se redéploie tout seul à chaque
push, comme le reste du sous-domaine.

⚠️ Les images sont **générées**, jamais retouchées ici. La source vit dans
`~/mes-clients/teck-amenagement/livrables/emails/` :

| Script | Ce qu'il fabrique |
| --- | --- |
| `generer-bandeaux.py` | `bandeau-a-entete.png`, le bloc TECK AMÉNAGEMENT avec le séparateur dessiné entre les villes |
| `generer-signature.py` | le logo recadré et `nom-franck-noir.png` |

⚠️ Pourquoi des images et pas du texte : Helvetica Neue Light est la police de
la DA, aucun client mail ne charge de police web, et plusieurs ignorent le
`font-weight:300`. Écrit en texte, un titre en Light ressortirait en Regular
chez la moitié des destinataires. Rendu en image avec la vraie fonte système,
il est identique au pixel près partout.

Chaque image porte un `alt` complet dans le mail : images bloquées, le message
reste lisible.
