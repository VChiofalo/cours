# Corrections – Partie 3 : Modifier les données

Les numéros indiqués (`student_id`, `department_id`, `subject_id`) supposent que l'élève est parti d'une base `scholar` **fraîchement importée** et a fait les exercices **dans l'ordre**, sans autre insertion. Un élève qui a fait des essais en plus aura des numéros décalés : c'est normal, l'`AUTO_INCREMENT` ne revient jamais en arrière.

Dans les corrections, l'élève qui « s'ajoute » s'appelle Jean Dupuis.

---

## Niveau 1 : Ajouter des lignes avec INSERT INTO

- Ajoutez-vous à la table des élèves.
```sql
INSERT INTO student (first_name, last_name, birth_date, email, phone_number, city)
VALUES ('Jean', 'Dupuis', '2003-05-14', 'jean.dupuis@mail.com', '0612345600', 'Paris');
```
Numéro attribué : **43**. Pas de `student_id` (`AUTO_INCREMENT`), pas d'`average_grade` (elle vaut `NULL` tant qu'il n'y a pas de note).

- Ajouter l'élève Emma Roux.
```sql
INSERT INTO student (first_name, last_name, birth_date, city)
VALUES ('Emma', 'Roux', '2005-02-01', 'Lyon');
```
Numéro **44**. On peut aussi écrire `email` et `phone_number` dans la liste des colonnes avec la valeur `NULL`.

- Ajouter trois élèves en une seule requête.
```sql
INSERT INTO student (first_name, last_name, birth_date, email, city)
VALUES ('Nathan', 'Blanc', '2004-07-12', 'nathan.blanc@mail.com', 'Toulouse'),
       ('Inès', 'Faure', '2003-10-30', NULL, 'Rennes'),
       ('Hugo', 'Perrin', '2005-03-08', 'hugo.perrin@mail.com', 'Paris');
```
`3 lignes insérées` : numéros **45**, **46** et **47**. Pièges :
  - les dates de l'énoncé sont au format français : il faut les convertir en `'AAAA-MM-JJ'` ;
  - Inès Faure n'a pas d'email : comme les trois lignes partagent la même liste de colonnes, il faut écrire `NULL` à sa place.

- Ajouter le département « Économie ».
```sql
INSERT INTO department (department_name)
VALUES ('Économie');
```
Numéro **6**.

- Ajouter les matières « Mécanique » et « Optique » au département Physique.
```sql
INSERT INTO subject (subject_name, department_id)
VALUES ('Mécanique', 5), ('Optique', 5);
```
Numéros **9** et **10**.

- Inscrire votre élève dans un département, à la date d'aujourd'hui.
```sql
INSERT INTO student_department (student_id, department_id, enrollment_date)
VALUES (43, 1, CURDATE());
```
`CURDATE()` (partie 2.B) donne la date du jour. Écrire la date en toutes lettres (`'2026-11-11'`) est tout aussi correct.

- Ajouter deux notes à votre élève.
```sql
INSERT INTO note (student_id, subject_id, grade, note_date)
VALUES (43, 1, 15.50, CURDATE()),
       (43, 2, 13.00, CURDATE());
```
Pour l'Informatique (n°1), les matières sont Programmation (n°1) et Réseaux (n°2). Les numéros de matière se trouvent avec `SELECT * FROM subject WHERE department_id = 1;`.

- Vérifier avec des jointures.
```sql
SELECT d.department_name, su.subject_name, n.grade, n.note_date
FROM student s
INNER JOIN student_department sd ON s.student_id = sd.student_id
INNER JOIN department d ON sd.department_id = d.department_id
INNER JOIN note n ON s.student_id = n.student_id
INNER JOIN subject su ON n.subject_id = su.subject_id
WHERE s.student_id = 43;
```
Résultat : 2 lignes, une par note. Si l'élève était inscrit dans deux départements, chaque note apparaîtrait deux fois (une fois par département).

---

## Niveau 2 : Lire et corriger les erreurs

1. **Colonne obligatoire oubliée.**
   Erreur : `#1364 - Field 'city' doesn't have a default value`
```sql
INSERT INTO student (first_name, last_name, birth_date, city)
VALUES ('Paul', 'Simon', '2004-06-10', 'Toulouse');
```
   L'énoncé ne donne pas la ville : il faut en choisir une, puisque `city` est `NOT NULL`. C'est l'occasion de souligner qu'une colonne obligatoire impose d'avoir l'information **avant** d'insérer.

2. **Clé étrangère vers une ligne inexistante** : il n'y a pas de matière n°15.
   Erreur : `#1452 - Cannot add or update a child row: a foreign key constraint fails (… FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) …)`
```sql
INSERT INTO note (student_id, subject_id, grade, note_date)
VALUES (1, 1, 14.00, '2026-11-10');
```
   Le message indique la colonne fautive (`subject_id`). Alice étant inscrite en Informatique, une matière n°1 ou n°2 est cohérente. MySQL accepterait n'importe quelle matière existante : vérifier que la matière correspond au département de l'élève n'est pas une contrainte de la base, mais une règle de gestion.

3. **Doublon sur la clé primaire composée** : Claire Lemoine est déjà inscrite en Mathématiques (n°2).
   Erreur : `#1062 - Duplicate entry '3-2' for key 'student_department.PRIMARY'`
```sql
INSERT INTO student_department (student_id, department_id, enrollment_date)
VALUES (3, 3, '2026-11-10');
```
   Claire est inscrite en Mathématiques (n°2) et en Informatique (n°1) : n'importe quel autre département convient (ici Biologie, n°3).

4. **Date au mauvais format.**
   Erreur : `#1292 - Incorrect date value: '10/02/2004' for column 'birth_date' at row 1`
```sql
INSERT INTO student (first_name, last_name, birth_date, city)
VALUES ('Léna', 'Morel', '2004-02-10', 'Rennes');
```

5. **Apostrophe non échappée** dans la valeur.
   Erreur : `#1064 - You have an error in your SQL syntax […] near 'ingénieur')'`
```sql
INSERT INTO department (department_name)
VALUES ('Sciences de l''ingénieur');
```

6. **Pas autant de valeurs que de colonnes** : 4 colonnes, 3 valeurs (la ville manque).
   Erreur : `#1136 - Column count doesn't match value count at row 1`
```sql
INSERT INTO student (first_name, last_name, birth_date, city)
VALUES ('Tom', 'Lambert', '2004-09-15', 'Paris');
```

7. **Virgule décimale** : `15,5` est lu comme deux valeurs, `15` et `5`, ce qui fait 5 valeurs pour 4 colonnes.
   Erreur : `#1136 - Column count doesn't match value count at row 1`
```sql
INSERT INTO note (student_id, subject_id, grade, note_date)
VALUES (1, 1, 15.5, '2026-11-10');
```
   Le message ne parle pas de décimale : il faut savoir le relier à la virgule.

---

## Niveau 3 : Modifier des lignes avec UPDATE

- Modifier la ville de votre élève.
```sql
UPDATE student
SET city = 'Lyon'
WHERE student_id = 43;
```
`1 ligne affectée`. Un `WHERE last_name = 'Dupuis'` modifierait aussi Charlotte Dupuis : on cible par la **clé primaire**.

- Corriger la date de naissance d'Emma Roux.
```sql
UPDATE student
SET birth_date = '2005-01-02'
WHERE student_id = 44;
```
On peut aussi cibler `WHERE first_name = 'Emma' AND last_name = 'Roux'`, à condition d'avoir vérifié avec un `SELECT` qu'il n'y a qu'une Emma Roux.

- Ajouter des emails aux élèves dont l'adresse est `NULL`.

Liste des élèves concernés :
```sql
SELECT student_id, first_name, last_name
FROM student
WHERE email IS NULL;
```
Résultat : **7 élèves** (n°11, 15, 22, 31, 35, plus Emma Roux n°44 et Inès Faure n°46 ajoutées au niveau 1).

Solution simple, une requête par élève :
```sql
UPDATE student SET email = 'leo.benoit@mail.com' WHERE student_id = 11;
UPDATE student SET email = 'paul.lemoine@mail.com' WHERE student_id = 15;
-- … et ainsi de suite
```

Solution en une requête, avec `CASE` :
```sql
UPDATE student
SET email = CASE student_id
    WHEN 11 THEN 'leo.benoit@mail.com'
    WHEN 15 THEN 'paul.lemoine@mail.com'
    WHEN 22 THEN 'charlotte.dupuis@mail.com'
    WHEN 31 THEN 'lea.leblanc@mail.com'
    WHEN 35 THEN 'maxime.dumas@mail.com'
    WHEN 44 THEN 'emma.roux@mail.com'
    WHEN 46 THEN 'ines.faure@mail.com'
END
WHERE email IS NULL;
```
`7 lignes affectées`. Le `WHERE email IS NULL` est **indispensable** : sans lui, le `CASE` renverrait `NULL` pour les 40 autres élèves et effacerait leur email. Solution générale, valable pour n'importe quels élèves :
```sql
UPDATE student
SET email = LOWER(CONCAT(first_name, '.', last_name, '@mail.com'))
WHERE email IS NULL;
```
Cette version garde les accents (`léo.benoit@…`), qu'il faudrait retirer avec des `REPLACE` pour obtenir une adresse valide partout.

- Renommer le département « Physique ».
```sql
UPDATE department
SET department_name = 'Physique appliquée'
WHERE department_id = 5;
```
Grâce aux clés étrangères, rien d'autre n'est à modifier : les matières pointent vers le **numéro** du département, pas vers son nom (partie 1.A).

- Un point de bonus en Réseaux, sans dépasser 20.
```sql
UPDATE note
SET grade = CASE
    WHEN grade >= 19 THEN 20
    ELSE grade + 1
END
WHERE subject_id = 2;
```
`17 lignes affectées` (les 16 notes de Réseaux, plus celle de votre élève s'il en a une dans la matière). Une note de Réseaux vaut 19 : sans le `CASE`, elle passerait à 20, ce qui reste correct, mais une note de 19.5 serait passée à 20.5. MySQL propose aussi la fonction `LEAST(grade + 1, 20)`, qui renvoie la plus petite des deux valeurs.

Remarque : ce bonus modifie les notes, mais **pas** les colonnes `average_grade` des élèves concernés, qui ne sont plus à jour. C'est l'inconvénient d'une donnée calculée stockée en base (partie 4.A).

- Mettre à jour la moyenne de votre élève.
```sql
UPDATE student
SET average_grade = (
    SELECT ROUND(AVG(grade), 2)
    FROM note
    WHERE note.student_id = 43
)
WHERE student_id = 43;
```
Avec les notes de la correction (15.50 en Programmation, 13.00 en Réseaux, devenue 14.00 après le bonus) : **14.75**.

- Remplacer le domaine des adresses email.
```sql
UPDATE student
SET email = REPLACE(email, '@mail.com', '@ecole.fr');
```
Ici, l'absence de `WHERE` est voulue. Le nombre de lignes affectées correspond aux élèves qui avaient une adresse en `@mail.com`. Vérification :
```sql
SELECT email
FROM student
WHERE email NOT LIKE '%@ecole.fr';
```

---

## Niveau 4 : Supprimer des lignes avec DELETE

- Supprimer Hugo Tissot via son id.

On cherche d'abord son numéro (il y a deux Hugo dans la base, et un troisième depuis le niveau 1) :
```sql
SELECT student_id, first_name, last_name
FROM student
WHERE first_name = 'Hugo' AND last_name = 'Tissot';
```
Résultat : **27**.
```sql
DELETE FROM student
WHERE student_id = 27;
```
`1 ligne affectée`. Vérification :
```sql
SELECT * FROM note WHERE student_id = 27;
SELECT * FROM student_department WHERE student_id = 27;
```
Les deux requêtes ne renvoient plus rien : ses **3 notes** et son **inscription** ont été supprimées automatiquement, grâce au `ON DELETE CASCADE` des clés étrangères (partie 3, paragraphe 5.2).

La version avec sous-requête de l'ancienne correction (`WHERE student_id = (SELECT student_id FROM student WHERE …)`) est refusée par MySQL (`#1093`) : on ne peut pas lire dans une sous-requête la table qu'on est en train de modifier. `WHERE first_name = 'Hugo' AND last_name = 'Tissot'` suffit.

- Supprimer l'une des deux notes de votre élève.
```sql
SELECT note_id, subject_id, grade
FROM note
WHERE student_id = 43;

DELETE FROM note
WHERE note_id = 105;
```
On cible la note par **sa** clé primaire (`note_id`), lue dans le `SELECT` (105 ou 106 avec les données de la correction). `WHERE student_id = 43` supprimerait les deux notes.

- Supprimer les élèves sans département ni note.
```sql
DELETE FROM student
WHERE student_id NOT IN (SELECT student_id FROM student_department)
  AND student_id NOT IN (SELECT student_id FROM note);
```
`8 lignes affectées` : les 4 élèves d'origine sans département (n°37, 38, 39 et 42), plus les 4 élèves ajoutés au niveau 1 et jamais inscrits (Emma Roux, Nathan Blanc, Inès Faure, Hugo Perrin). Ici, les sous-requêtes portent sur **d'autres** tables que `student` : pas d'erreur `#1093`.

- Supprimer le département « Physique appliquée ».
```sql
DELETE FROM department
WHERE department_id = 5;
```
`1 ligne affectée`. Les matières Mécanique et Optique ont disparu avec lui (`ON DELETE CASCADE` sur `subject.department_id`) :
```sql
SELECT * FROM subject WHERE department_id = 5;
```
ne renvoie plus rien. Si ces matières avaient eu des notes, elles auraient été supprimées aussi.

- Supprimer les notes inférieures à 10.
```sql
DELETE FROM note
WHERE grade < 10;
```
`1 ligne affectée` après le bonus du niveau 3 (sans le bonus : 2 lignes).

- Réimporter la base `scholar` : onglet **Opérations** de la base, **Supprimer la base de données (DROP)**, puis import de `scholar.sql` (partie 1.B).
