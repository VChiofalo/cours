# TD 2 — Couleur, police et arrière-plan : corrigés (enseignant)

## Conseils d'animation

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

## Exercice 1 — Unités et couleurs

### A. Tailles

| Valeur | Équivalent |
|---|---|
| `1rem` | 16 px |
| `1.5rem` | 24 px |
| `0.75rem` | 12 px |
| `2.5rem` | 40 px |
| `20px` | 1,25 rem |
| `28px` | 1,75 rem |

**Question.** Avec une taille de texte réglée à 20 px dans le navigateur, `1.5rem` devient **30 px** (1,5 × 20) : l'unité `rem` suit le réglage de l'utilisateur. Une taille écrite `24px` reste à **24 px** : une taille en pixels ignore ce réglage. C'est pourquoi on préfère `rem` pour les tailles de texte.

### B. Couleurs

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

### C. Nuances

On modifie la **luminosité** (troisième valeur) : par exemple `hsl(210, 50%, 70%)`. La teinte (210°) et la saturation (50 %) restent identiques : c'est le même bleu, simplement plus clair. C'est l'intérêt de `hsl()` pour construire une palette de nuances d'une même couleur.

---

## Exercice 2 — Chasse aux erreurs CSS

### Les 10 erreurs

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

### Version corrigée
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

## Exercice 3 — Contraste et lisibilité

| N° | Texte | Fond | Contraste | Texte courant (≥ 4,5) | Grand texte (≥ 3) |
|---|---|---|---|---|---|
| 1 | `#222222` | `#f7f7f7` | 14,85 | oui | oui |
| 2 | `#ffffff` | `#336699` | 6,0 | oui | oui |
| 3 | `#aaaaaa` | `#ffffff` | 2,32 | **non** | **non** |
| 4 | `#777777` | `#ffffff` | 4,48 | **non** (de très peu) | oui |
| 5 | `#ff0000` | `#ffffff` | 4,0 | **non** | oui |
| 6 | `#ffffff` | `#ff6600` | 2,94 | **non** | **non** (de très peu) |

Les valeurs données par les outils de vérification peuvent varier légèrement dans les décimales ; l'important est de se situer par rapport aux seuils.

### Questions

1. Pour un paragraphe ordinaire, on écarte les combinaisons **3, 4, 5 et 6**. Les combinaisons **4 et 5** pourraient convenir pour un titre de grande taille, mais pas les combinaisons 3 et 6. La combinaison 4 est un bon exemple de piège : le gris `#777777` semble lisible, mais il est juste sous le seuil.
2. Une erreur signalée **uniquement par la couleur** n'est pas perçue par une personne daltonienne ou malvoyante, ni dans un contexte où l'écran est mal lisible. De plus, le rouge pur `#ff0000` sur fond blanc n'atteint pas le contraste minimal pour du texte courant. On améliore en ajoutant un autre repère (un **texte explicite** comme « Erreur : l'adresse e-mail est incomplète », une **icône**, un soulignement) et en choisissant un rouge plus foncé, par exemple `darkred`, dont le contraste sur blanc est très largement suffisant (environ 9 pour 1 sur fond `#f7f7f7`).

---

## Exercice 4 — Mettre en forme ma page de présentation

### Étape 0 — Relier la feuille de style

Dans `index.html` et dans `contact.html`, qui sont à la racine du site, on écrit dans le `<head>` :
```html
<link rel="stylesheet" href="css/style.css">
```

Les deux pages étant dans le même dossier que le dossier `css/`, le chemin est identique dans les deux fichiers.

### Proposition de corrigé : css/style.css
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

### Réponses aux questions

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

### Réponses : « Pour aller plus loin »

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

### Points d'attention lors de la correction

- Vérifier que les deux pages sont bien reliées à la feuille de style.
- Vérifier que le dégradé est écrit dans `background-image` et non dans `background-color`.
- Vérifier que le texte blanc est posé sur le conteneur sombre (`header`) et non sur la page entière.
- Vérifier que les tailles de texte sont en `rem` et que la police se termine par une famille générique.
- Vérifier que le contraste du lien dans le pied de page a bien été corrigé.
