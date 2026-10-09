## Utilisation des composants Bootstrap : boutons, formulaires, modales

Nous savons ajouter Bootstrap à une page (partie A) et organiser le contenu avec sa grille (partie B). Il reste ce qui fait gagner le plus de temps : les **composants**, des éléments d'interface déjà conçus, stylés et testés.

Un composant s'utilise toujours de la même façon :
1. on écrit le **HTML** d'un élément (souvent le HTML sémantique que nous connaissons déjà) ;
2. on ajoute les **classes** de Bootstrap qui lui donnent son apparence ;
3. pour les composants qui réagissent (modale, menu qui se déplie), on ajoute des **attributs `data-bs-…`** : le JavaScript de Bootstrap s'occupe du reste, sans que vous écriviez de script.

Dans ce chapitre, nous verrons :
- les **boutons** : variantes, tailles, états, groupes ;
- les **formulaires** : champs, cases, listes, étiquettes flottantes, mise en page et **validation** ;
- les **modales** : structure, ouverture, options, accessibilité et contrôle en JavaScript ;
- un **exemple complet** qui combine les trois ;
- les **erreurs courantes** à éviter.

> **Rappel** : les composants interactifs (comme la modale) exigent la ligne `<script>` de `bootstrap.bundle.min.js` avant `</body>`. Sans elle, le style s'affiche mais rien ne bouge.

## Les boutons

### La base

Un bouton Bootstrap est un élément HTML ordinaire (`<button>` ou `<a>`) auquel on ajoute la classe `btn`, puis une classe de **variante** qui donne la couleur.

```html
<button type="button" class="btn btn-primary">Valider</button>
<a class="btn btn-primary" href="#reserver">Réserver</a>
```

La classe `btn` seule donne la forme, les espacements et les états (survol, focus, clic). La variante donne la couleur.

| Classe | Usage habituel |
|---|---|
| `btn-primary` | Action principale |
| `btn-secondary` | Action secondaire |
| `btn-success` | Confirmation, réussite |
| `btn-danger` | Action dangereuse (supprimer) |
| `btn-warning` | Attention |
| `btn-info` | Information |
| `btn-light` / `btn-dark` | Neutres clair / sombre |
| `btn-link` | Bouton qui ressemble à un lien |

### Quel élément choisir ?

C'est une règle de sémantique que nous connaissons déjà :

| Élément | Quand l'utiliser |
|---|---|
| `<button>` | Une **action** : envoyer un formulaire, ouvrir une modale, valider |
| `<a href="...">` | Une **navigation** vers une autre page ou une ancre |

Un bouton qui n'envoie pas de formulaire doit avoir `type="button"`, sinon il se comporte comme un bouton d'envoi dans un `<form>`.

### Les boutons « contour »

En remplaçant `btn-` par `btn-outline-`, on obtient un bouton **sans fond**, avec une bordure et un texte colorés. Le fond apparaît au survol.

```html
<button type="button" class="btn btn-outline-primary">Voir la carte</button>
<button type="button" class="btn btn-outline-secondary">Annuler</button>
```

C'est utile pour distinguer une action principale (bouton plein) d'une action secondaire (bouton contour), comme les deux boutons de la présentation de notre site.

### Les tailles

| Classe | Effet |
|---|---|
| `btn-lg` | Grand bouton |
| (rien) | Taille normale |
| `btn-sm` | Petit bouton |

```html
<button type="button" class="btn btn-success btn-lg">Réserver une table</button>
<button type="button" class="btn btn-success btn-sm">Détails</button>
```

### Les boutons pleine largeur

Sur mobile, un bouton qui occupe toute la largeur est plus facile à toucher. Deux méthodes :

```html
<!-- Un seul bouton : utilitaire de largeur -->
<button type="button" class="btn btn-primary w-100">Envoyer</button>

<!-- Plusieurs boutons empilés avec un espace -->
<div class="d-grid gap-2">
    <button type="button" class="btn btn-primary">Réserver une table</button>
    <button type="button" class="btn btn-outline-primary">Voir la carte</button>
</div>
```

Pour des boutons en pleine largeur **seulement sur mobile**, on ajoute une variante responsive : `d-grid gap-2 d-md-flex` signifie « en grille (boutons pleine largeur, empilés) jusqu'à 768 px, puis en ligne à partir de 768 px ».

### Les états

| Besoin | Code |
|---|---|
| Bouton **désactivé** (`<button>`) | `<button class="btn btn-primary" disabled>Envoyer</button>` |
| Lien désactivé (`<a>`) | `<a class="btn btn-primary disabled" href="#" tabindex="-1" aria-disabled="true">Indisponible</a>` |
| Bouton **actif** (enfoncé) | `class="btn btn-primary active" aria-pressed="true"` |

L'attribut `disabled` ne s'applique qu'aux `<button>`. Pour un lien, on ajoute la classe `disabled`, l'attribut `aria-disabled="true"` et `tabindex="-1"` pour qu'on ne puisse plus l'atteindre au clavier.

### Les groupes de boutons

`btn-group` colle plusieurs boutons les uns à côté des autres.

```html
<div class="btn-group" role="group" aria-label="Choix du nombre de personnes">
    <button type="button" class="btn btn-outline-success">2</button>
    <button type="button" class="btn btn-outline-success">4</button>
    <button type="button" class="btn btn-outline-success">6</button>
</div>
```

Pensez à `role="group"` et à `aria-label` : les lecteurs d'écran annoncent ainsi à quoi correspond le groupe.

### Le bouton de fermeture

Bootstrap fournit une croix prête à l'emploi, utilisée dans les modales et les alertes :
```html
<button type="button" class="btn-close" aria-label="Fermer"></button>
```
L'attribut `aria-label` est indispensable, car le bouton ne contient aucun texte visible.

### Accessibilité et couleurs

Les couleurs par défaut respectent en général les contrastes, mais **pas toutes les combinaisons** : si vous changez les couleurs (voir la personnalisation avec les variables `--bs-btn-…`), vérifiez à nouveau les contrastes avec un outil. Et ne transmettez jamais une information **par la seule couleur** : un bouton rouge doit aussi dire « Supprimer ».

## Les formulaires

Les formulaires Bootstrap utilisent le **HTML de formulaire que nous connaissons** (`label`, `input`, `select`, `textarea`, `for`/`id`, `name`, `required`...) et ajoutent des classes pour le style. Rien ne remplace un bon `<label>` relié à son champ.

### Un champ de texte

```html
<div class="mb-3">
    <label for="nom" class="form-label">Nom</label>
    <input type="text" class="form-control" id="nom" name="nom" required autocomplete="name">
    <div class="form-text">Le nom qui sera indiqué sur la réservation.</div>
</div>
```

| Élément | Classe | Rôle |
|---|---|---|
| Bloc d'un champ | `mb-3` | Espace sous chaque champ |
| `label` | `form-label` | Libellé du champ |
| `input`, `textarea` | `form-control` | Style du champ (pleine largeur, bordure, focus) |
| Aide sous le champ | `form-text` | Texte d'explication |

La classe `form-control` s'applique aux `input` de type texte, e-mail, mot de passe, date, nombre, fichier, ainsi qu'aux `textarea`. Les attributs HTML (`type`, `required`, `autocomplete`...) gardent leur rôle : le navigateur continue de vérifier qu'un e-mail ressemble à un e-mail.

```html
<label for="message" class="form-label">Message</label>
<textarea class="form-control" id="message" name="message" rows="4"></textarea>
```

### La liste déroulante : `form-select`

```html
<label for="personnes" class="form-label">Nombre de personnes</label>
<select class="form-select" id="personnes" name="personnes">
    <option value="2">2 personnes</option>
    <option value="4">4 personnes</option>
    <option value="6">6 personnes</option>
</select>
```

Pour une liste, on utilise `form-select` (et non `form-control`).

### Cases à cocher et boutons radio

Chaque case est dans un bloc `form-check`, avec une classe pour la case et une classe pour son libellé.

```html
<div class="form-check">
    <input class="form-check-input" type="checkbox" id="newsletter" name="newsletter">
    <label class="form-check-label" for="newsletter">Recevoir la lettre du café</label>
</div>

<fieldset class="mb-3">
    <legend class="form-label">Où souhaitez-vous vous asseoir ?</legend>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="place" id="salle" value="salle" checked>
        <label class="form-check-label" for="salle">En salle</label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="place" id="terrasse" value="terrasse">
        <label class="form-check-label" for="terrasse">En terrasse</label>
    </div>
</fieldset>
```

| Besoin | Classe |
|---|---|
| Cases sur une même ligne | `form-check-inline` sur chaque `form-check` |
| Interrupteur (*switch*) | `form-check form-switch` sur le bloc |
| Case désactivée | attribut `disabled` |

Les boutons radio d'un même choix partagent le même `name` : c'est le HTML, pas Bootstrap, qui fait que l'un décoche l'autre. Un groupe de choix se place dans un `<fieldset>` avec une `<legend>`, comme nous l'avons vu au chapitre sur les formulaires.

### Taille et état d'un champ

| Besoin | Classe ou attribut |
|---|---|
| Grand champ / petit champ | `form-control-lg` / `form-control-sm` |
| Champ désactivé | `disabled` |
| Champ en lecture seule | `readonly` |
| Sélecteur de fichier | `<input type="file" class="form-control">` |
| Curseur | `<input type="range" class="form-range">` |

### Les groupes de champs : `input-group`

Pour accoler un texte, une icône ou un bouton à un champ :

```html
<div class="input-group mb-3">
    <span class="input-group-text" id="at">@</span>
    <input type="text" class="form-control" placeholder="pseudo" aria-label="Pseudo" aria-describedby="at">
</div>

<div class="input-group mb-3">
    <input type="email" class="form-control" placeholder="Votre e-mail" aria-label="Votre e-mail">
    <button class="btn btn-outline-secondary" type="button">S'abonner</button>
</div>
```

Attention : quand le libellé n'est pas un `<label>` visible, il faut un `aria-label` sur le champ, sinon il n'a pas d'étiquette accessible.

### Les étiquettes flottantes : `form-floating`

Le libellé se place **dans** le champ, puis remonte quand on saisit du texte.

```html
<div class="form-floating mb-3">
    <input type="email" class="form-control" id="mail" name="mail" placeholder="nom@exemple.fr">
    <label for="mail">Adresse e-mail</label>
</div>
```

Deux règles essentielles : le `<label>` se place **après** le champ, et le champ doit avoir un attribut `placeholder` (même si on ne le voit pas), car Bootstrap s'en sert pour savoir si le champ est vide.

### La mise en page d'un formulaire avec la grille

Les champs se placent dans une `.row` avec des colonnes, comme au chapitre précédent.

```html
<form action="#" method="post">
    <div class="row g-3">
        <div class="col-md-6">
            <label for="nom" class="form-label">Nom</label>
            <input type="text" class="form-control" id="nom" name="nom" required>
        </div>
        <div class="col-md-6">
            <label for="mail" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="mail" name="mail" required>
        </div>
        <div class="col-md-8">
            <label for="date" class="form-label">Date</label>
            <input type="date" class="form-control" id="date" name="date" required>
        </div>
        <div class="col-md-4">
            <label for="personnes" class="form-label">Personnes</label>
            <select class="form-select" id="personnes" name="personnes">
                <option>2</option>
                <option>4</option>
                <option>6</option>
            </select>
        </div>
        <div class="col-12">
            <button type="submit" class="btn btn-success">Envoyer la demande</button>
        </div>
    </div>
</form>
```

Sur mobile, tous les champs sont empilés. Dès 768 px, ils se placent par deux. C'est le formulaire du TP, avec la date et le nombre de personnes côte à côte.

### La validation

Bootstrap n'invente pas la validation : il **met en forme** le résultat des vérifications du navigateur (attributs `required`, `type="email"`, `minlength`, `pattern`...). Il propose deux affichages : bordure verte (champ valide) ou rouge (champ invalide), avec un message.

**1. Les messages.** Sous chaque champ, on prépare le message d'erreur :
```html
<div class="col-md-6">
    <label for="mail" class="form-label">E-mail</label>
    <input type="email" class="form-control" id="mail" name="mail" required>
    <div class="invalid-feedback">Merci d'indiquer une adresse e-mail valide.</div>
</div>
```
Le message `invalid-feedback` est **caché** par défaut. Il apparaît quand le champ est marqué comme invalide.

**2. L'activation.** On ajoute `novalidate` au formulaire (pour désactiver les bulles du navigateur) et la classe `needs-validation`. Un court script ajoute alors la classe `was-validated` à l'envoi :

```html
<form class="needs-validation" novalidate action="#" method="post">
    ...
</form>

<script>
    (() => {
        'use strict';
        const formulaires = document.querySelectorAll('.needs-validation');
        formulaires.forEach((formulaire) => {
            formulaire.addEventListener('submit', (evenement) => {
                if (!formulaire.checkValidity()) {
                    evenement.preventDefault();       // on bloque l'envoi
                    evenement.stopPropagation();
                }
                formulaire.classList.add('was-validated');   // affiche vert/rouge et messages
            });
        });
    })();
</script>
```

Ce script, fourni par la documentation, vérifie le formulaire (`checkValidity()`), bloque l'envoi s'il contient des erreurs, et ajoute `was-validated` pour afficher les états.

Trois remarques :
- Les **règles** de validation restent celles du HTML (`required`, `type`, `pattern`...) : Bootstrap ne vérifie rien lui-même.
- Cette validation côté navigateur **ne remplace jamais** la validation côté serveur. En PHP ou en Node, vous devez revérifier toutes les données reçues.
- Pour un affichage « à la main » (par exemple après un retour du serveur), on peut ajouter vous-même `is-invalid` ou `is-valid` sur un champ.

## Les modales

Une **modale** est une fenêtre qui s'affiche **au-dessus** de la page, sur un fond assombri. Tant qu'elle est ouverte, le reste de la page est inactif. On l'utilise pour une confirmation, un formulaire court, un détail à afficher.

### La structure

Une modale se compose d'un **bouton déclencheur** et du **bloc modal**.

```html
<!-- 1. Le bouton qui ouvre la modale -->
<button type="button" class="btn btn-success"
        data-bs-toggle="modal" data-bs-target="#modale-reservation">
    Réserver une table
</button>

<!-- 2. La modale -->
<div class="modal fade" id="modale-reservation" tabindex="-1"
     aria-labelledby="titre-modale" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <h2 class="modal-title fs-5" id="titre-modale">Réserver une table</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>

            <div class="modal-body">
                <p>Contenu de la modale.</p>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-success">Confirmer</button>
            </div>

        </div>
    </div>
</div>
```

| Élément | Rôle |
|---|---|
| `data-bs-toggle="modal"` | Indique que ce bouton **ouvre** une modale |
| `data-bs-target="#modale-reservation"` | Désigne la modale à ouvrir, par son `id` |
| `.modal` | La modale (cachée par défaut) |
| `.fade` | Animation d'apparition |
| `tabindex="-1"` | Évite que la modale soit atteinte avec la touche `Tab` quand elle est fermée |
| `aria-labelledby="titre-modale"` | Relie la modale à son titre, pour les lecteurs d'écran |
| `.modal-dialog` | Positionne et dimensionne la boîte |
| `.modal-content` | Le contenu : fond, bordure, coins arrondis |
| `.modal-header` | En-tête : titre + croix de fermeture |
| `.modal-title` | Titre de la modale |
| `.modal-body` | Corps |
| `.modal-footer` | Pied : boutons d'action |
| `data-bs-dismiss="modal"` | Indique que ce bouton **ferme** la modale |

Sans écrire de JavaScript, la modale s'ouvre, se ferme (croix, bouton « Annuler », touche `Échap`, clic en dehors) et ses états sont gérés.

Le lien entre le bouton et la modale se fait par l'**`id`** : le `data-bs-target` doit correspondre exactement à l'`id` de la modale, avec le `#`.

### Les variantes de taille et d'affichage

Ces classes se placent sur le `.modal-dialog` :

| Classe | Effet |
|---|---|
| `modal-dialog-centered` | Centre la modale verticalement |
| `modal-dialog-scrollable` | Seul le corps défile si le contenu est long |
| `modal-sm` / `modal-lg` / `modal-xl` | Petite / grande / très grande |
| `modal-fullscreen` | Plein écran |
| `modal-fullscreen-md-down` | Plein écran sous 768 px (très utile sur mobile) |

```html
<div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
```

### Fond statique

Par défaut, un clic en dehors de la modale ou la touche `Échap` la ferme. Pour une action qui **doit** être confirmée ou annulée explicitement, on désactive ces comportements avec deux attributs sur le bloc `.modal` :

```html
<div class="modal fade" id="modale-confirmation" tabindex="-1"
     data-bs-backdrop="static" data-bs-keyboard="false"
     aria-labelledby="titre-confirmation" aria-hidden="true">
```

### Un formulaire dans une modale

Le formulaire se place dans le corps de la modale. Le bouton d'envoi, lui, est dans le pied, donc **en dehors** de la balise `<form>` : on le relie au formulaire avec l'attribut HTML `form`.

```html
<div class="modal-body">
    <form id="formulaire-reservation" class="needs-validation" novalidate>
        <div class="mb-3">
            <label for="nom" class="form-label">Nom</label>
            <input type="text" class="form-control" id="nom" name="nom" required>
            <div class="invalid-feedback">Merci d'indiquer votre nom.</div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Annuler</button>
    <button type="submit" class="btn btn-success" form="formulaire-reservation">Envoyer</button>
</div>
```

L'attribut `form="formulaire-reservation"` (du HTML standard) permet à un bouton placé n'importe où dans la page d'envoyer ce formulaire.

### L'accessibilité des modales

Bootstrap gère l'essentiel :
- à l'ouverture, le **focus** est placé dans la modale, et le reste de la page n'est plus atteignable au clavier ;
- la touche `Tab` **reste dans la modale** ;
- la touche `Échap` la ferme ;
- à la fermeture, le focus **revient sur le bouton** qui l'avait ouverte.

Mais cela suppose que vous fournissiez : un **titre** relié par `aria-labelledby`, un bouton de fermeture avec un `aria-label`, et un contenu structuré (titres, libellés...).

Une modale n'est pas toujours la bonne solution. Elle **interrompt** l'utilisateur, et elle est parfois pénible sur mobile. Si l'information peut tenir dans la page, un simple bloc de la page est préférable.

### Contrôler une modale en JavaScript

Les attributs `data-bs-…` suffisent la plupart du temps. Pour ouvrir ou fermer une modale depuis son propre script (par exemple après l'envoi réussi d'un formulaire), on utilise l'objet `bootstrap.Modal` :

```js
const element = document.getElementById('modale-reservation');
const modale = bootstrap.Modal.getOrCreateInstance(element);

modale.show();    // ouvre
modale.hide();    // ferme
```

Bootstrap émet aussi des **évènements** pendant le cycle de vie de la modale :

| Évènement | Moment |
|---|---|
| `show.bs.modal` | Juste avant l'ouverture |
| `shown.bs.modal` | Après l'ouverture (animation terminée) |
| `hide.bs.modal` | Juste avant la fermeture |
| `hidden.bs.modal` | Après la fermeture (animation terminée) |

```js
// Placer le curseur dans le premier champ quand la modale est ouverte
element.addEventListener('shown.bs.modal', () => {
    document.getElementById('nom').focus();
});

// Vider le formulaire quand la modale est fermée
element.addEventListener('hidden.bs.modal', () => {
    document.getElementById('formulaire-reservation').reset();
});
```

## Exemple complet

Voici le formulaire de réservation du Café Mirabelle : un bouton « Réserver une table » ouvre une **modale** qui contient un **formulaire** mis en page avec la grille, avec **validation**. À l'envoi réussi, la modale se ferme et un message de confirmation s'affiche.

Arborescence :
```
cafe-bootstrap/
├── index.html
└── js/
    └── reservation.js
```

**`index.html`**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Café Mirabelle — Réserver</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr"
          crossorigin="anonymous">
</head>
<body>
    <header class="bg-dark text-white py-3">
        <div class="container d-flex justify-content-between align-items-center">
            <p class="fs-4 fw-bold mb-0">Café Mirabelle</p>
            <button type="button" class="btn btn-warning"
                    data-bs-toggle="modal" data-bs-target="#modale-reservation">
                Réserver une table
            </button>
        </div>
    </header>

    <main class="container py-5">
        <h1 class="mb-3">Un café, un gâteau, et le temps de souffler.</h1>
        <p class="lead mb-4">Une adresse de quartier, ouverte tous les jours.</p>

        <!-- Message de confirmation, caché au départ -->
        <div id="confirmation" class="alert alert-success alert-dismissible d-none" role="alert">
            Merci ! Votre demande de réservation a bien été enregistrée.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"></button>
        </div>

        <div class="d-grid gap-2 d-md-flex">
            <button type="button" class="btn btn-success btn-lg"
                    data-bs-toggle="modal" data-bs-target="#modale-reservation">
                Réserver une table
            </button>
            <a class="btn btn-outline-success btn-lg" href="#carte">Voir la carte</a>
        </div>
    </main>

    <!-- Modale de réservation -->
    <div class="modal fade" id="modale-reservation" tabindex="-1"
         aria-labelledby="titre-reservation" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
            <div class="modal-content">

                <div class="modal-header">
                    <h2 class="modal-title fs-5" id="titre-reservation">Réserver une table</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                </div>

                <div class="modal-body">
                    <form id="formulaire-reservation" class="needs-validation" novalidate>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="nom" class="form-label">Nom</label>
                                <input type="text" class="form-control" id="nom" name="nom"
                                       required autocomplete="name">
                                <div class="invalid-feedback">Merci d'indiquer votre nom.</div>
                            </div>
                            <div class="col-md-6">
                                <label for="mail" class="form-label">E-mail</label>
                                <input type="email" class="form-control" id="mail" name="mail"
                                       required autocomplete="email">
                                <div class="invalid-feedback">Merci d'indiquer une adresse e-mail valide.</div>
                            </div>
                            <div class="col-md-8">
                                <label for="date" class="form-label">Date</label>
                                <input type="date" class="form-control" id="date" name="date" required>
                                <div class="invalid-feedback">Merci de choisir une date.</div>
                            </div>
                            <div class="col-md-4">
                                <label for="personnes" class="form-label">Personnes</label>
                                <select class="form-select" id="personnes" name="personnes" required>
                                    <option value="" selected disabled>Choisir…</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                </select>
                                <div class="invalid-feedback">Merci de choisir un nombre.</div>
                            </div>
                            <fieldset class="col-12">
                                <legend class="form-label fs-6">Où souhaitez-vous vous asseoir ?</legend>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="place" id="salle" value="salle" checked>
                                    <label class="form-check-label" for="salle">En salle</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="place" id="terrasse" value="terrasse">
                                    <label class="form-check-label" for="terrasse">En terrasse</label>
                                </div>
                            </fieldset>
                            <div class="col-12">
                                <label for="message" class="form-label">Message (facultatif)</label>
                                <textarea class="form-control" id="message" name="message" rows="3"></textarea>
                            </div>
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="accord" name="accord" required>
                                    <label class="form-check-label" for="accord">
                                        J'accepte d'être recontacté·e au sujet de ma réservation
                                    </label>
                                    <div class="invalid-feedback">Cette case doit être cochée.</div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="submit" class="btn btn-success" form="formulaire-reservation">Envoyer la demande</button>
                </div>

            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
            crossorigin="anonymous"></script>
    <script src="js/reservation.js"></script>
</body>
</html>
```

**`js/reservation.js`**
```js
const elementModale = document.getElementById('modale-reservation');
const formulaire = document.getElementById('formulaire-reservation');
const confirmation = document.getElementById('confirmation');

// Au moment de l'envoi : validation
formulaire.addEventListener('submit', (evenement) => {
    evenement.preventDefault();                 // pas d'envoi réel dans cet exemple

    if (!formulaire.checkValidity()) {
        evenement.stopPropagation();
        formulaire.classList.add('was-validated');   // affiche les erreurs
        return;
    }

    // Formulaire valide : on ferme la modale et on affiche la confirmation
    bootstrap.Modal.getOrCreateInstance(elementModale).hide();
    confirmation.classList.remove('d-none');
});

// Quand la modale s'ouvre : le curseur va dans le premier champ
elementModale.addEventListener('shown.bs.modal', () => {
    document.getElementById('nom').focus();
});

// Quand la modale est fermée : on remet le formulaire à zéro
elementModale.addEventListener('hidden.bs.modal', () => {
    formulaire.reset();
    formulaire.classList.remove('was-validated');
});
```

### Analyse

| Partie | Ce qu'on y trouve |
|---|---|
| Boutons | `btn btn-warning` dans l'en-tête, `btn-success btn-lg` et `btn-outline-success btn-lg` dans la page, `d-grid gap-2 d-md-flex` : empilés et pleine largeur sur mobile, côte à côte dès 768 px |
| Ouverture | Deux boutons déclenchent la même modale grâce à `data-bs-toggle` et `data-bs-target` |
| Modale | `modal-dialog-centered modal-lg modal-fullscreen-sm-down` : centrée, large sur ordinateur, **plein écran sous 576 px** |
| Formulaire | `row g-3` avec `col-md-6`, `col-md-8`, `col-md-4`, `col-12` ; `form-control`, `form-select`, `form-check` |
| Validation | `novalidate`, `required`, `invalid-feedback`, classe `was-validated` ajoutée par le script |
| Bouton d'envoi | Placé dans le pied de la modale, relié au formulaire par `form="formulaire-reservation"` |
| Confirmation | Une alerte `alert alert-success` cachée par `d-none`, qu'on affiche en JavaScript |
| JavaScript | Un seul petit fichier : validation, fermeture de la modale, focus, réinitialisation |

Remarques :
- Le formulaire **n'envoie rien** : il n'y a pas de traitement côté serveur. Dans un vrai projet PHP ou Node, c'est le serveur qui recevrait et **revérifierait** les données.
- La croix de l'alerte (`data-bs-dismiss="alert"`) utilise le même principe que la modale : un attribut, aucun script.
- Après la première validation, les champs gardent leur état vert ou rouge. C'est pourquoi on retire `was-validated` à la fermeture de la modale.

## Les erreurs courantes à éviter

| Erreur | Conséquence | Correction |
|---|---|---|
| Oublier le `<script>` de Bootstrap | La modale ne s'ouvre pas | Ajouter `bootstrap.bundle.min.js` avant `</body>` |
| `data-bs-target="modale"` sans `#` ou `id` différent | Rien ne se passe | `data-bs-target="#modale"` = `id="modale"` |
| Oublier `type="button"` sur un bouton dans un formulaire | Le bouton envoie le formulaire | Toujours préciser `type` |
| Oublier `btn` (ne mettre que `btn-primary`) | Pas de mise en forme | `btn` + la variante |
| Utiliser `form-control` sur un `<select>` | Flèche et style incorrects | Utiliser `form-select` |
| Oublier `for`/`id` ou le `label` | Champ non accessible, clic sur le libellé inopérant | Relier chaque `label` à son champ |
| Utiliser `placeholder` à la place d'un `label` | Champ sans libellé quand on tape | Garder un `label` (ou `form-floating`) |
| `form-floating` avec le `label` avant le champ, ou sans `placeholder` | Libellé mal placé | `label` **après** le champ, `placeholder` présent |
| Oublier `novalidate` ou le script avec `needs-validation` | Bulles du navigateur, pas de messages Bootstrap | Ajouter les deux |
| Croire que la validation Bootstrap protège le site | Données incorrectes envoyées au serveur | Revalider **côté serveur** |
| Cases radio avec des `name` différents | Plusieurs choix cochés en même temps | Même `name` pour le groupe |
| Une modale **à l'intérieur** d'un élément positionné ou d'un `<header>` | Affichage décalé ou masqué | La placer au niveau supérieur du `<body>` |
| Ouvrir une modale depuis une autre | Empilement difficile à gérer, mauvaise ergonomie | Une seule modale ouverte à la fois |
| Modale sans titre ni `aria-label` sur la croix | Inaccessible aux lecteurs d'écran | `aria-labelledby` et `aria-label` |
| Utiliser une modale pour du contenu long ou essentiel | Page pénible sur mobile | Mettre le contenu dans la page |
| Écraser les styles avec `!important` | Conflits en cascade | Utiliser les variables `--bs-…` ou sa feuille chargée après Bootstrap |

## À retenir

- Un composant Bootstrap, c'est du **HTML sémantique** + des **classes** (+ des attributs `data-bs-…` pour les composants interactifs).
- **Boutons** : `btn` + une variante (`btn-primary`, `btn-outline-secondary`...), des tailles (`btn-lg`, `btn-sm`), des états (`disabled`, `active`), des groupes (`btn-group`). Un `<button>` pour une action, un `<a>` pour une navigation, avec `type="button"` hors envoi.
- **Formulaires** : `form-label`, `form-control`, `form-select`, `form-check` (`-input` et `-label`), `form-text`, `input-group`, `form-floating`. Les `label`, `for`/`id`, `name` et `required` du HTML restent indispensables.
- Les formulaires se mettent en page avec la **grille** (`row g-3` + `col-md-…`).
- La **validation** repose sur les règles HTML : Bootstrap n'affiche que le résultat (`needs-validation`, `novalidate`, `was-validated`, `invalid-feedback`). Elle **ne remplace pas** la validation côté serveur.
- **Modales** : un bouton avec `data-bs-toggle="modal"` et `data-bs-target="#id"`, un bloc `.modal` > `.modal-dialog` > `.modal-content` (en-tête, corps, pied), et `data-bs-dismiss="modal"` pour fermer.
- Les modales gèrent le **focus**, la touche `Échap` et le retour du focus ; il faut fournir un **titre** (`aria-labelledby`) et un `aria-label` sur la croix.
- Elles se contrôlent aussi en JavaScript : `bootstrap.Modal.getOrCreateInstance(element).show()` / `.hide()`, et les évènements `show.bs.modal`, `shown.bs.modal`, `hide.bs.modal`, `hidden.bs.modal`.
- Tout composant interactif nécessite **`bootstrap.bundle.min.js`**.
- Une modale **interrompt** l'utilisateur : à réserver aux cas où c'est justifié.

---

© Vincent Chiofalo