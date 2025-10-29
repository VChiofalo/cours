/**** Exercice 1 ****/ 

// 1 - Crée un tableau nommé fruits contenant les éléments suivants : 'pomme', 'banane', 'orange'.
const fruits = ['pomme', 'banane', 'orange'];

// 2 - Affiche le premier et le dernier élément du tableau dans la console.
console.log(fruits[0]);
console.log(fruits[2]);

// 3 - Remplace 'banane' par 'kiwi'.
fruits[1] = 'kiwi';

// 4 - Ajoute 'fraise' à la fin du tableau.
fruits.push('fraise');

// 5 - Affiche le tableau complet.
console.log(fruits);


/**** Exercice 2 ****/ 

// 1 - Crée un tableau vide nommé nombres.
const nombres = [];

// 2 - À l’aide d’une boucle for, ajoute les nombres de 1 à 5 dans ce tableau.
for (let i = 0; i <= 5; i++) {
    nombres.push(1)
}

// 3 - Avec une boucle while, affiche ensuite chaque valeur du tableau dans la console.
let index = 0;

while (index < nombres.length) {
    console.log(nombres[index]);
    index++;
}

/**** Exercice 3 ****/ 

// À partir du tableau suivant :

const animaux = ['chat', 'chien', 'lapin'];

// Utilise la méthode forEach() pour afficher chaque animal dans la console précédé du texte : "Animal : ".
animaux.forEach(animal => {
    console.log("Animal : " + animal);
});


/**** Exercice 4 ****/ 

// 1 - Crée un tableau nombres2 = [1, 2, 3, 4, 5].
const nombres2 = [1, 2, 3, 4, 5];

// 2 - Utilise la méthode map() pour créer un nouveau tableau contenant le double de chaque nombre.
const doubles = nombres2.map(nombre => nombre * 2);

// 3 - Affiche le tableau original et le nouveau tableau.
table.log(nombres2);
console.log();
table.log(doubles);


/**** Exercice 5 ****/ 

// À partir du tableau suivant :

const nombres3 = [5, 12, 8, 130, 44];

// 1 - Crée un nouveau tableau contenant uniquement les valeurs supérieures ou égales à 10 à l’aide de filter().
const supOuEgale10 = nombres3.filter(nombre => nombre >= 10);

// 2 - Affiche le résultat.
console.log(supOuEgale10); 



/**** Exercice 6 ****/ 

// À partir du tableau :

const nombres4 = [10, 20, 30, 40];

// 1 - Utilise reduce() pour calculer la somme totale des valeurs du tableau.
const somme = nombres4.reduce((accumulateur, valeur) => accumulateur + valeur, 0);

// 2 - Affiche le résultat.
console.log(somme);



/**** Exercice 7 - Bonus ****/ 

// À partir du tableau suivant :

const notes = [12, 8, 15, 17, 10];

// 1 - Utilise map() pour ajouter 1 point à chaque note (sans modifier le tableau d’origine).
const notesAugmentees = notes.map(note => note + 1);
console.log("Notes augmentées :", notesAugmentees);

// 2 - Utilise filter() pour garder uniquement les notes supérieures ou égales à 10.
const notesValidées = notesAugmentees.filter(note => note >= 10);
console.log("Notes valides (>=10) :", notesValidées); 

// 3 - Utilise reduce() pour calculer la moyenne des notes obtenues.
const somme2 = notesValidées.reduce((acc, note) => acc + note, 0);
const moyenne = somme2 / notesValidées.length;
console.log("Moyenne des notes :", moyenne);

// 4 - Affiche les résultats à chaque étape.