# Flexbox et grid pour la mise en page

Nous savons maintenant dimensionner des boîtes (modèle de boîte) et en positionner quelques-unes (`relative`, `absolute`, `fixed`). Mais pour **organiser une page entière** (placer des éléments côte à côte, créer des colonnes, aligner des cartes, centrer un contenu), ces outils sont mal adaptés : un élément `absolute` sort du flux et ne s'adapte plus à son entourage.

CSS propose deux systèmes faits pour cela :
- **Flexbox** (*Flexible Box Layout*) : organiser des éléments sur **un seul axe**, en ligne ou en colonne ;
- **Grid** (*CSS Grid Layout*) : organiser des éléments sur **deux axes**, en lignes **et** en colonnes.

Dans ce chapitre, nous verrons :
- le vocabulaire commun : **conteneur** et **éléments** ;
- Flexbox : axes, alignements, espacement, retour à la ligne, et taille des éléments ;
- Grid : colonnes, lignes, unité `fr`, placement, zones nommées ;
- comment **choisir** entre les deux, et comment les **combiner**.

## Conteneur et éléments

Flexbox et Grid reposent sur la même idée : on déclare un **conteneur**, et ses **enfants directs** deviennent des **éléments** (*items*) que le conteneur organise.
```html
<div class="conteneur">
    <div class="element">1</div>
    <div class="element">2</div>
    <div class="element">3</div>
</div>
```
```
div.conteneur        ← les propriétés de disposition se règlent ici
├── div.element      ← ces enfants directs sont les éléments
├── div.element
└── div.element
```

Deux règles à retenir :
- les propriétés de disposition se placent **sur le conteneur** (le parent) ;
- seuls les **enfants directs** sont organisés : les petits-enfants ne le sont pas (mais ils peuvent former eux-mêmes un nouveau conteneur).

On active Flexbox ou Grid avec la propriété `display`, que nous avons déjà rencontrée pour `block`, `inline` et `inline-block` :
```css
.conteneur { display: flex; }   /* conteneur Flexbox */
.conteneur { display: grid; }   /* conteneur Grid */
```

Un conteneur `flex` ou `grid` se comporte comme un **élément de bloc** vis-à-vis de l'extérieur : il occupe toute la largeur disponible. Les variantes `inline-flex` et `inline-grid` existent mais sont rarement utiles.

## Flexbox : organiser sur un axe

### Premier exemple

Avec trois boîtes dans un conteneur :
```html
<div class="rangee">
    <div class="boite">1</div>
    <div class="boite">2</div>
    <div class="boite">3</div>
</div>
```
```css
.rangee {
    display: flex;
}
```

Sans autre réglage, les trois `<div>`, qui s'empilaient en blocs, se retrouvent **côte à côte**. Les éléments :
- se placent sur **une seule ligne**, les uns après les autres ;
- ont la **largeur de leur contenu** ;
- ont tous la **même hauteur** (celle du plus grand).

### L'axe principal et l'axe secondaire

Un conteneur flex a deux axes :
- l'**axe principal** (*main axis*) : la direction dans laquelle les éléments se suivent ;
- l'**axe secondaire** (*cross axis*) : la direction perpendiculaire.

Par défaut, l'axe principal est **horizontal** (de gauche à droite).
```
flex-direction: row (par défaut)

axe principal  ──────────────────────►
┌─────────────────────────────────────┐ ▲
│  ┌────┐   ┌────┐   ┌────┐           │ │ axe
│  │ 1  │   │ 2  │   │ 3  │           │ │ secondaire
│  └────┘   └────┘   └────┘           │ │
└─────────────────────────────────────┘ ▼
```

La propriété **`flex-direction`** choisit l'axe principal :

| Valeur | Axe principal |
|---|---|
| `row` (défaut) | horizontal, de gauche à droite |
| `row-reverse` | horizontal, de droite à gauche |
| `column` | **vertical**, de haut en bas |
| `column-reverse` | vertical, de bas en haut |

Avec `flex-direction: column`, les rôles sont **échangés** : l'axe principal devient vertical et l'axe secondaire horizontal. C'est essentiel pour comprendre les alignements qui suivent.

### Aligner sur l'axe principal : `justify-content`

`justify-content` répartit les éléments **le long de l'axe principal** (en ligne : horizontalement).
```
flex-start      |[1][2][3]            |
center          |      [1][2][3]      |
flex-end        |            [1][2][3]|
space-between   |[1]      [2]      [3]|
space-around    | [1]     [2]     [3] |
space-evenly    |  [1]    [2]    [3]  |
```

| Valeur | Effet |
|---|---|
| `flex-start` (défaut) | éléments au début de l'axe |
| `center` | éléments centrés |
| `flex-end` | éléments à la fin de l'axe |
| `space-between` | espace réparti **entre** les éléments, le premier et le dernier touchent les bords |
| `space-around` | espace autour de chaque élément (demi-espace aux extrémités) |
| `space-evenly` | espaces **identiques** partout, extrémités comprises |

### Aligner sur l'axe secondaire : `align-items`

`align-items` aligne les éléments **sur l'axe secondaire** (en ligne : verticalement).

| Valeur | Effet |
|---|---|
| `stretch` (défaut) | les éléments sont **étirés** pour occuper toute la hauteur du conteneur |
| `flex-start` | alignés en haut |
| `center` | centrés verticalement |
| `flex-end` | alignés en bas |
| `baseline` | alignés sur la ligne de base de leur texte |

L'étirement par défaut explique pourquoi des éléments côte à côte ont la même hauteur.

⚠️ Pour voir l'effet de `align-items`, il faut que le conteneur soit **plus haut que ses éléments** (par exemple avec une `height` ou une `min-height`). Si le conteneur a juste la hauteur de son plus grand élément, il n'y a pas d'espace à répartir.

#### Centrer un élément dans un conteneur

La combinaison classique, très utilisée :
```css
.centre {
    display: flex;
    justify-content: center;   /* centré sur l'axe principal */
    align-items: center;       /* centré sur l'axe secondaire */
    min-height: 10rem;
}
```

Elle centre le contenu **horizontalement et verticalement**, ce qui était délicat avec les techniques précédentes.

### Espacer les éléments : `gap`

La propriété `gap` crée un **espace régulier entre les éléments**, sans en ajouter autour :
```css
.rangee {
    display: flex;
    gap: 1rem;
}
```

Elle remplace avantageusement les marges : on n'a plus besoin d'ajouter une marge à chaque élément sauf le dernier. On peut aussi régler séparément `row-gap` (entre les lignes) et `column-gap` (entre les colonnes).

### Passer à la ligne : `flex-wrap`

Par défaut (`flex-wrap: nowrap`), tous les éléments restent sur **une seule ligne**, quitte à être **rétrécis** pour tenir. Avec `flex-wrap: wrap`, les éléments qui ne tiennent plus **passent à la ligne suivante** :
```css
.rangee {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
```

### La taille des éléments : `flex-grow`, `flex-shrink`, `flex-basis`

Trois propriétés, à placer **sur les éléments**, contrôlent la façon dont ils se partagent l'espace de l'axe principal :

| Propriété | Rôle | Valeur par défaut |
|---|---|---|
| `flex-basis` | taille de départ de l'élément sur l'axe principal | `auto` (sa `width`, ou celle de son contenu) |
| `flex-grow` | part de l'**espace libre** que l'élément peut absorber | `0` (il ne grandit pas) |
| `flex-shrink` | capacité de l'élément à **rétrécir** s'il manque de place | `1` (il peut rétrécir) |

#### Le raccourci `flex`

On écrit presque toujours ces trois valeurs avec le raccourci `flex` (dans l'ordre : `grow`, `shrink`, `basis`) :

| Écriture | Équivalent | Effet |
|---|---|---|
| `flex: 1` | `1 1 0%` | l'élément **partage l'espace en parts égales** avec ses frères |
| `flex: 2` | `2 1 0%` | l'élément prend **deux fois plus** d'espace que ceux à `flex: 1` |
| `flex: auto` | `1 1 auto` | grandit à partir de sa taille naturelle |
| `flex: none` | `0 0 auto` | taille naturelle, ni grandit ni rétrécit |
| `flex: 0 0 15rem` | | largeur **fixe** de 15 rem |

Exemple : une mise en page à deux colonnes, avec une barre latérale de largeur fixe :
```html
<div class="mise-en-page">
    <main class="principal">Contenu principal</main>
    <aside class="lateral">Informations</aside>
</div>
```
```css
.mise-en-page {
    display: flex;
    gap: 1rem;
}

.principal {
    flex: 1;             /* prend tout l'espace restant */
}

.lateral {
    flex: 0 0 15rem;     /* 15 rem fixes, ne grandit pas, ne rétrécit pas */
}
```

L'élément `.principal` occupe toute la largeur qui n'est pas prise par la barre latérale et par le `gap`. Quand la fenêtre change de taille, c'est lui qui s'adapte.

### Réglages individuels

Quelques propriétés complètent le tableau, pour un élément en particulier :

| Propriété | Effet |
|---|---|
| `align-self` | remplace l'`align-items` du conteneur pour **cet élément** (`flex-start`, `center`, `flex-end`, `stretch`) |
| `order` | change l'ordre d'affichage (valeur entière, `0` par défaut) |
| `margin: auto` | une marge automatique **absorbe tout l'espace libre** dans sa direction |

La marge automatique est une astuce très utile : dans un conteneur flex, elle **repousse** l'élément à l'autre bout.
```css
.menu .connexion {
    margin-left: auto;   /* repoussé tout à droite */
}
```

⚠️ `order` ne change que **l'affichage**. L'ordre de lecture des lecteurs d'écran et de navigation au clavier reste celui du HTML. Si l'ordre visuel diffère trop de l'ordre du code, la page devient déroutante : il vaut mieux réorganiser le HTML.

### Exemples d'usage

#### Un menu horizontal

Nous avions écrit un menu comme une liste (`<nav>`, `<ul>`, `<li>`, `<a>`). Avec Flexbox, il devient horizontal en quelques lignes :
```css
.menu {
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
}
```

Le conteneur est le `<ul>`, les éléments sont les `<li>`. Le retrait par défaut de la liste (padding) et les puces sont supprimés.

#### Un pied de page qui reste en bas

Pour que le pied de page se place en bas de la fenêtre même quand le contenu est court, **sans** le fixer, on transforme le `body` en colonne flex qui occupe au moins toute la hauteur de la fenêtre :
```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;     /* le contenu principal absorbe l'espace libre */
}
```

L'unité `vh` (*viewport height*) vaut 1 % de la hauteur de la fenêtre : `100vh` représente toute la hauteur visible. On utilise `min-height` et non `height`, pour que la page puisse grandir si le contenu est plus long.

## Grid : organiser sur deux axes

Flexbox organise **une ligne ou une colonne à la fois**. Pour une véritable **grille** (des éléments alignés à la fois verticalement et horizontalement), on utilise Grid.

### Vocabulaire

```
        ligne 1   ligne 2   ligne 3   ligne 4        ← lignes de colonnes
          │         │         │         │
ligne 1 ──┼─────────┼─────────┼─────────┤
          │ cellule │ cellule │ cellule │   ← une rangée
ligne 2 ──┼─────────┼─────────┼─────────┤
          │ cellule │ cellule │ cellule │
ligne 3 ──┴─────────┴─────────┴─────────┘
```

- une **colonne** et une **rangée** (ou ligne de la grille) forment les **pistes** (*tracks*) ;
- une **cellule** est l'intersection d'une colonne et d'une rangée ;
- les **lignes de la grille** (*grid lines*) sont les traits qui délimitent les pistes, **numérotés à partir de 1** ;
- une **zone** (*area*) est un ensemble rectangulaire de cellules.

Attention : dans le vocabulaire de Grid, les « lignes » (*grid lines*) désignent les **traits de séparation**, et non les rangées.

### Définir les colonnes : `grid-template-columns`

```css
.grille {
    display: grid;
    grid-template-columns: 15rem 1fr 1fr;
    gap: 1rem;
}
```

Cette règle crée **trois colonnes** : la première de 15 rem, les deux autres se partageant l'espace restant à parts égales. Les éléments enfants viennent **remplir les cellules dans l'ordre** : de gauche à droite, puis ligne par ligne. Les rangées sont créées automatiquement selon le nombre d'éléments.

#### L'unité `fr`

L'unité **`fr`** (*fraction*) représente une **part de l'espace disponible**, une fois les tailles fixes et les `gap` déduits.

| Écriture | Résultat |
|---|---|
| `1fr 1fr 1fr` | trois colonnes égales |
| `1fr 2fr` | deux colonnes, la seconde **deux fois plus large** que la première |
| `15rem 1fr` | une colonne fixe de 15 rem, et une colonne qui prend tout le reste |
| `200px 1fr 100px` | fixe, souple, fixe |

Une colonne en pourcentage ne tient pas compte du `gap` et peut déborder ; avec `fr`, le calcul est automatique.

#### La fonction `repeat()`

Pour ne pas répéter les valeurs :
```css
grid-template-columns: repeat(3, 1fr);      /* équivaut à 1fr 1fr 1fr */
```

#### Des colonnes qui s'adaptent seules : `auto-fit` et `minmax()`

La fonction `minmax(min, max)` définit une taille **comprise entre deux valeurs**. Associée à `repeat(auto-fit, ...)`, elle permet de créer une grille qui **adapte automatiquement le nombre de colonnes** à la largeur disponible :
```css
.cartes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1rem;
}
```

Lecture : « autant de colonnes que possible, chacune d'au moins 14 rem, et qui se partagent l'espace restant à parts égales (`1fr`) ». Quand la fenêtre rétrécit, le nombre de colonnes diminue de lui-même, **sans règle spécifique** pour les petits écrans.

`auto-fit` fait **disparaître** les colonnes vides, ce qui étire les éléments pour occuper la place. Son cousin `auto-fill` conserve les colonnes vides.

### Définir les rangées : `grid-template-rows`

On peut aussi fixer les rangées :
```css
.grille {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr auto;
}
```

Les mots-clés utiles : `auto` (la hauteur du contenu) et `fr` (une part de l'espace restant, si le conteneur est plus haut que son contenu). Si on ne définit pas les rangées, elles sont créées automatiquement à la hauteur de leur contenu ; `grid-auto-rows` permet d'en régler la taille (par exemple `grid-auto-rows: minmax(8rem, auto)`).

### Placer un élément : `grid-column` et `grid-row`

Par défaut, les éléments remplissent les cellules dans l'ordre. Pour un élément en particulier, on peut choisir son emplacement grâce aux **numéros de lignes** :
```css
.vedette {
    grid-column: 1 / 3;     /* de la ligne 1 à la ligne 3 : occupe 2 colonnes */
}

.bandeau {
    grid-column: 1 / -1;    /* de la première à la dernière ligne : toute la largeur */
}
```

On peut aussi indiquer un nombre de pistes à occuper avec le mot-clé `span` :
```css
.large {
    grid-column: span 2;    /* occupe 2 colonnes */
}

.haut {
    grid-row: span 2;       /* occupe 2 rangées */
}
```

La valeur `-1` désigne la dernière ligne de la grille définie.

### Dessiner sa page avec des zones nommées

La méthode la plus lisible pour une mise en page complète consiste à **dessiner la grille** avec des noms de zones :
```css
.page {
    display: grid;
    grid-template-columns: 1fr 15rem;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "entete  entete"
        "contenu lateral"
        "pied    pied";
    min-height: 100vh;
}

.entete  { grid-area: entete; }
.contenu { grid-area: contenu; }
.lateral { grid-area: lateral; }
.pied    { grid-area: pied; }
```

Chaque chaîne représente **une rangée**, et chaque mot **une colonne** : le schéma ressemble à la page obtenue.
```
┌───────────────────────────────┐
│            entete             │   auto
├────────────────────┬──────────┤
│                    │          │
│      contenu       │  lateral │   1fr
│                    │          │
├────────────────────┴──────────┤
│             pied              │   auto
└───────────────────────────────┘
     1fr                 15rem
```

Règles à respecter :
- chaque rangée contient le **même nombre** de noms ;
- une zone doit former un **rectangle** (pas de forme en L) ;
- un point `.` désigne une cellule vide ;
- chaque élément choisit sa zone avec `grid-area: nom` (le nom d'une zone n'est pas une classe CSS : c'est un nom choisi librement).

Les éléments sémantiques HTML (`<header>`, `<main>`, `<aside>`, `<footer>`) se prêtent très bien à cette technique : chacun devient une zone.

⚠️ Comme pour `order`, placer un élément dans une autre zone que celle que suggère le HTML ne change que **l'aspect visuel** : l'ordre de lecture reste celui du code.

Comme dans l'exemple du pied de page flex, `min-height: 100vh` et une rangée `1fr` au centre repoussent le pied de page **en bas de la fenêtre**, sans le fixer.

### Aligner dans une grille

Grid dispose des mêmes outils d'alignement que Flexbox, avec deux niveaux.

**1. Aligner les éléments dans leur cellule**

| Propriété | Axe | Valeurs |
|---|---|---|
| `justify-items` | horizontal | `stretch` (défaut), `start`, `center`, `end` |
| `align-items` | vertical | `stretch` (défaut), `start`, `center`, `end` |

Le raccourci `place-items: center` règle les deux : centré dans chaque cellule.

**2. Répartir la grille dans le conteneur**

Quand la grille est plus petite que son conteneur, `justify-content` et `align-content` répartissent les pistes (mêmes valeurs que dans Flexbox : `center`, `space-between`...).

Pour un **élément isolé**, `justify-self` et `align-self` remplacent la valeur du conteneur.

Centrer un contenu avec Grid :
```css
.centre {
    display: grid;
    place-items: center;
    min-height: 10rem;
}
```

## Choisir entre Flexbox et Grid

| | Flexbox | Grid |
|---|---|---|
| Dimension | **une** : ligne ou colonne | **deux** : lignes et colonnes |
| Point de départ | le **contenu** : les éléments décident de leur taille | la **structure** : on dessine la grille, puis on y place le contenu |
| Alignement entre rangées | non : chaque ligne s'organise seule | oui : les colonnes restent alignées d'une rangée à l'autre |
| Cas typiques | menu, barre d'outils, centrage, formulaire en ligne, contenu d'une carte | mise en page globale, galerie de cartes, tableau de bord |

Une règle simple : **Flexbox pour les composants, Grid pour la page**. Les deux se **combinent** très bien : un élément d'une grille peut lui-même être un conteneur flex, et inversement.

On se pose la question : « mes éléments sont-ils organisés sur **une** direction (alors Flexbox), ou doivent-ils s'aligner à la fois en lignes **et** en colonnes (alors Grid) ? »

### Une méthode simple pour mettre en page

**1. Identifier le conteneur.**

Quel est l'élément parent qui doit organiser ses enfants directs ?

**2. Choisir le système.**

Une direction : Flexbox. Deux directions, ou page complète : Grid.

**3. Régler le conteneur.**

Flexbox : `flex-direction`, `justify-content`, `align-items`, `gap`, `flex-wrap`. Grid : `grid-template-columns` (et zones), `gap`, alignements.

**4. Régler les éléments si besoin.**

Flexbox : `flex`, `align-self`, marges automatiques. Grid : `grid-column`, `grid-row`, `grid-area`.

**5. Inspecter.**

Les outils de développement des navigateurs affichent un badge **flex** ou **grid** à côté des conteneurs : un clic dessine la disposition (axes, lignes, zones) par-dessus la page.

## Exemple complet

Voici une page d'accueil de club qui utilise **Grid** pour la page, **Flexbox** pour l'en-tête, le menu et le contenu des cartes, et une grille **auto-adaptative** pour les cartes.

**index.html**
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Club informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body class="page">

    <header class="entete">
        <h1>Club informatique</h1>

        <nav aria-label="Navigation principale">
            <ul class="menu">
                <li><a href="index.html">Accueil</a></li>
                <li><a href="ateliers.html">Ateliers</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main class="contenu">

        <h2>Nos ateliers</h2>

        <div class="cartes">

            <article class="carte">
                <h3>Atelier HTML</h3>
                <p>Découvrez la structure d'une page web.</p>
                <a class="bouton" href="html.html">Voir l'atelier</a>
            </article>

            <article class="carte">
                <h3>Atelier CSS</h3>
                <p>
                    Apprenez à mettre en forme vos pages : couleurs, polices,
                    espaces et mise en page.
                </p>
                <a class="bouton" href="css.html">Voir l'atelier</a>
            </article>

            <article class="carte">
                <h3>Projet libre</h3>
                <p>Réalisez le site de votre choix, accompagné par l'équipe.</p>
                <a class="bouton" href="projet.html">Voir l'atelier</a>
            </article>

        </div>

    </main>

    <aside class="lateral">
        <h2>Infos pratiques</h2>
        <ul>
            <li>Tous les mercredis</li>
            <li>Salle B12</li>
            <li>Ouvert aux débutants</li>
        </ul>
    </aside>

    <footer class="pied">
        <p>© 2026 Club informatique</p>
    </footer>

</body>

</html>
```

**css/style.css**
```css
*, *::before, *::after {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== La page : une grille avec quatre zones ===== */
.page {
    display: grid;
    grid-template-columns: 1fr 15rem;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "entete  entete"
        "contenu lateral"
        "pied    pied";
    min-height: 100vh;
}

.entete  { grid-area: entete; }
.contenu { grid-area: contenu; }
.lateral { grid-area: lateral; }
.pied    { grid-area: pied; }

/* ===== En-tête : titre à gauche, menu à droite ===== */
.entete {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background-color: #1f4068;
    color: #ffffff;
}

.entete h1 {
    margin: 0;
    font-size: 1.5rem;
}

.menu {
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.menu a {
    color: #ffffff;
}

/* ===== Contenu : une grille de cartes qui s'adapte ===== */
.contenu {
    padding: 1rem;
}

.cartes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1rem;
}

/* ===== Chaque carte : une colonne flex ===== */
.carte {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte h3 {
    margin-top: 0;
    color: #336699;
}

.bouton {
    margin-top: auto;          /* le bouton est repoussé en bas de la carte */
    align-self: flex-start;    /* sans être étiré sur toute la largeur */
    padding: 0.5rem 1rem;
    background-color: #336699;
    color: #ffffff;
    text-decoration: none;
    border-radius: 0.25rem;
}

/* ===== Zone latérale et pied de page ===== */
.lateral {
    padding: 1rem;
    background-color: #e8eef5;
}

.lateral h2 {
    margin-top: 0;
    font-size: 1.25rem;
}

.pied {
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

.pied p {
    margin: 0;
}
```

**Analyse : quel système et pourquoi ?**

| Élément | Système | Réglages | Effet |
|---|---|---|---|
| `body.page` | Grid | 2 colonnes (`1fr` et `15rem`), 3 rangées (`auto 1fr auto`), 4 zones nommées | l'en-tête et le pied de page occupent toute la largeur ; le contenu et la zone latérale se partagent la rangée du milieu |
| `.entete` | Flexbox | `space-between`, `align-items: center`, `flex-wrap: wrap` | titre à gauche, menu à droite, centrés verticalement ; si la place manque, le menu passe sous le titre |
| `.menu` | Flexbox | `gap: 1rem` | les `<li>` se placent côte à côte, avec un espace régulier |
| `.cartes` | Grid | `repeat(auto-fit, minmax(14rem, 1fr))` | le nombre de colonnes s'adapte à la largeur disponible |
| `.carte` | Flexbox (colonne) | `margin-top: auto` sur le bouton | les boutons des trois cartes sont alignés en bas, quelle que soit la longueur du texte |
| `.bouton` | élément flex | `align-self: flex-start` | le bouton garde sa largeur naturelle au lieu d'être étiré |

**Comportement selon la largeur de la fenêtre**

La zone `contenu` occupe toute la largeur moins 15 rem (la zone latérale), et la grille de cartes toute la largeur de ce contenu moins le padding (2 × 1 rem). Avec une police de 16 px :

| Largeur de la fenêtre | Largeur de la grille de cartes | Résultat |
|---|---|---|
| 1 200 px | 928 px | **3 colonnes** d'environ 298,7 px |
| 900 px | 628 px | **2 colonnes** de 306 px (la troisième carte passe sur la rangée suivante) |
| 700 px | 428 px | **1 colonne** de 428 px |

Les seuils de changement sont à 976 px (passage de 3 à 2 colonnes) et 736 px (passage de 2 à 1 colonne).

Pour changer l'**organisation générale** selon la taille de l'écran (par exemple placer la zone latérale sous le contenu sur un téléphone), on utilise des *media queries*, qui dépassent le cadre de ce chapitre.

## Les erreurs courantes à éviter

- **oublier `display: flex` (ou `grid`) sur le parent** : les propriétés comme `justify-content` ou `gap` n'ont alors aucun effet ;
- **appliquer une propriété de conteneur à un élément** (ou l'inverse) : `justify-content` et `gap` se placent sur le conteneur, `flex` et `align-self` sur les éléments ;
- **croire que tous les descendants sont concernés** : seuls les **enfants directs** du conteneur sont organisés ;
- **oublier que les axes s'échangent** avec `flex-direction: column` : `justify-content` agit alors verticalement ;
- **utiliser `align-items: center` sans hauteur** au conteneur, et ne voir aucun effet ;
- **confondre `flex: 1` et `width`** : `flex: 1` partage l'espace en parts égales, quel que soit le contenu ;
- **utiliser `height: 100vh`** pour une page : le contenu plus long déborde ; on préfère `min-height: 100vh` ;
- **écrire une zone de `grid-template-areas` qui n'est pas rectangulaire**, ou avec un nombre de noms différent d'une rangée à l'autre ;
- **oublier `grid-area`** sur les éléments : les noms de zones restent vides ;
- **confondre les lignes de la grille** (les traits, numérotés à partir de 1) **et les rangées** ;
- **utiliser `order` ou un placement qui bouleverse l'ordre de lecture** : le clavier et les lecteurs d'écran suivent le HTML ;
- **mettre en page avec `absolute`, des tableaux ou des marges négatives** alors que Flexbox et Grid existent ;
- **choisir Grid (ou Flexbox) pour tout** : un petit alignement dans une ligne relève de Flexbox, une page entière de Grid.

## À retenir

Flexbox et Grid organisent les **enfants directs** d'un **conteneur** déclaré avec `display`.

```
FLEXBOX  (une dimension)                    GRID  (deux dimensions)
display: flex                               display: grid
flex-direction     → axe principal          grid-template-columns / rows
justify-content    → axe principal          grid-template-areas + grid-area
align-items        → axe secondaire         gap
gap, flex-wrap                              justify-items / align-items
sur les éléments :                          sur les éléments :
flex, align-self, order, margin: auto       grid-column, grid-row, grid-area
```

Les règles essentielles :
- les propriétés de disposition se placent **sur le conteneur**, et ne concernent que ses **enfants directs** ;
- avec Flexbox, `justify-content` agit sur l'**axe principal** et `align-items` sur l'**axe secondaire** ; `flex-direction: column` échange les deux axes ;
- `flex: 1` partage l'espace restant ; `flex: 0 0 15rem` fixe une largeur ; une marge `auto` repousse un élément à l'autre bout ;
- `gap` crée un espace régulier **entre** les éléments, sans marges à gérer ;
- avec Grid, l'unité **`fr`** représente une part de l'espace disponible, et `repeat(auto-fit, minmax(14rem, 1fr))` crée des colonnes qui s'adaptent seules à la largeur ;
- `grid-template-areas` permet de **dessiner la page** zone par zone, chaque élément choisissant sa zone avec `grid-area` ;
- `min-height: 100vh` avec une rangée `1fr` (Grid) ou `flex: 1` sur le contenu (Flexbox) maintient un pied de page en bas de la fenêtre, sans le fixer ;
- **Flexbox pour les composants, Grid pour la page**, et on peut combiner les deux ;
- `order` et le placement en grille ne changent **pas** l'ordre de lecture au clavier et au lecteur d'écran.

## Liens utiles

**Documentations** :
- https://developer.mozilla.org/fr/docs/Learn_web_development/Core/CSS_layout/Flexbox

## À vous

Il est temps de passer à la pratique. Dans l'ordre, allez suivez le liens suivant et faites les mini-jeux :
- https://flexboxfroggy.com/#fr
- http://www.flexboxdefense.com/

Puis allez dans le dossier [exercices](exercices/05-positionnement-partie-2.md) et faites l'exercice 05 sur les flexbox (le lien vous amène sur l'exercice).

Enfin, **si vous avez le temps** : https://cssgridgarden.com/#fr et la partie bonus de [exercices](exercices/05-positionnement-partie-2.md)

---

© Vincent Chiofalo