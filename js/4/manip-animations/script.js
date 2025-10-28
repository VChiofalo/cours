/**** Message retardé ****/

// 1 - Crée une page HTML contenant un paragraphe vide <p id="message"></p>.
// 2 - Lorsque la page est chargée, fais apparaître dans ce paragraphe le texte :
    // "Bienvenue sur la page !"
    // Mais 3 secondes après le chargement.
// Bonus - Ajoute un bouton "Relancer" qui efface le message et recommence le délai.


/**** Compte à rebours ****/

// 1 - Crée un bouton "Lancer le compte à rebours" et un <span id="compteur"></span>.
// 2 - Quand on clique sur le bouton :
    // Le compteur démarre à 10.
    // Il diminue de 1 chaque seconde.
    // Quand il atteint 0, le message "C’est parti !" s’affiche.
    // Le compte à rebours s’arrête automatiquement.
// Bonus - Ajoute un second bouton "Annuler" pour stopper le compte à rebours avant la fin.


/**** Carré grandissant ****/

// 1 - Crée un <div id="carre"></div> (taille de départ 50px × 50px, couleur au choix).
// 2 - Crée un bouton "Agrandir".
// 3 - Au clic sur le bouton :
    // La taille du carré augmente de 5px toutes les 100 ms.
    // Lorsqu’il atteint 200px, l’animation s’arrête.
// Bonus - Ajoute un second bouton "Réinitialiser" qui remet le carré à sa taille initiale.


/**** Mouvement fluide ****/

// 1 - Crée un carré rouge <div id="carre"></div> avec l'id "carre" :
// 2 - Crée deux boutons :
    // "Démarrer l’animation"
    // "Arrêter l’animation"
// 3 - Lorsqu’on clique sur "Démarrer" :
    // Le carré se déplace vers la droite (jusqu’à 400px).
    // L’animation doit être fluide grâce à requestAnimationFrame().
// 4 - Lorsqu’on clique sur « Arrêter », l’animation s’arrête immédiatement (utilise cancelAnimationFrame()).
// Bonus - Fais repartir le carré du début s’il atteint le bord droit.


/**** Bonus - Défilement automatique ****/

// 1 - Crée un <div id="balle"></div> avec l'id "balle" :
// 2 - L’animation doit faire se déplacer la balle de gauche à droite. Lorsqu’elle atteint le bord droit, elle revient en arrière (effet ping-pong).
// 3 - La vitesse doit être ajustable avec une variable vitesse.
// Bonus 1 - Ajoute des boutons « Plus vite » et « Moins vite » pour ajuster la vitesse en direct.
// Bonus 2 - Change la couleur de la balle à chaque rebond.