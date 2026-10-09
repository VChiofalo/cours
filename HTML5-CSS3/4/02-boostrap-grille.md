# Comprendre le système de grille de Bootstrap

Dans le chapitre précédent, nous avons ajouté Bootstrap à une page et découvert les conteneurs et les classes utilitaires. Il nous manque l'outil le plus emblématique de la bibliothèque : sa **grille**.

Nous savons déjà construire des mises en page en colonnes avec Flexbox et Grid. La grille de Bootstrap propose de faire la même chose **uniquement avec des classes dans le HTML**, sans écrire une ligne de CSS, et avec un comportement responsive déjà prévu.

Dans ce chapitre, nous verrons :
- le principe : **conteneur, ligne, colonnes** ;
- le découpage en **12 colonnes** ;
- les colonnes **égales**, de **largeur choisie** ou de **largeur automatique** ;
- la grille **responsive** avec les points de rupture ;
- les **gouttières** (l'espace entre les colonnes) ;
- le **retour à la ligne** automatique, le **décalage** et l'**ordre** des colonnes ;
- l'**alignement** des colonnes ;
- l'**imbrication** de grilles ;
- le lien avec **Flexbox** et **CSS Grid**, que nous connaissons ;
- un **exemple complet** et les **erreurs courantes**.

## Le principe : conteneur, ligne, colonnes

La grille repose sur trois niveaux d'éléments, toujours imbriqués dans cet ordre.

| Niveau | Classe | Rôle |
|---|---|---|
| 1 | `.container` (ou `.container-fluid`) | Limite la largeur et centre le contenu |
| 2 | `.row` | Une **ligne** de colonnes |
| 3 | `.col`, `.col-6`, `.col-md-4`... | Les **colonnes**, qui contiennent le contenu |

```html
<div class="container">
    <div class="row">
        <div class="col">Colonne 1</div>
        <div class="col">Colonne 2</div>
        <div class="col">Colonne 3</div>
    </div>
</div>
```

Ces trois colonnes ont la **même largeur** et se partagent la ligne. Sur un très petit écran comme sur un grand, elles restent **côte à côte**, car la classe `col` ne contient pas de point de rupture.

> **Règle à retenir** : les colonnes (`.col-…`) doivent **toujours être des enfants directs d'une `.row`**, et la `.row` doit toujours se trouver dans un conteneur. Si un niveau manque, la mise en page est décalée ou déborde.

### Ce qui se passe derrière

Pour comprendre la grille, il faut savoir ce que Bootstrap fait réellement en CSS (version simplifiée) :

```css
.row {
    display: flex;
    flex-wrap: wrap;
}
.row > * {
    flex-shrink: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
}
.col {
    flex: 1 0 0%;
}
.col-6 {
    flex: 0 0 auto;
    width: 50%;
}
```

La grille de Bootstrap est donc **de la Flexbox** : la `.row` est un conteneur flex qui peut passer à la ligne (`flex-wrap: wrap`), et les colonnes sont des éléments flex dont on fixe la largeur en pourcentage. Tout ce que nous avons vu sur Flexbox s'applique ici.

## Les 12 colonnes

Bootstrap divise la largeur d'une ligne en **12 colonnes virtuelles**. On indique combien de colonnes un élément occupe, de **1 à 12**.

```
|  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 |
|<------------ 6 ---------->|<------------ 6 ---------->|
|<------- 4 ------>|<------- 4 ------>|<------- 4 ------>|
|<-- 3 -->|<-- 3 -->|<-- 3 -->|<-- 3 -->|
|<------ 8 ------------------>|<------ 4 ------>|
```

On écrit la classe `col-` suivie du nombre de colonnes :

| Classe | Largeur | Équivalent CSS |
|---|---|---|
| `col-12` | 12/12 | `width: 100%` |
| `col-6` | 6/12 | `width: 50%` |
| `col-4` | 4/12 | `width: 33.333%` |
| `col-3` | 3/12 | `width: 25%` |
| `col-8` | 8/12 | `width: 66.667%` |

```html
<div class="container">
    <div class="row">
        <div class="col-8">8 colonnes sur 12</div>
        <div class="col-4">4 colonnes sur 12</div>
    </div>
</div>
```

Le choix de **12** n'est pas un hasard : 12 se divise par 2, 3, 4 et 6. On peut donc faire 2, 3, 4 ou 6 colonnes égales, ou des combinaisons comme 8 + 4 ou 3 + 9.

> **Le total n'est pas obligé de faire 12.** Si la somme est inférieure à 12, il reste de la place vide à droite. Si elle est supérieure à 12, les colonnes en trop **passent à la ligne suivante** (voir plus loin).

## Trois façons de dimensionner une colonne

| Classe | Comportement |
|---|---|
| `.col` | Prend **une part égale** de la place restante |
| `.col-6` (`1` à `12`) | Prend **exactement** ce nombre de colonnes |
| `.col-auto` | Prend la largeur **de son contenu** |

On peut les mélanger sur la même ligne.

```html
<div class="row">
    <div class="col-auto">Largeur du contenu</div>
    <div class="col">Prend tout l'espace restant</div>
    <div class="col-3">3 colonnes sur 12</div>
</div>
```

Ici, la première colonne est aussi étroite que son texte, la dernière fait toujours un quart de la ligne, et la colonne du milieu occupe le reste. C'est le même principe que `flex: 1` pour l'élément qui s'étire en Flexbox.

## Une grille responsive : les points de rupture

Jusqu'ici, les colonnes restent côte à côte sur tous les écrans. Or, trois colonnes de 33 % sur un téléphone de 360 px sont illisibles. Pour changer le comportement selon la largeur de l'écran, on ajoute le nom du **point de rupture** dans la classe : `col-md-4`, `col-lg-6`...

Les points de rupture sont ceux que nous avons déjà rencontrés, et ils fonctionnent en **`min-width`** (*mobile first*).

| Préfixe | S'applique à partir de | Exemple |
|---|---|---|
| (aucun) | 0 px | `col-6` |
| `sm` | 576 px | `col-sm-6` |
| `md` | 768 px | `col-md-6` |
| `lg` | 992 px | `col-lg-6` |
| `xl` | 1200 px | `col-xl-6` |
| `xxl` | 1400 px | `col-xxl-6` |

### La règle fondamentale

Une classe `col-md-4` signifie : « **à partir de 768 px, 4 colonnes sur 12**. En dessous, la colonne n'a pas de largeur définie : elle prend **toute la largeur de la ligne** et se place **sous** la précédente. »

```html
<div class="row">
    <div class="col-md-4">A</div>
    <div class="col-md-4">B</div>
    <div class="col-md-4">C</div>
</div>
```

| Largeur de l'écran | Résultat |
|---|---|
| Moins de 768 px | A, B et C **empilés**, chacun sur toute la largeur |
| 768 px et plus | A, B et C **côte à côte**, un tiers chacun |

C'est exactement ce que nous écririons à la main avec une media query :
```css
.ligne { display: flex; flex-wrap: wrap; }
.colonne { width: 100%; }
@media (min-width: 48em) {
    .colonne { width: 33.333%; }
}
```

### Combiner plusieurs points de rupture

On peut cumuler plusieurs classes sur la même colonne. Le principe *mobile first* s'applique : **la valeur du plus petit écran s'étend aux plus grands**, jusqu'à ce qu'une autre classe prenne le relais.

```html
<div class="row">
    <div class="col-12 col-sm-6 col-lg-3">Bloc 1</div>
    <div class="col-12 col-sm-6 col-lg-3">Bloc 2</div>
    <div class="col-12 col-sm-6 col-lg-3">Bloc 3</div>
    <div class="col-12 col-sm-6 col-lg-3">Bloc 4</div>
</div>
```

| Écran | Largeur | Résultat |
|---|---|---|
| Moins de 576 px | `col-12` | **1 colonne** : 4 blocs empilés |
| 576 px à 991 px | `col-sm-6` | **2 colonnes** : 2 lignes de 2 blocs |
| 992 px et plus | `col-lg-3` | **4 colonnes** : 1 ligne de 4 blocs |

Ce motif (`col-12 col-sm-6 col-lg-3`) est l'un des plus courants dans les sites Bootstrap.

> **Astuce** : on peut se contenter de **deux** classes quand cela suffit. Par exemple `col-md-6` seul donne « empilé sur mobile, deux colonnes dès 768 px ». La classe `col-12` n'est utile que pour être explicite.

## Les gouttières : l'espace entre les colonnes

Une **gouttière** (*gutter*) est l'espace entre deux colonnes. Dans Bootstrap, il est créé par un `padding` horizontal sur chaque colonne, et il vaut **1,5 rem** par défaut (`0.75rem` de chaque côté).

On règle les gouttières avec les classes `g-` sur la **`.row`** :

| Classe | Effet |
|---|---|
| `g-0` | Aucune gouttière |
| `g-3` | Gouttières horizontales **et** verticales de `1rem` |
| `gx-4` | Gouttières **horizontales** seulement, de `1.5rem` |
| `gy-2` | Gouttières **verticales** seulement, de `0.5rem` |
| `g-md-5` | `3rem` à partir de 768 px |

Les valeurs vont de `0` à `5`, comme pour les marges (`1` = `0.25rem`, `2` = `0.5rem`, `3` = `1rem`, `4` = `1.5rem`, `5` = `3rem`).

```html
<div class="row g-3">
    <div class="col-md-6">Gauche</div>
    <div class="col-md-6">Droite</div>
</div>
```

Pourquoi `gy` est-il utile ? Quand les colonnes passent à la ligne ou s'empilent sur mobile, c'est lui qui crée l'espace **vertical** entre elles. Sans lui, les colonnes empilées se touchent.

C'est l'équivalent de la propriété `gap` en Flexbox ou en Grid.

## Le retour à la ligne automatique

Comme la `.row` est un conteneur flex avec `flex-wrap: wrap`, **les colonnes qui dépassent 12 passent à la ligne suivante**.

```html
<div class="row">
    <div class="col-6">1</div>
    <div class="col-6">2</div>
    <div class="col-6">3</div>   <!-- passe à la ligne -->
    <div class="col-6">4</div>
</div>
```

Cela donne deux lignes de deux colonnes. Il n'y a pas besoin d'ouvrir une nouvelle `.row` pour chaque ligne : on peut mettre autant de colonnes qu'on veut dans une même `.row`.

### Forcer un retour à la ligne

Pour forcer un retour à la ligne à un endroit précis, on insère un élément `w-100` (largeur de 100 %) entre deux colonnes :

```html
<div class="row">
    <div class="col">A</div>
    <div class="col">B</div>
    <div class="w-100"></div>   <!-- retour à la ligne -->
    <div class="col">C</div>
    <div class="col">D</div>
</div>
```

### Un nombre fixe de colonnes par ligne : `row-cols-*`

Quand on a une série d'éléments identiques (une galerie, des fiches), il est fastidieux de répéter `col-…` sur chacun. La classe `row-cols-*`, placée sur la **`.row`**, indique **combien de colonnes par ligne**.

```html
<div class="row row-cols-2 row-cols-md-3 g-3">
    <div class="col">Photo 1</div>
    <div class="col">Photo 2</div>
    <div class="col">Photo 3</div>
    <div class="col">Photo 4</div>
    <div class="col">Photo 5</div>
    <div class="col">Photo 6</div>
</div>
```

| Écran | Résultat |
|---|---|
| Moins de 768 px | **2 colonnes** par ligne (3 lignes) |
| 768 px et plus | **3 colonnes** par ligne (2 lignes) |

Les colonnes ne portent que `col`. C'est la **galerie 2 colonnes sur mobile, 3 colonnes dès 768 px** de notre TP, écrite en une ligne de classes. On peut aussi utiliser `row-cols-auto`, `row-cols-1` à `row-cols-6`, et les variantes responsives (`row-cols-lg-4`).

## L'alignement des colonnes

Comme la `.row` est un conteneur flex, les classes d'alignement correspondent aux propriétés Flexbox que nous connaissons.

### Alignement vertical

Sur la **`.row`**, `align-items-*` aligne toutes les colonnes :

| Classe | Équivalent CSS |
|---|---|
| `align-items-start` | `align-items: flex-start` (haut) |
| `align-items-center` | `align-items: center` |
| `align-items-end` | `align-items: flex-end` (bas) |

Sur **une colonne**, `align-self-*` aligne cette colonne seule :
```html
<div class="row" style="min-height: 10rem">   <!-- hauteur imposée pour l'exemple -->
    <div class="col align-self-start">En haut</div>
    <div class="col align-self-center">Au centre</div>
    <div class="col align-self-end">En bas</div>
</div>
```

> **Par défaut**, les colonnes d'une même ligne ont **la même hauteur** : c'est le comportement de `align-items: stretch`. C'est l'un des gros avantages de la grille par rapport aux anciens `float`.

### Alignement horizontal

Sur la **`.row`**, `justify-content-*` répartit les colonnes quand elles ne remplissent pas les 12 colonnes :

| Classe | Effet |
|---|---|
| `justify-content-start` | Colonnes à gauche (valeur par défaut) |
| `justify-content-center` | Colonnes centrées |
| `justify-content-end` | Colonnes à droite |
| `justify-content-between` | Espace entre les colonnes |
| `justify-content-around` | Espace autour des colonnes |
| `justify-content-evenly` | Espaces égaux |

```html
<div class="row justify-content-center">
    <div class="col-md-6">Un bloc centré, de la moitié de la largeur dès 768 px</div>
</div>
```

C'est la méthode classique pour centrer un formulaire ou un texte étroit.

## Décaler et réordonner les colonnes

### Le décalage : `offset-*`

`offset-md-2` laisse **2 colonnes vides à gauche** de l'élément (c'est une marge gauche en pourcentage).

```html
<div class="row">
    <div class="col-md-8 offset-md-2">Contenu centré : 2 vides + 8 + 2 vides</div>
</div>
```

Cet exemple donne le même résultat que `justify-content-center` avec `col-md-8`. Le décalage est plus utile quand un seul élément doit être poussé, ou pour laisser un vide entre deux colonnes (`col-md-4` puis `col-md-4 offset-md-2`).

On peut aussi pousser une colonne vers la droite avec les marges utilitaires : `ms-auto` (marge gauche automatique).

### L'ordre : `order-*`

Par défaut, les colonnes s'affichent **dans l'ordre du HTML**. Les classes `order-*` changent cet ordre **visuel**, de `order-1` à `order-5` (plus `order-first` et `order-last`).

```html
<div class="row">
    <div class="col-md-6 order-md-2">Image (en 2ᵉ position sur grand écran)</div>
    <div class="col-md-6 order-md-1">Texte (en 1ʳᵉ position sur grand écran)</div>
</div>
```

| Écran | Ordre affiché |
|---|---|
| Moins de 768 px | Image, puis texte (ordre du HTML) |
| 768 px et plus | Texte à gauche, image à droite |

> **Attention à l'accessibilité** : `order` ne change que l'**affichage**. Un lecteur d'écran et la navigation au clavier suivent toujours l'**ordre du HTML**. Il faut donc écrire le HTML dans un ordre logique, et n'utiliser `order` que pour des ajustements visuels.

## Imbriquer des grilles

On peut placer une nouvelle `.row` à l'intérieur d'une colonne. Cette ligne imbriquée repart avec **ses propres 12 colonnes**, calculées sur la largeur de la colonne parente.

```html
<div class="container">
    <div class="row">
        <div class="col-md-8">
            Colonne principale
            <div class="row">
                <div class="col-6">Sous-colonne 1</div>
                <div class="col-6">Sous-colonne 2</div>
            </div>
        </div>
        <div class="col-md-4">Colonne latérale</div>
    </div>
</div>
```

Ne mettez **pas** de `.container` dans une colonne : il suffit d'une `.row` directement dans la colonne. Et évitez d'imbriquer trop de niveaux, signe que la mise en page peut être simplifiée.

## Bootstrap, Flexbox et CSS Grid : comment s'y retrouver ?

Nous connaissons maintenant trois façons de faire des colonnes. Voici leurs correspondances.

| Besoin | CSS écrit à la main | Bootstrap |
|---|---|---|
| Deux colonnes 50/50 | `grid-template-columns: 1fr 1fr` | `.row` + `.col-6` (ou `.col`) |
| Trois colonnes égales | `repeat(3, 1fr)` | `.row` + `.col-4`, ou `.row-cols-3` |
| Proportion 7/5 | `grid-template-columns: 7fr 5fr` | `.col-7` + `.col-5` |
| Espace entre colonnes | `gap: 1rem` | `.g-3` |
| Passer en colonnes dès 768 px | `@media (min-width: 48em) { … }` | `.col-md-…` |
| Aligner au centre verticalement | `align-items: center` | `.align-items-center` |
| Centrer une colonne | `justify-content: center` | `.justify-content-center` |
| Changer l'ordre | `order: 2` | `.order-2` |

Quelques différences importantes à connaître :

| | Grille Bootstrap | CSS Grid |
|---|---|---|
| Technologie | **Flexbox** | Grid |
| Dimension gérée | Une **ligne** à la fois (horizontal), les lignes se forment par retour à la ligne | **Deux dimensions** (lignes et colonnes) |
| Largeurs | En **douzièmes** de la largeur | Libres : `fr`, `px`, `minmax()`, `auto-fit`... |
| Points de rupture | Fixes (576, 768, 992, 1200, 1400 px) | À vous de choisir |
| Zones nommées | Non | Oui (`grid-template-areas`) |
| Lignes alignées sur les mêmes colonnes | Non garanti si les largeurs varient d'une ligne à l'autre | Oui |

La grille Bootstrap est donc **plus simple, mais moins souple**. Pour une mise en page libre ou très précise, notre CSS Grid fait mieux : on a des colonnes de largeur exacte (`minmax(14rem, 1fr)`), des zones nommées, un alignement sur deux axes.

> **Bootstrap 5.3 propose aussi une grille CSS Grid**, mais elle n'est **pas activée par défaut** : elle demande de recompiler Bootstrap avec Sass (option `$enable-cssgrid`). Nous nous concentrons sur la grille standard, de loin la plus utilisée.

## Exemple complet

Voici la page d'accueil du Café Mirabelle construite avec la grille. Elle reprend les mises en page du TP : présentation en deux colonnes, histoire avec les horaires, galerie, formulaire et pied de page en colonnes.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Café Mirabelle</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr"
          crossorigin="anonymous">
</head>
<body>
    <header class="bg-dark text-white py-3">
        <div class="container">
            <div class="row align-items-center gy-2">
                <div class="col-md">
                    <p class="fs-4 fw-bold mb-0">Café Mirabelle</p>
                </div>
                <div class="col-md-auto">
                    <a class="btn btn-warning" href="#reserver">Réserver une table</a>
                </div>
            </div>
        </div>
    </header>

    <main>
        <!-- Présentation : texte à gauche, image à droite dès 768 px -->
        <section class="bg-success-subtle py-5">
            <div class="container">
                <div class="row align-items-center g-4">
                    <div class="col-md-7">
                        <h1>Un café, un gâteau, et le temps de souffler.</h1>
                        <p class="lead">Une adresse de quartier, ouverte tous les jours.</p>
                    </div>
                    <div class="col-md-5">
                        <img class="img-fluid rounded" src="images/hero-salle-800.jpg"
                             alt="La salle du café, ses tables en bois et son comptoir"
                             width="800" height="600">
                    </div>
                </div>
            </div>
        </section>

        <!-- Histoire et horaires : 8 + 4 colonnes dès 992 px -->
        <section class="py-5">
            <div class="container">
                <div class="row g-4">
                    <div class="col-lg-8">
                        <h2>Notre histoire</h2>
                        <p>Le Café Mirabelle est né d'une envie simple : un lieu où l'on prend le temps.</p>
                        <p>Tout est préparé sur place, chaque matin, avec des produits de saison.</p>
                    </div>
                    <aside class="col-lg-4">
                        <div class="border rounded p-3 bg-white">
                            <h3 class="h5">Horaires</h3>
                            <ul class="list-unstyled mb-0">
                                <li class="d-flex justify-content-between">
                                    <span>Lundi – vendredi</span> <strong>8 h – 18 h</strong>
                                </li>
                                <li class="d-flex justify-content-between">
                                    <span>Samedi</span> <strong>9 h – 19 h</strong>
                                </li>
                                <li class="d-flex justify-content-between">
                                    <span>Dimanche</span> <strong>9 h – 13 h</strong>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

        <!-- Galerie : 2 colonnes sur mobile, 3 dès 768 px -->
        <section class="bg-light py-5">
            <div class="container">
                <h2 class="mb-4">Galerie</h2>
                <div class="row row-cols-2 row-cols-md-3 g-3">
                    <div class="col"><img class="img-fluid rounded" src="images/galerie-espresso-400.jpg" alt="Un espresso sur le comptoir" width="400" height="300"></div>
                    <div class="col"><img class="img-fluid rounded" src="images/galerie-chocolat-400.jpg" alt="Un chocolat chaud et sa mousse" width="400" height="300"></div>
                    <div class="col"><img class="img-fluid rounded" src="images/galerie-tarte-400.jpg" alt="Une tarte à la mirabelle" width="400" height="300"></div>
                    <div class="col"><img class="img-fluid rounded" src="images/galerie-cookies-400.jpg" alt="Des cookies sortis du four" width="400" height="300"></div>
                    <div class="col"><img class="img-fluid rounded" src="images/galerie-comptoir-400.jpg" alt="Le comptoir et les vitrines" width="400" height="300"></div>
                    <div class="col"><img class="img-fluid rounded" src="images/galerie-terrasse-400.jpg" alt="La terrasse ensoleillée" width="400" height="300"></div>
                </div>
            </div>
        </section>

        <!-- Formulaire : champs centrés, deux champs côte à côte dès 768 px -->
        <section id="reserver" class="py-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="mb-4">Réserver une table</h2>
                        <form action="#" method="post">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label" for="nom">Nom</label>
                                    <input class="form-control" type="text" id="nom" name="nom" required autocomplete="name">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label" for="mail">E-mail</label>
                                    <input class="form-control" type="email" id="mail" name="mail" required autocomplete="email">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label" for="date">Date</label>
                                    <input class="form-control" type="date" id="date" name="date" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label" for="personnes">Personnes</label>
                                    <select class="form-select" id="personnes" name="personnes">
                                        <option>2</option>
                                        <option>4</option>
                                        <option>6</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-success" type="submit">Envoyer la demande</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Pied de page : 1 colonne, puis 2, puis 4 -->
    <footer class="bg-dark text-white py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-12 col-sm-6 col-lg-3">
                    <h2 class="h5">Le café</h2>
                    <p class="mb-0">Un café, un gâteau, et le temps de souffler.</p>
                </div>
                <div class="col-12 col-sm-6 col-lg-3">
                    <h2 class="h5">Infos pratiques</h2>
                    <address class="mb-0">12 rue des Mirabelles<br>54000 Nancy</address>
                </div>
                <div class="col-12 col-sm-6 col-lg-3">
                    <h2 class="h5">Horaires</h2>
                    <p class="mb-0">Tous les jours, de 8 h à 18 h.</p>
                </div>
                <div class="col-12 col-sm-6 col-lg-3">
                    <h2 class="h5">Plan d'accès</h2>
                    <p class="mb-0">À deux minutes de la gare.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
            crossorigin="anonymous"></script>
</body>
</html>
```

### Analyse

| Zone | Classes de grille | Comportement |
|---|---|---|
| En-tête | `col-md` + `col-md-auto`, `align-items-center`, `gy-2` | Logo et bouton empilés sur mobile ; côte à côte dès 768 px, logo qui s'étire, bouton à la largeur de son texte, centrés verticalement |
| Présentation | `col-md-7` + `col-md-5`, `g-4`, `align-items-center` | Texte au-dessus de l'image sur mobile ; côte à côte dès 768 px (7/12 et 5/12) |
| Histoire | `col-lg-8` + `col-lg-4`, `g-4` | Horaires **sous** le texte jusqu'à 992 px ; à droite au-delà (8/12 et 4/12) |
| Galerie | `row-cols-2 row-cols-md-3`, `g-3` | 2 colonnes sur mobile, 3 dès 768 px |
| Formulaire | `justify-content-center`, `col-lg-8`, puis `col-md-6` | Formulaire centré dans 8/12 dès 992 px ; champs côte à côte par deux dès 768 px |
| Pied de page | `col-12 col-sm-6 col-lg-3` | 1, puis 2, puis 4 colonnes |

On retrouve les mises en page de notre TP, obtenues **sans écrire de CSS**. Quelques remarques :

- Les proportions sont limitées aux douzièmes : le `7fr / 6fr` du TP devient ici `7 / 5`.
- Les couleurs (`bg-dark`, `bg-success-subtle`, `btn-warning`) sont celles de Bootstrap, pas celles de la charte du café. Pour les ajuster, on utilise la personnalisation vue au chapitre précédent.
- Les classes `d-flex justify-content-between` des horaires sont des **utilitaires Flexbox**, indépendants de la grille.
- Le HTML reste sémantique (`header`, `main`, `section`, `aside`, `footer`, `label`, `address`).

## Les erreurs courantes à éviter

| Erreur | Conséquence | Correction |
|---|---|---|
| Mettre des `.col` **sans `.row`** | Les colonnes ne se placent pas côte à côte | Toujours `container` > `row` > `col` |
| Mettre une `.row` **sans conteneur** | Le contenu déborde ou touche les bords de l'écran | Placer la `.row` dans un `.container` |
| Placer du contenu **directement dans la `.row`** | Les marges négatives font déborder le contenu | Le mettre dans une colonne |
| Une `.row` dans un `.container` **dans une colonne** | Marges en trop, largeur incorrecte | Une `.row` directement dans la colonne, sans nouveau conteneur |
| `col-md-6` en attendant 2 colonnes **sur mobile** | Empilé sous 768 px | Ajouter `col-6` (ou `col-sm-6`) pour avoir deux colonnes plus tôt |
| Total de colonnes supérieur à 12 sans le vouloir | Une colonne passe à la ligne | Vérifier l'addition de chaque ligne |
| Oublier `g-*` ou `gy-*` | Colonnes empilées collées les unes aux autres | Ajouter `g-3` à la `.row` |
| Utiliser le **mauvais point de rupture** | Mise en page cassée entre deux tailles | Tester à 360, 576, 768, 992 et 1200 px |
| Confondre `col-md-6` (à partir de 768 px) et `col-6` (à tous les écrans) | Colonnes écrasées sur téléphone | Toujours lire la classe comme « à partir de... » |
| Abuser de `order-*` | L'ordre à l'écran ne suit plus l'ordre de lecture | Écrire le HTML dans l'ordre logique |
| Écrire la grille avec des `style="width: 50%"` | Perte de l'intérêt de la grille, non responsive | Utiliser les classes `col-*` |
| Imbriquer de nombreux niveaux de lignes | HTML illisible | Simplifier la mise en page |

## À retenir

- La grille de Bootstrap s'écrit avec trois niveaux : **`.container` > `.row` > `.col-…`**. Les colonnes sont toujours des enfants directs d'une `.row`.
- Elle est construite avec **Flexbox** : la `.row` est un conteneur flex qui passe à la ligne, les colonnes sont des éléments flex.
- La ligne est découpée en **12 colonnes** : `col-4` occupe 4/12 (un tiers) ; `col` partage l'espace à parts égales ; `col-auto` prend la largeur de son contenu.
- Les classes **`col-md-*`** s'appliquent **à partir** d'un point de rupture (**mobile first**, `min-width`) : en dessous, les colonnes sont **empilées**. Les points de rupture sont `sm` 576, `md` 768, `lg` 992, `xl` 1200 et `xxl` 1400 px.
- On cumule les classes (`col-12 col-sm-6 col-lg-3`) pour obtenir 1, 2 puis 4 colonnes.
- Les **gouttières** se règlent sur la `.row` avec `g-*`, `gx-*` et `gy-*` ; `gy` crée l'espace vertical entre colonnes empilées.
- Les colonnes en trop **passent à la ligne** ; `row-cols-*` fixe le nombre de colonnes par ligne.
- `align-items-*` et `justify-content-*` (sur la `.row`), `align-self-*` (sur une colonne), `offset-*` et `order-*` reprennent les outils de **Flexbox**.
- `order-*` ne change que l'**affichage** : le HTML doit rester dans un ordre logique.
- On peut **imbriquer** une `.row` dans une colonne, sans nouveau conteneur.
- La grille Bootstrap est **simple et rapide**, mais limitée aux douzièmes ; pour une mise en page plus libre, **CSS Grid** reste plus puissant.

---

© Vincent Chiofalo