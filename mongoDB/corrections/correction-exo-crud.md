# Corrections exercices CRUD

## Niveau 1

### Read - Lecture simple

- Trouver tous les utilisateurs.
```js
db.users.find()
```

- Trouver toutes les catégories.
```js
db.categories.find()
```

- Trouver tous les produits avec un stock supérieur à 50.
```js
db.products.find({ "stock": { $gt: 50 } })
```

- Trouver toutes les commandes dont le statut est *pending*.
```js
db.orders.find({ "status": "pending" })
```

- Trouver toutes les critiques (*reviews*) d’un produit donné (par exemple avec un _id connu).
```js
db.reviews.find({ productId: ObjectId("PRODUCT_ID") })
```

### Read - Recherche avancée et projection

- Trouver les produits dont le prix est compris entre 20 et 100 euros, afficher uniquement *name*, *price* et *stock*.
```js
db.products.find(
  { price: { $gte: 20, $lte: 100 } },
  { name: 1, price: 1, stock: 1, _id: 0 }
)
```

- Trouver les commandes effectuées par un utilisateur donné (utilise un *_id* de user).
```js
db.orders.find({ userId: ObjectId("USER_ID") })
```

- Trouver les reviews où la note est supérieure ou égale à 4, affiche seulement le *comment* et la *rating*.
```js
db.reviews.find(
  { rating: { $gte: 4 } },
  { comment: 1, rating: 1, _id: 0 }
)
```
- Trouver les utilisateurs qui sont admins (*isAdmin: true*), afficher leur *name* et *email* uniquement.
```js
db.users.find(
  { isAdmin: true },
  { name: 1, email: 1, _id: 0 }
)
```

### Create - Insertion

- Ajouter un nouvel utilisateur avec un nom, email, mot de passe hashé, et la date de création (aujourd’hui).
```js
db.users.insertOne({
  _id: ObjectId(), 
  name: "Jean Dupont",
  email: "jean.dupont@example.com",
  passwordHash: "hashedpwd123",
  isAdmin: false,
  createdAt: new Date()
})
```

- Ajouter une nouvelle catégorie (exemple : “Jouets”).
```js
db.categories.insertOne({
  _id: ObjectId(),
  name: "Jouets"
})
```

- Ajouter un nouveau produit dans la catégorie “Jouets” avec un stock de 100.
```js
db.products.insertOne({
  _id: ObjectId(),
  name: "Super Robot",
  description: "Robot télécommandé pour enfants",
  price: 49.99,
  stock: 100,
  category: ObjectId("JOUEURS_ID"),
  images: ["http://example.com/robot.jpg"],
  createdAt: new Date()
})
```

- Ajouter une nouvelle commande pour un utilisateur avec au moins un produit et un total calculé.
```js
db.orders.insertOne({
  _id: ObjectId(),
  userId: ObjectId("USER_ID"),
  products: [
    { productId: ObjectId("PRODUCT_ID"), quantity: 2 }
  ],
  total: 99.98,
  status: "pending",
  createdAt: new Date(),
  address: {
    street: "10 rue de Paris",
    city: "Paris",
    postalCode: "75000",
    country: "France"
  }
})
```

- Ajouter une review pour un produit existant par un utilisateur existant.
```js
db.reviews.insertOne({
  _id: ObjectId(),
  productId: ObjectId("PRODUCT_ID"),
  userId: ObjectId("USER_ID"),
  rating: 5,
  comment: "Super produit, je recommande !",
  createdAt: new Date()
})
```

### Update - Modification partielle

- Mettre à jour le stock d’un produit (par exemple diminuer de 10 unités).
```js
db.products.updateOne(
  { _id: ObjectId("PRODUCT_ID") },
  { $inc: { stock: -10 } }
)
```

- Modifier le statut d’une commande (par exemple passer de *pending* à *shipped*).
```js
db.orders.updateOne(
  { _id: ObjectId("ORDER_ID") },
  { $set: { status: "shipped" } }
)
```

- Mettre à jour l’email d’un utilisateur.
```js
db.users.updateOne(
  { _id: ObjectId("USER_ID") },
  { $set: { email: "nouvel.email@example.com" } }
)
```

- Ajouter un champ *discount* dans un produit (par exemple 10%).
```js
db.products.updateOne(
  { _id: ObjectId("PRODUCT_ID") },
  { $set: { discount: 10 } }
)
```

- Mettre à jour la note et le commentaire d’une *review* existante.
```js
db.reviews.updateOne(
  { _id: ObjectId("REVIEW_ID") },
  { $set: { rating: 4, comment: "Bon produit, mais pourrait être amélioré." } }
)
```

### Update - Remplacement complet

- Remplacer une catégorie entière par une nouvelle, par exemple changer le nom de “Livres” en “Littérature”.
```js
db.categories.replaceOne(
  { _id: ObjectId("CATEGORY_ID") },
  {
    _id: ObjectId("CATEGORY_ID"),
    name: "Littérature"
  }
)
```
- Remplacer entièrement une *review* (avec un nouveau commentaire, rating, etc.).
```js
db.reviews.replaceOne(
  { _id: ObjectId("REVIEW_ID") },
  {
    _id: ObjectId("REVIEW_ID"),
    productId: ObjectId("PRODUCT_ID"),
    userId: ObjectId("USER_ID"),
    rating: 3,
    comment: "Changement complet du commentaire.",
    createdAt: new Date()
  }
)
```

### Delete - Suppression

- Supprimer une catégorie “Beauté”.
```js
db.categories.deleteOne({ name: "Beauté" })
```

- Supprimer un produit avec un stock à zéro.
```js
db.products.deleteOne({ stock: 0 })
```

- Supprimer toutes les commandes dont le statut est *pending*.
```js
db.orders.deleteMany({ status: "pending" })
```

- Supprimer toutes les reviews d’un utilisateur spécifique.
```js
db.reviews.deleteMany({ userId: ObjectId("USER_ID") })
```
- Supprimer un utilisateur spécifique.
```js
db.users.deleteOne({ _id: ObjectId("USER_ID") })
```

### Bonus - Opérations combinées

- Trouver tous les produits d'une' catégorie et augmenter leur prix de 5%.
```js
db.products.updateMany(
  { category: ObjectId("ELECTRONIQUE_ID") },
  [
    { $set: { price: { $multiply: ["$price", 1.05] } } }
  ]
)
```

- Trouver toutes les commandes d’un utilisateur donné et changer leur statut à “paid”.
```js
db.orders.updateMany(
  { userId: ObjectId("USER_ID") },
  { $set: { status: "paid" } }
)
```

- Supprimer toutes les reviews ayant une note inférieure à 3.
```js
db.reviews.deleteMany({ rating: { $lt: 3 } })
```

## Niveau 2

### Création avec références multiples

**Consigne** : Créer une nouvelle commande pour un utilisateur donné (USER_ID), contenant 2 produits différents (PRODUCT_ID1 et PRODUCT_ID2) avec des quantités respectives 3 et 1. Calcule le total en additionnant prix * quantité des produits. Mets le statut à "pending" et remplis une adresse factice.
```js
const product1 = db.products.findOne({ _id: ObjectId("PRODUCT_ID1") });
const product2 = db.products.findOne({ _id: ObjectId("PRODUCT_ID2") });

const total = (product1.price * 3) + (product2.price * 1);

db.orders.insertOne({
  _id: ObjectId(),
  userId: ObjectId("USER_ID"),
  products: [
    { productId: ObjectId("PRODUCT_ID1"), quantity: 3 },
    { productId: ObjectId("PRODUCT_ID2"), quantity: 1 }
  ],
  total: total,
  status: "pending",
  createdAt: new Date(),
  address: {
    street: "12 rue de l'Exemple",
    city: "Paris",
    postalCode: "75000",
    country: "France"
  }
})
```

### Mise à jour conditionnelle multiple

**Consigne** : Pour tous les produits dans la catégorie “Électronique” (CATEGORY_ID à remplacer), augmenter le prix de 15% uniquement pour les produits dont le stock est supérieur à 10.
```js
db.products.updateMany(
  {
    category: ObjectId("CATEGORY_ID"),
    stock: { $gt: 10 }
  },
  [
    { $set: { price: { $multiply: ["$price", 1.15] } } }
  ]
)
```

### Ajout d’un élément dans un tableau

**Consigne** : Ajouter une nouvelle image URL "http://example.com/newimage.jpg" à la liste des images d’un produit (PRODUCT_ID).
```js
db.products.updateOne(
  { _id: ObjectId("PRODUCT_ID") },
  { $push: { images: "http://example.com/newimage.jpg" } }
)
```

### Suppression d’un élément dans un tableau

**Consigne** : Supprimer toutes les commandes de l’utilisateur (USER_ID) où le statut est "pending".
```js
db.orders.deleteMany({
  userId: ObjectId("USER_ID"),
  status: "pending"
})
```

### Mise à jour d’un élément dans un tableau d’objets

**Consigne** : Dans une commande (ORDER_ID), modifier la quantité du produit PRODUCT_ID à 5 (dans le tableau products).
```js
db.orders.updateOne(
  { _id: ObjectId("ORDER_ID"), "products.productId": ObjectId("PRODUCT_ID") },
  { $set: { "products.$.quantity": 5 } }
)
```

### Remplacement complet d’un document

**Consigne** : Remplacer entièrement une catégorie (CATEGORY_ID) par une nouvelle catégorie nommée "Sport".
```js
db.categories.replaceOne(
  { _id: ObjectId("CATEGORY_ID") },
  {
    _id: ObjectId("CATEGORY_ID"),
    name: "Sport"
  }
)
```

### Suppression conditionnelle multiple

**Consigne** : Supprimer toutes les reviews dont la note est inférieure à 3.
```js
db.reviews.deleteMany({ rating: { $lt: 3 } })
```

### Mise à jour avec agrégation et date actuelle

**Consigne** : Pour un produit (PRODUCT_ID), modifier sa catégorie à CATEGORY_ID et mettre à jour la date de création createdAt à la date et heure actuelle.
```js
db.products.updateOne(
  { _id: ObjectId("PRODUCT_ID") },
  [
    { $set: { category: ObjectId("CATEGORY_ID"), createdAt: "$$NOW" } }
  ]
)
```

### Mise à jour incrémentale multiple

**Consigne** : Pour tous les utilisateurs qui ne sont pas admin (isAdmin: false), ajouter un champ loginCount initialisé à 0.
```js
db.users.updateMany(
  { isAdmin: false },
  { $set: { loginCount: 0 } }
)
```

### Suppression d’un champ

**Consigne** : Pour un produit (PRODUCT_ID), supprimer le champ discount s’il existe.
```js
db.products.updateOne(
  { _id: ObjectId("PRODUCT_ID") },
  { $unset: { discount: "" } }
)
```