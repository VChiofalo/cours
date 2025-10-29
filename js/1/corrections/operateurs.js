let addition = 'Addition : 10 + 5 = ' + (10 +5);
let soustrait = 'Soustraction : 10 - 5 = ' + (10 - 5);
let multipl = 'Multiplication : 10 * 5 =  ' + (10 * 5);
let divis = 'Division : 10 / 5 = ' + ( 10 / 5);
let modulo1 = 'Modulo : 10 % 5 = ' + ( 10 % 5);
let modulo2 = 'Modulo : 12 % 5 = ' + (12 % 5);
let puissance = 'Puissance : 10 ** 5 = ' + (10 ** 5);
let multiplicateur = 10;
let random = (Math.random() * multiplicateur);
let cote1 = 4;
let cote2 = 3;
let hypotenuse =  Math.sqrt(cote1 ** 2 + cote2 ** 2); 
const pi = 'Pi : ' + Math.PI;

let prenom = 'Ada';
let nom = 'Lovelace';
let nomComplet = prenom + " " + nom;

// Opérations simples
    
console.log('*** Opérations simples ***');
console.log();
console.log(addition);
console.log(soustrait);
console.log(multipl);
console.log(divis);
console.log();
console.log();

// Concaténation

console.log('*** Concaténation ***');
console.log();
console.log('Le nom complet de notre geek est '+nomComplet);

// Opérations avancées

console.log('*** Opérations avancées ***');
console.log();
console.log(modulo1);
console.log(modulo2);
console.log(puissance);
console.log();
console.log();

// BIBLIOTHEQUE "Math"

console.log('*** BIBLIOTHEQUE "Math" ***');
console.log();
console.log(pi);
console.log();
console.log('Voici un nombre aléatoire entre 0 et 9 : '+random);
console.log('Et en voici un autre, ou pas d\'ailleurs : '+random);
console.log();
console.log('Soit un triangle dont les côtés adjacents font 4 et 3, L\'hypoténuse fait : '+hypotenuse);
