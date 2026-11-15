# CSS corrigés

## Exercice 1 — Chasse aux erreurs CSS

### Les 8 erreurs

| N° | Erreur | Correction |
|---|---|---|
| 1 | `font-family` : nom de police à espaces sans guillemets, et **aucune famille générique** de secours | `"Segoe UI", Arial, sans-serif` |
| 2 | `font-size: 16;` : unité manquante | `16px` ou, de préférence, `1rem` |
| 3 | `line-height: 1,5;` : virgule décimale | `1.5` |
| 4 | `text-color` : propriété inexistante | `color` |
| 5 | `background-color: #f7f7f7` : **point-virgule manquant**, ce qui invalide cette déclaration et la suivante (`margin`) | ajouter `;` |
| 6 | `color: #33669;` : 5 chiffres hexadécimaux | 6 chiffres : `#336699` |
| 7 | `font-size: 2.5 rem;` : espace entre le nombre et l'unité | `2.5rem` |
| 8 | `text-align: centre;` : mot-clé en français | `center` |

### Version corrigée
```css
body {
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
    margin: 0;
}

h1 {
    color: #336699;
    font-size: 2.5rem;
    text-align: center;
}

/* Motif de fond pour l'en-tête */
header {
    background-image: url("../images/motif.png");
}

/* Carte au fond blanc légèrement translucide, texte bien lisible */
.carte {
    background-color: rgba(255, 255, 255, 0.8);
}
```

**Remarque** : pour l'erreur 1, un nom de police à plusieurs mots écrit sans guillemets est accepté par les navigateurs. La convention du cours (guillemets) et surtout la famille générique de secours sont les points à faire retenir.

---

## Exercice 2 — Mettre en forme ma page de présentation

### Étape 0 — Relier la feuille de style

Dans `index.html` et dans `contact.html`, qui sont à la racine du site, on écrit dans le `<head>` :
```html
<link rel="stylesheet" href="css/style.css">
```

Les deux pages étant dans le même dossier que le dossier `css/`, le chemin est identique dans les deux fichiers.

### Proposition de corrigé : css/style.css
```css
/* ===== Style de base : hérité par toute la page ===== */
body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

/* ===== Cartes et zone "Liens utiles" ===== */
.carte {
    padding: 1rem;
    background-color: #ffffff;
}

aside {
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
}

/* ===== Pied de page ===== */
footer {
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

/* Correction de contraste : lien dans le pied de page */
footer a {
    color: #cfe3ff;
}
```

### Réponses aux questions

**Étape 5 : `rgba()` ou `opacity` ?**

`rgba()` ne rend transparente que **la couleur de fond**. `opacity` rendrait transparent **tout l'élément**, c'est-à-dire aussi son titre, son texte et ses liens : avec `opacity: 0.1`, le contenu de la zone deviendrait quasiment invisible.

**Étape 7, question 2 : l'élément qui pose problème**

Le lien « Me contacter par e-mail » du **pied de page** : il reçoit la couleur des liens (`#0b5cad`) sur un fond très sombre (`#222222`). Le contraste n'est que d'environ **2,4 pour 1**, très inférieur au minimum de 4,5. On le corrige avec une règle spécifique au pied de page, par exemple `footer a { color: #cfe3ff; }` (environ 12 pour 1).

Contrastes des autres combinaisons de la page, pour contrôle :

| Texte | Fond | Contraste |
|---|---|---|
| texte courant `#222222` | `#f7f7f7` | environ 14,9 |
| texte blanc de l'en-tête | `#336699` (début du dégradé) | environ 6,0 |
| texte blanc de l'en-tête | `#1f4068` (fin du dégradé) | environ 10,5 |
| titres `h2` `#1f4068` | `#f7f7f7` | environ 9,8 |
| titres `h3` `#336699` | `#ffffff` | environ 6,0 |
| liens `#0b5cad` | `#f7f7f7` | environ 6,2 |
| liens dans la navigation | `#e8eef5` | environ 5,7 |
| liens dans l'`aside` | environ `#e3e8ee` (fond translucide mélangé au fond de page) | environ 5,5 |
| lien du pied de page, après correction | `#222222` | environ 12,2 |

**Étape 7, question 3 : `html { font-size: 20px; }`**

Toutes les tailles exprimées en `rem` sont recalculées à partir de 20 px au lieu de 16 px : les textes grossissent de 25 %, et aussi les `padding` écrits en `rem`. Cela illustre pourquoi `rem` permet de s'adapter au réglage de l'utilisateur.

**Étape 7, question 4 : la police de la page**

Elle est définie **une seule fois, sur `body`**. Les propriétés comme `font-family`, `font-size`, `line-height` et `color` sont **héritées** : les titres, paragraphes et éléments de liste les reçoivent de leurs ancêtres. Seuls les éléments qui ont besoin d'une valeur différente (les titres par exemple, pour leur taille) possèdent leur propre règle.

### Réponses : « Pour aller plus loin »

- **Image de fond dans l'en-tête** :
  ```css
  header {
      background-color: #336699;
      background-image: url("../images/banniere.jpg");
      background-size: cover;
      background-position: center;
  }
  ```
  La couleur de repli s'affiche si l'image n'est pas chargée. Le chemin part du fichier `css/style.css`, d'où le `../`. Si l'image est claire ou chargée, il faut vérifier le contraste du texte blanc sur toute la surface visible.
- **`opacity: 0.1` sur l'`aside`** : le fond, mais aussi tout le texte et les liens deviennent presque invisibles.
- **Variations avec `hsl()`** : pour obtenir une nuance plus claire ou plus sombre d'une même couleur, on ne modifie que la troisième valeur (la luminosité).

### Points d'attention lors de la correction

- Vérifier que les deux pages sont bien reliées à la feuille de style.
- Vérifier que le dégradé est écrit dans `background-image` et non dans `background-color`.
- Vérifier que le texte blanc est posé sur le conteneur sombre (`header`) et non sur la page entière.
- Vérifier que les tailles de texte sont en `rem` et que la police se termine par une famille générique.
- Vérifier que le contraste du lien dans le pied de page a bien été corrigé.

---

## Exercice 1 — Calculer des boîtes

##### A. Taille d'une boîte

| | `content-box` (par défaut) | `border-box` |
|---|---|---|
| Largeur de la zone de contenu | 200 px | 176 px (200 − 2 × 10 − 2 × 2) |
| Largeur visible de la boîte (bordures comprises) | 224 px (200 + 20 + 4) | 200 px |
| Place occupée en largeur (marges comprises) | 254 px (224 + 30) | 230 px (200 + 30) |

##### B. Largeur automatique

Largeur de la zone de contenu :
```
600 − 40 (marges) − 20 (padding) − 2 (bordures) = 538 px
```

La largeur visible (bordures comprises) est de 538 + 20 + 2 = **560 px**.

Le résultat **ne dépend pas** de `box-sizing` : avec `width: auto`, l'élément remplit simplement l'espace disponible et la zone de contenu est ce qui reste après déduction des marges, des paddings et des bordures.

##### C. Débordement

- En `content-box` : la largeur visible est de 500 + 2 × 20 = **540 px**. L'élément déborde de **40 px**.
- En `border-box` : la largeur visible est de **500 px**, le padding étant pris à l'intérieur. Il n'y a pas de débordement.

##### D. Raccourcis et marges

1. `padding: 8px 16px 24px;` : haut 8 px, droite 16 px, bas 24 px, gauche 16 px. `margin: 0 auto;` : haut 0, droite `auto`, bas 0, gauche `auto`.
2. L'espace est de **24 px** : les marges verticales fusionnent et la plus grande l'emporte (pas 40 px).
3. Un lien est un élément **en ligne** : il ignore `width` et les marges verticales. Il faut ajouter `display: inline-block` (ou `block`).

---

## Exercice 2 — Inspecter les boîtes de ma page

### Valeurs attendues

Pour une taille de police de 16 px et la feuille de style du TD 2 :

| Élément | `margin` (haut / bas) | `padding` | Origine |
|---|---|---|---|
| `<body>` | 0 / 0 | 0 | marge du navigateur (8 px) supprimée par notre `margin: 0` |
| `<header>` | 0 / 0 | 16 px (1 rem) | `padding` : notre CSS |
| `<h1>` | environ 26,8 px / 26,8 px (0,67 em de 40 px) | 0 | styles par défaut du navigateur |
| `<h2>` | environ 23,2 px / 23,2 px (0,83 em de 28 px) | 0 | styles par défaut du navigateur |
| `<p>` | 16 px / 16 px (1 em) | 0 | styles par défaut du navigateur |
| `<ul>` | 16 px / 16 px | retrait gauche d'environ 40 px | styles par défaut du navigateur |
| `.carte` | 0 / 0 | 16 px (1 rem) | `padding` : notre CSS ; aucune marge n'est définie |

### Réponses aux questions

1. L'espace est la somme du **padding de l'en-tête** (16 px, notre CSS) et de la **marge haute du `<h1>`** (environ 26,8 px, style par défaut du navigateur), soit environ **42,8 px**. La marge du `<h1>` ne fusionne pas avec celle de l'en-tête parce que le `padding` de l'en-tête les sépare.
2. Les cartes n'ont **aucune marge** : l'espace des paragraphes est une marge **intérieure** à chaque carte (marge par défaut des `<p>`, elle-même encadrée par le `padding` de la carte). Rien ne sépare donc une carte de la suivante. On observe d'ailleurs que le bas d'une carte est plus aéré que son haut : le `padding` s'ajoute à la marge basse du dernier paragraphe.
3. Du **`padding-left` d'environ 40 px** appliqué par défaut aux listes `<ul>` et `<ol>` par le navigateur.

---

## Exercice 3 — Mettre en page mon mini-site

### Proposition de corrigé : css/style.css

```css
/* ===== Calcul des tailles : width inclut padding et bordure ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

/* Les liens du menu ont l'apparence de boutons */
nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

/* Pas de marge haute pour le premier élément d'une carte */
.carte > :first-child {
    margin-top: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

### Modification de contact.html

Une seule modification dans le HTML, et aucune dans le CSS :
```html
<section class="carte">
    <h2>Où me trouver</h2>
    ...
</section>
```

### Réponses aux questions

**Étape 1.** Quand la fenêtre est plus étroite que 45 rem, `max-width` ne s'applique plus : `<main>` s'adapte à la largeur disponible (il ne fixe qu'un **maximum**), et le contenu reste lisible sans barre de défilement horizontale.

**Étape 3.** Sans `display: block`, l'image reste un élément **en ligne** : les marges `auto` horizontales n'ont aucun effet sur un élément en ligne, et l'image reste alignée à gauche, comme du texte. En la transformant en bloc, `margin: 0 auto` peut répartir l'espace restant de part et d'autre.

**Étape 4.** Sans `display: inline-block`, les liens resteraient des éléments en ligne : leur padding vertical **s'afficherait** (le fond et la bordure grandiraient) mais **sans repousser** les éléments voisins. Les boutons déborderaient alors de la zone du menu et chevaucheraient l'en-tête et le contenu situés autour.

**Étape 6.** Il n'y a **rien à écrire en CSS** : il suffit d'ajouter la classe `carte` au HTML. Une classe décrit un **rôle** réutilisable à plusieurs endroits, et une même règle suffit pour toutes les pages qui l'utilisent. C'est aussi pourquoi la règle `.carte > :first-child` fonctionne sur la page de contact, dont le premier élément est un `<h2>` et non un `<h3>`.

### Étape 7 — Vérifications

**1. Largeur d'une carte**

| Calcul | Valeur |
|---|---|
| `main` : `45rem` (largeur visible, en `border-box`) | 720 px |
| Zone de contenu de `main` (− 2 × 16 px de padding) | 688 px |
| `.carte` : largeur visible (auto, donc toute la largeur disponible) | 688 px |
| Zone de contenu de la carte (− 2 × 1 px de bordure − 2 × 24 px de padding) | **638 px** |

**2. Fusion des marges**

Avec `margin-top: 3rem` ajouté à `.carte` (marge basse de la carte précédente : 1,5 rem), l'espace entre deux cartes consécutives est de **3 rem (48 px)**, et non 4,5 rem : les deux marges verticales fusionnent et la plus grande l'emporte.

**3. Débordement**

Sans `box-sizing: border-box` et avec `width: 100%` sur `.carte`, la carte mesure 688 px de contenu, plus 48 px de padding et 2 px de bordure, soit **738 px** : elle dépasse de **50 px** la largeur de la zone de contenu de `<main>`. Avec `border-box`, elle mesure exactement 688 px.

### « Pour aller plus loin »

**Étiquettes de compétences**
```css
section ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

section li {
    display: inline-block;
    margin: 0 0.5rem 0.5rem 0;
    padding: 0.25rem 0.75rem;
    background-color: #e8eef5;
    border-radius: 1rem;
}
```

La liste de l'`aside` n'est pas touchée, car elle n'est pas dans une `section`. Le contraste du texte `#222222` sur `#e8eef5` est largement suffisant (environ 13 pour 1).

**Carte vedette**
```css
.vedette {
    border-left: 6px solid #336699;
}
```

On l'applique avec `<article class="carte vedette">`. La bordure gauche de la classe `.vedette` remplace celle de `.carte` pour ce côté seulement (même spécificité, `.vedette` étant écrite **après** `.carte`).

### Points d'attention lors de la correction

- Vérifier que la règle `box-sizing` est écrite en premier et qu'elle contient bien les trois sélecteurs séparés par des virgules.
- Vérifier que chaque bordure a un **style** (`solid`).
- Vérifier que `margin: 0 auto` est bien associé à une largeur maximale, sinon le centrage ne se voit pas.
- Vérifier que la classe `carte` a bien été ajoutée à `contact.html` et qu'aucune règle CSS n'a été dupliquée.
- Faire repérer sur l'inspecteur la différence entre ce qui vient de la feuille de style et ce qui vient des styles du navigateur.

---

## Exercice 4 — Positionner mon mini-site

### Modifications du HTML (index.html)

```html
<section id="interets">
    <h2>Mes centres d'intérêt</h2>

    <article class="carte">
        <h3>Le jeu vidéo</h3>
        <p>J'aime les jeux de stratégie et d'aventure.</p>
        <span class="badge">Nouveau</span>
    </article>

    <article class="carte">
        <h3>La photographie</h3>
        <p>Je photographie surtout des paysages.</p>
    </article>
</section>
```

Et le menu :
```html
<nav>
    <a href="index.html">Accueil</a>
    <a href="#interets">Centres d'intérêt</a>
    <a href="contact.html">Contact</a>
</nav>
```

`contact.html` ne change pas (sauf dans la partie « Pour aller plus loin »).

### Proposition de corrigé : css/style.css

```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* Marge de défilement : les ancres ne passent pas sous l'en-tête fixe */
html {
    scroll-padding-top: 5rem;
}

/* ===== Style de base ===== */
body {
    margin: 0;
    padding-top: 4.5rem;      /* hauteur de l'en-tête fixe */
    padding-bottom: 2.5rem;   /* hauteur du pied de page fixe */
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête fixe ===== */
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 4.5rem;
    padding: 0.5rem 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    margin: 0;
    font-size: 0.875rem;
    font-style: italic;
}

h1 {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.2;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    position: relative;       /* la carte est la référence du badge */
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

/* Badge posé dans le coin de la carte */
.badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.25rem 0.75rem;
    background-color: #8b0000;
    color: #ffffff;
    font-size: 0.875rem;
    border-radius: 1rem;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page fixe ===== */
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    padding: 0.5rem 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer p {
    margin: 0;
}

footer a {
    color: #cfe3ff;
}
```

### Réponses aux questions

**Étape 1**

1. Sans `position: relative` sur la carte, le badge n'a plus d'ancêtre positionné : il se place par rapport à **la page**, c'est-à-dire en haut à droite du document (à 0,75 rem du haut et du bord droit), loin de sa carte. En l'inspectant, on voit qu'il est posé sur l'en-tête. (Cette observation se fait avant de fixer l'en-tête ; sinon, le badge serait caché derrière lui.)
2. Parce que la règle `.carte > :first-child { margin-top: 0; }` supprime la marge haute du **premier** enfant. Si le badge était écrit en premier, le `<h3>` ne serait plus le premier enfant : il retrouverait sa marge haute par défaut, et cette carte aurait plus d'espace en haut que les autres. Un élément `absolute` est sorti du flux : sa place dans le code n'a aucune influence sur son emplacement à l'écran, on peut donc l'écrire en dernier.

**Étape 2**

Hauteur de contenu disponible dans l'en-tête : 72 − 16 (padding) = 56 px. L'en-tête de la page d'accueil contient un `<h1>` de 28,8 px (24 × 1,2) et l'accroche de 21 px (14 × 1,5), soit 49,8 px : le tout tient.

1. Sans `left` ni `right`, un élément `fixed` à largeur automatique se **réduit à la largeur de son contenu** : l'en-tête n'est plus un bandeau pleine largeur, le dégradé n'apparaît que derrière le texte. Avec `left: 0` et `right: 0`, il est étiré sur toute la largeur de la fenêtre.
2. L'en-tête de `index.html` contient un titre **et** une accroche, celui de `contact.html` seulement un titre. Sans hauteur imposée, leurs hauteurs seraient différentes (environ 66 px et 45 px). Comme le `padding-top` du `body` est **unique**, il serait trop grand sur une page ou trop petit sur l'autre. Une hauteur fixée garantit le même espace réservé sur les deux pages. C'est un des rares cas où fixer une `height` est justifié.

**Étape 3**

Sans `padding-bottom`, les derniers éléments de la page (ici la fin de la zone « Liens utiles » et sa marge) restent **cachés sous le pied de page** : l'utilisateur ne peut jamais les voir en entier.

**Étape 4**

Sans `scroll-padding-top`, le navigateur amène le haut de la section tout en haut de la fenêtre : le titre « Mes centres d'intérêt » est **masqué par l'en-tête fixe**. Avec `scroll-padding-top: 5rem` (4,5 rem pour l'en-tête et 0,5 rem d'air), le titre apparaît juste sous l'en-tête.

**Étape 5**

1. Ce sont les **cartes** (`.carte`) et le **badge** qui passent par-dessus l'en-tête. Le portrait, les titres, les paragraphes et les listes restent dessous.
2. Les éléments positionnés (ici l'en-tête `fixed`, les cartes `relative` et le badge `absolute`) sont dessinés **par-dessus** les éléments non positionnés. Entre éléments positionnés qui ont un `z-index` identique (`auto`), l'ordre du HTML décide : l'en-tête est écrit **avant** les cartes, donc les cartes passent par-dessus. Avec `z-index: 100`, l'en-tête repasse au-dessus.

**Étape 6**

1. Vérifier que le haut des deux pages commence sous l'en-tête et que le bas se termine au-dessus du pied de page. Le titre « Où me trouver » de `contact.html` doit être visible.
2. 400 − 72 − 40 = **288 px**, soit **72 %** de la fenêtre.
3. Inconvénient : **28 % de la fenêtre est occupée en permanence**, ce qui réduit fortement la zone de lecture sur un petit écran, en mode paysage sur téléphone, ou avec un texte agrandi (le contenu peut même devenir quasiment inaccessible, et l'élément qui reçoit le focus au clavier risque de passer sous un bandeau fixe). Alternatives : ne fixer que l'en-tête et laisser le pied de page dans le flux, utiliser `sticky` plutôt que `fixed`, réduire les hauteurs, ou désactiver le positionnement fixe sur petit écran (une technique courante en responsive design).

### Pour aller plus loin

**1. Bouton « Haut de page »**

Dans les deux pages, sur la balise `<body id="haut">`, et juste avant `</body>` (après le pied de page) :
```html
<a class="retour-haut" href="#haut">↑ Haut de page</a>
```
```css
.retour-haut {
    position: fixed;
    bottom: 3.5rem;           /* 2,5 rem (pied de page) + 1 rem d'espace */
    right: 1rem;
    padding: 0.5rem 1rem;
    background-color: #336699;
    color: #ffffff;
    text-decoration: none;
    border-radius: 0.25rem;
}
```

**2. En-tête `sticky`**
```css
header {
    position: sticky;
    top: 0;
    z-index: 100;
    height: 4.5rem;
    /* le reste est inchangé ; left et right ne sont plus nécessaires */
}

body {
    padding-top: 0;           /* l'en-tête reste dans le flux : plus de place à réserver */
}
```

Ce qui change : l'en-tête **garde sa place dans le flux**, il n'y a donc plus de place à réserver avec le `padding-top` du `body`, et plus besoin d'étirer l'en-tête avec `left` et `right` (c'est un bloc, il remplit déjà la largeur). À l'écran, le résultat est ici identique, car l'en-tête est le premier élément de la page ; la différence apparaîtrait s'il était précédé d'un autre contenu, qui défilerait d'abord.

**3. Menu collé sous l'en-tête**
```css
nav {
    position: sticky;
    top: 4.5rem;              /* juste sous l'en-tête */
    z-index: 90;              /* sous l'en-tête (100), mais au-dessus des cartes */
}
```

Le menu mesure environ 58 px de haut : il faut augmenter `scroll-padding-top` à environ `8.5rem` pour que les ancres ne passent pas sous l'ensemble en-tête et menu. Le `z-index` du menu est nécessaire : sans lui, les cartes (positionnées) passeraient par-dessus.

### Points d'attention lors de la correction

- Vérifier que la carte est bien en `position: relative` et que le badge est écrit **dans** la carte.
- Vérifier que l'en-tête et le pied de page ont `top`/`bottom` **et** `left`/`right`.
- Vérifier que le `padding-top` et le `padding-bottom` du `body` correspondent aux hauteurs réelles (4,5 rem et 2,5 rem).
- Vérifier que la règle `box-sizing` de départ est toujours en place.
- Faire observer, avec les outils de développement, qu'un élément `fixed` n'apparaît plus dans la hauteur de son parent.

---

## Exercice 5 - Positionner mon mini-site avec Flexbox

### Étape 1 — Le menu en ligne

```css
nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

nav a:last-child {
    margin-left: auto;
}
```

**Question.** `display: inline-block` n'est plus utile : les enfants directs d'un conteneur flex deviennent des éléments flex (« blockifiés »). Leur `display` d'origine est sans effet. Le **seul changement visible** est la disparition de l'espace parasite entre les liens (dû à l'espace blanc du HTML), remplacé par un `gap` maîtrisé. On peut donc le laisser, sans conséquence.

**Pourquoi `margin-left: auto` ?** La marge automatique absorbe **tout l'espace libre** de la ligne : le dernier lien est repoussé à droite, et les autres restent groupés à gauche.

### Étape 2 — Les cartes côte à côte

```html
<div class="cartes">
    <article class="carte">
        <h3>Le jeu vidéo</h3>
        <p>J'aime les jeux de stratégie et d'aventure.</p>
    </article>

    <article class="carte">
        <h3>La photographie</h3>
        <p>Je photographie surtout des paysages.</p>
    </article>
</div>
```

```css
.cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cartes .carte {
    flex: 1 1 14rem;
    margin-bottom: 0;
}
```

**Question 1.** Taille de départ : `14rem = 224 px`. Pour que deux cartes tiennent sur la même ligne, il faut `224 + 16 (gap) + 224 = 464 px` de largeur de conteneur. Le conteneur est la largeur de `main` moins ses `1rem` de padding de chaque côté (32 px). Le retour à la ligne se produit donc quand la fenêtre passe sous environ `464 + 32 = 496 px`.
Au-dessus de 496 px les cartes se partagent la largeur (`flex-grow: 1`), en dessous elles s'empilent et chacune prend toute la largeur.

**Question 2.** Oui : la valeur par défaut de `align-items` est `stretch`, les éléments s'étirent à la hauteur de la plus grande de la ligne.

**Pourquoi `margin-bottom: 0` ?** La règle `.carte` a `margin-bottom: 1.5rem`. Sans la remise à zéro, chaque carte aurait cet espace **en plus** du `gap`. La règle `.cartes .carte` (spécificité plus forte) l'emporte sur `.carte`.

### Étape 3 — Le pied de page en bas

```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    /* ... */
}

main {
    flex: 1;
    width: 100%;
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}
```

**Question.** Sans `width: 100%`, `main` devient **plus étroit** (juste la largeur de son contenu) et reste centré. Dans un conteneur flex, une marge `auto` sur l'axe secondaire (ici horizontal) **annule l'étirement** (`stretch`) : l'élément prend sa largeur « naturelle ». `width: 100%` + `max-width: 45rem` rétablit le comportement précédent : `main` occupe toute la largeur disponible, jusqu'à 45rem, et reste centré.

`header`, `nav` et `footer` n'ont pas de marge automatique : ils restent étirés sur toute la largeur.

#### Pour aller plus loin
- Avec trois liens, `space-between` répartit l'espace entre eux : le lien du milieu se retrouve **au centre** du menu, ce qui n'est pas voulu ici. `margin-left: auto` cible un seul élément.
- Troisième carte : les trois cartes (basis `14rem`) ne tiennent pas sur une ligne dans 688 px (`3 × 224 + 2 × 16 = 704`), elles passent à 2 + 1, et la troisième **s'étire sur toute la largeur** à cause de `flex-grow`. C'est la différence avec Grid, vue dans le bonus.

---

### Code final

#### css/style.css
```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    flex: 1;
    width: 100%;
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

nav a:last-child {
    margin-left: auto;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

.cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cartes .carte {
    flex: 1 1 14rem;
    margin-bottom: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

#### index.html (modifications : le conteneur `.cartes`)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
        </section>

        <section>
            <h2>Mes centres d'intérêt</h2>

            <div class="cartes">
                <article class="carte">
                    <h3>Le jeu vidéo</h3>
                    <p>J'aime les jeux de stratégie et d'aventure.</p>
                </article>

                <article class="carte">
                    <h3>La photographie</h3>
                    <p>Je photographie surtout des paysages.</p>
                </article>
            </div>
        </section>

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

`contact.html` est inchangé.

### Points d'attention

| Erreur fréquente | Explication |
|---|---|
| `display: flex` sur les cartes au lieu du parent | Flexbox s'applique au **conteneur**, sur ses enfants directs. |
| Oubli du conteneur `.cartes` | Sans parent commun, les deux cartes ne peuvent pas être mises en ligne. |
| Cartes avec double espace | Marge basse de `.carte` conservée en plus du `gap`. |
| Pied de page toujours trop haut | `min-height: 100vh` oublié sur le `body`, ou `flex: 1` oublié sur `main`. |
| `main` plus étroit | Marge `auto` en flex : ajouter `width: 100%`. |

---