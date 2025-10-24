// Opérateurs de comparaison
let noteToto        =       0,
    noteTata        =       17,
    tailleLimite    =       1.30,
    tailleToto      =       1.70,
    tailleTata      =       1.30;

// Supérieur à
let tataMeilleure   =       noteToto    <   noteTata;

console.log(tataMeilleure);

console.log();

//Inférieur à
let totoMeilleur    =       noteToto    >   noteTata;

console.log(totoMeilleur);

console.log();

// Egal à
let egalNotes       =       noteToto   ==  noteTata;
console.log(egalNotes);

console.log();

// Supérieur ou égal à
let indulgent       =       tailleTata  >=  tailleLimite,
    strict          =       tailleTata  >   tailleLimite;

console.log(indulgent);
console.log(strict);

console.log();

// Inférieur ou égal à
let indulgent2       =       tailleTata  <=  tailleLimite,
    strict2          =       tailleTata  <   tailleLimite;

console.log(indulgent);
console.log(strict);

console.log();

// Test conditionnnel

    // if(condition) {}
if (indulgent) {
    console.log('Tata peut monter dans le manége');
}

console.log();

    // if(condition) {} else {}
if (strict) {
    console.log('Tata peut monter dans le manége');
} else {
    console.log('Tata ne peut pas monter dans le manége');
}

console.log();

    //if(condition) {faire qchose} else if (condition) {faire autre chose} else {faire par défaut}
let moyenne  =  10;
noteToto = 10;

if (noteToto > moyenne) {
    console.log('C\'est très bien, continue comme ça');   
} else if (noteToto == moyenne) {
    console.log('C\'est une début, poursuis tes efforts');  
} else {
    console.log('Il reste des efforts à faire');
}

console.log();

noteToto = 11;

if (noteToto > moyenne) {
    console.log('C\'est très bien, continue comme ça');   
} else if (noteToto == moyenne) {
    console.log('C\'est une début, poursuis tes efforts');  
} else {
    console.log('Il reste des efforts à faire');
}

console.log();

noteToto = 9;

if (noteToto > moyenne) {
    console.log('C\'est très bien, continue comme ça');   
} else if (noteToto == moyenne) {
    console.log('C\'est une début, poursuis tes efforts');  
} else {
    console.log('Il reste des efforts à faire');
}

console.log();

// Opérateur logiques

    // ET (AND) : &&
let ageToto = 24,
    isTotoIvre = false;

if (ageToto > 18 && isTotoIvre == false) {
    console.log('Tu peux entrer');
}else {
    console.log('Ca va pas être possible');
}

console.log();

let ageTiti = 17,
    isTitiIvre = false;

if (ageTiti > 18 && isTitiIvre == false) {
    console.log('Tu peux entrer');
}else {
    console.log('Ca va pas être possible');
}

console.log();

    // OU (OR) : ||
if (ageTiti < 18 || isTitiIvre) {
    console.log('Veuillez me suive');
}else {
    console.log('Vous pouvez circuler');
}

console.log();

    //NON (NOT) : !
if (ageTiti > 18 && !isTitiIvre) {
    console.log('Tu peux entrer');
}else {
    console.log('Ca va pas être possible');
}

console.log();

    //Différent de : !=
let differentDe = ageToto != 23;