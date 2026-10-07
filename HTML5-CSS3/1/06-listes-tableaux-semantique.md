# Les listes, tableaux et éléments sémantiques

Une page web ne se limite pas à une succession de titres et de paragraphes. Un contenu bien structuré aide le lecteur à se repérer, les moteurs de recherche à le comprendre et les technologies d'assistance à le parcourir.

Dans ce chapitre, nous verrons trois familles d'outils, qui répondent chacune à une question :
- les **listes** : comment présenter une série d'éléments ?
- les **tableaux** : comment présenter des données organisées en lignes et en colonnes ?
- les **éléments sémantiques** : comment indiquer *le sens* de chaque morceau de contenu ?

## Les listes

### Les listes non ordonnées : `<ul>`

Une liste **non ordonnée** présente des éléments dont l'ordre n'a pas d'importance (par exemple une liste de courses). Le navigateur les affiche généralement avec des puces.
```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
```

Deux éléments travaillent ensemble :
- `<ul>` (*unordered list*) : la liste ;
- `<li>` (*list item*) : un élément de la liste.

Les seuls enfants directs d'un `<ul>` sont des `<li>`. Le contenu de chaque élément se place **à l'intérieur** du `<li>` : du texte, un lien, une image...
```html
<ul>
    <li><a href="html.html">Le cours HTML</a></li>
    <li><a href="css.html">Le cours CSS</a></li>
</ul>
```

### Les listes ordonnées : `<ol>`

Une liste **ordonnée** présente des éléments dont l'ordre compte (étapes d'une procédure, classement). Le navigateur les numérote automatiquement.
```html
<ol>
    <li>Créer un dossier de projet</li>
    <li>Créer le fichier <code>index.html</code></li>
    <li>Ouvrir le fichier dans le navigateur</li>
</ol>
```

Deux attributs permettent d'adapter la numérotation :
- `start` : numéro de départ (`<ol start="5">` commence à 5) ;
- `reversed` : numérotation décroissante (attribut booléen).

Il ne faut jamais écrire soi-même la numérotation (« 1. », « 2. »...) dans le texte : c'est le rôle de `<ol>`. Le **style** des puces et des numéros se règle ensuite avec CSS.

### Imbriquer des listes

Pour créer une **sous-liste**, on place une nouvelle liste **à l'intérieur d'un `<li>`**, et non directement dans le `<ul>`.
```html
<ul>
    <li>
        Front-End
        <ul>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
    </li>
    <li>
        Back-End
        <ul>
            <li>PHP</li>
            <li>Node.js</li>
        </ul>
    </li>
</ul>
```

On retrouve ici la règle d'imbrication vue précédemment :
```
ul
├── li
│   ├── "Front-End"
│   └── ul
│       ├── li → HTML
│       └── li → CSS
└── li
    ├── "Back-End"
    └── ul
        ├── li → PHP
        └── li → Node.js
```

### Les listes de description : `<dl>`

Une liste de **description** associe des **termes** à leurs **définitions** : glossaire, questions/réponses, fiche technique.
```html
<dl>
    <dt>HTML</dt>
    <dd>Langage de balisage qui structure le contenu d'une page.</dd>

    <dt>CSS</dt>
    <dd>Langage qui décrit la présentation d'une page.</dd>
</dl>
```

Trois éléments sont utilisés :
- `<dl>` : la liste de description ;
- `<dt>` : le **terme** décrit ;
- `<dd>` : la **description** de ce terme (un terme peut avoir plusieurs `<dd>`).

### Quelle liste choisir ?

| Besoin | Élément |
|---|---|
| Éléments sans ordre particulier | `<ul>` |
| Étapes, classement, ordre important | `<ol>` |
| Termes et leurs définitions | `<dl>` |

### Les menus de navigation sont des listes

Un menu est une **liste de liens**. On l'écrit donc en général sous la forme `<nav>` + `<ul>` + `<li>` + `<a>` :
```html
<nav>
    <ul>
        <li><a href="index.html">Accueil</a></li>
        <li><a href="ateliers.html">Ateliers</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

Cette structure permet à un lecteur d'écran d'annoncer « liste de 3 éléments » et de naviguer rapidement. Avec CSS, on pourra ensuite afficher cette liste à l'horizontale pour obtenir un menu classique.

## Les tableaux

### Quand utiliser un tableau ?

Un tableau sert à présenter des **données à deux dimensions** : des informations qui se lisent à la fois en ligne et en colonne (planning, tarifs, résultats...).

Un tableau n'est **jamais** un outil de mise en page. Pour placer des blocs côte à côte, on utilisera CSS.

### Structure de base

Un tableau est construit avec quatre éléments :
- `<table>` : le tableau ;
- `<tr>` (*table row*) : une ligne ;
- `<th>` (*table header*) : une cellule d'**en-tête** ;
- `<td>` (*table data*) : une cellule de **données**.
```html
<table>
    <tr>
        <th>Prénom</th>
        <th>Note</th>
    </tr>
    <tr>
        <td>Camille</td>
        <td>15</td>
    </tr>
    <tr>
        <td>Karim</td>
        <td>13</td>
    </tr>
</table>
```

Un tableau se construit **ligne par ligne** : chaque `<tr>` contient autant de cellules que de colonnes.
```
table
├── tr
│   ├── th → Prénom
│   └── th → Note
├── tr
│   ├── td → Camille
│   └── td → 15
└── tr
    ├── td → Karim
    └── td → 13
```

### Les en-têtes et l'attribut `scope`

Les cellules `<th>` indiquent qu'une cellule est un **en-tête**. L'attribut `scope` précise ce qu'elle décrit :
- `scope="col"` : l'en-tête décrit sa **colonne** ;
- `scope="row"` : l'en-tête décrit sa **ligne**.
```html
<tr>
    <th scope="row">Lundi</th>
    <td>Initiation au HTML</td>
</tr>
```

Un lecteur d'écran peut ainsi annoncer, pour chaque cellule, l'en-tête correspondant (« Lundi, Initiation au HTML »).

### Le titre du tableau : `<caption>`

L'élément `<caption>` donne un **titre** au tableau. Il doit être le **premier enfant** de `<table>`.
```html
<table>
    <caption>Notes du premier semestre</caption>
    <!-- lignes du tableau -->
</table>
```

### Organiser un tableau : `<thead>`, `<tbody>`, `<tfoot>`

Pour les tableaux plus complets, on regroupe les lignes en trois zones :
- `<thead>` : l'**en-tête** du tableau ;
- `<tbody>` : le **corps**, c'est-à-dire les données ;
- `<tfoot>` : le **pied**, par exemple une ligne de total.
```html
<table>
    <caption>Budget du club</caption>

    <thead>
        <tr>
            <th scope="col">Poste</th>
            <th scope="col">Montant</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <th scope="row">Matériel</th>
            <td>300 €</td>
        </tr>
        <tr>
            <th scope="row">Abonnements</th>
            <td>120 €</td>
        </tr>
    </tbody>

    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>420 €</td>
        </tr>
    </tfoot>
</table>
```

Cette organisation facilite aussi la mise en forme avec CSS, car on peut cibler séparément l'en-tête, le corps et le pied.

### Fusionner des cellules : `colspan` et `rowspan`

Deux attributs permettent à une cellule de s'étendre sur plusieurs colonnes ou plusieurs lignes :
- `colspan="n"` : la cellule occupe `n` **colonnes** ;
- `rowspan="n"` : la cellule occupe `n` **lignes**.
```html
<table>
    <tr>
        <th scope="col" colspan="2">Résultats</th>
    </tr>
    <tr>
        <th scope="col">Prénom</th>
        <th scope="col">Note</th>
    </tr>
    <tr>
        <td>Camille</td>
        <td>15</td>
    </tr>
</table>
```

Quand une cellule en couvre plusieurs, il faut **retirer** les cellules qu'elle remplace : chaque ligne doit toujours « totaliser » le même nombre de colonnes. Les fusions compliquent la lecture, notamment pour les lecteurs d'écran : on les utilise avec parcimonie.

### Les erreurs courantes avec les tableaux

- **utiliser un tableau pour la mise en page** ;
- **oublier les `<th>`** : sans en-têtes, le tableau perd son sens pour un lecteur d'écran ;
- **un nombre de cellules différent d'une ligne à l'autre** ;
- **placer des `<td>` directement dans `<table>`**, sans `<tr>` ;
- **oublier le `<caption>`**, qui facilite la compréhension du tableau.

## Les éléments sémantiques

Nous avons déjà rencontré les principales balises de structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`). Il reste à savoir **bien les choisir**, et à connaître les balises qui donnent du sens au contenu *à l'intérieur* des blocs.

### Bien choisir ses balises de structure

| Je veux représenter... | Balise |
|---|---|
| le contenu principal, propre à cette page | `<main>` |
| l'en-tête d'une page, d'un article ou d'une section | `<header>` |
| le pied d'une page, d'un article ou d'une section | `<footer>` |
| un bloc de liens de navigation important | `<nav>` |
| un contenu autonome, compréhensible isolément | `<article>` |
| un regroupement thématique, avec un titre | `<section>` |
| un contenu complémentaire, en marge du propos | `<aside>` |

Quelques règles à retenir :
- il n'y a qu'**un seul `<main>`** visible par page ;
- `<header>` et `<footer>` peuvent apparaître **plusieurs fois** : à l'échelle de la page, mais aussi à l'intérieur d'un `<article>` ou d'une `<section>` ;
- `<nav>` est réservé aux **blocs de navigation principaux**, pas à chaque petit groupe de liens ;
- une `<section>` doit normalement commencer par un **titre** (`<h2>`, `<h3>`...) ;
- pour hésiter entre `<article>` et `<section>`, on se demande : « ce contenu pourrait-il être publié seul, par exemple dans un flux d'actualités ? » Si oui, c'est un `<article>`.

Ces balises définissent aussi des **repères** (*landmarks*) dans la page : un lecteur d'écran permet de passer directement à la navigation, au contenu principal ou au pied de page, un peu comme on utilise une table des matières.

### Donner du sens au texte

HTML propose de nombreux éléments qui précisent le rôle d'un passage **à l'intérieur d'un paragraphe**.

| Élément | Sens | Exemple |
|---|---|---|
| `<strong>` | importance forte | `<strong>Attention</strong>` |
| `<em>` | emphase (mot sur lequel on insiste) | `Je suis <em>vraiment</em> content` |
| `<mark>` | passage mis en évidence car pertinent | `<mark>formulaire</mark>` |
| `<abbr>` | abréviation, avec son sens dans `title` | `<abbr title="HyperText Markup Language">HTML</abbr>` |
| `<time>` | date ou heure, lisible par une machine | `<time datetime="2026-10-14">14 octobre 2026</time>` |
| `<code>` | extrait de code | `<code>&lt;p&gt;</code>` |
| `<q>` | courte citation, dans une phrase | `<q>Apprendre en pratiquant</q>` |
| `<small>` | remarque secondaire, mention légale | `<small>Tous droits réservés</small>` |

L'attribut `datetime` de `<time>` contient la date dans un format normalisé (`AAAA-MM-JJ`, ou `AAAA-MM-JJTHH:MM` avec l'heure), tandis que le contenu de l'élément reste libre et lisible pour le lecteur.

Il existe aussi `<b>` et `<i>`, qui mettent un texte en gras ou en italique **sans lui donner de signification particulière**. On préfère `<strong>` et `<em>` quand le texte est réellement important ou accentué. Pour une pure question d'apparence, on utilisera CSS.

### Les citations : `<blockquote>`

Une citation **longue**, qui forme un bloc à part, utilise `<blockquote>`. L'élément `<cite>` désigne le titre de l'œuvre ou le nom de la source.
```html
<blockquote cite="https://example.com/article">
    <p>Le code est lu bien plus souvent qu'il n'est écrit.</p>
</blockquote>
<p>Source : <cite>Guide des bonnes pratiques</cite></p>
```

### Le code sur plusieurs lignes : `<pre>` et `<code>`

HTML ignore normalement les espaces et retours à la ligne multiples. L'élément `<pre>` (*preformatted*) **conserve** la mise en forme du texte. Associé à `<code>`, il permet d'afficher un extrait de programme :
```html
<pre><code>function bonjour() {
    console.log("Bonjour");
}</code></pre>
```

Pour afficher les caractères `<` et `>` dans un exemple de code HTML, on utilise les entités `&lt;` et `&gt;`.

### Illustrer avec `<figure>` et `<figcaption>`

Pour associer une image (ou un schéma, un extrait de code...) à sa **légende**, on utilise `<figure>` et `<figcaption>` :
```html
<figure>
    <img src="images/atelier.jpg" alt="Des élèves travaillant sur des ordinateurs">
    <figcaption>L'atelier d'initiation du mercredi</figcaption>
</figure>
```

La légende est ainsi **liée** à l'image, contrairement à un simple paragraphe placé en dessous. Le `alt` décrit l'image ; la légende apporte un complément pour tout le monde.

### Les coordonnées de contact : `<address>`

L'élément `<address>` indique les **informations de contact** de l'auteur d'une page ou d'un article. Il n'est pas destiné à n'importe quelle adresse postale citée dans un texte.
```html
<address>
    Club informatique<br>
    <a href="mailto:club@example.com">club@example.com</a>
</address>
```

### Du contenu repliable : `<details>` et `<summary>`

L'élément `<details>` crée un bloc que l'utilisateur peut **déplier ou replier**. `<summary>` en est le titre toujours visible.
```html
<details>
    <summary>Qu'est-ce que le HTML ?</summary>
    <p>HTML est le langage qui structure le contenu d'une page web.</p>
</details>
```

Ce comportement est géré directement par le navigateur, sans JavaScript. L'attribut booléen `open` affiche le bloc déplié par défaut.

### Quand aucune balise ne convient : `<div>` et `<span>`

Il arrive qu'aucun élément sémantique ne corresponde à ce que l'on souhaite regrouper, par exemple pour appliquer un style ou un comportement. HTML fournit alors deux conteneurs **génériques**, sans signification :
- `<div>` : conteneur générique de **bloc** ;
- `<span>` : conteneur générique **en ligne**, à l'intérieur d'un texte.
```html
<div class="carte">
    <h3>Atelier du mercredi</h3>
    <p>Rendez-vous à <span class="horaire">14 h</span>.</p>
</div>
```

On les associe en général à des attributs `class` ou `id` pour les cibler avec CSS.

Règle de bon sens :

    On choisit d'abord un élément sémantique. On n'utilise `<div>` ou `<span>` que si aucun ne convient.

Vous pouvez dès maintenant utiliser `<div>` à la place de `<p>` pour regrouper un `<label>` et son champ dans un formulaire.

#### Éléments de bloc et éléments en ligne

Cette distinction, déjà visible dans `<div>` et `<span>`, concerne tous les éléments HTML :
- un élément de **bloc** occupe toute la largeur disponible et commence sur une **nouvelle ligne** : `<p>`, `<h1>` à `<h6>`, `<ul>`, `<ol>`, `<table>`, `<form>`, `<div>`, `<section>`... ;
- un élément **en ligne** s'insère **dans le flux du texte**, sans retour à la ligne : `<a>`, `<strong>`, `<em>`, `<span>`, `<img>`, `<code>`...

Cette notion sera au cœur de la mise en page avec CSS.

### Exemple complet

Voici une page qui combine les notions de ce chapitre :
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Programme des ateliers du club informatique</title>
</head>

<body>

    <header>
        <h1>Programme des ateliers</h1>

        <nav>
            <ul>
                <li><a href="index.html">Accueil</a></li>
                <li><a href="ateliers.html">Ateliers</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>

        <section>
            <h2>Planning de la semaine</h2>

            <table>
                <caption>Ateliers d'octobre 2026</caption>

                <thead>
                    <tr>
                        <th scope="col">Jour</th>
                        <th scope="col">Atelier</th>
                        <th scope="col">Horaire</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th scope="row">Lundi</th>
                        <td>Initiation au HTML</td>
                        <td>14 h – 16 h</td>
                    </tr>
                    <tr>
                        <th scope="row">Mercredi</th>
                        <td>Atelier CSS</td>
                        <td>14 h – 17 h</td>
                    </tr>
                    <tr>
                        <th scope="row">Vendredi</th>
                        <td>Projet libre</td>
                        <td>10 h – 12 h</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section>
            <h2>Avant de venir</h2>

            <p>Pour préparer votre poste de travail :</p>
            <ol>
                <li>Installer un éditeur de code</li>
                <li>Créer un dossier de projet</li>
                <li>Ouvrir un navigateur à jour</li>
            </ol>

            <p>Pensez à apporter :</p>
            <ul>
                <li>votre ordinateur portable</li>
                <li>un chargeur</li>
                <li>une clé USB</li>
            </ul>
        </section>

        <article>
            <header>
                <h2>Retour sur le dernier atelier</h2>
                <p>Publié le <time datetime="2026-10-15">15 octobre 2026</time></p>
            </header>

            <figure>
                <img src="images/atelier.jpg" alt="Des élèves travaillant sur des ordinateurs">
                <figcaption>L'atelier d'initiation du mercredi</figcaption>
            </figure>

            <p>
                Les participants ont créé leur première page
                <abbr title="HyperText Markup Language">HTML</abbr>
                et découvert <em>pourquoi</em> la structure est importante.
            </p>
        </article>

        <aside>
            <h2>Glossaire</h2>

            <dl>
                <dt>Balise</dt>
                <dd>Repère qui indique la nature d'un contenu.</dd>

                <dt>Attribut</dt>
                <dd>Information supplémentaire placée dans une balise ouvrante.</dd>
            </dl>

            <details>
                <summary>Besoin d'aide ?</summary>
                <p>Venez nous voir à la fin de chaque atelier.</p>
            </details>
        </aside>

    </main>

    <footer>
        <address>
            Club informatique<br>
            <a href="mailto:club@example.com">club@example.com</a>
        </address>
        <p><small>© 2026 Club informatique</small></p>
    </footer>

</body>

</html>
```

Dans cet exemple, nous retrouvons :
- une **liste de navigation** (`<nav>`, `<ul>`, `<li>`) ;
- un **tableau complet** avec `<caption>`, `<thead>`, `<tbody>` et des `scope` ;
- une **liste ordonnée**, une **liste non ordonnée** et une **liste de description** ;
- un `<article>` avec son propre `<header>`, une `<figure>` légendée, un `<time>`, un `<abbr>` et un `<em>` ;
- un `<aside>` contenant un bloc `<details>` ;
- un `<footer>` avec `<address>` et `<small>`.

### Une méthode simple pour choisir un élément

Face à un morceau de contenu, on peut se poser trois questions dans l'ordre :

**1. Que représente ce contenu ?**

Un menu, un article, une série d'étapes, des données chiffrées, une légende, une date, une citation...

**2. Existe-t-il un élément HTML pour cela ?**

Si oui, on l'utilise (`<nav>`, `<ol>`, `<table>`, `<figure>`, `<time>`, `<blockquote>`...).

**3. Sinon, quel conteneur générique utiliser ?**

`<div>` pour un bloc, `<span>` pour un passage dans un texte, accompagnés d'une `class` ou d'un `id`.

### Les erreurs courantes à éviter

- **simuler une liste** avec des `<br>` ou des tirets au lieu de `<ul>` et `<li>` ;
- **écrire la numérotation à la main** dans une liste `<ol>` ;
- **placer un `<ul>` directement dans un `<ul>`**, au lieu de l'insérer dans un `<li>` ;
- **utiliser plusieurs `<main>`** dans une même page ;
- **mettre toute la page dans des `<div>`** alors que des éléments sémantiques existent ;
- **utiliser `<strong>` ou `<em>` pour obtenir seulement du gras ou de l'italique** ;
- **utiliser `<section>` comme simple conteneur** sans titre : c'est le rôle de `<div>` ;
- **utiliser `<blockquote>` pour décaler un texte** : c'est un effet de mise en forme, qui relève de CSS.

## À retenir

Les listes, les tableaux et les éléments sémantiques permettent de **donner une structure et un sens** au contenu.

```
LISTES
   ul    → éléments sans ordre
   ol    → éléments ordonnés
   dl    → termes et définitions
   li    → un élément (seul enfant d'une ul / ol)

TABLEAUX
   table → tr → th / td
   caption, thead, tbody, tfoot
   scope, colspan, rowspan

SÉMANTIQUE
   structure : header, nav, main, section, article, aside, footer
   texte     : strong, em, mark, abbr, time, code, q, small
   médias    : figure + figcaption
   divers    : blockquote, pre, address, details + summary
   sans sens : div (bloc), span (en ligne)
```

Les règles essentielles :
- une liste est composée de `<li>` ; une sous-liste se place **dans** un `<li>` ;
- un menu de navigation est une liste de liens, placée dans un `<nav>` ;
- un tableau sert à présenter des **données**, jamais à mettre en page ;
- les en-têtes de tableau sont des `<th>`, accompagnés de `scope`, et le titre est un `<caption>` ;
- chaque ligne d'un tableau contient le même nombre de cellules (en tenant compte de `colspan` et `rowspan`) ;
- on choisit une balise pour sa **signification**, pas pour son apparence ;
- il n'y a qu'un seul `<main>` par page, alors que `<header>` et `<footer>` peuvent être répétés ;
- `<div>` et `<span>` ne s'utilisent que lorsqu'aucun élément sémantique ne convient ;
- les éléments sont **de bloc** (nouvelle ligne) ou **en ligne** (dans le texte) : une distinction essentielle pour CSS.

---

© Vincent Chiofalo