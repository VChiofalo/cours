# TP — Café Mirabelle — Corrigé enseignant

> Document **réservé à l'enseignant**. Il contient le code complet, la progression attendue jalon par jalon, les erreurs fréquentes et une grille d'évaluation.

## 1. Contenu du dossier livré

| Fichier | Rôle |
|---|---|
| `tp-cafe-mirabelle-enonce.md` | Énoncé étudiant (6 jalons, annexes A, B, C) |
| `tp-cafe-mirabelle-corrige.md` | Ce document |
| `maquette-cafe-mirabelle.pdf` | Maquette (page 1 : ordinateur, page 2 : mobile) |
| `kit-etudiant/images/` | 9 illustrations en 3 tailles (400, 800, 1200 px de large) |
| `corrige-site/` | Le site corrigé, directement ouvrable (`index.html`, `mentions-legales.html`, `css/style.css`, `images/`) |

Le site corrigé a été testé dans un navigateur à 320, 360, 390, 768 et 1280 px : aucun défilement horizontal, et la mise en page correspond aux deux pages de la maquette.

## 2. Choix pédagogiques et écarts avec la maquette

| Point | Choix |
|---|---|
| **Maquette retenue** | B (café de quartier). Elle mobilise tout le programme : listes, tableau, formulaire, liens/ancres, Flexbox, Grid, responsive |
| **Deux pages** | La maquette montre une page d'accueil. J'ai ajouté `mentions-legales.html` pour pratiquer les chemins relatifs, la réutilisation de la feuille de style et les ancres inter-pages |
| **« Plan du site »** | Remplacé par « Retour en haut » (ancre `#haut`), pour ne pas créer une troisième page |
| **Colonne « Catégorie »** | Masquée sous 40em, comme sur la maquette mobile (`display: none`, puis `display: table-cell`) |
| **Images** | Illustrations vectorielles exportées en JPEG, pas des photos : aucun droit à gérer |
| **Formulaire** | Pas de traitement serveur : `action="#"`. Si vous voulez aller plus loin, vous pouvez le brancher sur un script PHP ou Node |
| **Polices** | Google Fonts (Bricolage Grotesque, Nunito Sans), avec polices de secours. Nécessite Internet ; sans connexion, la page reste lisible |
| **Aucune variable CSS** | Les couleurs sont répétées volontairement : les variables CSS ne sont pas au programme. Bonne piste de refactorisation en fin de semaine |
| **PDF de la maquette** | Rendu avec une police de remplacement (Inter) à la place de Bricolage Grotesque et Nunito Sans |

## 3. Déroulé et points de vigilance

### Jalon 1 — Structure

**État attendu** : une page sans mise en forme, avec les cinq sections, les titres, les paragraphes, la liste des horaires, l'adresse.

| À surveiller | Pourquoi |
|---|---|
| Un seul `h1` | Erreur très fréquente : un `h1` par section |
| `<section>` sans titre | Une section doit avoir un titre ; sinon c'est une `<div>` |
| Horaires dans un `<p>` avec des `<br>` | Contenu de type liste : `<ul>` |
| Adresse dans un `<p>` | `<address>` |
| Oubli du `lang` | Voir la question 1 |

### Jalon 2 — Contenu

**État attendu** : images, tableau, formulaire et pied de page en place, toujours sans CSS.

| À surveiller | Pourquoi |
|---|---|
| `alt` du type « image » ou « photo1 » | Un `alt` décrit ce que l'image apporte |
| `<td>` à la place de `<th>` dans l'en-tête | Cellules d'en-tête : `<th scope="col">` |
| `for` du `<label>` différent de l'`id` du champ | Le libellé n'est pas relié : le clic ne place pas le curseur |
| Un `id` dupliqué | Les `id` sont uniques dans la page |
| `type="text"` pour l'e-mail et la date | Perte de la validation et du calendrier |
| Absence de `name` | Le champ n'est pas envoyé |
| Pas de bouton `type="submit"` | Le formulaire ne s'envoie pas |

### Jalon 3 — Liens et navigation

**État attendu** : menu en liste, ancres fonctionnelles, deuxième page cohérente, lien d'évitement présent.

| À surveiller | Pourquoi |
|---|---|
| `href="#carte"` sur la page des mentions | Pas de `#carte` sur cette page : `index.html#carte` |
| Chemins absolus (`C:\...`, `/index.html`) | Le site ne fonctionne plus une fois déplacé |
| `id` posé sur le lien au lieu de la cible | L'ancre doit viser l'élément à atteindre |
| « Cliquez ici » | Texte de lien explicite |
| Menu sans `<ul>` | Un menu est une liste de liens |

### Jalon 4 — CSS de base

**État attendu** : couleurs, polices, fonds ; les blocs restent empilés.

Contrastes calculés pour la charte (tous conformes) :

| Texte | Fond | Ratio |
|---|---|---|
| `#1d2a22` | `#eef2ec` | 13,2 : 1 |
| `#4d5f53` | `#eef2ec` | 6,0 : 1 |
| `#4d5f53` | `#ffffff` | 6,8 : 1 |
| `#2f5d46` (lien) | `#eef2ec` | 6,7 : 1 |
| `#ffffff` | `#2f5d46` (bouton d'envoi) | 7,6 : 1 |
| `#1d2a22` | `#e0a82e` (bouton principal) | 7,0 : 1 |
| `#b9c8bb` | `#1f3d2e` (texte du pied de page) | 6,8 : 1 |
| `#f0c766` | `#1f3d2e` (titres du pied de page) | 7,4 : 1 |
| Bordure `#7d9283` | `#ffffff` (champs) | 3,3 : 1 (seuil de 3 : 1 pour les éléments non textuels) |

| À surveiller | Pourquoi |
|---|---|
| Lien du bouton qui change de couleur au survol | `a:hover` (spécificité 0-1-1) l'emporte sur `.bouton--principal` (0-1-0) : il faut redéfinir la couleur dans `.bouton--principal:hover`. Excellent exemple de cascade |
| Page courante repérée par une classe | Attendu : `.menu a[aria-current="page"]`, un sélecteur d'attribut |
| Lien du pied de page en bleu foncé sur fond sombre | Il faut les redéfinir dans le pied de page |
| Fichier CSS non relié à `mentions-legales.html` | La deuxième page reste brute |
| `font-family` sans police de secours | Voir la question 1 du jalon 4 |

### Jalon 5 — Mise en page

**État attendu** : la page 1 de la maquette sur grand écran. **Pas encore mobile first** : les étudiants écrivent directement les règles de mise en page desktop dans la feuille de base. Ce sera réorganisé au jalon 6.

Correspondance avec le code final :

| Consigne | Règles du corrigé |
|---|---|
| 1 | `*, *::before, *::after { box-sizing: border-box; }` |
| 2 | `.conteneur`, `.conteneur--etroit` |
| 5 | `.lien-evitement` (positionnement `absolute`, `top: -4rem`) et `.lien-evitement:focus` |
| 6 à 11 | `.entete__barre`, `.menu`, `.menu a`, `.boutons`, `.liste-horaires li`, `.pied__bas-contenu`, `form`, `.champs-ligne` |
| 12 à 15 | `.hero`, `.histoire`, `.galerie__grille`, `.pied__haut` |

| À surveiller | Pourquoi |
|---|---|
| `main` ou `.conteneur` avec une largeur en pixels | Casse le responsive |
| `margin: 0 auto` sur un enfant d'un conteneur flex | L'enfant se rétracte (voir le TD Flexbox) |
| `display: none` pour le lien d'évitement | Il sort de l'ordre du clavier |
| Image de présentation déformée | `object-fit: cover` manquant |
| `display: flex` sur un élément qui n'est pas le parent | Flexbox et Grid se déclarent sur le conteneur |
| Image de présentation qui ne remplit pas la colonne | `height: 100%` sur l'image dans la cellule de la grille |

### Jalon 6 — Responsive

**État attendu** : le site corrigé.

Réorganisation à faire par les étudiants : les règles « desktop » du jalon 5 migrent dans `@media (min-width: 48em)`, et la base décrit le mobile.

| Règle de base (mobile) | Règle `@media (min-width: …)` |
|---|---|
| `.entete__barre` en colonne | `48em` : ligne de `5rem` de haut, `space-between` |
| `.menu` en grille de 2 colonnes, liens bordés | `48em` : `display: flex`, liens sans bordure avec soulignement moutarde |
| `.hero` : texte puis image de `15rem` | `48em` : grille `7fr 6fr` |
| `.histoire` : un seul bloc | `48em` : grille `3fr 2fr` |
| `.col-categorie { display: none }` | `40em` : `display: table-cell` |
| `.galerie__grille` : 2 colonnes | `48em` : 3 colonnes |
| `.champs-ligne` en colonne ; bouton pleine largeur | `40em` : ligne ; bouton `align-self: flex-start` |
| Espacements `2.5rem` | `48em` : `5rem` |

À vérifier :
- `<meta name="viewport">` dans les **deux** pages ;
- `clamp()` sur `h1` (`2.125rem` → `3.375rem`) et `h2` (`1.75rem` → `2.25rem`) ;
- `srcset` et `sizes` sur l'image de présentation et les images de la galerie ;
- `loading="lazy"` **absent** de l'image de présentation ;
- `.pied__haut` : `repeat(auto-fit, minmax(13rem, 1fr))` crée 1 colonne sur mobile et 4 colonnes sur grand écran sans media query.

Points de bascule (largeur de fenêtre) :

| Largeur | Menu | Tableau | Champs date / personnes | Galerie | Hero |
|---|---|---|---|---|---|
| moins de 640 px | grille 2 colonnes | 2 colonnes | l'un sous l'autre | 2 colonnes | empilé |
| 640 à 767 px | grille 2 colonnes | 3 colonnes | côte à côte | 2 colonnes | empilé |
| 768 px et plus | ligne | 3 colonnes | côte à côte | 3 colonnes | 2 colonnes |

## 4. Grille d'évaluation (sur 20)

| Critère | Points |
|---|---|
| **HTML** : structure sémantique, un seul `h1`, hiérarchie des titres, validité W3C | 3 |
| **Contenu** : images (alt, dimensions), tableau (légende, `th scope`), listes, adresse | 3 |
| **Formulaire** : labels reliés, types, `required`, `name`/`id`, `autocomplete` | 2 |
| **Liens et navigation** : menu en liste, ancres, `tel:`/`mailto:`, 2ᵉ page, lien d'évitement, `aria-current` | 2 |
| **CSS de base** : charte respectée, polices avec secours, sélecteurs adaptés, pas de style dans le HTML | 3 |
| **Mise en page** : `border-box`, conteneur, Flexbox, Grid, fidélité à la maquette ordinateur | 3 |
| **Responsive** : viewport, mobile first, media queries `min-width` en `em`, `clamp()`, `srcset`/`sizes`, aucun défilement horizontal | 3 |
| **Qualité et rendu** : arborescence, noms, indentation, commentaires, respect du rendu en `.zip` | 1 |
| **Total** | **20** |

Bonus possibles (+1 maximum) : feuille de style d'impression, thème sombre, variables CSS, grille de la galerie avec `auto-fit`.

## 5. Pistes d'extension

- Remplacer les valeurs répétées par des **variables CSS** (`:root { --vert: #2f5d46; }`).
- Brancher le formulaire sur un script **PHP** ou **Node** pour enregistrer les réservations.
- Ajouter une page « La carte » à part avec des ancres par catégorie.
- Proposer une **requête de conteneur** pour les cartes de la galerie.
- Ajouter un menu mobile déroulant (nécessite un peu de JavaScript).

---

# Code complet

## `index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Café Mirabelle — Café de quartier, fait maison</title>
    <meta name="description" content="Café Mirabelle : pâtisseries du jour, boissons chaudes et petite restauration, dans un café de quartier chaleureux.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body id="haut">

    <a class="lien-evitement" href="#contenu">Aller au contenu</a>

    <!-- ===== En-tête ===== -->
    <header class="entete">
        <div class="conteneur entete__barre">
            <a class="logo" href="index.html">Café Mirabelle</a>
            <nav aria-label="Navigation principale">
                <ul class="menu">
                    <li><a href="index.html" aria-current="page">Accueil</a></li>
                    <li><a href="#carte">La carte</a></li>
                    <li><a href="#infos">Infos pratiques</a></li>
                    <li><a href="#reserver">Réserver</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main id="contenu">

        <!-- ===== Présentation ===== -->
        <section class="hero">
            <div class="hero__texte">
                <p class="hero__surtitre">Café de quartier · fait maison</p>
                <h1>Un café, un gâteau, et le temps de souffler.</h1>
                <p class="hero__intro">Pâtisseries du jour, boissons chaudes et petite restauration, tout au long de la semaine.</p>
                <div class="boutons">
                    <a class="bouton bouton--principal" href="#reserver">Réserver une table</a>
                    <a class="bouton bouton--secondaire" href="#carte">Voir la carte</a>
                </div>
            </div>
            <img class="hero__image"
                 src="images/hero-salle-1200.jpg"
                 srcset="images/hero-salle-800.jpg 800w, images/hero-salle-1200.jpg 1200w"
                 sizes="(min-width: 48em) 46vw, 100vw"
                 alt="La salle du café, avec ses tables rondes en bois et ses suspensions jaunes"
                 width="1200" height="900">
        </section>

        <!-- ===== Histoire et horaires ===== -->
        <section class="histoire conteneur">
            <div class="histoire__texte">
                <h2>Notre histoire</h2>
                <p>Le Café Mirabelle est né d'une envie simple : offrir un endroit chaleureux où l'on se retrouve entre voisins.</p>
                <p>Nos gâteaux sont préparés chaque matin avec des produits de saison.</p>
            </div>
            <aside class="horaires">
                <h2>Horaires</h2>
                <ul class="liste-horaires">
                    <li><span>Lundi – vendredi</span> <strong>8 h – 18 h</strong></li>
                    <li><span>Samedi</span> <strong>9 h – 19 h</strong></li>
                    <li><span>Dimanche</span> <strong>9 h – 13 h</strong></li>
                </ul>
                <address>12 rue de l'Exemple<br>00000 Ville</address>
            </aside>
        </section>

        <!-- ===== La carte ===== -->
        <section class="carte" id="carte">
            <div class="conteneur">
                <h2>La carte</h2>
                <table>
                    <caption>Boissons et pâtisseries (exemple de prix)</caption>
                    <thead>
                        <tr>
                            <th scope="col">Produit</th>
                            <th scope="col" class="col-categorie">Catégorie</th>
                            <th scope="col">Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Espresso</td>
                            <td class="col-categorie">Boisson chaude</td>
                            <td>2,00 €</td>
                        </tr>
                        <tr>
                            <td>Chocolat chaud</td>
                            <td class="col-categorie">Boisson chaude</td>
                            <td>3,50 €</td>
                        </tr>
                        <tr>
                            <td>Tarte à la mirabelle</td>
                            <td class="col-categorie">Pâtisserie</td>
                            <td>4,50 €</td>
                        </tr>
                        <tr>
                            <td>Cookie maison</td>
                            <td class="col-categorie">Pâtisserie</td>
                            <td>2,50 €</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- ===== Galerie ===== -->
        <section class="galerie conteneur">
            <h2>Galerie</h2>
            <ul class="galerie__grille">
                <li>
                    <img src="images/galerie-espresso-800.jpg"
                         srcset="images/galerie-espresso-400.jpg 400w, images/galerie-espresso-800.jpg 800w"
                         sizes="(min-width: 48em) 33vw, 50vw"
                         alt="Un espresso servi dans une tasse blanche, sur sa soucoupe"
                         width="800" height="600" loading="lazy">
                </li>
                <li>
                    <img src="images/galerie-chocolat-800.jpg"
                         srcset="images/galerie-chocolat-400.jpg 400w, images/galerie-chocolat-800.jpg 800w"
                         sizes="(min-width: 48em) 33vw, 50vw"
                         alt="Un chocolat chaud dans une tasse jaune, avec chantilly et guimauves"
                         width="800" height="600" loading="lazy">
                </li>
                <li>
                    <img src="images/galerie-tarte-800.jpg"
                         srcset="images/galerie-tarte-400.jpg 400w, images/galerie-tarte-800.jpg 800w"
                         sizes="(min-width: 48em) 33vw, 50vw"
                         alt="Une tarte aux mirabelles dorées"
                         width="800" height="600" loading="lazy">
                </li>
                <li>
                    <img src="images/galerie-cookies-800.jpg"
                         srcset="images/galerie-cookies-400.jpg 400w, images/galerie-cookies-800.jpg 800w"
                         sizes="(min-width: 48em) 33vw, 50vw"
                         alt="Des cookies aux pépites de chocolat et un verre de lait"
                         width="800" height="600" loading="lazy">
                </li>
                <li>
                    <img src="images/galerie-comptoir-800.jpg"
                         srcset="images/galerie-comptoir-400.jpg 400w, images/galerie-comptoir-800.jpg 800w"
                         sizes="(min-width: 48em) 33vw, 50vw"
                         alt="Le comptoir du café, avec la machine à espresso et les étagères"
                         width="800" height="600" loading="lazy">
                </li>
                <li>
                    <img src="images/galerie-terrasse-800.jpg"
                         srcset="images/galerie-terrasse-400.jpg 400w, images/galerie-terrasse-800.jpg 800w"
                         sizes="(min-width: 48em) 33vw, 50vw"
                         alt="La terrasse du café, avec deux chaises et une petite table ronde"
                         width="800" height="600" loading="lazy">
                </li>
            </ul>
        </section>

        <!-- ===== Réservation ===== -->
        <section class="reservation" id="reserver">
            <div class="conteneur conteneur--etroit">
                <h2>Réserver une table</h2>
                <p class="reservation__intro">Les champs marqués d'une étoile (*) sont obligatoires.</p>

                <form action="#" method="post">
                    <div class="champ">
                        <label for="nom">Nom *</label>
                        <input type="text" id="nom" name="nom" autocomplete="name" required>
                    </div>

                    <div class="champ">
                        <label for="mail">Adresse e-mail *</label>
                        <input type="email" id="mail" name="mail" autocomplete="email" required>
                    </div>

                    <div class="champs-ligne">
                        <div class="champ">
                            <label for="date">Date *</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="champ">
                            <label for="personnes">Nombre de personnes *</label>
                            <select id="personnes" name="personnes" required>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </div>

                    <div class="champ">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="4"></textarea>
                    </div>

                    <button type="submit" class="bouton bouton--vert">Envoyer la demande</button>
                </form>
            </div>
        </section>

    </main>

    <!-- ===== Pied de page ===== -->
    <footer class="pied" id="infos">
        <div class="conteneur pied__haut">

            <div class="pied__bloc">
                <p class="pied__nom">Café Mirabelle</p>
                <p class="pied__accroche">Café de quartier, fait maison.</p>
                <img class="pied__image"
                     src="images/facade-800.jpg"
                     alt="La façade du Café Mirabelle, avec son auvent vert et blanc"
                     width="800" height="500" loading="lazy">
            </div>

            <div class="pied__bloc pied__infos">
                <h2>Infos pratiques</h2>
                <address>12 rue de l'Exemple<br>00000 Ville</address>
                <p>Téléphone : <a href="tel:+330000000000">00 00 00 00 00</a></p>
                <p>E-mail : <a href="mailto:contact@example.com">contact@example.com</a></p>
                <p class="pied__acces">Accès : bus ligne 12, arrêt « Place du Parc ». Arceaux à vélo devant le café.</p>
            </div>

            <div class="pied__bloc">
                <h2>Horaires</h2>
                <ul class="liste-horaires">
                    <li><span>Lun. – ven.</span> <strong>8 h – 18 h</strong></li>
                    <li><span>Samedi</span> <strong>9 h – 19 h</strong></li>
                    <li><span>Dimanche</span> <strong>9 h – 13 h</strong></li>
                </ul>
            </div>

            <div class="pied__bloc">
                <h2>Nous trouver</h2>
                <img class="pied__image pied__image--plan"
                     src="images/plan-800.jpg"
                     alt="Plan du quartier : le café est situé rue de l'Exemple, avec un arrêt de bus à proximité"
                     width="800" height="600" loading="lazy">
            </div>

        </div>

        <div class="pied__bas">
            <div class="conteneur pied__bas-contenu">
                <p>© 2026 Café Mirabelle</p>
                <p class="pied__liens">
                    <a href="mentions-legales.html">Mentions légales</a>
                    <a href="#haut">Retour en haut</a>
                </p>
            </div>
        </div>
    </footer>

</body>
</html>
```

## `mentions-legales.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mentions légales — Café Mirabelle</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body id="haut">

    <a class="lien-evitement" href="#contenu">Aller au contenu</a>

    <!-- ===== En-tête ===== -->
    <header class="entete">
        <div class="conteneur entete__barre">
            <a class="logo" href="index.html">Café Mirabelle</a>
            <nav aria-label="Navigation principale">
                <ul class="menu">
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="index.html#carte">La carte</a></li>
                    <li><a href="index.html#infos">Infos pratiques</a></li>
                    <li><a href="index.html#reserver">Réserver</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main id="contenu" class="page-texte conteneur conteneur--etroit">

        <h1>Mentions légales</h1>

        <section>
            <h2>Éditeur du site</h2>
            <p>
                Café Mirabelle<br>
                12 rue de l'Exemple<br>
                00000 Ville
            </p>
            <p>Contact : <a href="mailto:contact@example.com">contact@example.com</a></p>
        </section>

        <section>
            <h2>Hébergement</h2>
            <p>Ce site est un exercice réalisé dans le cadre d'un cours de formation. Il n'est pas publié en ligne.</p>
        </section>

        <section>
            <h2>Crédits</h2>
            <ul>
                <li>Illustrations : fournies pour l'exercice.</li>
                <li>Polices : Bricolage Grotesque et Nunito Sans, via Google Fonts.</li>
            </ul>
        </section>

        <p><a href="index.html">← Retour à l'accueil</a></p>

    </main>

    <!-- ===== Pied de page ===== -->
    <footer class="pied" id="infos">
        <div class="conteneur pied__haut">

            <div class="pied__bloc">
                <p class="pied__nom">Café Mirabelle</p>
                <p class="pied__accroche">Café de quartier, fait maison.</p>
                <img class="pied__image"
                     src="images/facade-800.jpg"
                     alt="La façade du Café Mirabelle, avec son auvent vert et blanc"
                     width="800" height="500" loading="lazy">
            </div>

            <div class="pied__bloc pied__infos">
                <h2>Infos pratiques</h2>
                <address>12 rue de l'Exemple<br>00000 Ville</address>
                <p>Téléphone : <a href="tel:+330000000000">00 00 00 00 00</a></p>
                <p>E-mail : <a href="mailto:contact@example.com">contact@example.com</a></p>
                <p class="pied__acces">Accès : bus ligne 12, arrêt « Place du Parc ». Arceaux à vélo devant le café.</p>
            </div>

            <div class="pied__bloc">
                <h2>Horaires</h2>
                <ul class="liste-horaires">
                    <li><span>Lun. – ven.</span> <strong>8 h – 18 h</strong></li>
                    <li><span>Samedi</span> <strong>9 h – 19 h</strong></li>
                    <li><span>Dimanche</span> <strong>9 h – 13 h</strong></li>
                </ul>
            </div>

            <div class="pied__bloc">
                <h2>Nous trouver</h2>
                <img class="pied__image pied__image--plan"
                     src="images/plan-800.jpg"
                     alt="Plan du quartier : le café est situé rue de l'Exemple, avec un arrêt de bus à proximité"
                     width="800" height="600" loading="lazy">
            </div>

        </div>

        <div class="pied__bas">
            <div class="conteneur pied__bas-contenu">
                <p>© 2026 Café Mirabelle</p>
                <p class="pied__liens">
                    <a href="mentions-legales.html" aria-current="page">Mentions légales</a>
                    <a href="#haut">Retour en haut</a>
                </p>
            </div>
        </div>
    </footer>

</body>
</html>
```

## `css/style.css`

```css
/* =========================================================
   Café Mirabelle — feuille de style (corrigé enseignant)
   Approche "mobile first" : le CSS de base décrit la version
   mobile, les media queries enrichissent pour les grands écrans.
   ========================================================= */


/* ===== 1. Base (jalon 3 : propriétés de base) ===== */
*, *::before, *::after {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: "Nunito Sans", system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #1d2a22;
    background-color: #eef2ec;
}

h1, h2, h3 {
    font-family: "Bricolage Grotesque", system-ui, "Segoe UI", Arial, sans-serif;
    line-height: 1.15;
}

h2 {
    margin: 0 0 1rem;
    font-size: clamp(1.75rem, 1.4rem + 1.5vw, 2.25rem);
    font-weight: 800;
    color: #1f3d2e;
}

a {
    color: #2f5d46;
}

a:hover {
    color: #1f3d2e;
}

img {
    display: block;
    max-width: 100%;
    height: auto;
}

address {
    font-style: normal;
}


/* ===== 2. Conteneurs (jalon 4 : modèle de boîte) ===== */
.conteneur {
    max-width: 70rem;
    margin: 0 auto;
    padding: 0 1rem;
}

.conteneur--etroit {
    max-width: 45rem;
}


/* ===== 3. Lien d'évitement (jalon 4 : positionnement) ===== */
.lien-evitement {
    position: absolute;
    top: -4rem;
    left: 1rem;
    z-index: 200;
    padding: 0.75rem 1rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    font-weight: 700;
}

.lien-evitement:focus {
    top: 1rem;
}


/* ===== 4. En-tête et navigation (jalon 5 : Flexbox / Grid) ===== */
.entete {
    background-color: #ffffff;
    border-bottom: 1px solid #cfd9cf;
}

.entete__barre {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.logo {
    font-family: "Bricolage Grotesque", system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1.375rem;
    font-weight: 800;
    color: #1f3d2e;
    text-decoration: none;
}

.menu {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.menu a {
    display: block;
    padding: 0.75rem;
    border: 1px solid #cfd9cf;
    border-radius: 0.5rem;
    font-weight: 600;
    color: #1f3d2e;
    text-align: center;
    text-decoration: none;
}

.menu a:hover {
    background-color: #eef2ec;
}

.menu a[aria-current="page"] {
    background-color: #dfe9e0;
    font-weight: 700;
}


/* ===== 5. Boutons ===== */
.bouton {
    display: block;
    padding: 0.875rem 1.5rem;
    border: 0;
    border-radius: 999px;
    font: inherit;
    font-weight: 800;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
}

.bouton--principal {
    background-color: #e0a82e;
    color: #1d2a22;
}

.bouton--principal:hover {
    background-color: #f0c766;
    color: #1d2a22;
}

.bouton--secondaire {
    padding: calc(0.875rem - 2px) calc(1.5rem - 2px);
    border: 2px solid #dfe9e0;
    color: #ffffff;
    font-weight: 700;
}

.bouton--secondaire:hover {
    background-color: rgba(255, 255, 255, 0.12);
    color: #ffffff;
}

.bouton--vert {
    background-color: #2f5d46;
    color: #ffffff;
}

.bouton--vert:hover {
    background-color: #1f3d2e;
    color: #ffffff;
}

.boutons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}


/* ===== 6. Présentation ("hero") ===== */
.hero {
    background-color: #1f3d2e;
    color: #ffffff;
}

.hero__texte {
    padding: 2.5rem 1rem;
}

.hero__surtitre {
    margin: 0 0 0.5rem;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #f0c766;
}

.hero h1 {
    margin: 0 0 1rem;
    font-size: clamp(2.125rem, 1.5rem + 3vw, 3.375rem);
    font-weight: 800;
    line-height: 1.08;
}

.hero__intro {
    margin: 0 0 1.5rem;
    max-width: 30rem;
    font-size: 1.0625rem;
    color: #dfe9e0;
}

.hero__image {
    width: 100%;
    height: 15rem;
    object-fit: cover;
}


/* ===== 7. Histoire et horaires ===== */
.histoire {
    display: grid;
    gap: 1.75rem;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
}

.horaires {
    padding: 1.25rem;
    background-color: #ffffff;
    border: 1px solid #cfd9cf;
    border-radius: 1rem;
}

.horaires h2 {
    margin-bottom: 0.75rem;
    font-size: 1.375rem;
}

.horaires address {
    color: #4d5f53;
}

.liste-horaires {
    margin: 0 0 1rem;
    padding: 0;
    list-style: none;
}

.liste-horaires li {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.liste-horaires li + li {
    margin-top: 0.375rem;
}


/* ===== 8. La carte (tableau) ===== */
.carte {
    padding: 2.5rem 0;
    background-color: #ffffff;
    border-top: 1px solid #cfd9cf;
    border-bottom: 1px solid #cfd9cf;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9375rem;
}

caption {
    padding-bottom: 0.75rem;
    color: #4d5f53;
    text-align: left;
}

th, td {
    padding: 0.625rem;
    border: 1px solid #cfd9cf;
    text-align: left;
}

th {
    background-color: #dfe9e0;
    color: #1f3d2e;
}

th:last-child,
td:last-child {
    text-align: right;
}

.col-categorie {
    display: none;
}


/* ===== 9. Galerie ===== */
.galerie {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
}

.galerie__grille {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.galerie__grille img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: 0.625rem;
}


/* ===== 10. Formulaire de réservation ===== */
.reservation {
    padding: 2.5rem 0;
    background-color: #ffffff;
    border-top: 1px solid #cfd9cf;
}

.reservation h2 {
    margin-bottom: 0.5rem;
}

.reservation__intro {
    margin: 0 0 1.5rem;
    color: #4d5f53;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1.125rem;
}

.champ {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}

.champs-ligne {
    display: flex;
    flex-direction: column;
    gap: 1.125rem;
}

label {
    font-weight: 700;
}

input,
select,
textarea {
    padding: 0.75rem 0.875rem;
    border: 2px solid #7d9283;
    border-radius: 0.5rem;
    font: inherit;
    color: inherit;
    background-color: #ffffff;
}

input:focus-visible,
select:focus-visible,
textarea:focus-visible,
.bouton:focus-visible,
a:focus-visible {
    outline: 3px solid #1f3d2e;
    outline-offset: 2px;
}

.hero a:focus-visible,
.pied a:focus-visible {
    outline-color: #f0c766;
}


/* ===== 11. Pied de page ===== */
.pied {
    background-color: #1f3d2e;
    color: #dfe9e0;
}

.pied__haut {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 2rem 3rem;
    padding-top: 2.5rem;
    padding-bottom: 1.5rem;
}

.pied__nom {
    margin: 0 0 0.375rem;
    font-family: "Bricolage Grotesque", system-ui, "Segoe UI", Arial, sans-serif;
    font-size: 1.375rem;
    font-weight: 800;
    color: #ffffff;
}

.pied__accroche {
    margin: 0 0 1rem;
    color: #b9c8bb;
}

.pied h2 {
    margin: 0 0 0.75rem;
    font-size: 1.125rem;
    color: #f0c766;
}

.pied p {
    margin: 0 0 0.25rem;
}

.pied address {
    margin-bottom: 0.75rem;
}

.pied__infos a {
    color: #ffffff;
}

.pied strong {
    color: #ffffff;
}

.pied__acces {
    margin-top: 0.75rem;
    color: #b9c8bb;
}

.pied__image {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: 0.75rem;
}

.pied__image--plan {
    aspect-ratio: 4 / 3;
}

.pied__bas {
    border-top: 1px solid #35604a;
    font-size: 0.875rem;
}

.pied__bas-contenu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.pied__bas p {
    margin: 0;
}

.pied__liens {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.25rem;
}

.pied__liens a {
    color: #f0c766;
}


/* ===== 12. Page de texte (mentions légales) ===== */
.page-texte {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
}

.page-texte h1 {
    margin: 0 0 1.5rem;
    font-size: clamp(2rem, 1.5rem + 2vw, 2.75rem);
    font-weight: 800;
    color: #1f3d2e;
}


/* =========================================================
   Media queries (jalon 6 : responsive) — du plus petit
   au plus grand, après les règles de base.
   ========================================================= */

/* ----- À partir de 40em (640 px) ----- */
@media (min-width: 40em) {

    .col-categorie {
        display: table-cell;
    }

    .champs-ligne {
        flex-direction: row;
        gap: 1.25rem;
    }

    .champs-ligne .champ {
        flex: 1;
    }

    .bouton--vert {
        align-self: flex-start;
    }

    .boutons {
        flex-direction: row;
        flex-wrap: wrap;
    }
}

/* ----- À partir de 48em (768 px) ----- */
@media (min-width: 48em) {

    .conteneur {
        padding: 0 2rem;
    }

    /* En-tête : une seule ligne */
    .entete__barre {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 5rem;
        padding-top: 0;
        padding-bottom: 0;
    }

    .logo {
        font-size: 1.5rem;
    }

    .menu {
        display: flex;
        gap: 0.25rem;
    }

    .menu a {
        padding: 0.625rem 1rem;
        border: 0;
        border-bottom: 3px solid transparent;
        border-radius: 0;
        text-align: left;
    }

    .menu a:hover {
        background-color: transparent;
        border-bottom-color: #e0a82e;
    }

    .menu a[aria-current="page"] {
        background-color: transparent;
        border-bottom-color: #e0a82e;
    }

    /* Présentation : texte et image côte à côte */
    .hero {
        display: grid;
        grid-template-columns: 7fr 6fr;
    }

    .hero__texte {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5.5rem 4rem;
    }

    .hero__surtitre {
        font-size: 0.875rem;
    }

    .hero__intro {
        margin-bottom: 2rem;
        font-size: 1.1875rem;
    }

    .hero__image {
        height: 100%;
        min-height: 27.5rem;
    }

    /* Histoire et horaires */
    .histoire {
        grid-template-columns: 3fr 2fr;
        gap: 3.5rem;
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    .horaires {
        padding: 1.75rem;
    }

    .horaires h2 {
        font-size: 1.5rem;
    }

    /* Tableau */
    .carte {
        padding: 5rem 0;
    }

    table {
        font-size: 1.0625rem;
    }

    th, td {
        padding: 0.75rem 1rem;
    }

    /* Galerie */
    .galerie {
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    .galerie__grille {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
    }

    .galerie__grille img {
        border-radius: 0.75rem;
    }

    /* Formulaire */
    .reservation {
        padding: 5rem 0;
    }

    .reservation__intro {
        margin-bottom: 2rem;
    }

    form {
        gap: 1.25rem;
    }

    /* Pied de page */
    .pied__haut {
        padding-top: 4rem;
        padding-bottom: 2.5rem;
    }

    .pied h2 {
        margin-bottom: 1rem;
    }

    .page-texte {
        padding-top: 4rem;
        padding-bottom: 4rem;
    }
}

/* ----- Préférence : moins d'animations ----- */
@media (prefers-reduced-motion: reduce) {
    * {
        transition: none;
        animation: none;
    }
}
```
