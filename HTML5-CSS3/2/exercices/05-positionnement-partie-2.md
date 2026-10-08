# Positionnement avancé

## Flexbox

### Étape 1 — Le menu en ligne

Dans `css/style.css` :

1. Transformez le `nav` en **conteneur flex**, avec un espace de `0.5rem` entre les liens et les liens **centrés verticalement**.
2. Poussez le dernier lien (« Contact ») à l'**extrémité droite** du menu, sans toucher au HTML.

**Question.** Le `nav a` possède `display: inline-block`. Est-il toujours utile maintenant que le `nav` est un conteneur flex ? (Faites un essai en le retirant, puis remettez-le.)

### Étape 2 — Les cartes côte à côte

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

### Étape 3 — Le pied de page en bas

Ouvrez `contact.html` dans une grande fenêtre : le pied de page remonte au milieu de l'écran.

1. Donnez au `body` une disposition **en colonne** d'au moins la **hauteur de la fenêtre** (`100vh`).
2. Faites en sorte que `main` **prenne tout l'espace restant**.
3. Vérifiez que le pied de page est collé en bas sur **les deux pages**.

**Question.** Comparez la largeur de la carte (ou du contenu) avant et après l'étape 3. Que constatez-vous ? Corrigez-le. (Indice : `main` possède `margin: 0 auto`.)

#### Pour aller plus loin

- Ajoutez une troisième carte et observez comment elles se répartissent quand la fenêtre se réduit.
- Dans le menu, essayez `justify-content: space-between` à la place de `margin-left: auto`. Que se passe-t-il avec trois liens ?

---

### Annexe — Fichiers de départ

#### index.html
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

#### contact.html
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

#### css/style.css
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

## Bonus - Grid

### Étape 1 — Les cartes en grille

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

### Étape 2 — La section « À propos » en deux colonnes

**HTML.** Ajoutez `class="apropos"` à la `<section>` « À propos ».

**CSS.**
- `.apropos` est une grille de **deux colonnes** : la première fait `200px` (la taille du portrait), la seconde prend le reste ; avec `1rem` d'espace ;
- le contenu de chaque cellule est **centré verticalement** ;
- le titre `h2` doit occuper **les deux colonnes** (et n'a plus de marge) ;
- le portrait et le paragraphe n'ont plus de marge.

**Question.** Retirez la déclaration qui place le titre sur toute la largeur. Où se retrouve le titre ? Où se retrouvent l'image et le paragraphe ? Remettez-la ensuite.

#### Pour aller plus loin

- Faites occuper **deux colonnes** à la première carte avec `grid-column: span 2`. Que devient la mise en page à 3 colonnes ? À 2 colonnes ?
- Transformez la page entière en grille nommée avec `grid-template-areas` (voir le cours).

---

### Annexe — Fichiers de départ$

#### index.html
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

#### contact.html
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

#### css/style.css
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