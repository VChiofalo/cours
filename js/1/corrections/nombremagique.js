/* Créez un programme qui :
    1 : va générer un nombre aléatoire entre 0 et 9
    
    2 : demander à l'utilisateur d'essayer de deviner le nombre

    3 : s'il réussit, on va lui dire qu'il a gagné, sinon, on lui dit qu'il a perdu

    4 (optionnel) : proposer à l'utilisateur de rejouer
*/

const prompt = require('prompt-sync')();

let rejouer = true;

while (rejouer) {
    // 1 - Générer un nombre aléatoire entre 0 et 9
    const nombreAleatoire = Math.floor(Math.random() * 10);

    // 2 - Demander à l'utilisateur de deviner
    const saisie = Number(prompt("Devine le nombre (entre 0 et 9) : "));

    // 3 - Vérifier la réponse
    if (saisie === nombreAleatoire) {
        console.log("Bravo ! Tu as gagné !");
    } else {
        console.log(`Dommage ! Tu as perdu. Le nombre était ${nombreAleatoire}.`);
    }

    // 4 - Proposer de rejouer
    const reponse = prompt("Veux-tu rejouer ? (oui/non) : ").toLowerCase();
    if (reponse !== "oui") {
        rejouer = false;
        console.log("Merci d'avoir joué ! À bientôt !");
    }
}