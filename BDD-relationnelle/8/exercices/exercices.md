# Exercices – Partie 8 : Optimiser les requêtes SQL

Tous les exercices se font sur la base `scholar`, complétée par la table `connexion` du script `donnees/scholar_connexions.sql` (partie 8.A). Les durées et les nombres de lignes varient d'un ordinateur à l'autre, et d'une génération des données à l'autre : ce sont les **comparaisons** qui comptent.

Pour chaque mesure, exécutez la requête **plusieurs fois** et relevez la durée affichée par phpMyAdmin (« traitement en … seconde(s) »), ou utilisez `EXPLAIN ANALYZE` dans la console MySQL.

| Niveaux | Notions | Support |
|---|---|---|
| 1 | Index, `EXPLAIN` | 8.A |
| 2 et 3 | Réécrire les requêtes, problème N+1, pagination, dénormalisation | 8.B |

---

## Niveau 1 : Index et EXPLAIN

- Réimporter une base `scholar` propre, puis exécuter le script `scholar_connexions.sql`. Vérifier que la table `connexion` contient bien 500 000 lignes.

- Afficher la liste des index de la table `connexion`, et relever la ou les colonnes de chacun.

- Compter les connexions du mois de mars 2026. Relever la durée d'exécution, puis afficher le plan d'exécution de la requête, et relever les valeurs des colonnes `type`, `key` et `rows`.

- Créer un index sur la colonne `connected_at`. Exécuter à nouveau la requête précédente, relever sa durée et son plan d'exécution, et comparer avec les valeurs obtenues sans index.

- Afficher le plan d'exécution des trois requêtes suivantes, et relever pour chacune les colonnes `type`, `key` et `rows` :
  1. la connexion n°250 000 ;
  2. toutes les connexions de l'élève n°7 ;
  3. toutes les connexions à la page `notes`.

- Créer un index sur la colonne `page`. Afficher à nouveau le plan d'exécution de la requête 3 (`SELECT * … WHERE page = 'notes'`), puis celui de `SELECT COUNT(*) … WHERE page = 'notes'`. Relever dans les deux cas l'index utilisé, puis supprimer l'index sur `page`.

- Afficher les connexions de l'élève n°7 en janvier 2026, triées par date. Afficher le plan d'exécution de la requête, puis créer un index composite sur `(student_id, connected_at)`, et afficher à nouveau le plan.

- Afficher le plan d'exécution d'une requête qui ne filtre que sur la date (les connexions du 1er février 2026), et relever la colonne `possible_keys`.

---

## Niveau 2 : Réécrire les requêtes

Chacune des requêtes suivantes donne un résultat juste, mais elle est mal écrite. Pour chacune : afficher son plan d'exécution, la réécrire pour qu'elle soit plus performante (en créant un index si nécessaire), puis afficher le plan de la nouvelle version et comparer les durées.

1. Le nombre de connexions de décembre 2025 :
```sql
SELECT COUNT(*)
FROM connexion
WHERE YEAR(connected_at) = 2025 AND MONTH(connected_at) = 12;
```

2. Les connexions du 14 février 2026 :
```sql
SELECT *
FROM connexion
WHERE DATE(connected_at) = '2026-02-14';
```

3. Les connexions de 25 minutes ou plus :
```sql
SELECT connexion_id, student_id, duration_s
FROM connexion
WHERE duration_s / 60 >= 25;
```

4. Le nombre de connexions aux pages `notes` et `planning` :
```sql
SELECT page, COUNT(*) AS nb
FROM connexion
GROUP BY page
HAVING page IN ('notes', 'planning');
```

5. L'élève dont le téléphone est 0601020304 :
```sql
SELECT first_name, last_name
FROM student
WHERE phone_number = 0601020304;
```

6. Les élèves de Lyon qui ont consulté au moins une fois la page `notes` :
```sql
SELECT DISTINCT s.first_name, s.last_name
FROM student s, connexion c
WHERE s.city = 'Lyon' AND c.page = 'notes';
```

7. La 15 000e page de la liste des connexions, à raison de 20 connexions par page, dans l'ordre des numéros (la page précédente s'est terminée sur la connexion n°299 980) :
```sql
SELECT connexion_id, student_id, connected_at, page
FROM connexion
ORDER BY connexion_id
LIMIT 20 OFFSET 299980;
```

---

## Niveau 3 : Du côté de l'application

- Le code PHP suivant affiche le nombre de connexions de chaque élève en 2026. Le réécrire pour qu'il n'envoie qu'**une seule** requête à MySQL.

```php
$eleves = $pdo->query('SELECT student_id, first_name, last_name FROM student')->fetchAll();

foreach ($eleves as $eleve) {
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM connexion
                           WHERE student_id = ? AND YEAR(connected_at) = 2026');
    $stmt->execute([$eleve['student_id']]);
    echo $eleve['first_name'] . ' ' . $eleve['last_name'] . ' : ' . $stmt->fetchColumn() . '<br>';
}
```

- Écrire une requête qui affiche, pour chaque élève, son prénom, son nom et la durée totale (en minutes, arrondie à l'entier) de ses connexions, d'abord avec une sous-requête corrélée, puis avec une jointure. Comparer les deux plans d'exécution et les deux durées.

- Afficher, pour chaque page, le nombre de connexions et la durée moyenne (en secondes, arrondie à l'entier) en janvier 2026, de la page la plus visitée à la moins visitée. Vérifier avec `EXPLAIN` qu'un index est utilisé.

- La page d'accueil de l'espace numérique affiche, pour chaque élève, son nombre total de connexions. Pour éviter de le recalculer à chaque affichage :
  1. ajouter à la table `student` une colonne `nb_connexions` ;
  2. la remplir, en une seule requête, avec le nombre de connexions de chaque élève ;
  3. afficher les 5 élèves qui se sont le plus connectés, en n'utilisant **que** la table `student` ;
  4. ajouter une connexion pour l'élève n°1, puis comparer la valeur de `nb_connexions` d'Alice Dupont avec son nombre réel de connexions.
