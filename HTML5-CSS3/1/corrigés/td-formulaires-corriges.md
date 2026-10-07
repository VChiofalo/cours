# TD 1 — Les formulaires HTML : corrigés (enseignant)

## Conseils d'animation

- **Rythme conseillé** : 10 min (ex. 1), 15 min (ex. 2), 15 min (ex. 3), 10 min (ex. 4), 10 min (ex. 5), 15 min (ex. 6), 25 min (ex. 7), soit 1 h 40.
- **Organisation possible** : les exercices 1 à 6 se prêtent bien à un fonctionnement en TD classique (réflexion individuelle ou en binôme, puis correction collective). L'exercice 7 se fait sur ordinateur.
- **Si le groupe est en retard** : l'exercice 5 peut être corrigé oralement, et l'exercice 6 peut être réduit aux champs de texte et au créneau.
- **Si le groupe est en avance** : proposer la partie « Pour aller plus loin » de l'exercice 7.
- **Difficultés fréquemment rencontrées** :
  - confusion entre `name` et `id` ;
  - oubli de l'attribut `value` sur les cases et les boutons radio ;
  - `for` qui ne correspond pas à l'`id` (faute de frappe ou de casse) ;
  - oubli de rafraîchir le navigateur après une modification ;
  - messages d'erreur du navigateur qui varient d'un navigateur à l'autre (ils ne sont pas à apprendre par cœur).

---

## Exercice 1 — Questions de cours

### Partie A

| N° | Réponse | Justification |
|---|---|---|
| 1 | **Faux** | Un champ sans `name` n'est pas envoyé : le serveur n'a pas de clé pour retrouver la donnée. |
| 2 | **Faux** | Un `id` doit être unique dans la page. |
| 3 | **Vrai** | C'est le `name` commun qui garantit qu'un seul bouton du groupe peut être sélectionné. |
| 4 | **Faux** | `post` cache les données de l'URL mais ne les chiffre pas ; seul HTTPS les protège pendant le transport. |
| 5 | **Vrai** | Dans un formulaire, le type par défaut d'un `<button>` est `submit`. |
| 6 | **Faux** | Le `placeholder` disparaît à la saisie et n'est pas fiable pour l'accessibilité ; il complète le `<label>` sans le remplacer. |
| 7 | **Faux** | Les champs `disabled` ne sont pas envoyés (contrairement à `readonly`). |
| 8 | **Faux** | Le navigateur peut être contourné : le serveur doit toujours revérifier les données. |

### Partie B

9. Deux avantages parmi :
   - **accessibilité** : un lecteur d'écran annonce l'étiquette en arrivant sur le champ ;
   - **confort** : cliquer sur l'étiquette active le champ (curseur dans le champ, case cochée), ce qui est très utile sur smartphone, où les petites cases sont difficiles à viser.
10. Un formulaire de **recherche** utilise `get` : les termes recherchés apparaissent dans l'URL, qui peut être partagée ou mise en favori, et la recherche ne modifie rien sur le serveur. Un formulaire de **connexion** utilise `post` : le mot de passe ne doit pas apparaître dans l'URL ni dans l'historique du navigateur.

---

## Exercice 2 — Prévoir ce qui est envoyé

### Question 1

**Scénario A**
```
prenom=Camille&email=camille%40example.com&niveau=avance&langage=html&langage=css&atelier=python&message=Bonjour
```

**Scénario B**
```
prenom=Lea+Dupont&email=&newsletter=on&atelier=web&message=
```

**Points à faire remarquer**
- Les données suivent **l'ordre des champs dans le code**.
- Dans le scénario B, un champ de texte **vide mais nommé** est tout de même envoyé (`email=`, `message=`).
- Les boutons radio et cases non sélectionnés n'apparaissent pas du tout.
- Une liste déroulante envoie toujours une valeur : l'option sélectionnée par défaut est la **première** (`atelier=web`).

### Question 2

Trois champs non envoyés dans le scénario A :
- le champ `<input type="text" value="secret">` : il n'a **pas d'attribut `name`** ;
- la case `newsletter` : elle n'est **pas cochée** ;
- le champ `code` : il est **`disabled`**.

On peut aussi citer le bouton radio « débutant », non envoyé car le bouton « avancé » est sélectionné.

### Question 3

Le serveur reçoit `newsletter=on`. Quand une case cochée n'a pas d'attribut `value`, le navigateur envoie la valeur par défaut `on`.

---

## Exercice 3 — Chasse aux erreurs

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

## Exercice 4 — Choisir le bon élément

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

## Exercice 5 — Choisir la bonne contrainte

| N° | Règle | Réponse |
|---|---|---|
| a | Prénom obligatoire | `required` |
| b | Prénom de 2 à 30 caractères | `minlength="2"` et `maxlength="30"` |
| c | Âge de 18 à 99 | `type="number"` avec `min="18"` et `max="99"` |
| d | Code postal à 5 chiffres | `pattern="[0-9]{5}"` (avec un `title` explicatif) |
| e | Mot de passe d'au moins 8 caractères | `minlength="8"` |
| f | Date non antérieure au 1er janvier 2026 | `type="date"` avec `min="2026-01-01"` |
| g | Format d'adresse e-mail | `type="email"` |

### Question de synthèse

Le serveur doit **revérifier toutes les données** reçues, comme si aucun contrôle n'avait été fait dans le navigateur, et refuser les valeurs invalides. On en conclut que les attributs de validation HTML sont une **aide à la saisie** pour l'utilisateur honnête (messages immédiats, moins d'allers-retours), mais **ne sont pas une protection** : n'importe qui peut les contourner.

---

## Exercice 6 — Concevoir un formulaire

### Tableau de conception

| Information | Élément | `type` | `name` | `id` | `value` | Contraintes |
|---|---|---|---|---|---|---|
| Prénom | `input` | `text` | `prenom` | `prenom` | | `required` |
| E-mail | `input` | `email` | `email` | `email` | | `required` |
| Date | `input` | `date` | `date` | `date` | | `required` |
| Nombre de personnes | `input` | `number` | `personnes` | `personnes` | | `min="1"` `max="8"` `required` |
| Créneau | 3 × `input` | `radio` | `creneau` (commun) | `matin`, `apres-midi`, `soir` | `matin`, `apres-midi`, `soir` | `required` |
| Équipements | 3 × `input` | `checkbox` | `equipement` (commun) | `projecteur`, `tableau`, `prises` | `projecteur`, `tableau`, `prises` | aucune |
| Commentaire | `textarea` | | `commentaire` | `commentaire` | | aucune |
| Règlement | `input` | `checkbox` | `accord` | `accord` | `oui` | `required` |
| Envoi | `button` | `submit` | | | | |

### Questions de réflexion

- **`<fieldset>` et `<legend>`** : ils conviennent aux **groupes de choix** (les trois créneaux et les trois équipements). La légende énonce la question posée (« Créneau », « Équipements souhaités ») et les lecteurs d'écran l'annoncent avec chaque option. On peut aussi regrouper les coordonnées pour la lisibilité.
- **Créneau** : les trois boutons partagent le même `name` (`creneau`), pour qu'un seul puisse être sélectionné. Leurs `id` sont différents (`matin`, `apres-midi`, `soir`) pour que chaque `<label>` s'associe au bon bouton.

---

## Exercice 7 — Écrire et tester le formulaire

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

### Réponses aux tests

1. **Formulaire vide** : le navigateur bloque l'envoi et signale le **premier champ invalide**, en général avec un message du type « Veuillez renseigner ce champ ». Les messages varient selon le navigateur et la langue.
2. **Valeurs `0` et `9`** : le navigateur affiche un message indiquant que la valeur doit être supérieure ou égale à 1, ou inférieure ou égale à 8.
3. **Exemple d'URL obtenue** :
   ```
   reservation.html?prenom=Camille&email=camille%40example.com&date=2026-10-15&personnes=4&creneau=apres-midi&equipement=projecteur&equipement=prises&commentaire=Besoin+de+calme&accord=oui
   ```
4. **Vérification** : chaque champ apparaît sous son `name`, les équipements cochés apparaissent chacun sous `equipement`, et le format de la date est `AAAA-MM-JJ`.
5. **Clic sur une étiquette** : la case est cochée (ou décochée) et le bouton radio est sélectionné, ce qui prouve que le `for` correspond bien à l'`id`.
6. **Suppression d'un `name`** : le champ concerné **disparaît de l'URL**, même s'il est rempli.

### Points d'attention lors de la correction

- Vérifier que les trois `name` des boutons radio sont identiques et que leurs `id` sont différents.
- Vérifier que les `for` des `<label>` correspondent aux `id`.
- Vérifier que `<textarea>` possède bien une balise fermante.
- Vérifier que la case du règlement possède `required`.
- Encourager l'usage des commentaires pour séparer les zones du formulaire.
