# Exercices – Partie 1 : Découvrir une base de données relationnelle

Tous les exercices se font sur la base `scholar`, à partir du fichier `scholar.sql` fourni.

---

## Niveau 1 : Installation et import

- Installer WampServer et le démarrer. Attendre que l'icône de la barre des tâches soit verte.

- Se connecter à phpMyAdmin à l'adresse http://localhost/phpmyadmin, avec l'utilisateur `root`, sans mot de passe, sur le serveur **MySQL**.

- Importer la base `scholar` à partir du fichier `scholar.sql`, avec l'onglet **Importer**.

---

## Niveau 2 : Explorer la base avec phpMyAdmin

- Afficher le contenu de chacune des 5 tables de `scholar` avec l'onglet **Parcourir**, et relever le nombre de lignes de chaque table.

- Dans la structure de la table `student`, relever les colonnes qui acceptent la valeur `NULL`.

- Relever la clé primaire de chacune des 5 tables.

- Ouvrir la **vue relationnelle** de la table `note`, et relever vers quelle table et quelle colonne pointe chacune de ses clés étrangères.

- Faire de même pour les tables `subject` et `student_department`.

- Ouvrir le **Concepteur** de la base `scholar` et déplacer les tables pour obtenir un schéma lisible, où aucun lien ne passe sous une table.

---

## Niveau 3 : Premières requêtes

Pour chaque exercice, écrire la requête dans l'onglet **SQL**, après avoir sélectionné la base `scholar`.

- Afficher la liste des tables de la base.

- Afficher la structure de la table `note`.

- Afficher toutes les données de la table `department`.

- Afficher toutes les données de la table `subject`.

- Afficher le prénom, le nom et l'email de tous les élèves.

- Afficher la ville, le nom et le prénom de tous les élèves, dans cet ordre.

- Afficher le nom de toutes les matières, ainsi que le numéro de leur département.

- Afficher le numéro de l'élève, le numéro de la matière et la valeur de toutes les notes.

---

## Niveau 4 : Corriger les requêtes

Chacune des requêtes suivantes contient une erreur. Pour chacune : l'exécuter, lire le résultat ou le message d'erreur, puis la corriger.

1. Afficher le prénom et le nom des élèves :
```sql
SELECT first_name, last_name,
FROM student;
```

2. Afficher le prénom des élèves :
```sql
SELECT firstname
FROM student;
```

3. Afficher toutes les données des élèves :
```sql
SELECT *
FROM students;
```

4. Afficher toutes les données des départements :
```sql
SELECT *
FORM department;
```

5. Afficher le prénom et le nom des élèves :
```sql
SELECT first_name last_name
FROM student;
```

6. Afficher le nom des matières et le numéro de leur département :
```sql
SELECT subject_name, `department_id`, 
FROM `subject`;
```

7. Afficher le nom et la ville des élèves :
```sql
SELECT last_name, `city`
FROM 'student';
```

---

## Niveau 5 : Sauvegarder et repartir de zéro

- Exporter la base `scholar` dans un fichier `.sql` avec l'onglet **Exporter**, en laissant les options par défaut. Ouvrir le fichier obtenu dans un éditeur de texte et le comparer au fichier `scholar.sql` d'origine.

- Supprimer la base `scholar` depuis l'onglet **Opérations**.

- Réimporter la base `scholar`, cette fois en copiant le contenu du fichier `scholar.sql` dans l'onglet **SQL**.

- Exécuter à nouveau `SELECT * FROM student;` pour vérifier que les 39 élèves sont bien de retour.
