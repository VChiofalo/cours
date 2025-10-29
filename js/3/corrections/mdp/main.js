/*
 * L'objectif de l'exercice est d'avoir un champ de saisie de mot de passe
 * qui donne la possibilité d'afficher la saisie par le biais d'une icône sur
 * laquelle on clique (typiquement un oeil qui s'ouvre puis se ferme). C'est
 * important d'un point de vue UX afin de permettre l'utilisateur de vérifier
 * sa saisie surtout lorsque celle-ci est complexe (majuscules puis minuscules, etc).
 */

// ---- VARIABLES ET CONSTANTES GLOBALES

let icon = document.querySelector('i');       // L'objet DOM représentant la balise <i>
let input = document.querySelector('#login');      // L'objet DOM représentant la balise <input>

// ---- FONCTIONS
function displayPassword() {
    if (icon.classList.contains('fa-eye-slash')) {
        input.type = 'text';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    }
}

// ---- CODE PRINCIPAL

icon.addEventListener('click', displayPassword);