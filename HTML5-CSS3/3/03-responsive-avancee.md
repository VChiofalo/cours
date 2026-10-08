# Techniques avancées pour le responsive design

Nous savons maintenant construire une page qui s'adapte : tailles relatives, images flexibles, Flexbox et Grid, et media queries pour changer la mise en page à certaines largeurs. Ces outils suffisent pour de nombreux sites, mais ils laissent des défauts :
- les **tailles de texte** changent d'un coup aux points de rupture, au lieu de varier progressivement ;
- une image de 2000 px est **téléchargée en entier** par un téléphone qui l'affiche en 360 px ;
- un même **composant** (une carte, par exemple) ne sait pas s'il est dans une colonne étroite ou large, car les media queries ne regardent que la **fenêtre** ;
- une hauteur de `100vh` pose problème sur les navigateurs mobiles ;
- les **tableaux** et les **vidéos** débordent facilement.

Dans ce chapitre, nous verrons :
- les fonctions `min()`, `max()` et `clamp()` pour des tailles **fluides** ;
- les **images responsives** : `srcset`, `sizes`, `<picture>` ;
- les **ratios** d'image avec `aspect-ratio` et `object-fit` ;
- les **unités de viewport modernes** (`dvh`, `svh`, `lvh`) ;
- les **requêtes de conteneur** (`@container`) ;
- le traitement des **tableaux** et des **contenus embarqués** ;
- comment **choisir** la bonne technique.

## Des tailles fluides : `min()`, `max()` et `clamp()`

### Le principe

Ces trois fonctions CSS permettent de calculer une valeur **selon l'espace disponible**, sans media query.

| Fonction | Rôle | Exemple |
|---|---|---|
| `min(a, b)` | Prend la **plus petite** des valeurs | `width: min(100%, 60rem)` |
| `max(a, b)` | Prend la **plus grande** des valeurs | `font-size: max(1rem, 2vw)` |
| `clamp(mini, idéal, maxi)` | Prend la valeur idéale, **bornée** entre un minimum et un maximum | `font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem)` |

On peut mélanger les unités dans le calcul (`rem`, `%`, `vw`...), et faire des opérations avec `+`, `-`, `*`, `/`. Dans les opérations, **les signes `+` et `-` doivent être entourés d'espaces** : `1.2rem + 2.5vw`, et non `1.2rem+2.5vw`.

### `min()` pour une largeur maximale avec marge

Nous utilisions `max-width: 60rem; margin: 0 auto;`. Avec `min()`, on y ajoute une marge minimale sur les côtés :
```css
main {
    width: min(100% - 2rem, 60rem);   /* au plus 60rem, et toujours 1rem de marge de chaque côté */
    margin-inline: auto;               /* centré */
}
```
- sur un grand écran, la largeur vaut `60rem` (la plus petite valeur) ;
- sur un petit écran, elle vaut `100% - 2rem` : le contenu ne touche jamais le bord de l'écran.

> `margin-inline` est une propriété **logique** : pour un texte qui s'écrit de gauche à droite, elle correspond à `margin-left` et `margin-right`. Elle s'adapte automatiquement si le texte s'écrit de droite à gauche (arabe, hébreu). Les équivalents sont `padding-inline`, `margin-block` et `padding-block` (haut et bas).

### `clamp()` pour un texte qui grossit progressivement

```css
h1 {
    font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
}
```
La taille du titre est :
- **au moins** `1.75rem` (28 px) ;
- **au plus** `3rem` (48 px) ;
- **entre les deux**, elle augmente avec la largeur de la fenêtre (valeur idéale `1.2rem + 2.5vw`).

| Largeur de fenêtre | Valeur idéale | Taille obtenue |
|---|---|---|
| 320 px | 19,2 + 8 = 27,2 px | **28 px** (le minimum l'emporte) |
| 600 px | 19,2 + 15 = 34,2 px | 34,2 px |
| 1000 px | 19,2 + 25 = 44,2 px | 44,2 px |
| 1280 px | 19,2 + 32 = 51,2 px | **48 px** (le maximum l'emporte) |

Entre environ 352 px et 1152 px, la taille varie de façon **continue**. Il n'y a plus de « saut » à un point de rupture.

> **Accessibilité : toujours mettre du `rem` dans la valeur idéale.** Avec une valeur uniquement en `vw` (`font-size: 4vw`), un utilisateur qui zoome ne peut plus agrandir le texte, car `vw` ne change pas avec le zoom. En ajoutant une part en `rem`, le texte réagit au zoom et à la taille de police choisie. Il en va de même pour les bornes : on les exprime en `rem`.

### `clamp()` pour les espacements

```css
section {
    padding-block: clamp(1rem, 4vw, 3rem);
}
```
Les marges intérieures des sections grandissent avec l'écran, sans media query.

### `min()` pour éviter un débordement dans Grid

La grille automatique `repeat(auto-fit, minmax(14rem, 1fr))` a un défaut : si l'écran est plus étroit que `14rem` (224 px), la colonne **déborde**. On corrige avec `min()` :
```css
.cartes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
    gap: 1rem;
}
```
Une colonne vaut au maximum `100%` du conteneur, et jamais plus que sa place.

## Des images responsives

Une image `max-width: 100%` ne déborde plus, mais le navigateur télécharge **le fichier complet**. Pour un téléphone, c'est du temps de chargement et des données mobiles gaspillés. HTML permet de proposer **plusieurs versions** d'une image.

### `srcset` et `sizes` : plusieurs tailles de la même image

```html
<img
    src="images/paysage-800.jpg"
    srcset="images/paysage-400.jpg 400w,
            images/paysage-800.jpg 800w,
            images/paysage-1600.jpg 1600w"
    sizes="(min-width: 64em) 30rem, 100vw"
    alt="Lac de montagne au lever du soleil"
    width="800" height="450">
```

| Attribut | Rôle |
|---|---|
| `src` | Image par défaut (pour les navigateurs qui ne comprennent pas `srcset`) |
| `srcset` | Liste des versions disponibles, avec leur **largeur réelle** en pixels (descripteur `w`) |
| `sizes` | La **largeur d'affichage** de l'image dans la page, selon des conditions |
| `alt`, `width`, `height` | Comme pour toute image |

La valeur de `sizes` ci-dessus se lit : « si la fenêtre fait au moins 64em, l'image est affichée sur 30rem de large ; sinon, elle occupe 100 % de la largeur de la fenêtre ».

Avec ces informations, **le navigateur choisit lui-même** le fichier adapté, en tenant compte de la densité de pixels de l'écran. Un téléphone de 360 px de large et de densité ×2 a besoin d'environ 720 px et prendra l'image de 800 px. Un ordinateur qui affiche l'image à 480 px sur un écran standard prendra celle de 400 ou 800 px.

> On ne peut pas savoir à l'avance quelle image sera choisie. `srcset` est une **indication** donnée au navigateur, pas une consigne.

### `<picture>` : changer d'image selon la situation

Pour une vraie **direction artistique** (par exemple un recadrage serré sur mobile, une image large sur ordinateur) ou pour proposer des **formats modernes**, on utilise `<picture>` :
```html
<picture>
    <source media="(min-width: 48em)" srcset="images/banniere-large.jpg">
    <img src="images/banniere-recadree.jpg" alt="Camille Martin devant son ordinateur" width="600" height="600">
</picture>
```
Si la fenêtre fait au moins 48em, le navigateur utilise l'image large de la `<source>` ; sinon, il affiche l'image recadrée de l'`<img>`. Plus généralement, il retient la **première** `<source>` dont la condition est vraie, et l'`<img>` sert de repli. L'`<img>` est **obligatoire** : c'est elle qui est affichée, et qui porte l'attribut `alt`.

Pour proposer un format plus léger, on utilise l'attribut `type` :
```html
<picture>
    <source type="image/avif" srcset="images/paysage.avif">
    <source type="image/webp" srcset="images/paysage.webp">
    <img src="images/paysage.jpg" alt="Lac de montagne" width="800" height="450">
</picture>
```
Le navigateur prend le premier format qu'il sait lire. Les formats **WebP** et **AVIF** sont nettement plus légers que le JPEG à qualité visuelle comparable.

| Besoin | Outil |
|---|---|
| Même image, plusieurs **tailles** | `srcset` + `sizes` sur `<img>` |
| Images **différentes** (recadrage) selon la fenêtre | `<picture>` + `media` |
| Plusieurs **formats** de fichier | `<picture>` + `type` |

### Charger seulement ce qui est visible

```html
<img src="images/photo.jpg" alt="..." width="800" height="450" loading="lazy">
```
`loading="lazy"` demande au navigateur de ne charger l'image que lorsqu'elle approche de l'écran. On l'utilise pour les images **situées plus bas dans la page**, pas pour l'image principale visible dès l'ouverture.

### Garder un ratio : `aspect-ratio` et `object-fit`

La propriété `aspect-ratio` impose un rapport largeur/hauteur à une boîte :
```css
.vignette {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}
```

| Propriété | Rôle |
|---|---|
| `aspect-ratio: 16 / 9` | La hauteur se calcule à partir de la largeur |
| `object-fit: cover` | L'image **remplit** la boîte et est **recadrée** si besoin (sans déformation) |
| `object-fit: contain` | L'image est **entièrement visible**, avec éventuellement des bandes vides |
| `object-position: center top` | Choisit la partie de l'image conservée (centre, haut...) |

Toutes les vignettes d'une grille ont ainsi la même forme, même si les photos d'origine ont des proportions différentes.

## Les unités de viewport modernes

`1vh` correspond à 1 % de la hauteur du viewport. Sur mobile, un problème apparaît : la **barre d'adresse** du navigateur apparaît et disparaît pendant le défilement, et la hauteur visible change. Avec `100vh`, le contenu peut se retrouver partiellement caché sous la barre d'adresse.

CSS propose trois familles d'unités :

| Unité | Signification | Usage |
|---|---|---|
| `svh` / `svw` | Viewport **petit** (barres du navigateur affichées) | Garantit que tout est visible |
| `lvh` / `lvw` | Viewport **grand** (barres masquées) | Équivaut à l'ancien `vh` |
| `dvh` / `dvw` | Viewport **dynamique** : suit l'état des barres | Remplit exactement l'écran à chaque instant |

```css
.accueil {
    min-height: 100dvh;   /* au moins la hauteur visible de l'écran */
}
```
On écrit en général `min-height` plutôt que `height`, pour que le contenu puisse dépasser sans être coupé. Sur ordinateur, ces trois familles donnent le même résultat qu'avec `vh`.

## Les requêtes de conteneur : `@container`

### Le problème

Une media query regarde la **taille de la fenêtre**. Or un composant (par exemple une carte) peut se trouver dans une colonne large ou dans une colonne étroite, **avec la même fenêtre**. Le composant ne peut pas deviner la place dont il dispose.

Une **requête de conteneur** (*container query*) applique des règles selon la **taille du conteneur parent**, et non de la fenêtre. Un composant devient ainsi réutilisable à n'importe quel endroit de la page.

### La syntaxe

Il faut deux étapes :
```css
/* 1. Déclarer le parent comme "conteneur" à observer */
.conteneur {
    container-type: inline-size;
}

/* 2. Écrire la requête sur ce conteneur */
@container (min-width: 28rem) {
    .carte {
        display: grid;
        grid-template-columns: 12rem 1fr;
        gap: 1rem;
    }
}
```

| Élément | Rôle |
|---|---|
| `container-type: inline-size` | Rend l'élément observable selon sa **largeur** (axe de lecture) |
| `@container (condition)` | Les règles ne s'appliquent que si le **conteneur** respecte la condition |
| `container-name` | Nom facultatif, pour cibler un conteneur précis : `@container carte (min-width: 28rem)` |

Les conditions s'écrivent comme celles des media queries (`min-width`, `max-width`...).

```html
<div class="conteneur">
    <article class="carte">
        <img src="images/projet.jpg" alt="" width="400" height="225">
        <div>
            <h3>Mon projet</h3>
            <p>Description du projet.</p>
        </div>
    </article>
</div>
```

### Deux règles à connaître

1. Un élément **ne peut pas s'observer lui-même** : la requête s'applique aux **descendants** du conteneur (ici `.carte` est dans `.conteneur`), pas au conteneur lui-même.
2. Avec `container-type: inline-size`, la **largeur** du conteneur ne peut plus dépendre de son contenu : c'est son parent qui la décide (par exemple un bloc normal, une colonne de grille). Un conteneur placé dans un parent flex sans largeur imposée peut donc se réduire à rien.

### Media query ou requête de conteneur ?

| Question | Outil |
|---|---|
| La **page** doit changer (menu, nombre de colonnes, taille du titre) | Media query |
| Un **composant** doit s'adapter à la place dont il dispose | Requête de conteneur |
| Préférence de l'utilisateur (thème, animations), impression | Media query |

Les deux se complètent. Le plus souvent, les media queries gèrent la **structure de la page**, et les requêtes de conteneur gèrent ses **composants**.

## Les tableaux et les contenus embarqués

### Les tableaux larges

Un tableau de cinq colonnes ne peut pas tenir en 320 px. On l'enveloppe dans un conteneur qui défile **horizontalement, à l'intérieur de lui-même** :
```html
<div class="tableau-defilant">
    <table>
        ...
    </table>
</div>
```
```css
.tableau-defilant {
    overflow-x: auto;
}
```
Le défilement reste limité au tableau : la **page** n'a pas de barre de défilement horizontale. Pour que le tableau reste accessible au clavier, on peut ajouter `tabindex="0"` sur le conteneur.

### Les vidéos et iframes

Une `<iframe>` (vidéo intégrée, carte) a une largeur et une hauteur fixes par défaut. On la rend flexible en lui imposant un **ratio** :
```css
.video {
    width: 100%;
    aspect-ratio: 16 / 9;
}

.video iframe {
    width: 100%;
    height: 100%;
    border: 0;
}
```
```html
<div class="video">
    <iframe src="https://www.youtube.com/embed/IDENTIFIANT" title="Titre de la vidéo" allowfullscreen></iframe>
</div>
```
L'élément `<video>` se règle comme une image : `max-width: 100%; height: auto;`.

### Les mots trop longs

Une URL longue ou un mot très long peut dépasser de sa boîte. La propriété suivante autorise le navigateur à le couper si nécessaire :
```css
p {
    overflow-wrap: break-word;
}
```

## Choisir la bonne technique

| Problème | Solution |
|---|---|
| Le contenu dépasse de l'écran | `max-width`, `width: min(...)`, images à `max-width: 100%` |
| Le texte « saute » de taille à un point de rupture | `clamp()` |
| La grille déborde sur très petit écran | `minmax(min(100%, 14rem), 1fr)` |
| L'image est trop lourde pour un téléphone | `srcset` + `sizes`, formats WebP/AVIF |
| Il faut un autre cadrage selon l'écran | `<picture>` + `media` |
| Les vignettes n'ont pas toutes la même forme | `aspect-ratio` + `object-fit` |
| Une section pleine hauteur est coupée sur mobile | `min-height: 100dvh` |
| Un composant doit s'adapter à sa colonne | `@container` |
| La structure de la page change (menu, colonnes) | `@media (min-width: ...)` |
| Un tableau est trop large | Conteneur `overflow-x: auto` |
| Une iframe a une taille fixe | `aspect-ratio` + `width: 100%` |

## Exemple complet

Voici une page de projets qui combine les techniques du chapitre : tailles fluides, marges calculées, grille sans débordement, images avec ratio, **cartes qui s'adaptent à leur conteneur**, tableau défilant et section pleine hauteur.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Projets — Camille Martin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header class="accueil">
        <h1>Camille Martin</h1>
        <p>Mes projets de première année</p>
    </header>

    <main>

        <section>
            <h2>Projet à la une</h2>
            <div class="conteneur">
                <article class="carte">
                    <img src="images/projet-1.jpg" alt="" width="640" height="360">
                    <div>
                        <h3>Mon mini-site</h3>
                        <p>Un site de deux pages réalisé avec HTML et CSS, du premier titre à la mise en page responsive.</p>
                    </div>
                </article>
            </div>
        </section>

        <section>
            <h2>Autres projets</h2>
            <div class="grille">
                <div class="conteneur">
                    <article class="carte">
                        <img src="images/projet-2.jpg" alt="" width="640" height="360" loading="lazy">
                        <div>
                            <h3>Formulaire de contact</h3>
                            <p>Un formulaire accessible avec validation.</p>
                        </div>
                    </article>
                </div>
                <div class="conteneur">
                    <article class="carte">
                        <img src="images/projet-3.jpg" alt="" width="640" height="360" loading="lazy">
                        <div>
                            <h3>Galerie photo</h3>
                            <p>Une grille d'images qui s'adapte à l'écran.</p>
                        </div>
                    </article>
                </div>
                <div class="conteneur">
                    <article class="carte">
                        <img src="images/projet-4.jpg" alt="" width="640" height="360" loading="lazy">
                        <div>
                            <h3>Page de CV</h3>
                            <p>Un CV imprimable en une page.</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section>
            <h2>Technologies utilisées</h2>
            <div class="tableau-defilant">
                <table>
                    <thead>
                        <tr>
                            <th>Projet</th>
                            <th>HTML</th>
                            <th>CSS</th>
                            <th>Flexbox</th>
                            <th>Grid</th>
                            <th>Media queries</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Mon mini-site</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
                        <tr><td>Formulaire de contact</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td><td>Non</td></tr>
                        <tr><td>Galerie photo</td><td>Oui</td><td>Oui</td><td>Non</td><td>Oui</td><td>Oui</td></tr>
                    </tbody>
                </table>
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

img {
    display: block;
    max-width: 100%;
    height: auto;
}

/* ===== En-tête pleine hauteur, titre fluide ===== */
.accueil {
    display: grid;
    place-content: center;
    min-height: 60dvh;
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

h1 {
    margin: 0;
    font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
}

/* ===== Contenu : largeur calculée, marges fluides ===== */
main {
    width: min(100% - 2rem, 60rem);
    margin-inline: auto;
    padding-block: clamp(1rem, 4vw, 3rem);
}

h2 {
    font-size: clamp(1.375rem, 1.1rem + 1.2vw, 2rem);
    color: #1f4068;
}

/* ===== Grille sans débordement ===== */
.grille {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: 1rem;
}

/* ===== Composant carte : s'adapte à son conteneur ===== */
.conteneur {
    container-type: inline-size;
}

.carte {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 0.25rem;
}

.carte h3 {
    margin-top: 0;
    font-size: 1.25rem;
    color: #336699;
}

.carte p {
    margin-bottom: 0;
}

@container (min-width: 28rem) {
    .carte {
        grid-template-columns: 12rem 1fr;
        align-items: center;
    }
}

/* ===== Tableau défilant ===== */
.tableau-defilant {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
}

th, td {
    padding: 0.5rem 0.75rem;
    border: 1px solid #c9d6e2;
    text-align: left;
    white-space: nowrap;
}

th {
    background-color: #e8eef5;
}

/* ===== Pied de page ===== */
footer {
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}
```

### Analyse

| Technique | Où |
|---|---|
| `clamp()` | Titres `h1` et `h2` ; marges verticales de `main` |
| `min()` | Largeur de `main` ; colonnes de `.grille` |
| Propriétés logiques | `margin-inline`, `padding-block` |
| `dvh` | Hauteur minimale de l'en-tête d'accueil |
| `aspect-ratio` + `object-fit` | Vignettes de 16/9 pour toutes les cartes |
| `loading="lazy"` | Images situées plus bas dans la page |
| `container-type` + `@container` | La carte passe à deux colonnes (image à gauche) dès que **son conteneur** fait 28rem |
| `overflow-x: auto` | Le tableau défile dans son propre cadre |

### Ce que l'on observe

Le même composant `.carte` se présente différemment selon la place disponible, et **pas seulement selon la fenêtre** :

| Fenêtre | Projet à la une | Autres projets |
|---|---|---|
| 360 px | Image au-dessus du texte | 1 colonne, image au-dessus du texte |
| 500 px | Image à gauche du texte | 1 colonne **large** : image à gauche du texte |
| 700 px | Image à gauche du texte | 2 colonnes **étroites** : image au-dessus du texte |
| 1280 px | Image à gauche du texte | 3 colonnes étroites : image au-dessus du texte |

À 500 px, les cartes de la grille sont plus larges qu'à 700 px, car elles n'occupent qu'**une seule colonne**. Une media query sur la largeur de la fenêtre n'aurait pas pu rendre compte de cela : seule une requête de conteneur le permet.

## Les erreurs courantes à éviter

| Erreur | Conséquence | Correction |
|---|---|---|
| `font-size` en `vw` uniquement | Le zoom du navigateur n'agrandit plus le texte | `clamp()` avec une part en `rem` |
| `1.2rem+2.5vw` sans espaces | Calcul invalide | `1.2rem + 2.5vw` |
| `clamp(max, idéal, min)` (ordre inversé) | Le résultat est faux | Toujours `clamp(mini, idéal, maxi)` |
| Oublier `sizes` quand on utilise `srcset` en `w` | Le navigateur suppose une image sur toute la largeur et télécharge une image trop grande | Renseigner `sizes` |
| `<picture>` sans `<img>` | Rien ne s'affiche | L'`<img>` est obligatoire |
| Oublier `alt`, `width`, `height` sur l'`<img>` d'un `<picture>` | Accessibilité et décalages de mise en page | Les garder sur l'`<img>` |
| `loading="lazy"` sur l'image du haut de page | L'image principale apparaît plus tard | Réserver `lazy` aux images éloignées |
| `height: 100vh` sur mobile | Contenu masqué sous la barre d'adresse | `min-height: 100dvh` |
| `@container` sans `container-type` sur le parent | La requête ne s'applique jamais | Déclarer le parent comme conteneur |
| Appliquer la requête de conteneur au conteneur lui-même | Aucun effet | La cibler sur ses descendants |
| Variable CSS dans une media query (`@media (min-width: var(--bp))`) | Ne fonctionne pas | Écrire la valeur en dur |
| Tableau large sans conteneur défilant | Défilement horizontal de toute la page | `overflow-x: auto` sur un conteneur |
| `iframe` avec `width="560"` fixe | Dépasse de l'écran | Conteneur avec `aspect-ratio` et `width: 100%` |
| Multiplier les astuces | CSS difficile à relire | Commencer par le plus simple |

## À retenir

- `min()`, `max()` et `clamp()` calculent une valeur selon l'espace disponible : `clamp(mini, idéal, maxi)` rend les **tailles de texte et les marges fluides**, sans point de rupture.
- Toujours mettre du **`rem`** dans les valeurs de `clamp()`, pour ne pas bloquer le zoom.
- `width: min(100% - 2rem, 60rem)` et `minmax(min(100%, 14rem), 1fr)` évitent les débordements.
- Images responsives : **`srcset` + `sizes`** pour plusieurs tailles, **`<picture>`** pour changer de cadrage ou de format, **`loading="lazy"`** pour les images éloignées.
- `aspect-ratio` et `object-fit` gardent des formes d'image régulières.
- `dvh`, `svh` et `lvh` corrigent les problèmes de `100vh` sur mobile : préférer `min-height: 100dvh`.
- Les **requêtes de conteneur** (`container-type` + `@container`) adaptent un **composant** à la place dont il dispose, alors que les media queries adaptent la **page** à la fenêtre.
- Les tableaux larges défilent dans un conteneur `overflow-x: auto` ; les vidéos et iframes se règlent avec `aspect-ratio`.
- Ces techniques se **complètent** : commencer par le plus simple (unités relatives, Flexbox, Grid), puis ajouter media queries, `clamp()` et requêtes de conteneur là où elles apportent quelque chose.

## À vous

Il est temps de passer à la pratique. Allez dans le dossier [exercices](exercices/01-responsives.md) et faites les exercices dans l'ordre (le lien vous amène sur les exercices).

---

© Vincent Chiofalo