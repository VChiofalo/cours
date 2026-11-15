# TD 6 — Rendre le mini-site responsive — Corrigés

## Étape 1 — Déclarer le viewport

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

## Étape 2 — Le menu : en pile, puis en ligne

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

## Étape 3 — Des titres fluides

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

## Étape 4 — La section « À propos »

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

## Étape 5 — L'en-tête selon la hauteur

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

## Étape 6 — L'impression

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

## Étape 7 — Tactile et tests finaux

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

## Code final

### css/style.css
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

### index.html
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

### contact.html (seule la balise `meta viewport` est ajoutée)
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

## Points d'attention

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