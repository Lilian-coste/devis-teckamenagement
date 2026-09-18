/**
 * LE SUIVI DES PAGES DE RÉSULTAT — arrivées, clics, et à qui les rattacher.
 *
 * Posé le 18/09/2026 à la demande de Lilian. Jusque-là, le parcours s'arrêtait pour nous
 * à la redirection du quiz : on savait qu'une personne avait terminé, on ne savait plus
 * rien après. Or c'est là que se joue la question qui l'intéresse — quelqu'un arrive sur
 * la page « votre budget ne suffit pas », lit, et clique quand même « oui, je pourrais
 * envisager cette somme ». Cette personne-là vaut un rappel, et il faut savoir QUI c'est.
 *
 * ── CE QUE CE FICHIER FAIT, ET CE QU'IL NE FAIT PAS ─────────────────────────────────
 *
 *  ✅ il compte les arrivées sur chacune des deux pages de résultat ;
 *  ✅ il compte les clics sur « oui, je pourrais envisager ce budget » ;
 *  ✅ il rattache chaque geste à la DEMANDE, par le `sid` que le quiz pose dans l'URL,
 *     pour qu'on retrouve la personne dans le tableau de bord ;
 *  ✅ il propage ce `sid` aux pages suivantes, sinon le fil se coupe au premier clic ;
 *  ⛔ il ne tire JAMAIS l'événement `Lead`.
 *
 * ⚠️⚠️ CE DERNIER POINT EST LE SEUL VRAI DANGER DE CE FICHIER.
 *
 * `Lead` est le seul signal dont vit l'ensemble de pub qui dépense. Il est tiré une fois
 * par demande qualifiée, à la fin du quiz, par `lib/useSession.ts` — et par lui seul.
 * Le tirer aussi ici doublerait chaque conversion en silence : Meta croirait le coût par
 * lead divisé par deux, et optimiserait sur une donnée fausse. Les événements de ce
 * fichier portent donc tous des noms distincts. Le fichier `lib/pixel/config.ts` du quiz
 * dit la même chose dans l'autre sens : « NE PAS renommer l'événement Lead ni le
 * déplacer ». Les deux règles sont la même règle.
 *
 * ── POURQUOI LE PIXEL EST DE RETOUR SUR CES PAGES ───────────────────────────────────
 *
 * Les deux pages portaient en tête « AUCUN PIXEL META ICI, et c'est délibéré », parce
 * qu'à l'époque du tunnel Fillout la vraie page de résultat tirait un `Lead` à CHAQUE
 * chargement : une copie sous le même domaine aurait envoyé de fausses conversions. Ce
 * n'est plus vrai. Ces pages SONT les vraies pages, et le `Lead` a quitté la page pour
 * la fin du quiz. Ce qui reste interdit, c'est `Lead` ici, pas le pixel.
 *
 * ── CE QUE LES PAGES DOIVENT DÉCLARER ───────────────────────────────────────────────
 *
 *   <body data-suivi="resultat-qualifie">            ← ou "resultat-non-qualifie"
 *   <a data-suivi-clic="chemin-oui" …>               ← un geste à compter
 *   <a data-suivi-clic="guide-telecharge" …>         ← quand le guide reviendra
 *
 * Un `?test=1` dans l'URL coupe tout : ni pixel, ni enregistrement. C'est ce qu'il faut
 * ajouter pour relire une page sans polluer les comptes.
 */
(function () {
  "use strict";

  var PIXEL_ID = "1276467600212409";

  /* Le quiz est servi sous le MÊME domaine, derrière la réécriture de `vercel.json`.
     Donc pas de CORS, et la barre finale est obligatoire : le site statique force
     `trailingSlash`, et une redirection 308 au milieu d'un `sendBeacon` est un pari
     qu'on n'a aucune raison de prendre. */
  var API = "/simulez-votre-projet/api/evenement/";

  /* Les noms d'événement Meta. Aucun ne s'appelle `Lead`, et aucun ne doit jamais
     s'appeler `Lead` — voir l'avertissement en tête de fichier. */
  var EVENEMENTS_META = {
    "resultat-qualifie": "ResultatQualifie",
    "resultat-non-qualifie": "ResultatNonQualifie",
    "chemin-oui": "BudgetReconsidere",
    "guide-telecharge": "GuideTelecharge",
  };

  /* Les paramètres qu'on fait suivre d'une page à l'autre. Liste FERMÉE : recopier
     l'URL entière ferait voyager n'importe quoi, et `budget` changerait l'affichage de
     la page d'arrivée, qui n'a rien demandé. `test` en fait partie : une relecture
     d'essai doit rester un essai jusqu'au bout du tunnel, sinon la deuxième page
     compte une visite que la première a refusé de compter. */
  var A_PROPAGER = ["sid", "prenom", "m2", "cp", "profil", "aussi", "source", "test"];

  var params = new URLSearchParams(window.location.search);
  var estEssai = params.get("test") === "1";
  var sid = params.get("sid") || "";
  var source = params.get("source") || "";
  var page = document.body ? document.body.getAttribute("data-suivi") : null;

  /* ─────────────────────────────────────────────── le pixel, chargé une seule fois */

  function chargerPixel() {
    if (estEssai || window.fbq) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }

  function meta(evenement) {
    var nom = EVENEMENTS_META[evenement];
    if (!nom || estEssai || !window.fbq) return;
    window.fbq("trackCustom", nom, sid ? { demande: sid } : {});
  }

  /* ─────────────────────────────────────────── l'enregistrement chez nous */

  /**
   * ⚠️ `sendBeacon` AVEC UN BLOB `text/plain`, ET C'EST VOULU.
   *
   * Deux raisons, et chacune suffirait. D'abord il survit à la navigation : un clic sur
   * un lien ne doit pas perdre l'événement qu'il vient de déclencher, ce qui arriverait
   * avec un `fetch` ordinaire interrompu par le changement de page. Ensuite `text/plain`
   * est une requête « simple » au sens CORS : aucune pré-vérification, donc rien à
   * négocier si un jour ces pages et le quiz ne partagent plus le même domaine.
   */
  function enregistrer(evenement, details) {
    if (estEssai) return;
    var corps = JSON.stringify({
      evenement: evenement,
      sessionId: sid,
      page: window.location.pathname,
      source: source,
      details: details || {},
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(API, new Blob([corps], { type: "text/plain" }));
        return;
      }
      fetch(API, { method: "POST", body: corps, keepalive: true }).catch(function () {});
    } catch (e) {
      /* Le suivi ne casse jamais la page : c'est une mesure, pas une transaction. */
    }
  }

  function signaler(evenement, details) {
    enregistrer(evenement, details);
    meta(evenement);
  }

  /* ───────────────────────────────── faire suivre le fil à la page d'après */

  /**
   * Sans ça, le fil se coupe au premier clic : la personne passe de la page « budget
   * insuffisant » à la page de résultat, et celle-ci ne sait plus ni qui elle est, ni
   * d'où elle vient. `depuis` est ajouté pour distinguer, sur la page d'arrivée, celles
   * qui y sont allées directement de celles qui ont d'abord vu l'autre page.
   */
  function propagerLien(a) {
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(https?:|mailto:|tel:)/i.test(href)) return;
    var url = new URL(href, window.location.href);
    A_PROPAGER.forEach(function (cle) {
      var v = params.get(cle);
      if (v && !url.searchParams.has(cle)) url.searchParams.set(cle, v);
    });
    if (page) url.searchParams.set("depuis", page);
    a.setAttribute("href", url.pathname + url.search + url.hash);
  }

  /* ──────────────────────────────────────────────────────────── mise en route */

  function demarrer() {
    chargerPixel();

    if (page) signaler(page, sid ? {} : { anonyme: true });

    var cliquables = document.querySelectorAll("[data-suivi-clic]");
    for (var i = 0; i < cliquables.length; i++) {
      (function (el) {
        var evenement = el.getAttribute("data-suivi-clic");
        if (el.tagName === "A") propagerLien(el);
        el.addEventListener("click", function () {
          signaler(evenement, {});
        });
      })(cliquables[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
