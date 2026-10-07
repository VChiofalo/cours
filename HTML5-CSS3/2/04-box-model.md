# Modèle de boîte (box model) en CSS

Jusqu'ici, nous avons surtout travaillé sur l'**apparence** des éléments : couleurs, polices, fonds. Pour **mettre en page** une page web, il faut maintenant comprendre comment le navigateur gère l'**espace** : la taille des éléments, les espaces autour et à l'intérieur, les bordures.

Tout repose sur une idée simple : **chaque élément HTML est une boîte rectangulaire**. Le modèle de boîte (*box model*) décrit comment cette boîte est construite. Il est la base de toute mise en page, y compris de celles que nous verrons ensuite (positionnement, Flexbox, Grid).

Dans ce chapitre, nous verrons :
- les **quatre zones** d'une boîte ;
- comment fixer ses **dimensions** ;
- les propriétés `padding`, `border` et `margin` ;
- la différence entre éléments de **bloc** et éléments **en ligne** ;
- comment le navigateur **calcule la taille réelle** d'une boîte, et comment `box-sizing` la simplifie.

## Tout élément est une boîte

Dans les outils de développement du navigateur, il suffit de survoler un élément dans l'inspecteur pour voir sa boîte mise en évidence sur la page, avec des couleurs différentes pour chaque zone. L'onglet **Calculé** affiche aussi un schéma de la boîte avec ses dimensions exactes.

C'est l'outil idéal pour comprendre une mise en page : lorsqu'un espace ou une taille surprend, on **inspecte la boîte**.

## Les quatre zones d'une boîte

Une boîte est composée de **quatre zones emboîtées**, du centre vers l'extérieur :
```
┌───────────────────────── margin ─────────────────────────┐
│                                                          │
│   ┌─────────────────────── border ───────────────────┐   │
│   │                                                  │   │
│   │   ┌────────────────── padding ───────────────┐   │   │
│   │   │                                          │   │   │
│   │   │                contenu                   │   │   │
│   │   │         (texte, images, enfants)         │   │   │
│   │   │                                          │   │   │
│   │   └──────────────────────────────────────────┘   │   │
│   │                                                  │   │
│   └──────────────────────────────────────────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

| Zone | Rôle | Propriétés |
|---|---|---|
| **Contenu** (*content*) | le texte, l'image ou les éléments enfants | `width`, `height` |
| **Marge intérieure** (*padding*) | l'espace entre le contenu et la bordure | `padding` |
| **Bordure** (*border*) | le trait qui entoure la marge intérieure | `border` |
| **Marge extérieure** (*margin*) | l'espace entre cette boîte et ses voisines | `margin` |

Une différence importante concerne l'**arrière-plan** :
- la couleur ou l'image de fond s'étend sous le **contenu** et le **padding** (et jusque sous la bordure) ;
- la **marge extérieure** est toujours **transparente** : elle n'est jamais colorée par le fond de l'élément.

C'est ce qui permet de choisir entre deux types d'espaces : `padding` pour « aérer » l'intérieur d'une zone colorée, `margin` pour séparer des éléments.

## Les dimensions : `width` et `height`

Les propriétés `width` (largeur) et `height` (hauteur) définissent la taille de la **zone de contenu**.
```css
.carte {
    width: 20rem;
    height: 10rem;
}
```

Elles acceptent des longueurs (`px`, `rem`...), des pourcentages (relatifs à la largeur du parent) ou le mot-clé `auto`.

Par défaut, `width` et `height` valent `auto` :
- un élément de **bloc** prend alors **toute la largeur disponible** ;
- sa **hauteur** s'adapte à son contenu.

### Largeurs et hauteurs minimales et maximales

Plutôt que d'imposer une taille fixe, on fixe souvent des limites :

| Propriété | Effet |
|---|---|
| `min-width` / `min-height` | la boîte ne peut pas être plus petite |
| `max-width` / `max-height` | la boîte ne peut pas être plus grande |

```css
.contenu {
    max-width: 40rem;
}
```

Cette règle est très utile : sur un grand écran, le contenu ne dépassera pas 40 rem de large (une ligne de texte trop longue est pénible à lire), alors que sur un petit écran il s'adaptera à la largeur disponible.

On évite de fixer une `height` à du texte : si le contenu est plus grand que la boîte, il **déborde**. On préfère `min-height`.

La propriété `overflow` gère ce débordement : `visible` (valeur par défaut, le contenu dépasse), `hidden` (il est coupé), `auto` (des barres de défilement apparaissent si nécessaire).

## Le padding : la marge intérieure

```css
.carte {
    padding: 1rem;
}
```

La propriété `padding` crée de l'espace **à l'intérieur** de la boîte, entre le contenu et la bordure. Le fond de l'élément s'étend sous cet espace.

On peut aussi cibler un côté précis : `padding-top`, `padding-right`, `padding-bottom`, `padding-left`.

### Les raccourcis à une, deux, trois ou quatre valeurs

| Écriture | Signification |
|---|---|
| `padding: 1rem;` | les quatre côtés |
| `padding: 1rem 2rem;` | haut et bas, puis gauche et droite |
| `padding: 1rem 2rem 3rem;` | haut, puis gauche et droite, puis bas |
| `padding: 1rem 2rem 3rem 4rem;` | haut, droite, bas, gauche |

Avec quatre valeurs, l'ordre suit le **sens des aiguilles d'une montre**, en partant du haut : **haut, droite, bas, gauche**. On retient le mot anglais *TRouBLe* (Top, Right, Bottom, Left).

Le `padding` ne peut pas être négatif.

## La bordure : `border`

La bordure se définit par trois informations : sa **largeur**, son **style** et sa **couleur**.
```css
.carte {
    border-width: 2px;
    border-style: solid;
    border-color: #336699;
}
```

Le raccourci `border` regroupe les trois :
```css
.carte {
    border: 2px solid #336699;
}
```

Le **style** est obligatoire : sans lui, aucune bordure n'apparaît (le style par défaut est `none`). Les principaux styles sont :

| Valeur | Rendu |
|---|---|
| `solid` | trait plein |
| `dashed` | tirets |
| `dotted` | pointillés |
| `double` | double trait |
| `none` | aucune bordure |

On peut aussi mettre une bordure sur un seul côté : `border-top`, `border-right`, `border-bottom`, `border-left`.
```css
h2 {
    border-bottom: 3px solid #336699;
}
```

### Les coins arrondis : `border-radius`

```css
.carte {
    border-radius: 0.5rem;
}
```

`border-radius` arrondit les coins de la boîte (même sans bordure visible, le fond est arrondi). Avec un élément carré et la valeur `50%`, on obtient un cercle.

## La marge extérieure : `margin`

```css
.carte {
    margin: 1rem;
}
```

La propriété `margin` crée de l'espace **autour** de la boîte, entre elle et ses voisines. Elle fonctionne avec les mêmes raccourcis que `padding` (une à quatre valeurs, dans l'ordre haut, droite, bas, gauche) et les propriétés `margin-top`, `margin-right`, `margin-bottom`, `margin-left`.

Contrairement au `padding`, une marge peut :
- prendre la valeur **`auto`** ;
- être **négative** (rarement utilisée).

### Centrer un bloc : `margin: 0 auto`

Pour centrer horizontalement un élément de bloc **dont la largeur est limitée**, on met ses marges gauche et droite à `auto` :
```css
.contenu {
    max-width: 40rem;
    margin: 0 auto;
}
```

Le navigateur répartit alors l'espace restant à parts égales de chaque côté. Cette technique ne fonctionne que si la largeur de l'élément est **plus petite** que celle de son parent : un bloc qui occupe déjà toute la largeur n'a pas d'espace à répartir.

### La fusion des marges verticales

Les marges **verticales** ont un comportement particulier : lorsque deux marges se touchent, elles **fusionnent** au lieu de s'additionner. C'est la **plus grande** des deux qui s'applique.
```css
.premier  { margin-bottom: 20px; }
.deuxieme { margin-top: 30px; }
```

L'espace entre les deux éléments est de **30 px**, et non de 50 px.

La fusion se produit aussi entre un **parent** et son **premier** (ou dernier) enfant, lorsque rien ne les sépare (ni `padding`, ni bordure). Par exemple, la marge haute d'un titre peut « sortir » de son conteneur et le décaler vers le bas, au lieu de créer un espace à l'intérieur. Ajouter un `padding` ou une bordure au parent empêche cette fusion : c'est pour cela que nous avions donné un `padding` à l'en-tête dans l'exemple du chapitre précédent.

Les marges **horizontales** ne fusionnent jamais.

### Les marges par défaut du navigateur

Le navigateur applique ses propres marges, qui expliquent beaucoup d'espaces « inexpliqués » :

| Élément | Espace par défaut (environ) |
|---|---|
| `<body>` | marge de 8 px sur les quatre côtés |
| `<p>` | marges haute et basse de 1 `em` |
| `<h1>` à `<h6>` | marges haute et basse proportionnelles à la taille du titre |
| `<ul>`, `<ol>` | marges haute et basse de 1 `em`, et un `padding` à gauche d'environ 40 px |

Quand on met en page un site, on redéfinit explicitement ces espaces pour les contrôler : `margin: 0` sur le `body`, marge basse des paragraphes, etc.

## Éléments de bloc et éléments en ligne

Le comportement d'une boîte dépend de son type d'affichage, défini par la propriété **`display`**.

| | `block` | `inline` | `inline-block` |
|---|---|---|---|
| Passe à la ligne | oui, avant et après | non | non |
| Largeur par défaut | toute la largeur disponible | celle de son contenu | celle de son contenu |
| `width` et `height` | respectés | **sans effet** | respectés |
| Marges verticales | respectées | **sans effet** | respectées |
| Marges et padding horizontaux | respectés | respectés | respectés |
| Exemples | `<p>`, `<div>`, `<h1>`, `<ul>`, `<section>` | `<a>`, `<span>`, `<strong>`, `<em>` | `<button>`, `<input>`, `<select>` |

Un élément en ligne est traité comme du **texte** : on ne peut pas lui imposer une taille. Son `padding` vertical s'affiche, mais sans repousser les lignes voisines.

On modifie ce comportement avec `display`. Une technique très courante consiste à donner à un **lien** l'apparence d'un **bouton** :
```css
.bouton {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #336699;
    color: #ffffff;
    border-radius: 0.25rem;
}
```

Les valeurs les plus utiles de `display` sont :
- `block` : l'élément se comporte comme un bloc ;
- `inline` : l'élément se comporte comme du texte ;
- `inline-block` : il reste dans la ligne mais accepte dimensions et marges ;
- `none` : l'élément **disparaît** de la page (il ne prend plus de place et il n'est plus annoncé par les lecteurs d'écran).

À ne pas confondre avec `visibility: hidden`, qui rend l'élément invisible mais **conserve sa place** dans la mise en page.

Les images (`<img>`) sont un cas particulier : elles s'insèrent dans le texte comme un élément en ligne, mais acceptent quand même `width` et `height`.

## La taille réelle d'une boîte

Par défaut, `width` et `height` ne concernent que la **zone de contenu**. Le padding et la bordure **s'ajoutent** à la taille indiquée :
```
largeur visible = width + padding gauche et droite + bordures gauche et droite
```

Exemple :
```css
.carte {
    width: 300px;
    padding: 20px;
    border: 5px solid #336699;
    margin: 10px;
}
```

| Élément du calcul | Valeur |
|---|---|
| Contenu | 300 px |
| Padding gauche et droite | 2 × 20 = 40 px |
| Bordures gauche et droite | 2 × 5 = 10 px |
| **Largeur visible de la boîte** | **350 px** |
| Marges gauche et droite | 2 × 10 = 20 px |
| **Place occupée en largeur** | **370 px** |

Ce calcul est source de nombreux pièges : une boîte écrite avec `width: 100%` et un `padding` dépasse de son parent, car sa taille réelle est de 100 % **plus** le padding.

### `box-sizing` : changer le calcul

La propriété `box-sizing` décide ce que représente `width` :

| Valeur | `width` désigne... |
|---|---|
| `content-box` (par défaut) | la zone de **contenu** seule |
| `border-box` | la boîte **entière**, bordure et padding compris |

Avec `box-sizing: border-box`, la même boîte devient :
```css
.carte {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 5px solid #336699;
}
```

| | `content-box` | `border-box` |
|---|---|---|
| `width` | 300 px | 300 px |
| Largeur de la zone de contenu | 300 px | 250 px (300 − 40 − 10) |
| **Largeur visible de la boîte** | **350 px** | **300 px** |

Avec `border-box`, la boîte fait **exactement** la largeur écrite : le padding et la bordure sont pris sur l'intérieur. La marge extérieure, elle, n'est jamais comprise dans `width`.

Cette façon de calculer est beaucoup plus intuitive, c'est pourquoi la plupart des feuilles de style la généralisent à tous les éléments dès les premières lignes :
```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

Dans la suite de ce cours, nous partirons de cette règle.

## Bien organiser l'espace

Quelques réflexes :
- **`padding` pour l'intérieur, `margin` pour l'extérieur** : si l'espace doit avoir la couleur du fond de l'élément, c'est un `padding` ; s'il sépare deux éléments, c'est une `margin`.
- **Espacer par une seule marge**, par exemple `margin-bottom` sur chaque élément : on évite ainsi de jongler avec la fusion des marges.
- **Utiliser des unités relatives** (`rem`, `em`) pour les espaces, afin qu'ils suivent la taille du texte.
- **Limiter la largeur du contenu** avec `max-width` et le centrer avec `margin: 0 auto`.
- **Ne pas fixer la hauteur** d'un bloc de texte : laisser le contenu déterminer sa hauteur, ou utiliser `min-height`.
- **Ne pas tout réinitialiser à l'aveugle** : une règle comme `* { margin: 0; padding: 0; }` supprime aussi les espaces utiles (paragraphes, listes) qu'il faut ensuite recréer. On préfère redéfinir les espaces élément par élément.

## Une méthode simple pour comprendre une mise en page

Face à un espace ou une taille inattendus, on peut procéder en trois étapes :

**1. Inspecter la boîte.**

Dans les outils de développement, on survole l'élément et on regarde le schéma de la boîte : quelle zone provoque l'espace (padding, bordure, marge) ?

**2. Identifier le type d'affichage.**

L'élément est-il de **bloc**, **en ligne** ou **inline-block** ? Les propriétés `width`, `height` et `margin` verticale ne fonctionnent pas sur un élément en ligne.

**3. Vérifier d'où viennent les valeurs.**

Les marges et paddings viennent-ils d'une de **nos** règles, ou des **styles par défaut** du navigateur ? Sont-ils modifiés par la cascade ?

## Exemple complet

Voici une page qui présente des ateliers sous forme de cartes, avec les notions du chapitre.

**ateliers.html**
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Nos ateliers</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <main class="contenu">

        <h1>Nos ateliers</h1>

        <article class="carte">
            <h2>Atelier HTML</h2>
            <p>Découvrez la structure d'une page web.</p>
            <a class="bouton" href="html.html">Voir l'atelier</a>
        </article>

        <article class="carte">
            <h2>Atelier CSS</h2>
            <p>Apprenez à mettre en forme vos pages.</p>
            <a class="bouton" href="css.html">Voir l'atelier</a>
        </article>

        <article class="carte">
            <h2>Projet libre</h2>
            <p>Réalisez le site de votre choix, accompagné par l'équipe.</p>
            <a class="bouton" href="projet.html">Voir l'atelier</a>
        </article>

    </main>

</body>

</html>
```

**css/style.css**
```css
/* Calcul des tailles : width inclut padding et bordure */
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

/* Contenu centré, de largeur limitée */
.contenu {
    max-width: 40rem;
    margin: 0 auto;
    padding: 1rem;
}

/* Une carte : fond blanc, bordure, coins arrondis */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

/* Pas de marge haute au premier titre de la carte */
.carte h2 {
    margin-top: 0;
}

/* Un lien qui a l'apparence d'un bouton */
.bouton {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #336699;
    color: #ffffff;
    text-decoration: none;
    border-radius: 0.25rem;
}
```

**Analyse : les boîtes de la page** (avec une taille de police de 16 px)

| Élément | Construction | Résultat |
|---|---|---|
| `.contenu` | `max-width: 40rem` (640 px), `padding: 1rem` (16 px), `border-box` | sur un écran large, la boîte fait 640 px et son contenu 608 px (640 − 2 × 16), centrée par `margin: 0 auto` |
| `.carte` | largeur `auto`, `padding: 1rem 1.5rem`, bordure de 1 px | elle remplit la largeur du contenu : 608 px au total, dont 558 px pour son propre contenu (608 − 2 × 24 de padding − 2 × 1 de bordure) |
| Espace entre deux cartes | `margin-bottom: 1.5rem` | 24 px d'espace transparent |
| `.carte h2` | `margin-top: 0` | le titre ne crée pas d'espace supplémentaire en haut de la carte ; sans cette règle, la marge par défaut du titre s'ajouterait au padding |
| `.bouton` | `display: inline-block`, `padding: 0.5rem 1rem` | sa hauteur dépend du texte et du padding : 24 px (interligne de 1,5) + 2 × 8 px = 40 px |

On remarque que `.carte` n'a pas de `width` : une boîte de bloc **s'adapte** à son parent, ce qui rend la page naturellement souple. Le lien `.bouton` n'est plus souligné parce qu'il a l'apparence d'un bouton clairement identifiable.

## Les erreurs courantes à éviter

- **oublier `border-style`** : sans lui, la bordure n'apparaît pas ;
- **confondre `margin` et `padding`** : l'un est transparent et extérieur, l'autre prend la couleur du fond et est intérieur ;
- **mélanger l'ordre des valeurs d'un raccourci** : avec deux valeurs, c'est « vertical puis horizontal » ; avec quatre, « haut, droite, bas, gauche » ;
- **appliquer `width`, `height` ou une marge verticale à un élément en ligne** (`<a>`, `<span>`) sans modifier `display` ;
- **utiliser `width: 100%` avec du `padding`** sans `box-sizing: border-box`, ce qui fait dépasser la boîte de son parent ;
- **fixer la `height` d'un bloc de texte**, qui déborde dès que le contenu grandit ;
- **attendre de `margin: 0 auto` qu'il centre un bloc sans largeur limitée** : le bloc occupe déjà toute la largeur ;
- **espérer que deux marges verticales s'additionnent** : elles fusionnent, la plus grande l'emporte ;
- **oublier les marges par défaut du navigateur** (`body`, `p`, titres, listes) ;
- **tout réinitialiser avec `* { margin: 0; padding: 0; }`** sans recréer ensuite les espaces utiles ;
- **croire qu'un `margin: auto` centre verticalement** : il ne centre qu'horizontalement dans le flux normal.

## À retenir

Chaque élément est une **boîte** composée, du centre vers l'extérieur, du **contenu**, du **padding**, de la **bordure** et de la **marge**.

```
┌─ margin (transparente, sépare les éléments) ─────────┐
│  ┌─ border ──────────────────────────────────────┐   │
│  │  ┌─ padding (sous le fond) ─────────────────┐ │   │
│  │  │            contenu : width / height      │ │   │
│  │  └──────────────────────────────────────────┘ │   │
│  └───────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

Les règles essentielles :
- `width` et `height` fixent la taille du **contenu** ; `min-*` et `max-*` posent des limites ;
- `padding` crée de l'espace **à l'intérieur** (sous le fond) ; `margin` crée de l'espace **à l'extérieur** (toujours transparent) ;
- les raccourcis `padding` et `margin` acceptent une à quatre valeurs : haut, droite, bas, gauche ;
- `border` regroupe largeur, **style** (obligatoire) et couleur ; `border-radius` arrondit les coins ;
- `margin: 0 auto` centre horizontalement un bloc dont la largeur est limitée ;
- les marges **verticales** adjacentes **fusionnent** : la plus grande l'emporte ;
- les éléments de **bloc** occupent toute la largeur et respectent toutes les dimensions ; les éléments **en ligne** ignorent `width`, `height` et les marges verticales ; `inline-block` combine les deux ;
- `display: none` retire l'élément de la mise en page, `visibility: hidden` le rend invisible mais garde sa place ;
- par défaut, la taille réelle d'une boîte est `width` + padding + bordures ;
- `box-sizing: border-box` fait de `width` la taille de la boîte entière : on l'applique à tous les éléments ;
- dans le doute, on **inspecte la boîte** dans les outils de développement du navigateur.

## Liens utiles

**Documentations** :
- https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Styling_basics/Box_model