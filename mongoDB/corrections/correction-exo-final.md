# Correction exercice création de base de donnée

## Création de la base et collections (dans mongosh)

```js
use libraryDB
```

## Insertion des documents

```js
// Auteurs
db.authors.insertMany([
  { name: "Isaac Asimov", birthDate: new Date("1920-01-02"), nationality: "Russe-Américain" },
  { name: "J.K. Rowling", birthDate: new Date("1965-07-31"), nationality: "Britannique" },
  { name: "J.R.R. Tolkien", birthDate: new Date("1892-01-03"), nationality: "Britannique" },
  { name: "Ursula K. Le Guin", birthDate: new Date("1929-10-21"), nationality: "Américaine" },
  { name: "Philip K. Dick", birthDate: new Date("1928-12-16"), nationality: "Américain" }
]);

// Récupérer un auteur pour référence (exemple)
const asimov = db.authors.findOne({ name: "Isaac Asimov" });
const rowling = db.authors.findOne({ name: "J.K. Rowling" });

// Livres
db.books.insertMany([
  { title: "Fondation", publicationDate: new Date("1951-06-01"), pages: 255, genres: ["Science Fiction"], authorId: asimov._id },
  { title: "Harry Potter à l'école des sorciers", publicationDate: new Date("1997-06-26"), pages: 320, genres: ["Fantastique", "Jeunesse"], authorId: rowling._id },
  { title: "Le Seigneur des anneaux", publicationDate: new Date("1954-07-29"), pages: 1178, genres: ["Fantastique"], authorId: db.authors.findOne({name: "J.R.R. Tolkien"})._id },
  { title: "La Main gauche de la nuit", publicationDate: new Date("1969-03-01"), pages: 304, genres: ["Science Fiction"], authorId: db.authors.findOne({name: "Ursula K. Le Guin"})._id },
  { title: "Ubik", publicationDate: new Date("1969-01-01"), pages: 215, genres: ["Science Fiction"], authorId: db.authors.findOne({name: "Philip K. Dick"})._id }
]);

// Utilisateurs
db.users.insertMany([
  { name: "Alice Martin", email: "alice@example.com", subscriptionActive: true },
  { name: "Bob Dupont", email: "bob@example.com", subscriptionActive: false },
  { name: "Caroline Bernard", email: "caroline@example.com", subscriptionActive: true },
  { name: "David Morel", email: "david@example.com", subscriptionActive: true },
  { name: "Eva Petit", email: "eva@example.com", subscriptionActive: false }
]);

// Emprunts
const alice = db.users.findOne({ name: "Alice Martin" });
const bob = db.users.findOne({ name: "Bob Dupont" });
const hpBook = db.books.findOne({ title: "Harry Potter à l'école des sorciers" });
const fondation = db.books.findOne({ title: "Fondation" });

db.borrowings.insertMany([
  { userId: alice._id, bookId: hpBook._id, borrowDate: new Date("2025-05-01"), returnDate: null, status: "borrowed" },
  { userId: bob._id, bookId: fondation._id, borrowDate: new Date("2025-04-15"), returnDate: new Date("2025-05-10"), status: "returned" },
  { userId: alice._id, bookId: fondation._id, borrowDate: new Date("2025-03-10"), returnDate: new Date("2025-04-10"), status: "returned" }
  // Ajoute d'autres emprunts si besoin
]);
```

## Création d'index

```js
db.books.createIndex({ authorId: 1 });
db.borrowings.createIndex({ userId: 1 });
db.borrowings.createIndex({ status: 1 });
```

## Requêtes MongoDB

### Tous les livres d’un auteur (exemple : Isaac Asimov)

```js
const asimov = db.authors.findOne({ name: "Isaac Asimov" });

db.books.find({ authorId: asimov._id }).pretty();
```

### Emprunts actifs (status = "borrowed")

```js
db.borrowings.find({ status: "borrowed" }).pretty();
```

### Utilisateurs avec abonnement actif

```js
db.users.find({ subscriptionActive: true }).pretty();
```

### Livres de genre "Science Fiction" ou "Fantastique"

```js
db.books.find({ genres: { $in: ["Science Fiction", "Fantastique"] } }).pretty()
```

## Création d’une vue pour livres empruntés avec nom utilisateur

```js
db.createView("borrowed_books_with_users", "borrowings", [
  { $match: { status: "borrowed" } },
  {
    $lookup: {
      from: "books",
      localField: "bookId",
      foreignField: "_id",
      as: "bookInfo"
    }
  },
  { $unwind: "$bookInfo" },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userInfo"
    }
  },
  { $unwind: "$userInfo" },
  {
    $project: {
      _id: 0,
      bookTitle: "$bookInfo.title",
      userName: "$userInfo.name",
      borrowDate: 1,
      status: 1
    }
  }
]);
```

## Bonus : nombre de livres empruntés par utilisateur

```js
db.borrowings.aggregate([
  { $match: { status: "borrowed" } },
  {
    $group: {
      _id: "$userId",
      totalBorrowed: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "userInfo"
    }
  },
  { $unwind: "$userInfo" },
  {
    $project: {
      _id: 0,
      userName: "$userInfo.name",
      totalBorrowed: 1
    }
  }
]).pretty();
```