/**** Tester une chaîne avec .test() ****/

// 1 - Dans index.html crée un champ texte et un bouton.
// 2 - Lorsque l’utilisateur clique sur le bouton :
    // Vérifie si la chaîne contient exactement 5 chiffres.
    // Affiche une alerte :
        // "Code postal valide" si la condition est respectée.
        // "Code postal invalide" sinon.


/**** Identifier une correspondance avec .match() ****/

// 1 - Demande à l’utilisateur d’entrer une phrase contenant un nombre (ex : "J’ai 18 ans").
// 2 - Utilise .match() pour extraire le nombre.
// 3 - Affiche ce nombre dans la console.


/**** Valider une adresse e-mail ****/

// 1 - Décommante le formulaire et commente ton champ texte et son bouton dans le fichier index.html
// 2 - Empêche la soumission automatique du formulaire.
// 3 - Vérifie que la saisie correspond à une adresse e-mail valide :
    // Si c’est correct affiche une bordure verte.
    // Sinon affiche une bordure rouge et un message d’erreur.


/**** Valider plusieurs champs ****/

// 1 - Commente le formulaire et crée en un nouveau avec les champs suivants :
    // Nom (lettres uniquement).
    // Code postal (5 chiffres).
    // Numéro de téléphone (format français : commence par 0 et contient 10 chiffres).
// 2 - À la soumission :
    // Vérifie chaque champ à l’aide d’une regex adaptée.
    // Pour chaque erreur, affiche un message en rouge sous le champ concerné.
    // Si tout est correct, affiche un message vert "Formulaire valide !".


/**** Vérifier un mot de passe sécurisé ****/

// 1 - Commente le formulaire et crée un champ de mot de passe et un bouton "Vérifier" :
// 2 - Le mot de passe doit :
    // Contenir au moins 8 caractères.
    // Avoir une majuscule.
    // Avoir un chiffre.
// 3 - Affiche un message indiquant si le mot de passe est valide ou non.


/**** Bonus - Validation en direct ****/

// 1 - Reprends ton formulaire de l’exercice "Valider plusieurs champs".
// 2 - Ajoute un écouteur input sur chaque champ.
// 3 - Affiche ou masque dynamiquement les messages d’erreur au fur et à mesure de la saisie.