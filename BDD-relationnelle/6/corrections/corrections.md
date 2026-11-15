# Corrections – Partie 6 : Intégrer des données

Les résultats supposent une base `scholar` fraîchement importée, et une base `restaurant` créée en partie 5 (niveau 1), avec ses 5 plats d'origine.

Contenu de `nouvelles_notes.csv`, pour référence :

```
email;matiere;note;date_note
ALICE.DUPONT@MAIL.COM;programmation;16,5;03/11/2026
alice.dupont@mail.com; Réseaux ;14;03/11/2026
bob.martin@mail.com;Algèbre;12,25;04/11/2026
bob.martin@mail.com;Calcul différentiel;9,5;04/11/2026
claire.lemoine@mail.com;algebre;18;04/11/2026
mia.bouvier@mail.com;Algèbre;15,75;05/11/2026
noah.brunet@mail.com;Génétique;17;05/11/2026
noah.brunet@mail.com;Génétique;17;05/11/2026
quentin.roussel@mail.com;Calcul différentiel;;05/11/2026
jean.inconnu@mail.com;Programmation;13;06/11/2026
mia.bouvier@mail.com;Physique quantique;14;06/11/2026
claire.lemoine@mail.com;Réseaux;21;06/11/2026
```

Les pièges volontaires : majuscules dans les emails et les matières, espaces autour de « Réseaux », virgule décimale, accent manquant sur « algebre », une ligne en double, une note vide, un élève inconnu, une matière inconnue, une note de 21.

---

## Niveau 1 : Importer un fichier CSV

- Importer `plats.csv` dans la table `plat`.

  1. Base `restaurant`, table `plat`, onglet **Importer**.
  2. Fichier `plats.csv`, jeu de caractères `utf-8`.
  3. Sauter **1** ligne (l'en-tête).
  4. Format **CSV** : colonnes séparées par `;`.
  5. Dans le champ **Noms des colonnes** : `nom,prix,id_categorie`.

  Sans le champ **Noms des colonnes**, phpMyAdmin remplirait les colonnes dans l'ordre de la table : le nom du plat irait dans `id_plat`, et l'import échouerait.

  Vérification :
```sql
SELECT p.id_plat, p.nom, p.prix, c.libelle
FROM plat p
INNER JOIN categorie c ON p.id_categorie = c.id_categorie;
```
  Résultat : 9 plats, dont les 4 nouveaux (n°6 à 9). Les prix du fichier sont déjà écrits avec un **point** : aucune conversion n'est nécessaire.

- Table de transit.
```sql
USE scholar;

CREATE TABLE import_note (
    email VARCHAR(255),
    matiere VARCHAR(255),
    note VARCHAR(255),
    date_note VARCHAR(255)
);
```
  Une colonne par colonne du fichier, dans le même ordre, toutes en texte et sans contrainte. La note est en `VARCHAR` : `16,5` serait refusé par une colonne `DECIMAL`.

- Import de `nouvelles_notes.csv` : table `import_note`, onglet **Importer**, sauter 1 ligne, séparateur `;`.
```sql
SELECT * FROM import_note;
```
  Résultat : **12 lignes**.

---

## Niveau 2 : Nettoyer et contrôler

- Supprimer les espaces.
```sql
UPDATE import_note
SET email = TRIM(email),
    matiere = TRIM(matiere),
    note = TRIM(note),
    date_note = TRIM(date_note);
```
  « Réseaux » perd ses espaces. `1 ligne affectée` seulement : les autres valeurs n'avaient pas d'espaces (partie 3, « lignes trouvées, lignes modifiées »).

- Emails en minuscules.
```sql
UPDATE import_note
SET email = LOWER(email);
```

- Virgule décimale.
```sql
UPDATE import_note
SET note = REPLACE(note, ',', '.');
```
  `4 lignes affectées` : 16,5, 12,25, 9,5 et 15,75.

- Notes vides.
```sql
UPDATE import_note
SET note = NULLIF(note, '');
```

- Conversion des dates.
```sql
SELECT email, matiere, note, date_note,
       STR_TO_DATE(date_note, '%d/%m/%Y') AS date_convertie
FROM import_note;
```
  Toutes les dates sont converties (du 2026-11-03 au 2026-11-06) : aucune n'est invalide. Pour le vérifier en une requête :
```sql
SELECT *
FROM import_note
WHERE STR_TO_DATE(date_note, '%d/%m/%Y') IS NULL;
```
  Résultat : aucune ligne.

- Note absente.
```sql
SELECT *
FROM import_note
WHERE note IS NULL;
```
  Résultat : 1 ligne, Quentin Roussel en Calcul différentiel.

- Élève inconnu.
```sql
SELECT i.*
FROM import_note i
LEFT JOIN student s ON i.email = s.email
WHERE s.student_id IS NULL;
```
  Résultat : 1 ligne, `jean.inconnu@mail.com`. La première ligne (`ALICE.DUPONT@MAIL.COM`) n'apparaît pas : elle est passée en minuscules, et la collation ignore de toute façon la casse.

- Matière inconnue.
```sql
SELECT i.*
FROM import_note i
LEFT JOIN subject su ON i.matiere = su.subject_name
WHERE su.subject_id IS NULL;
```
  Résultat : 1 ligne, « Physique quantique ». « programmation » et « algebre » sont bien reconnues : la collation `utf8mb4_0900_ai_ci` ignore les majuscules **et** les accents. Avec une autre collation, il faudrait les corriger à la main.

- Note supérieure à 20.
```sql
SELECT *
FROM import_note
WHERE CAST(note AS DECIMAL(5,2)) > 20;
```
  Résultat : 1 ligne, Claire Lemoine en Réseaux, 21. `CAST` convertit le texte en nombre (partie 5.B) : sans lui, la comparaison se ferait en texte, et `'9.5' > '20'` serait vrai, car le caractère `9` vient après le caractère `2`.

- Doublons.
```sql
SELECT email, matiere, note, date_note, COUNT(*) AS nb
FROM import_note
GROUP BY email, matiere, note, date_note
HAVING COUNT(*) > 1;
```
  Résultat : 1 ligne, Noah Brunet en Génétique, 17, le 05/11/2026, 2 fois. On regroupe sur **toutes** les colonnes : un élève peut avoir deux notes différentes dans la même matière, ce n'est pas un doublon.

---

## Niveau 3 : Intégrer les données

- Table des rejets.
```sql
CREATE TABLE rejet_note AS
SELECT *
FROM import_note
WHERE note IS NULL
   OR email NOT IN (SELECT email FROM student WHERE email IS NOT NULL)
   OR matiere NOT IN (SELECT subject_name FROM subject)
   OR CAST(note AS DECIMAL(5,2)) > 20;
```
  Résultat : **4 lignes** (Quentin Roussel, jean.inconnu, Physique quantique, la note de 21).

  Le `WHERE email IS NOT NULL` de la sous-requête est **indispensable** : `student` contient des emails `NULL`, et un seul `NULL` dans la liste suffit à rendre un `NOT IN` toujours faux (partie 2.D). Sans lui, l'élève inconnu ne serait pas détecté.

  Pour garder la raison du rejet, on peut ajouter une colonne calculée :
```sql
CREATE TABLE rejet_note AS
SELECT i.*,
       CASE
           WHEN note IS NULL THEN 'note absente'
           WHEN email NOT IN (SELECT email FROM student WHERE email IS NOT NULL) THEN 'élève inconnu'
           WHEN matiere NOT IN (SELECT subject_name FROM subject) THEN 'matière inconnue'
           ELSE 'note supérieure à 20'
       END AS motif
FROM import_note i
WHERE note IS NULL
   OR email NOT IN (SELECT email FROM student WHERE email IS NOT NULL)
   OR matiere NOT IN (SELECT subject_name FROM subject)
   OR CAST(note AS DECIMAL(5,2)) > 20;
```

- Supprimer les lignes rejetées.
```sql
DELETE FROM import_note
WHERE note IS NULL;

DELETE FROM import_note
WHERE email NOT IN (SELECT email FROM student WHERE email IS NOT NULL);

DELETE FROM import_note
WHERE matiere NOT IN (SELECT subject_name FROM subject);

DELETE FROM import_note
WHERE CAST(note AS DECIMAL(5,2)) > 20;
```
  Il reste **8 lignes** (dont le doublon de Noah Brunet).

  On supprime les notes vides **en premier** : avec le mode strict, la conversion d'une valeur non numérique dans un `DELETE` pourrait provoquer une erreur au lieu d'un avertissement (partie 6, paragraphe 5.5). Une fois les vides retirés, toutes les notes restantes sont des nombres valides.

- Intégration.
```sql
INSERT INTO note (student_id, subject_id, grade, note_date)
SELECT DISTINCT s.student_id,
       su.subject_id,
       CAST(i.note AS DECIMAL(4,2)),
       STR_TO_DATE(i.date_note, '%d/%m/%Y')
FROM import_note i
INNER JOIN student s ON i.email = s.email
INNER JOIN subject su ON i.matiere = su.subject_name;
```
  `7 lignes insérées` : `DISTINCT` fusionne les deux lignes identiques de Noah Brunet. Les deux jointures retrouvent les **numéros** de l'élève et de la matière à partir de l'email et du nom.

  `DISTINCT` est sans risque ici car les lignes en double sont strictement identiques. Si un élève pouvait légitimement recevoir deux fois la même note dans la même matière le même jour, il faudrait traiter les doublons à la main, après vérification auprès du secrétariat.

- Vérification.
```sql
SELECT COUNT(*) FROM note;
```
  Résultat : **111** (104 + 7).

```sql
SELECT s.first_name, s.last_name, su.subject_name, n.grade, n.note_date
FROM note n
INNER JOIN student s ON n.student_id = s.student_id
INNER JOIN subject su ON n.subject_id = su.subject_id
WHERE n.note_date >= '2026-11-01'
ORDER BY n.note_date, s.last_name;
```

| first_name | last_name | subject_name | grade | note_date |
|---|---|---|---|---|
| Alice | Dupont | Programmation | 16.50 | 2026-11-03 |
| Alice | Dupont | Réseaux | 14.00 | 2026-11-03 |
| Claire | Lemoine | Algèbre | 18.00 | 2026-11-04 |
| Bob | Martin | Algèbre | 12.25 | 2026-11-04 |
| Bob | Martin | Calcul différentiel | 9.50 | 2026-11-04 |
| Mia | Bouvier | Algèbre | 15.75 | 2026-11-05 |
| Noah | Brunet | Génétique | 17.00 | 2026-11-05 |

- Mise à jour des moyennes.
```sql
UPDATE student s
SET average_grade = (
    SELECT ROUND(AVG(n.grade), 2)
    FROM note n
    WHERE n.student_id = s.student_id
)
WHERE s.email IN (SELECT email FROM import_note);
```
  `5 lignes affectées` maximum, une par élève concerné. La sous-requête est **corrélée** : elle est recalculée pour chaque élève, grâce à la condition `n.student_id = s.student_id`. Elle lit la table `note`, et le filtre lit `import_note` : aucune ne lit `student`, donc pas d'erreur `#1093` (partie 3).

| Élève | Ancienne moyenne | Nouvelle moyenne |
|---|---|---|
| Alice Dupont | 14.83 | 15.00 |
| Bob Martin | 12.35 | 11.61 |
| Claire Lemoine | 17.10 | 17.25 |
| Mia Bouvier | 15.75 | 15.75 |
| Noah Brunet | 18.40 | 18.17 |

  La moyenne de Mia Bouvier ne change pas : sa nouvelle note (15.75) est égale à son ancienne moyenne. MySQL compte alors la ligne comme trouvée mais pas modifiée, d'où `4 lignes affectées`.

  Écrire `UPDATE student SET average_grade = …` **sans** `WHERE` recalculerait la moyenne de tous les élèves : le résultat serait juste, mais on modifierait inutilement 42 lignes.

- Export des rejets : table `rejet_note`, onglet **Exporter**, format **CSV** (ou **CSV pour MS Excel**). Cocher l'option qui place le nom des colonnes sur la première ligne, pour que le secrétariat s'y retrouve.

- Suppression de la table de transit.
```sql
DROP TABLE import_note;
```
  La table `rejet_note` est conservée jusqu'à ce que le secrétariat ait renvoyé les corrections.
