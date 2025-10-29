// ------- FONCTIONS

function onClickItem(event)
{
    /*
     * event.currentTarget représente la balise qui a déclenché l'évènement
     * sur lequel on a installé le gestionnaire d'évènement de clic.
     */

    // 1- Récupération du fichier (le <li>) qui a déclenché l'évènement.
    // 2- Activation ou désactivation de la classe CSS de sélection.
    event.currentTarget.classList.toggle('selected');
    // 3- Recherche de tous les éléments sélectionnés.
    let selected = document.querySelectorAll('.selected');
    // 4- Mise à jour du message indiquant le nombre de fichiers sélectionnés.
    switch (selected.length) {
        case 0:
            paragraphe.innerHTML = 'Aucune sélection';
            break;
        case 1:
            paragraphe.innerHTML = '1 fichier sélectionné';
            break;
        case 2:
            paragraphe.innerHTML = '2 fichiers sélectionnés';
            break;
        case 3:
            paragraphe.innerHTML = '3 fichiers sélectionnés';
            break;
        default:
            break;
    };
};


// ------- CODE PRINCIPAL -------

// 1- Recherche de tous les <li> de la liste de fichiers.
let folders = document.querySelectorAll('li');
// 2- Recherche du paragraphe <p> affichant le nombre d'éléments sélectionnés.
let paragraphe = document.querySelector('p');
// 3- Boucle sur la liste de fichiers pour installer un gestionnaire d'évènement de clic (fonction onClickItem).
folders.forEach(folder => {
    folder.addEventListener('click', onClickItem);
})