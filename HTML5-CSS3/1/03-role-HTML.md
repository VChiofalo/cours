# Comprendre le rôle d'HTML dans la création d'une structure de page web

**HTML** (**HyperText Markup Language**) est le langage utilisé pour structurer le contenu d'une page web. Il constitue l'une des technologies fondamentales du développement web et sert de base à toutes les pages accessibles depuis un navigateur.

HTML permet d'indiquer au navigateur **ce qu'est chaque élément d'une page** : un titre, un paragraphe, une image, un lien, une liste, un formulaire, une section, un pied de page, etc.

Contrairement à un langage de programmation, HTML ne sert pas principalement à effectuer des calculs ou à définir des algorithmes. Il s'agit d'un **langage de balisage**, dont le rôle est de décrire la structure et la signification du contenu.

On peut résumer simplement : **HTML structure le contenu, CSS le met en forme et JavaScript le rend interactif.**

## Qu'est-ce que HTML ?

HTML signifie **HyperText Markup Language**, que l'on peut traduire par langage de balisage hypertexte.

Il permet de créer la structure d'un document web à l'aide de balises.

Par exemple :
```html
<h1>Bienvenue sur mon site</h1>

<p>Ceci est mon premier paragraphe.</p>
```

Dans cet exemple :
- ```<h1>``` indique qu'il s'agit d'un titre principal ;

- ```<p>``` indique qu'il s'agit d'un paragraphe.

Les balises permettent donc au navigateur de comprendre la nature des différents contenus présents dans la page. Les notions de balise, d'élément et d'attribut sont détaillées dans le chapitre suivant.

## HTML : le squelette d'une page web

Pour comprendre le rôle d'HTML, on peut comparer une page web à un bâtiment.
- **HTML** représente la structure du bâtiment ;
- **CSS** représente la décoration, les couleurs et l'aménagement ;
- **JavaScript** représente les mécanismes permettant au bâtiment de réagir aux actions des utilisateurs.

Sans HTML, il n'existe pas de structure permettant d'organiser correctement le contenu de la page.

Une page web peut ainsi être représentée de manière simplifiée :
```
Page web
│
├── En-tête
│   ├── Logo
│   └── Navigation
│
├── Contenu principal
│   ├── Titre
│   ├── Texte
│   ├── Image
│   └── Articles
│
└── Pied de page
    └── Informations complémentaires
```

HTML permet de représenter cette organisation.

## La structure minimale d'une page HTML5

```html
<!DOCTYPE html>

<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Ma première page web</title>
</head>

<body>

    <h1>Bienvenue sur mon site</h1>

    <p>
        Voici ma première page HTML5.
    </p>

</body>

</html>
```

Cette structure peut sembler complexe au début, mais chaque partie possède un rôle précis.

### Le ```DOCTYPE```

La première ligne est :
```html
<!DOCTYPE html>
```
Elle indique au navigateur que le document utilise la norme **HTML5**.

Le ```DOCTYPE``` n'est pas une balise HTML classique. Il s'agit d'une déclaration qui permet notamment au navigateur d'interpréter correctement le document.

### L'élément ```<html>```

L'élément ```<html>``` constitue la racine du document HTML.

```html
<html lang="fr">
```

L'attribut ```lang``` indique la langue principale du document (ici, le français). Cette information est notamment utile pour les **technologies d'assistance** et certains moteurs de recherche.

### La partie ```<head>```

L'élément ```<head>``` contient des informations concernant le document qui ne sont généralement pas affichées directement dans le contenu de la page.

On peut notamment y trouver :
- le titre de la page, visible dans l'onglet du navigateur (```<title>```) ;
- les informations de métadonnées ;
- les liens vers les feuilles de style CSS ;
- certaines informations destinées aux moteurs de recherche ;
- des ressources externes.

### La partie ```<body>```

L'élément ```<body>``` contient le contenu visible de la page.

On y trouve notamment :
- les titres ;
- les paragraphes ;
- les images ;
- les liens ;
- les listes ;
- les tableaux ;
- les formulaires ;
- les vidéos ;
- les différentes sections de la page.

C'est principalement dans cette partie que nous allons construire la structure de nos pages.

#### Les titres et les paragraphes

HTML fournit plusieurs niveaux de titres, de ```<h1>``` à ```<h6>```.
```html
<h1>Titre principal</h1>

<h2>Sous-titre</h2>

<h3>Sous-section</h3>

<h4>Sous-section</h4>
```

Le niveau d'un titre doit correspondre à la **hiérarchie du contenu**.
Par exemple :
```html
<h1>Développement web</h1>

<h2>HTML</h2>

<h3>Les balises</h3>

<h3>Les attributs</h3>

<h2>CSS</h2>

<h3>Les sélecteurs</h3>
```

Cette structure permet de représenter clairement l'organisation du document.

Les paragraphes sont quant à eux définis avec la balise ```<p>``` :
```html
<p>
    HTML permet de structurer le contenu d'une page web.
</p>
```

#### Les liens hypertextes

L'une des caractéristiques fondamentales du Web est la possibilité de naviguer d'une ressource à une autre.
HTML permet de créer des liens avec la balise ```<a>```.
```html
HTML permet de créer des liens avec la balise <a>.
```

L'attribut ```href``` indique la destination du lien.

Les liens peuvent pointer vers :
- une autre page du même site ;
- une autre partie de la page ;
- un autre site ;
- un document ;
- une adresse e-mail ou d'autres ressources.

Les liens sont à l'origine du terme **HyperText** présent dans le nom HTML.

#### Les images

HTML permet également d'intégrer des images.
```html
<img src="paysage.jpg" alt="Paysage de montagne">
```

L'attribut ```src``` indique la source de l'image.

L'attribut ```alt``` fournit une **alternative textuelle** à l'image.
Cette information est **particulièrement importante** lorsqu'une personne ne peut pas voir l'image, notamment lorsqu'elle utilise un lecteur d'écran.
L'attribut ```alt``` ne doit donc pas être considéré comme une simple option : il participe à la création de contenus accessibles.

### Les balises sémantiques HTML5

HTML5 a introduit ou renforcé l'utilisation de nombreuses balises permettant de donner une **signification** aux différentes parties d'une page.

Parmi les principales balises sémantiques :
- ```<header>``` : en-tête d'une page ou d'une section ;
- ```<nav>``` : zone de navigation ;
- ```<main>``` : contenu principal ;
- ```<section>``` : section thématique ;
- ```<article>``` : contenu autonome ;
- ```<aside>``` : contenu complémentaire ;
- ```<footer>``` : pied de page ou de section.

Par exemple :
```html
<body>

    <header>
        <h1>Mon site</h1>
    </header>

    <nav>
        <a href="#">Accueil</a>
        <a href="#">À propos</a>
        <a href="#">Contact</a>
    </nav>

    <main>

        <section>
            <h2>Présentation</h2>

            <p>
                Bienvenue sur notre site.
            </p>
        </section>

    </main>

    <footer>
        <p>© 2026 Mon site</p>
    </footer>

</body>
```
Cette approche est appelée **HTML sémantique**.

L'objectif est de choisir les éléments HTML en fonction de leur **signification**, plutôt que simplement en fonction de leur apparence.

#### Pourquoi utiliser du HTML sémantique ?

Le HTML sémantique présente plusieurs avantages.

- ♿ **Accessibilité** : les technologies d'assistance peuvent mieux comprendre la structure d'une page.
- 🔎 **Référencement** : une structure HTML claire peut faciliter la compréhension du contenu par les moteurs de recherche.
- 🧑‍💻 **Maintenance** : un code utilisant des balises adaptées est généralement plus facile à comprendre et à maintenir.
- 🌍 Standardisation: l'utilisation correcte des éléments HTML facilite la compréhension du document par les navigateurs et les différents outils utilisés sur le Web.

## HTML et CSS : deux rôles différents

Il est important de ne pas confondre la structure HTML avec la présentation CSS (que l'on verra plus tard).

Par exemple :
```html
<h1>Bienvenue sur mon site</h1>
```
HTML indique :

*«Ceci est un titre principal.»*

CSS peut ensuite indiquer :
```CSS
h1 {
    color: blue;
    font-size: 40px;
}
```
CSS indique alors :

*«Voici comment ce titre doit être présenté visuellement.»*

Cette séparation entre **structure** et **présentation** est une notion fondamentale du développement web. JavaScript vient compléter l'ensemble en gérant le comportement de la page :
- **HTML** → Que contient la page ?
- **CSS** → Comment la page doit-elle être présentée ?
- **JavaScript** → Comment la page doit-elle réagir ?

## À retenir

HTML est le **langage de structure du Web**.

Il permet :
- de structurer le contenu d'une page ;
- de définir une hiérarchie entre les différents éléments ;
- de créer des titres et des paragraphes ;
- d'intégrer des images et des médias ;
- de créer des liens ;
- de construire des formulaires ;
- d'organiser les différentes parties d'une page ;
- de donner du sens au contenu grâce aux éléments sémantiques.

La **structure minimale** d'une page HTML5 repose notamment sur :
```html
<!DOCTYPE html>
    ↓
<html>
    ├── <head>
    │     ├── <meta>
    │     └── <title>
    │
    └── <body>
          └── Contenu de la page
```

**Les bonnes habitudes à adopter** dès les premiers exercices :
- choisir les balises en fonction de leur rôle et de leur signification ;
- respecter la hiérarchie des titres (```<h1>```, ```<h2>```, ```<h3>```, etc.) ;
- indiquer la langue du document avec ```<html lang="fr">``` ;
- ajouter un texte alternatif aux images pertinentes ;
- indenter clairement le code ;
- séparer HTML (structure) et CSS (présentation).

Dans le prochain chapitre, nous pourrons entrer dans la pratique en étudiant **la syntaxe HTML5, les balises, les attributs et la création d'une première page web**.
---
Une page HTML5 possède une structure de base que l'on retrouvera dans la plupart des projets.

## Le principe des balises HTML

Une balise HTML est généralement composée d'une **balise ouvrante** et d'une **balise fermante**.

Exemple :
```html
<p>Bonjour et bienvenue !</p>
```

On retrouve :
- ```<p>``` : balise ouvrante ;
- ```Bonjour et bienvenue !``` : contenu ;
- ```</p>``` : balise fermante.

L'ensemble constitue un **élément HTML**.

```
<p>Bonjour et bienvenue !</p>
│ │                     │
│ └── contenu           │
│                       │
└── balise ouvrante     └── balise fermante
```


Certaines balises ne nécessitent pas de balise fermante.

Par exemple :
```html
<img src="photo.jpg" alt="Une photo">
```

La balise ```<img>``` permet d'insérer une image dans une page.

### Les attributs HTML

Les balises HTML peuvent également contenir des **attributs**.

Les attributs permettent de fournir des informations supplémentaires à un élément.

Exemple :
```html
<a href="https://www.example.com">
    Visiter le site
</a>
```

Ici :

- ```<a>``` définit un lien ;
- ```href``` est un attribut ;
- la valeur de ```href``` indique la destination du lien.

Un autre exemple :
```html
<img src="image.jpg" alt="Photo d'un paysage">
```

La balise ```<img>``` possède ici deux attributs :
- ```src``` indique l'emplacement de l'image ;
- ```alt``` fournit une description textuelle de l'image.

Les attributs sont particulièrement importants pour **l'accessibilité**, le fonctionnement des éléments et la communication d'informations au navigateur.

### HTML et structure hiérarchique

Une page HTML est organisée selon une structure **hiérarchique**.

Les éléments peuvent être placés à l'intérieur d'autres éléments. On parle alors d'**imbrication**.

Exemple :
```html
<body>

    <main>

        <h1>Mon site web</h1>

        <p>
            Bienvenue sur mon site.
        </p>

    </main>

</body>
```

On peut représenter cette structure sous forme d'arbre :
```
body
└── main
    ├── h1
    └── p
```

Cette organisation hiérarchique est fondamentale en HTML.

Elle permet notamment au navigateur, aux moteurs de recherche et aux technologies d'assistance de comprendre la structure du document.

### La structure minimale d'une page HTML5

Une page HTML5 possède une structure de base que l'on retrouvera dans la plupart des projets.
```html
<!DOCTYPE html>

<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Ma première page web</title>
</head>

<body>

    <h1>Bienvenue sur mon site</h1>

    <p>
        Voici ma première page HTML5.
    </p>

</body>

</html>
```

Cette structure peut sembler complexe au début, mais chaque partie possède un rôle précis.

### Le DOCTYPE

La première ligne est :

```html
<!DOCTYPE html>
```

Elle indique au navigateur que le document utilise la norme HTML5.

Le ```DOCTYPE``` n'est pas une balise HTML classique. Il s'agit d'une déclaration qui permet notamment au navigateur d'interpréter correctement le document.

### L'élément ```<html>```

L'élément ```<html>``` constitue la racine du document HTML.
```html
<html lang="fr">
```

L'attribut ```lang``` indique la langue principale du document.

Dans notre exemple :
```html
lang="fr"
```
signifie que le contenu principal de la page est en français.

Cette information est notamment utile pour les **technologies d'assistance** et certains moteurs de recherche.

### La partie ```<head>```

L'élément ```<head>``` contient des informations concernant le document qui ne sont généralement pas affichées directement dans le contenu de la page.

Exemple :
```html
<head>

    <meta charset="UTF-8">

    <title>Mon site web</title>

</head>
```

On peut notamment y trouver :
- le titre de la page ;
- les informations de métadonnées ;
- les liens vers les feuilles de style CSS ;
- certaines informations destinées aux moteurs de recherche ;
- des ressources externes.

Par exemple :
```html
<title>Mon site web</title>
```

définit le titre associé à la page, notamment visible dans l'onglet du navigateur.

### La partie ```<body>```

L'élément ```<body>``` contient le contenu visible de la page.

On y trouve notamment :
- les titres ;
- les paragraphes ;
- les images ;
- les liens ;
- les listes ;
- les tableaux ;
- les formulaires ;
- les vidéos ;
- les différentes sections de la page.

Exemple :
```html
<body>

    <h1>Bienvenue</h1>

    <p>
        Découvrez notre site web.
    </p>

</body>
```
C'est principalement dans cette partie que nous allons construire la structure de nos pages.

### Les titres et les paragraphes

HTML fournit plusieurs niveaux de titres.
```html
<h1>Titre principal</h1>

<h2>Sous-titre</h2>

<h3>Sous-section</h3>

<h4>Sous-section</h4>
```

Le niveau va de ```<h1>``` à ```<h6>```.

Il est important de ne pas choisir les titres uniquement en fonction de leur apparence visuelle. Leur niveau doit correspondre à la **hiérarchie du contenu**.

Par exemple :
```html
<h1>Développement web</h1>

<h2>HTML</h2>

<h3>Les balises</h3>

<h3>Les attributs</h3>

<h2>CSS</h2>

<h3>Les sélecteurs</h3>
```

Cette structure permet de représenter clairement l'organisation du document.

Les paragraphes sont quant à eux définis avec la balise ```<p>``` :
```html
<p>
    HTML permet de structurer le contenu d'une page web.
</p>
```

### Les liens hypertextes

L'une des caractéristiques fondamentales du Web est la possibilité de naviguer d'une ressource à une autre.

HTML permet de créer des liens avec la balise ```<a>```.
```html
<a href="https://www.example.com">
    Visiter le site
</a>
```

L'attribut ```href``` indique la destination du lien.

Les liens peuvent pointer vers :
- une autre page du même site ;
- une autre partie de la page ;
- un autre site ;
- un document ;
- une adresse e-mail ou d'autres ressources.

Les liens sont à l'origine du terme ```HyperText``` présent dans le nom HTML.

### Les images

HTML permet également d'intégrer des images.
```html
<img src="paysage.jpg" alt="Paysage de montagne">
```

L'attribut ```src``` indique la source de l'image.

L'attribut ```alt``` fournit une **alternative textuelle** à l'image.

Cette information est particulièrement importante lorsqu'une personne ne peut pas voir l'image, notamment lorsqu'elle utilise un lecteur d'écran.

L'attribut ```alt``` ne doit donc pas être considéré comme une simple option : il participe à la création de contenus accessibles.

### Les balises sémantiques HTML5

HTML5 a introduit ou renforcé l'utilisation de nombreuses balises permettant de donner une **signification** aux différentes parties d'une page.

Parmi les principales balises sémantiques :
- ```<header>``` : en-tête d'une page ou d'une section ;
- ```<nav>``` : zone de navigation ;
- ```<main>``` : contenu principal ;
- ```<section>``` : section thématique ;
- ```<article>``` : contenu autonome ;
- ```<aside>``` : contenu complémentaire ;
- ```<footer>``` : pied de page ou de section.

Par exemple :
```html
<body>

    <header>
        <h1>Mon site</h1>
    </header>

    <nav>
        <a href="#">Accueil</a>
        <a href="#">À propos</a>
        <a href="#">Contact</a>
    </nav>

    <main>

        <section>
            <h2>Présentation</h2>

            <p>
                Bienvenue sur notre site.
            </p>
        </section>

    </main>

    <footer>
        <p>© 2026 Mon site</p>
    </footer>

</body>
```

Cette approche est appelée **HTML sémantique**.

L'objectif est de choisir les éléments HTML en fonction de leur **signification**, plutôt que simplement en fonction de leur apparence.

### Pourquoi utiliser du HTML sémantique ?

Le HTML sémantique présente plusieurs avantages.

♿ **Accessibilité**

Les technologies d'assistance peuvent mieux comprendre la structure d'une page.

🔎 **Référencement**

Une structure HTML claire peut faciliter la compréhension du contenu par les moteurs de recherche.

🧑‍💻 **Maintenance**

Un code utilisant des balises adaptées est généralement plus facile à comprendre et à maintenir.

🌍 **Standardisation**

L'utilisation correcte des éléments HTML facilite la compréhension du document par les navigateurs et les différents outils utilisés sur le Web.

## HTML et CSS : deux rôles différents

Il est important de ne pas confondre la structure HTML avec la présentation CSS.

Par exemple :
```html
<h1>Bienvenue sur mon site</h1>
```

HTML indique :

« Ceci est un titre principal. »

CSS peut ensuite indiquer :
```css
h1 {
    color: blue;
    font-size: 40px;
}
```

CSS indique alors :

« Voici comment ce titre doit être présenté visuellement. »

Cette séparation entre **structure** et **présentation** est une notion fondamentale du développement web.

### HTML, CSS et JavaScript

Une page web moderne peut être représentée simplement de la manière suivante :
```
HTML
  ↓
Structure et contenu

CSS
  ↓
Présentation et mise en page

JavaScript
  ↓
Comportement et interactivité

        ↓

   PAGE WEB
```

Chaque technologie possède donc un rôle spécifique.
- **HTML** → Que contient la page ?
- **CSS** → Comment la page doit-elle être présentée ?
- **JavaScript** → Comment la page doit-elle réagir ?

Cette séparation constitue l'une des bases du développement Front-End.

## Les bonnes pratiques essentielles en HTML

Dès les premiers exercices, il est important d'adopter de bonnes habitudes.

#### SUtiliser des balises adaptées

Choisir une balise en fonction de son rôle et de sa signification.

#### Respecter la hiérarchie des titres

Utiliser ```<h1>```, ```<h2>```, ```<h3>```, etc. pour représenter correctement la structure du contenu.

#### Indiquer la langue du document
```html
<html lang="fr">
```

#### Ajouter un texte alternatif aux images pertinentes
```html
<img src="logo.png" alt="Logo de l'entreprise">
```

#### Organiser correctement le code

Une indentation claire facilite la lecture et la maintenance.

#### Séparer HTML et CSS

HTML doit principalement s'occuper de la structure tandis que CSS prend en charge la présentation.

## À retenir

HTML est le **langage de structure du Web**.

Il permet :
- de structurer le contenu d'une page ;
- de définir une hiérarchie entre les différents éléments ;
- de créer des titres et des paragraphes ;
- d'intégrer des images et des médias ;
- de créer des liens ;
- de construire des formulaires ;
- d'organiser les différentes parties d'une page ;
- de donner du sens au contenu grâce aux éléments sémantiques.

La structure minimale d'une page HTML5 repose notamment sur :
```
<!DOCTYPE html>
    ↓
<html>
    ├── <head>
    │     ├── <meta>
    │     └── <title>
    │
    └── <body>
          └── Contenu de la page
```

Enfin, il faut retenir une règle fondamentale :

*HTML décrit la structure et le sens du contenu ; CSS s'occupe de sa présentation.*

Dans le prochain chapitre, nous pourrons entrer dans la pratique en étudiant la **syntaxe HTML5**, **les balises**, **les attributs** et **la création d'une première page web**.

---

© Vincent Chiofalo