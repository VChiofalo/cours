# Validation de formulaires en JavaScript

## Avant propos

La **validation d’un formulaire** en JavaScript est une étape essentielle du développement web.
Elle permet de s’assurer que les **données saisies par l’utilisateur** sont **correctes** et **complètes** avant leur envoi vers le serveur.
Ce contrôle préliminaire permet d’éviter les erreurs, d’améliorer la fiabilité des informations collectées et d’offrir une meilleure expérience utilisateur.

JavaScript met à disposition de nombreux outils pour effectuer ces validations et contrôler les formulaires avant soumission.
## Petit rappel : la structure HTML d'un formulaire

Voici un exemple simple de formulaire HTML :
```html
<form action="#" method="post">
  <label for="nom">Nom :</label>
  <input type="text" id="nom" name="nom" required>

  <label for="email">Email :</label>
  <input type="email" id="email" name="email" required>

  <label for="age">Âge :</label>
  <input type="number" id="age" name="age" min="1" max="120">

  <button type="submit">Envoyer</button>
</form>
```
Dans cet exemple, chaque champ possède un type (```text```, ```email```, ```number```) et certains ont des **attributs de validation** comme ```required``` (obligatoire), ```min``` ou ```max```.

HTML5 introduit plusieurs attributs destinés à faciliter la **validation automatique** des formulaires :
- ```required``` : rend un champ obligatoire.
- ```type="email"``` : impose le format d’une adresse e-mail.
- ```type="number"``` : limite la saisie à des valeurs numériques.

Les navigateurs modernes prennent en charge ces attributs et affichent **automatiquement un message d’erreur** lorsque les règles ne sont pas respectées.

Cependant, la validation HTML5 reste **limitée** :
- elle ne permet pas de gérer des règles complexes (comparaison entre champs, formats personnalisés, etc).
- elle peut être **contournée** facilement par un utilisateur **malveillant**.
C’est pourquoi on utilise souvent **JavaScript** pour ajouter une couche de validation plus complète et plus précise.

## Écouter les événements du formulaire en javascript

JavaScript offre une grande flexibilité pour **étendre les possibilités de validation** des formulaires.
Il est ainsi possible de créer ses **propres règles de contrôle**, de **personnaliser les messages d’erreur** et de **réagir dynamiquement** aux données saisies par l’utilisateur.

Pour valider un formulaire, il faut d’abord écouter **les événements** qui se produisent lors de son utilisation.
Ces événements indiquent au script **qu’une action a eu lieu** et permettent de déclencher la vérification correspondante.

Les événements les plus courants sont :
- ```submit``` : déclenché lorsque le formulaire est envoyé.
- ```input``` : déclenché à chaque modification d’un champ de saisie.
- ```change``` : déclenché lorsqu’un champ de type liste, case à cocher ou bouton radio change de valeur.
```html
<form id="monFormulaire">
  <label for="nom">Nom :</label>
  <input type="text" id="nom" name="nom" required>

  <label for="email">Email :</label>
  <input type="email" id="email" name="email" required>

  <button type="submit">Envoyer</button>
</form>

<script>
  const form = document.getElementById('monFormulaire');
  const nom = document.getElementById('nom');
  const email = document.getElementById('email');

  // Événement déclenché lors de la soumission du formulaire
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l’envoi du formulaire pour vérifier les champs
    console.log('Formulaire soumis');
  });

  // Événement déclenché à chaque saisie dans le champ "nom"
  nom.addEventListener('input', function() {
    console.log('Saisie en cours : ' + nom.value);
  });

  // Événement déclenché quand le champ "email" perd le focus
  email.addEventListener('change', function() {
    console.log('Nouvelle adresse e-mail : ' + email.value);
  });
</script>
```
Dans cet exemple, différents événements sont surveillés afin de réagir aux actions de l’utilisateur : la **saisie**, le **changement de valeur** et la **soumission**.

## Tester les entrées du formulaire en javascript

Une fois les événements identifiés, il est possible de **vérifier** et de **corriger** les données saisies par l’utilisateur avant de valider le formulaire.

JavaScript met à disposition de nombreuses **méthodes utiles pour manipuler et tester** les chaînes de caractères ou les nombres :

| Méthode         | Utilité                                                            |
| --------------- | ------------------------------------------------------------------ |
| `trim()`        | Supprime les espaces avant et après une chaîne de caractères       |
| `toLowerCase()` | Convertit une chaîne en minuscules                                 |
| `toUpperCase()` | Convertit une chaîne en majuscules                                 |
| `test()`        | Vérifie si une chaîne correspond à une expression régulière        |
| `match()`       | Recherche une correspondance précise avec une expression régulière |
| `isNaN()`       | Vérifie si une valeur n’est **pas un nombre**                      |
| `parseFloat()`  | Convertit une chaîne en **nombre décimal**                         |
| `parseInt()`    | Convertit une chaîne en **nombre entier**                          |

Exemple :
```js
let nom = "  Dupont  ";
let email = "EXEMPLE@EMAIL.COM";
let age = "25";

console.log(nom.trim());           // "Dupont"
console.log(email.toLowerCase());  // "exemple@email.com"
console.log(isNaN(age));           // false (c’est bien un nombre)
console.log(parseInt(age));        // 25
```
Ces méthodes sont très pratiques pour **nettoyer** et **vérifier** les données avant leur **envoi au serveur**.

## Valider les champs d’un formulaire en JavaScript

Une fois les événements du formulaire bien compris, il est temps de passer à la **validation des données**.
L’objectif est de vérifier que les champs saisis par l’utilisateur **respectent certaines règles** avant que le formulaire ne soit envoyé.
Cela permet **d’éviter les erreurs** (par exemple, un champ vide ou un email incorrect), **d’améliorer la qualité** des données envoyées au serveur et **d’offrir une meilleure expérience utilisateur**, avec des messages clairs et immédiats.

Voici quelques exemples de validations simples que l’on peut réaliser :

| Type de vérification         | Exemple                                                |
| ---------------------------- | ------------------------------------------------------ |
| Champ obligatoire            | Vérifier que le champ n’est pas vide                   |
| Format d’un email            | Vérifier que la saisie contient bien `@` et un domaine |
| Longueur minimale / maximale | Vérifier le nombre de caractères d’un mot de passe     |
| Valeur numérique             | S’assurer qu’un âge ou un prix est bien un nombre      |
| Comparaison                  | Vérifier que deux mots de passe sont identiques        |

Exemple complet de validation :
```html
<form id="formInscription">
  <label for="nom">Nom :</label>
  <input type="text" id="nom" name="nom" required>

  <label for="email">Email :</label>
  <input type="email" id="email" name="email" required>

  <label for="age">Âge :</label>
  <input type="number" id="age" name="age">

  <button type="submit">Valider</button>

  <p id="messageErreur" style="color:red;"></p>
</form>

<script>
  const form = document.getElementById('formInscription');
  const nom = document.getElementById('nom');
  const email = document.getElementById('email');
  const age = document.getElementById('age');
  const messageErreur = document.getElementById('messageErreur');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l’envoi automatique

    let erreurs = [];

    // Vérifie que le nom n’est pas vide
    if (nom.value.trim() === "") {
      erreurs.push("Le nom est obligatoire.");
    }

    // Vérifie le format de l’email
    let emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email.value)) {
      erreurs.push("L’adresse email n’est pas valide.");
    }

    // Vérifie que l’âge est un nombre positif
    if (age.value !== "" && (isNaN(age.value) || age.value <= 0)) {
      erreurs.push("L’âge doit être un nombre positif.");
    }

    // Affiche le résultat
    if (erreurs.length > 0) {
      messageErreur.textContent = erreurs.join(" ");
    } else {
      messageErreur.textContent = "";
      alert("Formulaire valide ! Données prêtes à être envoyées.");
      form.reset(); // Réinitialise le formulaire
    }
  });
</script>
```
Analysons ce code :
1. **Empêcher l’envoi automatique du formulaire**
Grâce à ```event.preventDefault()```, on bloque le comportement par défaut pour effectuer nos propres vérifications.

2. **Créer une liste d’erreurs (```erreurs```)**
Chaque test qui échoue ajoute un message à ce tableau.

3. **Tester chaque champ**
On vérifie que le nom n’est pas vide (```trim()``` retire les espaces). Puis on teste le format de l’adresse email avec une **expression régulière** (regex). Enfin on s’assure que l’âge est bien un ```nombre positif```.

4. **Afficher les erreurs ou valider le formulaire**
Si des erreurs sont détectées, elles sont affichées dans un paragraphe rouge.
Sinon, un message de validation apparaît, et le formulaire est réinitialisé.

### Qu'est ce qu'une expression régulière (regex)?

Une **expression régulière**, souvent abrégée **regex**, est une **suite de caractères** qui décrit un motif (pattern).
Ce motif sert à **rechercher**, **identifier**, **extraire** ou **modifier** des parties précises d’un texte.

Autrement dit, les regex permettent de vérifier si une chaîne de caractères **correspond à une certaine forme** (par exemple : un code postal, une adresse e-mail, un mot de passe, etc.).

Les expressions régulières sont utilisées dans de nombreux langages de programmation, comme **JavaScript**, **Python**, **PHP** ou **C#**, car elles constituent un outil universel pour traiter les chaînes de texte.

Quelques exemples simples :
- La regex ```\d{5}``` correspond à **une suite de cinq chiffres** (parfait pour vérifier un code postal).
- La regex ```^Bonjour``` identifiera toute chaîne qui **commence par le mot "Bonjour"**.
- La regex ```[A-Z]{3}``` détectera **trois lettres majuscules consécutives**.

#### À quoi ça sert concrètement ?

Les expressions régulières sont très utiles pour **valider des saisies utilisateur** dans un formulaire, par exemple :
- Vérifier si un **email** est au bon format.
- S’assurer qu’un **mot de passe** contient des chiffres, des lettres et des symboles.
- Contrôler la saisie d’un **numéro de téléphone** ou d’un code postal.

Elles permettent donc de renforcer la **fiabilité des données** avant leur envoi au serveur.

#### Un peu déroutant au début…

Il est vrai que la syntaxe des regex peut sembler **compliquée** ou **illisible** au premier abord.
Cependant, avec un peu de pratique et les bons outils, leur logique devient rapidement claire.

👉 Des sites comme https://www.Regex101.com permettent de **tester et comprendre** vos expressions régulières en temps réel :
vous y voyez immédiatement **quelles parties du texte correspondent** à votre motif, avec des **explications détaillées**.

#### Utiliser une expression régulière en JavaScript

1. **Déclarer une regex**
En JavaScript, une expression régulière peut être créée de **deux façons** :
- En utilisant des **barres obliques** (```/ /```) :
```js
let regex = /\d{5}/;
```
- En utilisant le **constructeur** ```RegExp()``` :
```js
let regex = new RegExp("\\d{5}");
```
⚠️ Dans ce cas, les **barres obliques** ne sont pas utilisées, et il faut **doubler les antislashs** (```\\```) à cause de la syntaxe des chaînes de caractères.

2. **Tester une chaîne avec ```.test()```**
La méthode ```.test()``` permet de vérifier si une chaîne **correspond** à la regex.
Elle renvoie :
- ```true``` si la chaîne respecte le motif.
- ```false``` si non.
Exemple :
```js
let regex = /\d{5}/;
console.log(regex.test("75001")); // true
console.log(regex.test("Paris")); // false
```
C’est la méthode la plus couramment utilisée pour **valider les entrées utilisateur**.

3. **Extraire une correspondance avec ```.match()```**
La méthode ```.match()``` retourne la ou les parties du texte qui **correspondent** à la regex.
Elle renvoie un **tableau** contenant le(s) élément(s) trouvé(s), ou ```null``` si rien ne correspond.
Exemple :
```js
let texte = "Mon code postal est 44000.";
let resultat = texte.match(/\d{5}/);
console.log(resultat[0]); // 44000
```

##### Exemple concret : validation d’un email

Voici un petit formulaire de test pour comprendre comment les regex s’intègrent dans la validation en JavaScript :
```html
<form id="formEmail">
  <label for="email">Adresse email :</label>
  <input type="text" id="email" placeholder="exemple@domaine.com">
  <small id="messageErreur" style="color:red; display:none;">
    ⚠️ Adresse email invalide
  </small>
  <button type="submit">Vérifier</button>
</form>

<script>
  const form = document.getElementById('formEmail');
  const email = document.getElementById('email');
  const messageErreur = document.getElementById('messageErreur');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // empêche l’envoi du formulaire

    let regexEmail = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

    if (regexEmail.test(email.value)) {
      messageErreur.style.display = 'none';
      email.style.border = '2px solid green';
      alert("✅ Email valide !");
    } else {
      messageErreur.style.display = 'block';
      email.style.border = '2px solid red';
    }
  });
</script>
```
La regex ```/^[\w.-]+@[\w.-]+\.\w{2,}$/``` vérifie que :
- l’adresse commence par un ou plusieurs caractères alphanumériques, points ou tirets (```[\w.-]+```).
- suivis d’un ```@```.
- suivis d’un autre ensemble similaire (```[\w.-]+```).
- se termine par un point ```.``` plus au moins deux lettres (```\.\w{2,}```).

##### Quelques regex utiles et astuce pratique

| Cas à vérifier                    | Expression régulière           | Exemple valide |
| --------------------------------- | ------------------------------ | -------------- |
| Code postal (5 chiffres)          | `/^\d{5}$/`                    | `69001`        |
| Numéro de téléphone français      | `/^0\d{9}$/`                   | `0612345678`   |
| Mot de passe sécurisé             | `/^(?=.*[A-Z])(?=.*\d).{8,}$/` | `Bonjour123`   |
| Nom / Prénom (lettres uniquement) | `/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/`    | `Jean Dupont`  |

Pour **tester vos regex facilement**, utilisez : https://www.Regex101.com
Il permet de :
- tester vos expressions directement.
- visualiser les correspondances.
- comprendre chaque partie de la regex (grâce à une explication automatique très claire).

## Afficher dynamiquement les messages d’erreur et de succès

Lorsqu’un utilisateur remplit un formulaire, il est important de lui donner des **retours visuels clairs et immédiats**.
Ces retours (appelés feedbacks) peuvent indiquer si une saisie est correcte ou non, ou si le formulaire a bien été envoyé.

Grâce à **JavaScript**, on peut modifier l’apparence des champs, afficher des messages personnalisés et rendre le formulaire **plus intuitif** et **agréable à utiliser**.

L’idée est simple :
- Lorsqu’un champ est incorrect, on affiche un **message d’erreur** à proximité et on change son apparence (bordure rouge, par exemple).
- Lorsqu’un champ est correct, on peut afficher un **message de validation** (ou simplement enlever le message d’erreur).
- Quand le formulaire est entièrement valide, un **message de succès** global peut s’afficher.

Exemple:
```html
<form id="formContact">
  <label for="email">Adresse email :</label>
  <input type="text" id="email" name="email">
  <small id="erreurEmail" style="color:red; display:none;">Email invalide</small>

  <label for="message">Votre message :</label>
  <textarea id="message" name="message"></textarea>
  <small id="erreurMessage" style="color:red; display:none;">Le message est trop court</small>

  <button type="submit">Envoyer</button>

  <p id="messageSucces" style="color:green; display:none;">Formulaire envoyé avec succès 🎉</p>
</form>

<script>
  const form = document.getElementById('formContact');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const erreurEmail = document.getElementById('erreurEmail');
  const erreurMessage = document.getElementById('erreurMessage');
  const messageSucces = document.getElementById('messageSucces');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l’envoi du formulaire

    let valide = true;

    // Vérifie l’email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email.value)) {
      erreurEmail.style.display = 'block';
      email.style.border = '2px solid red';
      valide = false;
    } else {
      erreurEmail.style.display = 'none';
      email.style.border = '2px solid green';
    }

    // Vérifie le message
    if (message.value.trim().length < 10) {
      erreurMessage.style.display = 'block';
      message.style.border = '2px solid red';
      valide = false;
    } else {
      erreurMessage.style.display = 'none';
      message.style.border = '2px solid green';
    }

    // Si tout est valide
    if (valide) {
      messageSucces.style.display = 'block';
      setTimeout(() => {
        messageSucces.style.display = 'none';
        form.reset();
        email.style.border = '';
        message.style.border = '';
      }, 3000); // Masque le message après 3 secondes
    } else {
      messageSucces.style.display = 'none';
    }
  });
</script>
```
Analysons ce code :
1. **Empêcher la soumission automatique**
On **bloque l’envoi** pour effectuer nos vérifications avec ```event.preventDefault()```.

2. **Contrôler les champs**
On **vérifie** le **format de l’email** avec une **regex** et on **s’assure** que le **message comporte au moins 10 caractères**.

3. **Afficher les messages d’erreur**
Si une vérification **échoue**, le texte ```Email invalide``` ou ```Le message est trop court``` **devient visible** (```display: block```). En parallèle, la bordure du champ devient rouge.

4. **Afficher un message de succès**
Si tout est **correct**, un **texte vert s’affiche**. Le formulaire est **réinitialisé** après 3 secondes grâce à ```setTimeout()```.

### Amélioration visuelle (CSS)

On peut rendre cette **validation plus élégante** en ajoutant un peu de style :
```css
input, textarea {
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    transition: border-color 0.3s;
}

input:focus, textarea:focus {
    outline: none;
    border-color: #007BFF;
}

.erreur {
    color: red;
    font-size: 0.9em;
}

.succes {
    color: green;
    font-weight: bold;
}
```
Avec ce style, les **changements de couleur** sont **plus doux** et **modernes**. On ajoutera ou enlevera les classes CSS avec ce que l'on a vu précèdement !

## Pratique

Dans le dossier [manip-formulaires](manip-formulaires/script.js), regardez les différents fichier et dans le fichier ```script.js``` faites les exercices en **suivant les consignes**.

---

© Vincent Chiofalo