# Test et validation de l’API à l’aide d’outils automatisés

Une API bien conçue n’est utile que si elle fonctionne correctement. Les tests permettent de vérifier que les endpoints répondent comme attendu, que les données sont correctes et que les erreurs sont gérées proprement. La validation automatisée évite les erreurs humaines et garantit la **fiabilité**, la **maintenabilité** et la **qualité** de l’API, surtout lorsqu’elle évolue dans le temps.

Tester une API ne se limite pas à envoyer quelques requêtes manuelles : des outils automatisés permettent de **simuler différents scénarios**, de **vérifier les codes HTTP**, et d’**assurer la conformité aux spécifications** telles que OpenAPI ou Swagger.

## Tests manuels avec Postman ou Insomnia

Avant d’automatiser, il est conseillé de se familiariser avec les tests **manuels**. Postman ou Insomnia permettent de :
- Envoyer des requêtes ```GET```, ```POST```, ```PUT```, ```DELETE``` vers vos endpoints.
- Vérifier la structure de la réponse JSON, les codes HTTP et les en-têtes.
- Simuler des erreurs pour observer le comportement de l’API.

Par exemple : tester ```GET /players``` avec Postman permet de s’assurer que la liste des joueurs est bien retournée avec un code ```200 OK```.

### Postman : Tester une API Express

Postman est un outil graphique très pratique pour tester les API. Il permet d’envoyer des requêtes HTTP, de visualiser les réponses et de vérifier que les endpoints fonctionnent correctement, **sans écrire de code**. C’est idéal pour découvrir le comportement d’une API avant de passer aux tests automatisés.

#### Installation et lancement

Téléchargez Postman : https://www.postman.com/downloads/ . Installez l’application et créez un compte gratuit (facultatif). Enfin, lancez Postman et vous arrivez sur l’interface principale pour créer des requêtes.

#### Créer une requête GET

1. Cliquez sur "**New**" → **Request**.

2. Nommez bien la requête, par exemple ```Liste des joueurs```.

3. Dans le champ URL, entrez l’endpoint de l’API :
```bash
http://localhost:3000/players
```

4. Sélectionnez la méthode ```GET```.

5. Cliquez sur **Send**.

Vous devriez voir une réponse JSON contenant la liste des joueurs et un code HTTP ```200 OK```.

#### Tester une requête POST

Pour ajouter un joueur :

1. Créez une nouvelle requête ```POST```.

2. Entrez l’URL :
```bash
http://localhost:3000/players
```

3. Dans l’onglet **Body**, sélectionnez **raw** et **JSON**.

4. Saisissez le JSON de la requête, par exemple :
```json
{
  "name": "Ash"
}
```

2. Cliquez sur `**Send**`.

Vous devriez recevoir une réponse avec le joueur créé et un code HTTP ```201 Created```.

#### Tester des erreurs

Vous pouvez tester des cas d’erreur, par exemple :
- ```POST``` sans champ ```name``` → doit retourner ```400 Bad Request```.
- ```GET``` sur un endpoint inexistant (```/players/999```) → doit retourner ```404 Not Found```.
L’objectif est de **comprendre la gestion des erreurs** et que l’API respecte ses codes HTTP.

#### Organiser ses requêtes avec des collections

Postman permet de **regrouper plusieurs requêtes** dans une collection.
Par exemple, créez une collection **Rogue-API** et ajoutez :
- ```GET /players```
- ```POST /players```
- ```GET /games```
- ```POST /games```
Cela rend les tests plus **faciles à gérer et à réutiliser**.

#### Tests intégrés dans Postman

Postman permet d’ajouter des tests automatisés simples à vos requêtes, par exemple :
```js
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has a name field", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData[0]).to.have.property('name');
});
```
Ces tests s’exécutent à chaque envoi de requête. Vous pouvez les voir dans l’onglet **Tests** et Postman vous indiquera si la requête est conforme

### Insomnia : Tester une API Express

Insomnia est un client HTTP léger et très intuitif pour tester des APIs. Il permet d’envoyer rapidement des requêtes, d’examiner les réponses et de valider le comportement d’une API REST sans écrire de code. Son interface épurée en fait un excellent outil pour débuter et comprendre le fonctionnement des endpoints.

#### Installation et prise en main

Téléchargez Insomnia : https://insomnia.rest/download . Installez l’application et lancez-la. À l’ouverture, Insomnia propose de créer un **Workspace**, qui correspond à un projet de tests d’API.
Vous pouvez créer un workspace nommé par exemple Rogue API.

#### Créer une première requête GET

1. Cliquez sur **New Request**.

2. Donnez un nom à la requête, par exemple ```GET /players```.

3. Choisissez la méthode ```GET```.

4. Entrez l’URL de l’endpoint :
```bash
http://localhost:3000/players
```

5. Cliquez sur **Send**.

La réponse s’affiche à droite :
- le corps de la réponse (JSON),
- le code HTTP (ex. ```200 OK```),
- le temps de réponse.
Cela permet de vérifier rapidement que l’endpoint fonctionne correctement.

#### Tester une requête POST avec un body JSON

Pour ajouter un joueur :

1. Créez une nouvelle requête.

2. Sélectionnez la méthode ```POST```.

3. URL :
```bash
http://localhost:3000/players
```

4. Dans l’onglet **Body**, choisissez **JSON**.

5. Saisissez le contenu suivant :
```json
{
  "name": "Bob"
}
```

6. Cliquez sur **Send**.

Vous devriez recevoir :
- un code HTTP ```201 Created```,
- un objet JSON représentant le joueur créé.

#### Gérer les headers

Insomnia gère automatiquement le header ```Content-Type: application/json``` lorsque vous utilisez un body JSON.

Vous pouvez toutefois ajouter des headers manuellement dans l’onglet **Headers**, par exemple pour une API sécurisée :
```bash
Authorization: Bearer mon_token_jwt
```
Cela permet de tester des endpoints protégés.

#### Tester les erreurs et cas limites

Insomnia est très utile pour vérifier la robustesse de l’API :
- Envoyer un ```POST``` sans body → vérifier un ```400 Bad Request```.
- Appeler un endpoint inexistant → vérifier un ```404 Not Found```.
- Tester des données invalides → observer les messages d’erreur retournés.

Ces tests permettent de valider la **gestion des erreurs et des codes HTTP**.

#### Organiser les requêtes

Insomnia permet de :
- créer des dossiers (Players, Games, Auth, etc.) ;
- regrouper les requêtes par ressource REST ;
- dupliquer rapidement une requête pour tester plusieurs scénarios.

Cette organisation facilite la lecture et la réutilisation des tests.

## Tests automatisés avec Node.js

Pour automatiser les tests, on peut utiliser des bibliothèques comme **Jest** ou **Mocha** combinées avec **Supertest** pour simuler des requêtes HTTP :
```js
const request = require('supertest');
const app = require('../app'); // Votre app Express

describe('API Roguelite', () => {
  test('GET /players retourne une liste', async () => {
    const res = await request(app).get('/players');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /players crée un joueur', async () => {
    const res = await request(app)
      .post('/players')
      .send({ name: 'Ash' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Ash');
  });
});
```
- ```describe``` : groupe de tests.
- ```test``` : définition d’un test unitaire.
- ```expect``` : assertions sur le résultat.
- Supertest permet d’envoyer des requêtes HTTP **comme si vous étiez un client réel**.

### Tester une API Express avec Mocha et Supertest

Les tests automatisés permettent de vérifier que votre API fonctionne correctement **sans tester manuellement chaque endpoint**.
Avec **Mocha**, vous écrivez des scénarios de test, et avec **Supertest**, vous simulez des requêtes HTTP vers votre API Express, exactement comme le ferait un client réel.

#### Installation des dépendances

Installez Mocha et Supertest comme dépendances de développement :
```bash
npm install --save-dev mocha supertest
```

#### Préparer l’application pour les tests

Pour tester votre API, il est important que **Express exporte l’app sans lancer le serveur**.

```app.js``` :
```js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/players', (req, res) => {
  res.status(200).json([]);
});

module.exports = app;
```

```server.js``` :
```js
const app = require('./app');

app.listen(3000, () => {
  console.log('Serveur lancé sur le port 3000');
});
```

Cette séparation est **essentielle** pour permettre à Supertest de fonctionner.

#### Créer la structure de tests

Créez un dossier ```test/``` à la racine du projet :
```js
test/
└── players.test.js
```
Mocha détecte automatiquement les fichiers dans ce dossier.

#### Écrire un premier test GET

Dans ```test/players.test.js``` :
```js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('API Players', () => {

  it('GET /players doit retourner un tableau', async () => {
    const res = await request(app).get('/players');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

});
```
- ```describe``` : regroupe des tests liés à une fonctionnalité.
- ```it``` : décrit un scénario précis.
- ```request(app)``` : envoie une requête HTTP vers l’API Express.
- ```expect``` : vérifie le résultat (statut, contenu, structure).

#### Tester une requête POST

Pour tester la création d’un joueur par exemple :
```js
it('POST /players doit créer un joueur', async () => {
  const res = await request(app)
    .post('/players')
    .send({ name: 'Ash' });

  expect(res.status).to.equal(201);
  expect(res.body).to.have.property('name', 'Ash');
});
```
Supertest simule ici :
- un body JSON,
- un appel POST réel,
- une réponse HTTP complète.

#### Tester les erreurs

Il est important de tester les cas invalides :
```js
it('POST /players sans nom doit retourner 400', async () => {
  const res = await request(app)
    .post('/players')
    .send({});

  expect(res.status).to.equal(400);
});
```
Ces tests garantissent que l’API **gère correctement les erreurs**.

#### Lancer les 

Ajoutez ce script dans package.json :
```js
"scripts": {
  "test": "mocha"
}
```

Puis lancez :
```bash
npm test
```

Mocha affiche :
- les tests réussis,
- les erreurs éventuelles,
- le temps d’exécution.

## Pratique

Mettez en place des test automatisé sur votre Rogue API avec Mocha et Supertest.

---

© Vincent Chiofalo