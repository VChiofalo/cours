# Corrections – Partie 8 : Optimiser les requêtes SQL

Les données de la table `connexion` sont **aléatoires** : les nombres de lignes indiqués sont des ordres de grandeur, calculés à partir de la répartition des données (500 000 connexions réparties uniformément sur 365 jours, 42 élèves, 5 pages, des durées de 10 à 1 809 secondes). Les valeurs de `rows` dans `EXPLAIN` sont, de plus, des **estimations** de MySQL. Les durées dépendent de l'ordinateur : seules les comparaisons comptent.

---

## Niveau 1 : Index et EXPLAIN

- Vérification.
```sql
SELECT COUNT(*) FROM connexion;   -- 500000
```
Si le script s'arrête avec une erreur de clé étrangère, c'est que des élèves ont été supprimés lors d'exercices précédents : il faut réimporter `scholar.sql` avant de relancer le script.

- Liste des index.
```sql
SHOW INDEX FROM connexion;
```
Deux index, tous deux créés automatiquement :
  - `PRIMARY`, sur `connexion_id` (la clé primaire) ;
  - un index sur `student_id`, créé pour la clé étrangère (son nom est celui de la contrainte, généralement `connexion_ibfk_1`).

- Connexions de mars 2026, sans index.
```sql
SELECT COUNT(*)
FROM connexion
WHERE connected_at >= '2026-03-01' AND connected_at < '2026-04-01';
-- environ 42 500

EXPLAIN
SELECT COUNT(*)
FROM connexion
WHERE connected_at >= '2026-03-01' AND connected_at < '2026-04-01';
```

| type | key | rows |
|---|---|---|
| `ALL` | *NULL* | environ 500 000 |

Lecture complète de la table.

- Avec l'index.
```sql
CREATE INDEX idx_connexion_connected_at ON connexion (connected_at);
```

| type | key | rows | Extra |
|---|---|---|---|
| `range` | `idx_connexion_connected_at` | environ 42 500 à 85 000 | `Using where; Using index` |

MySQL ne parcourt plus que la portion de l'index qui correspond à mars. Comme la requête ne fait que compter, l'index suffit (`Using index`, **index couvrant**, partie 8.B) : la table n'est même pas lue. La durée est nettement plus courte, typiquement plusieurs fois plus rapide.

- Trois plans d'exécution.

```sql
EXPLAIN SELECT * FROM connexion WHERE connexion_id = 250000;
EXPLAIN SELECT * FROM connexion WHERE student_id = 7;
EXPLAIN SELECT * FROM connexion WHERE page = 'notes';
```

| Requête | type | key | rows |
|---|---|---|---|
| 1. Connexion n°250 000 | `const` | `PRIMARY` | 1 |
| 2. Élève n°7 | `ref` | l'index de la clé étrangère | environ 12 000 |
| 3. Page `notes` | `ALL` | *NULL* | environ 500 000 |

  1. La clé primaire donne **une seule** ligne : c'est le cas le plus rapide.
  2. L'index de la clé étrangère, créé automatiquement, est utilisé : environ 500 000 / 42 lignes.
  3. Aucun index sur `page` : lecture complète.

- Index sur `page`.
```sql
CREATE INDEX idx_connexion_page ON connexion (page);

EXPLAIN SELECT * FROM connexion WHERE page = 'notes';
EXPLAIN SELECT COUNT(*) FROM connexion WHERE page = 'notes';

DROP INDEX idx_connexion_page ON connexion;
```

Résultats attendus :
  - pour `SELECT *`, l'index apparaît dans `possible_keys`, mais MySQL choisit le plus souvent de **ne pas** l'utiliser (`type = ALL`, `key = NULL`). La page `notes` représente environ un cinquième des lignes (100 000) : aller chercher chacune d'elles dans la table, à partir de l'index, coûterait plus cher que de lire toute la table d'un coup ;
  - pour `COUNT(*)`, l'index est utilisé (`type = ref`, `Using index`) : il suffit de compter les entrées de l'index, sans lire la table.

  C'est l'illustration d'une colonne **peu sélective** (partie 8.A, paragraphe 5.2) : un index sur 5 valeurs différentes ne sert presque jamais à retrouver des lignes complètes. Selon la version de MySQL et ses statistiques, il peut arriver que l'index soit tout de même utilisé pour `SELECT *` : l'important est de le vérifier avec `EXPLAIN`, et non de le supposer.

- Index composite.
```sql
SELECT connexion_id, connected_at, page
FROM connexion
WHERE student_id = 7
  AND connected_at >= '2026-01-01' AND connected_at < '2026-02-01'
ORDER BY connected_at;
-- environ 1 000 lignes
```

Avant l'index composite, MySQL choisit entre deux index, chacun imparfait :
  - l'index de la clé étrangère (`type = ref`, environ 12 000 lignes à examiner, puis filtrage sur la date et tri, `Using filesort`) ;
  - ou `idx_connexion_connected_at` (`type = range`, environ 42 000 lignes de janvier, puis filtrage sur l'élève).

```sql
CREATE INDEX idx_connexion_student_date ON connexion (student_id, connected_at);
```

Après : `type = range`, `key = idx_connexion_student_date`, `rows` environ 1 000. L'index donne directement les connexions de l'élève n°7 en janvier, **déjà triées** par date : `Using filesort` disparaît.

- Filtre sur la date seule.
```sql
EXPLAIN
SELECT *
FROM connexion
WHERE connected_at >= '2026-02-01' AND connected_at < '2026-02-02';
```
`possible_keys` ne contient que `idx_connexion_connected_at`, et **pas** `idx_connexion_student_date` : la requête ne filtre pas sur `student_id`, première colonne de l'index composite. C'est la **règle du préfixe gauche** (partie 8.A, paragraphe 4.2).

---

## Niveau 2 : Réécrire les requêtes

Pour chaque requête, la version d'origine donne `type = ALL` (ou `index`) et environ 500 000 dans `rows`.

1. **Fonctions sur la colonne.**
```sql
SELECT COUNT(*)
FROM connexion
WHERE connected_at >= '2025-12-01' AND connected_at < '2026-01-01';
```
`type = range` sur `idx_connexion_connected_at`, avec `Using index`. Résultat : environ 42 500 dans les deux versions.

2. **`DATE()` sur la colonne.**
```sql
SELECT *
FROM connexion
WHERE connected_at >= '2026-02-14' AND connected_at < '2026-02-15';
```
`type = range`, environ 1 400 lignes.

3. **Calcul sur la colonne.** La condition est réécrite sur la valeur (25 × 60 = 1 500), et un index est créé sur `duration_s`, qui n'en avait pas :
```sql
CREATE INDEX idx_connexion_duration ON connexion (duration_s);

SELECT connexion_id, student_id, duration_s
FROM connexion
WHERE duration_s >= 1500;
```
Environ 86 000 lignes (17 % de la table). Avec si peu de sélectivité, MySQL peut encore préférer une lecture complète pour cette requête : la réécriture reste juste, et l'index servira dès que la condition sera plus sélective (par exemple `duration_s >= 1800`, environ 2 800 lignes). C'est l'occasion de rappeler qu'un index ne sert pas à tout (partie 8.A, paragraphe 5).

4. **`HAVING` au lieu de `WHERE`.**
```sql
SELECT page, COUNT(*) AS nb
FROM connexion
WHERE page IN ('notes', 'planning')
GROUP BY page;
```
Environ 100 000 connexions par page. Sans index sur `page`, le gain est modeste (la table est lue entièrement dans les deux cas), mais MySQL ne regroupe plus que les lignes utiles. Avec un index sur `page`, la nouvelle version l'utiliserait (`type = range`, `Using index`), l'ancienne non.

5. **Mauvais type.**
```sql
SELECT first_name, last_name
FROM student
WHERE phone_number = '0601020304';
```
Résultat : Alice Dupont. La version d'origine compare un texte à un **nombre** : MySQL convertit chaque téléphone en nombre, ce qui empêche l'utilisation d'un éventuel index. Elle trouve tout de même Alice ici, car `'0601020304'` converti donne bien 601020304, mais une valeur comme `'06 01 02 03 04'` ou `'+33601020304'` produirait des résultats faux. Sur une table de 42 lignes, l'écart de durée est invisible : c'est une question de **bonne pratique**.

6. **Jointure oubliée, masquée par `DISTINCT`.** La requête d'origine n'a **aucune condition de jointure** : elle associe chaque élève de Lyon à **chaque** connexion à la page `notes` de n'importe quel élève (un produit cartésien, partie 2.D), soit environ 11 × 100 000 = 1,1 million de lignes, que `DISTINCT` réduit ensuite à 11. Le résultat est d'ailleurs faux dans son principe : il affiche tous les élèves de Lyon, qu'ils aient consulté la page ou non.
```sql
SELECT DISTINCT s.first_name, s.last_name
FROM student s
INNER JOIN connexion c ON c.student_id = s.student_id
WHERE s.city = 'Lyon' AND c.page = 'notes';
```
Ou, avec une sous-requête (partie 2.D), qui évite les doublons sans `DISTINCT` :
```sql
SELECT first_name, last_name
FROM student
WHERE city = 'Lyon'
  AND student_id IN (SELECT student_id FROM connexion WHERE page = 'notes');
```
Avec des données aléatoires, les 11 élèves de Lyon ont tous consulté la page : le résultat est le même, mais la requête corrigée est **juste**, et nettement plus rapide.

7. **Grand `OFFSET`.**
```sql
SELECT connexion_id, student_id, connected_at, page
FROM connexion
WHERE connexion_id > 299980
ORDER BY connexion_id
LIMIT 20;
```
La version d'origine parcourt 300 000 lignes pour en garder 20. La nouvelle va directement à la connexion n°299 981 grâce à la clé primaire (`type = range`, `key = PRIMARY`). Les deux renvoient les connexions n°299 981 à 300 000, car les numéros sont consécutifs. S'il manquait des numéros (lignes supprimées), seule la pagination par clé resterait juste.

---

## Niveau 3 : Du côté de l'application

- **Problème N+1.**
```php
$sql = 'SELECT s.first_name, s.last_name, COUNT(c.connexion_id) AS nb_connexions
        FROM student s
        LEFT JOIN connexion c
               ON c.student_id = s.student_id
              AND c.connected_at >= \'2026-01-01\' AND c.connected_at < \'2027-01-01\'
        GROUP BY s.student_id, s.first_name, s.last_name';

foreach ($pdo->query($sql) as $eleve) {
    echo $eleve['first_name'] . ' ' . $eleve['last_name'] . ' : ' . $eleve['nb_connexions'] . '<br>';
}
```
Trois corrections en une :
  - **une seule requête** au lieu de 43 ;
  - la condition sur l'année est réécrite en **intervalle** (au lieu de `YEAR(connected_at) = 2026`), pour pouvoir utiliser un index ;
  - la condition sur la date est placée dans le **`ON`** du `LEFT JOIN`, et non dans un `WHERE`. Dans un `WHERE`, elle éliminerait les élèves qui n'ont **aucune** connexion en 2026 (leur ligne a des `NULL` dans les colonnes de `connexion`), ce que le `LEFT JOIN` cherchait justement à éviter. Ici, tous les élèves de la base de test ont des connexions, mais l'écriture doit rester juste dans tous les cas. Les données couvrant septembre 2025 à août 2026, chaque élève compte environ 7 900 connexions en 2026.

- **Sous-requête corrélée ou jointure.**
```sql
-- Sous-requête corrélée
SELECT s.first_name, s.last_name,
       (SELECT ROUND(SUM(c.duration_s) / 60)
        FROM connexion c
        WHERE c.student_id = s.student_id) AS minutes
FROM student s;

-- Jointure
SELECT s.first_name, s.last_name, ROUND(SUM(c.duration_s) / 60) AS minutes
FROM student s
LEFT JOIN connexion c ON c.student_id = s.student_id
GROUP BY s.student_id, s.first_name, s.last_name;
```
Environ 12 000 connexions de 15 minutes en moyenne par élève : de l'ordre de 180 000 minutes chacun. Les deux plans utilisent l'index de `student_id` (ou l'index composite) pour la table `connexion`. Sur 42 élèves, les durées sont **proches** : l'optimiseur de MySQL traite bien les deux écritures. La différence apparaît surtout sur de très nombreuses lignes dans la requête principale. Conclusion à retenir : **mesurer**, plutôt que supposer qu'une écriture est toujours meilleure.

- **Statistiques par page.**
```sql
SELECT page, COUNT(*) AS nb_connexions, ROUND(AVG(duration_s)) AS duree_moyenne_s
FROM connexion
WHERE connected_at >= '2026-01-01' AND connected_at < '2026-02-01'
GROUP BY page
ORDER BY nb_connexions DESC;
```
Environ 8 500 connexions par page, avec une durée moyenne proche de 910 secondes (la moyenne des durées générées entre 10 et 1 809). `EXPLAIN` montre `type = range` sur `idx_connexion_connected_at` : l'index sert au filtre sur la date. On voit aussi `Using temporary` (le regroupement) et `Using filesort` (le tri), sans gravité sur 5 groupes.

- **Dénormalisation.**
```sql
-- 1. La colonne
ALTER TABLE student
ADD nb_connexions INT UNSIGNED NOT NULL DEFAULT 0;

-- 2. Le remplissage
UPDATE student s
SET nb_connexions = (
    SELECT COUNT(*)
    FROM connexion c
    WHERE c.student_id = s.student_id
);

-- 3. Le top 5, sans calcul
SELECT first_name, last_name, nb_connexions
FROM student
ORDER BY nb_connexions DESC
LIMIT 5;

-- 4. Une nouvelle connexion
INSERT INTO connexion (student_id, connected_at, page, duration_s)
VALUES (1, NOW(), 'accueil', 120);

SELECT nb_connexions FROM student WHERE student_id = 1;
SELECT COUNT(*) FROM connexion WHERE student_id = 1;
```
Le top 5 est instantané : il ne lit que les 42 lignes de `student`. Mais après la nouvelle connexion, le nombre réel est supérieur de **1** à la valeur de `nb_connexions` : la donnée stockée n'est plus à jour. C'est exactement le défaut d'`average_grade` (parties 3 et 6).

  Pour rester exacte, la colonne devrait être mise à jour **à chaque** nouvelle connexion, par l'application (dans la même transaction que l'`INSERT`, partie 7.B) ou par un déclencheur (partie 7.A). Une autre solution courante : la recalculer régulièrement (chaque nuit, par exemple), en acceptant qu'elle ait quelques heures de retard. Ce compromis entre rapidité et exactitude est au cœur de toute dénormalisation.
