# Révision PHP — Fonctions, Inclusion, Superglobales

## Fonctions

### Déclaration simple

```php
<?php
function direBonjour() {
    echo "Bonjour !";
}

direBonjour();
?>
```

### Fonction avec paramètres

```php
<?php
function direBonjour($prenom) {
    echo "Bonjour " . $prenom;
}

direBonjour("Alice");
?>
```

### Fonction avec retour (return)

```php
<?php
function addition($a, $b) {
    return $a + $b;
}

$resultat = addition(2, 3);
echo $resultat;
?>
```

### Typage (PHP moderne)

```php
<?php
function addition(int $a, int $b): int {
    return $a + $b;
}
?>
```

⚠️ À retenir
- ```return``` arrête la fonction
- Les paramètres peuvent avoir des types
- Une fonction = bloc réutilisable

## Inclusion de fichiers

Permet de séparer le code (très important en projet)

### include

```php
<?php
include 'header.php';
?>
```

- Inclut le fichier
- ⚠️ Continue même en cas d’erreur

### require

```php
<?php
require 'config.php';
?>
```

- Inclut le fichier
- ❌ Stoppe le script si erreur

### include_once / require_once

```php
<?php
require_once 'config.php';
?>
```

- Évite les inclusions multiples

💡 Bon usage
- ```require``` → fichiers critiques (config, connexion DB)
- ```include``` → éléments secondaires (header, footer)

## Superglobales

Variables spéciales accessibles partout

### $_GET (données URL)

URL :
```
page.php?nom=Alice&age=25
```
PHP :
```php
<?php
echo $_GET['nom']; // Alice
echo $_GET['age']; // 25
?>
```

⚠️ Vérification obligatoire

```php
<?php
if (isset($_GET['nom'])) {
    echo $_GET['nom'];
}
?>
```

### $_POST (formulaire)

HTML :
```html
<form method="POST" action="traitement.php">
    <input type="text" name="nom">
    <button type="submit">Envoyer</button>
</form>
```
PHP :
```php
<?php
echo $_POST['nom'];
?>
```

⚠️ Vérification + sécurité

```php
<?php
if (isset($_POST['nom'])) {
    $nom = htmlspecialchars($_POST['nom']);
    echo $nom;
}
?>
```

### Différence GET vs POST

| GET                  | POST               |
| -------------------- | ------------------ |
| Visible dans l’URL   | Caché              |
| Limité en taille     | Plus de données    |
| Moins sécurisé       | Plus sécurisé      |
| Utilisé pour lecture | Utilisé pour envoi |
