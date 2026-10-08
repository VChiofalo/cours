# Positionner mon mini-site

Vous allez ajouter des règles à votre feuille `css/style.css` (et quelques lignes à vos pages HTML). Les couleurs sont celles de la palette des TD précédents.

## Étape 1 — Un badge sur une carte

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

## Étape 2 — L'en-tête fixe

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

## Étape 3 — Le pied de page fixe

- pied de page fixe, collé **en bas** de la fenêtre, sur toute la largeur ;
- une hauteur de `2.5rem` et un `padding` de `0.5rem 1rem` ;
- le paragraphe du pied de page n'a **aucune marge** ;
- supprimez la marge haute du pied de page (elle ne sert plus) ;
- réservez sa place en bas de page avec un `padding-bottom` sur le `body`.

**Question.** Retirez temporairement le `padding-bottom` du `body` et faites défiler jusqu'en bas. Qu'est-ce qui est masqué ? Remettez-le ensuite.

## Étape 4 — Les ancres sous l'en-tête fixe

**HTML.**
- dans `index.html`, ajoutez `id="interets"` à la `<section>` « Mes centres d'intérêt » ;
- ajoutez dans le menu un lien vers cette ancre : `<a href="#interets">Centres d'intérêt</a>`.

**Test.** Cliquez sur le lien. Le titre « Mes centres d'intérêt » est-il visible ? (Si la page ne défile pas assez, réduisez la hauteur de la fenêtre.)

**Correction.** Ajoutez dans votre feuille de style une règle sur `html` qui garde `5rem` de marge de défilement en haut, puis testez à nouveau.

## Étape 5 — L'empilement

1. Désactivez temporairement le `z-index` de l'en-tête (commentaire CSS) et faites défiler lentement. Quels éléments passent **par-dessus** l'en-tête ?
2. Expliquez pourquoi, en vous appuyant sur les règles de l'aide-mémoire. Réactivez ensuite le `z-index`.

## Étape 6 — Vérifications

1. Vérifiez les **deux pages** : l'en-tête et le pied de page doivent être cohérents, et rien ne doit être masqué en haut et en bas.
2. Réduisez la hauteur de la fenêtre à **400 px**. Quelle hauteur reste-t-il pour le contenu ? Quel pourcentage de la fenêtre cela représente-t-il ?
3. Quel inconvénient présente un en-tête et un pied de page tous les deux fixes sur un petit écran ? Proposez une alternative pour limiter le problème.

## Bonus

- Ajoutez dans les deux pages un lien « ↑ Haut de page » **fixe**, en bas à droite de la fenêtre, **au-dessus** du pied de page fixe. Pensez à l'`id` qu'il vise.
- Remplacez le `fixed` de l'en-tête par un **`sticky`** (`top: 0`). Que devez-vous modifier d'autre dans la feuille de style ? Qu'est-ce qui change à l'écran ?
- Faites en sorte que le menu de navigation se colle **sous** l'en-tête lors du défilement.

---

## Annexe — Fichiers de départ (état à la fin du TD 3)

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

### css/style.css
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