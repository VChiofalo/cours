// Créez un compteur de 0 à 100 qui incrémentera de 10 en 10
let compteur = 0;

while (compteur <= 100) {
  console.log(compteur);
  compteur += 10; // incrémente de 10 à chaque itération
}

// OU

for (let i = 0; i <= 100; i+=10) {
    console.log(i);
}