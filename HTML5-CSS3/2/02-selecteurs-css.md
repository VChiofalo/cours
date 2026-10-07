# Les sélecteurs CSS

Une règle CSS n'est utile que si elle vise **les bons éléments**. Le sélecteur joue le rôle d'une adresse : il indique au navigateur à quels éléments de la page appliquer les déclarations qui suivent.

Nous avons utilisé jusqu'ici trois sélecteurs (élément, classe, identifiant). CSS en propose beaucoup d'autres, que l'on peut regrouper en cinq familles :
- les **sélecteurs simples** : cibler un élément, une classe, un identifiant ;
- les **combinateurs** : cibler selon la **relation** entre les éléments (dans, juste après...) ;
- les **sélecteurs d'attribut** : cibler selon la présence ou la valeur d'un attribut ;
- les **pseudo-classes** : cibler selon un **état** ou une **position** (survolé, premier de la liste...) ;
- les **pseudo-éléments** : cibler une **partie** d'un élément (sa première lettre, le contenu qui précède...).

## Les sélecteurs simples

| Sélecteur | Écriture | Cible |
|---|---|---|
| Universel | `*` | tous les éléments de la page |
| Élément | `p` | tous les éléments `<p>` |
| Classe | `.intro` | les éléments ayant `class="intro"` |
| Identifiant | `#entete` | l'élément ayant `id="entete"` |

Le sélecteur universel `*` n'ajoute aucun poids à la spécificité. On l'utilise rarement, en général pour des réglages généraux de départ.

### Cumuler plusieurs conditions : pas d'espace

Lorsque plusieurs sélecteurs simples sont **collés**, l'élément doit respecter **toutes** les conditions :
```css
p.intro { ... }       /* un <p> qui possède la classe "intro" */
.carte.vedette { ... }   /* un élément qui possède les classes "carte" ET "vedette" */
```

Un élément HTML peut en effet posséder plusieurs classes, séparées par des espaces :
```html
<div class="carte vedette">...</div>
```

⚠️ **L'espace change complètement le sens d'un sélecteur.**

| Écriture | Signification |
|---|---|
| `p.intro` | un `<p>` qui possède la classe `intro` |
| `p .intro` | un élément de classe `intro` situé **à l'intérieur** d'un `<p>` |
| `.intro p` | un `<p>` situé **à l'intérieur** d'un élément de classe `intro` |

## Regrouper des sélecteurs : la virgule

Pour appliquer les mêmes déclarations à plusieurs sélecteurs, on les sépare par des **virgules** :
```css
h1, h2, h3 {
    color: darkblue;
}
```

Cette règle équivaut à trois règles distinctes. Chaque sélecteur du groupe garde **sa propre spécificité**.

## Les combinateurs : cibler selon la structure

Un combinateur exprime la **relation** entre deux éléments. Prenons ce menu à deux niveaux :
```html
<nav>
    <ul class="menu">
        <li><a href="index.html">Accueil</a></li>
        <li>
            <a href="ateliers.html">Ateliers</a>
            <ul>
                <li><a href="html.html">HTML</a></li>
                <li><a href="css.html">CSS</a></li>
            </ul>
        </li>
    </ul>
</nav>
```

### Le descendant (espace)

`nav a` cible tous les éléments `<a>` situés **n'importe où à l'intérieur** de `<nav>`, quel que soit le niveau d'imbrication : ici, les quatre liens.

### L'enfant direct (`>`)

`.menu > li` cible les `<li>` qui sont **enfants directs** de `.menu` : seulement les deux éléments de premier niveau (Accueil et Ateliers), et non ceux du sous-menu. De même, `.menu > li > a` cible uniquement les liens « Accueil » et « Ateliers ».

À l'inverse, `.menu li` (avec un espace) cible les **quatre** `<li>`.
```
ul.menu
├── li                  ← .menu > li   ✔
│   └── a
└── li                  ← .menu > li   ✔
    ├── a
    └── ul
        ├── li          ← .menu li ✔   mais pas .menu > li ✘
        └── li          ← .menu li ✔   mais pas .menu > li ✘
```

### Le frère adjacent (`+`) et les frères suivants (`~`)

Les « frères » sont les éléments qui ont le **même parent**. Avec le HTML suivant :
```html
<h2>Inscription</h2>
<p>Premier paragraphe.</p>
<p>Deuxième paragraphe.</p>
<p>Troisième paragraphe.</p>
```

- `h2 + p` cible le `<p>` placé **immédiatement après** le `<h2>` : le premier paragraphe uniquement ;
- `h2 ~ p` cible **tous** les `<p>` frères qui suivent le `<h2>` : les trois paragraphes.

### Récapitulatif

| Combinateur | Écriture | Cible |
|---|---|---|
| Descendant | `A B` | les `B` situés dans un `A`, à n'importe quel niveau |
| Enfant direct | `A > B` | les `B` qui sont enfants directs d'un `A` |
| Frère adjacent | `A + B` | le `B` placé immédiatement après un `A` |
| Frères suivants | `A ~ B` | tous les `B` placés après un `A`, avec le même parent |

Les combinateurs n'ajoutent **aucun poids** à la spécificité : seuls comptent les sélecteurs qu'ils relient.

## Les sélecteurs d'attribut

Un sélecteur d'attribut s'écrit entre **crochets** et cible les éléments selon un de leurs attributs :

| Écriture | Cible | Exemple |
|---|---|---|
| `[attr]` | les éléments qui possèdent l'attribut | `[disabled]` |
| `[attr="valeur"]` | la valeur est **exactement** celle-ci | `input[type="checkbox"]` |
| `[attr^="valeur"]` | la valeur **commence par** | `a[href^="https"]` |
| `[attr$="valeur"]` | la valeur **se termine par** | `a[href$=".pdf"]` |
| `[attr*="valeur"]` | la valeur **contient** | `a[href*="example"]` |

Quelques exemples d'utilisation :
```css
input[type="text"] { ... }      /* les champs de texte */
a[target="_blank"] { ... }      /* les liens qui s'ouvrent dans un nouvel onglet */
a[href$=".pdf"] { ... }         /* les liens vers un fichier PDF */
```

Ces sélecteurs sont particulièrement pratiques avec les formulaires et les liens, car ils évitent d'ajouter des classes partout. Un sélecteur d'attribut a le **même poids qu'une classe**.

## Les pseudo-classes : cibler un état ou une position

Une pseudo-classe s'écrit avec **un seul deux-points** `:`, collé au sélecteur. Elle ajoute une condition sur l'**état** ou la **position** de l'élément.
```css
a:hover { ... }
```

### Les états d'un lien et l'interaction

| Pseudo-classe | S'applique quand... |
|---|---|
| `:link` | le lien n'a pas encore été visité |
| `:visited` | le lien a déjà été visité |
| `:hover` | la souris survole l'élément |
| `:active` | l'élément est en train d'être cliqué |
| `:focus` | l'élément a le focus (clavier ou clic) |
| `:focus-visible` | l'élément a le focus et le navigateur juge utile de l'indiquer, notamment au clavier |

Exemple :
```css
a:link    { color: navy; }
a:visited { color: purple; }
a:hover   { color: crimson; }
a:active  { color: orangered; }
```

Ces quatre règles ont la **même spécificité** (0, 1, 1) : c'est donc l'**ordre** qui décide, comme nous l'avons vu avec la cascade. Il faut les écrire dans l'ordre **`:link`, `:visited`, `:hover`, `:active`** (on retient « LVHA », ou « LoVe HAte »). Dans un autre ordre, certains états ne s'affichent plus.

À savoir :
- `:hover` n'existe pas sur un écran tactile : une information essentielle ne doit jamais dépendre du survol ;
- `:visited` est limité par les navigateurs pour des raisons de confidentialité : on ne peut guère y modifier que les couleurs ;
- ⚠️ on ne supprime **jamais** l'indicateur de focus (le contour qui entoure l'élément) sans le remplacer par un autre : c'est le seul repère des personnes qui naviguent au clavier.

### La position parmi les frères

| Pseudo-classe | Cible |
|---|---|
| `:first-child` | l'élément qui est le **premier** enfant de son parent |
| `:last-child` | l'élément qui est le **dernier** enfant de son parent |
| `:nth-child(n)` | l'élément qui est le **n-ième** enfant de son parent |

Dans `:nth-child()`, on peut écrire :
- un nombre : `:nth-child(2)` pour le deuxième ;
- `odd` ou `even` : les éléments de rang impair ou pair ;
- une formule comme `3n` : un élément sur trois.

Exemple classique, pour colorer une ligne sur deux d'un tableau :
```css
tbody tr:nth-child(even) {
    background-color: lightgray;
}
```

`:nth-child()` compte **tous** les frères, quel que soit leur type. Pour ne compter que les éléments du **même type**, on utilise `:first-of-type`, `:last-of-type` ou `:nth-of-type()`.

### La négation : `:not()`

La pseudo-classe `:not()` **exclut** les éléments qui correspondent à son contenu :
```css
a:not([href^="https"]) { ... }   /* les liens qui ne pointent pas vers une adresse en https */
li:not(:last-child) { ... }      /* tous les <li> sauf le dernier */
```

Sa spécificité est celle de l'argument qu'elle contient.

### Les états d'un formulaire

| Pseudo-classe | S'applique quand... |
|---|---|
| `:checked` | la case ou le bouton radio est coché |
| `:disabled` | le champ est désactivé |
| `:required` | le champ est obligatoire |
| `:valid` / `:invalid` | le contenu respecte (ou non) les contraintes du champ |

Dans le formulaire du chapitre précédent, l'étiquette suit toujours son champ. On peut donc combiner une pseudo-classe et un combinateur :
```css
input:checked + label {
    font-weight: bold;
}
```

Cette règle met en gras l'étiquette de la case cochée.

⚠️ `:invalid` s'applique dès le chargement de la page à un champ obligatoire encore vide, avant que l'utilisateur n'ait rien saisi. On l'utilise donc avec précaution.

## Les pseudo-éléments : cibler une partie d'un élément

Un pseudo-élément s'écrit avec **deux deux-points** `::` et désigne une **partie** d'un élément, ou un contenu généré par CSS.

| Pseudo-élément | Cible |
|---|---|
| `::first-letter` | la première lettre d'un bloc de texte |
| `::first-line` | la première ligne d'un bloc de texte |
| `::before` | un contenu généré **avant** le contenu de l'élément |
| `::after` | un contenu généré **après** le contenu de l'élément |
| `::placeholder` | le texte d'exemple d'un champ de saisie |
| `::selection` | le texte sélectionné par l'utilisateur |

Exemples :
```css
p::first-letter { font-weight: bold; }
input::placeholder { color: gray; }
```

Pour `::before` et `::after`, la propriété `content` définit le texte à insérer. Sans elle, rien ne s'affiche :
```css
a[target="_blank"]::after {
    content: " ↗";
}

a[href$=".pdf"]::after {
    content: " (PDF)";
}
```

Le fichier CSS doit être enregistré en **UTF-8** pour que les caractères spéciaux s'affichent correctement.

⚠️ Le contenu généré est **décoratif** : il n'est pas toujours annoncé par les lecteurs d'écran et ne peut pas être sélectionné ni copié. On ne l'utilise jamais pour une information essentielle.

⚠️ Il ne faut pas confondre `:` (pseudo-classe, un **état**) et `::` (pseudo-élément, une **partie**).

## La spécificité : récapitulatif

Le chapitre précédent présentait trois niveaux : identifiants, classes, éléments. Voici où se classent les nouveaux sélecteurs :

| Sélecteur | Niveau |
|---|---|
| `*`, combinateurs (espace, `>`, `+`, `~`) | aucun poids |
| Élément (`p`), pseudo-élément (`::after`) | éléments |
| Classe (`.intro`), attribut (`[href]`), pseudo-classe (`:hover`) | classes |
| Identifiant (`#entete`) | identifiants |
| `:not(X)` | le poids de `X` |

Un sélecteur complexe est le **total de ses composants**, niveau par niveau. Par exemple, `nav a[target="_blank"]::after` contient deux éléments (`nav`, `a`), un attribut et un pseudo-élément : sa spécificité est (0, 1, 3).

### Choisir de bons sélecteurs

Pouvoir écrire un sélecteur ne veut pas dire que c'est le bon. Quelques principes :

- **Privilégier les classes.** Elles sont réutilisables et leur spécificité est modérée, donc faciles à surcharger. On réserve plutôt les identifiants aux ancres et à JavaScript.
- **Donner aux classes des noms qui décrivent un rôle**, pas un aspect : `.bouton-principal` plutôt que `.rouge`. On écrit en minuscules, sans accents ni espaces, en séparant les mots par des tirets.
- **Rester simple.** Un sélecteur comme `body main section ul li a` casse dès que le HTML change, et sa spécificité élevée rend les exceptions difficiles à écrire.
- **Ne pas sur-qualifier.** `.menu` suffit presque toujours : écrire `ul.menu` ou `div.carte` n'apporte rien.
- **Aller du général au particulier.** On définit le style général avec des sélecteurs d'éléments (`a`, `h1`), puis on traite les exceptions avec des classes.

## Une méthode simple pour écrire un sélecteur

Pour construire un sélecteur, on se pose trois questions :

**1. Quels éléments vise-t-on ?**

Un type d'élément (`p`), une classe (`.carte`), un identifiant (`#entete`), ou un attribut (`[type="checkbox"]`) ?

**2. Où se trouvent-ils ?**

À l'intérieur d'un autre élément (espace), comme enfant direct (`>`), juste après un autre élément (`+`) ?

**3. Dans quel état, à quelle position ?**

Survolé (`:hover`), premier de sa liste (`:first-child`), coché (`:checked`) ? Ou bien une partie de l'élément (`::first-letter`) ?

Pour vérifier, on **inspecte** l'élément avec les outils du navigateur : la règle doit apparaître dans le panneau Styles.

### Aide-mémoire

| Je veux cibler... | Sélecteur |
|---|---|
| tous les paragraphes | `p` |
| les éléments d'une classe | `.nom` |
| un paragraphe d'une classe | `p.nom` |
| les liens du menu | `nav a` |
| les enfants directs d'une liste | `ul > li` |
| le paragraphe qui suit un titre | `h2 + p` |
| les liens qui s'ouvrent dans un nouvel onglet | `a[target="_blank"]` |
| un lien survolé | `a:hover` |
| une ligne sur deux | `tr:nth-child(even)` |
| tout sauf le dernier | `li:not(:last-child)` |
| la première lettre | `p::first-letter` |

## Exemple complet

Voici une page et sa feuille de style qui mettent en œuvre plusieurs familles de sélecteurs. Les propriétés utilisées (`color`, `font-weight`, `font-style`, `background-color`, `content`) seront détaillées dans le chapitre suivant.

**index.html**
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Atelier HTML</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <nav aria-label="Navigation principale">
        <ul class="menu">
            <li><a href="index.html" aria-current="page">Accueil</a></li>
            <li><a href="ateliers.html">Ateliers</a></li>
            <li>
                <a href="https://developer.mozilla.org/fr/" target="_blank" rel="noopener noreferrer">MDN</a>
            </li>
            <li><a href="documents/programme.pdf">Programme</a></li>
        </ul>
    </nav>

    <main>

        <h1>Atelier HTML</h1>
        <p class="intro">Bienvenue à l'atelier.</p>
        <p>Au programme : les balises et les attributs.</p>

        <h2>Exercices</h2>
        <ul class="exercices">
            <li>Première page</li>
            <li>Chasse aux erreurs</li>
            <li>Liens et images</li>
            <li>Mini-projet</li>
        </ul>

    </main>

</body>

</html>
```

**css/style.css**
```css
/* 1. Liens du menu */
nav a { color: navy; }

/* 2. Lien du menu survolé */
nav a:hover { color: crimson; }

/* 3. Lien de la page courante */
nav a[aria-current="page"] { font-weight: bold; }

/* 4. Liens externes : petite flèche après le lien */
nav a[target="_blank"]::after { content: " ↗"; }

/* 5. Liens vers un PDF */
nav a[href$=".pdf"]::after { content: " (PDF)"; }

/* 6. Titres du contenu */
h1, h2 { color: darkgreen; }

/* 7. Première lettre de l'introduction */
p.intro::first-letter { font-weight: bold; }

/* 8. Paragraphe placé juste après l'introduction */
.intro + p { font-style: italic; }

/* 9. Une ligne sur deux dans la liste des exercices */
.exercices li:nth-child(odd) { background-color: lightgray; }
```

**Analyse : que cible chaque règle ?**

| N° | Sélecteur | Éléments ciblés | Spécificité |
|---|---|---|---|
| 1 | `nav a` | les quatre liens du menu | (0, 0, 2) |
| 2 | `nav a:hover` | le lien du menu actuellement survolé | (0, 1, 2) |
| 3 | `nav a[aria-current="page"]` | le lien « Accueil » | (0, 1, 2) |
| 4 | `nav a[target="_blank"]::after` | le contenu ajouté après le lien « MDN » | (0, 1, 3) |
| 5 | `nav a[href$=".pdf"]::after` | le contenu ajouté après le lien « Programme » | (0, 1, 3) |
| 6 | `h1, h2` | le titre `<h1>` et le titre `<h2>` | (0, 0, 1) chacun |
| 7 | `p.intro::first-letter` | la lettre « B » de « Bienvenue » | (0, 1, 2) |
| 8 | `.intro + p` | le second paragraphe de `<main>` | (0, 1, 1) |
| 9 | `.exercices li:nth-child(odd)` | les 1er et 3e éléments de la liste | (0, 2, 1) |

Quand l'utilisateur survole un lien du menu, les règles 1 et 2 visent toutes deux la propriété `color`. La règle 2, plus spécifique, l'emporte et le lien devient rouge. À l'inverse, la règle 3 (gras) ne vise pas la même propriété que la règle 1 (couleur) : les deux s'appliquent ensemble au lien « Accueil ».

## Les erreurs courantes à éviter

- **oublier ou ajouter un espace** dans un sélecteur : `p.intro` et `p .intro` ne cibleront pas les mêmes éléments ;
- **confondre la virgule et l'espace** : `h1, h2` cible deux types d'éléments, `h1 h2` cible un `<h2>` placé dans un `<h1>` ;
- **confondre `:` et `::`** ;
- **écrire les pseudo-classes de liens dans le désordre** : respecter `:link`, `:visited`, `:hover`, `:active` ;
- **utiliser `::before` ou `::after` sans la propriété `content`** : rien ne s'affiche ;
- **croire que `:nth-child(2)` cible le deuxième `<li>`** : il cible le deuxième enfant, quel que soit son type, à condition que ce soit un `<li>` ;
- **confier une information essentielle au survol** ou à un contenu généré ;
- **supprimer le contour de focus** sans le remplacer ;
- **écrire des sélecteurs très longs ou liés à la structure du HTML**, fragiles et difficiles à surcharger ;
- **se fier à `:invalid`** sans tenir compte du fait qu'il s'applique avant toute saisie.

## À retenir

Le sélecteur indique **quels éléments** reçoivent les déclarations. On peut les regrouper en cinq familles :

```
SIMPLES          *    p    .classe    #id    p.classe    .a.b
GROUPE           h1, h2, h3
COMBINATEURS     A B    A > B    A + B    A ~ B
ATTRIBUTS        [attr]   [attr="v"]   [attr^="v"]   [attr$="v"]   [attr*="v"]
PSEUDO-CLASSES   :hover  :focus  :first-child  :nth-child()  :not()  :checked ...
PSEUDO-ÉLÉMENTS  ::before  ::after  ::first-letter  ::placeholder ...
```

Les règles essentielles :
- sans espace entre deux sélecteurs, **toutes** les conditions s'appliquent à **un seul** élément (`p.intro`) ; avec un espace, on cible un **descendant** (`p .intro`) ;
- la virgule **regroupe** des sélecteurs (`h1, h2`), l'espace exprime une **relation**, `>` désigne l'enfant direct, `+` le frère adjacent et `~` les frères suivants ;
- les sélecteurs d'attribut permettent de cibler selon la **valeur** d'un attribut, y compris son début, sa fin ou son contenu ;
- une pseudo-classe (`:`) cible un **état** ou une **position**, un pseudo-élément (`::`) cible une **partie** d'un élément ;
- les pseudo-classes de liens s'écrivent dans l'ordre `:link`, `:visited`, `:hover`, `:active` ;
- classes, attributs et pseudo-classes pèsent autant les uns que les autres ; éléments et pseudo-éléments pèsent le moins ; les combinateurs et `*` n'ont aucun poids ;
- on privilégie des **classes bien nommées** et des sélecteurs **courts**, en allant du général au particulier ;
- le contenu généré (`::before`, `::after`) et le survol ne doivent jamais porter une information essentielle.

## Liens utiles

**Documentations** :
- https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Selectors

## À vous

Allez sur https://flukeout.github.io/ et laissez vous guider par le jeu en apprenant à bien maîtriser les selecteurs !

---

© Vincent Chiofalo