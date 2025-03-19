# Corrections exercices sur les selections avec conditions.

## Niveau 1
---
- Afficher le nom et prenom de tous les élèves.
```sql
SELECT last_name, first_name
FROM student;
```

- Afficher toutes les données des élèves dont le prénom est "Alice".
```sql
SELECT *
FROM student
WHERE first_name = `Alice`;
```

- Affichier les noms, prénoms et moyennes des élèves dont le nom de famille est "Lemoine".
```sql
SELECT last_name, first_name, average_grade
FROM student
WHERE last_name = `Lemoine`;
```

## Niveau 2
- Afficher le nombre d'élèves.
```sql
SELECT COUNT(student_id)
FROM student;
```

- Afficher le nombre d'élèves dont la moyenne est suppérieur ou égal à 14.
```sql
SELECT COUNT(student_id)
FROM student
WHERE average_grade >= 14;
```

- Afficher le nombe d'élèves dont la moyenne est comprise entre 8 et 11.
```sql
SELECT COUNT(student_id)
FROM student
WHERE average_grade >= 8 AND <= 11>;
```

- Afficher le nom, le prenom et la moyenne de l'élève ayant la moyenne la plus haute.
```sql
SELECT last_name, first_name, MAX(average_grade)
FROM student;
```

- Afficher le nom, le prenom et la moyenne de l'élève ayant la moyenne la plus basse.
```sql
SELECT last_name, first_name, MIN(average_grade)
FROM student;
```

- Afficher la somme de la moyenne de tous les élèves du campus ayant plus de 9 de moyenne.
```sql
SELECT SUM(average_grade)
FROM student
WHERE average_grade > 9;
```

- Afficher la moyenne de la moyenne de tous les élèves du campus dont la moyenne est inférieur à 16.
```sql
SELECT AVG(average_grade)
FROM student
WHERE average_grade < 16;
```

## Niveau 3
---
- Afficher les noms, prenoms et moyenne des élèves triés par ordre alphabetique du nom de famille.
```sql
SELECT last_name, first_name, average_grade
FROM student
ORDER BY last_name ASC;
```

- Afficher les noms, prenoms et moyenne des dix élèves ayant la moyenne la plus haute, triés par notes décroissantes.
```sql
SELECT last_name, first_name, average_grade
FROM student
ORDER BY average_grade ASC
LIMIT 10;
```

- Afficher les noms et prenoms des 10 élèves ayant la moyenne la plus basse, triés par notes croissantes.
```sql
SELECT last_name, first_name, average_grade
FROM student
ORDER BY average_grade DESC
LIMIT 10;
```

## Niveau 4

- Afficher le nom et le prénom de tous les élèves dont le nom de famille commence par la lettre "C".
```sql
SELECT last_name, first_name
FROM student
WHERE last_name LIKE 'C%';
```

- Afficher le nom et le prénom de tous les élèves dont le nom de famille se termine par la lettre "a".
```sql
SELECT last_name, first_name
FROM student
WHERE last_name LIKE '%a';
```

- Afficher le nom et le prénom de tous les élèves dont le nom de famille contient la lettre "e".
```sql
SELECT last_name, first_name
FROM student
WHERE last_name LIKE '%e%';
```

- Afficher le nom et le prénom de tous les éléves dont le nom de famille contient la lettre "e" et qui ont plus de 10 de moyenne.
```sql
SELECT last_name, first_name
FROM student
WHERE last_name LIKE '%e%' AND average_grade > 10;
```

- Afficher le nom et le prénom de tous les élèves dont le prénom commence par la lettre "C" et se termine par la lettre "a".

```sql
SELECT last_name, first_name
FROM student
WHERE last_name LIKE 'C%' AND last_name LIKE '%a';
```

- Afficher le nom, prénom et numéro de téléphone des élèves dont le nom est Bouvier, Lemoine ou Dupuis
```sql
SELECT last_name, first_name, phone_number
FROM student
WHERE last_name IN ('Bouvier', 'Lemoine', 'Dupuis');
```

- Afficher le nom, prénom et numéro de téléphone des élèves dont le numéro de téléphone n'est pas 0605060708 ou 0605566778
```sql
SELECT last_name, first_name, phone_number
FROM student
WHERE phone_number IN ('0605060708', '0605566778');
```

## Niveau 5

- Afficher le nom et prénom des élèves n'ayant pas renseignés leurs addresse mail.
```sql
SELECT last_name, first_name
FROM student
WHERE email IS NULL;
```

- Afficher le nom, le prénom et l'âge des élèves dont l'âge est compris 18 et 25 ans
```sql
SELECT last_name, first_name, age
FROM student
WHERE age BETWEEN 18 and 25;
```

- Afficher le nom, prénom et l'email des élèves ayant bien renseignés leurs addresse mail.
```sql
SELECT last_name, first_name, email
FROM student
WHERE email IS NOT NULL;
```

- Afficher le nom, le prénom et l'âge des élèves dont l'âge n'est pas compris entre 23 et 36 ans.
```sql
SELECT last_name, first_name, age
FROM student
WHERE age NOT BETWEEN 23 and 36;
```

## Niveau 6

- Afficher le nom, prénom et l'âge des élèves triés par âge.
```sql
SELECT last_name, first_name, age
FROM student
GROUP BY age;
```

- Afficher le nom, prénom, la moyenne et l'âge des élèves triés par âge et ayant plus de 14 de moyenne.
```sql
SELECT last_name, first_name, average_grade, age
FROM student
GROUP BY age
HAVING average_grade > 14;
```

- Afficher la ville des élèves sans doublon de ville.
```sql
SELECT DISTINCT age
FROM student;
```

- Afficher toutes les données des élèves, mais renommer les colonnes en français. (sans accents)
```sql
SELECT last_name AS nom, first_name AS prenom, age, average_grade AS moyenne_general, email AS mail, phone_number AS numero_de_telephone, city AS ville
FROM student;
```

## Niveau 7

- Afficher le nom, prénom et spécialisations (department) de tous les élèves
```sql
SELECT student.first_name, student.last_name, department.department_name
FROM student
INNER JOIN  student_department ON student.student_id = student_department.student_id
INNER JOIN department ON student_department.department_id = department.department_id;
```

- Afficher le nom, prénom et notes de tous les élèves en utilisant LEFT JOIN.
```sql
SELECT student.first_name, student.last_name, note.grade
FROM student
LEFT JOIN note ON student.student_id = note.student_id;
```

- Afficher les spécialisations ainsi que les matières (subject) associé en utilisant RIGHT JOIN.
```sql
SELECT department.department_name, subject.subject_name
FROM department
RIGHT JOIN subject ON department.department_id = subject.department_id;
```

- Affichez le prénom, le nom et la moyenne des notes de chaque étudiant. (Joindre les tables student et note).
```sql
SELECT student.first_name, student.last_name, AVG(note.grade) AS average_grade
FROM student
INNER JOIN note ON student.student_id = note.student_id
GROUP BY student.student_id;
```

- Affichez le prénom, le nom de l'étudiant et le nom de chaque matière qu'ils ont suivie.
```sql
SELECT student.first_name, student.last_name, subject.subject_name
FROM student
INNER JOIN note ON student.student_id = note.student_id
INNER JOIN subject ON note.subject_id = subject.subject_id;
```

- Affichez le nom de chaque département et le nombre d'étudiants qui y sont inscrits.
```sql
SELECT department.department_name, COUNT(student_department.student_id) AS number_of_students
FROM department
INNER JOIN student_department ON department.department_id = student_department.department_id
GROUP BY department.department_id;
```

- Affichez le prénom, le nom de chaque étudiant, le nom de la matière et la note qu'ils ont obtenue, triée par note décroissante.
```sql
SELECT student.first_name, student.last_name, subject.subject_name, note.grade
FROM student
INNER JOIN note ON student.student_id = note.student_id
INNER JOIN subject ON note.subject_id = subject.subject_id
ORDER BY note.grade DESC;
```

## Niveau 8

- Ajoutez vous à la table élèves (données factices). Prénom, Nom, âge, email, numéro de téléphone, ville
```sql
INSERT INTO student (first_name, last_name, age, email, phone_number, city)
VALUES ('Jean', 'Dupuis', 23, 'jean.dupuis@mail.com', '0612345678', 'Paris');
```

- Ajouter des emails au élèves dont l'adresse mail est NULL. (Regarder SQL CASE)
```sql
UPDATE student
SET email = 'leo.benoit@mail.com'
WHERE id = 11;
```
Ou
```sql
UPDATE student
SET email = CASE student_id
    WHEN 11 THEN 'leo.benoit@mail.com'
    WHEN 15 THEN 'paul.lemoine@mail.com'
    WHEN 22 THEN 'charlotte.dupuis@mail.com'
    WHEN 31 THEN 'léa.leblanc@mail.com'
    WHEN 35 THEN 'maxime.dumasine@mail.com'
    END
WHERE email IS NULL;
```

- Supprimer l'élève suivant : Hugo Tissot, via son id
```sql
DELETE FROM student
WHERE student_id = 25;
```
Ou, si vous n'avez pas l'id
```sql
DELETE FROM student
WHERE student_id = (SELECT student_id FROM student WHERE first_name = 'Hugo' AND last_name = 'Tissot');
```

- Ajouter à votre élève sa spécialisation.
```sql
INSERT INTO student_department (student_id, department_id)
VALUES (?, ?);
```
