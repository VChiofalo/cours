# TP 1 — Premières pages HTML : corrigés

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

## Exercice 7 — Chasse aux erreurs

### Les 8 erreurs

| N° | Erreur | Correction |
|---|---|---|
| 1 | `for="login"` ne correspond à aucun `id` (l'`id` est `identifiant`) : le label n'est pas associé au champ | `for="identifiant"` |
| 2 | Le champ mot de passe n'a **pas de `name`** : il ne sera jamais envoyé | `name="mdp"` |
| 3 | Le champ mot de passe n'a **pas de `<label>`** : le `placeholder` ne le remplace pas | Ajouter `<label for="mdp">` |
| 4 | `method="get"` pour un mot de passe : il apparaîtrait dans l'URL | `method="post"` |
| 5 | Les boutons radio ont des `name` différents (`statut1`, `statut2`) : ils ne s'excluent pas | Même `name`, par exemple `statut` |
| 6 | `<textarea />` : cet élément n'accepte pas l'écriture auto-fermante | `<textarea ...></textarea>` |
| 7 | Le `<textarea>` n'a ni `id` ni `<label>` | Ajouter un `id` et un `<label for="...">` |
| 8 | `<button>` sans attribut `type` | `<button type="submit">` |

**Point d'attention (erreur 6)** : le navigateur ignore le `/` de `<textarea />` et considère que la zone de texte reste ouverte. Tout ce qui suit dans la page, bouton et fin du formulaire compris, est alors avalé comme **contenu** du `<textarea>`. C'est une erreur très déroutante pour les débutants, qui valent la peine d'être testée en classe.

### Version corrigée
```html
<form action="connexion.php" method="post">

    <h2>Connexion</h2>

    <p>
        <label for="identifiant">Identifiant</label>
        <input type="text" id="identifiant" name="login">
    </p>

    <p>
        <label for="mdp">Mot de passe</label>
        <input type="password" id="mdp" name="mdp">
    </p>

    <fieldset>
        <legend>Vous êtes :</legend>

        <input type="radio" id="etudiant" name="statut" value="etudiant">
        <label for="etudiant">Étudiant</label>

        <input type="radio" id="enseignant" name="statut" value="enseignant">
        <label for="enseignant">Enseignant</label>
    </fieldset>

    <p>
        <input type="checkbox" id="souvenir" name="souvenir" value="oui">
        <label for="souvenir">Se souvenir de moi</label>
    </p>

    <p>
        <label for="commentaire">Commentaire</label>
    </p>
    <textarea id="commentaire" name="commentaire" rows="4" cols="40"></textarea>

    <button type="submit">Se connecter</button>

</form>
```

**Remarque** : le remplacement de `<p>Vous êtes :</p>` par un `<fieldset>` avec un `<legend>` est une amélioration d'accessibilité, pas une des 8 erreurs.

---
## Exercice 8 — Choisir le bon élément

| N° | Information | Réponse |
|---|---|---|
| 1 | Adresse e-mail | `<input type="email">` |
| 2 | Date de naissance | `<input type="date">` |
| 3 | Pays de résidence | `<select>` avec des `<option>` (liste longue : éventuellement regroupée avec `<optgroup>`) |
| 4 | Acceptation obligatoire des conditions | `<input type="checkbox" required>` |
| 5 | Commentaire libre | `<textarea>` |
| 6 | Note de 1 à 5 | `<input type="number" min="1" max="5">` (un `type="range"` est aussi acceptable) |
| 7 | Mode de paiement, un seul choix | boutons radio `<input type="radio">` partageant le même `name` |
| 8 | Centres d'intérêt, plusieurs choix | cases à cocher `<input type="checkbox">` |
| 9 | Mot de passe | `<input type="password">`, avec `method="post"` |
| 10 | Photo de profil | `<input type="file">`, avec `method="post"` et `enctype="multipart/form-data"` sur le formulaire |

**Point de discussion** : pour la ligne 7, trois options visibles conviennent aux boutons radio ; au-delà de quatre ou cinq options, une liste déroulante devient préférable.

---

## Exercice 9 — Choisir la bonne contrainte

| N° | Règle | Réponse |
|---|---|---|
| a | Prénom obligatoire | `required` |
| b | Prénom de 2 à 30 caractères | `minlength="2"` et `maxlength="30"` |
| c | Âge de 18 à 99 | `type="number"` avec `min="18"` et `max="99"` |
| d | Code postal à 5 chiffres | `pattern="[0-9]{5}"` (avec un `title` explicatif) |
| e | Mot de passe d'au moins 8 caractères | `minlength="8"` |
| f | Date non antérieure au 1er janvier 2026 | `type="date"` avec `min="2026-01-01"` |
| g | Format d'adresse e-mail | `type="email"` |

---

## Exercice 10 — Concevoir un formulaire

### Proposition de corrigé : reservation.html
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Réservation d'une salle de travail</title>
</head>

<body>

    <main>

        <h1>Réserver une salle de travail</h1>

        <form method="get">

            <!-- Coordonnées -->
            <fieldset>
                <legend>Vos coordonnées</legend>

                <p>
                    <label for="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom"
                           required autocomplete="given-name">
                </p>

                <p>
                    <label for="email">Adresse e-mail</label>
                    <input type="email" id="email" name="email"
                           required autocomplete="email">
                </p>
            </fieldset>

            <!-- Date et nombre de personnes -->
            <fieldset>
                <legend>Votre réservation</legend>

                <p>
                    <label for="date">Date de réservation</label>
                    <input type="date" id="date" name="date" required>
                </p>

                <p>
                    <label for="personnes">Nombre de personnes (1 à 8)</label>
                    <input type="number" id="personnes" name="personnes"
                           min="1" max="8" required>
                </p>
            </fieldset>

            <!-- Créneau : un seul choix -->
            <fieldset>
                <legend>Créneau</legend>

                <input type="radio" id="matin" name="creneau" value="matin" required>
                <label for="matin">Matin</label>

                <input type="radio" id="apres-midi" name="creneau" value="apres-midi">
                <label for="apres-midi">Après-midi</label>

                <input type="radio" id="soir" name="creneau" value="soir">
                <label for="soir">Soir</label>
            </fieldset>

            <!-- Équipements : plusieurs choix possibles -->
            <fieldset>
                <legend>Équipements souhaités (facultatif)</legend>

                <input type="checkbox" id="projecteur" name="equipement" value="projecteur">
                <label for="projecteur">Projecteur</label>

                <input type="checkbox" id="tableau" name="equipement" value="tableau">
                <label for="tableau">Tableau blanc</label>

                <input type="checkbox" id="prises" name="equipement" value="prises">
                <label for="prises">Prises électriques</label>
            </fieldset>

            <!-- Commentaire -->
            <p>
                <label for="commentaire">Commentaire (facultatif)</label>
            </p>
            <textarea id="commentaire" name="commentaire" rows="4" cols="40"></textarea>

            <!-- Règlement -->
            <p>
                <input type="checkbox" id="accord" name="accord" value="oui" required>
                <label for="accord">J'accepte le règlement de la bibliothèque</label>
            </p>

            <!-- Envoi -->
            <button type="submit">Réserver la salle</button>

        </form>

    </main>

</body>

</html>
```

**Remarque** : `required` sur un seul des trois boutons radio suffit à rendre le groupe obligatoire. Les élèves peuvent le mettre sur les trois sans que ce soit une erreur.

---

## Exercice 11 — Mini-projet : ma page de présentation

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