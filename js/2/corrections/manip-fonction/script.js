/**** Déclaration et appel simple ****/

// 1 - Crée une fonction 'direBonjour()' qui affiche "Bonjour à tous !" dans la console.
function direBonjour() {
  console.log("Bonjour à tous !");
}
// 2 - Appelle cette fonction plusieurs fois dans ton code.
direBonjour();
direBonjour();
direBonjour();


/**** Fonction avec paramètres ****/

// 1 - Crée une fonction 'direBonjourPrenom(prenom)' qui affiche : "Bonjour, [prénom] !"
function direBonjourPrenom(prenom) {
  console.log("Bonjour, " + prenom + " !");
}
// 2 - Appelle la fonction plusieurs fois avec différents prénoms (ex. "Alice", "Lucas", "Samira").
direBonjourPrenom("Alice");
direBonjourPrenom("Lucas");
direBonjourPrenom("Samira");


/**** Fonction avec plusieurs paramètres ****/

// 1 - Crée une fonction afficherNomComplet(prenom, nom) qui affiche le nom complet dans la console. Exemple : afficherNomComplet("Emma", "Dubois"); → affiche "Emma Dubois".
function afficherNomComplet(prenom, nom) {
  console.log(prenom + " " + nom);
}
afficherNomComplet("Emma", "Dubois");
// 2 - Ajoute un troisième paramètre age et affiche : "Bonjour, je m'appelle Emma Dubois et j'ai 20 ans."
function afficherNomComplet(prenom, nom, age) {
  console.log(
    "Bonjour, je m'appelle " + prenom + " " + nom + " et j'ai " + age + " ans."
  );
}
afficherNomComplet("Emma", "Dubois", 20);


/**** Fonctions avec valeur de retour ****/

// 1 - Crée une fonction addition(a, b) qui retourne la somme de a et b.
function addition(a, b) {
  return a + b; // renvoie la somme
}
// 2 - Stocke le résultat dans une variable resultat et affiche-le dans la console.
let resultat = addition(10, 15);
console.log("Résultat de l'addition : " + resultat);
// 3 - Crée une fonction moyenne(a, b, c) qui retourne la moyenne de trois nombres.
function moyenne(a, b, c) {
  return (a + b + c) / 3;
}
// 4 - Affiche le résultat dans la console avec un message explicite.
let resultatMoyenne = moyenne(10, 15, 20);
console.log("La moyenne des trois nombres est : " + resultatMoyenne);


/**** Chaînage et réutilisation de fonctions ****/

// 1 - Réutilise ta fonction addition(a, b) pour créer une fonction additionTriple(a, b, c) qui retourne la somme des trois nombres.
    // Indice : tu peux appeler addition() à l’intérieur d’une autre fonction !
function additionTriple(a, b, c) {
  return addition(addition(a, b), c); // réutilise addition()
}
// 2 - Teste avec plusieurs valeurs et affiche le résultat.
console.log(additionTriple(2, 3, 5)); // 10
console.log(additionTriple(10, 20, 30)); // 60


/**** Petit défi bonus ****/

// 1 - Crée une fonction presentation(prenom, age) qui retourne une phrase complète :
function presentation(prenom, age) {
  return "Bonjour, je m'appelle " + prenom + " et j'ai " + age + " ans.";
}
// 2 - Appelle-la plusieurs fois et affiche le résultat dans la console.
console.log(presentation("Alice", 25));
console.log(presentation("Lucas", 17));
console.log(presentation("Samira", 30));


/**** Encore du bonus ****/

// 1 - Crée une fonction estMajeur(age) qui retourne true si l’âge est ≥ 18, sinon false.
function estMajeur(age) {
  return age >= 18; // true si ≥ 18, sinon false
}
// 2 - Utilise cette fonction dans presentation() pour compléter la phrase : "Je suis majeur" ou "Je suis mineur".
function presentationAvecMajeur(prenom, age) {
  let majeurOuMineur = estMajeur(age) ? "Je suis majeur." : "Je suis mineur.";
  return (
    "Bonjour, je m'appelle " +
    prenom +
    ", j'ai " +
    age +
    " ans. " +
    majeurOuMineur
  );
}

// Tests
console.log(presentationAvecMajeur("Alice", 25)); // majeur
console.log(presentationAvecMajeur("Lucas", 17)); // mineur
console.log(presentationAvecMajeur("Samira", 30)); // majeur