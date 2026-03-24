# PHP POO — Requêtes SQL avec PDO

👉 On part de :
- une classe Database
- une classe UserModel (ou autre modèle)

## SELECT

```php
class UserModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllUsers() {
        $stmt = $this->pdo->query("SELECT * FROM users");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
```

💡 Explication
- ```query()``` → exécute directement une requête
- ```fetchAll()``` → récupère tous les résultats

## INSERT

```php
public function createUser($nom, $email) {
    $sql = "INSERT INTO users (nom, email) VALUES (:nom, :email)";
    
    $stmt = $this->pdo->prepare($sql);
    
    $stmt->execute([
        ':nom' => $nom,
        ':email' => $email
    ]);
}
```

💡 Important
👉 Utilisation de requête préparée (sécurité)

## UPDATE

```php
public function updateUser($id, $nom, $email) {
    $sql = "UPDATE users SET nom = :nom, email = :email WHERE id = :id";

    $stmt = $this->pdo->prepare($sql);

    $stmt->execute([
        ':id' => $id,
        ':nom' => $nom,
        ':email' => $email
    ]);
}
```

## DELETE

```php
public function deleteUser($id) {
    $sql = "DELETE FROM users WHERE id = :id";

    $stmt = $this->pdo->prepare($sql);

    $stmt->execute([
        ':id' => $id
    ]);
}
```

## Requêtes préparées

❌ Mauvaise pratique (danger)

```php
$id = $_GET['id'];
$this->pdo->query("DELETE FROM users WHERE id = $id");
```

⚠️ Vulnérable aux injections SQL

✅ Bonne pratique

```php
$stmt = $this->pdo->prepare("DELETE FROM users WHERE id = :id");
$stmt->execute([':id' => $id]);
```

💡 Pourquoi c’est sécurisé ?
- Les données sont séparées de la requête SQL
- Impossible d’injecter du code SQL malveillant

## SELECT avec condition

```php
public function getUserById($id) {
    $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = :id");
    
    $stmt->execute([':id' => $id]);
    
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
```

## Organisation typique

```
/models/UserModel.php
```

👉 Toutes les requêtes SQL sont ici
👉 Pas dans les contrôleurs ou vues

🧠 Résumé rapide

| Action | Méthode PDO           |
| ------ | --------------------- |
| SELECT | query() / prepare()   |
| INSERT | prepare() + execute() |
| UPDATE | prepare() + execute() |
| DELETE | prepare() + execute() |
