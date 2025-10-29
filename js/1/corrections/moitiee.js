/* La moitiée

1 - Créer un programme qui demande à l'utilisateur un nombre entier

2 - Le programme doit renvoyer la moitiée de ce nombre et l'afficher dans la console

 */

let prompt = require('prompt-sync')();
let entier = prompt('Donne moi un nombre entier ! ');

console.log("La moitié de ton nombre est : " + (entier/2));
