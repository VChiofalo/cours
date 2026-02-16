# Comprendre ```module.exports```, ```exports```, ```require``` et ```import``` dans Node.js / Express

Dans Node.js, et donc dans Express.js, la gestion des fichiers et des modules repose sur des systèmes d’**export** et d’**import** qui permettent de réutiliser du code dans différents fichiers.

## ```module.exports```

```module.exports``` permet de définir **ce qu’un fichier va exposer** lorsqu’il est importé ailleurs avec ```require```.

Par exemple :
```js
// utils/id.js

let currentId = 0;
// on export la fonction
module.exports = () => (currentId++).toString();
```

et dans un autre fichier :
```js
// server.js

const generateId = require('../utils/generateId');

console.log(generateId()); // Affiche un nombre aléatoire
```

Ici, ```module.exports``` permet d’exporter **une seule valeur**, ici la fonction ```generateId```.

Exemple : exporter plusieurs fonctions
```js
// utils/dungeon.js

function createDungeon() {
  return "Nouveau donjon créé !";
}

function generateMonster() {
  return "Monstre généré !";
}

// On regroupe les fonctions dans un objet
module.exports = {
  createDungeon,
  generateMonster
};
```

et dans un autre fichier :
```js
// server.js

const dungeon = require('./utils/dungeon');

console.log(dungeon.createDungeon());   // Nouveau donjon créé !
console.log(dungeon.generateMonster()); // Monstre généré !
```

## ```exports```

```exports``` est une raccourci vers ```module.exports```. Il permet d’exporter **plusieurs éléments** depuis un fichier. Par exemple :
```js
// utils/dungeon.js

function createDungeon() {
  return "Nouveau donjon créé !";
}

function generateMonster() {
  return "Monstre généré !";
}

// On exporte plusieurs fonctions
exports.createDungeon = createDungeon;
exports.generateMonster = generateMonster;
```

Puis, dans un autre fichier :
```js
// server.js

const dungeon = require('./utils/dungeon');

console.log(dungeon.createDungeon()); // Nouveau donjon créé !
console.log(dungeon.generateMonster()); // Monstre généré !
```

## ```require```

```require()``` est utilisé pour **importer des modules CommonJS** (Node.js) dans un fichier. On peut importer des fichiers internes ou des modules Node.js externes. La valeur retournée correspond à ce qui a été exporté via **module.exports** ou **exports** :
```js
// server.js

const express = require('express'); // Module externe
const generateId = require('./utils/id'); // Fichier interne

const app = express();
console.log(generateId());
```

## ```import``` / ```export``` (ES Modules)

Il est maintenant possible d’utiliser la syntaxe **ES Modules**, plus proche du JavaScript moderne :
```js
// utils/id.js

export function generateId() {
  return Math.floor(Math.random() * 10000);
}
```

```js
// server.js

import { generateId } from './utils/id.js';

console.log(generateId());
```

Pour utiliser ```import```/```export``` dans Node.js, il faut ajouter ```"type": "module"``` dans le ```package.json```, ou utiliser l’extension ```.mjs``` pour les fichiers.

Exemple :
```json
{
  "name": "rogue-api",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

## Pour résumer

| Cas                                        | Solution recommandée                              |
| ------------------------------------------ | ------------------------------------------------- |
| Exporter une **seule fonction ou objet**   | `module.exports = ...`                            |
| Exporter **plusieurs fonctions ou objets** | `exports.nom = ...` ou `module.exports = { ... }` |
| Syntaxe moderne (ES6+)                     | `export` et `import`                              |


---

© Vincent Chiofalo