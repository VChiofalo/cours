const bouton = document.querySelector('#action'); // Ici récupére l'élément bouton

bouton.addEventListener('click', () => {
  // Ici, tes différentes manipulations DOM

  // 1 - Modifie le texte du titre principal par "DOM modifié avec JavaScript"
  const titre1 = document.querySelector('h1');
  titre1.textContent = "DOM modifié avec JavaScript";

  // 2 - Modifie la couleur (en bleu) et la taille (18px) du premier paragraphe
  const paragraphePremier = document.querySelector('p');
  paragraphePremier.style.color = "blue";
  paragraphePremier.style.fontSize = "18px";

  // 3 - Ajoute la classe "highlight" à tout les paragraphes qui ont la classe ".texte"
  const paragraphes = document.querySelectorAll('.texte');
  paragraphes.forEach(p => {
    p.classList.add('highlight')
  })

  // 4 - Cache le deuxième paragraphe (ou fait le réappaître)
  paragraphes[1].classList.toggle('hidden');

  // 5 - Ajoute un nouvel élément à la liste existante avec comme texte "Élément ajouté dynamiquement"
  const nouvelElement = document.createElement('li'); // création d'un <li>
  nouvelElement.textContent = "Élément ajouté dynamiquement"; // ajout du texte

  
  document.querySelector('#liste').appendChild(nouvelElement); // ajout à la fin de la liste

  // 6 - Change la source et l'attribut alt de l'image pour afficher la seconde image du dossier img
  const image = document.querySelector('#image');

  image.src = "img/dom.jpg"; // nouvelle source de l'image
  image.alt = "Description de la seconde image"; // nouveau texte alternatif

  // Bonus 1 - Fais changer la couleur du titre à chaque clic avec une couleur aléatoire
  function couleurAleatoire() {
    // génère un code hexadécimal aléatoire, ex : #3FA2BC
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  titre1.style.color = couleurAleatoire();

  // bonus 2 - Alterne entre deux images à chaque clic (pense à commenter ton code pour l'exo 6)
  if (image.src.includes('wit-js.jpg')) {
    image.src = 'img/dom.jpg';
    image.alt = "Seconde image";
  } else {
    image.src = 'img/wit-js.jpg';
    image.alt = "Première image";
  }
});