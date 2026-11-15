# Exercices – Partie 2 : Interroger les données

Tous les exercices se font sur la base `scholar`, dans l'onglet **SQL** de phpMyAdmin.

| Niveaux | Notions | Support |
|---|---|---|
| 1 à 3 | `WHERE`, `ORDER BY`, `LIMIT`, `DISTINCT`, `AS` | 2.A |
| 4 à 6 | `AND`, `OR`, `IN`, `BETWEEN`, `LIKE`, `IS NULL`, fonctions, `CASE` | 2.B |
| 7 et 8 | Fonctions d'agrégation, `GROUP BY`, `HAVING` | 2.C |
| 9 et 10 | Jointures, sous-requêtes | 2.D |

---

## Niveau 1 : Filtrer avec WHERE

- Afficher le nom et le prénom de tous les élèves.

- Afficher toutes les données des élèves dont le prénom est « Alice ».

- Afficher le nom, le prénom et la moyenne des élèves dont le nom de famille est « Lemoine ».

- Afficher le prénom, le nom et la ville des élèves qui habitent à Rennes.

- Afficher le prénom, le nom et la moyenne des élèves qui ont au moins 16 de moyenne.

- Afficher le prénom, le nom et la ville des élèves qui n'habitent pas à Paris.

- Afficher le prénom, le nom et la date de naissance des élèves nés avant le 1er janvier 2000.

- Afficher toutes les données de l'élève dont le nom de famille est « N'Diaye ».

- Afficher toutes les notes strictement inférieures à 10.

- Afficher le nom des matières du département n°1.

## Niveau 2 : Trier et limiter avec ORDER BY et LIMIT

- Afficher le nom, le prénom et la moyenne des élèves, triés par ordre alphabétique du nom de famille.

- Afficher le nom, le prénom et la moyenne des 10 élèves ayant la moyenne la plus haute, triés par moyenne décroissante.

- Afficher le nom, le prénom et la moyenne des 10 élèves ayant la moyenne la plus basse, triés par moyenne croissante.

- Afficher le nom, le prénom et la moyenne de l'élève ayant la moyenne la plus haute.

- Afficher le prénom, le nom et la date de naissance des 5 élèves les plus jeunes.

- Afficher les 3 notes les plus récentes (toutes les colonnes de la table `note`).

- Afficher le prénom, le nom et la ville des élèves, triés par ville, puis par nom de famille, puis par prénom.

- Afficher le prénom et le nom des élèves, triés par nom de famille, en ne montrant que les élèves n°11 à 20 de cette liste.

## Niveau 3 : Supprimer les doublons et renommer avec DISTINCT et AS

- Afficher la liste des villes des élèves, sans doublon.

- Afficher la liste des noms de famille des élèves, sans doublon, par ordre alphabétique.

- Afficher les numéros des matières dans lesquelles au moins une note a été attribuée, sans doublon.

- Afficher toutes les données des élèves, en renommant les colonnes en français (sans accents).

- Afficher le prénom, le nom et la moyenne de chaque élève ramenée sur 100, dans une colonne nommée `moyenne_sur_100`.

- Afficher le prénom, le nom et la date de naissance des élèves, avec une colonne nommée « date de naissance » (avec les espaces).

- Afficher le prénom, le nom et la moyenne sur 100 des élèves, triés de la meilleure à la moins bonne moyenne sur 100, en utilisant l'alias dans le tri.

---

## Niveau 4 : Combiner des conditions : AND, OR, NOT, IN, BETWEEN

- Afficher le prénom, le nom et la moyenne des élèves de Lyon qui ont au moins 15 de moyenne.

- Afficher le prénom, le nom, la ville et la moyenne des élèves qui habitent à Lyon ou à Paris et qui ont plus de 16 de moyenne.

- Afficher le nom, le prénom et la moyenne des élèves dont la moyenne est comprise entre 8 et 11.

- Afficher le nom, le prénom et le numéro de téléphone des élèves dont le nom est Bouvier, Lemoine ou Dupuis.

- Afficher le nom, le prénom et le numéro de téléphone des élèves dont le numéro de téléphone n'est ni 0605060708, ni 0605566778.

- Afficher le prénom, le nom et la date de naissance des élèves nés en 2004.

- Afficher toutes les notes attribuées au premier trimestre 2026 (de janvier à mars inclus).

- Afficher le prénom, le nom, la ville et la moyenne des élèves qui n'habitent ni à Paris ni à Toulouse, et qui ont plus de 14 de moyenne.

- Afficher le prénom, le nom et la moyenne des élèves dont la moyenne n'est pas comprise entre 10 et 16.

## Niveau 5 : Rechercher un motif et tester l'absence de valeur : LIKE, IS NULL

- Afficher le nom et le prénom de tous les élèves dont le nom de famille commence par la lettre « C ».

- Afficher le nom et le prénom de tous les élèves dont le nom de famille se termine par la lettre « a ».

- Afficher le nom et le prénom de tous les élèves dont le nom de famille contient la lettre « e ».

- Afficher le nom, le prénom et la moyenne de tous les élèves dont le nom de famille contient la lettre « e » et qui ont plus de 15 de moyenne.

- Afficher le nom et le prénom de tous les élèves dont le prénom commence par la lettre « C » et se termine par la lettre « a ».

- Afficher le prénom et le nom des élèves dont le prénom compte exactement 4 lettres.

- Afficher le nom et le prénom des élèves qui n'ont pas renseigné leur adresse email.

- Afficher le nom, le prénom et l'email des élèves qui ont bien renseigné leur adresse email.

- Afficher le prénom et le nom des élèves à qui il manque un moyen de contact (pas d'email, ou pas de téléphone).

- Reprendre l'exercice du niveau 2 : afficher le nom, le prénom et la moyenne des 10 élèves ayant la moyenne la plus basse, en écartant cette fois les élèves qui n'ont pas de moyenne.

## Niveau 6 : Utiliser des fonctions et CASE

- Afficher le nom complet de chaque élève (prénom et nom séparés par un espace) dans une colonne nommée `nom_complet`, ainsi que sa ville.

- Afficher le nom de famille des élèves en majuscules, suivi de leur prénom, triés par nom.

- Afficher pour chaque élève ses initiales (par exemple « A.D. » pour Alice Dupont), dans une colonne nommée `initiales`.

- Afficher le prénom, le nom et la longueur du nom de famille (en nombre de lettres) des élèves, du nom le plus long au plus court.

- Afficher le prénom, le nom et la date de naissance des élèves, la date étant au format JJ/MM/AAAA.

- Afficher le prénom, le nom et l'âge de chaque élève, du plus âgé au plus jeune.

- Afficher le nom, le prénom et l'âge des élèves dont l'âge n'est pas compris entre 23 et 30 ans.

- Afficher le prénom, le nom et la date de naissance des élèves nés en novembre.

- Afficher le prénom, le nom et la moyenne arrondie à l'entier le plus proche de chaque élève.

- Afficher le prénom, le nom et l'email des élèves, en affichant « non renseigné » à la place des emails manquants.

- Afficher le prénom, le nom, la moyenne et la mention de chaque élève : « Très bien » à partir de 16, « Bien » à partir de 14, « Assez bien » à partir de 12, « Passable » à partir de 10, « Insuffisant » en dessous, et « Pas de note » pour les élèves sans moyenne.

- Afficher le prénom, le nom et la mention « Admis » ou « Non admis » de chaque élève ayant une moyenne, selon que sa moyenne atteint 10 ou non.

---

## Niveau 7 : Calculer avec les fonctions d'agrégation

- Afficher le nombre d'élèves.

- Afficher le nombre d'élèves dont la moyenne est supérieure à 14.

- Afficher le nombre d'élèves dont la moyenne est comprise entre 8 et 11.

- Afficher le nombre d'élèves qui ont renseigné leur email.

- Afficher le nombre de villes différentes dans lesquelles habitent les élèves.

- Afficher la moyenne (arrondie à 2 décimales) des moyennes des élèves dont la moyenne est inférieure à 16.

- Afficher la note la plus haute et la note la plus basse jamais attribuées.

- Afficher la date de naissance de l'élève le plus âgé et celle de l'élève le plus jeune.

- Afficher le nombre de notes attribuées en 2025.

- Afficher le nombre de notes et la moyenne des notes (arrondie à 2 décimales) de la matière n°3.

- Afficher le nombre total de notes, et le nombre de notes supérieures ou égales à 15.

## Niveau 8 : Regrouper avec GROUP BY et filtrer avec HAVING

- Afficher le nombre d'élèves par ville.

- Afficher la moyenne (arrondie à 2 décimales) des élèves de chaque ville, de la meilleure ville à la moins bonne.

- Afficher, pour chaque élève (numéro), son nombre de notes et sa note la plus haute.

- Afficher le nombre d'élèves nés chaque année, de l'année la plus ancienne à la plus récente.

- Afficher le nombre de notes attribuées chaque mois de l'année 2026.

- Afficher les villes qui comptent au moins 11 élèves.

- Afficher le numéro des élèves qui ont au moins 4 notes, avec leur nombre de notes.

- Afficher le numéro des matières dont la moyenne des notes dépasse 15, avec cette moyenne arrondie à 2 décimales.

- Afficher, pour chaque élève (numéro), le nombre de matières différentes dans lesquelles il a au moins une note.

- Afficher les couples élève / matière (numéros) pour lesquels l'élève a plusieurs notes dans la matière, avec le nombre de notes.

- Parmi les élèves nés en 2003 ou après, afficher les villes qui en comptent au moins 4, avec leur nombre.

---

## Niveau 9 : Interroger plusieurs tables avec les jointures

- Afficher le prénom, le nom et les spécialisations (départements) de tous les élèves inscrits.

- Afficher le prénom, le nom et les notes de **tous** les élèves, y compris ceux qui n'ont aucune note, en utilisant `LEFT JOIN`.

- Afficher tous les départements avec leurs matières, y compris les départements qui n'ont aucune matière, en utilisant `RIGHT JOIN`.

- Afficher le prénom et le nom des élèves qui ne sont inscrits dans aucun département.

- Afficher le nom des matières, la note et la date de chaque note d'Alice Dupont, de la plus ancienne à la plus récente.

- Afficher le prénom, le nom, le nom de la matière et la note de chaque note attribuée, triés par note décroissante.

- Afficher le prénom, le nom et la moyenne des notes (arrondie à 2 décimales) de chaque élève, calculée à partir de la table `note`.

- Afficher le nom de chaque département et le nombre d'élèves qui y sont inscrits, y compris les départements sans élève.

- Afficher le nom de chaque matière et la moyenne de ses notes (arrondie à 2 décimales), de la meilleure à la moins bonne.

- Afficher le nom de chaque département et la moyenne (arrondie à 2 décimales) des notes obtenues dans ses matières.

- Afficher le prénom et le nom des élèves inscrits dans plusieurs départements, avec leur nombre de départements.

- **Facultatif** : afficher toutes les combinaisons possibles de départements et de villes des élèves, avec `CROSS JOIN`.

## Niveau 10 : Utiliser des sous-requêtes

- Afficher le prénom, le nom et la moyenne des élèves dont la moyenne est supérieure à la moyenne générale.

- Afficher le prénom, le nom et la moyenne du ou des élèves ayant la moyenne la plus haute, à l'aide d'une sous-requête.

- Afficher le prénom et le nom des élèves qui n'ont aucune note.

- Afficher le prénom et le nom des élèves qui ont au moins une note en Algèbre, chaque élève n'apparaissant qu'une fois.

- Afficher toutes les notes supérieures à la moyenne de toutes les notes, avec le prénom et le nom de l'élève.

- Afficher le prénom, le nom et la date de naissance des élèves plus âgés que tous les élèves de Toulouse.

- Afficher le nombre moyen de notes par élève (arrondi à 2 décimales), parmi les élèves qui ont au moins une note.

- Afficher le nom du ou des départements qui comptent le plus d'élèves inscrits.
