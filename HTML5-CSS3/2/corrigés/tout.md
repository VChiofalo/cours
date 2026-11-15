# TD de CSS — énoncés et corrigés

Les six TD de la partie CSS, réunis dans l'ordre. Pour chacun : l'énoncé, puis le corrigé (réservé à l'enseignant).

## Sommaire

1. TD 2 — Couleur, police et arrière-plan
2. TD 3 — Le modèle de boîte
3. TD 4 — Le positionnement
4. TD 5 — Flexbox
5. TD 5 bis — Bonus Grid
6. TD 6 — Rendre le mini-site responsive


---

## TD 2 — Couleur, police et arrière-plan

### Énoncé

#### Objectifs

À la fin de ce TD, vous saurez :
- convertir des tailles (`px`, `rem`) et des couleurs (hexadécimal, `rgb()`, `hsl()`) ;
- repérer et corriger les erreurs classiques dans une feuille de style ;
- évaluer le **contraste** entre un texte et son fond ;
- mettre en forme une page existante avec les propriétés de couleur, de police et d'arrière-plan.

> Les exercices 1 à 3 peuvent se faire **sur papier**. L'exercice 4 se fait **sur ordinateur**, à partir de la page de présentation créée lors du premier TP.

#### Aide-mémoire

| Famille | Propriétés utiles dans ce TD |
|---|---|
| Couleur | `color`, `rgba()` |
| Police et texte | `font-family`, `font-size`, `font-style`, `line-height`, `text-align`, `letter-spacing` |
| Arrière-plan | `background-color`, `background-image`, `linear-gradient()`, `background-size`, `background-position` |
| À connaître déjà | `padding` (espace à l'intérieur d'un élément) et `margin` (espace autour) : ils seront étudiés plus tard, leurs valeurs vous sont indiquées |

#### Planning

| N° | Exercice | Durée | Niveau |
|---|---|---|---|
| 1 | Unités et couleurs | 10 min | ⭐ |
| 2 | Chasse aux erreurs CSS | 10 min | ⭐⭐ |
| 3 | Contraste et lisibilité | 10 min | ⭐⭐ |
| 4 | Mettre en forme ma page de présentation | 30 min | ⭐⭐⭐ |

---

#### Exercice 1 — Unités et couleurs (10 min)

##### A. Tailles

La taille de police de la racine est de 16 px (valeur par défaut des navigateurs). Complétez :

| Valeur | Équivalent |
|---|---|
| `1rem` | ... px |
| `1.5rem` | ... px |
| `0.75rem` | ... px |
| `2.5rem` | ... px |
| `20px` | ... rem |
| `28px` | ... rem |

**Question.** Un utilisateur règle la taille de texte de son navigateur sur 20 px. Que devient une taille écrite `1.5rem` ? Et une taille écrite `24px` ?

##### B. Couleurs

Un nombre de 0 à 255 s'écrit en hexadécimal avec **deux chiffres** : on utilise les chiffres de 0 à 9, puis les lettres `a` à `f` (a = 10, b = 11, c = 12, d = 13, e = 14, f = 15). Le premier chiffre vaut 16 fois sa valeur. Par exemple, `ff` = 15 × 16 + 15 = 255.

Quelques repères : 51 s'écrit `33`, 102 s'écrit `66` et 153 s'écrit `99`.

Complétez :

| Hexadécimal | `rgb()` |
|---|---|
| `#ff0000` | |
| `#000080` | |
| `#369` | |
| | `rgb(255, 165, 0)` |
| | `rgb(128, 128, 128)` |

> Vous pouvez vérifier vos réponses avec le sélecteur de couleur des outils de développement : un clic sur le carré de couleur d'une déclaration, combiné à la touche `Maj`, change le format d'affichage.

##### C. Nuances

La couleur `hsl(210, 50%, 40%)` est un bleu moyen. Écrivez, avec la même notation, une version **plus claire** de ce bleu. Quelle valeur avez-vous modifiée, et pourquoi ?

---

#### Exercice 2 — Chasse aux erreurs CSS (10 min)

La feuille de style suivante est enregistrée dans le dossier `css/` d'un site. Les images sont dans le dossier `images/`. Elle contient **10 erreurs** (syntaxe, valeurs, bonnes pratiques). Repérez-les, expliquez-les et écrivez la version corrigée.

```css
body {
    font-family: Segoe UI, Arial;
    font-size: 16;
    line-height: 1,5;
    text-color: #222222;
    background-color: #f7f7f7
    margin: 0;
}

h1 {
    color: #33669;
    font-size: 2.5 rem;
    text-align: centre;
}

/* Motif de fond pour l'en-tête */
header {
    background-image: url("images/motif.png");
}

/* Carte au fond blanc légèrement translucide, texte bien lisible */
.carte {
    background-color: #ffffff;
    opacity: 0.8;
}
```

---

#### Exercice 3 — Contraste et lisibilité (10 min)

Les recommandations d'accessibilité demandent un contraste d'au moins :
- **4,5 pour 1** pour le texte courant ;
- **3 pour 1** pour le grand texte (environ 24 px, ou 19 px en gras).

Mesurez le contraste de chaque combinaison (avec le sélecteur de couleur des outils de développement ou un outil en ligne de vérification de contraste), puis indiquez si elle convient.

| N° | Couleur du texte | Couleur du fond | Contraste | Texte courant (≥ 4,5) | Grand texte (≥ 3) |
|---|---|---|---|---|---|
| 1 | `#222222` | `#f7f7f7` | | | |
| 2 | `#ffffff` | `#336699` | | | |
| 3 | `#aaaaaa` | `#ffffff` | | | |
| 4 | `#777777` | `#ffffff` | | | |
| 5 | `#ff0000` | `#ffffff` | | | |
| 6 | `#ffffff` | `#ff6600` | | | |

**Questions**
1. Quelles combinaisons faut-il écarter pour un paragraphe ordinaire ? Lesquelles pourraient être acceptées pour un titre de grande taille ?
2. Sur un formulaire, une erreur est signalée uniquement par un texte écrit en rouge. Quel problème cela pose-t-il ? Comment l'améliorer ?

---

#### Exercice 4 — Mettre en forme ma page de présentation (30 min)

Vous allez donner une identité visuelle à la page de présentation créée lors du premier TP. Vous pouvez utiliser **votre propre version**, ou le fichier de départ ci-dessous. Si vos noms de classes ou d'identifiants sont différents, adaptez les sélecteurs.

##### Fichier de départ : index.html

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Camille Martin — Étudiante en informatique</title>
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
        </section>

        <section>
            <h2>Mes centres d'intérêt</h2>

            <article class="carte">
                <h3>Le jeu vidéo</h3>
                <p>J'aime les jeux de stratégie et d'aventure.</p>
            </article>

            <article class="carte">
                <h3>La photographie</h3>
                <p>Je photographie surtout des paysages.</p>
            </article>
        </section>

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

##### Palette à utiliser

| Rôle | Couleur |
|---|---|
| Texte | `#222222` |
| Fond de page | `#f7f7f7` |
| Couleur principale | `#336699` |
| Couleur sombre | `#1f4068` |
| Liens | `#0b5cad` |
| Fond clair | `#e8eef5` |
| Blanc | `#ffffff` |

##### Étape 0 — Relier la feuille de style (3 min)

Organisez votre dossier ainsi :
```
mon-site/
├── index.html
├── contact.html
├── css/
│   └── style.css
└── images/
    └── portrait.jpg
```

Créez le fichier `css/style.css`, puis reliez-le aux **deux pages** (`index.html` et `contact.html`) dans leur `<head>`. Vérifiez le chemin à écrire.

##### Étape 1 — Le style de base (5 min)

Dans `style.css`, écrivez une règle pour la page entière avec :
- la police : `system-ui`, puis `"Segoe UI"`, puis `Arial`, puis une famille générique adaptée ;
- une taille de `1rem` et un interligne de `1.5` ;
- la couleur de texte et la couleur de fond de la palette ;
- `margin: 0`.

##### Étape 2 — L'en-tête (7 min)

Pour l'élément `<header>` :
- un fond en **dégradé horizontal** de la couleur principale vers la couleur sombre ;
- un texte blanc, centré ;
- `padding: 1rem`.

Puis :
- mettez l'accroche en italique ;
- donnez au titre `<h1>` une taille de `2.5rem` et un espacement des lettres de `0.05em`.

##### Étape 3 — Les titres (5 min)

- `<h2>` : taille `1.75rem`, couleur sombre de la palette ;
- `<h3>` : taille `1.25rem`, couleur principale.

##### Étape 4 — La navigation et les liens (5 min)

- donnez à la navigation le fond clair de la palette, avec `padding: 0.5rem 1rem` ;
- donnez aux liens la couleur prévue pour les liens. Conservez leur soulignement.

##### Étape 5 — Les cartes et la zone « Liens utiles » (5 min)

- les cartes (`.carte`) : fond blanc, `padding: 1rem` ;
- la zone `<aside>` : fond de la couleur principale **avec seulement 10 % d'opacité**, `padding: 1rem`.

**Question.** Pourquoi utilise-t-on `rgba()` et non la propriété `opacity` pour l'`<aside>` ?

##### Étape 6 — Le pied de page (3 min)

- fond de la couleur la plus sombre (celle du texte) ;
- texte de la couleur du fond de page, centré ;
- `padding: 1rem`.

##### Étape 7 — Vérifications (7 min)

1. Rafraîchissez **les deux pages** : l'en-tête et le pied de page doivent être cohérents.
2. Avec le sélecteur de couleur des outils de développement, vérifiez le **contraste** de chaque texte avec son fond. **Un élément pose problème** : trouvez-le et corrigez-le.
3. Dans votre feuille de style, ajoutez temporairement `html { font-size: 20px; }`. Que se passe-t-il pour les tailles écrites en `rem` ? Supprimez ensuite cette règle.
4. Où avez-vous défini la police de la page ? Pourquoi n'a-t-elle pas été nécessaire de la répéter pour les titres, les paragraphes et les éléments de liste ?

##### Pour aller plus loin

- Remplacez le dégradé de l'en-tête par une **image de fond** (`../images/banniere.jpg`) qui couvre tout l'en-tête (`cover`) et reste centrée. Prévoyez une couleur de repli et vérifiez que le texte reste lisible.
- Remplacez `rgba()` par `opacity: 0.1` sur l'`<aside>` : qu'observez-vous ?
- Testez d'autres combinaisons de couleurs en modifiant la luminosité d'une valeur `hsl()`.

### Corrigé (enseignant)

#### Conseils d'animation

- **Rythme conseillé** : 10 min (ex. 1), 10 min (ex. 2), 10 min (ex. 3), 30 min (ex. 4), soit 1 h. Les exercices 1 à 3 peuvent être faits sur papier ou à l'oral, puis corrigés collectivement en quelques minutes chacun, ce qui laisse du temps à l'exercice 4.
- **Si le groupe est en retard** : l'exercice 3 peut être fait collectivement, et les étapes 5 et 6 de l'exercice 4 peuvent être omises ou fournies.
- **Si le groupe est en avance** : proposer la partie « Pour aller plus loin » de l'exercice 4.
- **Pour l'exercice 4**, chaque élève part de la page du premier TP : leurs noms de classes ou d'identifiants peuvent différer de ceux du fichier de départ. Le corrigé utilise des sélecteurs d'éléments (`header`, `nav`, `footer`...) qui fonctionnent sur les deux pages sans dépendre des noms choisis.
- **Difficultés fréquemment rencontrées** :
  - chemin du `<link>` incorrect (`css/style.css` depuis la racine) ou oubli de relier `contact.html` ;
  - `background-color: linear-gradient(...)` : un dégradé est une **image**, il faut `background-image` ;
  - texte blanc d'en-tête invisible car la couleur est posée sur le mauvais élément ;
  - unité oubliée ou virgule décimale dans une valeur ;
  - page non rafraîchie ou fichier non enregistré.

---

#### Exercice 1 — Unités et couleurs

##### A. Tailles

| Valeur | Équivalent |
|---|---|
| `1rem` | 16 px |
| `1.5rem` | 24 px |
| `0.75rem` | 12 px |
| `2.5rem` | 40 px |
| `20px` | 1,25 rem |
| `28px` | 1,75 rem |

**Question.** Avec une taille de texte réglée à 20 px dans le navigateur, `1.5rem` devient **30 px** (1,5 × 20) : l'unité `rem` suit le réglage de l'utilisateur. Une taille écrite `24px` reste à **24 px** : une taille en pixels ignore ce réglage. C'est pourquoi on préfère `rem` pour les tailles de texte.

##### B. Couleurs

| Hexadécimal | `rgb()` |
|---|---|
| `#ff0000` | `rgb(255, 0, 0)` |
| `#000080` | `rgb(0, 0, 128)` |
| `#369` | `rgb(51, 102, 153)` (`#369` s'écrit `#336699`) |
| `#ffa500` | `rgb(255, 165, 0)` |
| `#808080` | `rgb(128, 128, 128)` |

Détails des conversions :
- `80` en hexadécimal vaut 8 × 16 = 128 ;
- `a5` vaut 10 × 16 + 5 = 165 ;
- `#369` est l'abréviation de `#336699` : chaque chiffre est doublé.

##### C. Nuances

On modifie la **luminosité** (troisième valeur) : par exemple `hsl(210, 50%, 70%)`. La teinte (210°) et la saturation (50 %) restent identiques : c'est le même bleu, simplement plus clair. C'est l'intérêt de `hsl()` pour construire une palette de nuances d'une même couleur.

---

#### Exercice 2 — Chasse aux erreurs CSS

##### Les 10 erreurs

| N° | Erreur | Correction |
|---|---|---|
| 1 | `font-family` : nom de police à espaces sans guillemets, et **aucune famille générique** de secours | `"Segoe UI", Arial, sans-serif` |
| 2 | `font-size: 16;` : unité manquante | `16px` ou, de préférence, `1rem` |
| 3 | `line-height: 1,5;` : virgule décimale | `1.5` |
| 4 | `text-color` : propriété inexistante | `color` |
| 5 | `background-color: #f7f7f7` : **point-virgule manquant**, ce qui invalide cette déclaration et la suivante (`margin`) | ajouter `;` |
| 6 | `color: #33669;` : 5 chiffres hexadécimaux | 6 chiffres : `#336699` |
| 7 | `font-size: 2.5 rem;` : espace entre le nombre et l'unité | `2.5rem` |
| 8 | `text-align: centre;` : mot-clé en français | `center` |
| 9 | `url("images/motif.png")` : le chemin doit se calculer **depuis la feuille de style** (dans `css/`) | `url("../images/motif.png")` |
| 10 | `opacity: 0.8` rend aussi le **texte** de la carte transparent | `background-color: rgba(255, 255, 255, 0.8)` |

##### Version corrigée
```css
body {
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
    margin: 0;
}

h1 {
    color: #336699;
    font-size: 2.5rem;
    text-align: center;
}

/* Motif de fond pour l'en-tête */
header {
    background-image: url("../images/motif.png");
}

/* Carte au fond blanc légèrement translucide, texte bien lisible */
.carte {
    background-color: rgba(255, 255, 255, 0.8);
}
```

**Remarque** : pour l'erreur 1, un nom de police à plusieurs mots écrit sans guillemets est accepté par les navigateurs. La convention du cours (guillemets) et surtout la famille générique de secours sont les points à faire retenir.

---

#### Exercice 3 — Contraste et lisibilité

| N° | Texte | Fond | Contraste | Texte courant (≥ 4,5) | Grand texte (≥ 3) |
|---|---|---|---|---|---|
| 1 | `#222222` | `#f7f7f7` | 14,85 | oui | oui |
| 2 | `#ffffff` | `#336699` | 6,0 | oui | oui |
| 3 | `#aaaaaa` | `#ffffff` | 2,32 | **non** | **non** |
| 4 | `#777777` | `#ffffff` | 4,48 | **non** (de très peu) | oui |
| 5 | `#ff0000` | `#ffffff` | 4,0 | **non** | oui |
| 6 | `#ffffff` | `#ff6600` | 2,94 | **non** | **non** (de très peu) |

Les valeurs données par les outils de vérification peuvent varier légèrement dans les décimales ; l'important est de se situer par rapport aux seuils.

##### Questions

1. Pour un paragraphe ordinaire, on écarte les combinaisons **3, 4, 5 et 6**. Les combinaisons **4 et 5** pourraient convenir pour un titre de grande taille, mais pas les combinaisons 3 et 6. La combinaison 4 est un bon exemple de piège : le gris `#777777` semble lisible, mais il est juste sous le seuil.
2. Une erreur signalée **uniquement par la couleur** n'est pas perçue par une personne daltonienne ou malvoyante, ni dans un contexte où l'écran est mal lisible. De plus, le rouge pur `#ff0000` sur fond blanc n'atteint pas le contraste minimal pour du texte courant. On améliore en ajoutant un autre repère (un **texte explicite** comme « Erreur : l'adresse e-mail est incomplète », une **icône**, un soulignement) et en choisissant un rouge plus foncé, par exemple `darkred`, dont le contraste sur blanc est très largement suffisant (environ 9 pour 1 sur fond `#f7f7f7`).

---

#### Exercice 4 — Mettre en forme ma page de présentation

##### Étape 0 — Relier la feuille de style

Dans `index.html` et dans `contact.html`, qui sont à la racine du site, on écrit dans le `<head>` :
```html
<link rel="stylesheet" href="css/style.css">
```

Les deux pages étant dans le même dossier que le dossier `css/`, le chemin est identique dans les deux fichiers.

##### Proposition de corrigé : css/style.css
```css
/* ===== Style de base : hérité par toute la page ===== */
body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

/* ===== Cartes et zone "Liens utiles" ===== */
.carte {
    padding: 1rem;
    background-color: #ffffff;
}

aside {
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
}

/* ===== Pied de page ===== */
footer {
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

/* Correction de contraste : lien dans le pied de page */
footer a {
    color: #cfe3ff;
}
```

##### Réponses aux questions

**Étape 5 : `rgba()` ou `opacity` ?**

`rgba()` ne rend transparente que **la couleur de fond**. `opacity` rendrait transparent **tout l'élément**, c'est-à-dire aussi son titre, son texte et ses liens : avec `opacity: 0.1`, le contenu de la zone deviendrait quasiment invisible.

**Étape 7, question 2 : l'élément qui pose problème**

Le lien « Me contacter par e-mail » du **pied de page** : il reçoit la couleur des liens (`#0b5cad`) sur un fond très sombre (`#222222`). Le contraste n'est que d'environ **2,4 pour 1**, très inférieur au minimum de 4,5. On le corrige avec une règle spécifique au pied de page, par exemple `footer a { color: #cfe3ff; }` (environ 12 pour 1).

Contrastes des autres combinaisons de la page, pour contrôle :

| Texte | Fond | Contraste |
|---|---|---|
| texte courant `#222222` | `#f7f7f7` | environ 14,9 |
| texte blanc de l'en-tête | `#336699` (début du dégradé) | environ 6,0 |
| texte blanc de l'en-tête | `#1f4068` (fin du dégradé) | environ 10,5 |
| titres `h2` `#1f4068` | `#f7f7f7` | environ 9,8 |
| titres `h3` `#336699` | `#ffffff` | environ 6,0 |
| liens `#0b5cad` | `#f7f7f7` | environ 6,2 |
| liens dans la navigation | `#e8eef5` | environ 5,7 |
| liens dans l'`aside` | environ `#e3e8ee` (fond translucide mélangé au fond de page) | environ 5,5 |
| lien du pied de page, après correction | `#222222` | environ 12,2 |

**Étape 7, question 3 : `html { font-size: 20px; }`**

Toutes les tailles exprimées en `rem` sont recalculées à partir de 20 px au lieu de 16 px : les textes grossissent de 25 %, et aussi les `padding` écrits en `rem`. Cela illustre pourquoi `rem` permet de s'adapter au réglage de l'utilisateur.

**Étape 7, question 4 : la police de la page**

Elle est définie **une seule fois, sur `body`**. Les propriétés comme `font-family`, `font-size`, `line-height` et `color` sont **héritées** : les titres, paragraphes et éléments de liste les reçoivent de leurs ancêtres. Seuls les éléments qui ont besoin d'une valeur différente (les titres par exemple, pour leur taille) possèdent leur propre règle.

##### Réponses : « Pour aller plus loin »

- **Image de fond dans l'en-tête** :
  ```css
  header {
      background-color: #336699;
      background-image: url("../images/banniere.jpg");
      background-size: cover;
      background-position: center;
  }
  ```
  La couleur de repli s'affiche si l'image n'est pas chargée. Le chemin part du fichier `css/style.css`, d'où le `../`. Si l'image est claire ou chargée, il faut vérifier le contraste du texte blanc sur toute la surface visible.
- **`opacity: 0.1` sur l'`aside`** : le fond, mais aussi tout le texte et les liens deviennent presque invisibles.
- **Variations avec `hsl()`** : pour obtenir une nuance plus claire ou plus sombre d'une même couleur, on ne modifie que la troisième valeur (la luminosité).

##### Points d'attention lors de la correction

- Vérifier que les deux pages sont bien reliées à la feuille de style.
- Vérifier que le dégradé est écrit dans `background-image` et non dans `background-color`.
- Vérifier que le texte blanc est posé sur le conteneur sombre (`header`) et non sur la page entière.
- Vérifier que les tailles de texte sont en `rem` et que la police se termine par une famille générique.
- Vérifier que le contraste du lien dans le pied de page a bien été corrigé.

---

## TD 3 — Le modèle de boîte

### Énoncé

#### Objectifs

À la fin de ce TD, vous saurez :
- calculer la taille réelle d'une boîte (`content-box` et `border-box`) ;
- lire le modèle de boîte d'un élément dans les outils de développement ;
- utiliser `padding`, `border`, `margin` et `display` pour organiser l'espace ;
- centrer un bloc et limiter sa largeur ;
- repérer les effets de la fusion des marges.

> Ce TD prolonge le **TD 2** : vous repartez des fichiers `index.html`, `contact.html` et `css/style.css`. Si vous n'avez pas terminé le TD 2, utilisez les fichiers de départ fournis en **annexe**.
>
> Les exercices 1 et 2 peuvent se faire sur papier (l'exercice 2 nécessite l'inspecteur du navigateur). L'exercice 3 se fait sur ordinateur.

#### Aide-mémoire

| Notion | Rappel |
|---|---|
| Taille réelle (`content-box`) | `width` + padding gauche et droite + bordures gauche et droite |
| Taille réelle (`border-box`) | `width` (le padding et la bordure sont pris à l'intérieur) |
| Raccourcis à 2 valeurs | vertical, puis horizontal |
| Raccourcis à 3 valeurs | haut, puis horizontal, puis bas |
| Raccourcis à 4 valeurs | haut, droite, bas, gauche |
| Marges verticales adjacentes | elles **fusionnent** : la plus grande l'emporte |
| Élément en ligne | ignore `width`, `height` et les marges verticales |

#### Planning

| N° | Exercice | Durée | Niveau |
|---|---|---|---|
| 1 | Calculer des boîtes | 10 min | ⭐⭐ |
| 2 | Inspecter les boîtes de ma page | 10 min | ⭐⭐ |
| 3 | Mettre en page mon mini-site | 35 min | ⭐⭐⭐ |

---

#### Exercice 1 — Calculer des boîtes (10 min)

##### A. Taille d'une boîte

Soit la règle suivante, appliquée à un élément de bloc :
```css
.a {
    width: 200px;
    padding: 10px;
    border: 2px solid #336699;
    margin: 15px;
}
```

Complétez le tableau pour les deux modes de calcul :

| | `content-box` (par défaut) | `border-box` |
|---|---|---|
| Largeur de la zone de contenu | | |
| Largeur visible de la boîte (bordures comprises) | | |
| Place occupée en largeur (marges comprises) | | |

##### B. Largeur automatique

Un élément de bloc, sans `width` (donc en `auto`), est placé dans un parent dont la zone de contenu fait **600 px** de large. Il possède :
```css
.b {
    margin: 0 20px;
    padding: 10px;
    border: 1px solid #336699;
}
```

Quelle est la largeur de sa zone de contenu ? Quelle est sa largeur visible ? Le résultat dépend-il de `box-sizing` ?

##### C. Débordement

Dans un parent de 500 px de large, un élément a `width: 100%` et `padding: 20px`, sans bordure.

- Quelle est sa largeur visible en `content-box` ? De combien déborde-t-il ?
- Et en `border-box` ?

##### D. Raccourcis et marges

1. Écrivez les quatre valeurs (haut, droite, bas, gauche) correspondant à `padding: 8px 16px 24px;`, puis à `margin: 0 auto;`.
2. Deux paragraphes se suivent. Le premier a `margin-bottom: 24px`, le second `margin-top: 16px`. Quel est l'espace qui les sépare ?
3. Un lien `<a>` reçoit `width: 200px` et `margin-top: 20px`, mais rien ne change à l'écran. Pourquoi ? Que faut-il ajouter ?

---

#### Exercice 2 — Inspecter les boîtes de ma page (10 min)

Ouvrez `index.html` dans le navigateur (avec le CSS du TD 2), puis ouvrez les outils de développement. Dans l'inspecteur, sélectionnez chaque élément et observez le schéma de la boîte (onglet **Calculé** ou schéma des marges).

**Notez les valeurs des marges (`margin`) et du `padding` pour les éléments suivants. Précisez si elles viennent de votre CSS ou des styles par défaut du navigateur.**

| Élément | `margin` (haut / bas) | `padding` | Origine |
|---|---|---|---|
| `<body>` | | | |
| `<header>` | | | |
| `<h1>` | | | |
| `<h2>` | | | |
| `<p>` | | | |
| `<ul>` (liste de compétences) | | | |
| `.carte` | | | |

**Questions**
1. Dans l'en-tête, l'espace entre le haut de la zone bleue et le titre `<h1>` est la somme de deux espaces. Lesquels ? Quelle est la valeur de chacun ?
2. Pourquoi les deux cartes se touchent-elles verticalement, alors que les paragraphes d'une carte sont bien espacés ?
3. D'où vient le retrait à gauche des listes à puces ?

---

#### Exercice 3 — Mettre en page mon mini-site (35 min)

Vous allez organiser l'espace des deux pages du TD 2 en ajoutant des règles au fichier `css/style.css`. Les couleurs viennent de la palette du TD 2, complétée par `#c9d6e2` pour les bordures légères.

##### Étape 0 — Un calcul de taille simple (2 min)

Au tout début de votre feuille de style, ajoutez une règle qui applique `box-sizing: border-box` à **tous les éléments** (et à leurs pseudo-éléments `::before` et `::after`).

##### Étape 1 — Centrer et limiter le contenu (5 min)

Pour l'élément `<main>` :
- une largeur **maximale** de `45rem` ;
- un centrage horizontal ;
- un `padding` de `1rem`.

Vérifiez sur les deux pages en **réduisant la largeur de la fenêtre** : que se passe-t-il quand la fenêtre devient plus étroite que 45 rem ?

##### Étape 2 — Les cartes (5 min)

Pour `.carte` :
- une marge basse de `1.5rem` ;
- un `padding` de `1rem` en haut et en bas et de `1.5rem` à gauche et à droite (remplace celui du TD 2) ;
- une bordure de 1 px, pleine, de couleur `#c9d6e2` ;
- des coins arrondis de `0.5rem`.

Ajoutez ensuite cette règle (elle supprime la marge haute du premier élément de chaque carte, qui s'ajouterait sinon au padding) :
```css
.carte > :first-child {
    margin-top: 0;
}
```

##### Étape 3 — Le portrait (5 min)

Pour l'image (`<img>`) :
- `display: block` ;
- centrée horizontalement, avec une marge basse de `1rem` (écrivez une seule déclaration `margin` à trois valeurs) ;
- une bordure de 3 px, pleine, de la couleur principale ;
- des coins arrondis de `0.5rem`.

**Question.** Que se passe-t-il si vous retirez `display: block` ? Pourquoi `margin: 0 auto` ne suffit-il pas pour centrer l'image ?

##### Étape 4 — Le menu en boutons (5 min)

Pour les liens de la navigation :
- `display: inline-block` ;
- un `padding` de `0.5rem` en haut et en bas, `1rem` à gauche et à droite ;
- un fond blanc, une bordure de 1 px pleine de la couleur principale, des coins arrondis de `0.25rem` ;
- pas de soulignement (ils ont l'apparence de boutons).

**Question.** Que se passerait-il si vous n'aviez pas mis `display: inline-block` ?

##### Étape 5 — Espacer les grandes zones (4 min)

- `section` : marge basse de `2rem` ;
- `aside` : marge haute de `2rem` et **bordure gauche** de 4 px pleine de la couleur principale ;
- `footer` : marge haute de `2rem`.

##### Étape 6 — Réutiliser un style sur la page de contact (4 min)

Dans `contact.html`, ajoutez la classe `carte` à la `<section>` de la page.

**Question.** Qu'avez-vous eu à écrire en CSS pour que la page de contact bénéficie de la même présentation ? Qu'est-ce que cela montre sur l'intérêt des classes ?

##### Étape 7 — Vérifications (5 min)

1. **Largeur d'une carte.** Sur un écran large, calculez la largeur de la zone de contenu d'une carte (rappel : `45rem` = 720 px), puis vérifiez-la dans l'inspecteur.
2. **Fusion des marges.** Ajoutez temporairement `margin-top: 3rem` à `.carte`. Quel est l'espace entre deux cartes consécutives : 3 rem, ou 3 rem + 1,5 rem ? Mesurez-le, puis retirez cette déclaration.
3. **Débordement.** Désactivez temporairement la règle `box-sizing` de l'étape 0, et ajoutez `width: 100%` à `.carte`. Que constatez-vous ? Rétablissez ensuite les deux.

##### Pour aller plus loin

- Transformez la liste des compétences en **étiquettes** : chaque `<li>` devient un `inline-block` avec un padding, des coins très arrondis et une marge basse et droite. Pour supprimer les puces et le retrait de la liste, utilisez `list-style: none` et `padding: 0` sur la liste.
- Créez une classe `.vedette` qui ajoute à une carte une bordure gauche de 6 px, de la couleur principale. Appliquez-la à une seule des deux cartes.

---

#### Annexe — Fichiers de départ

##### index.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
        </section>

        <section>
            <h2>Mes centres d'intérêt</h2>

            <article class="carte">
                <h3>Le jeu vidéo</h3>
                <p>J'aime les jeux de stratégie et d'aventure.</p>
            </article>

            <article class="carte">
                <h3>La photographie</h3>
                <p>Je photographie surtout des paysages.</p>
            </article>
        </section>

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

##### contact.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contact — Camille Martin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header>
        <h1>Contact</h1>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section>
            <h2>Où me trouver</h2>
            <p>
                Camille Martin<br>
                1 rue de l'Exemple<br>
                00000 Ville
            </p>
            <p>
                <a href="mailto:camille.martin@example.com">camille.martin@example.com</a>
            </p>
            <p>
                <a href="index.html">Retour à l'accueil</a>
            </p>
        </section>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>© 2026 Camille Martin</p>
    </footer>

</body>
</html>
```

##### css/style.css (fin du TD 2)
```css
/* ===== Style de base ===== */
body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

/* ===== Cartes et zone "Liens utiles" ===== */
.carte {
    padding: 1rem;
    background-color: #ffffff;
}

aside {
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
}

/* ===== Pied de page ===== */
footer {
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

### Corrigé (enseignant)

#### Conseils d'animation

- **Rythme conseillé** : 10 min (ex. 1), 10 min (ex. 2), 35 min (ex. 3), soit 55 min.
- **Exercice 1** : il peut être fait sur papier en binôme et corrigé au tableau. Les calculs de la partie A servent de référence pour le reste du TD : prendre le temps de bien dessiner la boîte.
- **Exercice 2** : les valeurs des navigateurs peuvent différer légèrement (par exemple 26,8 px ou 26,80 px). L'important est de faire distinguer ce qui vient du CSS des élèves de ce qui vient des **styles par défaut du navigateur**.
- **Si le groupe est en retard** : l'exercice 3 peut s'arrêter à l'étape 5, et les vérifications de l'étape 7 peuvent être faites en démonstration.
- **Si le groupe est en avance** : proposer « Pour aller plus loin ».
- **Difficultés fréquemment rencontrées** :
  - oubli de `border-style` : la bordure n'apparaît pas ;
  - ordre des valeurs d'un raccourci : `margin: 0 auto 1rem` signifie haut 0, horizontal `auto`, bas `1rem` ;
  - sélecteur `*, *::before, *::after` mal écrit (virgules oubliées) ;
  - `main` absent du HTML d'un élève : adapter le sélecteur à sa structure ;
  - si l'écart entre les boutons du menu est trop faible, ajouter `margin-right: 0.5rem` aux liens du menu.

---

#### Exercice 1 — Calculer des boîtes

##### A. Taille d'une boîte

| | `content-box` (par défaut) | `border-box` |
|---|---|---|
| Largeur de la zone de contenu | 200 px | 176 px (200 − 2 × 10 − 2 × 2) |
| Largeur visible de la boîte (bordures comprises) | 224 px (200 + 20 + 4) | 200 px |
| Place occupée en largeur (marges comprises) | 254 px (224 + 30) | 230 px (200 + 30) |

##### B. Largeur automatique

Largeur de la zone de contenu :
```
600 − 40 (marges) − 20 (padding) − 2 (bordures) = 538 px
```

La largeur visible (bordures comprises) est de 538 + 20 + 2 = **560 px**.

Le résultat **ne dépend pas** de `box-sizing` : avec `width: auto`, l'élément remplit simplement l'espace disponible et la zone de contenu est ce qui reste après déduction des marges, des paddings et des bordures.

##### C. Débordement

- En `content-box` : la largeur visible est de 500 + 2 × 20 = **540 px**. L'élément déborde de **40 px**.
- En `border-box` : la largeur visible est de **500 px**, le padding étant pris à l'intérieur. Il n'y a pas de débordement.

##### D. Raccourcis et marges

1. `padding: 8px 16px 24px;` : haut 8 px, droite 16 px, bas 24 px, gauche 16 px. `margin: 0 auto;` : haut 0, droite `auto`, bas 0, gauche `auto`.
2. L'espace est de **24 px** : les marges verticales fusionnent et la plus grande l'emporte (pas 40 px).
3. Un lien est un élément **en ligne** : il ignore `width` et les marges verticales. Il faut ajouter `display: inline-block` (ou `block`).

---

#### Exercice 2 — Inspecter les boîtes de ma page

##### Valeurs attendues

Pour une taille de police de 16 px et la feuille de style du TD 2 :

| Élément | `margin` (haut / bas) | `padding` | Origine |
|---|---|---|---|
| `<body>` | 0 / 0 | 0 | marge du navigateur (8 px) supprimée par notre `margin: 0` |
| `<header>` | 0 / 0 | 16 px (1 rem) | `padding` : notre CSS |
| `<h1>` | environ 26,8 px / 26,8 px (0,67 em de 40 px) | 0 | styles par défaut du navigateur |
| `<h2>` | environ 23,2 px / 23,2 px (0,83 em de 28 px) | 0 | styles par défaut du navigateur |
| `<p>` | 16 px / 16 px (1 em) | 0 | styles par défaut du navigateur |
| `<ul>` | 16 px / 16 px | retrait gauche d'environ 40 px | styles par défaut du navigateur |
| `.carte` | 0 / 0 | 16 px (1 rem) | `padding` : notre CSS ; aucune marge n'est définie |

##### Réponses aux questions

1. L'espace est la somme du **padding de l'en-tête** (16 px, notre CSS) et de la **marge haute du `<h1>`** (environ 26,8 px, style par défaut du navigateur), soit environ **42,8 px**. La marge du `<h1>` ne fusionne pas avec celle de l'en-tête parce que le `padding` de l'en-tête les sépare.
2. Les cartes n'ont **aucune marge** : l'espace des paragraphes est une marge **intérieure** à chaque carte (marge par défaut des `<p>`, elle-même encadrée par le `padding` de la carte). Rien ne sépare donc une carte de la suivante. On observe d'ailleurs que le bas d'une carte est plus aéré que son haut : le `padding` s'ajoute à la marge basse du dernier paragraphe.
3. Du **`padding-left` d'environ 40 px** appliqué par défaut aux listes `<ul>` et `<ol>` par le navigateur.

---

#### Exercice 3 — Mettre en page mon mini-site

##### Proposition de corrigé : css/style.css

```css
/* ===== Calcul des tailles : width inclut padding et bordure ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

/* Les liens du menu ont l'apparence de boutons */
nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

/* Pas de marge haute pour le premier élément d'une carte */
.carte > :first-child {
    margin-top: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

##### Modification de contact.html

Une seule modification dans le HTML, et aucune dans le CSS :
```html
<section class="carte">
    <h2>Où me trouver</h2>
    ...
</section>
```

##### Réponses aux questions

**Étape 1.** Quand la fenêtre est plus étroite que 45 rem, `max-width` ne s'applique plus : `<main>` s'adapte à la largeur disponible (il ne fixe qu'un **maximum**), et le contenu reste lisible sans barre de défilement horizontale.

**Étape 3.** Sans `display: block`, l'image reste un élément **en ligne** : les marges `auto` horizontales n'ont aucun effet sur un élément en ligne, et l'image reste alignée à gauche, comme du texte. En la transformant en bloc, `margin: 0 auto` peut répartir l'espace restant de part et d'autre.

**Étape 4.** Sans `display: inline-block`, les liens resteraient des éléments en ligne : leur padding vertical **s'afficherait** (le fond et la bordure grandiraient) mais **sans repousser** les éléments voisins. Les boutons déborderaient alors de la zone du menu et chevaucheraient l'en-tête et le contenu situés autour.

**Étape 6.** Il n'y a **rien à écrire en CSS** : il suffit d'ajouter la classe `carte` au HTML. Une classe décrit un **rôle** réutilisable à plusieurs endroits, et une même règle suffit pour toutes les pages qui l'utilisent. C'est aussi pourquoi la règle `.carte > :first-child` fonctionne sur la page de contact, dont le premier élément est un `<h2>` et non un `<h3>`.

##### Étape 7 — Vérifications

**1. Largeur d'une carte**

| Calcul | Valeur |
|---|---|
| `main` : `45rem` (largeur visible, en `border-box`) | 720 px |
| Zone de contenu de `main` (− 2 × 16 px de padding) | 688 px |
| `.carte` : largeur visible (auto, donc toute la largeur disponible) | 688 px |
| Zone de contenu de la carte (− 2 × 1 px de bordure − 2 × 24 px de padding) | **638 px** |

**2. Fusion des marges**

Avec `margin-top: 3rem` ajouté à `.carte` (marge basse de la carte précédente : 1,5 rem), l'espace entre deux cartes consécutives est de **3 rem (48 px)**, et non 4,5 rem : les deux marges verticales fusionnent et la plus grande l'emporte.

**3. Débordement**

Sans `box-sizing: border-box` et avec `width: 100%` sur `.carte`, la carte mesure 688 px de contenu, plus 48 px de padding et 2 px de bordure, soit **738 px** : elle dépasse de **50 px** la largeur de la zone de contenu de `<main>`. Avec `border-box`, elle mesure exactement 688 px.

##### « Pour aller plus loin »

**Étiquettes de compétences**
```css
section ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

section li {
    display: inline-block;
    margin: 0 0.5rem 0.5rem 0;
    padding: 0.25rem 0.75rem;
    background-color: #e8eef5;
    border-radius: 1rem;
}
```

La liste de l'`aside` n'est pas touchée, car elle n'est pas dans une `section`. Le contraste du texte `#222222` sur `#e8eef5` est largement suffisant (environ 13 pour 1).

**Carte vedette**
```css
.vedette {
    border-left: 6px solid #336699;
}
```

On l'applique avec `<article class="carte vedette">`. La bordure gauche de la classe `.vedette` remplace celle de `.carte` pour ce côté seulement (même spécificité, `.vedette` étant écrite **après** `.carte`).

##### Points d'attention lors de la correction

- Vérifier que la règle `box-sizing` est écrite en premier et qu'elle contient bien les trois sélecteurs séparés par des virgules.
- Vérifier que chaque bordure a un **style** (`solid`).
- Vérifier que `margin: 0 auto` est bien associé à une largeur maximale, sinon le centrage ne se voit pas.
- Vérifier que la classe `carte` a bien été ajoutée à `contact.html` et qu'aucune règle CSS n'a été dupliquée.
- Faire repérer sur l'inspecteur la différence entre ce qui vient de la feuille de style et ce qui vient des styles du navigateur.

---

## TD 4 — Le positionnement

### Énoncé

#### Objectifs

À la fin de ce TD, vous saurez :
- choisir la bonne valeur de `position` selon le besoin ;
- prévoir où se place un élément `relative` ou `absolute` ;
- poser un **badge** dans le coin d'une carte (parent `relative`, enfant `absolute`) ;
- **fixer** un en-tête et un pied de page, et réserver leur place dans la page ;
- gérer les ancres et l'empilement (`scroll-padding-top`, `z-index`).

> Ce TD prolonge le **TD 3** : vous repartez des fichiers `index.html`, `contact.html` et `css/style.css`. Si vous n'avez pas terminé le TD 3, utilisez les fichiers de départ fournis en **annexe**.
>
> L'exercice 1 peut se faire **sur papier**. L'exercice 2 se fait **sur ordinateur**.

#### Aide-mémoire

| Valeur | Référence des décalages | Reste dans le flux ? |
|---|---|---|
| `static` (défaut) | décalages ignorés | oui |
| `relative` | sa propre position d'origine | oui (place conservée) |
| `absolute` | l'ancêtre positionné le plus proche, sinon la page | non |
| `fixed` | la fenêtre du navigateur | non |
| `sticky` | son parent, au défilement | oui |

- `top`, `right`, `bottom`, `left` et `inset` n'agissent que sur un élément **positionné**.
- Un élément `absolute` ou `fixed` ne prend plus de place : il faut **réserver sa place** si besoin.
- `z-index` ne fonctionne que sur un élément **positionné**.

#### Planning

| N° | Exercice | Durée | Niveau |
|---|---|---|---|
| 1 | Choisir et prévoir | 10 min | ⭐⭐ |
| 2 | Positionner mon mini-site | 35 min | ⭐⭐⭐ |

---

#### Exercice 1 — Choisir et prévoir (10 min)

##### A. Choisir la valeur de `position`

Pour chaque situation, indiquez la valeur de `position` à utiliser (et, si besoin, celle du parent).

| N° | Situation | Valeur |
|---|---|---|
| 1 | Un badge « Promo » dans le coin supérieur droit d'une carte | |
| 2 | Un bouton « Haut de page » toujours visible en bas à droite de la fenêtre | |
| 3 | Un titre de paragraphe ordinaire | |
| 4 | Un menu qui garde sa place dans la page, mais se colle en haut de la fenêtre quand on arrive à sa hauteur en défilant | |
| 5 | Une icône à décaler de 2 px vers le bas, sans que ses voisines bougent | |

##### B. Prévoir le rendu

Soit le HTML suivant :
```html
<div class="parent">
    <p>Premier</p>
    <p class="deuxieme">Deuxième</p>
    <p>Troisième</p>
</div>
```

Pour chacune des trois versions du CSS, indiquez **où se place le deuxième paragraphe** et **ce que deviennent les deux autres** (bougent-ils ?).

**Version 1**
```css
.deuxieme {
    position: relative;
    top: 20px;
    left: 40px;
}
```

**Version 2**
```css
.deuxieme {
    position: absolute;
    top: 20px;
    left: 40px;
}
```
(le `.parent` n'est pas positionné)

**Version 3**
```css
.parent {
    position: relative;
}

.deuxieme {
    position: absolute;
    top: 20px;
    left: 40px;
}
```

##### C. Réserver la place

Un site possède un en-tête **fixe** de `4.5rem` de haut et un pied de page **fixe** de `2.5rem` de haut (avec `1rem` = 16 px).

1. La fenêtre du navigateur fait 700 px de haut. Quelle hauteur reste-t-il pour voir le contenu ?
2. Quelles valeurs de `padding-top` et de `padding-bottom` faut-il donner au `body` ? Pourquoi ?

---

#### Exercice 2 — Positionner mon mini-site (35 min)

Vous allez ajouter des règles à votre feuille `css/style.css` (et quelques lignes à vos pages HTML). Les couleurs sont celles de la palette des TD précédents.

##### Étape 1 — Un badge sur une carte (7 min)

**HTML.** Dans `index.html`, ajoutez à la **fin** de la première carte (« Le jeu vidéo »), juste avant `</article>` :
```html
<span class="badge">Nouveau</span>
```

**CSS.**
- la carte (`.carte`) devient la **référence** du badge ;
- le badge (`.badge`) est placé à `0.75rem` du haut et à `0.75rem` du bord droit de la carte ;
- mise en forme : `padding` de `0.25rem 0.75rem`, fond `#8b0000`, texte blanc, taille de police `0.875rem`, coins arrondis de `1rem`.

**Questions**
1. Retirez temporairement la déclaration qui rend la carte « référence » du badge. Où va le badge ? Remettez-la ensuite.
2. Pourquoi a-t-on placé le badge à la **fin** de la carte dans le HTML plutôt qu'au début ? (Indice : regardez la règle `.carte > :first-child` du TD 3.)

##### Étape 2 — L'en-tête fixe (10 min)

Un en-tête fixe doit rester **compact** : on commence par le réduire.

**a. Compacter l'en-tête**
- `header` : une hauteur de `4.5rem` et un `padding` de `0.5rem 1rem` ;
- `h1` : taille `1.5rem`, interligne `1.2`, **aucune marge** ;
- `.accroche` : taille `0.875rem`, **aucune marge**.

**b. Fixer l'en-tête**
- position fixe, collé en haut de la fenêtre ;
- étiré sur **toute la largeur** de la fenêtre ;
- un `z-index` de `100`.

**c. Réserver sa place**

Faites défiler la page : le début du contenu est-il masqué par l'en-tête ? Corrigez en donnant au `body` un `padding-top` égal à la hauteur de l'en-tête.

**Questions**
1. Retirez temporairement `left` et `right` de l'en-tête. Que devient-il ? Remettez-les ensuite.
2. Pourquoi fixe-t-on la **hauteur** de l'en-tête (`4.5rem`) plutôt que de laisser son contenu la déterminer ? (Indice : comparez les en-têtes de `index.html` et de `contact.html`.)

##### Étape 3 — Le pied de page fixe (6 min)

- pied de page fixe, collé **en bas** de la fenêtre, sur toute la largeur ;
- une hauteur de `2.5rem` et un `padding` de `0.5rem 1rem` ;
- le paragraphe du pied de page n'a **aucune marge** ;
- supprimez la marge haute du pied de page (elle ne sert plus) ;
- réservez sa place en bas de page avec un `padding-bottom` sur le `body`.

**Question.** Retirez temporairement le `padding-bottom` du `body` et faites défiler jusqu'en bas. Qu'est-ce qui est masqué ? Remettez-le ensuite.

##### Étape 4 — Les ancres sous l'en-tête fixe (5 min)

**HTML.**
- dans `index.html`, ajoutez `id="interets"` à la `<section>` « Mes centres d'intérêt » ;
- ajoutez dans le menu un lien vers cette ancre : `<a href="#interets">Centres d'intérêt</a>`.

**Test.** Cliquez sur le lien. Le titre « Mes centres d'intérêt » est-il visible ? (Si la page ne défile pas assez, réduisez la hauteur de la fenêtre.)

**Correction.** Ajoutez dans votre feuille de style une règle sur `html` qui garde `5rem` de marge de défilement en haut, puis testez à nouveau.

##### Étape 5 — L'empilement (3 min)

1. Désactivez temporairement le `z-index` de l'en-tête (commentaire CSS) et faites défiler lentement. Quels éléments passent **par-dessus** l'en-tête ?
2. Expliquez pourquoi, en vous appuyant sur les règles de l'aide-mémoire. Réactivez ensuite le `z-index`.

##### Étape 6 — Vérifications (4 min)

1. Vérifiez les **deux pages** : l'en-tête et le pied de page doivent être cohérents, et rien ne doit être masqué en haut et en bas.
2. Réduisez la hauteur de la fenêtre à **400 px**. Quelle hauteur reste-t-il pour le contenu ? Quel pourcentage de la fenêtre cela représente-t-il ?
3. Quel inconvénient présente un en-tête et un pied de page tous les deux fixes sur un petit écran ? Proposez une alternative pour limiter le problème.

##### Pour aller plus loin

- Ajoutez dans les deux pages un lien « ↑ Haut de page » **fixe**, en bas à droite de la fenêtre, **au-dessus** du pied de page fixe. Pensez à l'`id` qu'il vise.
- Remplacez le `fixed` de l'en-tête par un **`sticky`** (`top: 0`). Que devez-vous modifier d'autre dans la feuille de style ? Qu'est-ce qui change à l'écran ?
- Faites en sorte que le menu de navigation se colle **sous** l'en-tête lors du défilement.

---

#### Annexe — Fichiers de départ (état à la fin du TD 3)

##### index.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
        </section>

        <section>
            <h2>Mes centres d'intérêt</h2>

            <article class="carte">
                <h3>Le jeu vidéo</h3>
                <p>J'aime les jeux de stratégie et d'aventure.</p>
            </article>

            <article class="carte">
                <h3>La photographie</h3>
                <p>Je photographie surtout des paysages.</p>
            </article>
        </section>

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

##### contact.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contact — Camille Martin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header>
        <h1>Contact</h1>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section class="carte">
            <h2>Où me trouver</h2>
            <p>
                Camille Martin<br>
                1 rue de l'Exemple<br>
                00000 Ville
            </p>
            <p>
                <a href="mailto:camille.martin@example.com">camille.martin@example.com</a>
            </p>
            <p>
                <a href="index.html">Retour à l'accueil</a>
            </p>
        </section>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>© 2026 Camille Martin</p>
    </footer>

</body>
</html>
```

##### css/style.css
```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

### Corrigé (enseignant)

#### Conseils d'animation

- **Rythme conseillé** : 10 min (ex. 1) et 35 min (ex. 2), soit 45 min. L'exercice 1 peut se faire à l'oral ou au tableau.
- **Si le groupe est en retard** : l'étape 5 (empilement) peut être faite en démonstration, et l'étape 6 corrigée collectivement.
- **Si le groupe est en avance** : proposer « Pour aller plus loin ».
- **Les valeurs sont calculées pour une police de 16 px** (1 rem = 16 px).
- **Difficultés fréquemment rencontrées** :
  - oubli de `position: relative` sur `.carte` : le badge part dans le coin de la page ;
  - `box-sizing: border-box` oublié (règle de départ du TD 3) : la `height` de l'en-tête est alors comptée **sans** le padding, et la hauteur réelle devient 88 px au lieu de 72 px ;
  - marges par défaut du `h1` et de `.accroche` oubliées : le texte dépasse de l'en-tête ;
  - `left` et `right` oubliés : l'en-tête ne remplit plus la largeur ;
  - `padding-top` du `body` oublié : le titre « Camille Martin » ou « Contact » est masqué par l'en-tête fixe ;
  - `z-index` mis sur un élément non positionné.

---

#### Exercice 1 — Choisir et prévoir

##### A. Choisir la valeur de `position`

| N° | Situation | Valeur |
|---|---|---|
| 1 | Badge dans le coin d'une carte | `absolute` sur le badge, `relative` sur la carte |
| 2 | Bouton « Haut de page » toujours visible | `fixed` |
| 3 | Titre de paragraphe ordinaire | `static` (valeur par défaut) |
| 4 | Menu qui garde sa place puis se colle en haut | `sticky` (avec `top: 0`) |
| 5 | Icône décalée de 2 px sans bouger ses voisines | `relative` (avec `top: 2px`) |

##### B. Prévoir le rendu

| Version | Où se place le deuxième paragraphe ? | Les autres paragraphes ? |
|---|---|---|
| 1 (`relative`) | **20 px plus bas** et **40 px plus à droite** que sa position d'origine | ne bougent pas ; la place d'origine du deuxième reste réservée (vide) |
| 2 (`absolute`, parent non positionné) | par rapport à **la page** : à 20 px du haut du document et à 40 px de son bord gauche, donc potentiellement loin de son parent et par-dessus d'autres contenus | le troisième paragraphe **remonte** et prend la place du deuxième |
| 3 (`absolute`, parent `relative`) | par rapport au **parent** : à 20 px du bord haut de celui-ci et à 40 px de son bord gauche | le troisième paragraphe **remonte** aussi ; la hauteur du parent ne compte plus le deuxième paragraphe |

Point à faire remarquer : un élément `absolute` est **sorti du flux** ; le parent ne le « voit » plus pour calculer sa hauteur.

##### C. Réserver la place

1. 700 − 72 (4,5 rem) − 40 (2,5 rem) = **588 px**.
2. `padding-top: 4.5rem` et `padding-bottom: 2.5rem`. Les éléments fixes sont **sortis du flux** : ils ne prennent plus de place, et le contenu commencerait (ou finirait) **sous** eux. Les paddings du `body` recréent l'espace correspondant.

---

#### Exercice 2 — Positionner mon mini-site

##### Modifications du HTML (index.html)

```html
<section id="interets">
    <h2>Mes centres d'intérêt</h2>

    <article class="carte">
        <h3>Le jeu vidéo</h3>
        <p>J'aime les jeux de stratégie et d'aventure.</p>
        <span class="badge">Nouveau</span>
    </article>

    <article class="carte">
        <h3>La photographie</h3>
        <p>Je photographie surtout des paysages.</p>
    </article>
</section>
```

Et le menu :
```html
<nav>
    <a href="index.html">Accueil</a>
    <a href="#interets">Centres d'intérêt</a>
    <a href="contact.html">Contact</a>
</nav>
```

`contact.html` ne change pas (sauf dans la partie « Pour aller plus loin »).

##### Proposition de corrigé : css/style.css

```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* Marge de défilement : les ancres ne passent pas sous l'en-tête fixe */
html {
    scroll-padding-top: 5rem;
}

/* ===== Style de base ===== */
body {
    margin: 0;
    padding-top: 4.5rem;      /* hauteur de l'en-tête fixe */
    padding-bottom: 2.5rem;   /* hauteur du pied de page fixe */
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête fixe ===== */
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 4.5rem;
    padding: 0.5rem 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    margin: 0;
    font-size: 0.875rem;
    font-style: italic;
}

h1 {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.2;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    position: relative;       /* la carte est la référence du badge */
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

/* Badge posé dans le coin de la carte */
.badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.25rem 0.75rem;
    background-color: #8b0000;
    color: #ffffff;
    font-size: 0.875rem;
    border-radius: 1rem;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page fixe ===== */
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    padding: 0.5rem 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer p {
    margin: 0;
}

footer a {
    color: #cfe3ff;
}
```

##### Réponses aux questions

**Étape 1**

1. Sans `position: relative` sur la carte, le badge n'a plus d'ancêtre positionné : il se place par rapport à **la page**, c'est-à-dire en haut à droite du document (à 0,75 rem du haut et du bord droit), loin de sa carte. En l'inspectant, on voit qu'il est posé sur l'en-tête. (Cette observation se fait avant de fixer l'en-tête ; sinon, le badge serait caché derrière lui.)
2. Parce que la règle `.carte > :first-child { margin-top: 0; }` supprime la marge haute du **premier** enfant. Si le badge était écrit en premier, le `<h3>` ne serait plus le premier enfant : il retrouverait sa marge haute par défaut, et cette carte aurait plus d'espace en haut que les autres. Un élément `absolute` est sorti du flux : sa place dans le code n'a aucune influence sur son emplacement à l'écran, on peut donc l'écrire en dernier.

**Étape 2**

Hauteur de contenu disponible dans l'en-tête : 72 − 16 (padding) = 56 px. L'en-tête de la page d'accueil contient un `<h1>` de 28,8 px (24 × 1,2) et l'accroche de 21 px (14 × 1,5), soit 49,8 px : le tout tient.

1. Sans `left` ni `right`, un élément `fixed` à largeur automatique se **réduit à la largeur de son contenu** : l'en-tête n'est plus un bandeau pleine largeur, le dégradé n'apparaît que derrière le texte. Avec `left: 0` et `right: 0`, il est étiré sur toute la largeur de la fenêtre.
2. L'en-tête de `index.html` contient un titre **et** une accroche, celui de `contact.html` seulement un titre. Sans hauteur imposée, leurs hauteurs seraient différentes (environ 66 px et 45 px). Comme le `padding-top` du `body` est **unique**, il serait trop grand sur une page ou trop petit sur l'autre. Une hauteur fixée garantit le même espace réservé sur les deux pages. C'est un des rares cas où fixer une `height` est justifié.

**Étape 3**

Sans `padding-bottom`, les derniers éléments de la page (ici la fin de la zone « Liens utiles » et sa marge) restent **cachés sous le pied de page** : l'utilisateur ne peut jamais les voir en entier.

**Étape 4**

Sans `scroll-padding-top`, le navigateur amène le haut de la section tout en haut de la fenêtre : le titre « Mes centres d'intérêt » est **masqué par l'en-tête fixe**. Avec `scroll-padding-top: 5rem` (4,5 rem pour l'en-tête et 0,5 rem d'air), le titre apparaît juste sous l'en-tête.

**Étape 5**

1. Ce sont les **cartes** (`.carte`) et le **badge** qui passent par-dessus l'en-tête. Le portrait, les titres, les paragraphes et les listes restent dessous.
2. Les éléments positionnés (ici l'en-tête `fixed`, les cartes `relative` et le badge `absolute`) sont dessinés **par-dessus** les éléments non positionnés. Entre éléments positionnés qui ont un `z-index` identique (`auto`), l'ordre du HTML décide : l'en-tête est écrit **avant** les cartes, donc les cartes passent par-dessus. Avec `z-index: 100`, l'en-tête repasse au-dessus.

**Étape 6**

1. Vérifier que le haut des deux pages commence sous l'en-tête et que le bas se termine au-dessus du pied de page. Le titre « Où me trouver » de `contact.html` doit être visible.
2. 400 − 72 − 40 = **288 px**, soit **72 %** de la fenêtre.
3. Inconvénient : **28 % de la fenêtre est occupée en permanence**, ce qui réduit fortement la zone de lecture sur un petit écran, en mode paysage sur téléphone, ou avec un texte agrandi (le contenu peut même devenir quasiment inaccessible, et l'élément qui reçoit le focus au clavier risque de passer sous un bandeau fixe). Alternatives : ne fixer que l'en-tête et laisser le pied de page dans le flux, utiliser `sticky` plutôt que `fixed`, réduire les hauteurs, ou désactiver le positionnement fixe sur petit écran (une technique courante en responsive design).

##### Pour aller plus loin

**1. Bouton « Haut de page »**

Dans les deux pages, sur la balise `<body id="haut">`, et juste avant `</body>` (après le pied de page) :
```html
<a class="retour-haut" href="#haut">↑ Haut de page</a>
```
```css
.retour-haut {
    position: fixed;
    bottom: 3.5rem;           /* 2,5 rem (pied de page) + 1 rem d'espace */
    right: 1rem;
    padding: 0.5rem 1rem;
    background-color: #336699;
    color: #ffffff;
    text-decoration: none;
    border-radius: 0.25rem;
}
```

**2. En-tête `sticky`**
```css
header {
    position: sticky;
    top: 0;
    z-index: 100;
    height: 4.5rem;
    /* le reste est inchangé ; left et right ne sont plus nécessaires */
}

body {
    padding-top: 0;           /* l'en-tête reste dans le flux : plus de place à réserver */
}
```

Ce qui change : l'en-tête **garde sa place dans le flux**, il n'y a donc plus de place à réserver avec le `padding-top` du `body`, et plus besoin d'étirer l'en-tête avec `left` et `right` (c'est un bloc, il remplit déjà la largeur). À l'écran, le résultat est ici identique, car l'en-tête est le premier élément de la page ; la différence apparaîtrait s'il était précédé d'un autre contenu, qui défilerait d'abord.

**3. Menu collé sous l'en-tête**
```css
nav {
    position: sticky;
    top: 4.5rem;              /* juste sous l'en-tête */
    z-index: 90;              /* sous l'en-tête (100), mais au-dessus des cartes */
}
```

Le menu mesure environ 58 px de haut : il faut augmenter `scroll-padding-top` à environ `8.5rem` pour que les ancres ne passent pas sous l'ensemble en-tête et menu. Le `z-index` du menu est nécessaire : sans lui, les cartes (positionnées) passeraient par-dessus.

##### Points d'attention lors de la correction

- Vérifier que la carte est bien en `position: relative` et que le badge est écrit **dans** la carte.
- Vérifier que l'en-tête et le pied de page ont `top`/`bottom` **et** `left`/`right`.
- Vérifier que le `padding-top` et le `padding-bottom` du `body` correspondent aux hauteurs réelles (4,5 rem et 2,5 rem).
- Vérifier que la règle `box-sizing` de départ est toujours en place.
- Faire observer, avec les outils de développement, qu'un élément `fixed` n'apparaît plus dans la hauteur de son parent.

---

## TD 5 — Flexbox

### Énoncé

#### Objectifs

À la fin de ce mini-TD, vous saurez :
- aligner les liens d'un menu avec Flexbox et pousser l'un d'eux à droite ;
- disposer des cartes **côte à côte**, avec retour à la ligne automatique ;
- coller un pied de page en **bas de la fenêtre** avec une page en colonne.

> Ce TD est court : il complète les jeux *Flexbox Froggy* et *Flexbox Defense*, ici sur **votre** mini-site. Vous repartez des fichiers `index.html`, `contact.html` et `css/style.css` du TD précédent. Si vous ne les avez pas, utilisez les fichiers de départ en **annexe**.

#### Aide-mémoire

| Propriété | Sur | Rôle |
|---|---|---|
| `display: flex` | le conteneur | ses enfants directs deviennent des éléments flex |
| `flex-direction` | le conteneur | `row` (défaut) ou `column` |
| `gap` | le conteneur | espace entre les éléments |
| `flex-wrap: wrap` | le conteneur | retour à la ligne si ça ne rentre pas |
| `align-items` | le conteneur | alignement sur l'axe secondaire |
| `flex: 1 1 14rem` | l'élément | peut grandir, peut rétrécir, taille de départ `14rem` |
| `margin-left: auto` | l'élément | absorbe tout l'espace libre à gauche |

#### Planning

| Étape | Contenu | Durée |
|---|---|---|
| 1 | Le menu en ligne | 3 min |
| 2 | Les cartes côte à côte | 4 min |
| 3 | Le pied de page en bas | 3 min |

---

#### Étape 1 — Le menu en ligne (3 min)

Dans `css/style.css` :

1. Transformez le `nav` en **conteneur flex**, avec un espace de `0.5rem` entre les liens et les liens **centrés verticalement**.
2. Poussez le dernier lien (« Contact ») à l'**extrémité droite** du menu, sans toucher au HTML.

**Question.** Le `nav a` possède `display: inline-block`. Est-il toujours utile maintenant que le `nav` est un conteneur flex ? (Faites un essai en le retirant, puis remettez-le.)

#### Étape 2 — Les cartes côte à côte (4 min)

**HTML.** Dans `index.html`, entourez les deux cartes de la section « Mes centres d'intérêt » avec un conteneur :
```html
<div class="cartes">
    ... les deux <article class="carte"> ...
</div>
```

**CSS.**
- `.cartes` est un conteneur flex, avec `1rem` d'espace entre les cartes, et un **retour à la ligne** autorisé ;
- chaque carte peut **grandir** et **rétrécir**, avec une taille de départ de `14rem` ;
- les cartes n'ont plus de marge basse (l'espace est géré par le `gap`).

**Questions**
1. Réduisez progressivement la largeur de la fenêtre. À partir de quelle largeur (environ) les cartes passent-elles l'une sous l'autre ? Justifiez par un calcul.
2. Les deux cartes ont-elles la même hauteur, même si leur texte est de longueur différente ? Quelle valeur par défaut l'explique ?

#### Étape 3 — Le pied de page en bas (3 min)

Ouvrez `contact.html` dans une grande fenêtre : le pied de page remonte au milieu de l'écran.

1. Donnez au `body` une disposition **en colonne** d'au moins la **hauteur de la fenêtre** (`100vh`).
2. Faites en sorte que `main` **prenne tout l'espace restant**.
3. Vérifiez que le pied de page est collé en bas sur **les deux pages**.

**Question.** Comparez la largeur de la carte (ou du contenu) avant et après l'étape 3. Que constatez-vous ? Corrigez-le. (Indice : `main` possède `margin: 0 auto`.)

##### Pour aller plus loin

- Ajoutez une troisième carte et observez comment elles se répartissent quand la fenêtre se réduit.
- Dans le menu, essayez `justify-content: space-between` à la place de `margin-left: auto`. Que se passe-t-il avec trois liens ?

---

#### Annexe — Fichiers de départ (état à la fin du TD 3 — il fonctionne aussi après le TD 4)

##### index.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
        </section>

        <section>
            <h2>Mes centres d'intérêt</h2>

            <article class="carte">
                <h3>Le jeu vidéo</h3>
                <p>J'aime les jeux de stratégie et d'aventure.</p>
            </article>

            <article class="carte">
                <h3>La photographie</h3>
                <p>Je photographie surtout des paysages.</p>
            </article>
        </section>

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

##### contact.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contact — Camille Martin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header>
        <h1>Contact</h1>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section class="carte">
            <h2>Où me trouver</h2>
            <p>
                Camille Martin<br>
                1 rue de l'Exemple<br>
                00000 Ville
            </p>
            <p>
                <a href="mailto:camille.martin@example.com">camille.martin@example.com</a>
            </p>
            <p>
                <a href="index.html">Retour à l'accueil</a>
            </p>
        </section>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>© 2026 Camille Martin</p>
    </footer>

</body>
</html>
```

##### css/style.css
```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

### Corrigé (enseignant)

#### Conseils d'animation

- Les élèves connaissent déjà les propriétés grâce aux deux jeux : l'enjeu est de les **transférer** sur du vrai HTML. Laissez-les chercher avant de montrer.
- Gardez l'étape 3 pour la fin : c'est la plus riche (piège de `margin: auto`), à traiter à l'oral si le temps manque.
- Ces fichiers fonctionnent aussi après le TD 4 (en-tête et pied de page fixes) : le TD ne touche pas au positionnement.

---

#### Étape 1 — Le menu en ligne

```css
nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

nav a:last-child {
    margin-left: auto;
}
```

**Question.** `display: inline-block` n'est plus utile : les enfants directs d'un conteneur flex deviennent des éléments flex (« blockifiés »). Leur `display` d'origine est sans effet. Le **seul changement visible** est la disparition de l'espace parasite entre les liens (dû à l'espace blanc du HTML), remplacé par un `gap` maîtrisé. On peut donc le laisser, sans conséquence.

**Pourquoi `margin-left: auto` ?** La marge automatique absorbe **tout l'espace libre** de la ligne : le dernier lien est repoussé à droite, et les autres restent groupés à gauche.

#### Étape 2 — Les cartes côte à côte

```html
<div class="cartes">
    <article class="carte">
        <h3>Le jeu vidéo</h3>
        <p>J'aime les jeux de stratégie et d'aventure.</p>
    </article>

    <article class="carte">
        <h3>La photographie</h3>
        <p>Je photographie surtout des paysages.</p>
    </article>
</div>
```

```css
.cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cartes .carte {
    flex: 1 1 14rem;
    margin-bottom: 0;
}
```

**Question 1.** Taille de départ : `14rem = 224 px`. Pour que deux cartes tiennent sur la même ligne, il faut `224 + 16 (gap) + 224 = 464 px` de largeur de conteneur. Le conteneur est la largeur de `main` moins ses `1rem` de padding de chaque côté (32 px). Le retour à la ligne se produit donc quand la fenêtre passe sous environ `464 + 32 = 496 px`.
Au-dessus de 496 px les cartes se partagent la largeur (`flex-grow: 1`), en dessous elles s'empilent et chacune prend toute la largeur.

**Question 2.** Oui : la valeur par défaut de `align-items` est `stretch`, les éléments s'étirent à la hauteur de la plus grande de la ligne.

**Pourquoi `margin-bottom: 0` ?** La règle `.carte` a `margin-bottom: 1.5rem`. Sans la remise à zéro, chaque carte aurait cet espace **en plus** du `gap`. La règle `.cartes .carte` (spécificité plus forte) l'emporte sur `.carte`.

#### Étape 3 — Le pied de page en bas

```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    /* ... */
}

main {
    flex: 1;
    width: 100%;
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}
```

**Question.** Sans `width: 100%`, `main` devient **plus étroit** (juste la largeur de son contenu) et reste centré. Dans un conteneur flex, une marge `auto` sur l'axe secondaire (ici horizontal) **annule l'étirement** (`stretch`) : l'élément prend sa largeur « naturelle ». `width: 100%` + `max-width: 45rem` rétablit le comportement précédent : `main` occupe toute la largeur disponible, jusqu'à 45rem, et reste centré.

`header`, `nav` et `footer` n'ont pas de marge automatique : ils restent étirés sur toute la largeur.

#### Pour aller plus loin
- Avec trois liens, `space-between` répartit l'espace entre eux : le lien du milieu se retrouve **au centre** du menu, ce qui n'est pas voulu ici. `margin-left: auto` cible un seul élément.
- Troisième carte : les trois cartes (basis `14rem`) ne tiennent pas sur une ligne dans 688 px (`3 × 224 + 2 × 16 = 704`), elles passent à 2 + 1, et la troisième **s'étire sur toute la largeur** à cause de `flex-grow`. C'est la différence avec Grid, vue dans le bonus.

---

#### Code final

##### css/style.css
```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    flex: 1;
    width: 100%;
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

nav a:last-child {
    margin-left: auto;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

.cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cartes .carte {
    flex: 1 1 14rem;
    margin-bottom: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

##### index.html (modifications : le conteneur `.cartes`)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
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
            </div>
        </section>

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

`contact.html` est inchangé.

#### Points d'attention

| Erreur fréquente | Explication |
|---|---|
| `display: flex` sur les cartes au lieu du parent | Flexbox s'applique au **conteneur**, sur ses enfants directs. |
| Oubli du conteneur `.cartes` | Sans parent commun, les deux cartes ne peuvent pas être mises en ligne. |
| Cartes avec double espace | Marge basse de `.carte` conservée en plus du `gap`. |
| Pied de page toujours trop haut | `min-height: 100vh` oublié sur le `body`, ou `flex: 1` oublié sur `main`. |
| `main` plus étroit | Marge `auto` en flex : ajouter `width: 100%`. |

---

## TD 5 bis — Bonus Grid

### Énoncé

#### Objectifs

À la fin de ce bonus, vous saurez :
- créer une grille de cartes **responsive** sans media query ;
- placer un élément sur **toute la largeur** de la grille ;
- disposer une image et un texte côte à côte avec une grille à deux colonnes.

> Ce bonus prolonge le **TD Flexbox** : vous partez de vos fichiers à la fin de ce TD. Si vous ne les avez pas, utilisez les fichiers de départ en **annexe** (état à la fin du TD Flexbox).

#### Aide-mémoire

| Propriété | Sur | Rôle |
|---|---|---|
| `display: grid` | le conteneur | ses enfants directs sont placés dans une grille |
| `grid-template-columns` | le conteneur | définit les colonnes (`200px 1fr`, `repeat(3, 1fr)`...) |
| `repeat(auto-fit, minmax(12rem, 1fr))` | le conteneur | autant de colonnes de **12rem mini** que la place le permet |
| `gap` | le conteneur | espace entre les cellules |
| `grid-column: 1 / -1` | l'élément | s'étend de la première à la dernière ligne de colonne |

#### Planning

| Étape | Contenu | Durée |
|---|---|---|
| 1 | Les cartes en grille | 5 min |
| 2 | La section « À propos » en deux colonnes | 5 min |

---

#### Étape 1 — Les cartes en grille (5 min)

1. Dans `index.html`, ajoutez une **troisième carte** dans le conteneur `.cartes` :
```html
<article class="carte">
    <h3>La randonnée</h3>
    <p>Je marche en montagne dès que possible.</p>
</article>
```
2. Dans `css/style.css`, remplacez la disposition Flexbox de `.cartes` par une **grille** : autant de colonnes que possible, de **12rem au minimum**, qui se partagent la largeur restante, avec `1rem` d'espace.
3. Gardez la remise à zéro de la marge basse des cartes.

**Questions**
1. Réduisez progressivement la fenêtre. Combien de colonnes avez-vous pour chaque plage de largeur ? Déterminez par le calcul les largeurs de fenêtre où cela change.
2. Avec trois cartes en Flexbox, la troisième s'étirait sur toute la ligne. Que se passe-t-il ici ? Pourquoi ?

#### Étape 2 — La section « À propos » en deux colonnes (5 min)

**HTML.** Ajoutez `class="apropos"` à la `<section>` « À propos ».

**CSS.**
- `.apropos` est une grille de **deux colonnes** : la première fait `200px` (la taille du portrait), la seconde prend le reste ; avec `1rem` d'espace ;
- le contenu de chaque cellule est **centré verticalement** ;
- le titre `h2` doit occuper **les deux colonnes** (et n'a plus de marge) ;
- le portrait et le paragraphe n'ont plus de marge.

**Question.** Retirez la déclaration qui place le titre sur toute la largeur. Où se retrouve le titre ? Où se retrouvent l'image et le paragraphe ? Remettez-la ensuite.

##### Pour aller plus loin

- Faites occuper **deux colonnes** à la première carte avec `grid-column: span 2`. Que devient la mise en page à 3 colonnes ? À 2 colonnes ?
- Transformez la page entière en grille nommée avec `grid-template-areas` (voir le cours).

---

#### Annexe — Fichiers de départ (état à la fin du TD Flexbox)

##### index.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
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
            </div>
        </section>

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

##### contact.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contact — Camille Martin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header>
        <h1>Contact</h1>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section class="carte">
            <h2>Où me trouver</h2>
            <p>
                Camille Martin<br>
                1 rue de l'Exemple<br>
                00000 Ville
            </p>
            <p>
                <a href="mailto:camille.martin@example.com">camille.martin@example.com</a>
            </p>
            <p>
                <a href="index.html">Retour à l'accueil</a>
            </p>
        </section>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>© 2026 Camille Martin</p>
    </footer>

</body>
</html>
```

##### css/style.css
```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    flex: 1;
    width: 100%;
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

nav a:last-child {
    margin-left: auto;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

.cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cartes .carte {
    flex: 1 1 14rem;
    margin-bottom: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

### Corrigé (enseignant)

#### Conseils d'animation

- Bonus à destination des plus rapides : ne le projetez pas à toute la classe.
- Insistez sur la **comparaison avec Flexbox** : Flexbox répartit des éléments sur **une** ligne (ou colonne), Grid gère **lignes et colonnes** ensemble.

---

#### Étape 1 — Les cartes en grille

```html
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
```

```css
.cartes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 1rem;
}

.cartes .carte {
    margin-bottom: 0;
}
```

**Question 1.** `12rem = 192 px`. Largeur du conteneur = largeur de `main` − 32 px de padding (tant que la fenêtre fait moins de 720 px ; au-delà `main` plafonne à 45rem).

| Colonnes | Largeur de contenu nécessaire | Fenêtre (environ) |
|---|---|---|
| 3 | `3 × 192 + 2 × 16 = 608 px` | à partir de **640 px** |
| 2 | `2 × 192 + 16 = 400 px` | de **432 à 639 px** |
| 1 | moins de 400 px | en dessous de **432 px** |

**Question 2.** Avec 2 colonnes, la troisième carte se place dans la première colonne de la 2ᵉ ligne et garde **la même largeur** que les autres : une grille impose des colonnes communes à toutes les lignes. En Flexbox, chaque ligne répartit son espace de façon indépendante, d'où l'étirement de la dernière carte.

#### Étape 2 — La section « À propos » en deux colonnes

```html
<section class="apropos">
    <h2>À propos</h2>
    <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
    <p>
        Je découvre le <strong>développement web</strong> et j'aime
        créer des choses qui fonctionnent.
    </p>
</section>
```

```css
.apropos {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
    align-items: center;
}

.apropos h2 {
    grid-column: 1 / -1;
    margin: 0;
}

.apropos img {
    margin: 0;
}

.apropos p {
    margin: 0;
}
```

**Question.** Sans `grid-column: 1 / -1`, les trois enfants se placent dans l'ordre dans les cellules : le **titre** dans la colonne de 200 px (1ʳᵉ cellule), l'**image** dans la grande colonne, et le **paragraphe** à la ligne suivante, dans la colonne de 200 px. Avec `grid-column: 1 / -1`, le titre prend la première ligne entière, puis l'image et le paragraphe se retrouvent côte à côte sur la ligne suivante.

`-1` désigne la **dernière ligne de colonne** : le titre reste sur toute la largeur même si on ajoute des colonnes.

**Pourquoi `margin: 0` sur l'image ?** La règle `img` du TD 2 a `margin: 0 auto 1rem`. Dans une grille, la marge basse décalerait le centrage vertical. Le sélecteur `.apropos img` est plus spécifique que `img`.

---

#### Code final

##### css/style.css
```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    flex: 1;
    width: 100%;
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

nav a:last-child {
    margin-left: auto;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Section "À propos" ===== */
.apropos {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
    align-items: center;
}

.apropos h2 {
    grid-column: 1 / -1;
    margin: 0;
}

.apropos img {
    margin: 0;
}

.apropos p {
    margin: 0;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

.cartes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 1rem;
}

.cartes .carte {
    margin-bottom: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

##### index.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section class="apropos">
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
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

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

`contact.html` est inchangé.

#### Points d'attention

| Erreur fréquente | Explication |
|---|---|
| `auto-fill` / `auto-fit` confondus | Avec peu d'éléments, `auto-fit` étire les cartes ; `auto-fill` garde des colonnes vides. |
| `1fr` sans `minmax` | Les colonnes ne passent jamais à la ligne : ajoutez une taille minimale. |
| Titre dans la mauvaise cellule | Oubli de `grid-column: 1 / -1`. |
| `display: grid` sur la mauvaise balise | Il se met sur le **parent** des éléments à placer. |

---

## TD 6 — Rendre le mini-site responsive

### Énoncé

#### Objectifs

À la fin de ce TD, vous saurez :
- déclarer le **viewport** pour que la page s'affiche correctement sur mobile ;
- écrire un CSS **mobile first** avec des media queries `min-width` ;
- rendre des tailles de texte **fluides** avec `clamp()` ;
- adapter une section selon la **largeur** et l'en-tête selon la **hauteur** de la fenêtre ;
- préparer l'**impression** et les appareils **tactiles** ;
- **tester** un site sur plusieurs tailles d'écran.

> Ce TD prolonge le **TD Flexbox** : vous repartez de `index.html`, `contact.html` et `css/style.css` à la fin de ce TD. Si vous ne les avez pas, ou si vous avez gardé l'en-tête et le pied de page **fixes** du TD 4, utilisez les fichiers de départ fournis en **annexe**.
>
> Travaillez avec les **outils de développement** du navigateur (`F12`), en mode appareil (`Ctrl+Maj+M`).

#### Aide-mémoire

| Notion | Syntaxe |
|---|---|
| Viewport | `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Media query (mobile first) | `@media (min-width: 40em) { ... }` (40em = 640 px) |
| Hauteur de fenêtre | `@media (min-height: 40em) { ... }` |
| Texte fluide | `clamp(mini, idéal, maxi)` |
| Appareil tactile | `@media (pointer: coarse) { ... }` |
| Impression | `@media print { ... }` |

- Le CSS **sans media query** décrit la version **mobile** ; les media queries **ajoutent** des règles pour les écrans plus larges.
- Les media queries se placent **après** les règles qu'elles modifient.
- Dans `clamp()`, les signes `+` et `-` sont entourés d'espaces.

#### Planning

| Étape | Contenu | Durée |
|---|---|---|
| 1 | Déclarer le viewport | 5 min |
| 2 | Le menu : en pile, puis en ligne | 7 min |
| 3 | Des titres fluides | 6 min |
| 4 | La section « À propos » | 7 min |
| 5 | L'en-tête selon la hauteur | 5 min |
| 6 | L'impression | 5 min |
| 7 | Tactile et tests finaux | 5 min |

---

#### Étape 1 — Déclarer le viewport (5 min)

1. Ouvrez `index.html`, puis les outils de développement en **mode appareil**. Choisissez un téléphone (par exemple 360 px de large). Que constatez-vous ?
2. Ajoutez dans le `<head>` de **chacune des deux pages** la balise `meta viewport`. Rechargez la page.

**Questions**
1. Pourquoi la page s'affichait-elle en tout petit avant l'ajout de la balise ?
2. Que signifient `width=device-width` et `initial-scale=1` ?
3. Faut-il ajouter la balise aussi dans `contact.html` ? Pourquoi ?

#### Étape 2 — Le menu : en pile, puis en ligne (7 min)

Aujourd'hui, le menu est toujours en ligne, avec « Contact » à droite. On veut :
- **en dessous de 40em** : les liens en **pile**, chacun sur toute la largeur, texte centré ;
- **à partir de 40em** : les liens en **ligne**, centrés verticalement, avec « Contact » à l'extrémité droite.

Modifiez `css/style.css` en **mobile first** : les règles de base décrivent la pile, la media query décrit la ligne.

**Indice.** Plusieurs règles de `nav` et de `nav a:last-child` doivent être **déplacées** de la base vers la media query.

**Question.** Essayez de laisser la règle `margin-left: auto` sur le dernier lien **en dehors** de la media query, et regardez la version mobile (360 px). Que se passe-t-il ? Pourquoi ? Remettez-la ensuite dans la media query.

#### Étape 3 — Des titres fluides (6 min)

Remplacez les tailles fixes par des tailles qui varient avec la largeur de la fenêtre :

| Titre | Minimum | Valeur idéale | Maximum |
|---|---|---|---|
| `h1` | `1.75rem` | `1.2rem + 2.5vw` | `3rem` |
| `h2` | `1.375rem` | `1.1rem + 1.2vw` | `1.75rem` |

**Calculs.** Complétez (avec `1rem = 16 px`, et `1vw` = 1 % de la largeur de la fenêtre) :

| Fenêtre | Valeur idéale du `h1` | Taille réelle du `h1` |
|---|---|---|
| 320 px | | |
| 800 px | | |
| 1280 px | | |

Vérifiez avec l'inspecteur (onglet *Computed*).

**Questions**
1. Pourquoi y a-t-il une partie en `rem` dans la valeur idéale, plutôt que `2.5vw` seul ?
2. Entre quelles largeurs de fenêtre la taille du `h1` varie-t-elle réellement ?

#### Étape 4 — La section « À propos » (7 min)

Sur mobile, le portrait est au-dessus du texte (c'est déjà le cas). À partir de **40em**, on veut deux colonnes :
- le portrait (`200px`) à gauche, le texte à droite, avec `1rem` d'espace ;
- le contenu centré verticalement ;
- le titre `h2` sur toute la largeur ;
- plus de marges autour de l'image et du paragraphe.

**HTML.** Ajoutez `class="apropos"` à la section « À propos » de `index.html`.

**Questions**
1. Les deux cartes de « Mes centres d'intérêt » ont-elles besoin d'une media query pour s'adapter ? Pourquoi ?
2. Dans quel cas utiliserait-on une media query plutôt qu'un `flex-wrap` pour des cartes ?

#### Étape 5 — L'en-tête selon la hauteur (5 min)

On veut que l'en-tête reste visible pendant le défilement, **mais seulement si la fenêtre est assez haute** : sur un téléphone tenu à l'horizontale, il occuperait trop de place.

- à partir d'une **hauteur** de fenêtre de `40em`, l'en-tête est « collé » en haut (`sticky`), au-dessus des autres éléments (`z-index: 100`).

**Test.** Passez la fenêtre de 800 × 800 px à 800 × 360 px (téléphone en paysage).

**Questions**
1. Quelle est la hauteur de l'en-tête ? Quel pourcentage d'une fenêtre de 360 px de haut représente-t-elle ?
2. Pourquoi utiliser `min-height` ici, et non `min-width` ?

#### Étape 6 — L'impression (5 min)

Ouvrez l'aperçu avant impression (`Ctrl+P`). Ajoutez une media query pour le papier :
- le menu et le pied de page **disparaissent** ;
- fond blanc, texte noir ;
- l'adresse des liens du contenu (`main`) s'affiche **après** le lien, entre parenthèses (indice : `::after`, `content` et `attr(href)`).

**Question.** Le titre de l'en-tête est écrit en blanc. Si vous ne modifiez pas l'en-tête dans la règle d'impression, que voyez-vous sur la feuille ? Pourquoi ? Corrigez-le.

**Astuce.** Pour tester sans passer par l'impression : outils de développement, menu *Rendering*, option *Emulate CSS media type: print*.

#### Étape 7 — Tactile et tests finaux (5 min)

**A. Zones tactiles.** Un lien du menu mesure aujourd'hui `1.5` (interligne) `× 16 px` + `2 × 0.5rem` de padding + `2 px` de bordures.
1. Calculez sa hauteur.
2. Ajoutez une règle qui passe le padding vertical à `0.75rem` pour les appareils tactiles (`pointer: coarse`). Quelle est la nouvelle hauteur ? Est-elle supérieure à 44 px ?

**B. Tests.** Complétez la grille de contrôle sur **les deux pages**, en réduisant lentement la largeur :

| Contrôle | 320 px | 360 px | 768 px | 1280 px |
|---|---|---|---|---|
| Pas de défilement horizontal | | | | |
| Menu en pile ou en ligne comme prévu | | | | |
| Texte lisible, rien de coupé | | | | |
| « À propos » : 1 ou 2 colonnes | | | | |
| Pied de page en bas de la fenêtre (`contact.html`) | | | | |

Testez aussi le **zoom du navigateur à 200 %**.

##### Pour aller plus loin

- Ajoutez un **thème sombre** avec `@media (prefers-color-scheme: dark)`. Vérifiez tous les contrastes (titres, liens, zone « Liens utiles »).
- Rendez le `padding` de `main` fluide avec `clamp()`.
- Utilisez une **requête de conteneur** pour que la carte affiche une disposition différente quand son parent est large.

---

#### Annexe — Fichiers de départ (état à la fin du TD Flexbox)

##### index.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
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
            </div>
        </section>

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

##### contact.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contact — Camille Martin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header>
        <h1>Contact</h1>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section class="carte">
            <h2>Où me trouver</h2>
            <p>
                Camille Martin<br>
                1 rue de l'Exemple<br>
                00000 Ville
            </p>
            <p>
                <a href="mailto:camille.martin@example.com">camille.martin@example.com</a>
            </p>
            <p>
                <a href="index.html">Retour à l'accueil</a>
            </p>
        </section>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>© 2026 Camille Martin</p>
    </footer>

</body>
</html>
```

##### css/style.css
```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    flex: 1;
    width: 100%;
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: 1.75rem;
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-decoration: none;
}

nav a:last-child {
    margin-left: auto;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

.cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cartes .carte {
    flex: 1 1 14rem;
    margin-bottom: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}
```

### Corrigé (enseignant)

#### Conseils d'animation

- Faites travailler les élèves **avec le mode appareil du navigateur** dès l'étape 1 : tout le TD repose sur lui.
- Les étapes 2 (piège de `margin-left: auto`) et 6 (en-tête blanc invisible à l'impression) sont les plus formatrices. Gardez-les même si le temps manque.
- Les étapes 5 et 6 peuvent être traitées à l'oral au vidéoprojecteur si le groupe est en retard.
- Les durées sont indicatives : si le groupe est en retard, passez les étapes 5 et 6 en démonstration.

---

#### Étape 1 — Déclarer le viewport

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
```

**Questions**
1. Sans la balise, un navigateur mobile suppose que la page n'est pas prévue pour lui : il l'affiche dans une fenêtre virtuelle d'environ **980 px de large**, puis la réduit pour tout faire tenir à l'écran. Le texte devient minuscule et les media queries se basent sur 980 px.
2. `width=device-width` : la largeur du viewport est celle de l'appareil (en pixels CSS). `initial-scale=1` : pas de zoom ni de réduction au chargement.
3. **Oui**, la balise se met dans **chaque** page.

#### Étape 2 — Le menu : en pile, puis en ligne

```css
/* Base : version mobile */
nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-align: center;
    text-decoration: none;
}

/* À partir de 40em */
@media (min-width: 40em) {
    nav {
        flex-direction: row;
        align-items: center;
    }

    nav a:last-child {
        margin-left: auto;
    }
}
```

Points de vigilance :
- `align-items: center` ne doit **pas** rester dans la base : dans une colonne, il centrerait les liens **horizontalement** et les réduirait à la largeur de leur texte. Il passe dans la media query (centrage vertical d'une ligne).
- `text-align: center` dans la base centre le texte de chaque lien en pile.

**Question.** En colonne, `margin-left: auto` sur le dernier lien le **réduit à la largeur de son texte et le pousse à droite** (mesuré : 93 px de large au lieu de la largeur du menu). Une marge automatique absorbe l'espace libre et **annule l'étirement** (`stretch`) de l'élément sur l'axe secondaire, qui est ici l'axe horizontal. La règle doit donc rester dans la media query, là où le menu est en ligne.

#### Étape 3 — Des titres fluides

```css
h1 {
    font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
    letter-spacing: 0.05em;
}

h2 {
    font-size: clamp(1.375rem, 1.1rem + 1.2vw, 1.75rem);
    color: #1f4068;
}
```

| Fenêtre | Valeur idéale du `h1` | Taille réelle du `h1` |
|---|---|---|
| 320 px | `19,2 + 8 = 27,2 px` | **28 px** (minimum) |
| 800 px | `19,2 + 20 = 39,2 px` | **39,2 px** |
| 1280 px | `19,2 + 32 = 51,2 px` | **48 px** (maximum) |

**Questions**
1. Avec `2.5vw` seul, le texte ne réagit plus au zoom ni à la taille de police choisie par l'utilisateur, ce qui nuit à l'accessibilité. La partie en `rem` conserve cette réaction.
2. La valeur idéale dépasse le minimum à `19,2 + 0,025 × largeur = 28`, soit environ **352 px**, et atteint le maximum (48 px) à environ **1152 px**. Entre les deux, la taille est proportionnelle à la largeur.

#### Étape 4 — La section « À propos »

```html
<section class="apropos">
    <h2>À propos</h2>
    <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
    <p>
        Je découvre le <strong>développement web</strong> et j'aime
        créer des choses qui fonctionnent.
    </p>
</section>
```

```css
@media (min-width: 40em) {
    /* ... règles du menu ... */

    .apropos {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1rem;
        align-items: center;
    }

    .apropos h2 {
        grid-column: 1 / -1;
        margin: 0;
    }

    .apropos img,
    .apropos p {
        margin: 0;
    }
}
```

Les règles de la section sont placées **dans** la media query : sur mobile, elle garde sa disposition normale (portrait centré au-dessus du texte).

**Questions**
1. **Non** : `.cartes` utilise `flex-wrap: wrap` et `flex: 1 1 14rem`. Les cartes passent à la ligne d'elles-mêmes quand la place manque. Une media query ferait la même chose en plus compliqué.
2. Quand on veut un **nombre précis** de colonnes, ou une **autre structure** à partir d'une largeur donnée (par exemple 1 colonne, puis 2, puis 3, avec des tailles différentes), ou quand le changement dépasse la simple répartition d'éléments identiques.

#### Étape 5 — L'en-tête selon la hauteur

```css
@media (min-height: 40em) {
    header {
        position: sticky;
        top: 0;
        z-index: 100;
    }
}
```

**Questions**
1. L'en-tête mesure environ **180 px** (à vérifier à l'inspecteur : 176 à 208 px selon la largeur), soit près de **la moitié** d'une fenêtre de 360 px de haut. En paysage sur téléphone, il resterait collé en haut et ne laisserait que peu de place au contenu.
2. C'est la **hauteur** de la fenêtre qui pose problème : un téléphone en paysage est large (par exemple 800 px) mais peu haut (360 px). Un test sur la largeur ne le détecterait pas.

À 360 px de haut (moins de `40em = 640 px`), l'en-tête reste normal et défile avec la page.

#### Étape 6 — L'impression

```css
@media print {
    nav,
    footer {
        display: none;
    }

    body {
        color: #000000;
        background-color: #ffffff;
    }

    header {
        background-image: none;
        color: #000000;
    }

    main a[href]::after {
        content: " (" attr(href) ")";
    }
}
```

**Question.** Par défaut, les navigateurs **n'impriment pas les images et couleurs de fond**. L'en-tête perdrait son dégradé bleu mais garderait son texte blanc : **blanc sur fond blanc**, donc invisible. On remet donc `color: #000000` et on retire le fond.

`main a[href]::after` se limite aux liens du contenu : le menu et le pied de page, qui contiennent d'autres liens, sont déjà masqués.

#### Étape 7 — Tactile et tests finaux

**A. Zones tactiles**
1. Hauteur actuelle : `1.5 × 16 = 24 px` + `2 × 8 = 16 px` + `2 px` de bordures = **42 px** (inférieure à 44 px).
2. Après : `24 + 2 × 12 + 2 = 50 px`, soit **plus de 44 px**.

```css
@media (pointer: coarse) {
    nav a {
        padding: 0.75rem 1rem;
    }
}
```
`pointer: coarse` cible les appareils au doigt ; la souris (`fine`) garde le padding d'origine.

**B. Grille de contrôle** (résultats attendus)

| Contrôle | 320 px | 360 px | 768 px | 1280 px |
|---|---|---|---|---|
| Pas de défilement horizontal | oui | oui | oui | oui |
| Menu | pile | pile | ligne | ligne |
| Texte lisible, rien de coupé | oui | oui | oui | oui |
| « À propos » | 1 colonne | 1 colonne | 2 colonnes | 2 colonnes |
| Pied de page en bas (`contact.html`) | oui | oui | oui | oui |

Le point de bascule du menu et de la section « À propos » est à **640 px**.

À 200 % de zoom sur un écran de 1280 px, le navigateur se comporte comme avec une fenêtre de 640 px : il passe en mode **ligne** juste à la limite. À 400 %, ce serait comme 320 px.

---

#### Code final

##### css/style.css
```css
/* ===== Calcul des tailles ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

/* ===== Style de base ===== */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    font-family: system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #222222;
    background-color: #f7f7f7;
}

/* ===== Mise en page générale ===== */
main {
    flex: 1;
    width: 100%;
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

/* ===== En-tête ===== */
header {
    padding: 1rem;
    background-image: linear-gradient(to right, #336699, #1f4068);
    color: #ffffff;
    text-align: center;
}

.accroche {
    font-style: italic;
}

h1 {
    font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
    letter-spacing: 0.05em;
}

/* ===== Titres ===== */
h2 {
    font-size: clamp(1.375rem, 1.1rem + 1.2vw, 1.75rem);
    color: #1f4068;
}

h3 {
    font-size: 1.25rem;
    color: #336699;
}

/* ===== Navigation et liens ===== */
nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #e8eef5;
}

a {
    color: #0b5cad;
}

nav a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #336699;
    border-radius: 0.25rem;
    text-align: center;
    text-decoration: none;
}

/* ===== Portrait ===== */
img {
    display: block;
    margin: 0 auto 1rem;
    border: 3px solid #336699;
    border-radius: 0.5rem;
}

/* ===== Cartes ===== */
.carte {
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border: 1px solid #c9d6e2;
    border-radius: 0.5rem;
}

.carte > :first-child {
    margin-top: 0;
}

.cartes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cartes .carte {
    flex: 1 1 14rem;
    margin-bottom: 0;
}

/* ===== Zone "Liens utiles" ===== */
aside {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(51, 102, 153, 0.1);
    border-left: 4px solid #336699;
}

/* ===== Pied de page ===== */
footer {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #222222;
    color: #f7f7f7;
    text-align: center;
}

footer a {
    color: #cfe3ff;
}

/* ===== À partir de 40em (640 px) ===== */
@media (min-width: 40em) {
    nav {
        flex-direction: row;
        align-items: center;
    }

    nav a:last-child {
        margin-left: auto;
    }

    .apropos {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1rem;
        align-items: center;
    }

    .apropos h2 {
        grid-column: 1 / -1;
        margin: 0;
    }

    .apropos img,
    .apropos p {
        margin: 0;
    }
}

/* ===== En-tête collé seulement si la fenêtre est assez haute ===== */
@media (min-height: 40em) {
    header {
        position: sticky;
        top: 0;
        z-index: 100;
    }
}

/* ===== Appareils tactiles : zones plus grandes ===== */
@media (pointer: coarse) {
    nav a {
        padding: 0.75rem 1rem;
    }
}

/* ===== Impression ===== */
@media print {
    nav,
    footer {
        display: none;
    }

    body {
        color: #000000;
        background-color: #ffffff;
    }

    header {
        background-image: none;
        color: #000000;
    }

    main a[href]::after {
        content: " (" attr(href) ")";
    }
}
```

##### index.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Camille Martin — Étudiante en informatique</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header id="entete">
        <h1>Camille Martin</h1>
        <p class="accroche">Étudiante en première année d'informatique</p>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section class="apropos">
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
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
            </div>
        </section>

        <aside>
            <h2>Liens utiles</h2>
            <ul>
                <li><a href="https://developer.mozilla.org/fr/">MDN Web Docs</a></li>
                <li><a href="https://validator.w3.org/">Validateur HTML du W3C</a></li>
            </ul>
        </aside>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>
            © 2026 Camille Martin —
            <a href="mailto:camille.martin@example.com">Me contacter par e-mail</a>
        </p>
    </footer>

</body>
</html>
```

##### contact.html (seule la balise `meta viewport` est ajoutée)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact — Camille Martin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- En-tête -->
    <header>
        <h1>Contact</h1>
    </header>

    <!-- Menu de navigation -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- Contenu principal -->
    <main>

        <section class="carte">
            <h2>Où me trouver</h2>
            <p>
                Camille Martin<br>
                1 rue de l'Exemple<br>
                00000 Ville
            </p>
            <p>
                <a href="mailto:camille.martin@example.com">camille.martin@example.com</a>
            </p>
            <p>
                <a href="index.html">Retour à l'accueil</a>
            </p>
        </section>

    </main>

    <!-- Pied de page -->
    <footer>
        <p>© 2026 Camille Martin</p>
    </footer>

</body>
</html>
```

#### Points d'attention

| Erreur fréquente | Explication |
|---|---|
| Oubli de la balise `meta viewport` sur une des pages | Cette page s'affiche à 980 px sur mobile. |
| `margin-left: auto` laissé hors de la media query | Le dernier lien se rétrécit et se colle à droite en mode pile. |
| `align-items: center` laissé dans la base | Les liens ne sont plus étirés en mode pile. |
| `@media` placée **avant** les règles de base | Les règles de base, placées plus loin, l'emportent. |
| `max-width` utilisé à la place de `min-width` | Retour à une logique « desktop first » : à éviter. |
| `+` collé dans `clamp(1.75rem, 1.2rem+2.5vw, 3rem)` | Calcul invalide, la déclaration est ignorée. |
| Tailles de `clamp()` en `px` | Pas d'adaptation au réglage de taille de police de l'utilisateur. |
| En-tête non modifié dans `@media print` | Texte blanc sur fond blanc : en-tête invisible. |