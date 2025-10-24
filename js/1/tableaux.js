let array =  ['tomate','souris', 'clavier', 'chips', 'patate', 'écran', 'unitée centrale', 'courgette'];

let first = array[0];

let last = array[array.length -1];

//Supprime le dernier élément du tableau
let delLast = array.pop();

//Supprime le premier élément du tableau
let delFirst = array.shift();

//Supprime un élément par son index
let removeByIndex = array.splice(2, 1);

//Supprime et ajoute un élément par son index
let changeByIndex = array.splice(2, 1, 'ram');

//Ajoute un élément au début du tableau
let addFirst = array.unshift('micro');

//Ajoute un élément à la fin du tableau
let addLast = array.push('lecteur');

//Trouver l'index d'un élément du tableau
let searchIndex = array.indexOf('écran');

//Copier un tableau
let computer = array.slice();

console.table(array);
console.table(computer);
console.log(searchIndex);

// Lien documentation https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
