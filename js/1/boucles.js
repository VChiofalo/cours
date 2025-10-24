let prompt = require('prompt-sync')();

// A ne pas faire: boucle infinie
// while(true) {
//     console.log('Tant que c\'est vrai je continue');
// }

// while avec une condition booléenne

let jouer = true;

while(jouer) {
    jouer = prompt('Tu veux jouer ? ') == 'true';
}

// compteur

let compteur = 0;

while (compteur < 10){
    console.log('Bonjour, je suis le '+ compteur + ' message');
    compteur = compteur + 1;
}

// Pour : for

for (let compteur = 0; compteur < 10; compteur = compteur + 1) {
    console.log(compteur);
    
}

// incrémentation

compteur = compteur + 1;
compteur += 1;
compteur++;