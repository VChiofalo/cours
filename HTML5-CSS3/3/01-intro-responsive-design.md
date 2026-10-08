# Introduction au responsive web design et son importance

Jusqu'ici, nous avons testé nos pages dans la fenêtre d'un navigateur d'ordinateur. Mais un site web est consulté sur des appareils très différents : téléphone, tablette, ordinateur portable, grand écran, voire télévision. Un même visiteur peut d'ailleurs en changer dans la journée.

Une page pensée pour un seul écran devient vite pénible sur un autre : texte minuscule, défilement horizontal, boutons impossibles à toucher du doigt. Le **responsive web design** (*conception web adaptative*, parfois dit « adaptatif » ou « réactif ») répond à ce problème.

Dans ce chapitre, nous verrons :
- ce qu'est le responsive web design et pourquoi il est devenu indispensable ;
- le vocabulaire de base : **viewport**, **pixel CSS**, **point de rupture** ;
- les trois ingrédients d'un site responsive ;
- la balise `<meta name="viewport">`, sans laquelle rien ne fonctionne sur mobile ;
- les premières techniques **sans media query** : unités relatives, images flexibles, Flexbox et Grid ;
- comment **tester** une page sur plusieurs tailles d'écran.

## Qu'est-ce que le responsive web design ?

Le **responsive web design** est une approche de conception où **une seule page** (un seul HTML, une seule feuille de style) **s'adapte automatiquement** à la taille et aux capacités de l'écran qui l'affiche.

L'expression a été popularisée en 2010 par le designer Ethan Marcotte. Avant cela, on construisait souvent deux sites : un pour l'ordinateur et un pour le mobile, avec des adresses différentes.

| Approche | Principe | Inconvénient |
|---|---|---|
| **Site fixe** | La page a une largeur imposée (par exemple 960 px) | Inutilisable sur petit écran, perd de la place sur grand écran |
| **Site mobile séparé** | Un second site dédié au mobile | Deux sites à maintenir, contenus qui divergent |
| **Responsive** | Une seule page qui s'adapte | Demande de réfléchir à la mise en page dès le départ |

Dans une page responsive :
- le **contenu est le même** pour tous (mêmes textes, mêmes images) ;
- la **présentation change** : nombre de colonnes, taille des éléments, affichage du menu, etc.

## Pourquoi est-ce important ?

| Raison | Explication |
|---|---|
| **Les usages** | Une grande part de la navigation web se fait sur mobile, souvent plus de la moitié selon les sources et les pays |
| **L'expérience** | Un visiteur qui doit zoomer et défiler dans tous les sens quitte rapidement le site |
| **Le référencement** | Les moteurs de recherche, Google en tête, évaluent d'abord la version mobile d'un site (*mobile-first indexing*) |
| **L'accessibilité** | Les personnes qui agrandissent le texte ou zooment beaucoup doivent pouvoir lire sans défiler horizontalement |
| **La maintenance** | Un seul code à écrire, tester et corriger |
| **L'avenir** | De nouveaux formats d'écran apparaissent régulièrement (pliables, montres, voitures) : on ne peut pas prévoir toutes les tailles |

Le dernier point est essentiel : on ne conçoit pas « pour le téléphone » et « pour l'ordinateur », on conçoit une page qui **fonctionne à toutes les largeurs**, même celles qu'on n'a pas imaginées.

## Vocabulaire de base

### Le viewport

Le **viewport** (*zone d'affichage*) est la partie de la fenêtre dans laquelle la page est affichée. Sur ordinateur, c'est la zone sous la barre d'adresse. Sur mobile, c'est l'écran, ou une partie de l'écran.

Le point de départ du responsive est la **largeur du viewport**, car c'est elle qui détermine la place disponible pour la mise en page.

### Pixel CSS et pixel physique

Un écran de téléphone moderne possède énormément de pixels physiques (par exemple 1170 de large), mais le navigateur ne raisonne pas avec ceux-là. Il utilise des **pixels CSS**, une unité indépendante de l'appareil, convertie ensuite en pixels physiques.

Un téléphone récent fait ainsi environ **360 à 430 pixels CSS de large**, alors qu'il en possède environ 1000 à 1300 physiques. Écrire `width: 300px` donne donc une boîte de largeur comparable d'un appareil à l'autre, quelle que soit la finesse de l'écran.

| Type d'appareil | Largeur typique en pixels CSS |
|---|---|
| Petit téléphone | 320 à 360 px |
| Téléphone récent | 360 à 430 px |
| Tablette | 600 à 1024 px |
| Ordinateur portable | 1280 à 1536 px |
| Grand écran | 1920 px et plus |

Ces valeurs ne sont que des repères : l'important est de retenir que les largeurs **varient en continu** et que la fenêtre d'un ordinateur peut être redimensionnée à volonté.

### Point de rupture

Un **point de rupture** (*breakpoint*) est une largeur de viewport à partir de laquelle la mise en page change (par exemple : passer de une à trois colonnes). Nous les utiliserons avec les media queries, dans le chapitre suivant.

### Fluide et adaptatif

| Terme | Signification |
|---|---|
| **Mise en page fluide** | Les tailles s'expriment en unités relatives (%, `fr`, `rem`) : la page s'étire et se comprime en continu |
| **Mise en page adaptative par paliers** | La mise en page change à certaines largeurs précises (points de rupture) |

Un bon site responsive combine les deux : une base **fluide**, complétée par quelques **changements de mise en page** là où la fluidité ne suffit plus.

## Les trois ingrédients du responsive

Marcotte a décrit le responsive design avec trois ingrédients, toujours d'actualité :

| Ingrédient | Rôle | Où le voit-on ? |
|---|---|---|
| **1. Une grille fluide** | La mise en page s'adapte à la largeur disponible | Unités relatives, Flexbox, Grid |
| **2. Des images flexibles** | Les images ne dépassent jamais de leur conteneur | `max-width: 100%` |
| **3. Les media queries** | Les règles CSS changent selon la taille de l'écran | `@media (...)` (chapitre suivant) |

Les deux premiers ingrédients se mettent en place **sans aucune media query**. C'est ce que nous allons voir.

## Indispensable : la balise `meta viewport`

Sur un téléphone, les navigateurs font une chose surprenante : par défaut, ils supposent qu'une page n'a pas été pensée pour le mobile. Ils l'affichent alors dans une fenêtre virtuelle d'environ **980 px de large**, puis la réduisent pour qu'elle tienne à l'écran. Le résultat : un texte minuscule, qu'il faut agrandir avec les doigts.

Pour indiquer que la page est responsive, on ajoute **dans le `<head>`** de chaque page :
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

| Valeur | Rôle |
|---|---|
| `width=device-width` | La largeur du viewport est celle de l'appareil (en pixels CSS), et non 980 px |
| `initial-scale=1` | Pas de zoom ou de réduction au chargement de la page |

Sans cette balise, **aucune** règle responsive ne fonctionne correctement sur mobile, même si le CSS est parfait.

> **Ne jamais bloquer le zoom.** On trouve sur Internet des exemples avec `user-scalable=no` ou `maximum-scale=1`. Il faut les éviter : ils empêchent les personnes malvoyantes d'agrandir la page. C'est contraire aux règles d'accessibilité.

À partir de maintenant, la balise `meta viewport` fait partie du **modèle de base** de nos pages, au même titre que `<meta charset="UTF-8">`.
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Titre de la page</title>
    <link rel="stylesheet" href="css/style.css">
</head>
```

## Première technique : des tailles relatives

### Le problème des tailles fixes

Une boîte avec une largeur fixe en pixels ne s'adapte à rien :
```css
.page {
    width: 960px;
}
```
Sur un écran de 360 px de large, la page dépasse de l'écran : une **barre de défilement horizontale** apparaît, ce qui est l'un des défauts les plus courants (et les plus gênants) sur mobile.

### Remplacer la largeur par une largeur maximale

Un bloc occupe naturellement toute la largeur disponible. Au lieu d'imposer une largeur, on lui fixe un **maximum** :
```css
.page {
    max-width: 60rem;   /* ne dépasse jamais 60rem... */
    margin: 0 auto;     /* ...et se centre quand il y a de la place */
}
```
- sur un grand écran, la boîte mesure 60rem au plus et se centre ;
- sur un petit écran, elle se réduit à la largeur disponible.

Notre mini-site utilise déjà ce principe avec `main { max-width: 45rem; margin: 0 auto; }`.

### Les unités relatives

| Unité | Relative à | Usage typique |
|---|---|---|
| `%` | la taille du parent | largeurs de colonnes |
| `rem` | la taille de police de la racine (16 px par défaut) | marges, espacements, tailles de texte |
| `em` | la taille de police de l'élément | espacements liés au texte |
| `vw` / `vh` | 1 % de la largeur / hauteur du viewport | grands titres, sections pleine hauteur |
| `ch` | la largeur du caractère « 0 » | largeur d'une ligne de texte |
| `fr` | une part de l'espace libre dans une grille | colonnes de Grid |

Règles pratiques :
- **tailles de texte et espacements** en `rem` : ils suivent le réglage de taille de police choisi par l'utilisateur ;
- **largeurs de blocs** en `%`, `fr`, ou avec `max-width` ;
- les **pixels** restent adaptés pour de petits détails (bordures de `1px`, ombres).

### Garder un texte lisible

Une ligne de texte trop longue fatigue l'œil, une ligne trop courte hache la lecture. On vise **environ 45 à 75 caractères par ligne**, ce qu'on obtient avec `max-width` en `ch` :
```css
p {
    max-width: 65ch;
}
```

## Deuxième technique : des images flexibles

Une image a sa largeur d'origine : une photo de 2000 px de large dépasse d'un écran de 360 px. Pour l'en empêcher :
```css
img {
    max-width: 100%;
    height: auto;
}
```
- `max-width: 100%` : l'image ne dépasse jamais la largeur de son conteneur (mais n'est jamais agrandie au-delà de sa taille d'origine) ;
- `height: auto` : la hauteur suit la largeur, ce qui conserve les **proportions** de l'image.

> Gardez les attributs HTML `width` et `height` sur les images : le navigateur peut ainsi réserver la bonne place avant le chargement, et la page ne « saute » pas. Avec `height: auto`, ils ne déforment pas l'image.
>
> ```html
> <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="400" height="300">
> ```

Le choix d'images différentes selon l'écran (`srcset`, `<picture>`) est une technique avancée, vue dans le dernier chapitre de cette partie.

## Troisième technique : Flexbox et Grid font déjà une partie du travail

Les outils du chapitre précédent sont conçus pour s'adapter.

### Flexbox avec retour à la ligne

```css
.cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.carte {
    flex: 1 1 14rem;
}
```
Les cartes se placent côte à côte tant que la place suffit (`14rem` chacune au minimum), puis passent à la ligne d'elles-mêmes.

### Grid avec colonnes automatiques

```css
.cartes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1rem;
}
```
Le navigateur crée **autant de colonnes de 14rem minimum que la place le permet**, et les étire pour remplir la ligne : 1 colonne sur téléphone, 2 sur tablette, 3 ou plus sur ordinateur.

Ces deux techniques créent une mise en page **qui se réorganise seule, sans media query**. C'est la meilleure base pour un site responsive.

### Un menu qui passe à la ligne

```css
nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
```
Sur un petit écran, si les liens ne tiennent pas sur une ligne, ils se placent sur la suivante au lieu de dépasser.

## Mobile first ou desktop first ?

Quand on écrit un CSS responsive, on peut partir de deux bases :

| Approche | On écrit d'abord... | Puis on ajoute... |
|---|---|---|
| **Mobile first** | la version pour petit écran | des règles pour les écrans plus grands |
| **Desktop first** | la version pour grand écran | des règles pour réduire sur les petits écrans |

On recommande généralement le **mobile first** :
- la version mobile est la plus **simple** (une colonne, le contenu essentiel), c'est le CSS de base ;
- on **ajoute** de la complexité quand la place le permet, plutôt que d'en retirer ;
- le mobile a souvent la connexion la moins performante : un CSS de base léger lui profite.

Autrement dit : le CSS « normal » (sans media query) décrit la version la plus étroite, et les media queries du chapitre suivant l'enrichiront pour les écrans plus larges.

## Éléments d'interface sur mobile

Un doigt est bien moins précis qu'une souris. Quelques principes pour que la page reste utilisable au toucher :

| Principe | Explication |
|---|---|
| **Zones tactiles assez grandes** | Viser une zone cliquable d'environ 44 × 44 px pour les boutons et les liens (les règles d'accessibilité WCAG 2.2 exigent 24 × 24 px au minimum) |
| **Espace entre les zones tactiles** | Évite les clics sur le mauvais lien |
| **Texte d'au moins 16 px** (`1rem`) | En dessous, la lecture devient pénible, et certains navigateurs zooment automatiquement |
| **Pas de dépendance au survol** | `:hover` n'existe pas au doigt : une information ne doit pas apparaître *uniquement* au survol |
| **Pas de défilement horizontal** | Seul le défilement vertical est naturel sur mobile |

Les règles d'accessibilité (WCAG, critère *Reflow*) demandent en particulier que le contenu reste utilisable **sans défilement horizontal à 320 px de large**. C'est une très bonne largeur de référence pour les tests.

## Tester une page responsive

### Les outils du navigateur

Les navigateurs fournissent des **outils de développement** (touche `F12`, ou clic droit puis « Inspecter »). Ils offrent un **mode appareil** (*device toolbar*, raccourci `Ctrl+Maj+M` sous Chrome et Edge, `Ctrl+Alt+M` sous Firefox) pour simuler différents écrans :

| Fonction | Intérêt |
|---|---|
| Choix d'un appareil prédéfini | Simule la taille d'un téléphone ou d'une tablette |
| Dimensions personnalisées | Teste n'importe quelle largeur, en tirant sur les bords |
| Rotation | Teste le mode portrait et le mode paysage |
| Simulation du toucher | Le pointeur devient un doigt |

### Une méthode de test simple

1. Ouvrir la page en grand écran, puis **réduire lentement la largeur** de la fenêtre.
2. À chaque étape, chercher les défauts : barre de défilement horizontale, texte coupé, image débordante, éléments qui se chevauchent, boutons trop petits.
3. Tester à **320 px** (le plus étroit), à environ **768 px** (tablette) et à **1280 px** (ordinateur).
4. Tester le **zoom à 200 %** du navigateur : la page doit rester lisible.
5. Si possible, tester sur un **vrai téléphone**, car un simulateur ne remplace pas un appareil réel.

### Repérer ce qui déborde

Si une barre de défilement horizontale apparaît, un élément est trop large. Pour le trouver, on peut temporairement ajouter :
```css
* {
    outline: 1px solid red;
}
```
Les contours de tous les éléments apparaissent ; celui qui dépasse de la page est le coupable. Il suffit ensuite de retirer cette règle.

## Exemple complet

Voici une page responsive complète, **sans aucune media query**. Elle utilise uniquement ce que nous avons vu dans ce chapitre.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Camille Martin — Responsive</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header>
        <h1>Camille Martin</h1>
        <p>Étudiante en première année d'informatique</p>
    </header>

    <nav>
        <a href="index.html">Accueil</a>
        <a href="projets.html">Projets</a>
        <a href="competences.html">Compétences</a>
        <a href="contact.html">Contact</a>
    </nav>

    <main>
        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="800" height="400">
            <p>
                Je découvre le développement web et j'aime créer des choses
                qui fonctionnent, sur n'importe quel écran.
            </p>
        </section>

        <section>
            <h2>Mes centres d'intérêt</h2>
            <div class="cartes">
                <article class="carte">
                    <h3>Le jeu vidéo</h3>
                    <p>J'aime les jeux de stratégie et d'aventure.</p>
                </article>
                <article class="carte">
                    <h3>La photographie</h3>
                    <p>Je photographie surtout des paysages.</p>
                </article>
                <article class="carte">
                    <h3>La randonnée</h3>
                    <p>Je marche en montagne dès que possible.</p>
                </article>
            </div>
        </section>
    </main>

    <footer>
        <p>© 2026 Camille Martin</p>
    </footer>

</body>
</html>
```

```css
/* ===== Base ===== */
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

/* ===== Images flexibles ===== */
img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
}

/* ===== En-tête, menu, pied de page ===== */
header {
    padding: 1rem;
    background-color: #336699;
    color: #ffffff;
    text-align: center;
}

nav {
    display: flex;
    flex-wrap: wrap;
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
    text-decoration: none;
}

footer {
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

/* ===== Contenu : largeur maximale, jamais de largeur fixe ===== */
main {
    max-width: 60rem;
    margin: 0 auto;
    padding: 1rem;
}

p {
    max-width: 65ch;
}

/* ===== Cartes : colonnes automatiques ===== */
.cartes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
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
```

### Analyse

| Élément | Rôle |
|---|---|
| `<meta name="viewport" ...>` | Le navigateur mobile utilise la vraie largeur de l'écran |
| `main { max-width: 60rem; margin: 0 auto; }` | Pas de largeur fixe : le contenu s'adapte et se centre sur grand écran |
| `img { max-width: 100%; height: auto; }` | L'image de 800 px ne déborde pas d'un écran de 360 px et garde ses proportions |
| `width` / `height` sur `<img>` | Le navigateur réserve la place avant le chargement |
| `nav { display: flex; flex-wrap: wrap; }` | Les quatre liens passent à la ligne si besoin |
| `nav a { padding: 0.75rem 1rem; }` | Zones tactiles confortables |
| `p { max-width: 65ch; }` | Lignes de texte de longueur raisonnable |
| `.cartes { grid ... auto-fit, minmax(14rem, 1fr) }` | Une, deux ou trois colonnes selon la place disponible |
| `font-size: 1rem` | Texte lisible, qui respecte le réglage du navigateur |

### Ce que l'on observe en redimensionnant

| Largeur de fenêtre | Résultat |
|---|---|
| 1280 px | Contenu centré (60rem maximum), trois cartes sur une ligne, menu sur une ligne |
| 700 px | Deux cartes sur la première ligne, la troisième dessous |
| 360 px | Une carte par ligne, le menu passe sur deux lignes, image réduite, aucun défilement horizontal |

## Retour sur notre mini-site

Que se passe-t-il quand on ouvre notre mini-site (TD précédents) à 320 px de large ?

| Élément | Comportement |
|---|---|
| `main` avec `max-width: 45rem` | Correct : s'adapte à la largeur |
| Cartes en Flexbox avec `flex-wrap` | Correct : s'empilent |
| Cartes en Grid avec `auto-fit` | Correct : une colonne |
| Menu en Flexbox | Les liens risquent de se serrer : prévoir `flex-wrap: wrap` |
| Section « À propos » à deux colonnes `200px 1fr` | Colonne de texte très étroite : à adapter |
| En-tête et pied de page fixes | Prennent une part importante de la hauteur sur un écran de téléphone, surtout en mode paysage |

Les derniers points nécessitent de **changer la mise en page selon la largeur** : c'est précisément le rôle des media queries, que nous verrons ensuite.

## Les erreurs courantes à éviter

| Erreur | Conséquence | Correction |
|---|---|---|
| Oublier `<meta name="viewport">` | Page minuscule sur mobile, CSS responsive sans effet | L'ajouter dans le `<head>` de **chaque** page |
| Bloquer le zoom (`user-scalable=no`) | Inaccessible aux personnes malvoyantes | Ne jamais l'utiliser |
| Largeur fixe en pixels (`width: 960px`) | Défilement horizontal sur mobile | `max-width`, `%`, `fr` |
| Images sans `max-width: 100%` | Images qui dépassent de l'écran | `img { max-width: 100%; height: auto; }` |
| `height` fixe sur un bloc de texte | Texte qui déborde quand il passe sur plusieurs lignes | `min-height`, ou aucune hauteur |
| Tailles de texte en `px` | Ne suit pas le réglage de taille de police de l'utilisateur | `rem` |
| Boutons et liens minuscules | Impossibles à toucher | Padding suffisant (≈ 44 px de zone cliquable) |
| Information accessible uniquement au survol | Invisible sur écran tactile | Prévoir une alternative |
| Ne tester qu'en grand écran | Défauts découverts trop tard | Réduire la fenêtre, utiliser le mode appareil |
| Concevoir « pour un téléphone » *et* « pour un ordinateur » seulement | Cas intermédiaires (tablette, fenêtre réduite) mal gérés | Raisonner en largeurs continues |

## À retenir

- Le **responsive web design** permet à **une seule page** de s'adapter à tous les écrans.
- Il est important pour l'**usage** (mobile), l'**expérience**, le **référencement**, l'**accessibilité** et la **maintenance**.
- Le **viewport** est la zone d'affichage ; on raisonne en **pixels CSS**, indépendants de l'appareil.
- Un **point de rupture** est une largeur à laquelle la mise en page change (media queries, chapitre suivant).
- Trois ingrédients : **grille fluide**, **images flexibles**, **media queries**.
- `<meta name="viewport" content="width=device-width, initial-scale=1">` est **indispensable** dans chaque page, et on ne bloque jamais le zoom.
- Pas de largeur fixe : utiliser `max-width`, `%`, `fr`, et des unités relatives (`rem`, `ch`).
- Images : `max-width: 100%; height: auto;`.
- Flexbox avec `flex-wrap` et Grid avec `repeat(auto-fit, minmax(...))` rendent une mise en page responsive **sans media query**.
- On préfère le **mobile first** : le CSS de base décrit la version étroite, on enrichit ensuite.
- Au toucher : zones cliquables confortables, texte de 16 px minimum, rien qui dépende du survol, pas de défilement horizontal.
- On **teste** en réduisant la fenêtre (320 px, 768 px, 1280 px), avec le mode appareil du navigateur, et si possible sur un vrai téléphone.

---

© Vincent Chiofalo