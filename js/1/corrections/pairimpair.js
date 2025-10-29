/* Créer un programme qui : 
    1 : va demander à l'utilisateur de saisir un nombre
    2 : dire à l'utilisateur si le nombre est pair ou impair */

const prompt = require('prompt-sync')();

// 1 - Demander à l'utilisateur de saisir un nombre
const nombre = prompt("Saisis un nombre : ");

// 2 - Vérifier si le nombre est pair ou impair
if (nombre % 2 === 0) {
    console.log("Le nombre est pair !");
} else {
    console.log("Le nombre est impair !");
}
