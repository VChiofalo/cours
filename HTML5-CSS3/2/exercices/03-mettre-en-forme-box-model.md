# Mettre en page mon mini-site - suite

Vous allez organiser l'espace des deux pages du TD 2 en ajoutant des règles au fichier `css/style.css`. Les couleurs viennent de la palette du TD 2, complétée par `#c9d6e2` pour les bordures légères.

## Étape 0 — Un calcul de taille simple

Au tout début de votre feuille de style, ajoutez une règle qui applique `box-sizing: border-box` à **tous les éléments** (et à leurs pseudo-éléments `::before` et `::after`).

## Étape 1 — Centrer et limiter le contenu

Pour l'élément `<main>` :
- une largeur **maximale** de `45rem` ;
- un centrage horizontal ;
- un `padding` de `1rem`.

Vérifiez sur les deux pages en **réduisant la largeur de la fenêtre** : que se passe-t-il quand la fenêtre devient plus étroite que 45 rem ?

## Étape 2 — Les cartes

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

## Étape 3 — Le portrait

Pour l'image (`<img>`) :
- `display: block` ;
- centrée horizontalement, avec une marge basse de `1rem` (écrivez une seule déclaration `margin` à trois valeurs) ;
- une bordure de 3 px, pleine, de la couleur principale ;
- des coins arrondis de `0.5rem`.

**Question.** Que se passe-t-il si vous retirez `display: block` ? Pourquoi `margin: 0 auto` ne suffit-il pas pour centrer l'image ?

## Étape 4 — Le menu en boutons

Pour les liens de la navigation :
- `display: inline-block` ;
- un `padding` de `0.5rem` en haut et en bas, `1rem` à gauche et à droite ;
- un fond blanc, une bordure de 1 px pleine de la couleur principale, des coins arrondis de `0.25rem` ;
- pas de soulignement (ils ont l'apparence de boutons).

**Question.** Que se passerait-il si vous n'aviez pas mis `display: inline-block` ?

## Étape 5 — Espacer les grandes zones

- `section` : marge basse de `2rem` ;
- `aside` : marge haute de `2rem` et **bordure gauche** de 4 px pleine de la couleur principale ;
- `footer` : marge haute de `2rem`.

## Étape 6 — Réutiliser un style sur la page de contact

Dans `contact.html`, ajoutez la classe `carte` à la `<section>` de la page.

**Question.** Qu'avez-vous eu à écrire en CSS pour que la page de contact bénéficie de la même présentation ? Qu'est-ce que cela montre sur l'intérêt des classes ?

## Étape 7 — Vérifications

1. **Largeur d'une carte.** Sur un écran large, calculez la largeur de la zone de contenu d'une carte (rappel : `45rem` = 720 px), puis vérifiez-la dans l'inspecteur.
2. **Fusion des marges.** Ajoutez temporairement `margin-top: 3rem` à `.carte`. Quel est l'espace entre deux cartes consécutives : 3 rem, ou 3 rem + 1,5 rem ? Mesurez-le, puis retirez cette déclaration.
3. **Débordement.** Désactivez temporairement la règle `box-sizing` de l'étape 0, et ajoutez `width: 100%` à `.carte`. Que constatez-vous ? Rétablissez ensuite les deux.

## Bonus - Pour aller plus loin

- Transformez la liste des compétences en **étiquettes** : chaque `<li>` devient un `inline-block` avec un padding, des coins très arrondis et une marge basse et droite. Pour supprimer les puces et le retrait de la liste, utilisez `list-style: none` et `padding: 0` sur la liste.
- Créez une classe `.vedette` qui ajoute à une carte une bordure gauche de 6 px, de la couleur principale. Appliquez-la à une seule des deux cartes.

---

## Annexe — Fichiers de départ

### index.html
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

### contact.html
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

### css/style.css (fin du TD 2)
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