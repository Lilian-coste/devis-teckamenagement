# Aperçu de la page « budget déclaré sous 15 000 € » — VERSION DE TRAVAIL

Montée le 16/08/2026, d'après `saas-interne/Fillout/COPY-PAGE-MOINS-15K.md`.

**⏸️ EN LOCAL, PAS EN LIGNE.** Ce dossier ne doit pas être poussé tant que Lilian n'a pas
validé la page et que Franck n'a pas confirmé les chiffres.

## Voir la page

    http://192.168.0.111:3600/apercu-moins-15k/?prenom=Jean&m2=24&cp=83000

(serveur statique local : `python3 -m http.server 3600 --bind 0.0.0.0` depuis la racine du
dépôt ; l'IP change avec le réseau, la retrouver avec `ipconfig getifaddr en0`)

## Les paramètres d'URL

Tous facultatifs, la page reste lisible sans aucun.

| Paramètre | Effet |
|---|---|
| `prenom` | personnalise le titre (« Jean, votre projet a bien été pris en compte ») |
| `m2` | la superficie, elle déclenche l'estimation |
| `cp` | le code postal ; commence par 13 → 870 € HT/m², sinon 970 |
| tout le reste | recopié tel quel dans le lien vers la page de profil |

Sans `m2`, le bloc d'estimation garde son texte d'attente au lieu d'afficher un montant faux.

## Ce que la page fait

Elle ne dit pas non, elle **ré-ancre**. Le prospect qui déclare un budget bas ne dit pas ce
qu'il peut investir, il dit ce qu'il croyait que ça coûtait. La page transforme donc un
budget déclaré en compréhension du budget nécessaire, puis pose une question de **capacité**.

Sept sections : hero, pourquoi cet investissement, repositionnement, estimation, la question
de capacité avec ses deux chemins, le guide, les avis.

Le chemin « oui » redirige vers la page de profil en emportant les paramètres. Le chemin
« non » ne quitte pas la page, il descend au guide.

## ⚠️ Ce qui est en attente

| Quoi | Qui | Où |
|---|---|---|
| Les 4 facteurs de prix | **Franck** | liste `.facteurs` de la 2e section |
| La phrase sur les projets qui reviennent un an après | **Franck** | en commentaire dans la section guide, prête à décommenter |
| Confirmation des 870 / 970 € HT | **Franck** | script en bas de page |
| Le bouton du guide ne mène nulle part | Lilian | `#btn-guide`, le guide n'existe pas encore |

## Le piège Tailwind, et pourquoi tout est préfixé `.page`

Tailwind EST chargé, pour une seule raison : la section « Nos clients parlent de nous » est
reprise telle quelle des pages de profil, et elle est écrite en classes Tailwind.

Or son « preflight » remet h1 à h6 à la taille et à la graisse du texte courant, et il
s'injecte APRÈS la feuille de style de la page, donc il gagne à spécificité égale. Sans
garde-fou, tous les intertitres tombaient au corps du texte, collés au paragraphe suivant.

D'où le préfixe `.page` devant toute la typographie : il donne un cran de spécificité en
plus et met la page hors d'atteinte. **Ne pas « nettoyer » ce préfixe.**

## Aucun pixel Meta, et c'est délibéré

 La vraie page de résultat tire un `Lead` à chaque
chargement. Publier une copie sous le domaine Teck enverrait de fausses conversions dans le
pixel qui pilote les campagnes payantes de Franck.

## Le calcul

Le même que dans le quiz (`saas-interne/Fillout/app-quiz/lib/redirection.ts`) : superficie ×
prix au m² selon le département, TVA 10 %. La page affiche une **fourchette à ±10 %**,
arrondie aux 500 €, jamais un montant unique.

Pourquoi une fourchette : une estimation trop haute effraie quelqu'un de récupérable, une
estimation trop basse pose une ancre que Franck devra casser au rendez-vous, après s'être
déplacé. Le devis passerait alors pour une hausse.

⚠️ Le claustra n'entre pas dans le calcul, le quiz ne demande qu'une superficie totale.
L'estimation est donc « pergola seule » et sous-estime un projet qui en comporte.
