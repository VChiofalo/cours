# Révision PHP — Programmation Orientée Objet (POO)

## Définir une classe

```php
<?php
class User {
    public $nom;
    public $email;
}
?>
```

## Créer un Objet

```php
<?php
$user = new User();

$user->nom = "Alice";
$user->email = "alice@mail.com";

echo $user->nom;
?>
```

## Constructeur (```__construct```)

Appelé automatiquement à la création de l’objet

```php
<?php
class User {
    public $nom;
    public $email;

    public function __construct($nom, $email) {
        $this->nom = $nom;
        $this->email = $email;
    }
}

$user = new User("Alice", "alice@mail.com");
?>
```

## Méthodes

```php
<?php
class User {
    public $nom;

    public function direBonjour() {
        return "Bonjour " . $this->nom;
    }
}

$user = new User();
$user->nom = "Alice";

echo $user->direBonjour();
?>
```

## Visibilité

```php
<?php
class User {
    public $nom;        // accessible partout
    private $email;     // seulement dans la classe
    protected $age;     // classe + héritage
}
?>
```

## Getters / Setters

```php
<?php
class User {
    private $email;

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getEmail() {
        return $this->email;
    }
}

$user = new User();
$user->setEmail("test@mail.com");

echo $user->getEmail();
?>
```

## Héritage

```php
<?php
class Personne {
    public $nom;
}

class User extends Personne {
    public $email;
}

$user = new User();
$user->nom = "Alice";
?>
```

## Exemple concret

```php
<?php
class User {
    private $id;
    private $nom;
    private $email;

    public function __construct($nom, $email) {
        $this->nom = $nom;
        $this->email = $email;
    }

    public function getNom() {
        return $this->nom;
    }
}
?>
```

## Connexion PDO en POO

Classe dédiée (bonne pratique)

```php
<?php
class Database {
    private $host = "localhost";
    private $db = "test";
    private $user = "root";
    private $pass = "";

    public function connect() {
        return new PDO(
            "mysql:host=$this->host;dbname=$this->db",
            $this->user,
            $this->pass
        );
    }
}
?>
```

## Exemple CRUD simplifié

```php
<?php
class UserModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM users");
        return $stmt->fetchAll();
    }
}
?>
```

## Bonnes pratiques essentielles

✅ Une classe = une responsabilité
✅ Ne pas mélanger HTML et logique
✅ Utiliser PDO + requêtes préparées
✅ Protéger les données (XSS, SQL)
✅ Nommer clairement les classes

## Les erreurs fréquentes

🚨 Confondre objet et tableau
🚨 Oublier ```$this```
🚨 Tout mettre en ```public```
🚨 Mélanger logique + affichage
🚨 Ne pas structurer les fichiers