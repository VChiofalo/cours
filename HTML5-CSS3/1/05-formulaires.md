# Découvrir les formulaires HTML : collecter des informations

Jusqu'ici, nos pages web servaient uniquement à **afficher** du contenu. Mais le Web est aussi un espace d'échange : l'utilisateur doit pouvoir **envoyer des informations**. C'est le rôle des **formulaires**.

Les formulaires sont partout :
- se connecter à un compte ;
- créer un compte ;
- effectuer une recherche ;
- envoyer un message via une page de contact ;
- passer une commande ;
- laisser un avis ou répondre à un sondage.

## Le parcours d'une information

Un formulaire est la **porte d'entrée** entre l'utilisateur et le Back-End :
```
Utilisateur
    ↓  remplit
Formulaire HTML (Front-End)
    ↓  envoi
Serveur (Back-End)
    ↓  traitement
Réponse (nouvelle page, message de confirmation...)
```

Dans ce chapitre, nous nous concentrons sur la **partie HTML** : construire le formulaire et ses champs. Le traitement des données côté serveur sera abordé plus tard, et la mise en forme relèvera de CSS.

## L'élément `<form>`

L'élément `<form>` est le **conteneur** de tous les champs d'un formulaire.
```html
<form action="inscription.php" method="post">

    <!-- Les champs du formulaire se placent ici -->

</form>
```

Deux attributs sont essentiels :
- `action` : l'adresse vers laquelle les données sont envoyées ;
- `method` : la manière dont les données sont envoyées (`get` ou `post`).

Si `action` est absent, les données sont envoyées vers la **page actuelle**. Nous utiliserons cette possibilité pour tester nos formulaires **sans serveur**.

## Les méthodes GET et POST

| | `GET` | `POST` |
|---|---|---|
| Où voyagent les données ? | dans l'**adresse (URL)** | dans le **corps** de la requête |
| Visibles dans la barre d'adresse ? | oui | non |
| Usage typique | recherche, filtres (consulter) | inscription, connexion, commande (envoyer, modifier) |
| Page enregistrable en favori ? | oui | non |

Si `method` est absent, la méthode par défaut est `get`.

⚠️ **Attention** : `post` ne signifie pas « sécurisé ». Les données ne sont simplement pas affichées dans l'URL. Elles ne sont protégées que si le site utilise **HTTPS**. En revanche, on n'envoie **jamais** de mot de passe avec `get`, car il apparaîtrait dans l'URL et dans l'historique du navigateur.

## Un premier champ de saisie : `<input>`

L'élément `<input>` permet de créer la plupart des champs de saisie. C'est un **élément vide** : il n'a pas de balise fermante.
```html
<form>
    <input type="text" name="prenom">
    <button type="submit">Envoyer</button>
</form>
```

L'attribut `type` détermine la **nature du champ** : texte, mot de passe, date, case à cocher, etc.

Voici les attributs que l'on retrouve le plus souvent sur un `<input>` :

| Attribut | Rôle |
|---|---|
| `type` | nature du champ (texte, e-mail, date...) |
| `name` | nom du champ, utilisé lors de l'envoi des données |
| `id` | identifiant unique du champ, utilisé notamment par `<label>` |
| `value` | valeur initiale du champ (ou valeur envoyée pour une case ou un bouton radio) |
| `placeholder` | texte d'exemple affiché tant que le champ est vide |

## L'attribut `name` : la clé de l'envoi

Lors de l'envoi, le navigateur transmet chaque champ sous la forme **`nom=valeur`**. Le nom est celui de l'attribut `name`.
```
<input type="text" name="prenom">    +    saisie : « Camille »
                    ↓
              prenom=Camille
```

Le serveur retrouve ensuite l'information grâce à ce nom (en PHP, par exemple, avec `$_POST['prenom']`).

Une règle essentielle :

    Un champ sans attribut `name` n'est pas envoyé.

### Tester sans serveur

Avec `method="get"` (ou sans `method`) et sans `action`, il suffit de valider le formulaire pour **voir les données dans la barre d'adresse** :
```
formulaire.html?prenom=Camille&email=camille%40example.com
```

On y reconnaît des paires `nom=valeur` séparées par `&`. Les caractères spéciaux sont **encodés** : le `@` devient `%40` et les espaces deviennent `+`.

## `name` ou `id` ?

Ces deux attributs sont souvent confondus :

| | `name` | `id` |
|---|---|---|
| Rôle | nom du champ **à l'envoi** | identifiant du champ **dans la page** |
| Utilisé par | le serveur | `<label>`, CSS, JavaScript, liens d'ancre |
| Unicité | peut être partagé (cases, boutons radio) | doit être **unique** dans la page |

Dans la plupart des cas, on donne la même valeur aux deux pour les champs de texte : `id="prenom" name="prenom"`.

## Les étiquettes : `<label>`

Un champ de saisie doit toujours être accompagné d'une **étiquette** qui indique à l'utilisateur ce qu'il doit saisir. En HTML, on utilise l'élément `<label>`.
```html
<label for="prenom">Prénom</label>
<input type="text" id="prenom" name="prenom">
```

L'attribut `for` du `<label>` doit contenir **exactement l'`id`** du champ associé.

On peut aussi **englober** le champ dans le `<label>` :
```html
<label>
    Prénom
    <input type="text" name="prenom">
</label>
```

Une étiquette correctement associée présente plusieurs avantages :
- ♿ **Accessibilité** : un lecteur d'écran annonce l'étiquette lorsque l'utilisateur arrive sur le champ.

- 🖱️ **Confort d'utilisation** : cliquer sur l'étiquette place le curseur dans le champ (ou coche la case associée), ce qui est très utile sur smartphone.

### Les principaux types de champs

L'attribut `type` permet d'adapter le champ à la donnée attendue. Le navigateur peut alors proposer un clavier adapté, un sélecteur de date, ou vérifier le format saisi.

| `type` | Usage | Remarque |
|---|---|---|
| `text` | texte court (prénom, ville) | type par défaut |
| `password` | mot de passe | les caractères sont masqués |
| `email` | adresse e-mail | le format est vérifié |
| `tel` | numéro de téléphone | clavier numérique sur mobile, format non vérifié |
| `url` | adresse de site | le format est vérifié |
| `number` | nombre | accepte `min`, `max` et `step` |
| `date` | date | sélecteur de date ; la valeur envoyée est au format `AAAA-MM-JJ` |
| `search` | recherche | proche de `text` |
| `range` | curseur | accepte `min`, `max` et `step` |
| `color` | couleur | sélecteur de couleur |
| `file` | envoi d'un fichier | demande une configuration particulière (voir plus bas) |
| `hidden` | champ invisible | contient une valeur envoyée sans affichage |

Exemples :
```html
<label for="email">Adresse e-mail</label>
<input type="email" id="email" name="email">

<label for="age">Âge</label>
<input type="number" id="age" name="age" min="0" max="120">

<label for="naissance">Date de naissance</label>
<input type="date" id="naissance" name="naissance">

<label for="mdp">Mot de passe</label>
<input type="password" id="mdp" name="mdp">
```

⚠️ Un champ `hidden` n'est caché qu'à l'écran : l'utilisateur peut le modifier. Il ne faut **jamais** lui faire confiance pour une information sensible.

### Envoyer un fichier

Pour envoyer un fichier avec `type="file"`, le formulaire doit utiliser la méthode `post` et l'attribut `enctype="multipart/form-data"` :
```html
<form action="envoi.php" method="post" enctype="multipart/form-data">
    <label for="cv">Votre CV</label>
    <input type="file" id="cv" name="cv">
</form>
```

## Les cases à cocher : `type="checkbox"`

Les cases à cocher permettent de choisir **zéro, une ou plusieurs** options.
```html
<p>Quels langages connaissez-vous ?</p>

<input type="checkbox" id="html" name="langage" value="html">
<label for="html">HTML</label>

<input type="checkbox" id="css" name="langage" value="css">
<label for="css">CSS</label>

<input type="checkbox" id="js" name="langage" value="javascript" checked>
<label for="js">JavaScript</label>
```

À retenir :
- seules les cases **cochées** sont envoyées ;
- l'attribut `value` définit la valeur envoyée (sans `value`, la valeur envoyée est `on`) ;
- l'attribut booléen `checked` coche la case par défaut ;
- ici, les trois cases partagent le même `name` : si plusieurs sont cochées, plusieurs valeurs sont envoyées (`langage=html&langage=css`).

## Les boutons radio : `type="radio"`

Les boutons radio permettent de choisir **une seule option** parmi plusieurs.
```html
<p>Votre niveau :</p>

<input type="radio" id="debutant" name="niveau" value="debutant" checked>
<label for="debutant">Débutant</label>

<input type="radio" id="inter" name="niveau" value="intermediaire">
<label for="inter">Intermédiaire</label>

<input type="radio" id="avance" name="niveau" value="avance">
<label for="avance">Avancé</label>
```

La règle fondamentale : **les boutons radio d'un même groupe doivent avoir le même `name`**.

C'est ce `name` commun qui indique au navigateur qu'une seule option peut être sélectionnée. Chaque bouton conserve en revanche un `id` unique et une `value` différente.

## Le texte sur plusieurs lignes : `<textarea>`

Pour saisir un texte long (message, commentaire), on utilise `<textarea>`.
```html
<label for="message">Votre message</label>
<textarea id="message" name="message" rows="5" cols="40"></textarea>
```

Contrairement à `<input>`, `<textarea>` possède une balise fermante : son contenu initial se place **entre** les deux balises.
```html
<textarea id="message" name="message" rows="5" cols="40">Bonjour,</textarea>
```

Les attributs `rows` et `cols` fixent la taille initiale (nombre de lignes et de colonnes). Cette taille sera ensuite plutôt gérée avec CSS.

## Les listes déroulantes : `<select>` et `<option>`

Une liste déroulante permet de choisir parmi une liste d'options **prédéfinies**.
```html
<label for="atelier">Atelier souhaité</label>
<select id="atelier" name="atelier">
    <option value="">-- Choisissez un atelier --</option>
    <option value="web">Développement web</option>
    <option value="python">Initiation à Python</option>
    <option value="reseau" selected>Réseaux</option>
</select>
```

Chaque `<option>` possède :
- un **texte affiché** à l'utilisateur ;
- une **valeur** (attribut `value`) envoyée au serveur. Sans `value`, c'est le texte affiché qui est envoyé.

L'attribut booléen `selected` choisit l'option affichée par défaut.

Il est aussi possible de **regrouper** des options avec `<optgroup>` :
```html
<select id="langage" name="langage">
    <optgroup label="Front-End">
        <option value="html">HTML</option>
        <option value="css">CSS</option>
    </optgroup>
    <optgroup label="Back-End">
        <option value="php">PHP</option>
        <option value="node">Node.js</option>
    </optgroup>
</select>
```

## Les boutons

Un formulaire doit pouvoir être **envoyé** : on utilise pour cela l'élément `<button>`.
```html
<button type="submit">Envoyer</button>
```

L'attribut `type` définit son comportement :

| `type` | Comportement |
|---|---|
| `submit` | envoie le formulaire |
| `reset` | remet tous les champs à leur valeur initiale |
| `button` | ne fait rien (sera utile avec JavaScript) |

⚠️ **Attention** : dans un formulaire, un `<button>` **sans attribut `type`** se comporte comme un bouton `submit`. On précise donc toujours le `type`.

On rencontre aussi l'ancienne écriture `<input type="submit" value="Envoyer">`. Elle fonctionne, mais `<button>` est plus souple (on peut y mettre du texte en gras, une icône, etc.).

Le bouton `reset` est à utiliser avec prudence : un clic accidentel efface toute la saisie.

## Regrouper des champs : `<fieldset>` et `<legend>`

Pour un formulaire un peu long, on regroupe les champs liés dans un `<fieldset>`, légendé par un `<legend>`.
```html
<fieldset>
    <legend>Vos coordonnées</legend>

    <p>
        <label for="nom">Nom</label>
        <input type="text" id="nom" name="nom">
    </p>

    <p>
        <label for="tel">Téléphone</label>
        <input type="tel" id="tel" name="tel">
    </p>
</fieldset>
```

`<fieldset>` est particulièrement utile pour un **groupe de boutons radio** ou de cases à cocher : la légende explique la question posée, et les lecteurs d'écran l'annoncent avec chaque option.
```html
<fieldset>
    <legend>Votre niveau</legend>

    <input type="radio" id="debutant" name="niveau" value="debutant">
    <label for="debutant">Débutant</label>

    <input type="radio" id="avance" name="niveau" value="avance">
    <label for="avance">Avancé</label>
</fieldset>
```

## Aider l'utilisateur à saisir

Plusieurs attributs facilitent la saisie.

| Attribut | Effet |
|---|---|
| `placeholder` | affiche un **exemple** dans le champ vide |
| `value` | pré-remplit le champ |
| `autofocus` | place le curseur dans ce champ au chargement |
| `autocomplete` | indique au navigateur le type d'information attendue, pour proposer le remplissage automatique (`email`, `given-name`, `new-password`...) |
| `readonly` | champ visible et envoyé, mais **non modifiable** |
| `disabled` | champ grisé, non modifiable et **non envoyé** |

```html
<label for="email">Adresse e-mail</label>
<input type="email" id="email" name="email"
       placeholder="prenom.nom@example.com"
       autocomplete="email">
```

⚠️ Le `placeholder` **ne remplace pas** le `<label>` : il disparaît dès que l'on commence à écrire, il est souvent peu contrasté, et il n'est pas toujours annoncé par les technologies d'assistance.

## Valider la saisie avec HTML

HTML permet de poser des **contraintes** sur les champs. Le navigateur vérifie alors les données **avant l'envoi** et affiche un message à l'utilisateur en cas de problème.

| Attribut | Contrainte |
|---|---|
| `required` | champ obligatoire |
| `minlength` / `maxlength` | longueur minimale / maximale du texte |
| `min` / `max` | valeur minimale / maximale (nombres, dates) |
| `step` | pas d'incrémentation (nombres) |
| `pattern` | format imposé par une expression régulière |
| `type` | `email`, `url`, `number`... imposent déjà un format |

```html
<label for="prenom">Prénom (obligatoire)</label>
<input type="text" id="prenom" name="prenom" required minlength="2" maxlength="30">

<label for="cp">Code postal</label>
<input type="text" id="cp" name="cp" pattern="[0-9]{5}"
       title="5 chiffres, par exemple 75001" required>
```

L'attribut `title` complète le message d'erreur du navigateur avec une explication du format attendu.

Pour une **case à cocher** (par exemple l'acceptation d'un règlement), `required` oblige à la cocher :
```html
<input type="checkbox" id="accord" name="accord" required>
<label for="accord">J'accepte le règlement du club</label>
```

### La validation HTML ne protège pas

⚠️ La validation HTML est une **aide pour l'utilisateur**, pas une protection. Une personne peut très facilement la contourner : modifier le code de la page, supprimer un `required`, ou envoyer des données sans passer par le formulaire.

Le serveur doit donc **toujours revérifier** les données reçues : c'est l'un des rôles essentiels du Back-End.

## Bien concevoir un formulaire

Quelques réflexes pour des formulaires utilisables par tous :
- associer **chaque champ à un `<label>`** ;
- utiliser le **bon `type`** pour chaque donnée (`email`, `date`, `number`...) ;
- regrouper les champs liés avec `<fieldset>` et `<legend>` ;
- indiquer clairement les champs **obligatoires** ;
- placer les champs dans un **ordre logique**, car la navigation au clavier suit l'ordre du code (touche `Tab`) ;
- choisir un texte de bouton explicite (« Créer mon compte » plutôt que « OK »).

## Exemple complet

Voici un formulaire d'inscription qui réunit les notions étudiées. Il n'utilise ni `action` ni `post` afin de pouvoir être testé sans serveur : l'envoi affichera les données dans l'URL.
```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Inscription au club informatique</title>
</head>

<body>

    <main>

        <h1>Inscription au club informatique</h1>

        <form method="get">

            <fieldset>
                <legend>Vos informations</legend>

                <p>
                    <label for="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom"
                           required minlength="2" autocomplete="given-name">
                </p>

                <p>
                    <label for="email">Adresse e-mail</label>
                    <input type="email" id="email" name="email"
                           placeholder="prenom.nom@example.com"
                           required autocomplete="email">
                </p>

                <p>
                    <label for="naissance">Date de naissance</label>
                    <input type="date" id="naissance" name="naissance">
                </p>
            </fieldset>

            <fieldset>
                <legend>Votre profil</legend>

                <p>Votre niveau :</p>

                <input type="radio" id="debutant" name="niveau" value="debutant" required>
                <label for="debutant">Débutant</label>

                <input type="radio" id="inter" name="niveau" value="intermediaire">
                <label for="inter">Intermédiaire</label>

                <input type="radio" id="avance" name="niveau" value="avance">
                <label for="avance">Avancé</label>

                <p>Langages déjà utilisés :</p>

                <input type="checkbox" id="html" name="langage" value="html">
                <label for="html">HTML</label>

                <input type="checkbox" id="css" name="langage" value="css">
                <label for="css">CSS</label>

                <input type="checkbox" id="python" name="langage" value="python">
                <label for="python">Python</label>

                <p>
                    <label for="atelier">Atelier souhaité</label>
                    <select id="atelier" name="atelier" required>
                        <option value="">-- Choisissez un atelier --</option>
                        <option value="web">Développement web</option>
                        <option value="python">Initiation à Python</option>
                        <option value="reseau">Réseaux</option>
                    </select>
                </p>
            </fieldset>

            <fieldset>
                <legend>Pour finir</legend>

                <p>
                    <label for="message">Un mot sur vos attentes</label>
                </p>
                <textarea id="message" name="message" rows="5" cols="40"></textarea>

                <p>
                    <input type="checkbox" id="accord" name="accord" value="oui" required>
                    <label for="accord">J'accepte le règlement du club</label>
                </p>
            </fieldset>

            <button type="submit">Envoyer mon inscription</button>

        </form>

    </main>

</body>

</html>
```

Après l'envoi, l'URL contient par exemple :
```
?prenom=Camille&email=camille%40example.com&naissance=2007-03-12&niveau=debutant&langage=html&langage=css&atelier=web&message=Bonjour&accord=oui
```

Dans cet exemple, nous retrouvons :
- le conteneur `<form>` ;
- des champs `<input>` de plusieurs types (`text`, `email`, `date`, `radio`, `checkbox`) ;
- un `<select>`, un `<textarea>` et un `<button>` ;
- des `<label>` associés par `for` et `id` ;
- des `<fieldset>` et `<legend>` pour regrouper les champs ;
- des attributs de validation (`required`, `minlength`) et d'aide à la saisie (`placeholder`, `autocomplete`).

## Une méthode simple pour construire un formulaire

Face à un formulaire à écrire, on peut suivre quatre étapes :

**1. Lister les informations à collecter**

Par exemple : prénom, e-mail, niveau, message.

**2. Choisir l'élément adapté à chaque information**

| Besoin | Élément |
|---|---|
| Texte court, e-mail, date, nombre... | `<input>` avec le bon `type` |
| Texte long | `<textarea>` |
| Un choix parmi quelques options visibles | boutons radio |
| Plusieurs choix possibles | cases à cocher |
| Un choix parmi une longue liste | `<select>` |
| Envoyer | `<button type="submit">` |

**3. Écrire pour chaque champ** : un `<label>`, un `id`, un `name`, et les contraintes utiles (`required`...).

**4. Tester** : envoyer le formulaire et vérifier dans l'URL que chaque champ apparaît bien avec le bon nom et la bonne valeur.

## Les erreurs courantes à éviter

- **oublier l'attribut `name`** : le champ n'est alors pas envoyé ;
- **associer mal un `<label>`** : la valeur de `for` doit être identique à l'`id` du champ ;
- **donner des `name` différents à des boutons radio** d'un même groupe : ils ne s'excluent plus entre eux ;
- **oublier la `value` des cases et des boutons radio** : le serveur ne peut pas distinguer les réponses ;
- **utiliser le même `id` plusieurs fois** dans la page ;
- **laisser un `<button>` sans `type`** dans un formulaire : il envoie le formulaire sans que l'on s'y attende ;
- **utiliser `placeholder` à la place de `<label>`** ;
- **croire que `required` protège** : la validation côté serveur reste indispensable ;
- **s'attendre à recevoir un champ `disabled`** : il n'est pas envoyé (utiliser `readonly` si la valeur doit être transmise).

## À retenir

Un formulaire permet à l'utilisateur d'**envoyer des informations** au serveur.

```
<form>                     → conteneur (action, method)
   ├── <label>             → étiquette d'un champ
   ├── <input>             → saisie (selon type)
   ├── <textarea>          → texte long
   ├── <select> / <option> → liste déroulante
   ├── <fieldset> / <legend> → regroupement de champs
   └── <button>            → envoi
```

Les règles essentielles :
- `<form>` contient les champs et définit où (`action`) et comment (`method`) envoyer les données ;
- `get` place les données dans l'URL, `post` dans le corps de la requête ;
- chaque champ envoyé a besoin d'un `name`, qui devient la clé de la donnée ;
- `id` identifie le champ dans la page, `name` l'identifie à l'envoi ;
- chaque champ est associé à un `<label>` grâce à `for` et `id` ;
- l'attribut `type` du `<input>` choisit le type de champ et peut déclencher une vérification de format ;
- les boutons radio d'un groupe partagent le même `name` ;
- les cases à cocher et boutons radio ont besoin d'une `value` ;
- un `<button>` sans `type` dans un formulaire envoie le formulaire ;
- `required`, `min`, `max`, `pattern`... aident l'utilisateur, mais **ne remplacent pas** la validation côté serveur.

---

© Vincent Chiofalo