# Les tableaux

## Avant propos

Développer une **application web moderne**, c’est apprendre à jongler avec toutes sortes de données : **listes d’éléments**, **formulaires**, **ensembles complexes**, et **bien plus encore**. Savoir les **stocker** et les **manipuler efficacement**, c’est souvent ce qui fait la différence entre un site agréable à utiliser et une expérience frustrante.

C’est là qu’interviennent les **tableaux JavaScript**. Dans ce chapitre, vous allez découvrir comment les **créer**, les **initialiser**, **accéder à leurs éléments** et les **modifier**. Vous apprendrez aussi à utiliser les **principales méthodes** et **propriétés** pour en tirer le meilleur parti.

Imaginez un outil capable de **stocker**, **trier**, **filtrer** ou **transformer** vos données en quelques lignes de code, avec une **syntaxe claire** et **puissante**. C’est exactement ce que les tableaux JavaScript vous permettent de faire !

![Jongler avec des données](img/juggle-data.jpg){ style="display: block; margin: 0 auto" }

## Créer et initialiser des tableaux

Avant de pouvoir tirer parti de toute **la puissance des tableaux** en JavaScript, il faut d’abord **savoir les créer** et **les initialiser**. C’est une étape essentielle pour bien démarrer, alors voyons ensemble les d**ifférentes façons de procéder**.

### Création d'un tableau

La façon la plus simple de créer un tableau en JavaScript, c’est d’utiliser la **notation entre crochets** ```[]```. Cette syntaxe permet de **créer un tableau vide**, prêt à **recevoir vos futurs éléments**. Par exemple :
```javascript
let tableau = [];
```
Vous obtenez ainsi un **conteneur souple et évolutif**, dont la taille s’ajuste automatiquement à mesure que vous ajoutez ou supprimez des éléments.

Il existe d'autres moyen de créer un tableau en JavaScript, comme :
```javascript
let tableau = new Array();
```
mais on privilégiera la première ici !

En JavaScript, on peut également créer un tableau tout en lui donnant **directement des valeurs**. Pour cela, il suffit d’**écrire les valeurs entre crochets**, **séparées** par des **virgules** :
```javascript
let array =  ['tomate','souris', 'clavier', 'chips', 'patate', 'écran', 'unitée centrale', 'courgette'];
```

### Méthodes d’initialisation d’un tableau : boucle et constructeur

Il peut arriver que vous deviez initialiser un tableau à partir de **valeurs calculées** ou **récupérées** depuis une **source de données externe**.
Dans ce cas, l’utilisation d’une boucle ou du constructeur **Array** permet de générer efficacement le contenu du tableau.
Voici un exemple avec une boucle **for** :
```javascript
let array = [];

for(let i=0; i<5; i++){
    array.push(i); // Ajoute la valeur de i tant que i est strictement inférieur à 5
};
```

Il est également possible d’utiliser le constructeur ```Array``` pour créer un tableau en **précisant directement sa longueur initiale** :

```javascript
let array = new Array(24); // Crée uun tableau de 24 éléments de longueur sans valeurs définies
```

Cette méthode d’**initialisation dynamique** offre une grande **souplesse**, car elle permet de générer des **tableaux adaptés** à différents **besoins** ou **situations spécifiques**.

## Accéder aux éléments de tableau et les modifier 

Créer et initialiser des tableaux n’est qu’une **première étape**. Pour exploiter pleinement leur potentiel, il est essentiel de savoir **comment accéder à leurs éléments** et **les manipuler efficacement**.

### Accès aux éléments par leur indice et modifier des éléments existants

Chaque élément d’un tableau est associé à un **indice numérique unique**, qui permet d’y accéder directement. En JavaScript, **les indices commencent** à **0** pour le **premier élément**.

Pour **récupérer** la valeur d’un **élément précis**, on utilise la **notation entre crochets** :
```javascript
let array =  ['tomate','souris', 'clavier', 'chips', 'patate', 'écran', 'unitée centrale', 'courgette'];

console.log(array[0]); // Affiche 'tomate'
```

Il est également possible de se servir de ces indices pour **modifier la valeur** d’un **élément existant** :
```javascript
array[4] = 'casque';

console.log(array); // ['tomate','souris', 'clavier', 'casque', 'patate', 'écran', 'unitée centrale', 'courgette']
```

### Ajouter et supprimer des éléments

Les tableaux en JavaScript sont des structures **dynamiques**, ce qui signifie qu’il est possible d’y **ajouter** ou d’en **supprimer** des éléments à tout moment. Le langage propose plusieurs **méthodes intégrées** pour simplifier ces opérations.

Pour **ajouter un élément à la fin** d’un tableau, on utilise la méthode ```push()``` :
```js
let array =  ['tomate','souris', 'clavier', 'casque', 'patate', 'écran', 'unitée centrale', 'courgette'];

array.push('fromage');

console.log(array); // ['tomate','souris', 'clavier', 'casque', 'patate', 'écran', 'unitée centrale', 'courgette', 'fromage']
```

À l’inverse, la méthode ```pop()``` **supprime** et **renvoie** le dernier élément du tableau :
```js
array.pop();

console.log(array); // ['tomate','souris', 'clavier', 'casque', 'patate', 'écran', 'unitée centrale', 'courgette']
```

Vous pouvez également **ajouter** un **élément** au **début du tableau** avec ```unshift()```, ou **supprimer** le **premier élément** avec ```shift()``` :
```js
array.unshit('orange');

console.log(array); // ['orange', 'tomate','souris', 'clavier', 'casque', 'patate', 'écran', 'unitée centrale', 'courgette']

array.shift();

console.log(array); // ['tomate','souris', 'clavier', 'casque', 'patate', 'écran', 'unitée centrale', 'courgette']
```

Enfin, la méthode ```splice()``` se révèle **très polyvalente** : elle permet d’**insérer,** de **remplacer** ou de **supprimer** un ou plusieurs éléments à un indice donné :
```js
array.splice(4, 1); // suprrime 1 élément à partir de l'indice 4

console.log(array); // ['tomate','souris', 'clavier', 'casque', 'écran', 'unitée centrale', 'courgette']

array.splice(0, 1, 'micro'); // supprime 1 élément à partir de l'indice 0 et le remplace par 'micro'

console.log(array); // ['micro','souris', 'clavier', 'casque', 'écran', 'unitée centrale', 'courgette']
```

En maîtrisant ces techniques d’**ajout**, de **suppression** et de **modification**, vous disposez désormais des outils essentiels pour manipuler efficacement le contenu de vos tableaux selon les besoins de votre application.

## Parcourir les tableaux

Il existe **plusieurs méthodes** pour **parcourir** les tableaux JavaScript. Nous allons en voir quelqu'unes ici.
Mais avant cela, parlons d'une propriété **très utile**. La propriété ```length```. Elle retourne le **nombre d'éléments** dans le tableau :
```js
console.log(array.length); // Affiche : 7
```

### La boucle ```While```

La boucle ```while``` permet d’exécuter un bloc d’instructions **tant qu’une condition donnée est vraie**.
Elle est particulièrement utile lorsque le nombre d’itérations n’est pas connu à l’avance.
```js
let i = 0;
const numbers = [];

while(i < 5){
    numbers.push(i);
    i + 1;
};

console.log(numbers); // [0, 1, 2, 3, 4]
```
Ici, la boucle s’exécute tant que la variable ```i``` est **strictement inférieure** à 5. À chaque tour, ```i``` est **ajouté au tableau**, puis **incrémenté**.

### La boucle ```for```

La boucle ```for``` permet de répéter une série d’instructions un certain nombre de fois.
Elle est pratique lorsque l’on connaît **le nombre d’itérations à effectuer**.
```js
const numbers = [];

for(let i=0; i<5; i++){
  numbers.push(i);
}

console.log(numbers); // [0, 1, 2, 3, 4]
```
Ici, la boucle démarre avec ```i = 0``` et s’exécute tant que ```i``` est **strictement inférieur** à 5.
À chaque tour, la valeur de ```i``` est ajoutée au tableau nombres, puis i est incrémenté de 1.

On peu aussi boucler sur chaque éléments d'un tableau déjà rempli en utilisant la propriété ```length``` :
```js
const students = ['marc', 'housman', 'nicolas', 'farah', 'lise'];

for(let i=0; i < students.length - 1; i++){
    console.log(students[i]);
};

// Affiche :
// marc
// housman
// nicolas
// farah
// lise
```

### La méthode ```forEach()```

La méthode ```forEach()``` permet d’exécuter une action pour **chaque élément** d’un tableau :
```js
const fruits = ['pomme', 'banane', 'orange'];

fruits.forEach(fruit => {
  console.log(fruit);
});


// Affiche :
// pomme
// banane
// orange
```
Ici, la fonction passée à ```forEach()``` est exécutée pour **chaque élément** du tableau ```fruits```.
C’est une façon simple et lisible de parcourir un tableau sans utiliser de boucle classique.

### La méthode ```map()```

La méthode ```map()``` crée un **nouveau tableau** en appliquant une fonction à **chaque élément** du tableau d’origine.
Elle est très utile pour transformer les données sans modifier le tableau initial.
```js
const numbers = [1, 2, 3, 4];
const doubles = numbers.map(n => n * 2);

console.log(doubles); // [2, 4, 6, 8]
```
Ici, chaque valeur du tableau ```nombres``` est multipliée par 2 pour **former le tableau** ```doubles```.

### La méthode ```reduce()```

La méthode ```reduce()``` est utilisée pour **accumuler** les valeurs d’un tableau en une seule valeur (somme, produit, moyenne, etc.).
Elle prend une fonction de réduction et une valeur initiale en paramètre.
```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, value) => total + value, 0);

console.log(sum); // 15
```
Ici, ```reduce()``` additionne tous les éléments du tableau, en partant de 0.
C’est une méthode puissante pour effectuer des calculs ou agréger des données.

## Pratique

Ouvrez le fichier ```pratique-tableaux.js``` et faites les exercices 1 à 7.

## En résumé

Les tableaux constituent l’une des structures de données les plus utilisées en JavaScript.
Ils permettent de **stocker**, **organiser** et **manipuler** facilement des ensembles de valeurs.

Vous avez vu qu’il est possible :

- d’**initialiser**un tableau avec des valeurs fixes ou dynamiques ;

- d’**accéder** à ses éléments grâce à leur indice ;

- de **modifier**, ajouter ou supprimer des éléments à l’aide de méthodes comme ```push()```, ```pop()```, ```shift()```, ```unshift()``` ou ```splice()``` ;

- de **parcourir** un tableau à l’aide de boucles (```for```, ```while```) ou de méthodes dédiées (```forEach()```, ```map()```, ```filter()```, ```reduce()```).

Chaque méthode a son utilité :

- Les **boucles** sont **simples** et **universelles**.

- ```forEach()``` est pratique pour exécuter une action sur chaque élément.

- ```map()``` et ```filter()``` permettent de créer de **nouveaux tableaux** à partir des données existantes.

- ```reduce()``` sert à **résumer** ou **combiner** les valeurs d’un tableau en un seul résultat.

En combinant ces outils, vous disposez désormais de tout ce qu’il faut pour manipuler efficacement les tableaux et les adapter aux besoins de vos programmes.