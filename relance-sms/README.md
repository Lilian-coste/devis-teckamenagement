# Page des trois SMS de relance — outil interne de Franck

**URL live** : [https://devis.teckamenagement.fr/relance-sms/](https://devis.teckamenagement.fr/relance-sms/)

Public : **Franck seul**. Personne d'autre ne reçoit ce lien.

## Où elle arrive dans le parcours

1. Le prospect termine le quiz, et sept minutes plus tard il reçoit un mail qui lui
   demande une photo du lieu, les dimensions et/ou un plan. Le P.S. lui demande d'accuser
   réception.
2. S'il n'a rien accusé le lendemain, Franck reçoit le mail interne « Relance SMS à
   faire », qui porte le nom, la commune et le numéro du prospect.
3. Le lien **Je vois les trois messages** de ce mail ouvre cette page, sur son téléphone.

## Elle se personnalise par son adresse

```
/relance-sms/?prenom=Béatrice&nom=Dupont&commune=Aix-en-Provence&tel=0639982147
```

| Paramètre | Ce qu'il remplit | Obligatoire |
|---|---|---|
| `prenom` | le texte des trois SMS et la fiche du haut | oui |
| `tel` | les liens `sms:` et le bouton « Copier le numéro » | oui |
| `nom` | la fiche du haut | non |
| `commune` | la fiche du haut | non |

`telephone` est accepté comme synonyme de `tel`, parce que c'est le nom de la variable
dans le mail (`{{ telephone }}`) et qu'une automatisation pourrait le reprendre tel quel.

⚠️ **Chaque valeur doit être encodée pour une URL.** Un prénom accentué, une commune avec
un espace ou un numéro écrit par paires casseraient l'adresse autrement. Le générateur des
maquettes s'en charge côté mail avec `encodeURIComponent`.

Le numéro est accepté collé (`0612345678`), écrit par paires (`06 12 34 56 78`) ou au
format international (`+33612345678`). Un numéro français de dix chiffres arrivé collé est
réaffiché par paires. Ce qui ne ressemble pas à un numéro est traité comme absent, plutôt
que de fabriquer un lien `sms:` qui n'ouvrirait rien.

## Ce qu'elle fait quand le lien est incomplet

Elle ne montre jamais un `{{prenom}}` en clair ni un `sms:` vide. Trois états :

- **adresse nue**, sans aucun paramètre : elle affiche « Aucun prospect dans le lien »,
  puis l'exemple fictif, en disant que c'en est un ;
- **adresse partielle** : elle nomme précisément ce qui manque et remplace le reste par
  l'exemple fictif ;
- **adresse complète** : l'encadré disparaît, il n'y a plus que le prospect.

⚠️ **Le numéro de secours est fictif, et il doit le rester.** `06 39 98 21 47` appartient à
la plage `06 39 98 XX XX` réservée à la fiction par l'ARCEP : personne ne peut être joint
par erreur depuis cette page ouverte à nu. Ne jamais le remplacer par un numéro réel.

## Les deux boutons d'ouverture sont encore un essai

La syntaxe du lien `sms:` n'est pas la même partout : iOS accepte `&body=`, le reste
attend `?body=`. Les deux formes sont servies côte à côte, étiquetées. Quand on saura
laquelle remplit vraiment le message sur le téléphone de Franck, on supprimera l'autre et
chaque message ne gardera qu'un seul bouton.

`[LIEN]`, dans le message 3, reste à remplacer par le lien de réservation de créneau. Il
n'est pas encore arrêté, et une URL inventée serait pire que le crochet.

## Attention en modifiant

⚠️ **Les trois SMS sont écrits à deux endroits** : ici, et dans
`~/mes-clients/teck-amenagement/livrables/emails/generer-relance-directe.js`, qui produit
les maquettes de mail. Ils doivent rester identiques au caractère près. Le générateur
compare les deux à chaque exécution et se plaint s'ils divergent, donc après toute
modification du texte d'un message, relancer :

```bash
cd ~/mes-clients/teck-amenagement/livrables/emails && node generer-relance-directe.js
```

⚠️ **Le texte des SMS a été écrit par Lilian, l'absence de point final est volontaire.**
Les points de suspension du message 2 aussi. Ne rien « corriger » ici.

⚠️ **Le bleu de cette page est celui du gabarit mail, `#5399BC`**, et non le `#0653A8` du
reste du site. C'est voulu : la page et le mail qui y mène doivent se ressembler.

Aucun pixel Meta, et `noindex` dans l'en-tête : c'est un outil interne, pas une page de
tunnel.
