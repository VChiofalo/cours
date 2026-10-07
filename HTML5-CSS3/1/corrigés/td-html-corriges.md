# TP 1 — Premières pages HTML : corrigés (enseignant)

## Exercice 1 — Lire du HTML

**1. Analyse des trois lignes**

| Ligne | Balise | Contenu | Attributs |
|---|---|---|---|
| 1 | `<a>` | « Nous écrire » | `href="contact.html"`, `class="bouton"`, `id="lien-contact"` |
| 2 | `<img>` | aucun | `src="images/logo.png"`, `alt="Logo du club"` |
| 3 | `<p>` | « Bienvenue au », un élément `<strong>`, puis « . » | `class="intro"` |

**2. Élément vide** : `<img>`. Il n'a pas de contenu ni de balise fermante : toutes ses informations sont portées par ses attributs.

**3. Imbrication** : l'élément `<strong>` est imbriqué dans l'élément `<p>` (ligne 3).
```
p (class="intro")
├── "Bienvenue au "
├── strong
│   └── "club informatique"
└── "."
```

**4. Attributs**
- `id` identifie un élément de manière **unique** dans la page (`lien-contact`).
- `class` permet de **regrouper** plusieurs éléments (`bouton`, `intro`).

---

## Exercice 2 — Chasse aux erreurs

### Les 10 erreurs

| N° | Erreur | Correction |
|---|---|---|
| 1 | Il manque `<!DOCTYPE html>` | Ajouter la déclaration en première ligne |
| 2 | Il manque `lang="fr"` sur `<html>` | `<html lang="fr">` |
| 3 | Il manque `<meta charset="UTF-8">` | L'ajouter dans `<head>` (sinon risque d'accents mal affichés) |
| 4 | `<h1>` fermé par `</h2>` | Fermer avec `</h1>` |
| 5 | Mauvaise imbrication : `<strong>informatique.</p></strong>` | Fermer `</strong>` **avant** `</p>` |
| 6 | Saut de niveau de titre (`<h1>` puis `<h3>`) | Utiliser un `<h2>` |
| 7 | `class=intro` sans guillemets | `class="intro"` (bonne pratique du cours, même si le navigateur le tolère ici) |
| 8 | Paragraphe `<p>` jamais fermé | Ajouter `</p>` |
| 9 | `<img>` sans attribut `alt` | Ajouter un `alt` pertinent |
| 10 | Attribut `href` placé **en dehors** de la balise `<a>` | `<a href="contact.html">Contactez-nous</a>` |

### Version corrigée
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon club</title>
</head>
<body>
    <h1>Club informatique</h1>
    <p>Bienvenue au club <strong>informatique</strong>.</p>
    <h2>Nos activités</h2>
    <p class="intro">Chaque mercredi, nous nous retrouvons.</p>
    <img src="images/club.jpg" alt="Les membres du club réunis autour d'un ordinateur">
    <a href="contact.html">Contactez-nous</a>
</body>
</html>
```

**Remarque** : l'erreur 7 n'est pas bloquante pour un navigateur lorsque la valeur ne contient pas d'espace, mais elle ne respecte pas la convention du cours. C'est un bon moment pour expliquer pourquoi il vaut mieux toujours mettre les guillemets.

---

## Exercice 3 — Ma première page

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma première page</title>
</head>
<body>

    <!-- Ma première page HTML : titre et présentation -->
    <h1>Bonjour le web</h1>

    <p>
        Je m'appelle Camille et je découvre le développement web.
    </p>

</body>
</html>
```

**Points de vérification**
- Le contenu de `<title>` s'affiche dans l'onglet du navigateur, pas dans la page.
- Un paragraphe mis en commentaire **disparaît** de l'affichage mais reste dans le code source.

---

## Exercice 4 — Titres, texte et caractères spéciaux

Exemple de solution (sujet libre, ici le jeu vidéo) :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Le jeu vidéo</title>
</head>
<body>

    <h1>Le jeu vidéo</h1>

    <p>
        Le jeu vidéo est un <strong>loisir</strong> populaire dans le monde entier.
    </p>

    <h2>Les types de jeux</h2>

    <h3>Les jeux d'action</h3>
    <p>Ils demandent de la rapidité et de bons réflexes.</p>

    <h3>Les jeux de stratégie</h3>
    <p>Ils demandent de planifier et d'anticiper.</p>

    <h2>Les plateformes</h2>
    <p>On joue sur ordinateur, sur console ou sur téléphone.</p>

    <hr>

    <p>Pour créer un paragraphe, on utilise la balise &lt;p&gt;.</p>

    <p>Dupont &amp; Fils — Page&nbsp;1</p>

    <p>
        Club informatique<br>
        1 rue de l'Exemple<br>
        00000 Ville
    </p>

</body>
</html>
```

**Points d'attention**
- Hiérarchie des titres : `h1` → `h2` → `h3`, sans saut de niveau.
- `&lt;p&gt;` affiche le texte `<p>` ; `&amp;` affiche `&` ; `&nbsp;` est un espace insécable.
- `<br>` et `<hr>` sont des **éléments vides** : pas de balise fermante.
- Une séparation visuelle de fin de contenu peut aussi être réalisée avec `<hr>` placé juste avant le dernier paragraphe : tout emplacement raisonnable est accepté.

---

## Exercice 5 — Liens et images

### liens.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liens et images</title>
</head>
<body>

    <h1>Liens et images</h1>

    <p>Cette page rassemble différents types de liens.</p>

    <p><a href="#bas">Aller en bas</a></p>

    <ul>
        <li><a href="https://developer.mozilla.org/fr/">Le site MDN</a></li>
        <li><a href="autre.html">Ma deuxième page</a></li>
        <li><a href="mailto:prenom.nom@example.com">M'écrire un message</a></li>
    </ul>

    <img src="images/paysage.jpg" alt="Paysage de montagne au lever du soleil" width="300">

    <p>Premier paragraphe de remplissage...</p>
    <p>Deuxième paragraphe de remplissage...</p>
    <p>Troisième paragraphe de remplissage...</p>
    <p>Quatrième paragraphe de remplissage...</p>
    <p>Cinquième paragraphe de remplissage...</p>

    <h2 id="bas">Bas de page</h2>
    <p>Vous êtes arrivé en bas de la page.</p>

</body>
</html>
```

> La solution utilise une liste `<ul>` pour regrouper les liens. Si vos élèves ne l'ont pas encore vue, ils peuvent simplement les placer dans des paragraphes séparés.

### autre.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma deuxième page</title>
</head>
<body>

    <h1>Ma deuxième page</h1>

    <p><a href="liens.html">Retour à la première page</a></p>

</body>
</html>
```

**Réponses aux questions**
- Si le nom du fichier image ne correspond plus, le navigateur n'affiche pas l'image et montre à la place le **texte alternatif** (selon le navigateur, avec une icône d'image « cassée »).
- `alt` rend l'information accessible : aux personnes qui utilisent un lecteur d'écran, et lorsque l'image ne peut pas être chargée.

**Bonus : image cliquable** (imbrication d'un `<img>` dans un `<a>`)
```html
<a href="autre.html">
    <img src="images/paysage.jpg" alt="Aller à ma deuxième page" width="300">
</a>
```
Le `alt` d'une image cliquable décrit alors la **destination** du lien.

---

## Exercice 6 — Structurer avec le HTML sémantique

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Le blog du club</title>
</head>
<body>

    <!-- EN-TÊTE DU SITE -->
    <header>
        <h1>Le blog du club</h1>
    </header>

    <!-- MENU -->
    <nav>
        <a href="index.html">Accueil</a>
        <a href="blog.html">Blog</a>
        <a href="contact.html">Contact</a>
    </nav>

    <!-- CONTENU PRINCIPAL -->
    <main>

        <!-- Section : les actualités -->
        <section>
            <h2>Les actualités</h2>

            <!-- Article 1 -->
            <article>
                <h3>Reprise des ateliers</h3>
                <p>Les ateliers reprennent dès ce mercredi.</p>
            </article>

            <!-- Article 2 -->
            <article>
                <h3>Nouveau salon de jeux</h3>
                <p>Un espace dédié aux jeux vidéo ouvre ses portes au club.</p>
            </article>
        </section>

        <!-- Contenu complémentaire -->
        <aside>
            <h2>Le saviez-vous ?</h2>
            <p>Le tout premier site web a été mis en ligne en 1991.</p>
        </aside>

    </main>

    <!-- PIED DE PAGE -->
    <footer>
        <p>© 2026 Club informatique</p>
    </footer>

</body>
</html>
```

**Réponses aux questions**
1. Chaque actualité est un **contenu autonome**, qui garde du sens s'il est lu séparément : c'est le rôle d'`<article>`. `<section>` regroupe ici les articles dans une même thématique (« Les actualités »).
2. Le « Saviez-vous ? » est un **contenu complémentaire** : il enrichit la page sans en constituer le propos principal.
3. Arbre de la page :
```
body
├── header
│   └── h1
├── nav
│   └── a, a, a
├── main
│   ├── section
│   │   ├── h2
│   │   ├── article (h3, p)
│   │   └── article (h3, p)
│   └── aside
│       ├── h2
│       └── p
└── footer
    └── p
```

**Remarque** : le `<aside>` peut aussi être placé à l'extérieur de `<main>` selon l'organisation choisie. On accepte les deux, tant que le choix est justifié.

---

## Exercice 7 — Mini-projet : ma page de présentation

### Proposition de corrigé : index.html
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

        <!-- Présentation -->
        <section>
            <h2>À propos</h2>
            <img src="images/portrait.jpg" alt="Portrait de Camille Martin" width="200">
            <p>
                Je découvre le <strong>développement web</strong> et j'aime
                créer des choses qui fonctionnent.
            </p>
        </section>

        <!-- Compétences -->
        <section>
            <h2>Mes compétences</h2>
            <ul>
                <li>HTML5</li>
                <li>Algorithmique de base</li>
                <li>Travail en équipe</li>
            </ul>
        </section>

        <!-- Centres d'intérêt -->
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

        <!-- Liens utiles -->
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

### Proposition de corrigé : contact.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contact — Camille Martin</title>
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