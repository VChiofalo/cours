# Correction exercices queries

## Niveau 1

- Listez tous les produits disponibles (stock > 0).
```js
db.products.find({ stock: { $gt: 0 } })
```

- Affichez les commandes dont le statut est *"paid"*.
```js
db.orders.find({ status: { $eq: "paid" } })
```
ou
```js
db.orders.find({ status: "paid" })
```

- Affichez les produits dont le prix est strictement supérieur à 100€.
```js
db.products.find({ price: { $gt: 100 } })
```

- Affichez les produits dont le prix est inférieur à 20€.
```js
db.products.find({ price: { $lt: 20 } })
```

- Affichez les commandes dont le statut est "*paid"* et/ou *"shipped"*.
```js
db.orders.find({ status: { $in: ["paid", "shipped"] } })
```

- Listez les produits qui ont un *stock supérieur à 10* et un *prix inférieur à 50€*.
```js
db.products.find({
  $and: [
    { stock: { $gt: 10 } },
    { price: { $lt: 50 } }
  ]
})
```

- Listez les utilisateurs qui sont administrateurs ou qui ont un email se terminant par @gmail.com.
```js
db.users.find({
  $or: [
    { isAdmin: true },
    { email: /@gmail\.com$/ }
  ]
})
```

## Niveau 2

- Trouvez tous les produits qui ont un stock entre 10 et 50 unités et un prix entre 20€ et 150€.
```js
db.products.find({
  $and: [
    { stock: { $gte: 10, $lte: 50 } },
    { price: { $gte: 20, $lte: 150 } }
  ]
})
```

- Affichez toutes les commandes dont le total est supérieur à 300€ et le statut est *"paid"* ou *"shipped"*.
```js
db.orders.find({
  total: { $gt: 300 },
  status: { $in: ["paid", "shipped"] }
})
```

- Listez les utilisateurs qui ne sont pas admin et ont un email contenant gmail.com.
```js
db.users.find({
  isAdmin: false,
  email: /gmail\.com/
})
```

- Récupèrez les produits dont la catégorie appartient à une liste spécifique d'_id (ex. catégories "Vêtements" ou "Livres"), en utilisant *$in*.
```js
const ids = [
  ObjectId("68307a086234a1f4a7ed3798"),
  ObjectId("68307a086234a1f4a7ed3795")
];

db.products.find({
  category: { $in: ids }
})
```

- Trouvez toutes les commandes dont la ville de livraison est "Palatine" et le statut est "paid".
```js
db.orders.find({
  $and: [
    { "address.city": "Palatine" },
    { status: "paid" }
  ]
})
```

- Trouvez tous les utilisateurs qui sont admin ou ont un compte créé il y a moins de 10 jours.
```js
const dateLimite = new Date();
dateLimite.setDate(dateLimite.getDate() - 10);

db.users.find({
  $or: [
    { isAdmin: true },
    { "createdAt.$date": { $gt: dateLimite.toISOString() } }
  ]
})
```
*Remplace "createdAt.$date" par "createdAt" si les dates sont déjà de vrais objets Date en base.*

## Niveau 3 (bonus)

- Jointure entre *orders* et *users* pour afficher :
    - l’email et le nom de l’utilisateur
    - le total et la date de la commande
```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "utilisateur"
    }
  },
  { $unwind: "$utilisateur" },
  {
    $project: {
      total: 1,
      createdAt: 1,
      "utilisateur.name": 1,
      "utilisateur.email": 1
    }
  }
])
```

- Affichez combien de commandes ont été *paid*, *shipped*, *pending*, etc.
```js
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      nbCommandes: { $sum: 1 }
    }
  }
])
```

- Calculez la somme des ventes (total) par jour (extraire la date depuis createdAt).
```js
db.orders.aggregate([
  {
    $project: {
      dateJour: {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
      },
      total: 1
    }
  },
  {
    $group: {
      _id: "$dateJour",
      totalVentes: { $sum: "$total" }
    }
  },
  { $sort: { _id: 1 } }
])
```

- Détaillez les produits vendus dans *orders.products* puis calculez combien de fois chaque produit a été commandé au total.
```js
db.orders.aggregate([
  { $unwind: "$products" },
  {
    $group: {
      _id: "$products.productId",
      totalCommandé: { $sum: "$products.quantity" }
    }
  },
  { $sort: { totalCommandé: -1 } },
  { $limit: 5 }
])
```