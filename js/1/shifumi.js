// Avec tout ce que l'on a vu, il est maintenant temps de se lancer sur le développement d'un petit programme rigolo mais plus complexe

// Petit rappel ! La feuille bat la pierre, les ciseaux battent la feuille, la pierre bat les ciseaux. Bonne chance 😄
let prompt = require('prompt-sync')();

const board = ['pierre', 'feuille', 'ciseaux'];

let shifumi =  prompt('Choisis entre pierre, feuille et ciseaux : ');
let choiceUser = board.indexOf(shifumi);

if (il y a egalité) {
    console.log('égalité');
    
} else if (le choix de mon utilisateur est pierre et que le choix du bot est ciseaux ou le choix) {
    console.log('tu as gagné');
    
} else {
    console.log('perdu');
    
}


// Optionnel 1 : permettre de rejouer

// Optionnel 2 : compter les points