/**** Tester une chaîne avec .test() ****/

// 1 - Dans index.html crée un champ texte et un bouton.
// 2 - Lorsque l’utilisateur clique sur le bouton :
    // Vérifie si la chaîne contient exactement 5 chiffres.
    // Affiche une alerte :
        // "Code postal valide" si la condition est respectée.
        // "Code postal invalide" sinon.

const champ = document.querySelector('#codePostal');
const bouton = document.querySelector('#btnVerifier');

bouton.addEventListener('click', function() {
let regex = /^\d{5}$/; // 5 chiffres exacts
if (regex.test(champ.value)) {
    alert('Code postal valide !');
} else {
    alert('Code postal invalide !');
}
});

// `\d` représente un chiffre.
// `{5}` signifie “exactement 5 fois”.
// `^` et `$` indiquent le début et la fin de la chaîne (empêchent les caractères en trop).


/**** Identifier une correspondance avec .match() ****/

// 1 - Demande à l’utilisateur d’entrer une phrase contenant un nombre (ex : "J’ai 18 ans").
// 2 - Utilise .match() pour extraire le nombre.
// 3 - Affiche ce nombre dans la console.

const phrase = document.querySelector('#phrase');
const bouton2 = document.querySelector('#btnExtraire');

bouton2.addEventListener('click', function() {
let resultat = phrase.value.match(/\d+/);
if (resultat) {
    alert('Nombre trouvé : ' + resultat[0]);
} else {
    alert('Aucun nombre trouvé !');
}
});

// `\d+` une ou plusieurs occurrences de chiffres.
// `.match()` renvoie un tableau des correspondances. Si rien n’est trouvé, elle renvoie null.


/**** Valider une adresse e-mail ****/

// 1 - Décommante le formulaire et commente ton champ texte et son bouton dans le fichier index.html
// 2 - Empêche la soumission automatique du formulaire.
// 3 - Vérifie que la saisie correspond à une adresse e-mail valide :
    // Si c’est correct affiche une bordure verte.
    // Sinon affiche une bordure rouge et un message d’erreur.

const form = document.querySelector('#formEmail');
const email = document.querySelector('#email');
const erreur = document.querySelector('#erreurEmail');

form.addEventListener('submit', function(event) {
event.preventDefault();

let regexEmail = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

if (regexEmail.test(email.value)) {
    email.style.border = "2px solid green";
    erreur.style.display = "none";
    alert("Adresse email valide !");
} else {
    email.style.border = "2px solid red";
    erreur.style.display = "block";
}
});

// `[A-Za-z0-9._-]+` caractères autorisés avant le @.
// `@` est un symbole obligatoire.
// `\.\w{2,}` point suivi d’au moins 2 lettres (ex : .fr, .com, .org).


/**** Valider plusieurs champs ****/

// 1 - Commente le formulaire et crée en un nouveau avec les champs suivants :
    // Nom (lettres uniquement).
    // Code postal (5 chiffres).
    // Numéro de téléphone (format français : commence par 0 et contient 10 chiffres).
// 2 - À la soumission :
    // Vérifie chaque champ à l’aide d’une regex adaptée.
    // Pour chaque erreur, affiche un message en rouge sous le champ concerné.
    // Si tout est correct, affiche un message vert "Formulaire valide !".

const form2 = document.querySelector('#formContact');
const nom = document.querySelector('#nom');
const cp = document.querySelector('#cp');
const tel = document.querySelector('#tel');
const succes = document.querySelector('#succes');

const erreurNom = document.querySelector('#erreurNom');
const erreurCP = document.querySelector('#erreurCP');
const erreurTel = document.querySelector('#erreurTel');

form2.addEventListener('submit', function(event) {
event.preventDefault();
let valide = true;

let regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;
let regexCP = /^\d{5}$/;
let regexTel = /^0\d{9}$/;

// Nom
if (!regexNom.test(nom.value)) {
erreurNom.style.display = 'block';
nom.style.border = '2px solid red';
valide = false;
} else {
erreurNom.style.display = 'none';
nom.style.border = '2px solid green';
}

// Code postal
if (!regexCP.test(cp.value)) {
erreurCP.style.display = 'block';
cp.style.border = '2px solid red';
valide = false;
} else {
erreurCP.style.display = 'none';
cp.style.border = '2px solid green';
}

// Téléphone
if (!regexTel.test(tel.value)) {
erreurTel.style.display = 'block';
tel.style.border = '2px solid red';
valide = false;
} else {
erreurTel.style.display = 'none';
tel.style.border = '2px solid green';
}

if (valide) {
succes.style.display = 'block';
setTimeout(() => succes.style.display = 'none', 3000);
form.reset();
nom.style.border = cp.style.border = tel.style.border = '';
}
});

// Les trois champs sont testés séparément avec des regex différentes.
// En cas d’erreur on affiche un message rouge avec bordure rouge
// Si tout est bon on affiche un message vert et le formulaire réinitialisé.


/**** Vérifier un mot de passe sécurisé ****/

// 1 - Commente le formulaire et crée un champ de mot de passe et un bouton "Vérifier" :
// 2 - Le mot de passe doit :
    // Contenir au moins 8 caractères.
    // Avoir une majuscule.
    // Avoir un chiffre.
// 3 - Affiche un message indiquant si le mot de passe est valide ou non.

const mdp = document.querySelector('#mdp');
const bouton3 = document.querySelector('#verifierMdp');
const message = document.querySelector('#messageMdp');

bouton3.addEventListener('click', function() {
let regexMdp = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

if (regexMdp.test(mdp.value)) {
    message.textContent = "Mot de passe sécurisé";
    message.style.color = "green";
} else {
    message.textContent = "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.";
    message.style.color = "red";
}
});

// (?=.*[A-Z]) vérifie qu'il y a au moins une majuscule.
// (?=.*\d) vérifie qu'il y a au moins un chiffre.
// .{8,} vérifie qu'il y a au minimum 8 caractères.


/**** Bonus - Validation en direct ****/

// 1 - Reprends ton formulaire de l’exercice "Valider plusieurs champs".
// 2 - Ajoute un écouteur input sur chaque champ.
// 3 - Affiche ou masque dynamiquement les messages d’erreur au fur et à mesure de la saisie.

// Regex utilisées
const regexNom2 = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/; // lettres, espaces et tirets
const regexCP2 = /^\d{5}$/;                 // 5 chiffres exacts
const regexTel2 = /^0\d{9}$/;               // début 0 + 9 chiffres (10 chiffres total)

// Fonction utilitaire pour toggler état du champ
function setFieldState(champ, erreurElem, isValid) {
if (isValid) {
    erreurElem.style.display = 'none';
    champ.style.border = '2px solid green';
} else {
    erreurElem.style.display = 'block';
    champ.style.border = '2px solid red';
}
}

// Validation "live" à chaque saisie
nom.addEventListener('input', () => {
const value = nom.value.trim();
// On considère qu'un champ vide est invalide ici (option : tolérer vide)
const valid = value !== '' && regexNom2.test(value);
setFieldState(nom, erreurNom, valid);
});

cp.addEventListener('input', () => {
const value = cp.value.trim();
const valid = regexCP2.test(value);
setFieldState(cp, erreurCP, valid);
});

tel.addEventListener('input', () => {
const value = tel.value.trim();
const valid = regexTel2.test(value);
setFieldState(tel, erreurTel, valid);
});

// Validation finale au submit
form.addEventListener('submit', (event) => {
event.preventDefault(); // on contrôle tout nous-mêmes

// Récupère et teste les valeurs
const nomVal = nom.value.trim();
const cpVal = cp.value.trim();
const telVal = tel.value.trim();

const nomOk = nomVal !== '' && regexNom.test(nomVal);
const cpOk = regexCP2.test(cpVal);
const telOk = regexTel2.test(telVal);

// Met à jour l'UI
setFieldState(nom, erreurNom, nomOk);
setFieldState(cp, erreurCP, cpOk);
setFieldState(tel, erreurTel, telOk);

if (nomOk && cpOk && telOk) {
    succes.style.display = 'block';
    // Réinitialisation visuelle après 3s
    setTimeout(() => {
    succes.style.display = 'none';
    form.reset();
    nom.style.border = cp.style.border = tel.style.border = '';
    }, 3000);
} else {
    succes.style.display = 'none';
}
});