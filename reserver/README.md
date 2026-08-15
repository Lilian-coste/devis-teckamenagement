# Page de réservation — sortie du quiz

**URL live** : [https://devis.teckamenagement.fr/reserver/](https://devis.teckamenagement.fr/reserver/)

Créée le 15/08/2026, à la demande de Lilian : le Calendly ne vit plus **dans** la page de
résultat, c'est un bouton qui y mène. Même principe que le quiz de Clément Desplats, dont
le bouton renvoie vers une page iClosed qui ne porte que le calendrier.

Public : les prospects qui viennent de terminer le quiz et qui cliquent sur
« Réserver mon appel offert » depuis la page de résultat ≥ 15K.

## Ce qu'il faut savoir avant d'y toucher

- **Aucun pixel Meta**, volontairement. L'événement `Lead` est tiré par la page de
  résultat au chargement. Le poser ici aussi doublerait le signal qui pilote les
  campagnes payantes de Franck. Même règle que `/rdv-mail/`.
- **Le suivi de source survit au saut** : les boutons de la page de résultat recopient
  les paramètres de leur propre URL sur le lien vers cette page, donc `?source=meta`
  arrive jusqu'ici et pré-remplit la 2ᵉ question Calendly (« Comment avez-vous connu
  Teck Aménagement ? »).
- **`noindex`** : c'est une page de tunnel, elle n'a rien à faire dans Google.
- Le widget Calendly est repris **à l'identique** de la page de résultat, `customAnswers`
  et `utm` compris. Si l'ordre des questions change dans Calendly, `a2` est à revoir.

## À trancher

Le libellé du bouton qui mène ici (« Réserver mon appel offert ») est **provisoire**.
Lilian le décidera une fois la VSL écrite. Le titre de cette page devra suivre.
