/*
 * L'objectif de l'exercice est de permettre de changer l'image de l'ampoule par une
 * ampoule allumée ou éteinte, au fur et à mesure qu'on clique sur le bouton à côté.
 * Le bouton doit également changer avec l'action qui va se produire si on clique dessus.
 */

// ---- VARIABLES ET CONSTANTES GLOBALES

let lightbulb = document.querySelector('#lightbulb');          // L'objet DOM représentant la balise <img>
let toggleButton = document.querySelector('#toggle-button')       // L'objet DOM représentant la balise <button>


// ---- FONCTIONS
function onOff() {
    if (lightbulb.src.includes('off.png')) {
        lightbulb.setAttribute('src', './images/on.png');
    } else {
        lightbulb.setAttribute('src', './images/off.png');
    }
}


// ---- CODE PRINCIPAL

toggleButton.addEventListener('click', onOff);