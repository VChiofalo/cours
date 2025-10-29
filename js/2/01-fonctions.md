# Les fonctions

## Avant propos

Une **fonction** est un **bloc de code réutilisable** qui exécute une série d’instructions.
Si les **variables** représentent les **briques de base** de la programmation, alors les fonctions en sont les **murs**, les **fenêtres** et les **portes** : elles structurent et donnent vie à ton programme.

Elles permettent d’éviter la répétition de code et rendent les programmes plus clairs, plus courts et plus **faciles à maintenir**.

## Les bases des fonctions

### Déclarer une fonction

Avant de pouvoir utiliser une fonction, il faut d’abord la **déclarer**.
Cela consiste à lui donner un **nom** et à définir les **instructions** qu’elle doit exécuter.
Une fois déclarée, une fonction peut être **appelée** autant de fois que nécessaire.

Syntaxe pour déclarer une fonction en JavaScript :
```js
function nomDeLaFonction(paramètre1, paramètre2,...){
    // Instruction à exécuter
};
```
Par exemple :
```js
function helloWorld(){
    console.log('Hello World');
};
```

### Appeller une fonction

Une fois la fonction déclarée, on peut l’**appeler** en écrivant son **nom** suivi de **parenthèses**.
On peut également **passer des valeurs** à la fonction : ce sont les **arguments**.
```js
nomDeLaFonction(arguments);
```
Exemple d'appel de fonction :
```js
helloWorld(); // Affiche "Hello World" dans la console
```

### Paramètres et arguments

### Fonctions avec paramètres / arguments

Les termes **paramètre** et **argument** sont très proches, mais désignent deux choses légèrement différentes :
| Terme         | Définition                                                                         |
| ------------- | ---------------------------------------------------------------------------------- |
| **Paramètre** | Variable déclarée dans la fonction, utilisée à l’intérieur du code de la fonction. |
| **Argument**  | Valeur transmise à la fonction lors de son appel.                                  |
Ici :
- ```prenom``` et ```nom``` sont des **paramètres** ;
- ```"John"``` et ```"Doe"``` sont les **arguments** passés lors de l’appel.

```js
function afficherNomComplet(prenom, nom) {
  console.log(prenom + " " + nom);
};
```
Appel de la fonction avec des arguments :
```js
afficherNomComplet("John", "Doe"); // Affiche "John Doe"

let firstName = "Jane";
let lastName = "Doe";

afficherNomComplet(firstName, lastName); // Affiche "Jane Doe"
```

💡Astuce :
Remarquez que l'on n'a pas besoin de déclarer les paramètres de la fonction. On peut directement les utiliser dans la fonction. Remarquez également que l'on peut passer des variables en argument à une fonction et que ces variables peuvent avoir n'importe quel nom.

### Fonctions avec valeur de retour

Une fonction peut **retourner une valeur** à l’aide du mot-clé ```return```.
Lorsqu’un ```return``` est exécuté, la fonction **s’arrête immédiatement**, et la valeur indiquée est renvoyée à l’endroit où la fonction a été appelée.
Exemple :
```js
function additionner(a, b) {
  return a + b;
};
```
Le code qui suit le ```return``` n’est **jamais exécuté** :
```js
function additionner(a, b) {
  return a + b;
  console.log("Cette ligne ne sera jamais exécutée !");
};
```
La valeur retournée peut être **stockée dans une variable** ou **utilisée directement** :
```js
let somme = additionner(10, 20);
console.log(somme); // 30

console.log(additionner(10, 20)); // 30
```

## Pratique

Dans le dossier ```manip-fonctions```, regardez les différents fichier et dans le fichier ```script.js``` faites les exercices en **suivant les consignes**.

---

© Vincent Chiofalo