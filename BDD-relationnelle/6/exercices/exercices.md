# Exercices – Partie 6 : Intégrer des données

Les fichiers à importer se trouvent dans le dossier `donnees/` :

| Fichier | Contenu |
|---|---|
| `plats.csv` | 4 nouveaux plats pour la base `restaurant` (partie 5) |
| `nouvelles_notes.csv` | Les notes du début de novembre, transmises par le secrétariat, à intégrer dans `scholar` |

Avant de commencer, **réimportez une base `scholar` propre** (partie 1.B), et ouvrez chaque fichier CSV dans un **éditeur de texte** pour en repérer le séparateur, l'en-tête et les éventuels problèmes.

---

## Niveau 1 : Importer un fichier CSV

- Importer le fichier `plats.csv` directement dans la table `plat` de la base `restaurant`, avec l'onglet **Importer** de phpMyAdmin. Le fichier ne contient pas de colonne `id_plat` : indiquer à phpMyAdmin les noms des colonnes à remplir. Vérifier ensuite que les 4 nouveaux plats apparaissent bien, avec leur catégorie.

- Dans la base `scholar`, créer une table de transit `import_note` adaptée au fichier `nouvelles_notes.csv`.

- Importer le fichier `nouvelles_notes.csv` dans la table `import_note`, puis afficher son contenu.

---

## Niveau 2 : Nettoyer et contrôler

Toutes les requêtes de ce niveau portent sur la table `import_note`.

- Supprimer les espaces en trop au début et à la fin de toutes les valeurs.

- Mettre toutes les adresses email en minuscules.

- Remplacer la virgule décimale des notes par un point.

- Transformer les notes vides en `NULL`.

- Afficher chaque ligne avec sa date convertie en vraie date (`STR_TO_DATE`), et vérifier qu'aucune date n'est invalide.

- Afficher les lignes dont la note est absente.

- Afficher les lignes dont l'email ne correspond à aucun élève de la base.

- Afficher les lignes dont la matière ne correspond à aucune matière de la base.

- Afficher les lignes dont la note est supérieure à 20.

- Afficher les lignes présentes en double dans le fichier, avec leur nombre d'occurrences.

---

## Niveau 3 : Intégrer les données

- Créer une table `rejet_note` contenant toutes les lignes de `import_note` qui ne peuvent pas être intégrées (note absente, élève inconnu, matière inconnue, note supérieure à 20).

- Supprimer ces lignes de la table `import_note`.

- Intégrer les notes restantes dans la table `note`, en une seule requête `INSERT INTO … SELECT`, sans créer de doublon.

- Vérifier le résultat : afficher le nombre total de notes, puis les notes ajoutées avec le prénom et le nom de l'élève et le nom de la matière.

- Mettre à jour la moyenne (`average_grade`) des élèves qui ont reçu de nouvelles notes.

- Exporter la table `rejet_note` au format CSV, pour la renvoyer au secrétariat.

- Supprimer la table de transit `import_note`.
