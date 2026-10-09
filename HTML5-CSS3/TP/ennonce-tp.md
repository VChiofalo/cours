# TP — Le site du Café Mirabelle

**Rendu** : un dossier `cafe-mirabelle*nom-prenom/` compressé en `.zip`, en fin de semaine.

---

## 1. Le contexte

Le **Café Mirabelle**, un café de quartier fictif, souhaite un site web pour présenter sa carte, ses horaires, et permettre de réserver une table. Vous êtes le ou la développeur·se web chargé·e de le réaliser.

Une **maquette** vous est fournie (fichier `maquette-cafe-mirabelle.pdf`) : elle montre le site sur ordinateur (page 1) et sur téléphone (page 2). Votre mission est de la reproduire **fidèlement**, en HTML et en CSS, **sans aucune bibliothèque ni framework**.

Ce TP suit le fil de la semaine : à chaque nouveau chapitre du cours, vous ajoutez une couche à votre site. À la fin, vous avez **votre premier vrai site**, responsive.

## 2. Ce qui vous est fourni

| Élément | Contenu |
|---|---|
| `maquette-cafe-mirabelle.pdf` | La maquette : ordinateur (page 1) et mobile (page 2) |
| `images/` | 27 fichiers : 9 illustrations, chacune en 3 tailles (`-400`, `-800`, `-1200`) |
| **Annexe A** (ce document) | Tous les textes et les données à utiliser |
| **Annexe B** (ce document) | La charte graphique et les mesures de la maquette |
| **Annexe C** (ce document) | Les noms de classes conseillés |

> **Rien à inventer côté contenu** : vous devez copier les textes de l'annexe A. En revanche, la structure HTML, les noms et le CSS sont de votre responsabilité.

Les images fournies sont des **illustrations** créées pour l'exercice ; elles peuvent être utilisées librement dans ce cadre.

## 3. Règles générales

- **Sauvegarde** : à la fin de chaque jalon, enregistrez une copie du dossier sous le nom `cafe-mirabelle-jalon-N` : en cas de problème, vous pourrez revenir en arrière.
- **Arborescence imposée** :
```
cafe-mirabelle/
├── index.html
├── mentions-legales.html
├── css/
│   └── style.css
└── images/
    └── (les images du kit)
```
- Noms de fichiers en **minuscules**, sans espace ni accent.
- Une **seule feuille de style** pour les deux pages.
- Du HTML **valide** : indentation propre, balises fermées, commentaires pour repérer les grandes parties.
- Du HTML **accessible** : textes alternatifs, libellés de formulaire, hiérarchie des titres, liens explicites.
- **Aucun style dans le HTML** : pas d'attribut `style`, pas de balises de présentation.
- Pas de `<br>` pour créer de l'espace, pas de tableau pour la mise en page.
- Vous pouvez utiliser le cours, les aide-mémoire et MDN Web Docs. Copier-coller du code sans le comprendre n'est pas une réponse : vous devez pouvoir expliquer chaque ligne que vous écrivez.

---

## Jalon 1 — La structure de la page

**Objectif** : écrire le squelette HTML de `index.html` et y placer les textes, **sans** images, tableau ni formulaire (ils viendront au jalon 2).

### Consignes

1. Créez l'arborescence du TP (voir plus haut) et copiez le dossier `images/` du kit.
2. Écrivez le **squelette** d'une page HTML5 : type de document, langue, jeu de caractères, titre de la page.
3. Dans le `<body>`, créez les grandes zones avec les balises sémantiques adaptées :
   - un **en-tête** (le logo, sous forme de texte, pour l'instant) ;
   - un **contenu principal** ;
   - un **pied de page**.
4. Dans le contenu principal, créez **cinq sections**, dans cet ordre :
   1. la **présentation** (accroche, titre principal, texte, deux liens-boutons) ;
   2. **« Notre histoire »**, avec ses deux paragraphes, et à côté **les horaires** (un contenu annexe) ;
   3. **« La carte »** ;
   4. **« Galerie »** ;
   5. **« Réserver une table »**.
5. Placez les textes de l'annexe A. Utilisez :
   - **un seul titre de niveau 1** dans toute la page, des titres de niveau 2 pour chaque section ;
   - une **liste** pour les horaires ;
   - l'élément prévu pour une **adresse postale**.
6. Dans le pied de page, ajoutez pour l'instant seulement : le nom du café, son accroche, et le copyright.

---

## Jalon 2 — Le contenu : images, tableau, formulaire

**Objectif** : compléter la page avec les images, le tableau de la carte, le formulaire et le contenu du pied de page.

### Consignes

1. **Image de présentation** : ajoutez l'image `hero-salle-1200.jpg` dans la section de présentation, avec un texte alternatif, une largeur et une hauteur.
2. **Galerie** : dans la section « Galerie », ajoutez les 6 images `galerie-…-800.jpg` dans **une liste non ordonnée**, avec leur texte alternatif (rédigez-le vous-même à partir de la description donnée en annexe A).
3. **Tableau de la carte** : créez le tableau de la section « La carte », avec :
   - un titre de tableau (légende) ;
   - un en-tête (`Produit`, `Catégorie`, `Prix`) et un corps ;
   - des cellules d'en-tête qui précisent si elles concernent une colonne.
4. **Formulaire de réservation** : créez le formulaire de la section « Réserver une table » avec les champs décrits en annexe A. Pour chaque champ :
   - un `<label>` relié au champ ;
   - le **type** adapté (texte, e-mail, date...) ;
   - les attributs `name` et `id` ;
   - l'attribut qui rend le champ obligatoire quand il l'est ;
   - une valeur adaptée pour la saisie automatique (`autocomplete`) pour le nom et l'e-mail.
   
   Le formulaire utilisera `action="#"` et `method="post"` : il n'y a pas de traitement côté serveur dans ce TP.
5. **Pied de page** : complétez-le avec les quatre blocs de l'annexe A (le café et sa façade, les infos pratiques, les horaires, le plan d'accès). Ajoutez les images `facade-800.jpg` et `plan-800.jpg`.
6. **Pied de page, bas** : ajoutez le copyright et deux liens (« Mentions légales » et « Retour en haut », qui seront reliés au jalon 3).

---

## Jalon 3 — Liens et navigation

**Objectif** : relier les éléments entre eux, créer la navigation, et ajouter une deuxième page.

### Consignes

1. **Menu de navigation** : dans l'en-tête, ajoutez un menu avec quatre liens : **Accueil**, **La carte**, **Infos pratiques**, **Réserver**. Utilisez une liste, indiquez à l'aide de l'attribut adapté que vous êtes sur la page « Accueil », et donnez un nom à ce bloc de navigation pour les lecteurs d'écran.
2. **Ancres** : faites en sorte que les liens « La carte », « Infos pratiques » et « Réserver » mènent aux bonnes zones de la page (la section de la carte, le pied de page, le formulaire).
3. **Boutons de présentation** : « Réserver une table » mène au formulaire, « Voir la carte » mène à la carte.
4. **Pied de page** : le numéro de téléphone doit permettre d'appeler (et non seulement de s'afficher), l'adresse e-mail doit ouvrir le logiciel de messagerie. « Retour en haut » ramène en haut de la page.
5. **Lien d'évitement** : ajoutez, tout en haut de la page, un lien « Aller au contenu » qui mène directement au contenu principal (il sera masqué visuellement au jalon 5, mais restera utile au clavier).
6. **Deuxième page** : créez `mentions-legales.html` avec le même en-tête (même menu), le même pied de page, et le contenu de l'annexe A. Sur cette page :
   - les liens du menu doivent mener vers la **page d'accueil** (et ses ancres) ;
   - un lien « ← Retour à l'accueil » termine le contenu.
7. Reliez le lien « Mentions légales » du pied de page à cette page.

---

## Jalon 4 — Couleurs, polices, fonds

**Objectif** : habiller le site avec la charte graphique de l'annexe B. **La mise en page** (colonnes, alignements, espacements) viendra au jalon 5 : à ce stade, les blocs restent les uns sous les autres, et c'est normal.

### Consignes

1. Créez `css/style.css` et reliez-le **aux deux pages**.
2. **Police** : ajoutez dans le `<head>` des deux pages les polices Google Fonts de la charte (voir l'aide-mémoire plus bas) ; dans le CSS, appliquez-les, avec une **police de secours** (`system-ui`, `sans-serif`).
3. **Style de base** (`body`, titres, liens) : police, taille de texte, interligne, couleur de texte, couleur de fond de la page, couleurs des titres, couleur des liens et des liens survolés.
4. **Fonds des sections** : donnez à chaque section le fond indiqué dans l'annexe B (la présentation et le pied de page en vert très foncé, les autres sections en alternance).
5. **Menu** : retirez les puces de la liste, supprimez le soulignement des liens du menu, et mettez en évidence la page courante en utilisant **le sélecteur d'attribut** adapté (celui qui cible `aria-current`).
6. **Boutons** : stylez les deux boutons de la présentation et le bouton d'envoi du formulaire (couleurs, texte en gras, coins arrondis).
7. **Tableau** : bordures, fond de l'en-tête, texte du prix aligné à droite.
8. **Formulaire** : bordures, coins arrondis, police héritée sur les champs.
9. **Pied de page** : couleurs des titres, des liens, des textes.

---

## Jalon 5 — La mise en page

**Objectif** : construire la **version ordinateur** de la maquette (fenêtre d'au moins 1000 px de large) avec le modèle de boîte, le positionnement, Flexbox et Grid.

### Partie A — Modèle de boîte
1. Appliquez à **tous** les éléments le mode de calcul des tailles qui inclut le `padding` et la bordure dans la largeur.
2. Créez la classe de conteneur qui limite le contenu à **70rem** de large, le centre, et ajoute un espacement de **2rem** à gauche et à droite.
3. Appliquez les espacements verticaux des sections, la carte « Horaires » (fond blanc, bordure, coins arrondis, `padding`), les images (coins arrondis, jamais plus larges que leur parent, affichées en bloc).
4. Les titres et paragraphes ont des marges cohérentes, sans « marges qui se cumulent » inattendues.

### Partie B — Positionnement
5. Cachez le **lien d'évitement** hors de l'écran (sans `display: none`), et faites-le apparaître en haut à gauche **uniquement quand il reçoit le focus** clavier.

### Partie C — Flexbox
6. **Barre d'en-tête** : logo à gauche, menu à droite, centrés verticalement, hauteur de `5rem`.
7. **Menu** : liens côte à côte, espacés de `0.25rem`, avec un soulignement épais de couleur moutarde sous la page courante.
8. **Boutons de présentation** : côte à côte, avec un retour à la ligne si la place manque.
9. **Horaires** (aside et pied de page) : le jour à gauche, les heures à droite, sur toute la largeur de la liste.
10. **Bas de pied de page** : copyright à gauche, liens à droite.
11. **Formulaire** : champs en colonne, avec un espace régulier ; la date et le nombre de personnes **côte à côte** sur une même ligne.

### Partie D — Grid
12. **Présentation** : le texte et l'image côte à côte, avec des colonnes dans une proportion de 7 pour 6. L'image remplit toute la hauteur de sa colonne (au moins `27.5rem`) sans se déformer.
13. **Histoire et horaires** : deux colonnes, dans une proportion de 3 pour 2, avec `3.5rem` d'espace.
14. **Galerie** : grille de 3 colonnes égales, `1rem` d'espace, images au format 4/3.
15. **Pied de page** : quatre blocs en colonnes, qui passent automatiquement à la ligne si la place manque.

---

## Jalon 6 — L'adaptation à tous les écrans

**Objectif** : rendre le site utilisable de 320 px de large (petit téléphone) à 1280 px et plus, en reprenant la **page 2 de la maquette** (version mobile).

### Partie A — Préparation
1. Ajoutez la balise de configuration du **viewport** dans le `<head>` des deux pages.
2. Testez la page en **mode appareil** du navigateur à 390 px : qu'est-ce qui ne va pas ? Listez vos constats.

### Partie B — Passer en « mobile first »

À partir de maintenant, le CSS **sans media query** décrit la version **mobile**, et les **media queries `min-width`** ajoutent la version grand écran. Le travail du jalon 5 doit donc être **réorganisé**.

3. Déplacez dans une media query les règles du jalon 5 qui ne conviennent qu'aux grands écrans. Utilisez **deux points de rupture** : `40em` et `48em` (plus petit que `48em` = mobile et petite tablette).
4. Reproduisez les différences de la version mobile (voir annexe B) :
   - **en-tête** : logo au-dessus, menu **sous forme d'une grille de 2 colonnes** de boutons ;
   - **présentation** : texte au-dessus, image dessous (hauteur `15rem`) ; boutons l'un sous l'autre sur toute la largeur ;
   - **histoire** : horaires sous le texte ;
   - **tableau** : sur mobile, la colonne « Catégorie » est masquée ;
   - **galerie** : 2 colonnes sur mobile, 3 colonnes dès `48em` ;
   - **formulaire** : tous les champs en colonne ; date et nombre de personnes côte à côte dès `40em` ; bouton d'envoi pleine largeur sur mobile ;
   - **espacements** : les espacements verticaux des sections passent de `2.5rem` à `5rem` dès `48em`.
5. **Titres fluides** : le `h1` doit varier **sans media query** entre `2.125rem` et `3.375rem`, et les `h2` entre `1.75rem` et `2.25rem`, avec une valeur qui dépend de la largeur de la fenêtre (`clamp()`).

### Partie C — Images adaptées
6. Pour l'image de présentation et les images de la galerie, proposez **plusieurs tailles** au navigateur avec `srcset` et `sizes` (les images sont fournies en 400, 800 et 1200 px de large).
7. Ajoutez le chargement différé aux images qui ne sont pas visibles dès l'ouverture de la page (galerie, pied de page), **mais pas** à l'image de présentation.

### Pour aller plus loin
- Ajoutez une feuille de style pour l'**impression** (`@media print`) : masquer le menu et le formulaire, afficher en noir sur blanc.
- Ajoutez un **thème sombre** avec `prefers-color-scheme` : n'oubliez pas de revérifier tous les contrastes.
- Remplacez la mise en page de la galerie par une grille automatique avec `repeat(auto-fit, minmax(...))`.

---

## Finalisation et rendu

1. **Valider le HTML** des deux pages avec https://validator.w3.org/ et **le CSS** avec https://jigsaw.w3.org/css-validator/.
2. Nettoyer le dossier : supprimez les images non utilisées et les anciennes copies.
3. Compresser le dossier `cafe-mirabelle/` en `cafe-mirabelle-nom-prenom.zip` et le déposer.

## Ce qui sera évalué

| Domaine | Ce qu'on regarde |
|---|---|
| **HTML** | Structure sémantique, hiérarchie des titres, validité, tableau, liens |
| **Formulaire et accessibilité** | Libellés reliés, types de champs, champs obligatoires, textes alternatifs, clavier |
| **CSS** | Fidélité à la charte, organisation, sélecteurs adaptés, pas de style dans le HTML |
| **Mise en page** | Modèle de boîte, Flexbox, Grid, fidélité à la maquette |
| **Responsive** | Mobile first, media queries, titres fluides, images adaptées, aucun défilement horizontal |
| **Qualité** | Arborescence, noms de fichiers, indentation, commentaires, soin |

---

# Annexe A — Contenus à utiliser

## A.1 Pages et titres

| Page | Titre de l'onglet (`<title>`) |
|---|---|
| `index.html` | Café Mirabelle — Café de quartier, fait maison |
| `mentions-legales.html` | Mentions légales — Café Mirabelle |

## A.2 En-tête
- Logo (texte) : **Café Mirabelle**
- Menu : Accueil · La carte · Infos pratiques · Réserver

## A.3 Présentation
- Surtitre : `Café de quartier · fait maison`
- Titre principal (`h1`) : `Un café, un gâteau, et le temps de souffler.`
- Texte : `Pâtisseries du jour, boissons chaudes et petite restauration, tout au long de la semaine.`
- Boutons : `Réserver une table` · `Voir la carte`

## A.4 Notre histoire
- Titre : `Notre histoire`
- Paragraphe 1 : `Le Café Mirabelle est né d'une envie simple : offrir un endroit chaleureux où l'on se retrouve entre voisins.`
- Paragraphe 2 : `Nos gâteaux sont préparés chaque matin avec des produits de saison.`

## A.5 Horaires
- Titre : `Horaires`
- Lundi – vendredi : 8 h – 18 h
- Samedi : 9 h – 19 h
- Dimanche : 9 h – 13 h
- Adresse : `12 rue de l'Exemple` / `00000 Ville`

## A.6 La carte
- Titre : `La carte`
- Légende du tableau : `Boissons et pâtisseries (exemple de prix)`

| Produit | Catégorie | Prix |
|---|---|---|
| Espresso | Boisson chaude | 2,00 € |
| Chocolat chaud | Boisson chaude | 3,50 € |
| Tarte à la mirabelle | Pâtisserie | 4,50 € |
| Cookie maison | Pâtisserie | 2,50 € |

## A.7 Galerie
Titre : `Galerie`

| Fichier | Ce qu'on y voit (à reformuler en texte alternatif) |
|---|---|
| `galerie-espresso-800.jpg` | Un espresso dans une tasse blanche, sur une soucoupe |
| `galerie-chocolat-800.jpg` | Un chocolat chaud dans une tasse jaune, avec chantilly et guimauves |
| `galerie-tarte-800.jpg` | Une tarte aux mirabelles dorées |
| `galerie-cookies-800.jpg` | Des cookies aux pépites de chocolat et un verre de lait |
| `galerie-comptoir-800.jpg` | Le comptoir du café, la machine à espresso et les étagères |
| `galerie-terrasse-800.jpg` | La terrasse, avec deux chaises et une petite table ronde |

Autres images :

| Fichier | Où ? | Ce qu'on y voit |
|---|---|---|
| `hero-salle-1200.jpg` | Présentation | La salle du café, ses tables rondes en bois et ses suspensions jaunes |
| `facade-800.jpg` | Pied de page | La façade du café, avec son auvent vert et blanc |
| `plan-800.jpg` | Pied de page | Le plan du quartier, avec le café rue de l'Exemple et un arrêt de bus |

## A.8 Formulaire de réservation
- Titre : `Réserver une table`
- Texte d'introduction : `Les champs marqués d'une étoile (*) sont obligatoires.`

| Libellé | Type de champ | Obligatoire | Remarques |
|---|---|---|---|
| Nom * | Texte | Oui | Saisie automatique : nom |
| Adresse e-mail * | E-mail | Oui | Saisie automatique : e-mail |
| Date * | Date | Oui | — |
| Nombre de personnes * | Liste déroulante | Oui | Choix : 2, 4, 6 |
| Message | Zone de texte (4 lignes) | Non | — |

- Bouton : `Envoyer la demande`

## A.9 Pied de page

**Bloc 1** : `Café Mirabelle` · `Café de quartier, fait maison.` · image de la façade

**Bloc 2** — titre `Infos pratiques` :
- `12 rue de l'Exemple`, `00000 Ville`
- Téléphone : `00 00 00 00 00`
- E-mail : `contact@example.com`
- `Accès : bus ligne 12, arrêt « Place du Parc ». Arceaux à vélo devant le café.`

**Bloc 3** — titre `Horaires` : mêmes horaires que le jalon 1, avec « Lun. – ven. »

**Bloc 4** — titre `Nous trouver` : image du plan

**Bas** : `© 2026 Café Mirabelle` · `Mentions légales` · `Retour en haut`

## A.10 Mentions légales
Titre (`h1`) : `Mentions légales`

- **Éditeur du site** : Café Mirabelle, 12 rue de l'Exemple, 00000 Ville. Contact : `contact@example.com`
- **Hébergement** : `Ce site est un exercice réalisé dans le cadre d'un cours de formation. Il n'est pas publié en ligne.`
- **Crédits** : `Illustrations : fournies pour l'exercice.` · `Polices : Bricolage Grotesque et Nunito Sans, via Google Fonts.`
- Lien final : `← Retour à l'accueil`

---

# Annexe B — Charte graphique et mesures

## B.1 Couleurs

| Rôle | Couleur |
|---|---|
| Vert très foncé : présentation, pied de page, titres, logo | `#1f3d2e` |
| Vert : liens, bouton d'envoi | `#2f5d46` |
| Fond de page (sauge) | `#eef2ec` |
| Sauge clair : en-tête du tableau, page courante sur mobile, texte secondaire de la présentation | `#dfe9e0` |
| Fond blanc : en-tête, carte, formulaire, aside | `#ffffff` |
| Texte principal | `#1d2a22` |
| Texte secondaire | `#4d5f53` |
| Bordures | `#cfd9cf` |
| Bordure des champs de formulaire | `#7d9283` |
| Moutarde : bouton principal, soulignement de la page courante | `#e0a82e` |
| Moutarde clair : surtitre, titres et liens du pied de page | `#f0c766` |
| Texte secondaire dans le pied de page | `#b9c8bb` |
| Séparateur du pied de page | `#35604a` |

## B.2 Polices

| Usage | Police | Graisse |
|---|---|---|
| Logo, titres | Bricolage Grotesque | 800 (gras) |
| Texte | Nunito Sans | 400 ; 600 pour le menu ; 700 pour les libellés |

Taille de texte : `1rem` ; interligne : `1.6`.

## B.3 Mesures principales

| Élément | Mobile (< 48em) | Ordinateur (≥ 48em) |
|---|---|---|
| Largeur maximale du contenu | toute la largeur, 1rem de marge | 70rem, 2rem de marge |
| En-tête | logo au-dessus, menu en grille de 2 colonnes | une ligne de 5rem de haut |
| Menu : liens | boutons bordés, texte centré | liens simples, soulignement moutarde sous la page courante |
| Présentation | texte puis image (15rem de haut) | 2 colonnes (7fr / 6fr), image de 27.5rem minimum |
| Padding du texte de présentation | 2.5rem 1rem | 5.5rem 4rem |
| Espacement vertical des sections | 2.5rem | 5rem |
| Histoire / horaires | l'un sous l'autre | 2 colonnes (3fr / 2fr), espace de 3.5rem |
| Galerie | 2 colonnes (espace 0.75rem) | 3 colonnes (espace 1rem) |
| Tableau | 2 colonnes : colonne « Catégorie » masquée | 3 colonnes |
| Formulaire | champs en colonne | date et nombre de personnes côte à côte dès 40em |
| Pied de page | blocs en colonnes automatiques (13rem minimum), espace 2rem / 3rem | |
| Coins arrondis | images 0.625rem, carte « horaires » 1rem, boutons en pilule (999px) | images 0.75rem |

## B.4 Taille des titres (fluides)
- `h1` de la présentation : de `2.125rem` à `3.375rem`.
- `h2` des sections : de `1.75rem` à `2.25rem`.

---

# Annexe C — Noms de classes conseillés

Vous pouvez adapter ces noms, mais restez **cohérents** d'un bout à l'autre du site.

| Élément | Classe |
|---|---|
| Lien d'évitement | `lien-evitement` |
| En-tête, barre intérieure | `entete`, `entete__barre` |
| Logo | `logo` |
| Liste du menu | `menu` |
| Conteneur centré | `conteneur` (et `conteneur--etroit` : 45rem) |
| Présentation | `hero`, `hero__texte`, `hero__surtitre`, `hero__intro`, `hero__image` |
| Boutons | `boutons`, `bouton`, `bouton--principal`, `bouton--secondaire`, `bouton--vert` |
| Histoire | `histoire`, `horaires`, `liste-horaires` |
| Carte, tableau | `carte`, `col-categorie` |
| Galerie | `galerie`, `galerie__grille` |
| Formulaire | `reservation`, `champ`, `champs-ligne` |
| Pied de page | `pied`, `pied__haut`, `pied__bloc`, `pied__image`, `pied__bas` |
| Page de texte | `page-texte` |

---

# Aide-mémoire — Google Fonts

À placer dans le `<head>`, **avant** votre feuille de style :
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```
Puis, dans le CSS :
```css
font-family: "Nunito Sans", system-ui, "Segoe UI", Arial, sans-serif;
```
> Les polices Google Fonts nécessitent une connexion Internet. Sans connexion, la police de secours est utilisée : le site reste lisible.