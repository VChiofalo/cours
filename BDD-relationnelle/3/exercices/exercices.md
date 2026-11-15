# Exercices – Partie 3 : Modifier les données

Tous les exercices se font sur la base `scholar`, dans l'onglet **SQL** de phpMyAdmin.

Avant de commencer, **réimportez une base `scholar` propre** (partie 1.B). Les exercices s'enchaînent : faites-les **dans l'ordre**, car certains utilisent les lignes créées dans les précédents.

Avant chaque `UPDATE` ou `DELETE`, exécutez un `SELECT` avec le même `WHERE` pour voir quelles lignes seront touchées.

---

## Niveau 1 : Ajouter des lignes avec INSERT INTO

- Ajoutez-vous à la table des élèves (données factices) : prénom, nom, date de naissance, email, numéro de téléphone, ville. Relevez le numéro (`student_id`) attribué à votre élève.

- Ajouter l'élève Emma Roux, née le 1er février 2005, qui habite à Lyon, sans email ni téléphone.

- Ajouter en une seule requête les trois élèves suivants :

| Prénom | Nom | Date de naissance | Email | Ville |
|---|---|---|---|---|
| Nathan | Blanc | 12/07/2004 | nathan.blanc@mail.com | Toulouse |
| Inès | Faure | 30/10/2003 | | Rennes |
| Hugo | Perrin | 08/03/2005 | hugo.perrin@mail.com | Paris |

- Ajouter le département « Économie ».

- Ajouter au département Physique (n°5) les matières « Mécanique » et « Optique ».

- Inscrire votre élève dans le département de votre choix, à la date d'aujourd'hui.

- Ajouter à votre élève deux notes, dans deux matières de son département.

- Afficher, avec des jointures, le nom du département et les notes de votre élève (nom de la matière, note, date), pour vérifier vos insertions.

---

## Niveau 2 : Lire et corriger les erreurs

Chacune des requêtes suivantes est refusée par MySQL. Pour chacune : l'exécuter, lire le message d'erreur, puis la corriger pour qu'elle fonctionne.

1. Ajouter l'élève Paul Simon, né le 10 juin 2004 :
```sql
INSERT INTO student (first_name, last_name, birth_date)
VALUES ('Paul', 'Simon', '2004-06-10');
```

2. Ajouter une note de 14 à Alice Dupont (n°1) :
```sql
INSERT INTO note (student_id, subject_id, grade, note_date)
VALUES (1, 15, 14.00, '2026-11-10');
```

3. Inscrire Claire Lemoine (n°3) dans un nouveau département :
```sql
INSERT INTO student_department (student_id, department_id, enrollment_date)
VALUES (3, 2, '2026-11-10');
```

4. Ajouter l'élève Léna Morel, née le 10 février 2004 :
```sql
INSERT INTO student (first_name, last_name, birth_date, city)
VALUES ('Léna', 'Morel', '10/02/2004', 'Rennes');
```

5. Ajouter le département « Sciences de l'ingénieur » :
```sql
INSERT INTO department (department_name)
VALUES ('Sciences de l'ingénieur');
```

6. Ajouter l'élève Tom Lambert, né le 15 septembre 2004, qui habite à Paris :
```sql
INSERT INTO student (first_name, last_name, birth_date, city)
VALUES ('Tom', 'Lambert', '2004-09-15');
```

7. Ajouter une note de 15,5 à Alice Dupont (n°1) en Programmation (n°1) :
```sql
INSERT INTO note (student_id, subject_id, grade, note_date)
VALUES (1, 1, 15,5, '2026-11-10');
```

---

## Niveau 3 : Modifier des lignes avec UPDATE

- Modifier la ville de votre élève.

- Corriger la date de naissance d'Emma Roux : elle est née le 2 janvier 2005, et non le 1er février.

- Ajouter des emails aux élèves dont l'adresse email est `NULL`.

- Renommer le département « Physique » en « Physique appliquée ».

- Ajouter un point de bonus à toutes les notes de Réseaux, sans qu'aucune note ne dépasse 20.

- Mettre à jour la moyenne (`average_grade`) de votre élève, à partir de ses notes de la table `note`.

- Remplacer, pour tous les élèves, le domaine `@mail.com` des adresses email par `@ecole.fr`.

---

## Niveau 4 : Supprimer des lignes avec DELETE

- Supprimer l'élève suivant : Hugo Tissot, via son id. Vérifier ensuite ce que sont devenues ses notes et son inscription.

- Supprimer l'une des deux notes de votre élève.

- Supprimer les élèves qui ne sont inscrits dans aucun département et qui n'ont aucune note.

- Supprimer le département « Physique appliquée ». Vérifier ensuite ce que sont devenues ses matières.

- Supprimer toutes les notes strictement inférieures à 10.

- Réimporter la base `scholar` pour repartir sur des données propres.
