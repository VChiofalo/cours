# Introduction aux cascades et spécificités de CSS

Jusqu'ici, nous avons construit des pages dont l'apparence était celle que le navigateur choisit par défaut. Il est temps de prendre la main sur la **présentation** avec **CSS** (*Cascading Style Sheets*, « feuilles de style en cascade »).

Les `class` et les `id` que nous avons placés dans nos pages HTML vont maintenant prendre tout leur sens : ce sont eux qui permettent de **désigner** les éléments à mettre en forme.

Ce premier chapitre a deux objectifs :
- écrire ses **premières règles CSS** et les relier à une page HTML ;
- comprendre **pourquoi une règle s'applique ou non**, grâce aux notions de **cascade**, de **spécificité** et d'**héritage**.

Ce dernier point est la source de la plupart des « mon CSS ne marche pas » des débutants.

## La syntaxe d'une règle CSS

Nous avons déjà croisé un exemple de règle CSS :
```css
h1 {
    color: blue;
    font-size: 40px;
}
```

Décomposons-la :
```
h1                 → le sélecteur : à quels éléments s'applique la règle ?
{ ... }            → le bloc de déclarations
color: blue;       → une déclaration
color              → la propriété : ce que l'on veut modifier
blue               → la valeur : le résultat souhaité
```

Les règles à respecter :
- la propriété et la valeur sont séparées par `:` ;
- chaque déclaration se termine par `;` ;
- les déclarations sont placées entre accolades `{ }` ;
- les propriétés s'écrivent en minuscules, avec des tirets pour séparer les mots (`font-size`, `background-color`).

Une règle peut contenir autant de déclarations que nécessaire. Les commentaires CSS s'écrivent avec `/* ... */` :
```css
/* Mise en forme du titre principal */
h1 {
    color: blue;
}
```

⚠️ Une déclaration invalide (propriété mal orthographiée, valeur incorrecte) est **ignorée sans message d'erreur**. Le navigateur passe simplement à la suivante. Un `;` oublié fait « fusionner » deux déclarations, et aucune des deux ne fonctionne.

## Les trois façons d'ajouter du CSS à une page

### La feuille de style externe (recommandée)

Le CSS est écrit dans un **fichier séparé** (par exemple `style.css`), relié à la page par un élément `<link>` placé dans le `<head>` :
```html
<head>
    <meta charset="UTF-8">
    <title>Mon site</title>
    <link rel="stylesheet" href="css/style.css">
</head>
```

Le chemin de l'attribut `href` suit les mêmes règles que celles des liens : depuis la page `index.html` d'un site organisé ainsi :
```
mon-site/
├── index.html
├── css/
│   └── style.css
└── ateliers/
    └── index.html
```
on écrira `css/style.css` dans `index.html`, et `../css/style.css` dans `ateliers/index.html`.

L'élément `<link>` est un élément vide. Plusieurs pages peuvent partager la même feuille de style : c'est la meilleure façon de **séparer structure et présentation** et d'obtenir un site cohérent.

### La feuille de style interne

Le CSS est écrit dans un élément `<style>`, dans le `<head>` de la page :
```html
<head>
    <meta charset="UTF-8">
    <title>Mon site</title>
    <style>
        h1 {
            color: blue;
        }
    </style>
</head>
```

Cette méthode est pratique pour un test rapide, mais le style n'est valable que pour cette page.

### Le style en ligne

Le CSS est écrit dans l'attribut `style` d'un élément :
```html
<h1 style="color: blue;">Bienvenue</h1>
```

Le style ne concerne alors que cet élément. Cette méthode mélange structure et présentation et rend la maintenance difficile : on l'évite.

| | Externe | Interne | En ligne |
|---|---|---|---|
| Où ? | fichier `.css` | `<style>` dans le `<head>` | attribut `style` |
| Portée | tout le site | une page | un seul élément |
| Réutilisable | oui | non | non |
| Recommandé | **oui** | pour des tests | à éviter |

Dans la suite de ce cours, nous utiliserons toujours une **feuille de style externe**.

## Trois sélecteurs pour commencer

Le sélecteur indique **quels éléments** la règle concerne. Le chapitre suivant les présentera en détail ; il nous en faut trois pour comprendre la cascade :

| Sélecteur | Écriture | Cible | Exemple |
|---|---|---|---|
| Élément | le nom de la balise | tous les éléments de ce type | `p { ... }` |
| Classe | `.` + nom de la classe | les éléments ayant `class="..."` | `.intro { ... }` |
| Identifiant | `#` + nom de l'id | l'élément ayant `id="..."` | `#entete { ... }` |

Avec le HTML suivant :
```html
<header id="entete">
    <h1 class="titre">Club informatique</h1>
    <p>Ateliers et projets</p>
</header>
```

on peut écrire :
```css
p { color: green; }          /* tous les paragraphes */
.titre { color: purple; }    /* les éléments de classe "titre" */
#entete { background-color: lightgray; }   /* l'élément d'id "entete" */
```

## Pourquoi parle-t-on de « cascade » ?

Une même propriété d'un même élément peut être visée par **plusieurs règles** à la fois. Par exemple :
```css
p { color: blue; }
p { color: red; }
```

Le paragraphe ne peut pas être à la fois bleu et rouge : le navigateur doit **arbitrer**. Il suit toujours la même procédure, appelée **cascade**, qui se résume à trois questions posées dans l'ordre :
```
Plusieurs règles visent la même propriété d'un élément
            ↓
1. Origine et importance
   (styles du navigateur < vos styles ; !important)
            ↓ en cas d'égalité
2. Spécificité
   (id > classe > élément)
            ↓ en cas d'égalité
3. Ordre d'apparition
   (la dernière règle l'emporte)
```

Dans l'exemple ci-dessus, les deux règles ont la même origine et la même spécificité : c'est l'**ordre** qui décide, donc le paragraphe est rouge. Reprenons ces trois critères un par un.

## Critère 1 : l'origine et l'importance

### Les styles par défaut du navigateur

Même sans CSS, une page n'est pas affichée « brute » : le navigateur applique sa **propre feuille de style** (titres en gras et en grande taille, liens bleus et soulignés, marges autour du `<body>` et des paragraphes...).

Vos styles ont **priorité** sur ceux du navigateur : c'est ce qui vous permet de les modifier. Les styles par défaut diffèrent légèrement d'un navigateur à l'autre, ce qui explique parfois de petites différences d'affichage.

### Le mot-clé `!important`

Une déclaration suivie de `!important` l'emporte sur toutes les déclarations normales, quelle que soit leur spécificité :
```css
p {
    color: red !important;
}
```

⚠️ `!important` est une solution de dernier recours. Une fois utilisé, la seule façon de le contourner est d'en utiliser un autre, et la feuille de style devient vite impossible à maintenir. En cas de conflit, on préfère **corriger la spécificité ou l'ordre** des règles.

## Critère 2 : la spécificité

Lorsque deux règles de même origine visent le même élément, le navigateur compare leur **spécificité** : plus un sélecteur est **précis**, plus il est prioritaire.

On distingue trois niveaux de précision, du plus fort au plus faible :

| Type de sélecteur | Exemple | Poids |
|---|---|---|
| Identifiant | `#entete` | le plus fort |
| Classe, attribut, pseudo-classe | `.intro` | intermédiaire |
| Élément, pseudo-élément | `p` | le plus faible |

Le **style en ligne** (attribut `style`) l'emporte sur tous ces niveaux. Le sélecteur universel `*` et les symboles de combinaison n'ont aucun poids.

### Calculer la spécificité

On représente la spécificité d'un sélecteur par trois chiffres : **(identifiants, classes, éléments)**. Il suffit de compter ce que contient le sélecteur.

| Sélecteur | Identifiants | Classes | Éléments | Spécificité |
|---|---|---|---|---|
| `p` | 0 | 0 | 1 | (0, 0, 1) |
| `.intro` | 0 | 1 | 0 | (0, 1, 0) |
| `p.intro` | 0 | 1 | 1 | (0, 1, 1) |
| `#entete` | 1 | 0 | 0 | (1, 0, 0) |
| `#entete p` | 1 | 0 | 1 | (1, 0, 1) |
| `nav ul li a` | 0 | 0 | 4 | (0, 0, 4) |
| `.menu .lien` | 0 | 2 | 0 | (0, 2, 0) |
| `#entete .menu a` | 1 | 1 | 1 | (1, 1, 1) |

Pour s'y retrouver dans ces écritures :
- `p.intro` désigne un `<p>` qui possède la classe `intro` ;
- `#entete p` désigne un `<p>` situé **à l'intérieur** de l'élément d'id `entete` ;
- `.menu .lien` désigne un élément de classe `lien` situé à l'intérieur d'un élément de classe `menu`.

### Comparer deux spécificités

On compare les chiffres **de gauche à droite** :
1. celui qui a le plus d'**identifiants** gagne ;
2. à égalité, celui qui a le plus de **classes** gagne ;
3. à égalité, celui qui a le plus d'**éléments** gagne.

Les niveaux ne s'additionnent pas : (0, 10, 0) reste **inférieur** à (1, 0, 0). Dix classes ne valent pas un identifiant.

### Exemple

```html
<p id="intro" class="texte">Bonjour</p>
```
```css
p      { color: black; }   /* (0, 0, 1) */
.texte { color: blue; }    /* (0, 1, 0) */
#intro { color: red; }     /* (1, 0, 0) */
```

Le texte est **rouge** : `#intro` possède la spécificité la plus forte. Et l'ordre d'écriture n'y change rien : même si la règle `#intro` était placée en premier, elle l'emporterait encore.

Si l'on ajoute un style en ligne, celui-ci l'emporte sur toutes les règles ci-dessus :
```html
<p id="intro" class="texte" style="color: green;">Bonjour</p>
```
Le texte devient vert.

## Critère 3 : l'ordre d'apparition

À spécificité **égale**, la règle écrite **en dernier** l'emporte.
```css
.intro { color: blue; }
.intro { color: red; }    /* c'est elle qui s'applique */
```

Cela vaut aussi entre plusieurs fichiers : si deux feuilles de style sont reliées à une page, la **dernière** l'emporte en cas d'égalité.
```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/theme.css">   <!-- prioritaire à égalité -->
```

## L'héritage

Certaines propriétés sont **transmises** automatiquement d'un élément à ses descendants : c'est l'**héritage**. Il évite de répéter la même règle partout.
```css
body {
    color: #333333;
    font-family: Arial, sans-serif;
}
```

Tout le texte de la page, quel que soit l'élément, reçoit cette couleur et cette police :
```
body                color: #333333   ← défini ici
└── main            (hérite de #333333)
    └── p           (hérite de #333333)
        └── strong  (hérite de #333333)
```

Toutes les propriétés ne sont pas héritées :

| Propriétés héritées | Propriétés non héritées |
|---|---|
| `color` | `margin`, `padding` |
| `font-family`, `font-size`, `font-style`... | `border` |
| `line-height`, `text-align` | `background` |
| `list-style` | `width`, `height` |

Cette différence est logique : une bordure ou une marge d'un conteneur ne doit pas se répéter autour de chacun de ses enfants. Un élément peut sembler avoir le fond de son parent, mais c'est simplement parce que son propre fond est **transparent** par défaut.

### Forcer ou annuler l'héritage

Deux mots-clés permettent de contrôler l'héritage :
- `inherit` : la propriété prend la valeur de l'élément **parent** ;
- `initial` : la propriété reprend sa valeur **par défaut**.
```css
a {
    color: inherit;   /* les liens prennent la couleur du texte qui les entoure */
}
```

### L'héritage est le critère le plus faible

Une valeur héritée perd contre **n'importe quelle règle qui vise directement l'élément**, même peu spécifique, y compris celles du navigateur.

C'est la raison pour laquelle, avec la règle suivante, les liens ne deviennent pas rouges :
```css
body {
    color: red;
}
```
La feuille de style du navigateur contient une règle qui cible directement les liens (`a`) et leur donne leur couleur bleue habituelle : elle l'emporte sur la valeur héritée du `<body>`.

## Une méthode simple pour comprendre un conflit de styles

Lorsqu'un style « ne marche pas », on peut se poser quatre questions dans l'ordre :

**1. Mon CSS est-il bien chargé ?**

Le chemin du `<link>` est-il correct ? Le fichier est-il enregistré ? La page est-elle rafraîchie (`Ctrl + F5` pour vider le cache) ?

**2. Mon sélecteur cible-t-il bien l'élément ?**

Le nom de la classe ou de l'id est-il exactement le même que dans le HTML (casse comprise) ? Le `.` ou le `#` est-il présent ?

**3. Une autre règle est-elle plus forte ?**

Une règle plus spécifique, écrite plus loin, ou accompagnée de `!important` ?

**4. La propriété est-elle héritée ?**

Si l'on attend un effet sur les enfants d'un élément, la propriété fait-elle partie de celles qui sont héritées ?

## Déboguer avec les outils du navigateur

Les navigateurs intègrent des **outils de développement** qui indiquent exactement quelles règles s'appliquent à un élément.

1. Faire un **clic droit** sur l'élément, puis choisir **Inspecter** (ou appuyer sur `F12`).
2. Dans le panneau **Styles**, repérer les règles qui concernent l'élément, classées de la plus prioritaire à la moins prioritaire.
3. Une déclaration **barrée** est une déclaration **écrasée** par une règle plus forte.
4. Un survol permet de voir le **fichier et la ligne** où la règle est écrite.
5. On peut **modifier** les valeurs en direct pour tester : ces changements ne sont pas enregistrés dans le fichier.

Le panneau **Calculé** affiche la valeur finale de chaque propriété pour l'élément sélectionné.

## Exemple complet

Voici une page et sa feuille de style, avec plusieurs règles qui entrent en conflit.

**index.html**
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Club informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <header id="entete">
        <h1 class="titre">Club informatique</h1>
        <p>Ateliers et projets</p>
    </header>

    <main>
        <p class="intro">Bienvenue au club.</p>
        <p>Rejoignez-nous <strong>dès cette semaine</strong>.</p>
    </main>

</body>

</html>
```

**css/style.css**
```css
body { color: #333333; }          /* règle 1 */
p { color: green; }               /* règle 2 */
.intro { color: blue; }           /* règle 3 */
#entete p { color: orange; }      /* règle 4 */
h1 { color: black; }              /* règle 5 */
.titre { color: purple; }         /* règle 6 */
```

**Analyse : quelle est la couleur de chaque texte ?**

| Élément | Règles qui le visent | Règle gagnante | Couleur | Pourquoi |
|---|---|---|---|---|
| Titre `h1.titre` | 5 (0, 0, 1) et 6 (0, 1, 0) | 6 | violet | une classe l'emporte sur un élément |
| `<p>` « Ateliers et projets » | 2 (0, 0, 1) et 4 (1, 0, 1) | 4 | orange | l'identifiant rend la règle 4 plus spécifique |
| `<p class="intro">` | 2 (0, 0, 1) et 3 (0, 1, 0) | 3 | bleu | une classe l'emporte sur un élément (la règle 4 ne s'applique pas : ce `<p>` n'est pas dans `#entete`) |
| Second `<p>` du `<main>` | 2 (0, 0, 1) | 2 | vert | seule règle qui le vise |
| `<strong>` | aucune directement | héritage | vert | il hérite de la couleur de son parent `<p>`, et non de celle du `<body>` |

On remarque que l'héritage agit au plus près : le `<strong>` hérite de son **parent direct**, qui a lui-même reçu sa couleur d'une règle.

## Les erreurs courantes à éviter

- **oublier de relier la feuille de style** (ou se tromper dans le chemin du `<link>`) ;
- **se tromper de casse** dans un nom de classe ou d'identifiant (`.Intro` ne cible pas `class="intro"`) ;
- **oublier le point (`.`) ou le dièse (`#`)** dans le sélecteur ;
- **mal orthographier une propriété ou une valeur**, qui est alors ignorée sans message d'erreur ;
- **oublier un `;` ou une accolade** ;
- **ne pas rafraîchir la page** après une modification, ou oublier d'enregistrer le fichier ;
- **empiler des `!important`** pour « forcer » un style au lieu de comprendre le conflit ;
- **utiliser trop d'identifiants** dans les sélecteurs : ils sont difficiles à surcharger par la suite ;
- **mettre le style dans l'attribut `style`** de chaque élément au lieu d'une feuille externe.

## À retenir

CSS décrit la **présentation** d'une page. Une règle associe un **sélecteur** à des **déclarations** :
```
sélecteur {
    propriété: valeur;
    propriété: valeur;
}
```

Les règles essentielles :
- on relie une feuille de style externe avec `<link rel="stylesheet" href="...">` dans le `<head>` ;
- le style en ligne et la feuille interne sont à réserver aux cas particuliers ;
- quand plusieurs règles se contredisent, la **cascade** tranche en trois étapes :
  1. l'**origine et l'importance** (vos styles passent avant ceux du navigateur ; `!important` passe avant le reste) ;
  2. la **spécificité** : identifiant > classe > élément, comparée de gauche à droite ;
  3. l'**ordre** : à égalité, la dernière règle l'emporte ;
- la spécificité se note (identifiants, classes, éléments) : (0, 10, 0) reste inférieur à (1, 0, 0) ;
- certaines propriétés sont **héritées** (`color`, `font-*`, `text-align`...), d'autres non (`margin`, `padding`, `border`, `background`) ;
- une valeur héritée est la plus faible de toutes : toute règle qui vise directement l'élément la remplace ;
- `!important` est un dernier recours ;
- en cas de doute, on **inspecte** l'élément avec les outils du navigateur : une déclaration barrée est une déclaration écrasée.

---

© Vincent Chiofalo