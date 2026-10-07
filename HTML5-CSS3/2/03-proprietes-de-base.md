# Propriétés de base : couleur, police, arrière-plan

Nous savons désormais **cibler** des éléments avec des sélecteurs et comprendre **quelle règle l'emporte**. Il est temps de découvrir les premières propriétés qui changent réellement l'apparence d'une page.

Ce chapitre présente trois familles de propriétés, utilisées dans presque toutes les feuilles de style :
- la **couleur** du texte et la gestion de la transparence ;
- la **police** et la mise en forme du texte (taille, graisse, interligne, alignement...) ;
- l'**arrière-plan** : couleur, image, dégradé.

Auparavant, il faut connaître les **valeurs** que l'on peut donner à ces propriétés : nombres, unités et couleurs.

## Les valeurs et les unités

Une propriété CSS accepte différents types de valeurs :

| Type de valeur | Exemples |
|---|---|
| Mot-clé | `bold`, `center`, `none`, `underline` |
| Nombre avec unité | `16px`, `1.5rem`, `50%` |
| Nombre seul | `1.5` (interligne), `0` |
| Couleur | `navy`, `#336699`, `rgb(51, 102, 153)` |
| Adresse d'un fichier | `url("../images/fond.jpg")` |

Quelques règles de syntaxe :
- le séparateur décimal est le **point** : `1.5rem`, jamais `1,5rem` ;
- il n'y a **pas d'espace** entre le nombre et son unité : `16px`, et non `16 px` ;
- l'**unité est obligatoire** (sauf pour `0` et pour certaines propriétés comme l'interligne) : `font-size: 16` est invalide et sera ignoré.

### Les principales unités de longueur

| Unité | Type | Elle est relative à... | Usage courant |
|---|---|---|---|
| `px` | absolue | un pixel de l'écran | détails fins |
| `em` | relative | la taille de police de l'élément (pour `font-size` : celle du parent) | espacements proportionnels au texte |
| `rem` | relative | la taille de police de la **racine** (`html`) | tailles de police, espacements |
| `%` | relative | une valeur du parent, selon la propriété | tailles, largeurs |

Par défaut, la taille de police de la racine est généralement de **16 px** dans les navigateurs : `1rem` vaut donc 16 px, `1.5rem` vaut 24 px et `0.75rem` vaut 12 px.

Les unités relatives sont préférables pour les tailles de texte : elles respectent le **réglage de taille de texte** choisi par l'utilisateur dans son navigateur. Une taille fixée en `px` ne s'adapte pas.

À savoir : `em` se **cumule** d'un niveau d'imbrication à l'autre (un élément à `0.9em` dans un autre à `0.9em` est encore plus petit), alors que `rem` repart toujours de la racine.

## La couleur

### La propriété `color`

La propriété `color` définit la couleur du **texte** d'un élément. Elle est **héritée** : une valeur posée sur `body` se transmet à tous les textes de la page.
```css
body {
    color: #222222;
}
```

Attention à ne pas la confondre : `color` concerne le texte, et `background-color` le fond. Les propriétés `text-color` ou `font-color`, souvent tentées, n'existent pas.

### Les façons d'écrire une couleur

CSS propose quatre notations principales.

**1. Les noms de couleur**

Environ 140 noms sont reconnus : `red`, `navy`, `darkgreen`, `lightgray`...
```css
h1 { color: navy; }
```

Pratiques pour tester, mais limités : on ne peut pas choisir une nuance précise.

**2. La notation hexadécimale**

Elle commence par `#` suivi de **six chiffres hexadécimaux** : deux pour le rouge, deux pour le vert, deux pour le bleu (de `00` à `ff`).
```css
h1 { color: #336699; }
```

Quand chaque paire est formée de deux chiffres identiques, on peut abréger : `#336699` s'écrit aussi `#369`.

**3. La notation `rgb()`**

Les trois composantes (rouge, vert, bleu) sont données par des nombres de 0 à 255.
```css
h1 { color: rgb(51, 102, 153); }
```

**4. La notation `hsl()`**

Elle décrit une couleur par sa **teinte** (en degrés de 0 à 360 sur le cercle des couleurs), sa **saturation** (en %) et sa **luminosité** (en %).
```css
h1 { color: hsl(210, 50%, 40%); }
```

Ces trois dernières notations représentent ici **la même couleur** :

| Notation | Valeur |
|---|---|
| Hexadécimale | `#336699` |
| RGB | `rgb(51, 102, 153)` |
| HSL | `hsl(210, 50%, 40%)` |

`hsl()` est très pratique pour fabriquer une palette : pour obtenir une version plus claire ou plus sombre de la même couleur, il suffit de modifier la luminosité sans toucher à la teinte.

### La transparence

On peut rendre une couleur **partiellement transparente** en ajoutant une composante de transparence (comprise entre `0`, invisible, et `1`, opaque), avec `rgba()` ou `hsla()` :
```css
.voile { background-color: rgba(0, 0, 0, 0.5); }   /* noir à moitié transparent */
```

Le mot-clé `transparent` désigne une couleur entièrement transparente.

Il existe aussi une propriété `opacity`, mais elle ne fonctionne pas de la même façon :
```css
.carte { opacity: 0.5; }
```

`opacity` rend **tout l'élément** transparent, y compris son texte et ses enfants. `rgba()` ne rend transparente que **la couleur concernée**. Pour un fond translucide sous un texte lisible, on utilise donc `rgba()`.

### Le contraste : un enjeu d'accessibilité

Une couleur n'est pas qu'une question de goût : le texte doit rester **lisible** pour tous, y compris pour les personnes malvoyantes ou daltoniennes, ou lorsque l'écran est consulté en plein soleil.

Les recommandations d'accessibilité (WCAG, niveau AA) fixent un **rapport de contraste minimal** entre la couleur du texte et celle du fond :
- **4,5 pour 1** pour le texte courant ;
- **3 pour 1** pour le grand texte (environ 24 px, ou 19 px en gras).

| Couleur du texte | Couleur du fond | Contraste | Lisibilité |
|---|---|---|---|
| `#222222` | `#f7f7f7` | environ 15 pour 1 | très bonne |
| `#ffffff` | `#336699` | environ 6 pour 1 | bonne |
| `#aaaaaa` | `#ffffff` | environ 2,3 pour 1 | **insuffisante** |

Pour vérifier un contraste, on peut utiliser le sélecteur de couleur des outils de développement du navigateur, qui affiche le rapport, ou un outil en ligne comme le *WebAIM Contrast Checker*.

Un autre principe : ne jamais transmettre une information **uniquement par la couleur** (par exemple signaler une erreur seulement en rouge). On ajoute toujours un autre repère : un texte, une icône, un soulignement.

## La police et le texte

### `font-family` : la famille de police

La propriété `font-family` indique une **liste de polices** par ordre de préférence. Le navigateur utilise la première qui est installée sur l'ordinateur de l'utilisateur.
```css
body {
    font-family: "Segoe UI", Arial, sans-serif;
}
```

Règles à connaître :
- un nom de police qui contient des **espaces** se met entre guillemets (`"Segoe UI"`) ;
- la liste se termine **toujours** par une **famille générique**, utilisée si aucune police de la liste n'est disponible.

| Famille générique | Description |
|---|---|
| `serif` | police avec empattements (comme Times) |
| `sans-serif` | police sans empattements (comme Arial) |
| `monospace` | police à chasse fixe, idéale pour le code (comme Courier) |
| `system-ui` | la police d'interface du système de l'utilisateur |

On peut aussi charger des **polices personnalisées** (avec `@font-face` ou un service de polices en ligne) : cela dépasse le cadre de ce cours.

### `font-size` : la taille

```css
p { font-size: 1rem; }
h1 { font-size: 2.5rem; }
```

Les titres ont déjà des tailles par défaut (le navigateur donne par exemple 2 `em` à un `<h1>`), mais on les redéfinit couramment. Le texte courant ne devrait pas descendre sous **1rem** (soit 16 px par défaut) pour rester confortable à lire.

### `font-weight` et `font-style` : graisse et style

| Propriété | Valeurs fréquentes | Effet |
|---|---|---|
| `font-weight` | `normal`, `bold`, ou un nombre de `100` à `900` | épaisseur des traits (`normal` = 400, `bold` = 700) |
| `font-style` | `normal`, `italic` | texte en italique |

```css
.note { font-weight: bold; }
.slogan { font-style: italic; }
```

### `line-height` : l'interligne

`line-height` règle la **hauteur d'une ligne** de texte. On lui donne en général un nombre **sans unité**, qui est un multiple de la taille de police :
```css
body { line-height: 1.5; }
```

Pour du texte courant, une valeur entre `1.4` et `1.6` améliore nettement la lisibilité.

### Alignement et décoration du texte

| Propriété | Valeurs fréquentes | Effet |
|---|---|---|
| `text-align` | `left`, `right`, `center`, `justify` | alignement horizontal du texte |
| `text-decoration` | `none`, `underline`, `line-through` | soulignement, texte barré |
| `text-transform` | `uppercase`, `lowercase`, `capitalize` | changement de casse à l'affichage |
| `letter-spacing` | `0.05em`... | espacement entre les lettres |

```css
h1 { text-align: center; text-transform: uppercase; }
```

⚠️ Deux précautions :
- le texte **justifié** (`justify`) peut créer de grands espaces irréguliers entre les mots : il est déconseillé pour les colonnes étroites ;
- on **ne retire pas le soulignement des liens** sans le remplacer par un autre repère visible : c'est lui qui permet de reconnaître un lien dans un texte, notamment pour les personnes daltoniennes.

### Propriétés héritées

Presque toutes les propriétés de cette section (`color`, `font-family`, `font-size`, `font-weight`, `font-style`, `line-height`, `text-align`...) sont **héritées**. On les définit donc une fois pour toutes sur `body`, puis on ne modifie que les exceptions :
```css
body {
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
}
```

### Le raccourci `font`

La propriété `font` permet de regrouper plusieurs déclarations :
```css
p {
    font: italic bold 1rem/1.5 "Segoe UI", Arial, sans-serif;
}
```

L'ordre est : style, graisse, taille, `/`, interligne, famille. La **taille** et la **famille** sont obligatoires. Attention : un raccourci **réinitialise** les valeurs que l'on n'a pas indiquées. Pour débuter, on préfère écrire les propriétés séparément.

## L'arrière-plan

### `background-color` : une couleur de fond

```css
header { background-color: #336699; }
```

La valeur par défaut est `transparent`. Cette propriété n'est **pas héritée** : un élément semble parfois avoir le fond de son parent, simplement parce que le sien est transparent.

### `background-image` : une image de fond

```css
body {
    background-image: url("../images/motif.png");
}
```

⚠️ Le chemin d'une `url()` dans une feuille de style est **relatif à la feuille de style**, et non à la page HTML. Si le fichier CSS se trouve dans le dossier `css/`, il faut remonter d'un niveau avec `../` pour atteindre le dossier `images/`. Les règles d'écriture des chemins sont celles que nous avons déjà vues pour les liens.

Une image de fond est **purement décorative** : elle n'a pas de texte alternatif et n'est pas annoncée par les lecteurs d'écran. Une image qui porte une information (un schéma, un logo cliquable) doit donc rester une balise `<img>` avec un `alt`.

### Contrôler l'image de fond

Par défaut, une image de fond est **répétée** pour remplir tout l'élément. Plusieurs propriétés permettent d'ajuster ce comportement :

| Propriété | Valeurs fréquentes | Effet |
|---|---|---|
| `background-repeat` | `repeat`, `no-repeat`, `repeat-x`, `repeat-y` | répétition de l'image |
| `background-position` | `center`, `top left`, `50% 50%`... | emplacement de l'image |
| `background-size` | `auto`, `cover`, `contain`, `200px` | taille de l'image |

Les deux valeurs de `background-size` les plus utiles :
- `cover` : l'image **couvre** tout l'élément, quitte à être rognée ;
- `contain` : l'image est **entièrement visible**, quitte à laisser des vides.
```css
.banniere {
    background-image: url("../images/montagne.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
```

### Les dégradés

Un **dégradé** se déclare comme une image de fond, grâce à la fonction `linear-gradient()` :
```css
header {
    background-image: linear-gradient(to right, #336699, #1f4068);
}
```

On indique la **direction** (`to right`, `to bottom`, ou un angle comme `90deg`), puis au moins **deux couleurs**. Un dégradé est généré par le navigateur : il ne nécessite aucun fichier image.

### Le raccourci `background`

Comme pour les polices, un raccourci permet de regrouper plusieurs propriétés :
```css
.banniere {
    background: #336699 url("../images/montagne.jpg") no-repeat center / cover;
}
```

La position et la taille se séparent par un `/`. Le raccourci réinitialise lui aussi les valeurs non précisées.

### Garder le texte lisible sur un fond

Quand du texte est posé sur une image ou un dégradé, on veille à ce que le contraste reste suffisant **sur toute la surface**. Deux précautions simples :
- toujours prévoir une `background-color` proche de l'image, qui s'affichera si celle-ci ne se charge pas ;
- choisir un texte nettement plus clair ou plus sombre que les zones de l'image situées derrière lui.

## Une méthode simple pour poser le style de base d'une page

**1. Définir le texte de base sur `body`**

Famille de police, taille, interligne et couleur : tout le reste de la page en héritera.

**2. Choisir une petite palette**

Deux ou trois couleurs principales (par exemple une couleur de marque, une couleur d'accent), plus des neutres pour le texte et les fonds. Mieux vaut peu de couleurs, bien utilisées.

**3. Vérifier les contrastes**

Chaque combinaison texte/fond doit respecter le rapport de contraste minimal.

**4. Ajuster les titres, les liens et les zones particulières**

On ne redéfinit que ce qui diffère du style de base (tailles des titres, couleur des liens, fond de l'en-tête...).

## Exemple complet

Voici une page et sa feuille de style qui mettent en œuvre les propriétés du chapitre. On y utilise aussi `margin` et `padding`, qui seront expliquées dans le chapitre sur le modèle de boîte : ici, `margin: 0` supprime la marge par défaut autour de la page et `padding` crée un espace à l'intérieur d'un élément.

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

    <header class="entete">
        <h1>Club informatique</h1>
        <p class="slogan">Apprendre, créer, partager</p>
    </header>

    <main>
        <article>
            <h2>Atelier du mercredi</h2>
            <p>
                Chaque mercredi, nous découvrons <strong>HTML</strong>
                et <em>CSS</em> en pratiquant.
            </p>
            <p class="note">Apportez votre ordinateur portable.</p>
            <p><a href="contact.html">S'inscrire à l'atelier</a></p>
        </article>
    </main>

    <footer>
        <p>© 2026 Club informatique</p>
    </footer>

</body>

</html>
```

**css/style.css**
```css
/* Style de base : hérité par toute la page */
body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* En-tête : dégradé de fond et texte clair */
.entete {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

.slogan {
    font-style: italic;
}

h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

.note {
    font-weight: bold;
    color: darkred;
}

a {
    color: #0b5cad;
}

/* Pied de page : fond sombre et texte clair */
footer {
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}
```

**Analyse : d'où vient le style de chaque élément ?**

| Élément | Propriétés visibles | Origine |
|---|---|---|
| `<h1>` | texte blanc, centré, taille 2,5 rem, police du `body` | blanc et centrage **hérités** de `.entete` ; taille propre ; police héritée du `body` |
| `<p class="slogan">` | texte blanc, italique, centré | couleur et alignement **hérités** de `.entete` ; italique par sa propre règle |
| `<h2>` | bleu foncé, taille 1,75 rem | règle `h2` |
| `<strong>` dans le paragraphe | gras, couleur `#222222` | gras par défaut du navigateur ; couleur **héritée** de `body` |
| `<p class="note">` | gras, rouge foncé | règle `.note` |
| `<a>` | bleu `#0b5cad`, souligné | couleur de la règle `a` ; soulignement par défaut du navigateur, conservé volontairement |
| `<footer>` | fond sombre, texte clair, centré | règle `footer` |

Les contrastes de cette page respectent les recommandations : texte blanc sur l'en-tête (environ 6 pour 1 à 10 pour 1 selon l'endroit du dégradé), texte foncé sur le fond clair (environ 15 pour 1), liens bleus sur fond clair (environ 6 pour 1).

## Les erreurs courantes à éviter

- **inventer des noms de propriétés** (`text-color`, `font-color`, `bg-color`) : elles sont ignorées sans message d'erreur ;
- **oublier l'unité** (`font-size: 16`) ou **insérer un espace** (`16 px`) ;
- **utiliser une virgule décimale** (`1,5rem` au lieu de `1.5rem`) ;
- **ne pas mettre de guillemets** autour d'un nom de police contenant des espaces ;
- **oublier la famille générique** à la fin d'une liste de polices ;
- **écrire un chemin d'image relatif à la page HTML** dans une `url()`, au lieu de le calculer depuis la feuille de style ;
- **utiliser `opacity` pour un fond translucide**, ce qui rend aussi le texte transparent ;
- **choisir des couleurs trop peu contrastées**, par exemple un gris clair sur fond blanc ;
- **transmettre une information par la seule couleur** ;
- **supprimer le soulignement des liens** sans autre repère ;
- **placer une information importante dans une image de fond**, qui n'a pas de texte alternatif ;
- **fixer des tailles de texte en `px`** partout, au risque d'ignorer le réglage de l'utilisateur.

## À retenir

Les propriétés de base permettent de contrôler la **couleur**, la **typographie** et l'**arrière-plan**.

```
COULEUR       color                  → couleur du texte (héritée)
POLICE        font-family            → liste de polices, terminée par une famille générique
              font-size              → taille (de préférence en rem)
              font-weight / style    → graisse / italique
              line-height            → interligne (nombre sans unité)
TEXTE         text-align             → alignement
              text-decoration        → soulignement, barré
              text-transform         → majuscules, minuscules
ARRIÈRE-PLAN  background-color       → couleur de fond (non héritée)
              background-image       → image ou dégradé
              background-repeat / position / size
```

Les règles essentielles :
- une valeur numérique s'écrit avec un **point décimal** et une **unité collée** au nombre (sauf `0`) ;
- `rem` est relatif à la taille de police de la racine (16 px par défaut), `em` à celle de l'élément ou du parent, `px` est fixe ;
- une couleur s'écrit par son **nom**, en **hexadécimal**, en `rgb()` ou en `hsl()` ; `rgba()` et `hsla()` ajoutent la transparence ;
- `opacity` rend tout l'élément transparent, contrairement à `rgba()` qui ne concerne que la couleur ;
- le **contraste** entre texte et fond doit atteindre au moins 4,5 pour 1 pour le texte courant ;
- on ne transmet jamais une information par la couleur seule ;
- `font-family` est une liste de secours qui se termine par une famille générique (`serif`, `sans-serif`, `monospace`, `system-ui`) ;
- les propriétés du texte sont **héritées** : on les pose une fois sur `body` ;
- `background-color` n'est pas héritée ; le chemin d'une `url()` se calcule **à partir de la feuille de style** ;
- une image de fond est décorative ; une image qui porte une information reste une balise `<img>` avec un `alt` ;
- les raccourcis (`font`, `background`) réinitialisent les valeurs omises : on les utilise avec prudence.

## Liens utiles

**Documentations** :
- https://developer.mozilla.org/fr/docs/Web/CSS

## À vous

Il est temps de passer à la pratique. Allez dans le dossier [exercices](exercices/01-erreurs.md) et faites les exercices 01 et 02 dans l'ordre (le lien vous amène sur le premier exercice).

---

© Vincent Chiofalo