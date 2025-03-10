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