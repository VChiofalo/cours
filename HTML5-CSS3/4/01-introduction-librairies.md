# Présentation de Bootstrap : objectifs et avantages

Depuis le début de la semaine, nous écrivons **tout notre CSS à la main** : sélecteurs, modèle de boîte, Flexbox, Grid, media queries. C'est la meilleure façon de comprendre comment une page web est construite, et c'est ce qui vous permet de réaliser votre TP « Café Mirabelle » sans aucune aide extérieure.

Dans le monde professionnel, on n'écrit pourtant presque jamais *tout* son CSS de zéro. Beaucoup d'équipes s'appuient sur une **bibliothèque** déjà prête. L'une des plus connues est **Bootstrap**.

Dans ce chapitre, nous verrons :
- ce qu'est une **bibliothèque** (ou un framework) CSS, et à quoi elle sert ;
- **ce qu'est Bootstrap**, d'où il vient, ce qu'il contient ;
- ses **objectifs**, ses **avantages** et ses **limites** ;
- comment l'**ajouter** à une page : CDN, téléchargement, npm ;
- la **page de départ** et le rôle de chaque ligne ;
- les **conteneurs** et les premières **classes utilitaires** ;
- comment **personnaliser** Bootstrap sans le casser ;
- quand l'utiliser, et quand **ne pas** l'utiliser.

La grille (partie B) et les composants (partie C : boutons, formulaires, modales) seront vus dans les chapitres suivants.

## Bibliothèque, framework : de quoi parle-t-on ?

### Le problème qu'on veut résoudre

Presque tous les sites ont besoin des mêmes choses : une barre de navigation, des boutons, des formulaires lisibles, une grille qui s'adapte aux écrans, des tableaux, des messages d'alerte... À chaque nouveau projet, on réécrirait les mêmes dizaines ou centaines de lignes de CSS, avec les mêmes difficultés (compatibilité des navigateurs, accessibilité, responsive).

Une **bibliothèque CSS** (on dit aussi *framework CSS*) est un ensemble de **styles déjà écrits, testés et documentés**, que l'on ajoute à sa page. On n'écrit plus le CSS d'un bouton : on indique dans le HTML que « ceci est un bouton », et la bibliothèque s'occupe de l'apparence.

| Vous écrivez | La bibliothèque fournit |
|---|---|
| Le **HTML** de la page, avec des noms de classes | Le **CSS** correspondant à ces classes |
| Quelques lignes de CSS pour ce qui est propre à votre site | Un comportement responsive, des composants, des couleurs cohérentes |

### Bibliothèque ou framework ?

Les deux mots sont souvent employés l'un pour l'autre. On fait parfois la distinction suivante :
- une **bibliothèque** est un outil que **vous appelez** quand vous en avez besoin ;
- un **framework** impose une **façon de structurer** votre projet.

Bootstrap est présenté comme un **framework front-end**. Dans la pratique, pour un site simple, on l'utilise surtout comme une **boîte à outils de classes CSS**. Dans ce cours, nous emploierons « bibliothèque » et « framework » sans les distinguer.

## Qu'est-ce que Bootstrap ?

**Bootstrap** est une bibliothèque **gratuite et open source** qui regroupe :
- du **CSS** : une base de styles, un système de **grille**, des **classes utilitaires** ;
- des **composants** prêts à l'emploi : boutons, formulaires, cartes, barre de navigation, modales, alertes, fil d'Ariane, etc. ;
- du **JavaScript** pour les composants qui bougent : menu qui se déplie, fenêtre modale, carrousel, infobulle.

### Un peu d'histoire

| Date | Évènement |
|---|---|
| 2011 | Bootstrap est créé chez **Twitter** par deux développeurs, pour harmoniser les outils internes de l'entreprise, puis publié en open source |
| 2013 | Version 3 : devient « **mobile first** » |
| 2018 | Version 4 : passage à **Flexbox** |
| 2021 | **Version 5** : abandon de jQuery et du support des très vieux navigateurs, ajout des classes utilitaires |

Dans ce cours, nous utilisons la **version 5**, qui est la plus répandue aujourd'hui. Le point important : elle n'a **pas besoin de jQuery**, contrairement aux anciennes versions. Si vous lisez de vieux tutoriels qui l'exigent, ils parlent de versions dépassées.

> **Attention aux versions.** Beaucoup de ressources sur Internet concernent Bootstrap 3 ou 4, dont certaines classes ont changé de nom. Vérifiez toujours que la documentation que vous lisez correspond à la version 5 (l'adresse contient `/docs/5.3/`).

### Ce que Bootstrap n'est pas

- Ce n'est **pas un langage** : c'est du HTML, du CSS et du JavaScript ordinaires. Tout ce que nous avons appris reste valable.
- Ce n'est **pas un site tout fait** : il fournit des briques, pas la mise en page de votre site.
- Ce n'est **pas une obligation** : on peut très bien faire un excellent site sans lui.

## Les objectifs de Bootstrap

Bootstrap répond à quatre objectifs principaux.

| Objectif | Ce que cela veut dire |
|---|---|
| **Aller vite** | Obtenir une page présentable en quelques minutes plutôt qu'en plusieurs heures |
| **Être responsive par défaut** | Une approche *mobile first* intégrée : la grille et les composants s'adaptent aux écrans |
| **Rester cohérent** | Les boutons, formulaires, marges et couleurs suivent les mêmes règles sur tout le site, et d'un projet à l'autre |
| **Fonctionner partout** | Les styles sont testés sur les navigateurs courants, ce qui évite de traiter les différences à la main |

À cela s'ajoute un objectif important : fournir des composants **accessibles** (rôles ARIA, navigation au clavier, gestion du focus dans les modales), ce qui est long et difficile à écrire soi-même.

## Les avantages

### Un gain de temps important

Comparons la même chose, un bouton vert, écrit à la main puis avec Bootstrap.

**Sans bibliothèque :**
```css
.bouton {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border: 1px solid #198754;
    border-radius: 0.375rem;
    background-color: #198754;
    color: #ffffff;
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
}
.bouton:hover {
    background-color: #157347;
    border-color: #146c43;
}
.bouton:focus-visible {
    outline: 0.25rem solid rgba(25, 135, 84, 0.5);
}
```
```html
<a class="bouton" href="#reserver">Réserver</a>
```

**Avec Bootstrap :**
```html
<a class="btn btn-success" href="#reserver">Réserver</a>
```

Les états (survol, focus, désactivé) sont déjà gérés. Et ce bouton est identique sur toutes les pages du site.

### Le responsive est déjà pensé

Les points de rupture, les conteneurs, la grille et les composants sont conçus pour s'adapter aux écrans. Vous n'avez pas à les réinventer (le détail de la grille fera l'objet de la partie B).

### Une documentation de qualité et une grande communauté

La documentation officielle (**https://getbootstrap.com/docs/5.3/**) propose, pour chaque composant, un **exemple à copier**, la liste des variantes et des remarques d'accessibilité. Bootstrap est très utilisé : on trouve facilement de l'aide, des exemples et des modèles.

### Une base commune dans une équipe

Quand plusieurs personnes travaillent sur un même site, des classes connues de tous (`btn`, `container`, `mt-3`...) évitent d'avoir à lire un CSS écrit par quelqu'un d'autre pour comprendre une page. Un développeur qui connaît Bootstrap peut reprendre un projet existant plus rapidement.

### Un bon outil pour un prototype

Pour tester une idée, présenter une maquette fonctionnelle ou construire une interface d'administration, Bootstrap permet d'obtenir très vite un résultat propre. C'est aussi pratique pour **vos** projets : un site de back-office en PHP ou en Node, par exemple, n'a pas besoin d'un design unique.

## Les limites et les pièges

Bootstrap a aussi des inconvénients qu'il faut connaître.

| Limite | Explication |
|---|---|
| **Un poids à charger** | Le fichier CSS complet pèse de l'ordre de plusieurs centaines de Ko avant compression, même si vous n'utilisez que quelques composants |
| **Des sites qui se ressemblent** | Sans personnalisation, beaucoup de sites Bootstrap ont le même aspect |
| **HTML chargé de classes** | Un élément peut porter huit classes ou plus, ce qui alourdit la lecture du HTML |
| **Une dépendance** | Une nouvelle version majeure peut renommer des classes et demander de réécrire du code |
| **Un risque : ne pas comprendre le CSS** | Si on empile les classes sans savoir ce qu'elles font, on est bloqué dès qu'un résultat est différent de ce qu'on voulait |

Le dernier point est le plus important pour vous : **Bootstrap n'est utile que si vous comprenez le CSS qu'il génère**. Quand une classe ne donne pas le résultat attendu, c'est votre connaissance du modèle de boîte, de Flexbox, des media queries et de la cascade qui vous permet de comprendre pourquoi. C'est pourquoi nous voyons Bootstrap *après* le CSS.

## Ajouter Bootstrap à une page

Il existe trois façons d'ajouter Bootstrap à un projet.

| Méthode | Principe | Usage |
|---|---|---|
| **CDN** | On relie les fichiers hébergés sur un serveur public | La plus simple : idéale pour apprendre et pour les prototypes |
| **Téléchargement** | On copie les fichiers dans son projet | Quand le site doit fonctionner sans Internet |
| **npm** | `npm install bootstrap` | Projets avec outils de build (et personnalisation avec Sass) |

### Par CDN

Un **CDN** (*Content Delivery Network*) est un réseau de serveurs qui hébergent des fichiers populaires. On relie le fichier par son adresse, comme nous l'avons fait pour les polices Google Fonts.

```html
<!-- Dans le <head> -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr"
      crossorigin="anonymous">

<!-- Juste avant </body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
        crossorigin="anonymous"></script>
```

Les éléments à retenir :
- le CSS se place dans le **`<head>`** ; le JavaScript se place **juste avant `</body>`** ;
- `bootstrap.min.css` est la version **minifiée** (sans espaces ni commentaires, donc plus légère) ;
- `bootstrap.bundle.min.js` contient Bootstrap **et Popper**, une petite bibliothèque nécessaire aux menus déroulants, infobulles et popovers ;
- l'attribut `integrity` est une **empreinte** du fichier : le navigateur refuse de l'utiliser s'il a été modifié. `crossorigin="anonymous"` va avec ;
- le **numéro de version** (`5.3.7`) est dans l'adresse. L'empreinte `integrity` dépend de la version : **si vous changez l'un, il faut changer l'autre**. Le plus sûr est de copier le bloc à jour depuis la page « Introduction » de la documentation.

> **Le JavaScript est facultatif** tant que vous n'utilisez que les styles. Il devient nécessaire pour les composants interactifs (menu qui se déplie sur mobile, modale, carrousel...). Un élément peut donc s'afficher correctement mais ne rien faire au clic si vous oubliez la ligne `<script>`.

### Par téléchargement

On télécharge les fichiers compilés depuis la documentation (page « Download »), puis on les place dans le projet :
```
mon-site/
├── index.html
├── css/
│   ├── bootstrap.min.css
│   └── style.css
└── js/
    └── bootstrap.bundle.min.js
```
```html
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/style.css">
...
<script src="js/bootstrap.bundle.min.js"></script>
```

### Par npm

Dans un projet géré avec Node, on installe Bootstrap comme n'importe quelle dépendance :
```bash
npm install bootstrap
```
Les fichiers se trouvent alors dans `node_modules/bootstrap/dist/`. Cette méthode permet surtout de **personnaliser Bootstrap avec Sass**, en ne gardant que les composants utiles (ce qui allège le CSS). C'est la méthode des projets professionnels ; nous resterons au CDN pour ce cours.

## La page de départ

Voici la page minimale recommandée par la documentation. Elle ressemble à celles que nous écrivons déjà.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ma première page Bootstrap</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr"
          crossorigin="anonymous">
</head>
<body>
    <h1>Bonjour, Bootstrap !</h1>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
            crossorigin="anonymous"></script>
</body>
</html>
```

Trois conditions indispensables pour que Bootstrap fonctionne bien :

| Condition | Pourquoi |
|---|---|
| `<!DOCTYPE html>` | Sans lui, le navigateur passe en « mode quirks » et les styles sont incomplets ou faux |
| `<meta name="viewport" ...>` | Bootstrap est *mobile first* : sans cette balise, le responsive ne s'applique pas sur téléphone |
| `lang="fr"` et `charset="UTF-8"` | Bonnes pratiques d'accessibilité et d'encodage, valables avec ou sans Bootstrap |

Ouvrez cette page : même avec un simple titre, vous voyez que la **police a changé** et que les **marges** ne sont plus celles du navigateur. Bootstrap a déjà agi.

## Ce que Bootstrap change dès l'inclusion : le « Reboot »

Dès que `bootstrap.min.css` est chargé, une première couche de styles, appelée **Reboot**, s'applique à **tous** les éléments, sans aucune classe. Elle sert à uniformiser l'affichage entre navigateurs. Elle fait notamment :

| Changement | Effet |
|---|---|
| `box-sizing: border-box` sur tous les éléments | Les largeurs incluent `padding` et bordures (nous le faisions nous-mêmes) |
| Police du système par défaut | Un texte propre, sans télécharger de police |
| Marges réduites et cohérentes | Les titres et paragraphes ont une marge **en bas** seulement |
| Liens colorés, soulignés | Le style de lien est défini |
| Images, tableaux, formulaires normalisés | Les différences entre navigateurs disparaissent |

C'est un point qui provoque souvent des surprises : si vous ajoutez Bootstrap à une page déjà stylée, **votre page change d'aspect** même sans utiliser la moindre classe Bootstrap.

## Les premières notions : conteneurs et utilitaires

Sans entrer dans la grille (partie B) ni dans les composants (partie C), deux familles de classes se rencontrent dès le début.

### Les conteneurs

Un **conteneur** limite la largeur du contenu, le centre et ajoute un espace sur les côtés. C'est l'équivalent de la classe `.conteneur` que nous écrivions nous-mêmes dans le TP (`max-width`, `margin: 0 auto`, `padding`).

```html
<div class="container">
    <h1>Café Mirabelle</h1>
    <p>Un café, un gâteau, et le temps de souffler.</p>
</div>
```

| Classe | Comportement |
|---|---|
| `.container` | Largeur maximale **fixe**, qui change à chaque point de rupture |
| `.container-fluid` | Toute la largeur de la fenêtre, à tous les écrans |
| `.container-md`, `.container-lg`... | 100 % de large jusqu'à ce point de rupture, puis largeur maximale fixe |

Les points de rupture de Bootstrap sont **en `min-width`** (approche *mobile first*, comme dans notre chapitre sur les media queries) :

| Nom | À partir de | Largeur max. de `.container` |
|---|---|---|
| (aucun) | 0 | 100 % |
| `sm` | 576 px | 540 px |
| `md` | 768 px | 720 px |
| `lg` | 992 px | 960 px |
| `xl` | 1200 px | 1140 px |
| `xxl` | 1400 px | 1320 px |

### Les classes utilitaires

Les **classes utilitaires** font **une seule chose chacune** : une marge, une couleur, un alignement, un affichage. On les combine dans le HTML, directement sur l'élément.

```html
<p class="text-center fw-bold mb-4">Ouvert tous les jours</p>
```

| Classe | Effet CSS équivalent |
|---|---|
| `text-center` | `text-align: center` |
| `fw-bold` | `font-weight: 700` |
| `mb-4` | `margin-bottom: 1.5rem` |

Les familles les plus courantes :

| Famille | Exemples | Rôle |
|---|---|---|
| Espacement | `m-3`, `mt-2`, `px-4`, `py-5`, `mb-0` | Marges (`m`) et espacements internes (`p`) ; `t` haut, `b` bas, `s` début, `e` fin, `x` horizontal, `y` vertical ; valeurs de `0` à `5` |
| Texte | `text-center`, `text-end`, `fw-bold`, `fs-3`, `lead` | Alignement, graisse, taille |
| Couleurs | `text-success`, `bg-light`, `bg-dark text-white` | Couleur du texte et du fond |
| Affichage | `d-none`, `d-block`, `d-flex` | `display` |
| Flexbox | `justify-content-between`, `align-items-center`, `gap-3`, `flex-column` | Les propriétés de Flexbox que nous connaissons |
| Bordures et ombres | `border`, `rounded`, `shadow-sm` | Habillage |
| Images | `img-fluid` | `max-width: 100%; height: auto` |

Beaucoup de ces classes correspondent exactement à des propriétés que vous connaissez. **Lire une classe, c'est lire une déclaration CSS** : `d-flex justify-content-between align-items-center gap-3` signifie « affichage Flexbox, éléments répartis aux extrémités, centrés verticalement, avec un espace de `1rem` ».

La plupart des utilitaires existent en variantes **responsives** : on ajoute le nom du point de rupture. `d-none d-md-block` signifie « caché par défaut, visible à partir de `768px` » :

```html
<!-- Caché sur mobile, visible dès 768 px -->
<p class="d-none d-md-block">Cette phrase n'apparaît que sur grand écran.</p>
```

## Un premier exemple concret

Reprenons le début de notre site du Café Mirabelle. Voici la partie « La carte » écrite avec Bootstrap, sans aucune ligne de CSS personnel.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Café Mirabelle — La carte</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr"
          crossorigin="anonymous">
</head>
<body>
    <header class="bg-dark text-white py-4">
        <div class="container d-flex justify-content-between align-items-center">
            <p class="fs-4 fw-bold mb-0">Café Mirabelle</p>
            <a class="btn btn-warning" href="#reserver">Réserver une table</a>
        </div>
    </header>

    <main class="container py-5">
        <h1 class="mb-3">La carte</h1>
        <p class="lead mb-4">Tout est fait maison, chaque matin.</p>

        <table class="table table-striped">
            <caption>Boissons et gourmandises</caption>
            <thead>
                <tr>
                    <th scope="col">Produit</th>
                    <th scope="col">Catégorie</th>
                    <th scope="col" class="text-end">Prix</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Espresso</td>
                    <td>Boisson</td>
                    <td class="text-end">2,20 €</td>
                </tr>
                <tr>
                    <td>Chocolat chaud</td>
                    <td>Boisson</td>
                    <td class="text-end">3,80 €</td>
                </tr>
                <tr>
                    <td>Tarte à la mirabelle</td>
                    <td>Gourmandise</td>
                    <td class="text-end">4,50 €</td>
                </tr>
            </tbody>
        </table>
    </main>

    <footer class="bg-light py-4">
        <div class="container">
            <p class="mb-0 text-center">© 2026 Café Mirabelle</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
            crossorigin="anonymous"></script>
</body>
</html>
```

### Analyse

| Élément | Classes | Ce que cela fait |
|---|---|---|
| `header` | `bg-dark text-white py-4` | Fond sombre, texte blanc, espace de `1.5rem` en haut et en bas |
| Contenu de l'en-tête | `container d-flex justify-content-between align-items-center` | Contenu centré et limité en largeur, logo à gauche, bouton à droite, alignés verticalement |
| Logo | `fs-4 fw-bold mb-0` | Taille de texte plus grande, en gras, sans marge basse |
| Lien-bouton | `btn btn-warning` | Un bouton jaune, avec états de survol et de focus |
| `main` | `container py-5` | Même largeur limitée, espace de `3rem` en haut et en bas |
| `h1` | `mb-3` | Marge basse de `1rem` |
| Paragraphe | `lead mb-4` | Texte d'introduction un peu plus grand |
| Tableau | `table table-striped` | Tableau propre, lignes alternées |
| Cellule de prix | `text-end` | Alignée à droite |

On remarque que le **HTML reste sémantique** : `header`, `main`, `footer`, `caption`, `th scope="col"`. Bootstrap ne remplace pas ce que vous avez appris, il se **superpose** à une structure déjà correcte.

### Ce que le résultat nous apprend

- Le résultat est propre, mais il ne **ressemble pas** à la maquette du Café Mirabelle : les couleurs, la police et les détails sont ceux de Bootstrap. Pour qu'un site Bootstrap ressemble à une charte précise, il faut le **personnaliser**.
- Le HTML est plus **chargé de classes**, mais on n'a écrit aucun fichier CSS.

## Personnaliser Bootstrap

Il y a trois niveaux de personnalisation, du plus simple au plus avancé.

### 1. Ajouter sa propre feuille de style

On charge sa feuille **après** celle de Bootstrap, pour qu'elle l'emporte à spécificité égale (rappel du cours sur la cascade : à spécificité égale, **la dernière règle gagne**).

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" ...>
<link href="css/style.css" rel="stylesheet">   <!-- après Bootstrap -->
```
```css
/* css/style.css */
h1,
h2 {
    font-family: "Bricolage Grotesque", system-ui, sans-serif;
    color: #1f3d2e;
}
```

Si l'ordre est inversé, Bootstrap écrase vos règles. **C'est la première chose à vérifier** quand votre CSS « ne marche pas ».

### 2. Surcharger les variables CSS de Bootstrap

Depuis la version 5.3, Bootstrap s'appuie sur des **variables CSS** préfixées `--bs-`. On peut les modifier dans notre feuille :

```css
:root {
    --bs-body-font-family: "Nunito Sans", system-ui, sans-serif;
    --bs-body-color: #1d2a22;
    --bs-link-color: #2f5d46;
}
```

Les boutons ont leurs propres variables. Pour obtenir un bouton vert foncé, on les redéfinit sur une classe de notre choix :

```css
.btn-mirabelle {
    --bs-btn-color: #ffffff;
    --bs-btn-bg: #2f5d46;
    --bs-btn-border-color: #2f5d46;
    --bs-btn-hover-color: #ffffff;
    --bs-btn-hover-bg: #1f3d2e;
    --bs-btn-hover-border-color: #1f3d2e;
    --bs-btn-active-bg: #1f3d2e;
    --bs-btn-active-border-color: #1f3d2e;
}
```
```html
<a class="btn btn-mirabelle" href="#reserver">Réserver une table</a>
```

Ici, on **réutilise** le comportement de `.btn` (taille, arrondi, états) en changeant seulement les couleurs.

### 3. Personnaliser avec Sass (niveau avancé)

Avec l'installation par npm, on modifie les variables **Sass** de Bootstrap avant de compiler. On obtient alors un CSS Bootstrap recompilé avec votre charte (couleurs, polices, espacements, points de rupture), où l'on peut aussi ne garder que les composants utilisés. C'est la méthode professionnelle, mais elle demande des outils de compilation : elle dépasse le cadre de cette semaine.

### Le mode sombre

Bootstrap 5.3 gère un thème sombre : il suffit d'ajouter un attribut sur `<html>` (ou sur un élément).
```html
<html lang="fr" data-bs-theme="dark">
```
Les composants Bootstrap changent alors de couleurs. Pensez à **revérifier vos contrastes** si vous combinez ce thème avec vos propres couleurs.

## Bootstrap et accessibilité

Bootstrap fournit de bonnes bases (focus visibles, composants avec les rôles ARIA, navigation au clavier dans les menus et les modales), mais il **ne garantit pas** qu'un site soit accessible. Il reste de **votre** responsabilité de :

- garder une **structure sémantique** (titres hiérarchisés, `main`, `nav`, `footer`) ;
- fournir les **textes alternatifs** des images et les **`<label>`** des formulaires ;
- vérifier les **contrastes** des couleurs choisies (certaines couleurs par défaut, comme le jaune `btn-warning` avec du texte clair, sont à manier avec soin) ;
- **tester au clavier**.

Bootstrap apporte aussi une classe utile : `visually-hidden`, qui cache un texte à l'écran mais le laisse lisible pour les lecteurs d'écran, et `visually-hidden-focusable`, qui l'affiche au focus. C'est l'équivalent de notre « lien d'évitement » du TP.

## Quand utiliser Bootstrap ?

| Bootstrap est un bon choix si... | Un CSS maison est préférable si... |
|---|---|
| Il faut produire une interface **rapidement** | Le design est **très personnalisé** et doit être unique |
| Le projet est un **prototype** ou un outil interne (administration, tableau de bord) | Le site doit être **très léger** (chaque Ko compte) |
| L'équipe connaît déjà Bootstrap | Le projet est petit et le CSS tient en quelques dizaines de lignes |
| On a besoin de composants interactifs accessibles (modales, menus) sans les coder | Le but est **d'apprendre** : les bases du CSS d'abord |
| On veut un style homogène sur beaucoup de pages | Le site doit reprendre à l'identique une charte graphique précise |

Il existe d'autres approches (Tailwind CSS, Bulma, Foundation...) qui poursuivent les mêmes objectifs avec des méthodes différentes. Les idées vues ici (classes utilitaires, composants, grille responsive) s'y retrouvent.

## Les erreurs courantes à éviter

| Erreur | Conséquence | Correction |
|---|---|---|
| Oublier `<!DOCTYPE html>` | Styles incomplets (mode quirks) | Toujours le mettre en première ligne |
| Oublier la balise `viewport` | Le responsive ne fonctionne pas sur mobile | La mettre dans le `<head>` |
| Charger sa feuille **avant** celle de Bootstrap | Bootstrap écrase vos règles | Placer son CSS **après** Bootstrap |
| Oublier le `<script>` du JavaScript | Les menus, modales, etc. ne réagissent pas | Ajouter `bootstrap.bundle.min.js` avant `</body>` |
| Changer la version sans changer `integrity` | Le navigateur bloque le fichier | Copier le bloc complet depuis la documentation |
| Suivre un tutoriel de Bootstrap 3 ou 4 | Classes qui n'existent plus (`float-left`, `ml-3`...) | Vérifier la version 5 (`float-start`, `ms-3`...) |
| Charger deux versions de Bootstrap | Comportements imprévisibles | N'en garder qu'une |
| Ajouter des styles en ligne (`style="..."`) pour corriger | HTML difficile à maintenir | Créer une classe dans sa feuille de style |
| Utiliser `!important` pour que sa règle gagne | Conflits en cascade | Vérifier l'ordre des feuilles et la spécificité |
| Empiler des classes sans les comprendre | Résultat impossible à corriger | Lire la documentation de chaque classe |
| Utiliser Bootstrap pour l'inclure « par principe » | Poids inutile, site banal | Se demander ce qu'il apporte au projet |

## À retenir

- Une **bibliothèque CSS** fournit des styles et des composants déjà écrits, testés et documentés. **Bootstrap** est l'une des plus répandues : CSS, composants et JavaScript, sans jQuery depuis la version 5.
- Ses objectifs : **aller vite**, être **responsive par défaut** (*mobile first*), rester **cohérent** et **fonctionner partout**.
- Ses limites : un **poids** à charger, des **sites qui se ressemblent**, un HTML **chargé de classes**, et le risque de **ne pas comprendre** le CSS généré.
- On l'ajoute par **CDN** (simple), par **téléchargement** ou par **npm** (projets professionnels). Le CSS va dans le `<head>`, le JavaScript avant `</body>`.
- Il faut un `<!DOCTYPE html>` et la balise **`viewport`** ; la version et l'attribut **`integrity`** vont ensemble.
- Dès son inclusion, le **Reboot** modifie l'apparence de tous les éléments.
- Les **conteneurs** (`container`, `container-fluid`) limitent la largeur ; les **classes utilitaires** (`mt-3`, `text-center`, `d-flex`...) font une chose chacune et existent en variantes responsives (`d-md-block`).
- Les points de rupture de Bootstrap sont en **`min-width`** : 576, 768, 992, 1200 et 1400 px.
- On personnalise en chargeant **sa feuille après celle de Bootstrap**, en surchargeant les **variables `--bs-`**, ou avec Sass.
- Bootstrap **ne remplace pas** les bases : HTML sémantique, accessibilité et CSS restent indispensables.
- Choisir Bootstrap, c'est choisir la **rapidité** et la **cohérence** ; choisir un CSS maison, c'est choisir la **liberté** et la **légèreté**.

---

© Vincent Chiofalo