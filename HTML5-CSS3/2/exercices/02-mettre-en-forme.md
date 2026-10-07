# Mettre en forme ma page de présentation

Vous allez donner une identité visuelle à la page de présentation créée lors du premier TP. Vous pouvez utiliser **votre propre version**, ou le fichier de départ ci-dessous. Si vos noms de classes ou d'identifiants sont différents, adaptez les sélecteurs.

## Fichier de départ : index.html

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

## Palette à utiliser

| Rôle | Couleur |
|---|---|
| Texte | `#222222` |
| Fond de page | `#f7f7f7` |
| Couleur principale | `#336699` |
| Couleur sombre | `#1f4068` |
| Liens | `#0b5cad` |
| Fond clair | `#e8eef5` |
| Blanc | `#ffffff` |

## Étape 0 — Relier la feuille de style

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

## Étape 1 — Le style de base

Dans `style.css`, écrivez une règle pour la page entière avec :
- la police : `system-ui`, puis `"Segoe UI"`, puis `Arial`, puis une famille générique adaptée ;
- une taille de `1rem` et un interligne de `1.5` ;
- la couleur de texte et la couleur de fond de la palette ;
- `margin: 0`.

## Étape 2 — L'en-tête

Pour l'élément `<header>` :
- un fond en **dégradé horizontal** de la couleur principale vers la couleur sombre ;
- un texte blanc, centré ;
- `padding: 1rem`.

Puis :
- mettez l'accroche en italique ;
- donnez au titre `<h1>` une taille de `2.5rem` et un espacement des lettres de `0.05em`.

## Étape 3 — Les titres

- `<h2>` : taille `1.75rem`, couleur sombre de la palette ;
- `<h3>` : taille `1.25rem`, couleur principale.

## Étape 4 — La navigation et les liens

- donnez à la navigation le fond clair de la palette, avec `padding: 0.5rem 1rem` ;
- donnez aux liens la couleur prévue pour les liens. Conservez leur soulignement.

## Étape 5 — Les cartes et la zone « Liens utiles »

- les cartes (`.carte`) : fond blanc, `padding: 1rem` ;
- la zone `<aside>` : fond de la couleur principale **avec seulement 10 % d'opacité**, `padding: 1rem`.

**Question.** Pourquoi utilise-t-on `rgba()` et non la propriété `opacity` pour l'`<aside>` ?

## Étape 6 — Le pied de page

- fond de la couleur la plus sombre (celle du texte) ;
- texte de la couleur du fond de page, centré ;
- `padding: 1rem`.

## Étape 7 — Vérifications

1. Rafraîchissez **les deux pages** : l'en-tête et le pied de page doivent être cohérents.
2. Avec le sélecteur de couleur des outils de développement, vérifiez le **contraste** de chaque texte avec son fond. **Un élément pose problème** : trouvez-le et corrigez-le.
3. Dans votre feuille de style, ajoutez temporairement `html { font-size: 20px; }`. Que se passe-t-il pour les tailles écrites en `rem` ? Supprimez ensuite cette règle.
4. Où avez-vous défini la police de la page ? Pourquoi n'a-t-elle pas été nécessaire de la répéter pour les titres, les paragraphes et les éléments de liste ?

## Bonus - Pour aller plus loin

- Remplacez le dégradé de l'en-tête par une **image de fond** (`../images/banniere.jpg`) qui couvre tout l'en-tête (`cover`) et reste centrée. Prévoyez une couleur de repli et vérifiez que le texte reste lisible.
- Remplacez `rgba()` par `opacity: 0.1` sur l'`<aside>` : qu'observez-vous ?
- Testez d'autres combinaisons de couleurs en modifiant la luminosité d'une valeur `hsl()`.