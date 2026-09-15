# Images de la fiche projet

Servies sur `https://devis.teckamenagement.fr/fiche/images/`.

La fiche projet est rendue par l'app quiz, qui vit sur un autre déploiement. Ses
images sont ici pour deux raisons : ce sous-domaine est déjà un hébergeur statique
qui se redéploie tout seul, et 8 Mo de photos n'ont rien à faire dans le dépôt
d'une application.

⚠️ Ce sont des versions **web**, pas les originaux. Elles sont produites depuis
`saas-interne/Fillout/fiche-pdf/images/` à 1400 px de large et en qualité 72, ce
qui couvre les écrans retina pour une colonne de 700 px. Les originaux, eux, sont
ceux que le PDF imprime, et ils restent là-bas.

Pour les régénérer, voir le script de mise en ligne dans le dossier `fiche-pdf`.
