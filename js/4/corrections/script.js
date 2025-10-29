/**** Message retardé ****/

// 1 - Crée une page HTML contenant un paragraphe vide <p id="message"></p>.
// 2 - Lorsque la page est chargée, fais apparaître dans ce paragraphe le texte :
    // "Bienvenue sur la page !"
    // Mais 3 secondes après le chargement.
// Bonus - Ajoute un bouton "Relancer" qui efface le message et recommence le délai.

let message = document.querySelector('#message');
let bouton = document.querySelector('#relancer');

function afficherMessage() {
message.textContent = "Bienvenue sur la page !";
}

function lancerDelai() {
message.textContent = "";
// `setTimeout()` prend deux arguments : Une fonction à exécuter et un temps d’attente en millisecondes avant l’exécution.
setTimeout(afficherMessage, 3000); // Lance après 3 secondes
}

bouton.addEventListener('click', lancerDelai);

// Lance automatiquement au chargement
lancerDelai();


/**** Compte à rebours ****/

// 1 - Crée un bouton "Lancer le compte à rebours" et un <span id="compteur"></span>.
// 2 - Quand on clique sur le bouton :
    // Le compteur démarre à 10.
    // Il diminue de 1 chaque seconde.
    // Quand il atteint 0, le message "C’est parti !" s’affiche.
    // Le compte à rebours s’arrête automatiquement.
// Bonus - Ajoute un second bouton "Annuler" pour stopper le compte à rebours avant la fin.

let compteur = document.querySelector('#compteur');
let start = document.querySelector('#start');
let stop = document.querySelector('#stop');
let intervalId;

start.addEventListener('click', function() {
let temps = 10;
compteur.textContent = temps;

// `setInterval()` exécute une fonction en boucle toutes les X millisecondes (1000 ici).
intervalId = setInterval(function() {
    temps--;
    compteur.textContent = temps;

    if (temps === 0) {
    // clearInterval() arrête cette boucle.
    clearInterval(intervalId);
    compteur.textContent = "C’est parti !";
    }
}, 1000);
});

stop.addEventListener('click', function() {
clearInterval(intervalId);
});


/**** Carré grandissant ****/

// 1 - Crée un <div id="carre"></div>.
// 2 - Crée un bouton "Agrandir".
// 3 - Au clic sur le bouton :
    // La taille du carré augmente de 5px toutes les 100 ms.
    // Lorsqu’il atteint 200px, l’animation s’arrête.
// Bonus - Ajoute un second bouton "Réinitialiser" qui remet le carré à sa taille initiale.

let carre = document.querySelector('#carre');
let agrandir = document.querySelector('#agrandir');
let reset = document.querySelector('#reset');
let taille = 50;
let intervalId2;

agrandir.addEventListener('click', function() {
clearInterval(intervalId2);
intervalId2 = setInterval(function() {
    taille += 5;
    carre.style.width = taille + "px";
    carre.style.height = taille + "px";

    if (taille >= 200) {
    clearInterval(intervalId2);
    }
}, 100);
});

reset.addEventListener('click', function() {
clearInterval(intervalId2);
taille = 50;
carre.style.width = carre.style.height = "50px";
});


/**** Mouvement fluide avec requestAnimationFrame() ****/

// 1 - Crée un carré <div id="carre"></div> avec l'id "carre" :
// 2 - Crée deux boutons :
    // "Démarrer l’animation"
    // "Arrêter l’animation"
// 3 - Lorsqu’on clique sur "Démarrer" :
    // Le carré se déplace vers la droite (jusqu’à 400px).
    // L’animation doit être fluide grâce à requestAnimationFrame().
// 4 - Lorsqu’on clique sur « Arrêter », l’animation s’arrête immédiatement (utilise cancelAnimationFrame()).
// Bonus - Fais repartir le carré du début s’il atteint le bord droit.

let carre2 = document.querySelector('#carre');
let demarrer = document.querySelector('#demarrer');
let arreter = document.querySelector('#arreter');
let position = 0;
let animationId;

function animer() {
position += 3;
carre2.style.left = position + "px";

if (position < 400) {
    // requestAnimationFrame() demande au navigateur d’exécuter une fonction avant le prochain rafraîchissement d’écran, généralement 60 fois par seconde.
    animationId = requestAnimationFrame(animer);
}
}

demarrer.addEventListener('click', function() {
cancelAnimationFrame(animationId);
position = 0;
animationId = requestAnimationFrame(animer);
});

arreter.addEventListener('click', function() {
cancelAnimationFrame(animationId);
});


/**** Bonus - Défilement automatique ****/

// 1 - Crée un <div id="balle"></div> avec l'id "balle" :
// 2 - L’animation doit faire se déplacer la balle de gauche à droite. Lorsqu’elle atteint le bord droit, elle revient en arrière (effet ping-pong).
// 3 - La vitesse doit être ajustable avec une variable vitesse.
// Bonus 1 - Ajoute des boutons « Plus vite » et « Moins vite » pour ajuster la vitesse en direct.
// Bonus 2 - Change la couleur de la balle à chaque rebond.

let balle = document.querySelector('#balle');
let vitesse = 3;
let position2 = 0;
let direction = 1; // 1 = droite, -1 = gauche
let animationId2;

function animer() {
position2 += vitesse * direction;
balle.style.left = position2 + "px";

if (position2 >= 400 || position2 <= 0) {
    direction *= -1;
    balle.style.backgroundColor =
    '#' + Math.floor(Math.random() * 16777215).toString(16); // Couleur aléatoire
}

animationId2 = requestAnimationFrame(animer);
}

animer(); // démarre automatiquement

document.querySelector('#plusVite').addEventListener('click', () => vitesse++);
document.querySelector('#moinsVite').addEventListener('click', () => vitesse = Math.max(1, vitesse - 1));