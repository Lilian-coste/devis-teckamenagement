# devis.teckamenagement.fr

Projet Vercel combiné qui sert l'intégralité du sous-domaine **devis.teckamenagement.fr** depuis un seul repo GitHub. Migration complète Systeme.io → Vercel finalisée.

## Pages live

| Page | URL | Public |
|---|---|---|
| Cover page d'accueil (top de tunnel pergola) | [devis.teckamenagement.fr/pergola/page-accueil/](https://devis.teckamenagement.fr/pergola/page-accueil/) | Meta ads — pixel `PageView` seul · bouton → quiz Fillout |
| Réservation après quiz (budget >15K€) | [devis.teckamenagement.fr/561d79a-47b15060-85cc2f7b/](https://devis.teckamenagement.fr/561d79a-47b15060-85cc2f7b/) | Meta ads — pixel `PageView + Lead` |
| Page <15K€ + simulateur surface | [devis.teckamenagement.fr/561d79a-47b15060-3631b3c8/](https://devis.teckamenagement.fr/561d79a-47b15060-3631b3c8/) | Meta ads budget faible — pixel `PageView` seul |
| Simulateur prix dépt 1 (800/500 €/m²) | [devis.teckamenagement.fr/simulez-votre-projet-65bd92/](https://devis.teckamenagement.fr/simulez-votre-projet-65bd92/) | Page d'entrée organique / lien direct |
| Simulateur prix dépt 2 (900/600 €/m²) | [devis.teckamenagement.fr/simulez-votre-projet-65pc92/](https://devis.teckamenagement.fr/simulez-votre-projet-65pc92/) | Idem, autre département |
| Réservation séquence mail Brevo | [devis.teckamenagement.fr/rdv-mail/](https://devis.teckamenagement.fr/rdv-mail/) | Séquence email — **sans pixel** |

La racine [devis.teckamenagement.fr/](https://devis.teckamenagement.fr/) redirige vers [teckamenagement.fr](https://teckamenagement.fr).

## Pixel Meta

ID `1276467600212409`. Configuré pour accepter `teckamenagement.fr` et tous ses sous-domaines (Traffic Permission OK).

- Pages **avec pixel** : `pergola/page-accueil/` (PageView seul, cover top de tunnel), `561d79a-47b15060-85cc2f7b/` (PageView + Lead) et `561d79a-47b15060-3631b3c8/` (PageView seul).
- Pages **sans pixel** : `rdv-mail/`, `simulez-votre-projet-65bd92/`, `simulez-votre-projet-65pc92/`.

## Stack technique

- HTML statique + Tailwind via CDN (pas de build step).
- Calendly `teckamenagement/30min` embed inline sur la page de réservation Meta ads (pas sur les autres).
- Hébergé sur Vercel, déployé automatiquement à chaque push sur `main`.
- `vercel.json` configuré avec `cleanUrls: true` et `trailingSlash: true` (sinon les chemins relatifs des images cassent).

## Modifier une page

1. Édite le fichier `index.html` du sous-dossier correspondant.
2. `git add . && git commit -m "..." && git push`
3. Vercel redéploie automatiquement (~30 secondes).

Les images de chaque page vivent dans son propre sous-dossier `images/`. Pour modifier une image, remplace le fichier au bon endroit et push.
