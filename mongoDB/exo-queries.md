# Exercices Queries

## Niveau 1

- Listez tous les produits disponibles (stock > 0).

- Affichez les commandes dont le statut est *"paid"*.

- Affichez les produits dont le prix est strictement supérieur à 100€.

- Affichez les produits dont le prix est inférieur à 20€.

- Affichez les commandes dont le statut est "*paid"* ou *"shipped"*.

- Listez les produits qui ont un *stock supérieur à 10* et un *prix inférieur à 50€*.

- Listez les utilisateurs qui sont administrateurs ou ont un email se terminant par @gmail.com.

## Niveau 2

- Trouvez tous les produits qui ont un stock entre 10 et 50 unités et un prix entre 20€ et 150€.

- Affichez toutes les commandes dont le total est supérieur à 300€ et le statut est *"paid"* ou *"shipped"*.

- Listez les utilisateurs qui ne sont pas admin et ont un email contenant gmail.com.

- Récupèrez les produits dont la catégorie appartient à une liste spécifique d'_id (ex. catégories "Vêtements" ou "Livres"), en utilisant *$in*.

- Trouvez toutes les commandes dont la ville de livraison est "Paris" et le statut est "paid".

- Trouvez tous les utilisateurs qui sont admin ou ont un compte créé il y a moins de 10 jours.

## Niveau 3 (bonus)

- Jointure entre *orders* et *users* pour afficher :
    - l’email et le nom de l’utilisateur
    - le total et la date de la commande

- Affichez combien de commandes ont été *paid*, *shipped*, *pending*, etc.

- Calculez la somme des ventes (total) par jour (extraire la date depuis createdAt).

- Détaillez les produits vendus dans *orders.products* puis calculez combien de fois chaque produit a été commandé au total.