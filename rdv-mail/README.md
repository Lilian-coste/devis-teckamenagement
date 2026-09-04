# Page de réservation — séquence mail Brevo

**URL live** : [https://devis.teckamenagement.fr/rdv-mail/](https://devis.teckamenagement.fr/rdv-mail/)

Public : destinataires des séquences email Brevo, pour les leads qui n'ont pas encore eu
Franck au téléphone.

## C'est la jumelle de la page du tunnel

Depuis le 02/09/2026, cette page est une **copie conforme** de
[`apercu-resultat/reserver/`](../apercu-resultat/reserver/) : le bandeau, le logo,
« Réservez votre appel », la mention 4,9★ et le calendrier, rien d'autre. Elle était
jusque-là une longue page de vente avec les avis et le triptyque Créez / Révolutionnez /
Vivez ; cette version est dans l'historique git.

**Pourquoi une copie et pas une redirection** : parce que l'adresse est la seule chose qui
distingue les deux publics. Chaque page étiquette ses réservations avec sa propre campagne
UTM, donc on sait pour chaque rendez-vous pris s'il vient de la séquence ou du tunnel.

| Page | `utmMedium` | `utmCampaign` |
|---|---|---|
| `/rdv-mail/` | `email` | `sequence-bienvenue` |
| `/apercu-resultat/reserver/` | `page-resultat` | `tunnel-quiz` |

Ça se lit dans le tableau de bord Calendly, réservation par réservation.

⚠️ **Toute modification de l'une doit être répercutée sur l'autre.** Seul le bloc `utm` du
script diffère, et c'est volontaire.

## Le reste

**Aucun pixel Meta** : cette page ne doit pas alimenter le tracking ads.

Suivi de source dans l'URL : ajouter `?source=site` ou `?source=meta` pour pré-remplir la
question Calendly « Comment avez-vous connu Teck Aménagement ? ». `utmSource` suit le même
paramètre. C'est le canal d'ACQUISITION du lead, il ne dit pas par quelle page il a réservé.

- Lien séquence site → `…/rdv-mail/?source=site`
- Lien séquence Meta → `…/rdv-mail/?source=meta`
