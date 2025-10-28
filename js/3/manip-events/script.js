/**** Premier événement : le clic ****/

// 1 - Sélectionne le bouton avec son ID.
// 2 - Ajoute un écouteur d’événement click dessus.
// 3 - Affiche "Bouton cliqué !" dans la console.


/**** Utiliser event.target et event.type ****/

// 1 - Dans la fonction de ton écouteur, récupère l’objet event.
// 2 - Affiche dans la console :
    // - la cible (event.target)
    // - et le type d’événement (event.type)


/**** Annuler un comportement par défaut ****/

// 1 - Sélectionne le lien avec son ID.
// 2 - Crée un écouteur click dessus.
// 3 - Utilise event.preventDefault() pour bloquer la navigation.
// 4 - Affiche "Navigation annulée" dans la console.


/**** Récupérer le texte d’un champ ****/

// 1 - Sélectionne le champ de texte #champ.
// 2 - Ajoute un écouteur keyup (chaque fois qu’on relâche une touche).
// 3 - Récupère la valeur tapée (event.target.value).
// 4 - Affiche-la dans le paragraphe #message.


/**** Stopper la propagation ****/

// 1 - Sélectionne la div avec l’id zone.
// 2 - Ajoute-lui un écouteur click qui affiche "Clic sur la zone".
// 3 - Dans le bouton, ajoute un autre écouteur click qui :
    // - affiche "Clic sur le bouton"
    // - puis utilise event.stopPropagation()
// Quand tu cliques sur le bouton, seul le message du bouton apparaît. Sans stopPropagation(), les deux s’afficheraient.


/**** Petit défi bonus ****/

// 1 - Au clic sur le bouton :
    // - change le texte du paragraphe #message en "Tu as cliqué sur le bouton !"
    // - et change la couleur du texte (par exemple en rouge)