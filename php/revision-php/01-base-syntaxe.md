# Révision PHP — Syntaxe de base

## Variables

```php
<?php
$nom = "Alice";
$age = 25;
$prix = 19.99;
$estActif = true;
?>
```

⚠️ À retenir
- Toujours commencer par $
- Typage dynamique
- Sensible à la casse ($nom ≠ $Nom)

## Concaténation

```php
<?php
$prenom = "Alice";
echo "Bonjour " . $prenom;
?>
```

## Conditions

### if / else

```php
<?php
$age = 18;

if ($age >= 18) {
    echo "Majeur";
} else {
    echo "Mineur";
}
?>
```

### if/ elseif / else

```php
<?php
$note = 15;

if ($note >= 16) {
    echo "Très bien";
} elseif ($note >= 10) {
    echo "Passable";
} else {
    echo "Insuffisant";
}
?>
```

### Opérateurs de comparaison

```php
==   // égal
===  // égal + même type
!=   // différent
!==  // différent ou type différent
> < >= <=
```

### Opérateurs logiques

```php
&&  // ET
||  // OU
!   // NON
```

## Boucles

### while

```php
<?php
$i = 0;

while ($i < 5) {
    echo $i;
    $i++;
}
?>
```

### for

```php
<?php
for ($i = 0; $i < 5; $i++) {
    echo $i;
}
?>
```

### foreach

```php
<?php
$fruits = ["pomme", "banane", "orange"];

foreach ($fruits as $fruit) {
    echo $fruit;
}
?>
```

### foreach avec clé

```php
<?php
$users = [
    "Alice" => 25,
    "Bob" => 30
];

foreach ($users as $nom => $age) {
    echo $nom . " a " . $age . " ans";
}
?>
```

## Tableaux

```php
<?php
$fruits = ["pomme", "banane", "orange"];
echo $fruits[0]; // pomme
?>
```

## Bonnes pratiques rapides

✅ Toujours initialiser les variables
✅ Indenter correctement le code
✅ Utiliser === plutôt que == quand possible
✅ Éviter le mélange PHP/HTML désorganisé