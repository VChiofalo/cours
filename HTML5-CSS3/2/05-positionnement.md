# Positionnement des éléments : relative, absolute, fixed

Avec le modèle de boîte, nous savons dimensionner un élément et organiser l'espace autour et à l'intérieur de lui. Mais pour l'instant, chaque élément reste **à la place que le navigateur lui attribue** : les blocs s'empilent de haut en bas, les éléments en ligne se suivent de gauche à droite.

La propriété **`position`** permet de **sortir de cet ordre naturel** : décaler un élément, l'ancrer dans le coin d'un parent, le fixer à l'écran, le faire chevaucher un autre.

Dans ce chapitre, nous verrons :
- ce qu'est le **flux normal** de la page ;
- les valeurs de `position` : `static`, `relative`, `absolute`, `fixed` (et `sticky`, pour compléter) ;
- les propriétés de décalage `top`, `right`, `bottom`, `left` ;
- la superposition des éléments avec `z-index` ;
- dans quels cas utiliser le positionnement, et dans quels cas s'en abstenir.

## Le flux normal

Par défaut, le navigateur place les éléments dans l'ordre du HTML, selon leur type d'affichage :
- les éléments de **bloc** se placent les uns **sous** les autres ;
- les éléments **en ligne** se placent les uns **à côté** des autres, comme du texte.

C'est le **flux normal** (*normal flow*). Chaque élément y occupe de la place, et les éléments suivants se placent en tenant compte de celle-ci.
```
┌────────────┐
│     A      │
└────────────┘
┌────────────┐
│     B      │
└────────────┘
┌────────────┐
│     C      │
└────────────┘
```

Ce comportement correspond à la valeur par défaut **`position: static`**. Pour un élément `static`, les propriétés de décalage (`top`, `right`, `bottom`, `left`) **n'ont aucun effet**.

## La propriété `position`

| Valeur | Les décalages se mesurent par rapport à... | Reste dans le flux ? | Usage typique |
|---|---|---|---|
| `static` (défaut) | (décalages ignorés) | oui | tout élément ordinaire |
| `relative` | **sa propre position d'origine** | oui (sa place reste réservée) | petit décalage ; parent de référence d'un élément `absolute` |
| `absolute` | **l'ancêtre positionné** le plus proche | **non** | badges, icônes, menus déroulants, superpositions |
| `fixed` | **la fenêtre** du navigateur | **non** | menu fixe, bouton « retour en haut » |
| `sticky` | son parent, lors du défilement | oui | en-tête de tableau ou menu « collant » |

Un élément dont la valeur de `position` est autre que `static` est dit **positionné**.

## Les décalages : `top`, `right`, `bottom`, `left`

Pour un élément positionné, quatre propriétés indiquent **à quelle distance** de la boîte de référence il se place :

| Propriété | Signification |
|---|---|
| `top` | distance par rapport au bord **haut** de la référence |
| `right` | distance par rapport au bord **droit** |
| `bottom` | distance par rapport au bord **bas** |
| `left` | distance par rapport au bord **gauche** |

Elles acceptent des longueurs (`px`, `rem`...), des pourcentages et `auto`.

Une valeur positive **éloigne l'élément du bord indiqué**. Par exemple, `top: 20px` descend l'élément de 20 px, et `left: 20px` le déplace de 20 px vers la droite. Une valeur négative le rapproche du bord, voire le fait sortir de la référence.

Un raccourci existe pour régler les quatre côtés d'un coup : **`inset`**. `inset: 0` équivaut à `top: 0; right: 0; bottom: 0; left: 0`.

## `position: relative`

Un élément `relative` est **décalé par rapport à sa position normale**, mais il **reste dans le flux** : l'emplacement qu'il occupait **reste réservé**, et les autres éléments **ne bougent pas**.

Prenons trois boîtes :
```html
<div class="boite">A</div>
<div class="boite decalee">B</div>
<div class="boite">C</div>
```
```css
.decalee {
    position: relative;
    top: 10px;
    left: 30px;
}
```

La boîte B est dessinée 10 px plus bas et 30 px plus à droite. Les boîtes A et C **restent exactement où elles étaient**, et l'espace d'origine de B n'est pas récupéré :
```
Sans position            Avec position: relative sur B
┌────────────┐           ┌────────────┐
│     A      │           │     A      │
└────────────┘           └────────────┘
┌────────────┐           ┌ ─ ─ ─ ─ ─ ─┐  ← place d'origine de B (reste vide)
│     B      │              ┌────────────┐
└────────────┘           └ ─ │     B      │  ← B, décalée (peut chevaucher C)
┌────────────┐               └────────────┘
│     C      │           ┌────────────┐
└────────────┘           │     C      │  ← C ne bouge pas
                         └────────────┘
```

On utilise rarement `relative` pour déplacer un élément : pour espacer, les marges sont plus adaptées. Son véritable intérêt est ailleurs : un élément `relative` **sans aucun décalage** devient la **référence** de ses enfants positionnés en `absolute`.

## `position: absolute`

Un élément `absolute` est **sorti du flux** :
- il ne prend **plus de place** : les éléments suivants se comportent comme s'il n'existait pas, et remontent ;
- il ne contribue plus à la hauteur de son parent ;
- sa largeur s'adapte par défaut à son contenu, au lieu de remplir toute la ligne ;
- il est placé **par rapport à l'ancêtre positionné le plus proche**.

### L'ancêtre positionné

Le navigateur remonte les ancêtres de l'élément, du plus proche au plus lointain, et s'arrête au **premier qui est positionné** (c'est-à-dire dont `position` n'est pas `static`). Les décalages se mesurent alors à partir de cet ancêtre, plus précisément à partir de l'intérieur de sa bordure.

Si **aucun ancêtre n'est positionné**, la référence est la **page** elle-même (le coin supérieur gauche du document).

### Le schéma classique : parent `relative`, enfant `absolute`

Voici un badge « Nouveau » posé dans le coin d'une carte :
```html
<article class="carte">
    <span class="badge">Nouveau</span>
    <h2>Atelier HTML</h2>
    <p>Découvrez la structure d'une page web.</p>
</article>
```
```css
.carte {
    position: relative;   /* la carte devient la référence */
}

.badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.25rem 0.75rem;
    background-color: #8b0000;
    color: #ffffff;
    border-radius: 1rem;
}
```
```
┌──────────────── .carte (position: relative) ───────────────┐
│                                       ┌──────────┐          │
│  Atelier HTML                         │ Nouveau  │  ← .badge│
│                                       └──────────┘  top 0.75rem
│  Découvrez la structure d'une page web.               right 0.75rem
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

La carte reste dans le flux et ne bouge pas : `position: relative` sert uniquement à **servir de référence**.

⚠️ Si l'on oublie `position: relative` sur la carte, le badge cherche un autre ancêtre positionné. S'il n'en trouve pas, il se place par rapport à **la page** : il apparaît dans le coin de la page, loin de sa carte.

### Étirer un élément sur toute sa référence

Avec les quatre décalages à `0`, un élément `absolute` remplit **toute** la boîte de référence :
```css
.voile {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
```

C'est la technique classique pour poser un **voile** semi-transparent sur une image ou une carte.

### Centrer un élément dans sa référence

Si un élément `absolute` a une **largeur** et une **hauteur** définies, on peut le centrer en combinant `inset: 0` et des marges automatiques :
```css
.fenetre {
    position: absolute;
    inset: 0;
    width: 20rem;
    height: 10rem;
    margin: auto;
}
```

## `position: fixed`

Un élément `fixed` est lui aussi **sorti du flux**, mais sa référence est **la fenêtre du navigateur**. Il **reste à la même place à l'écran** quand l'utilisateur fait défiler la page.

Les usages les plus courants :
- un **menu** toujours visible en haut de l'écran ;
- un bouton « **retour en haut** » en bas à droite ;
- un bandeau d'information.

### Exemple : un menu fixe
```css
.menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
```

Les trois décalages `top`, `left` et `right` à `0` étirent le menu sur toute la largeur de la fenêtre, collé en haut.

### Exemple : un bouton « retour en haut »
```html
<a class="retour-haut" href="#haut">↑ Haut de page</a>
```
```css
.retour-haut {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
}
```

Le lien pointe vers l'ancre `#haut` (l'`id` placé sur un élément du haut de page, par exemple `<body id="haut">`), comme nous l'avons vu avec les liens d'ancre.

### Les conséquences à prévoir

Un élément `fixed` ne prend plus de place dans la page. Deux conséquences :

**1. Le contenu passe dessous.** Le début de la page se retrouve masqué par le menu. Il faut **réserver la place**, par exemple avec un `padding-top` sur le `body`, égal à la hauteur du menu.

**2. Les ancres sont masquées.** Lorsqu'un lien d'ancre fait défiler la page jusqu'à un titre, celui-ci peut se retrouver caché sous le menu fixe. La propriété `scroll-padding-top`, placée sur `html`, indique au navigateur de garder une marge en haut lors des défilements :
```css
html {
    scroll-padding-top: 3rem;
}
```

⚠️ Un élément fixe doit rester **discret** : sur un petit écran ou avec un texte agrandi, un menu fixe trop grand peut occuper une grande partie de la fenêtre. Il ne doit jamais masquer le contenu, ni l'élément qui a le focus clavier.

## `position: sticky` (pour compléter)

La valeur `sticky` est un mélange de `relative` et de `fixed` : l'élément reste **dans le flux** (sa place est conservée), mais quand le défilement l'amène à une certaine distance du bord de la fenêtre, il **se « colle »** et reste visible.
```css
.menu-collant {
    position: sticky;
    top: 0;
}
```

Le décalage (`top` ici) est **obligatoire** : il indique à quelle distance du bord l'élément se colle. L'élément reste collé tant que son **parent** est visible, puis repart avec lui. Comme `sticky` laisse l'élément dans le flux, il n'y a pas besoin de réserver sa place.

## Superposer des éléments : `z-index`

Les éléments positionnés peuvent **se chevaucher**. Par défaut, celui qui est écrit **le plus tard dans le HTML** est dessiné **par-dessus** les autres.

La propriété `z-index` modifie cet ordre : plus la valeur (un nombre entier) est **élevée**, plus l'élément est placé **au-dessus**.
```css
.menu {
    position: fixed;
    top: 0;
    z-index: 100;
}
```

Quelques règles :
- `z-index` ne fonctionne que sur les éléments **positionnés** (hors `static`) ;
- une valeur négative place l'élément **derrière** les autres ;
- on garde des valeurs simples et espacées (`1`, `10`, `100`) : inutile de monter à `9999` ;
- un élément positionné qui reçoit un `z-index` crée un **contexte d'empilement** : ses enfants sont ordonnés entre eux, mais ne peuvent pas passer au-dessus d'éléments situés dans un autre contexte plus haut. Si un `z-index` « ne marche pas », il faut regarder l'ordre d'empilement des **parents**.

Dans notre exemple de menu fixe, les cartes de la page sont en `position: relative`, ce qui les rend « positionnées » et placées dans l'ordre du HTML. Sans `z-index` sur le menu, elles passeraient **par-dessus** lui en défilant : il faut donc donner au menu un `z-index` supérieur.

## Quand utiliser le positionnement ?

**À utiliser pour :**
- poser un **badge**, une icône, un bouton de fermeture dans le coin d'une boîte ;
- créer un **voile** ou une superposition ;
- afficher un **menu déroulant** sous un bouton ;
- garder un élément **toujours visible** (menu, bouton « retour en haut ») ;
- faire de légers **ajustements** visuels.

**À éviter pour :**
- **mettre en page tout un site** (colonnes, grilles de cartes, alignements) : un élément `absolute` sort du flux et ne s'adapte pas à son entourage, ce qui rend la page fragile dès que le contenu ou la taille de l'écran change. Les outils faits pour cela, **Flexbox** et **Grid**, font l'objet du chapitre suivant ;
- **espacer** des éléments : les marges et les paddings sont faits pour cela.

Un point d'**accessibilité** à garder en tête : le positionnement ne change que l'**apparence**. L'ordre dans lequel les lecteurs d'écran et le clavier parcourent la page reste celui du **HTML**. On évite donc de placer visuellement un contenu très loin de sa position logique dans le code.

## Une méthode simple pour choisir une valeur de `position`

Face à un élément à positionner, on se pose quatre questions :

**1. L'élément doit-il rester à sa place dans le flux ?**

Si oui, on ne fait rien : `static`. S'il faut juste le décaler visuellement, ou en faire la référence d'un enfant, on utilise `relative`.

**2. Doit-il être placé par rapport à un parent précis ?**

On utilise `absolute` sur l'enfant, et `position: relative` sur le parent.

**3. Doit-il rester visible quand on fait défiler la page ?**

On utilise `fixed` (placé par rapport à la fenêtre) ou `sticky` (s'il doit rester dans le flux jusqu'à un certain point).

**4. Plusieurs éléments se chevauchent-ils ?**

On règle l'ordre avec `z-index`, sur des éléments positionnés.

## Exemple complet

Voici une page qui combine un menu fixe, des cartes avec badge et un bouton « retour en haut ».

**ateliers.html**
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Nos ateliers</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body id="haut">

    <nav class="menu">
        <a href="index.html">Accueil</a>
        <a href="ateliers.html" aria-current="page">Ateliers</a>
        <a href="contact.html">Contact</a>
    </nav>

    <main class="contenu">

        <h1>Nos ateliers</h1>

        <article class="carte" id="html">
            <span class="badge">Nouveau</span>
            <h2>Atelier HTML</h2>
            <p>Découvrez la structure d'une page web.</p>
        </article>

        <article class="carte" id="css">
            <h2>Atelier CSS</h2>
            <p>Apprenez à mettre en forme vos pages.</p>
        </article>

        <article class="carte" id="projet">
            <h2>Projet libre</h2>
            <p>Réalisez le site de votre choix, accompagné par l'équipe.</p>
        </article>

    </main>

    <a class="retour-haut" href="#haut">↑ Haut de page</a>

</body>

</html>
```

**css/style.css**
```css
*, *::before, *::after {
    box-sizing: border-box;
}

/* Marge de défilement : les ancres ne passent pas sous le menu fixe */
html {
    scroll-padding-top: 3rem;
}

body {
    margin: 0;
    padding-top: 2.5rem;   /* place réservée pour le menu fixe */
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* Menu fixe en haut de la fenêtre */
.menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0.5rem 1rem;
    background-color: #1f4068;
}

.menu a {
    margin-right: 1rem;
    color: #ffffff;
}

.menu a[aria-current="page"] {
    font-weight: bold;
}

.contenu {
    max-width: 40rem;
    margin: 0 auto;
    padding: 1rem;
}

/* Carte : référence de son badge */
.carte {
    position: relative;
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte h2 {
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

/* Bouton fixe en bas à droite de la fenêtre */
.retour-haut {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    background-color: #336699;
    color: #ffffff;
    text-decoration: none;
    border-radius: 0.25rem;
}
```

**Analyse : le positionnement de chaque élément**

| Élément | `position` | Référence | Reste dans le flux ? | Effet |
|---|---|---|---|---|
| `.menu` | `fixed` | la fenêtre | non | reste collé en haut pendant le défilement ; le `padding-top` du `body` (2,5 rem, soit la hauteur du menu) empêche le titre de passer dessous |
| `.carte` | `relative`, sans décalage | sa propre position | oui | ne bouge pas ; devient la référence du badge |
| `.badge` | `absolute` | la carte, son ancêtre positionné le plus proche | non | placé à 0,75 rem du haut et du bord droit de la carte |
| `.retour-haut` | `fixed` | la fenêtre | non | reste en bas à droite de l'écran |

Deux détails à retenir :
- le menu a un `z-index` de 100 : sans lui, les cartes (positionnées avec `relative`) seraient dessinées par-dessus le menu pendant le défilement ;
- `scroll-padding-top` garantit que, lorsqu'on suit un lien d'ancre vers une carte, son titre ne se cache pas sous le menu.

## Les erreurs courantes à éviter

- **oublier `position: relative` sur le parent d'un élément `absolute`** : l'élément se place alors par rapport à la page ;
- **donner `top` ou `left` à un élément `static`** : les décalages sont ignorés ;
- **oublier que `absolute` et `fixed` sortent du flux** : les éléments suivants remontent, et le parent ne tient plus compte de l'élément dans sa hauteur ;
- **ne pas réserver la place d'un menu fixe**, dont le contenu masque le haut de la page ;
- **ne pas compenser les ancres** : le titre visé reste caché sous le menu fixe ;
- **utiliser `z-index` sur un élément non positionné**, où il n'a pas d'effet ;
- **monter les `z-index` à des valeurs énormes** pour « gagner » : on cherche plutôt le contexte d'empilement des parents ;
- **utiliser `position: relative` avec `top` pour espacer** des éléments : on utilise `margin` ;
- **placer un élément `absolute` au-dessus d'un texte** sans prévoir la place nécessaire : un titre long peut passer sous le badge ;
- **mettre en page tout un site avec des `absolute`** : la page se casse dès que le contenu ou la fenêtre changent ;
- **utiliser de grandes valeurs fixes en `px`** pour des éléments fixes sur petit écran ;
- **déplacer visuellement un contenu** très loin de sa position logique dans le HTML.

## À retenir

La propriété `position` permet de **sortir un élément de sa place naturelle** dans le flux, ou de l'ancrer par rapport à un repère.

```
static      → flux normal (défaut), décalages ignorés
relative    → décalé par rapport à sa position d'origine, reste dans le flux
absolute    → hors flux, placé par rapport à l'ancêtre positionné le plus proche
fixed       → hors flux, placé par rapport à la fenêtre, reste visible au défilement
sticky      → dans le flux, se colle au bord lors du défilement
```

Les règles essentielles :
- `top`, `right`, `bottom`, `left` (et le raccourci `inset`) n'ont d'effet que sur un élément **positionné** ;
- une valeur positive **éloigne** l'élément du bord indiqué ;
- `relative` conserve la place d'origine de l'élément ; les autres éléments ne bougent pas ;
- `absolute` et `fixed` **sortent l'élément du flux** : il ne prend plus de place ;
- le schéma classique est **parent `relative`** + **enfant `absolute`** ;
- sans ancêtre positionné, un élément `absolute` se place par rapport à la **page** ;
- `fixed` se place par rapport à la **fenêtre** : on réserve sa place dans la page et on prévoit une marge de défilement pour les ancres ;
- `sticky` nécessite un décalage (`top`, par exemple) ;
- `z-index` ordonne les éléments **positionnés** qui se chevauchent : plus il est élevé, plus l'élément est au-dessus ;
- le positionnement convient aux **badges, voiles, menus, boutons flottants** ; la mise en page d'ensemble relève de **Flexbox** et **Grid** ;
- le positionnement ne change **pas** l'ordre de lecture au clavier et au lecteur d'écran.

## À vous

Il est temps de passer à la pratique. Allez dans le dossier [exercices](exercices/04-positionnement.md) et faites l'exercice 03 (le lien vous amène sur l'exercice).

---

© Vincent Chiofalo