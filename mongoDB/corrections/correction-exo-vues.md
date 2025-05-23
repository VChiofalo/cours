# Corrections exercices vues

## Read-Only View *produits_en_stock*

```js
db.createView("produits_en_stock", "products", [
  { $match: { stock: { $gt: 0 } } },
  {
    $project: {
      name: 1,
      price: 1,
      stock: 1,
      category: 1,
      _id: 0
    }
  }
])
```

## Read-Only View *commandes_payées*

```js
db.createView("commandes_payees", "orders", [
  { $match: { status: "paid" } },
  {
    $project: {
      userId: 1,
      total: 1,
      status: 1,
      createdAt: 1,
      _id: 0
    }
  }
])
```

```js
db.produits_en_stock.find().pretty()
```

## Materialized View *top_clients*

```js
const topClients = db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      totalDepensé: { $sum: "$total" },
      commandes: { $sum: 1 }
    }
  },
  { $sort: { totalDepensé: -1 } },
  { $limit: 5 }
]).toArray();

db.top_clients.insertMany(topClients);
```

```js
db.top_clients.find().pretty()
```

<!-- ## Bonus - Automatisation (concept) -->