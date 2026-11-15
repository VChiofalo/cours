# Exercices – Partie 7 : Intégrité et transactions

Les exercices utilisent trois bases :

- `restaurant`, créée en partie 5 (niveaux 1 et 2 des exercices) ;
- `mediatheque`, créée en partie 5 (niveau 4 des exercices) ;
- `scholar`, à **réimporter** proprement avant le niveau 2.

| Niveaux | Notions | Support |
|---|---|---|
| 1 | Actions référentielles, suppression logique | 7.A |
| 2 et 3 | Transactions, accès simultanés | 7.B |

Les niveaux 2 et 3 se font dans la **console MySQL** de WampServer (partie 7.B, paragraphe 4.2), et non dans phpMyAdmin.

---

## Niveau 1 : Les actions référentielles

- Pour chacune des 4 clés étrangères de la base `restaurant`, choisir l'action `ON DELETE` la plus adaptée (`RESTRICT`, `CASCADE` ou `SET NULL`) :
  - `plat.id_categorie` ;
  - `commande.id_client` ;
  - `detail_commande.id_commande` (table renommée en partie 5) ;
  - `detail_commande.id_plat`.

- Retrouver le nom de ces 4 clés étrangères, puis les modifier pour appliquer les actions choisies. Nommer les nouvelles contraintes.

- Vérifier les actions choisies :
  - supprimer la commande n°2, et vérifier ce que sont devenues ses lignes ;
  - tenter de supprimer le plat « Tarte Tatin » ;
  - tenter de supprimer la cliente Lucie Morel.

- Dans la base `mediatheque`, la direction décide qu'un livre peut rester **sans catégorie** si sa catégorie est supprimée. Modifier la base en conséquence, puis le vérifier : créer une catégorie « Essai » et un livre dans cette catégorie, supprimer la catégorie, et afficher le livre.

- Le restaurant ne veut plus supprimer de plats, pour conserver l'historique de ses commandes, mais simplement les **retirer de la carte**. Mettre en place une suppression logique sur la table `plat`, retirer le « Bœuf bourguignon » de la carte, puis afficher la carte du jour (les plats encore proposés, avec leur prix).

---

## Niveau 2 : Les transactions

Tous les exercices de ce niveau se font sur la base `scholar`, fraîchement réimportée, dans la console MySQL.

- Ouvrir la console MySQL, se connecter, et sélectionner la base `scholar`.

- Dans une transaction, supprimer **toutes** les notes de la base. Vérifier qu'il n'en reste aucune, puis annuler la transaction, et vérifier que les 104 notes sont revenues.

- Dans une transaction, créer l'élève Lina Garnier (née le 18 avril 2005, email `lina.garnier@mail.com`, habitant à Lyon) et l'inscrire dans le département n°99. Constater l'erreur, annuler la transaction, et vérifier que Lina Garnier n'existe pas.

- Recommencer, en l'inscrivant cette fois en Biologie, et valider la transaction. Afficher ensuite son numéro d'élève.

- Dans une transaction, ajouter un point à toutes les notes de Génétique. Vérifier qu'aucune note ne dépasse 20, puis valider ou annuler selon le résultat. Si la transaction a été annulée, écrire une version correcte de la mise à jour, et la valider.

- Exécuter les requêtes suivantes, une par une, puis afficher la note n°1 :
```sql
START TRANSACTION;
DELETE FROM note WHERE note_id = 1;
ALTER TABLE note ADD commentaire VARCHAR(255);
ROLLBACK;
```
  Remettre ensuite la base en état (supprimer la colonne ajoutée, et réimporter `scholar` si nécessaire).

- Dans la base `restaurant`, enregistrer en une seule transaction une nouvelle commande de Karim Faure, datée du jour, contenant 2 Salade César et 1 Risotto aux champignons.

---

## Niveau 3 : Les accès simultanés

Ouvrir **deux consoles MySQL** côte à côte, appelées A et B, et sélectionner la base `scholar` dans les deux.

- Reproduire l'expérience du support (partie 7.B, paragraphe 5.1) : dans A, ouvrir une transaction et changer la ville d'Alice Dupont en « Nice ». Afficher la ville d'Alice dans A, puis dans B. Dans B, changer sa ville en « Lille ». Valider la transaction de A, puis afficher la ville d'Alice dans les deux consoles.

- Dans A, ouvrir une transaction et modifier la moyenne de Bob Martin (n°2), sans valider. Dans B, tenter de modifier la ville de Bob Martin, et attendre. Relever le message obtenu au bout de quelques dizaines de secondes, puis annuler la transaction de A.

- Provoquer un interblocage, en exécutant les requêtes suivantes **dans cet ordre**, en alternant les consoles :

| Étape | Console A | Console B |
|---|---|---|
| 1 | `START TRANSACTION;` | `START TRANSACTION;` |
| 2 | `UPDATE student SET city = 'Nice' WHERE student_id = 1;` | |
| 3 | | `UPDATE student SET city = 'Lille' WHERE student_id = 2;` |
| 4 | `UPDATE student SET city = 'Nice' WHERE student_id = 2;` | |
| 5 | | `UPDATE student SET city = 'Lille' WHERE student_id = 1;` |

  Relever le message obtenu et la console dans laquelle il apparaît. Terminer ensuite proprement la transaction restante, avec un `ROLLBACK`.
