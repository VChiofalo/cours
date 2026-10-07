# Les liens et la navigation

Le lien hypertexte est l'élément qui fait du Web un **réseau** de pages reliées entre elles. Nous avons déjà créé quelques liens simples avec `<a href="...">`. Ce chapitre va plus loin et répond à trois questions :
- **où** pointe un lien, et comment écrire correctement son adresse (URL, chemins relatifs) ?
- comment **atteindre une zone précise** ou déclencher une action particulière (ancres, e-mail, téléchargement) ?
- comment **guider l'utilisateur** dans l'ensemble d'un site (navigation) ?

## Anatomie d'un lien

Un lien est composé de trois parties :
```html
<a href="contact.html">Nous contacter</a>
│  │                  │
│  │                  └── le contenu cliquable
│  └───────────────────── l'attribut href : la destination
└──────────────────────── la balise <a>
```

Le contenu cliquable peut être du **texte**, une **image**, ou les deux :
```html
<a href="index.html">
    <img src="images/logo.png" alt="Retour à l'accueil du club">
</a>
```

Lorsqu'une image est cliquable, son attribut `alt` doit décrire la **destination** du lien et non l'image elle-même.

## Anatomie d'une URL

Une adresse web (**URL**) se décompose en plusieurs parties :
```
https://www.example.com/ateliers/html.html?niveau=debutant#exercices
└─┬──┘   └──────┬──────┘└────────┬────────┘└──────┬───────┘└───┬────┘
protocole  nom de domaine     chemin          paramètres     ancre
```

- le **protocole** : la façon de communiquer (`https` pour une connexion sécurisée) ;
- le **nom de domaine** : le serveur qui héberge le site ;
- le **chemin** : l'emplacement de la page sur ce serveur ;
- les **paramètres** : des informations transmises à la page, introduites par `?` (nous les avons déjà rencontrés avec les formulaires en `get`) ;
- l'**ancre** : une zone précise de la page, introduite par `#`.

## Adresses absolues et adresses relatives

On peut écrire la destination d'un lien de deux manières.

### L'adresse absolue

L'adresse **absolue** donne l'URL complète, protocole compris. Elle est nécessaire pour pointer vers un **autre site** :
```html
<a href="https://developer.mozilla.org/fr/">Documentation MDN</a>
```

### L'adresse relative

L'adresse **relative** indique l'emplacement de la cible **par rapport à la page actuelle**. Elle est utilisée pour les liens entre les pages d'un **même site** :
```html
<a href="contact.html">Contact</a>
```

Une adresse relative reste valable si le site est déplacé (d'un dossier à un autre, ou de l'ordinateur vers un serveur). C'est pourquoi on la préfère pour les liens internes.

## Organiser les fichiers d'un site

Dès qu'un site compte plusieurs pages et plusieurs images, on les range dans des **dossiers** :
```
mon-site/
├── index.html
├── contact.html
├── ateliers/
│   ├── index.html
│   ├── html.html
│   └── css.html
├── images/
│   └── logo.png
└── documents/
    └── programme.pdf
```

Quelques conventions à respecter :
- la page d'accueil de chaque dossier s'appelle **`index.html`** : c'est le fichier que le serveur affiche lorsque l'on demande simplement le dossier (`ateliers/` affiche `ateliers/index.html`) ;
- les noms de fichiers sont en **minuscules**, sans **espaces**, sans **accents** ni caractères spéciaux ; on sépare les mots avec des tirets (`mon-premier-atelier.html`) ;
- l'**extension** est toujours écrite (`.html`, `.png`, `.pdf`).

⚠️ **Attention à la casse** : sur la plupart des serveurs, `Logo.png` et `logo.png` sont deux fichiers différents. Un lien qui fonctionne sur votre ordinateur peut donc se casser une fois le site mis en ligne si les majuscules ne sont pas respectées.

## Écrire un chemin relatif

Le chemin se construit en partant de **l'emplacement de la page qui contient le lien**.

| Écriture | Signification |
|---|---|
| `page.html` | un fichier situé dans le **même dossier** |
| `dossier/page.html` | un fichier situé dans un **sous-dossier** |
| `../page.html` | un fichier situé dans le **dossier parent** |
| `../../page.html` | un fichier situé **deux dossiers plus haut** |

Le symbole `../` signifie « remonter d'un dossier ».

### Exemple

Reprenons l'arborescence précédente. Voici les chemins à écrire **depuis la page `ateliers/index.html`** :

| Cible | Chemin à écrire |
|---|---|
| `ateliers/html.html` (même dossier) | `html.html` |
| `index.html` (racine) | `../index.html` |
| `contact.html` (racine) | `../contact.html` |
| `images/logo.png` | `../images/logo.png` |
| `documents/programme.pdf` | `../documents/programme.pdf` |

Et voici les chemins à écrire **depuis la page `index.html`** située à la racine :

| Cible | Chemin à écrire |
|---|---|
| `contact.html` | `contact.html` |
| `ateliers/html.html` | `ateliers/html.html` |
| `images/logo.png` | `images/logo.png` |

Les mêmes règles s'appliquent à l'attribut `src` des images et, plus tard, aux liens vers les feuilles de style CSS.

### Une méthode simple pour construire un chemin

**1. Où suis-je ?** On identifie le dossier de la page qui contient le lien.

**2. Où est la cible ?** On identifie son dossier et son nom de fichier.

**3. Comment aller de l'un à l'autre ?** On remonte avec `../` jusqu'à un dossier commun aux deux, puis on redescend vers la cible.

### Un chemin à éviter pour l'instant

On rencontre aussi des chemins commençant par `/`, par exemple `/images/logo.png`. Ils partent de la **racine du site** et ne fonctionnent que sur un serveur. Ils ne conviennent donc pas à des pages ouvertes directement depuis un dossier de l'ordinateur : nous utiliserons les chemins relatifs.

## Ouvrir un lien dans un nouvel onglet

Par défaut, un lien s'ouvre dans l'onglet actuel. L'attribut `target="_blank"` demande l'ouverture dans un **nouvel onglet** :
```html
<a href="https://developer.mozilla.org/fr/" target="_blank" rel="noopener noreferrer">
    Documentation MDN (nouvel onglet)
</a>
```

Il est recommandé d'accompagner `target="_blank"` de **`rel="noopener noreferrer"`**. Cette précaution empêche la page ouverte d'accéder à la page d'origine et de lui transmettre des informations sur sa provenance. Les navigateurs récents appliquent déjà une partie de cette protection par défaut, mais l'écrire reste une bonne pratique.

À utiliser avec modération :
- on ne force pas l'ouverture dans un nouvel onglet pour les liens internes ;
- lorsqu'on le fait, on le **signale** dans le texte du lien, pour ne pas surprendre l'utilisateur (notamment avec un lecteur d'écran).

## Les liens d'ancre : atteindre une zone précise

Un lien d'ancre mène à un **endroit précis d'une page**, par exemple une section d'un long document. Il se construit en deux temps :

**1. On place un `id` unique sur l'élément cible**
```html
<h2 id="inscription">Inscription</h2>
```

**2. On crée un lien dont l'`href` commence par `#`, suivi de cet `id`**
```html
<a href="#inscription">Aller à l'inscription</a>
```

Le `#` signifie « sur cette même page ». Pour pointer vers une zone d'**une autre page**, on ajoute l'ancre à la fin de l'adresse :
```html
<a href="ateliers/html.html#exercices">Voir les exercices de l'atelier HTML</a>
```

Cette technique permet de réaliser :
- un **sommaire** en début de page ;
- un lien « **Retour en haut** » en fin de page ;
- un lien vers une **section précise** d'une autre page.

L'`id` utilisé doit être **unique** dans la page, et il tient compte de la casse : `#Inscription` ne mène pas à `id="inscription"`.

## Les liens qui déclenchent une action

L'attribut `href` ne sert pas uniquement à désigner une page web : il peut aussi lancer une application ou un téléchargement.

### Envoyer un e-mail : `mailto:`
```html
<a href="mailto:club@example.com">Écrire au club</a>
```

On peut préremplir l'objet du message avec `?subject=` ; les espaces s'écrivent alors `%20` :
```html
<a href="mailto:club@example.com?subject=Question%20sur%20les%20ateliers">
    Poser une question
</a>
```

### Appeler un numéro : `tel:`
```html
<a href="tel:+33100000000">Appeler le club</a>
```

Le numéro est écrit au format international, sans espace. Sur smartphone, un clic lance l'appel.

### Proposer un fichier : lien vers un document

Un lien peut pointer vers un fichier (PDF, image, archive...). Par défaut, le navigateur affiche le fichier s'il sait le faire. L'attribut booléen `download` demande au contraire de le **télécharger** :
```html
<a href="documents/programme.pdf" download>Télécharger le programme (PDF, 250 Ko)</a>
```

Quand on propose un fichier, on indique dans le texte du lien son **format** et son **poids** : l'utilisateur sait ainsi ce qu'il va obtenir.

## Écrire de bons textes de lien

Le texte d'un lien doit être **compréhensible seul**. Les utilisateurs de lecteurs d'écran parcourent souvent la liste des liens d'une page, hors de leur contexte.

| À éviter | À préférer |
|---|---|
| `<a href="...">Cliquez ici</a> pour voir le programme` | `Consultez <a href="...">le programme des ateliers</a>` |
| `<a href="...">Lire la suite</a>` | `<a href="...">Lire la suite de l'article sur les ateliers</a>` |
| `<a href="...">https://www.example.com/page-tres-longue</a>` | `<a href="...">le site du club</a>` |

Quelques autres principes :
- un lien doit être **reconnaissable** comme tel : on évitera, avec CSS, de supprimer toute différence visuelle avec le texte ordinaire ;
- deux liens qui mènent à des destinations différentes n'ont pas le même texte ;
- les liens sont accessibles **au clavier** (touche `Tab` pour avancer, `Entrée` pour suivre le lien) : il faut donc vérifier que l'on voit toujours quel lien est sélectionné ;
- l'attribut `title` ne doit pas être le seul moyen de comprendre un lien.

Un lien possède plusieurs **états** (non visité, visité, survolé, sélectionné au clavier) que CSS permettra de personnaliser.

## La navigation d'un site

La **navigation** est l'ensemble des moyens qui permettent à l'utilisateur de se repérer et de circuler dans un site. Elle repose sur trois principes :
- elle est **cohérente** : le menu principal se trouve au même endroit et reste identique sur toutes les pages ;
- elle est **lisible** : les intitulés sont courts et explicites ;
- elle indique **où l'on se trouve**.

Nous avons vu qu'un menu s'écrit avec `<nav>`, `<ul>`, `<li>` et `<a>`. Voici comment l'enrichir.

### Indiquer la page courante

L'attribut `aria-current="page"` signale, dans le menu, le lien qui correspond à la page affichée :
```html
<nav aria-label="Navigation principale">
    <ul>
        <li><a href="index.html">Accueil</a></li>
        <li><a href="ateliers/index.html" aria-current="page">Ateliers</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

Les attributs `aria-*` complètent HTML pour améliorer l'**accessibilité**. Nous n'en utilisons ici que deux :
- `aria-current` : indique l'élément courant d'un ensemble ;
- `aria-label` : donne un **nom** à un élément, annoncé par les lecteurs d'écran.

Dès qu'une page contient **plusieurs `<nav>`**, on les distingue par un `aria-label` (« Navigation principale », « Fil d'Ariane »...).

### Le fil d'Ariane

Le **fil d'Ariane** montre le chemin parcouru depuis l'accueil jusqu'à la page actuelle. C'est une liste ordonnée de liens :
```html
<nav aria-label="Fil d'Ariane">
    <ol>
        <li><a href="../index.html">Accueil</a></li>
        <li><a href="index.html">Ateliers</a></li>
        <li aria-current="page">Atelier HTML</li>
    </ol>
</nav>
```

Le dernier élément, qui correspond à la page affichée, n'est pas un lien.

### Le lien d'évitement

Les utilisateurs de clavier ou de lecteur d'écran doivent parcourir tout le menu avant d'arriver au contenu, et ce à chaque page. Un **lien d'évitement** placé tout en haut de la page leur permet de sauter directement au contenu principal :
```html
<body>
    <a href="#contenu">Aller au contenu principal</a>

    <header>
        <!-- logo et menu -->
    </header>

    <main id="contenu">
        <!-- contenu de la page -->
    </main>
</body>
```

C'est un simple lien d'ancre. Avec CSS, on le masque généralement tant qu'il n'est pas sélectionné au clavier.

## Exemple complet

Voici la page `ateliers/index.html` du site présenté plus haut. Elle réunit chemins relatifs, ancres, liens externes, téléchargement et navigation.
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Les ateliers — Club informatique</title>
</head>

<body>

    <!-- Lien d'évitement -->
    <a href="#contenu">Aller au contenu principal</a>

    <!-- En-tête et navigation principale -->
    <header id="haut">
        <a href="../index.html">
            <img src="../images/logo.png" alt="Accueil du club informatique" width="80">
        </a>

        <nav aria-label="Navigation principale">
            <ul>
                <li><a href="../index.html">Accueil</a></li>
                <li><a href="index.html" aria-current="page">Ateliers</a></li>
                <li><a href="../contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main id="contenu">

        <!-- Fil d'Ariane -->
        <nav aria-label="Fil d'Ariane">
            <ol>
                <li><a href="../index.html">Accueil</a></li>
                <li aria-current="page">Ateliers</li>
            </ol>
        </nav>

        <h1>Les ateliers du club</h1>

        <p>
            <a href="#inscription">Aller directement à l'inscription</a>
        </p>

        <!-- Liens vers les pages du même dossier -->
        <ul>
            <li><a href="html.html">Atelier HTML</a></li>
            <li><a href="css.html">Atelier CSS</a></li>
        </ul>

        <!-- Téléchargement et lien externe -->
        <p>
            Téléchargez le
            <a href="../documents/programme.pdf" download>programme complet (PDF, 250 Ko)</a>
            ou consultez la
            <a href="https://developer.mozilla.org/fr/" target="_blank" rel="noopener noreferrer">
                documentation MDN (nouvel onglet)</a>.
        </p>

        <!-- Section ciblée par une ancre -->
        <h2 id="inscription">Inscription</h2>

        <p>
            Pour vous inscrire, rendez-vous sur le
            <a href="../contact.html#formulaire">formulaire de la page Contact</a>.
        </p>

        <p><a href="#haut">Retour en haut de la page</a></p>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            <a href="mailto:club@example.com">club@example.com</a> —
            <a href="tel:+33100000000">Appeler le club</a>
        </p>
    </footer>

</body>

</html>
```

Dans cet exemple, nous retrouvons :
- des **chemins relatifs** qui remontent (`../`) ou restent dans le dossier (`html.html`) ;
- une **adresse absolue** avec `target="_blank"` et `rel="noopener noreferrer"` ;
- des **ancres** : `#inscription`, `#haut`, `#contenu` et `../contact.html#formulaire` ;
- un lien de **téléchargement**, un lien `mailto:` et un lien `tel:` ;
- une **navigation** complète : lien d'évitement, menu avec `aria-current`, fil d'Ariane ;
- une image cliquable dont le `alt` décrit la destination.

## Les erreurs courantes à éviter

- **se tromper de dossier dans un chemin** : oublier `../` ou en mettre un de trop ;
- **oublier l'extension** du fichier (`contact` au lieu de `contact.html`) ;
- **utiliser des espaces, des accents ou des majuscules** dans les noms de fichiers ;
- **écrire une adresse absolue pour un lien interne**, qui ne fonctionnera plus si le site est déplacé ;
- **oublier `https://`** devant l'adresse d'un autre site : le navigateur chercherait alors une page relative à votre site ;
- **créer une ancre vers un `id` inexistant ou dupliqué** ;
- **écrire des textes de lien vagues** (« cliquez ici », « en savoir plus ») ;
- **ouvrir tous les liens dans un nouvel onglet** sans prévenir l'utilisateur ;
- **laisser une page sans issue**, sans aucun lien de navigation pour en sortir.

Pour détecter les liens cassés, il suffit de **cliquer sur chaque lien** de chaque page après chaque modification.

## À retenir

Les liens relient les pages entre elles ; la navigation aide l'utilisateur à s'y repérer.

```
<a href="destination">contenu cliquable</a>

destination :
   https://www.example.com/page.html     → adresse absolue (autre site)
   page.html                             → même dossier
   dossier/page.html                     → sous-dossier
   ../page.html                          → dossier parent
   page.html#id  ou  #id                 → ancre (zone précise)
   mailto:adresse   tel:numero           → actions
```

Les règles essentielles :
- on utilise des **adresses relatives** pour les liens internes et des **adresses absolues** (avec `https://`) pour les autres sites ;
- `../` remonte d'un dossier ; la page d'accueil d'un dossier s'appelle `index.html` ;
- les noms de fichiers sont en minuscules, sans espace ni accent ;
- un lien d'ancre associe un `id` **unique** sur la cible à un `href="#id"` ;
- `target="_blank"` s'accompagne de `rel="noopener noreferrer"` et s'utilise avec modération ;
- `download` propose le téléchargement d'un fichier, dont on indique le format et le poids ;
- le texte d'un lien doit se comprendre **hors contexte** ;
- une navigation est **cohérente**, indique la page courante (`aria-current="page"`) et s'écrit dans un `<nav>`, nommé par `aria-label` lorsqu'il y en a plusieurs ;
- un lien d'évitement permet aux utilisateurs de clavier d'aller directement au contenu principal.

## À vous

Il est temps pour un peu de pratique. Allez dans le dossier [exercices](exercices/05-lire.md) et faites les exercices 05 à 11 dans l'ordre (le lien vous amène sur le premier exercice).

---

© Vincent Chiofalo