# Les media queries : compréhension et utilisation

Dans le chapitre précédent, nous avons rendu nos pages plus souples : largeurs maximales, images flexibles, Flexbox avec retour à la ligne, Grid avec colonnes automatiques. Cela suffit pour beaucoup de cas, mais pas pour tous. Parfois, on veut **changer vraiment la mise en page** à partir d'une certaine largeur : passer d'une à deux colonnes, afficher un menu en ligne plutôt qu'en pile, réduire la taille d'un titre.

Pour cela, CSS propose les **media queries** (*requêtes média*) : des règles CSS qui ne s'appliquent que **si une condition est vraie** (largeur de la fenêtre, orientation, impression, préférence de l'utilisateur, etc.).

Dans ce chapitre, nous verrons :
- la **syntaxe** d'une media query ;
- les conditions les plus utiles : largeur, hauteur, orientation, préférences ;
- `min-width` ou `max-width` : lequel choisir, et pourquoi on part du **mobile** ;
- comment **choisir les points de rupture** ;
- comment combiner des conditions ;
- quelques usages concrets : mise en page, impression, mode sombre, animations ;
- les erreurs courantes.

## Qu'est-ce qu'une media query ?

Une media query est un bloc de règles CSS précédé d'une condition :
```css
@media (min-width: 40em) {
    /* ces règles ne s'appliquent que si la fenêtre fait au moins 40em de large */
    .cartes {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

| Partie | Rôle |
|---|---|
| `@media` | Mot-clé qui ouvre une media query (on dit une *règle @*) |
| `(min-width: 40em)` | La **condition**, toujours entre parenthèses |
| `{ ... }` | Les règles CSS à appliquer **si la condition est vraie** |

Tant que la condition est fausse, le bloc est **ignoré**. Dès qu'elle devient vraie (par exemple en agrandissant la fenêtre), les règles s'appliquent, et elles se retirent quand elle redevient fausse. Tout se fait **en direct**, sans recharger la page.

> Une media query **ne change pas la spécificité** des sélecteurs qu'elle contient. Elle fait simplement partie de la cascade, comme le reste de la feuille de style (voir le chapitre sur la cascade).

## La syntaxe complète

```css
@media type and (condition) and (condition) {
    /* règles */
}
```

### Le type de média (facultatif)

| Type | Concerne |
|---|---|
| `all` | Tous les supports (valeur par défaut si omis) |
| `screen` | Les écrans |
| `print` | L'impression et l'aperçu avant impression |

```css
@media screen and (min-width: 40em) { ... }
@media print { ... }
```
On écrit souvent `screen` pour les mises en page, mais on peut l'omettre.

### Les conditions : les caractéristiques de média

Une condition est de la forme `(caractéristique: valeur)`.

| Caractéristique | Teste | Exemple |
|---|---|---|
| `width` / `min-width` / `max-width` | La largeur du viewport | `(min-width: 40em)` |
| `height` / `min-height` / `max-height` | La hauteur du viewport | `(min-height: 40em)` |
| `orientation` | Portrait ou paysage | `(orientation: landscape)` |
| `prefers-color-scheme` | Le thème clair ou sombre choisi par l'utilisateur | `(prefers-color-scheme: dark)` |
| `prefers-reduced-motion` | L'utilisateur souhaite moins d'animations | `(prefers-reduced-motion: reduce)` |
| `hover` | Le principal appareil de pointage sait-il survoler ? | `(hover: hover)` |
| `pointer` | Précision du pointeur : `fine` (souris), `coarse` (doigt) | `(pointer: coarse)` |
| `resolution` | La densité de pixels de l'écran | `(min-resolution: 2dppx)` |

La **largeur** est de loin la plus utilisée en responsive.

### Les opérateurs

| Opérateur | Sens | Exemple |
|---|---|---|
| `and` | Les deux conditions doivent être vraies | `(min-width: 40em) and (orientation: landscape)` |
| `,` (virgule) | L'une **ou** l'autre | `(max-width: 30em), (orientation: portrait)` |
| `not` | Inverse toute la requête | `not print` |

```css
/* Écran large ET en paysage */
@media (min-width: 60em) and (orientation: landscape) { ... }

/* Largeur inférieure à 30em OU orientation portrait */
@media (max-width: 30em), (orientation: portrait) { ... }
```

### La syntaxe par intervalles (récente)

Les navigateurs actuels acceptent aussi une écriture avec les symboles `<`, `>`, `<=`, `>=`, plus lisible :

| Écriture classique | Écriture par intervalles |
|---|---|
| `(min-width: 40em)` | `(width >= 40em)` |
| `(max-width: 40em)` | `(width <= 40em)` |
| `(min-width: 40em) and (max-width: 60em)` | `(40em <= width <= 60em)` |

Les deux sont correctes. L'écriture classique est la plus répandue dans les ressources existantes, et il faut savoir la lire ; l'écriture par intervalles est utile pour éviter l'erreur de chevauchement décrite plus loin.

## `min-width` ou `max-width` ? Le mobile first

C'est la question centrale, et elle fait le lien avec le **mobile first** du chapitre précédent.

| Condition | Vraie quand... | Approche |
|---|---|---|
| `(min-width: 40em)` | la fenêtre fait **au moins** 40em | **Mobile first** : on **ajoute** des règles pour les écrans plus larges |
| `(max-width: 40em)` | la fenêtre fait **au plus** 40em | **Desktop first** : on **retire ou réduit** pour les petits écrans |

### Mobile first avec `min-width`

```css
/* 1. CSS de base : petits écrans (aucune media query) */
.cartes {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;               /* 1 colonne */
}

/* 2. À partir de 40em : 2 colonnes */
@media (min-width: 40em) {
    .cartes {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* 3. À partir de 64em : 3 colonnes */
@media (min-width: 64em) {
    .cartes {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

| Largeur de fenêtre | Colonnes | Règle appliquée |
|---|---|---|
| moins de 40em (640 px) | 1 | base |
| de 40em à moins de 64em | 2 | base + première media query |
| 64em (1024 px) et plus | 3 | base + les deux media queries |

Les media queries **s'accumulent** : au-delà de 64em, les deux blocs sont vrais et s'appliquent ensemble. La seconde l'emporte sur la première car elle vient **après** dans la feuille de style (à spécificité égale, la dernière règle gagne).

> **L'ordre compte.** Les media queries se placent **après** les règles de base qu'elles modifient. Si on met `@media` avant la règle de base, la règle de base (placée plus loin) l'emporte et la media query est sans effet.

### Pourquoi le mobile first est préférable ?

- Le CSS de base (sans media query) correspond à la version la plus simple, appliquée partout, y compris par un navigateur qui ne comprendrait pas les media queries.
- On **ajoute** de la mise en page quand la place le permet, au lieu de la défaire.
- Les petits appareils, souvent les moins puissants, n'ont à traiter que les règles utiles pour eux.

## Choisir ses points de rupture

### Se baser sur le contenu, pas sur les appareils

On rencontre des listes de « tailles d'appareils » (iPhone, iPad, etc.). Elles deviennent vite obsolètes, car il existe des milliers de tailles d'écran, et une fenêtre d'ordinateur peut avoir n'importe quelle largeur.

La bonne méthode est la suivante :
1. Écrire le CSS de base, pour l'écran le plus étroit.
2. **Agrandir progressivement la fenêtre.**
3. Quand la mise en page « casse » ou devient mal proportionnée (lignes de texte trop longues, grands espaces vides, éléments trop étirés), **ajouter un point de rupture à cet endroit**.

Les points de rupture sont donc fixés par **le contenu**.

### Valeurs courantes

On finit toujours par choisir quelques valeurs, utilisées de façon cohérente dans tout le site :

| Valeur | En pixels (1em = 16 px) | Usage typique |
|---|---|---|
| `40em` | 640 px | grands téléphones, petites tablettes |
| `48em` | 768 px | tablettes |
| `64em` | 1024 px | petits ordinateurs, tablettes en paysage |
| `80em` | 1280 px | grands écrans |

Ce ne sont que des **repères**. Peu de points de rupture suffisent : deux ou trois pour un petit site.

### Pourquoi `em` plutôt que `px` ?

On peut écrire `(min-width: 640px)` ou `(min-width: 40em)`. Préférez `em` (ou `rem`) : la condition suit alors la taille de police de l'utilisateur. Si une personne agrandit sa police par défaut, le point de rupture se déclenche plus tôt, et la mise en page passe à une version plus étroite. Cela convient mieux à un texte agrandi.

> **Particularité.** Dans une media query, `em` et `rem` valent tous les deux la taille de police **par défaut du navigateur** (16 px en général), et **non** la taille définie dans votre CSS (`html { font-size: ... }` n'a aucun effet ici).

## Où écrire les media queries ?

### Dans la feuille de style (cas général)

On place les media queries dans `style.css`, après les règles qu'elles modifient. Deux organisations courantes :

| Organisation | Principe |
|---|---|
| **Par composant** | Chaque composant (menu, cartes...) est suivi de ses propres media queries |
| **En fin de fichier** | Toutes les media queries sont regroupées à la fin |

La première organisation est plus facile à maintenir : tout ce qui concerne un composant est au même endroit. C'est celle que nous utiliserons.

### Dans la balise `<link>` (cas particulier)

Un attribut `media` permet de charger une feuille de style entière seulement dans certaines conditions :
```html
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/impression.css" media="print">
```

La seconde feuille s'applique uniquement à l'impression. Elle est quand même téléchargée, mais sans bloquer l'affichage de la page.

## Exemples d'usage

### Un menu en pile puis en ligne

Sur mobile, des liens empilés occupant toute la largeur sont plus faciles à toucher. Sur grand écran, on les met en ligne.
```css
nav {
    display: flex;
    flex-direction: column;     /* en pile sur mobile */
    gap: 0.5rem;
    padding: 0.5rem 1rem;
}

@media (min-width: 40em) {
    nav {
        flex-direction: row;    /* en ligne dès 40em */
    }
}
```

### Des tailles de texte qui s'adaptent

```css
h1 {
    font-size: 1.75rem;
}

@media (min-width: 48em) {
    h1 {
        font-size: 2.5rem;
    }
}
```

### Une section à deux colonnes seulement quand il y a de la place

Sur mobile, l'image est au-dessus du texte (disposition normale). À partir de 40em, on passe à deux colonnes.
```css
.apropos {
    /* mobile : empilé, aucun réglage particulier */
}

@media (min-width: 40em) {
    .apropos {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1rem;
        align-items: center;
    }
}
```

### Tenir compte de la hauteur

Un en-tête fixe prend une grande part de l'écran d'un téléphone tenu à l'horizontale (par exemple 360 px de hauteur). On peut ne le coller qu'aux fenêtres assez hautes :
```css
@media (min-height: 40em) {
    header {
        position: sticky;
        top: 0;
    }
}
```

### Adapter l'interface au toucher

```css
/* Effet de survol seulement avec un appareil capable de survoler */
@media (hover: hover) {
    nav a:hover {
        background-color: #e8eef5;
    }
}

/* Zones plus grandes pour un pointeur imprécis (doigt) */
@media (pointer: coarse) {
    nav a {
        padding: 0.875rem 1.25rem;
    }
}
```

### Respecter les préférences de l'utilisateur

Deux préférences, réglées dans le système d'exploitation, sont accessibles en CSS :
```css
/* Thème sombre */
@media (prefers-color-scheme: dark) {
    body {
        color: #e6e6e6;
        background-color: #14181d;
    }

    .carte {
        background-color: #1e2630;
        border-color: #34404d;
    }
}

/* Moins d'animations */
@media (prefers-reduced-motion: reduce) {
    * {
        transition: none;
        animation: none;
    }
}
```
Respecter `prefers-reduced-motion` est une règle d'**accessibilité** : certaines personnes sont gênées, voire malades, face aux animations.

> Quand on ajoute un thème sombre, il faut **revérifier tous les contrastes** (voir le chapitre sur les couleurs). Un titre bleu foncé sur fond foncé devient illisible.

### Préparer l'impression

```css
@media print {
    nav,
    footer {
        display: none;               /* inutile sur papier */
    }

    body {
        color: #000000;
        background-color: #ffffff;
    }

    a[href]::after {
        content: " (" attr(href) ")"; /* affiche l'adresse du lien sur papier */
    }
}
```
Le navigateur utilise ces règles pour l'aperçu avant impression (`Ctrl+P`) : on peut les tester sans imprimante.

## Tester ses media queries

Avec les outils de développement (`F12`) :
- le **mode appareil** (`Ctrl+Maj+M`) permet de choisir une largeur et de tirer sur les bords de la fenêtre ;
- Chrome et Edge peuvent afficher au-dessus de la page des **barres colorées** qui correspondent aux media queries du CSS (option « Show media queries » du mode appareil) : un clic sur une barre place la fenêtre à la largeur correspondante ;
- l'onglet **Styles** grise les règles dont la media query est fausse ;
- le menu *Rendering* (rendu) permet de **simuler** `prefers-color-scheme`, `prefers-reduced-motion` ou le média `print`.

## Une méthode simple pour une page responsive

1. Vérifier la présence de `<meta name="viewport" ...>` dans le HTML.
2. Écrire le **CSS de base** pour la plus petite largeur (320 px) : une colonne, texte lisible, éléments empilés.
3. Agrandir la fenêtre jusqu'à ce que quelque chose cloche.
4. Ajouter à cet endroit une media query `min-width` avec le **minimum de changements**.
5. Recommencer jusqu'à la largeur maximale visée.
6. Tester les cas particuliers : paysage, zoom à 200 %, impression, thème sombre.

## Exemple complet

Reprenons la page du chapitre précédent, et complétons-la avec des media queries (le HTML est identique, les cartes sont dans un conteneur `.cartes`, la section d'introduction porte la classe `apropos`).

```css
/* ===== Base (mobile first) ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-color: #336699;
    color: #ffffff;
    text-align: center;
}

h1 {
    margin: 0;
    font-size: 1.75rem;
}

/* ===== Menu : en pile sur mobile ===== */
nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

nav a {
    padding: 0.75rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    color: #0b5cad;
    text-align: center;
    text-decoration: none;
}

/* ===== Contenu ===== */
main {
    max-width: 60rem;
    margin: 0 auto;
    padding: 1rem;
}

/* ===== Section "À propos" : empilée sur mobile ===== */
.apropos img {
    margin-bottom: 1rem;
}

/* ===== Cartes : une colonne sur mobile ===== */
.cartes {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.carte {
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

/* ===== Pied de page ===== */
footer {
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

/* ===== À partir de 40em (640 px) ===== */
@media (min-width: 40em) {
    nav {
        flex-direction: row;
    }

    .apropos {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1rem;
        align-items: center;
    }

    .apropos h2 {
        grid-column: 1 / -1;
        margin: 0;
    }

    .apropos img {
        margin: 0;
    }

    .cartes {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ===== À partir de 48em (768 px) ===== */
@media (min-width: 48em) {
    h1 {
        font-size: 2.5rem;
    }
}

/* ===== À partir de 64em (1024 px) ===== */
@media (min-width: 64em) {
    .cartes {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* ===== En-tête collé seulement si la fenêtre est assez haute ===== */
@media (min-height: 40em) {
    header {
        position: sticky;
        top: 0;
    }
}

/* ===== Souris et toucher ===== */
@media (hover: hover) {
    nav a:hover {
        background-color: #e8eef5;
    }
}

/* ===== Thème sombre ===== */
@media (prefers-color-scheme: dark) {
    body {
        color: #e6e6e6;
        background-color: #14181d;
    }

    nav {
        background-color: #1b2430;
    }

    nav a {
        background-color: #232d3a;
        color: #8fc1ff;
    }

    .carte {
        background-color: #1e2630;
        border-color: #34404d;
    }

    footer {
        background-color: #0d1014;
    }
}

/* ===== Impression ===== */
@media print {
    nav,
    footer {
        display: none;
    }

    body {
        color: #000000;
        background-color: #ffffff;
    }
}
```

### Analyse

| Partie | Rôle |
|---|---|
| Règles de base | Version mobile : tout est empilé, une colonne |
| `@media (min-width: 40em)` | Menu en ligne, section « À propos » à deux colonnes, cartes sur deux colonnes |
| `@media (min-width: 48em)` | Le titre principal grossit |
| `@media (min-width: 64em)` | Les cartes passent sur trois colonnes |
| `@media (min-height: 40em)` | L'en-tête reste visible uniquement quand la fenêtre est assez haute |
| `@media (hover: hover)` | L'effet de survol n'existe que pour les appareils qui savent survoler |
| `@media (prefers-color-scheme: dark)` | Palette sombre si l'utilisateur l'a choisie |
| `@media print` | Menu et pied de page retirés à l'impression |

### Ce que l'on observe en redimensionnant

| Largeur de fenêtre | Menu | « À propos » | Cartes |
|---|---|---|---|
| 360 px | en pile | image au-dessus du texte | 1 colonne |
| 700 px | en ligne | 2 colonnes | 2 colonnes |
| 1100 px | en ligne | 2 colonnes | 3 colonnes |

### Comparaison avec la technique sans media query

| | `auto-fit` + `minmax` | Media queries |
|---|---|---|
| Nombre de colonnes | Calculé par le navigateur | Choisi par le développeur |
| Liberté | Limitée à « autant de colonnes que possible » | Totale : on peut changer toute la structure |
| Quand l'utiliser | Grilles de cartes régulières | Changements de structure (menu, colonnes, tailles de texte) |

Les deux techniques se **complètent** : on utilise `auto-fit` pour les grilles régulières, et les media queries pour tout le reste.

## Les erreurs courantes à éviter

| Erreur | Conséquence | Correction |
|---|---|---|
| Oublier `<meta name="viewport">` | Les media queries se basent sur une largeur de 980 px sur mobile et ne se déclenchent pas comme prévu | L'ajouter dans le `<head>` |
| Oublier les parenthèses : `@media min-width: 40em` | Requête invalide, ignorée | `@media (min-width: 40em)` |
| Oublier l'espace après `and` : `and(min-width: 40em)` | Requête invalide | `and (min-width: 40em)` |
| Placer la media query **avant** la règle de base | La règle de base l'emporte | La placer après |
| Oublier une accolade fermante | Toutes les règles suivantes sont mal interprétées | Vérifier chaque `{` et `}` |
| Mélanger `min-width` et `max-width` dans la même feuille | Cas intermédiaires oubliés ou conflits | Choisir `min-width` (mobile first) |
| Plages qui se chevauchent : `(max-width: 48em)` et `(min-width: 48em)` | À exactement 48em, **les deux** sont vraies | `(width < 48em)` et `(width >= 48em)` |
| Valeurs en `px` partout | Ne suit pas la taille de police de l'utilisateur | `em` |
| Trop de points de rupture | CSS difficile à maintenir | 2 à 3 suffisent pour un petit site |
| Points de rupture par appareil (« iPhone », « iPad ») | Obsolète rapidement | Les fixer d'après le contenu |
| Redéfinir toute la règle dans la media query | Code dupliqué | Ne réécrire que les **propriétés qui changent** |
| Ne tester qu'à quelques tailles | Défauts entre deux largeurs | Redimensionner **lentement** la fenêtre |

## À retenir

- Une **media query** applique des règles CSS **seulement si une condition est vraie** : `@media (condition) { ... }`.
- Conditions principales : **largeur** (`min-width`, `max-width`), hauteur, `orientation`, `hover`, `pointer`, et les préférences `prefers-color-scheme` et `prefers-reduced-motion`.
- Opérateurs : `and` (les deux), `,` (l'un ou l'autre), `not`. L'écriture par intervalles `(width >= 40em)` est équivalente et plus lisible.
- En **mobile first**, le CSS de base décrit la version étroite, et on ajoute des media queries `min-width` pour élargir. Les media queries **s'accumulent** et se placent **après** les règles de base.
- On choisit les **points de rupture d'après le contenu**, en agrandissant la fenêtre jusqu'à ce que la mise en page cloche. On les exprime en `em`.
- Une media query n'ajoute **aucune spécificité** : l'ordre dans la feuille de style reste déterminant.
- On ne redéfinit dans une media query **que ce qui change**.
- Les media queries servent aussi à **l'impression**, au **thème sombre**, aux **animations réduites** et à l'adaptation au **toucher**.
- `auto-fit` + `minmax` et les media queries sont **complémentaires**.
- On teste en redimensionnant lentement, avec le mode appareil et les outils de simulation du navigateur.

---

© Vincent Chiofalo