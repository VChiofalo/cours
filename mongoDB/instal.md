# Installation BDD Mongo DB

## Import BDD

```bash
mongoimport --db ecommerce --collection users --file users.json --jsonArray
mongoimport --db ecommerce --collection products --file products.json --jsonArray
mongoimport --db ecommerce --collection orders --file orders.json --jsonArray
mongoimport --db ecommerce --collection categories --file categories.json --jsonArray
mongoimport --db ecommerce --collection reviews --file reviews.json --jsonArray
```

## Lancer le Mongo Shell

```bash
mongosh
```

## Sélectionner la base

```js
use ecommerce
```