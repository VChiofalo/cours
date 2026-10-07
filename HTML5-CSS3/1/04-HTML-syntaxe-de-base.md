# Connaître la syntaxe de base d'HTML : balises, éléments et attributs

Après avoir découvert le rôle d'HTML dans la structure d'une page web, il est maintenant nécessaire de comprendre sa **syntaxe de base**.

Pour écrire du HTML correctement, trois notions sont essentielles :
- les **balises** ;
- les **éléments** ;
- les **attributs**.

La compréhension de ces trois notions permet de lire, écrire et organiser progressivement du code HTML.

## Les balises HTML

Une **balise** est un élément de syntaxe utilisé par HTML pour indiquer au navigateur la nature d'un contenu. Elle est écrite entre les caractères `<` et `>`.

Pour de nombreux éléments, deux balises encadrent le contenu :
- la **balise ouvrante**, par exemple `<p>`, qui indique le début du paragraphe ;
- la **balise fermante**, par exemple `</p>`, où la barre oblique `/` signale la fin.

La forme générale est :
```html
<nom-de-balise>contenu</nom-de-balise>
```

Par exemple :
```html
<h1>Bienvenue</h1>
<p>Découvrez mon site web.</p>
<strong>Texte important</strong>
```

Chaque balise indique au navigateur comment interpréter le contenu qu'elle encadre.

Il est important de respecter le nom de la balise et sa syntaxe : un paragraphe écrit `<p>Bonjour` sans balise fermante reste ouvert. Même si les navigateurs sont capables de corriger certaines erreurs HTML, il est préférable d'écrire un code correctement structuré dès le départ.

## Les éléments HTML

Il ne faut pas confondre **balise** et **élément**.

Prenons l'exemple :
```html
<p>Bienvenue sur mon site.</p>
```

L'ensemble constitue un **élément HTML** :
```
Élément HTML
│
├── Balise ouvrante
│   └── <p>
│
├── Contenu
│   └── Bienvenue sur mon site.
│
└── Balise fermante
    └── </p>
```

La balise constitue donc une partie de l'élément. Cette distinction devient particulièrement importante lorsque les éléments sont imbriqués les uns dans les autres.

## L'imbrication des éléments

Les éléments HTML peuvent être placés à l'intérieur d'autres éléments.

Par exemple :
```html
<p>
    Bienvenue sur
    <strong>mon site web</strong>.
</p>
```

L'élément `<strong>` est ici placé à l'intérieur de l'élément `<p>`.

On peut représenter cette organisation sous forme d'arbre :
```
p
└── strong
    └── mon site web
```

Cette organisation hiérarchique, appelée **imbrication**, est fondamentale en HTML : elle permet au navigateur, aux moteurs de recherche et aux technologies d'assistance de comprendre la structure du document.

## Respecter l'ordre des balises

Lorsque plusieurs éléments sont imbriqués, ils doivent être correctement fermés.

Correct :
```html
<p>
    Voici un <strong>texte important</strong>.
</p>
```

Incorrect :
```html
<p>
    Voici un <strong>texte important.
</p>
</strong>
```

La règle peut être résumée ainsi : **Le dernier élément ouvert doit être le premier élément fermé.**

On peut comparer cela à des boîtes placées les unes dans les autres :
```
<p>
    └── <strong>
            └── contenu
        </strong>
</p>
```

Cette règle permet de conserver une structure HTML cohérente.

## Les éléments sans contenu

Tous les éléments HTML ne fonctionnent pas avec une paire de balises ouvrante et fermante.

Certains éléments sont dits **vides** : ils ne contiennent pas de contenu entre une balise ouvrante et une balise fermante.

Un exemple courant est :
```html
<img src="photo.jpg" alt="Paysage">
```

Il n'est pas nécessaire d'écrire :
```html
<img>...</img>
```

De même, on rencontre notamment :
```html
<br>
<hr>
<meta charset="UTF-8">
<link rel="stylesheet" href="style.css">
```

Ces éléments ont un rôle spécifique et ne possèdent pas de contenu textuel à encadrer.

## La notation avec `/`

On peut également rencontrer une écriture comme :
```html
<img src="photo.jpg" alt="Paysage" />
```

Cette notation est historiquement fréquente et reste reconnue dans certains contextes.

En HTML moderne, on utilise généralement :
```html
<img src="photo.jpg" alt="Paysage">
```

Il est donc important de ne pas considérer `/>` comme obligatoire en HTML5.

## Les attributs HTML

Les attributs permettent d'ajouter des informations à un élément HTML. Ils sont placés dans la **balise ouvrante** et sont particulièrement importants pour l'**accessibilité**, le fonctionnement des éléments et la communication d'informations au navigateur.

Exemple :
```html
<a href="https://www.example.com">
    Visiter le site
</a>
```

Ici, `href` est un attribut dont la valeur indique la destination du lien.

Un attribut s'écrit généralement sous la forme `nom="valeur"`, la valeur étant placée entre guillemets. Par exemple :
```
id="menu"
class="navigation"
src="image.jpg"
alt="Description de l'image"
href="contact.html"
```

## Plusieurs attributs sur un même élément

Un élément peut posséder plusieurs attributs, séparés par des espaces.

Par exemple :
```html
<img
    src="images/logo.png"
    alt="Logo de mon entreprise"
    width="200"
    height="80"
>
```

Cet élément possède quatre attributs :
- `src` → emplacement de l'image ;
- `alt` → description textuelle ;
- `width` → largeur ;
- `height` → hauteur.

On peut également écrire le même code sur une seule ligne :
```html
<img src="images/logo.png" alt="Logo de mon entreprise" width="200" height="80">
```

L'indentation sur plusieurs lignes est simplement une question de lisibilité.

## Les attributs `id` et `class`

Deux attributs sont particulièrement importants : `id` et `class`.

### L'attribut `id`

L'attribut `id` permet d'identifier un élément de manière unique dans une page.
```html
<h1 id="titre-principal">
    Bienvenue
</h1>
```

Dans cet exemple, l'élément possède l'identifiant `titre-principal`.

Un même `id` ne doit normalement pas être utilisé pour identifier plusieurs éléments sur une même page.

### L'attribut `class`

L'attribut `class` permet d'associer un ou plusieurs éléments à une même classe.
```html
<p class="important">
    Premier paragraphe.
</p>

<p class="important">
    Deuxième paragraphe.
</p>
```

Les deux paragraphes appartiennent ici à la classe `important`.

Un élément peut également avoir plusieurs classes, séparées par des espaces :
```html
<p class="important introduction">
    Bienvenue sur notre site.
</p>
```

Cette notion sera particulièrement importante lorsque nous commencerons à utiliser CSS.

## Les attributs booléens

Certains attributs HTML fonctionnent différemment des attributs classiques.

Ils sont appelés **attributs booléens**.

Par exemple :
```html
<input type="text" disabled>
```

La présence de `disabled` indique que le champ est désactivé.

On peut également rencontrer :
```html
<input type="checkbox" checked>
```

Ici, `checked` indique que la case est cochée.

Pour ces attributs, la présence de l'attribut suffit généralement à indiquer qu'il est activé.

## Les commentaires HTML

HTML permet également d'ajouter des commentaires dans le code.

La syntaxe est :
```html
<!-- Ceci est un commentaire -->
```

Un commentaire n'est pas affiché comme contenu normal dans la page.

Il peut être utilisé pour :
- expliquer une partie du code ;
- organiser un document ;
- laisser une indication aux développeurs ;
- désactiver temporairement une partie du code pendant un test.

Exemple :
```html
<!-- Navigation principale -->
<nav>
    <a href="index.html">Accueil</a>
    <a href="contact.html">Contact</a>
</nav>
```

Les commentaires ne doivent cependant pas être utilisés pour remplacer une organisation claire du code.

## La casse en HTML

Les noms des éléments HTML sont généralement écrits en minuscules :
```html
<h1>Titre</h1>
<p>Paragraphe</p>
<img src="image.jpg" alt="Image">
```

Même si HTML tolère certaines variations de casse, il est recommandé d'utiliser systématiquement les minuscules.

Cette convention permet d'obtenir un code plus cohérent et plus facile à lire.

## Les espaces et les retours à la ligne

HTML ignore généralement plusieurs espaces consécutifs dans le contenu textuel.

Par exemple :
```html
<p>Bonjour     tout     le monde.</p>
```

sera généralement affiché comme :
```
Bonjour tout le monde.
```

De même :
```html
<p>
    Bonjour
    tout
    le monde.
</p>
```

ne permet pas de contrôler précisément les espaces affichés.

La mise en forme visuelle du texte sera principalement gérée avec **CSS**.

Si l'on souhaite créer une structure ou un espacement particulier, il faut utiliser les éléments HTML appropriés et, lorsque cela concerne la présentation, CSS.

## Les caractères spéciaux et les entités HTML

Certains caractères possèdent une signification particulière en HTML.

Par exemple, les caractères `<` et `>` sont utilisés pour écrire les balises.

Si l'on souhaite afficher littéralement certains caractères réservés, HTML fournit des **entités**.

Par exemple :
```html
&lt;
```
permet d'afficher :
```
<
```
et :
```html
&gt;
```
permet d'afficher :
```
>
```
On peut également écrire :
```html
&amp;
```
pour afficher :
```
&
```

Quelques entités courantes :

| Entité | Affichage |
|---|---|
| `&lt;` | `<` |
| `&gt;` | `>` |
| `&amp;` | `&` |
| `&quot;` | `"` |
| `&nbsp;` | espace insécable |

Dans un document HTML moderne encodé en UTF-8, les caractères accentués comme `é`, `è`, `à` ou `ç` peuvent généralement être écrits directement.

## Exemple complet

Voici un exemple permettant de réunir les différentes notions étudiées :
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Ma page HTML</title>
</head>

<body>

    <header id="entete">
        <h1>Mon site web</h1>
    </header>

    <main class="contenu-principal">

        <p class="introduction">
            Bienvenue sur mon site.
        </p>

        <p>
            Découvrez
            <strong>le développement web</strong>.
        </p>

        <img
            src="images/dev-web.jpg"
            alt="Illustration du développement web"
        >

        <p>
            <a href="contact.html">
                Nous contacter
            </a>
        </p>

    </main>

</body>

</html>
```

Dans cet exemple, nous retrouvons :
- des **balises** : `<p>`, `<h1>`, `<img>`, `<a>` ;
- des **éléments** : les paragraphes, le titre, l'image et le lien ;
- des **attributs** : `id`, `class`, `src`, `alt`, `href` ;
- des éléments **imbriqués** ;
- des éléments sans contenu comme `<img>` ;
- une structure HTML organisée et lisible.

## Une méthode simple pour lire du HTML

Face à un élément HTML, il est utile de se poser trois questions :

**1. Quelle est la balise ?**

Exemple :
```
<a>
```
Il s'agit d'un élément permettant de créer un lien.

**2. Quel est son contenu ?**

Dans :
```html
<a href="contact.html">Contact</a>
```
le contenu est :
```
Contact
```

**3. Quels sont ses attributs ?**

Ici :
```
href="contact.html"
```
indique la destination du lien.

On peut donc analyser l'élément ainsi :
```
<a href="contact.html">Contact</a>
│  │                 │
│  │                 └── contenu
│  └──────────────────── attribut
└─────────────────────── balise
```

Cette méthode devient rapidement un réflexe lorsqu'on lit du code HTML.

## Les erreurs courantes à éviter

Lors de l'apprentissage d'HTML, certaines erreurs sont particulièrement fréquentes :
- **oublier de fermer une balise** : écrire `<p>Bonjour` au lieu de `<p>Bonjour</p>` ;
- **mal imbriquer les éléments** : écrire `<p><strong>Texte</p></strong>` au lieu de `<p><strong>Texte</strong></p>` ;
- **oublier les guillemets** autour des valeurs d'attributs ;
- **placer un attribut en dehors de la balise** : écrire `<p>Bonjour</p> class="texte"` au lieu de `<p class="texte">Bonjour</p>` ;
- **choisir une balise pour son apparence** : un titre doit être un `<h2>`, et non un paragraphe auquel on chercherait ensuite à donner l'apparence d'un titre. La présentation relève de **CSS**, tandis que HTML décrit la nature du contenu.

## À retenir

La syntaxe HTML repose principalement sur trois notions :
```
BALISE
   ↓
<nom>

ÉLÉMENT
   ↓
<nom>contenu</nom>

ATTRIBUT
   ↓
nom="valeur"
```

Les règles essentielles à retenir :
- une balise peut être ouvrante et fermante ;
- certains éléments sont vides ;
- les éléments peuvent être imbriqués ;
- les éléments doivent être correctement fermés ;
- les attributs sont placés dans la balise ouvrante ;
- un attribut possède généralement un nom et une valeur ;
- `id` identifie un élément de manière unique ;
- `class` permet de regrouper des éléments ;
- les commentaires utilisent `<!-- ... -->`.

## Lien utiles

**Documentations** :
- https://developer.mozilla.org/fr/docs/Web/HTML

**Validateur** :
- https://validator.w3.org/

## À vous

Il est temps pour un peu de pratique. Allez dans le dossier [exercices](exercices/01-lire.md) et faites les exercices 01 à 04 dans l'ordre (le lien vous amène sur le premier exercice)


---

© Vincent Chiofalo