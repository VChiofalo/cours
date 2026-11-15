# Corrections – Partie 1 : Découvrir une base de données relationnelle

---

## Niveau 1 : Installation et import

Pas de correction à proprement parler. Points de vigilance :

- **Icône orange** : le port 80 est généralement occupé (Skype, IIS, un autre serveur web). Fermer le logiciel concerné, puis **Redémarrer les services**.
- **Paquets Visual C++ manquants** : l'installateur de WampServer le signale ; les installer avant de relancer.
- **Erreur `#1273 - Unknown collation: 'utf8mb4_0900_ai_ci'`** à l'import : l'élève est connecté à **MariaDB**. Se déconnecter et choisir **MySQL**.
- **Erreur `#1050 - Table 'student' already exists`** : la base a déjà été importée. Supprimer la base `scholar`, puis recommencer.
- **Import lancé depuis une autre base sélectionnée** : sans gravité, car le script contient `CREATE DATABASE IF NOT EXISTS scholar;` puis `USE scholar;`. La base est bien créée.

---

## Niveau 2 : Explorer la base avec phpMyAdmin

**Nombre de lignes par table**

| Table | Lignes |
|---|---|
| `student` | 42 |
| `department` | 5 |
| `subject` | 8 |
| `student_department` | 41 |
| `note` | 104 |

> Le nombre affiché dans la liste des tables de la base est parfois une **estimation** pour les tables InnoDB (précédé de `~`). Le nombre exact apparaît dans l'onglet **Parcourir** (« total de … »).

**Colonnes de `student` qui acceptent `NULL`**

`average_grade`, `email`, `phone_number`.

Toutes les autres (`student_id`, `first_name`, `last_name`, `birth_date`, `city`) sont `NOT NULL`.

**Clé primaire de chaque table**

| Table | Clé primaire |
|---|---|
| `student` | `student_id` |
| `department` | `department_id` |
| `subject` | `subject_id` |
| `note` | `note_id` |
| `student_department` | `student_id` **et** `department_id` (clé primaire **composée** de deux colonnes) |

Pour `student_department`, la petite clé apparaît sur les deux colonnes : c'est le **couple** élève / département qui doit être unique. Un élève ne peut pas être inscrit deux fois dans le même département, mais peut l'être dans plusieurs départements différents. Notion qui sera approfondie en partie 4.

**Clés étrangères**

| Table | Colonne | Pointe vers |
|---|---|---|
| `note` | `student_id` | `student.student_id` |
| `note` | `subject_id` | `subject.subject_id` |
| `subject` | `department_id` | `department.department_id` |
| `student_department` | `student_id` | `student.student_id` |
| `student_department` | `department_id` | `department.department_id` |

La vue relationnelle affiche aussi les options `ON DELETE` (ici `CASCADE`) et `ON UPDATE`. Inutile de les expliquer à ce stade : elles seront vues en partie 7.

**Concepteur**

Le schéma attendu correspond à l'image `schema-scholar.png` de la partie 1.A : `student` et `department` reliées par `student_department`, `note` reliée à `student` et `subject`, `subject` reliée à `department`.

---

## Niveau 3 : Premières requêtes

- Afficher la liste des tables de la base.
```sql
SHOW TABLES;
```

- Afficher la structure de la table `note`.
```sql
DESCRIBE note;
```

- Afficher toutes les données de la table `department`.
```sql
SELECT *
FROM department;
```

- Afficher toutes les données de la table `subject`.
```sql
SELECT *
FROM subject;
```

- Afficher le prénom, le nom et l'email de tous les élèves.
```sql
SELECT first_name, last_name, email
FROM student;
```

- Afficher la ville, le nom et le prénom de tous les élèves, dans cet ordre.
```sql
SELECT city, last_name, first_name
FROM student;
```

- Afficher le nom de toutes les matières, ainsi que le numéro de leur département.
```sql
SELECT subject_name, department_id
FROM subject;
```

- Afficher le numéro de l'élève, le numéro de la matière et la valeur de toutes les notes.
```sql
SELECT student_id, subject_id, grade
FROM note;
```

---

## Niveau 4 : Corriger les requêtes

1. **Virgule en trop avant `FROM`.**
   Erreur : `#1064 - You have an error in your SQL syntax; […] near 'FROM student' at line 2`
   Le message `#1064` signale une erreur de syntaxe, et `near` indique **où** MySQL s'est arrêté : l'erreur se trouve juste avant.
```sql
SELECT first_name, last_name
FROM student;
```

2. **Nom de colonne mal orthographié.**
   Erreur : `#1054 - Unknown column 'firstname' in 'field list'`
```sql
SELECT first_name
FROM student;
```

3. **Nom de table mal orthographié** (pluriel).
   Erreur : `#1146 - Table 'scholar.students' doesn't exist`
```sql
SELECT *
FROM student;
```

4. **Faute de frappe sur un mot-clé** (`FORM` au lieu de `FROM`).
   Erreur : `#1064 - You have an error in your SQL syntax; […] near 'FORM department'`
```sql
SELECT *
FROM department;
```

5. **Virgule oubliée entre deux colonnes.**
   **Aucune erreur** : MySQL affiche une seule colonne, qui contient les **prénoms** mais porte le titre `last_name`. Il a compris `first_name` renommée en `last_name` (un **alias**). C'est l'erreur la plus piégeuse : le résultat a l'air valide.
```sql
SELECT first_name, last_name
FROM student;
```

6. **Virgule en trop avant `FROM`.** Les backticks autour de `department_id` et `subject` sont corrects (et facultatifs) : ce n'est pas eux le problème.
   Erreur : `#1064 […] near 'FROM `subject`'`
```sql
SELECT subject_name, department_id
FROM subject;
```

7. **Apostrophes au lieu de backticks autour du nom de table.** `'student'` est une **valeur** texte, pas un nom de table. Les backticks autour de `city` sont corrects.
   Erreur : `#1064 […] near ''student''`
```sql
SELECT last_name, city
FROM student;
```

> Selon la configuration de MySQL, les messages peuvent aussi s'afficher en français (`Champ 'firstname' inconnu dans field list`, `La table 'scholar.students' n'existe pas`…). Les codes d'erreur (`#1054`, `#1064`, `#1146`) restent les mêmes.

---

## Niveau 5 : Sauvegarder et repartir de zéro

**Export** : différences attendues entre le fichier exporté et `scholar.sql` d'origine :

- un **en-tête** de commentaires : version de phpMyAdmin, de MySQL, date de génération, nom de l'hôte ;
- des instructions de configuration en début et en fin de fichier (`SET SQL_MODE`, `START TRANSACTION`, `SET time_zone`, `COMMIT`…) ;
- **pas de `CREATE DATABASE`** par défaut : le fichier exporté recrée les tables, mais il faudra créer ou sélectionner la base avant de l'importer ;
- les noms de tables et de colonnes entourés de **backticks** ;
- les **clés primaires** et les **clés étrangères** ne sont pas dans les `CREATE TABLE` : elles sont ajoutées à la fin, dans des sections `Index pour les tables déchargées` et `Contraintes pour les tables déchargées`, avec des `ALTER TABLE` ;
- l'`AUTO_INCREMENT` est lui aussi ajouté par un `ALTER TABLE`, avec la **prochaine valeur** à utiliser (`AUTO_INCREMENT=43` pour `student`) ;
- **pas de `SELECT`** final : l'export ne contient que la structure et les données.

Le contenu est pourtant équivalent : les deux fichiers recréent la même base, avec les mêmes données.

**Suppression** : onglet **Opérations** de la base, lien **Supprimer la base de données (DROP)**, puis confirmation. Équivalent en SQL :
```sql
DROP DATABASE scholar;
```

**Réimport** : coller tout le contenu de `scholar.sql` dans l'onglet **SQL** au niveau du serveur, puis **Exécuter**. Les 5 `SELECT` en fin de script s'exécutent aussi : selon la version, phpMyAdmin affiche le résultat du dernier ou de chacun d'eux.

**Vérification** :
```sql
SELECT *
FROM student;
```
Résultat : `total de 42`.
