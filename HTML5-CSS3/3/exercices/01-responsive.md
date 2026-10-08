# Rendre le mini-site responsive

> Ce TD prolonge le **TD Flexbox** : vous repartez de `index.html`, `contact.html` et `css/style.css` à la fin de ce TD. Si vous ne les avez pas, ou si vous avez gardé l'en-tête et le pied de page **fixes** du TD 4, utilisez les fichiers de départ fournis en **annexe**.
>
> Travaillez avec les **outils de développement** du navigateur (`F12`), en mode appareil (`Ctrl+Maj+M`).

## Étape 1 — Déclarer le viewport

1. Ouvrez `index.html`, puis les outils de développement en **mode appareil**. Choisissez un téléphone (par exemple 360 px de large). Que constatez-vous ?
2. Ajoutez dans le `<head>` de **chacune des deux pages** la balise `meta viewport`. Rechargez la page.

**Questions**
1. Pourquoi la page s'affichait-elle en tout petit avant l'ajout de la balise ?
2. Que signifient `width=device-width` et `initial-scale=1` ?
3. Faut-il ajouter la balise aussi dans `contact.html` ? Pourquoi ?

## Étape 2 — Le menu : en pile, puis en ligne

Aujourd'hui, le menu est toujours en ligne, avec « Contact » à droite. On veut :
- **en dessous de 40em** : les liens en **pile**, chacun sur toute la largeur, texte centré ;
- **à partir de 40em** : les liens en **ligne**, centrés verticalement, avec « Contact » à l'extrémité droite.

Modifiez `css/style.css` en **mobile first** : les règles de base décrivent la pile, la media query décrit la ligne.

**Indice.** Plusieurs règles de `nav` et de `nav a:last-child` doivent être **déplacées** de la base vers la media query.

**Question.** Essayez de laisser la règle `margin-left: auto` sur le dernier lien **en dehors** de la media query, et regardez la version mobile (360 px). Que se passe-t-il ? Pourquoi ? Remettez-la ensuite dans la media query.

## Étape 3 — Des titres fluides

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

## Étape 4 — La section « À propos »

Sur mobile, le portrait est au-dessus du texte (c'est déjà le cas). À partir de **40em**, on veut deux colonnes :
- le portrait (`200px`) à gauche, le texte à droite, avec `1rem` d'espace ;
- le contenu centré verticalement ;
- le titre `h2` sur toute la largeur ;
- plus de marges autour de l'image et du paragraphe.

**HTML.** Ajoutez `class="apropos"` à la section « À propos » de `index.html`.

**Questions**
1. Les deux cartes de « Mes centres d'intérêt » ont-elles besoin d'une media query pour s'adapter ? Pourquoi ?
2. Dans quel cas utiliserait-on une media query plutôt qu'un `flex-wrap` pour des cartes ?

## Étape 5 — L'en-tête selon la hauteur

On veut que l'en-tête reste visible pendant le défilement, **mais seulement si la fenêtre est assez haute** : sur un téléphone tenu à l'horizontale, il occuperait trop de place.

- à partir d'une **hauteur** de fenêtre de `40em`, l'en-tête est « collé » en haut (`sticky`), au-dessus des autres éléments (`z-index: 100`).

**Test.** Passez la fenêtre de 800 × 800 px à 800 × 360 px (téléphone en paysage).

**Questions**
1. Quelle est la hauteur de l'en-tête ? Quel pourcentage d'une fenêtre de 360 px de haut représente-t-elle ?
2. Pourquoi utiliser `min-height` ici, et non `min-width` ?

## Étape 6 — L'impression

Ouvrez l'aperçu avant impression (`Ctrl+P`). Ajoutez une media query pour le papier :
- le menu et le pied de page **disparaissent** ;
- fond blanc, texte noir ;
- l'adresse des liens du contenu (`main`) s'affiche **après** le lien, entre parenthèses (indice : `::after`, `content` et `attr(href)`).

**Question.** Le titre de l'en-tête est écrit en blanc. Si vous ne modifiez pas l'en-tête dans la règle d'impression, que voyez-vous sur la feuille ? Pourquoi ? Corrigez-le.

**Astuce.** Pour tester sans passer par l'impression : outils de développement, menu *Rendering*, option *Emulate CSS media type: print*.

## Étape 7 — Tactile et tests finaux

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

## Bonus - Pour aller plus loin

- Ajoutez un **thème sombre** avec `@media (prefers-color-scheme: dark)`. Vérifiez tous les contrastes (titres, liens, zone « Liens utiles »).
- Rendez le `padding` de `main` fluide avec `clamp()`.
- Utilisez une **requête de conteneur** pour que la carte affiche une disposition différente quand son parent est large.

---

## Annexe — Fichiers de départ (état à la fin du TD Flexbox)

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