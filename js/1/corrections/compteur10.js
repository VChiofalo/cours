// Créez un programme qui décomptera de 50 à 10 de cinq en cinq
let compteur = 50;

while (compteur >= 10) {
  console.log(compteur);
  compteur -= 5; // décrémente de 5 à chaque itération
}

// OU

for (let i = 50; i >= 10; i-=5) {
  console.log(i);
}