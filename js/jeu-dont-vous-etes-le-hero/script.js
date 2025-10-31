// == Variables scènes ==

let texteForet = 'Le héros poursuit un ogre monstrueux qui a enlevé la fille du forgeron. Il l\'a suivie jusque dans une forêt dense et inquiétante. Les arbres étouffent la lumière et chaque craquement de branche lui rappelle la présence de l\'ogre et le danger pour la jeune fille. Vous avancez à pas silencieux dans la forêt, vos yeux scrutant chaque ombre. L\'ogre est proche et, quelque part dans cette obscurité, la fille du forgeron est prisonnière. Devant vous, le chemin se divise : à gauche, une caverne sombre et étroite, d\'où s\'échappent des échos inquiétants. À droite, une construction en pierre ancienne, peut-être un fort ou une tour, qui semble encore habitée.';

let texteTour = 'Après avoir choisi le chemin à droite dans la forêt, le héros arrive devant une tour en pierre ancienne. Malgré son apparence abîmée par le temps, la tour semble habité : de la fumée s\'échappe d\'une cheminée branlante, et on entend des craquements venant de l\'intérieur. L\'air est lourd et chargé de tension. L\'ogre pourrait s\'y trouver, et la fille du forgeron être retenue à l\'intérieur ou à proximité. Vous vous tenez devant la tour. Ses murs sont couverts de lierre, et certaines pierres semblent prêtes à tomber. Pourtant, des signes de vie sont présents : une lumière vacille à travers une fenêtre fissurée et de petits bruits proviennent de l\'intérieur. Devant vous, le chemin se divise à nouveau.';

let texteTourFinie = 'Je n\'ai plus rien à faire ici. Je ferais mieux de retourner en arrière ou d\'avancer vers la clairrière';

let textePrairie = 'Après avoir quitté la tour, le héros s\'avance dans une clairière lugubre. Au bout, un lac noir reflète à peine les arbres environnants. Plus il s\'approche, plus l\'obscurité devient oppressante. Vous avancez dans la clairière. Un lac noir se dessine devant vous, et l\'air devient glacial. Soudain, le noir total vous engloutit. Une force invisible vous attire vers le lac…';

let textePrairieLumiere = 'Une épée scintillante surgit du lac, et une femme fantomatique apparaît, vous poussant doucement vers l\'arme. Votre cœur bat à tout rompre, et vous sentez la présence menaçante derrière vous. Au dernier moment, vous réussissez à vous écarter de la femme fantomatique, utilisant un mouvement rapide et précis. La femme s\'empale sur l\'épée à votre place, disparaissant dans un cri silencieux. Vous récupérez l\'épée et l\'ajoutez à votre inventaire, tremblant mais vivant. Sur la droite, vous appercevez une vieille batisse en bois !';

let textePrairieFinie = 'Je n\'ai plus rien à faire ici. Je ferais mieux d\'aller voir la batisse ou de retourner en arrière !';

let textePrairieMort = 'Le noir total l\'engloutit. Le héros meurt mystérieusement, sans jamais savoir ce qui l\'a frappé.';

let texteBat = 'Après avoir traversé le lac et récupéré l\'épée, le héros arrive devant une vieille bâtisse en bois, délabrée par le temps. Les planches grincent sous le vent, et la structure semble prête à s\'effondrer. En s\'approchant, le héros remarque sur la façade une étrange gravure sur la cheminée, qui semble être une énigme. La bâtisse semble abandonnée depuis des décennies. Cependant, en observant de plus près, vous découvrez une énigme gravée sur la pierre de la cheminée : <br /> "Je suis levé pour protéger, <br /> Je repousse ce qui menace. <br /> Sans moi, le courage ne suffit pas. <br /> Qui suis-je ?"';

let texteBatBouclier = 'La cheminée en pierre s\'ouvre lentement, révélant une cachette secrète. À l\'intérieur se trouve un bouclier en acier, que le héros ajoute à son inventaire. Le héros est désormais mieux protégé pour le combat final contre l\'ogre.';

let texteBatFini = 'Je n\'ai plus rien à faire ici. Il va être temps d\'aller voir ce qu\'il se passe dans la grotte !';

let texteBatMort = 'Une force mystérieuse surgit de la bâtisse, et le héros est instantanément désintégré, disparu dans un éclair de lumière noire.';

let texteMagicien = 'Le héros monte tout en haut de la tour. Au sommet, il découvre un magicien étrange, apparemment fou mais bienveillant. Vous atteignez le sommet de la tour. Devant vous se tient un magicien à l\'allure dégingandée, ses vêtements flottant comme animés par un souffle invisible. Il vous sourit et vous invite à vous asseoir. "Ah, enfin un visiteur !", dit-il d\'une voix chantante. "Prenez donc une collation et une boisson chaude, vous en aurez besoin pour la suite." Après quelques instants, le magicien vous conduit vers le balcon. De là, vous apercevez la caverne sombre de la forêt. "Là-bas vit l\'ogre qui a enlevé la fille du forgeron. Il est féroce et la caverne est truffée de pièges. Aucune lumière ne pénètre dans son antre. Si vous voulez survivre et espérer secourir la jeune fille, vous aurez besoin d\'un objet utile… Mais pour l\'obtenir, vous devez répondre à mon énigme :" <br/> "Je ne peux pas être vue, <br/> mais je guide tous les pas. <br/> Sans moi, le voyageur se perd. <br/> Qui suis-je ?"';

let texteMagicienLumiere = 'Le magicien sourit et vous tend un objet magique lumineux (orbe de lumière), ajouté à votre inventaire. Il explique que cet objet permettra d\'éclairer la caverne et d\'éviter les pièges. Le héros redescend en bas de la tour.';

let texteMagicienMort = 'Le visage du magicien se tord, son rire devient hystérique. Il pousse soudain le héros du balcon. Le héros meurt de la chute, fin dramatique immédiate.';

let texteGrotte = 'Le héros se tient devant l\'entrée de la caverne qu\'il avait repérée depuis la tour. L\'air à l\'intérieur est glacial, et une obscurité totale règne à l\'intérieur. Les murs sont humides et le sol irrégulier, et chaque bruit résonne de façon inquiétante. Vous pénétrez dans la caverne. L\'obscurité est totale, et l\'air est lourd. Le moindre pas est dangereux et les échos de vos mouvements vous font frissonner. Vous savez que l\'ogre vit quelque part plus loin.';

let texteGrotteLumiere = 'La caverne s\'illumine grâce à l\'objet lumineux. Vous pouvez voir clairement le chemin, éviter les pièges et avancer sans encombre. La progression vers le cœur de la caverne et l\'ogre devient possible.';

let texteGrotteMort = 'L\'obscurité totale vous empêche de voir quoi que ce soit. Vous avancez, mais votre pied heurte un trou rempli de pics en bois que vous ne pouviez pas voir. Vous tombez et êtes mortellement blessé, vous êtes mort !';

let texteOgre = 'Le héros arrive dans une grande salle humide et sombre, éclairée par le feu de la marmite bouillante. La fille du forgeron est enfermée dans une cage en bois au fond de la salle. L\'ogre, énorme et menaçant, s\'active autour de sa marmite, certainement pour y préparer un repas macabre. Alors que vous entrez dans la pièce, l\'ogre vous voit Il se redresse, massue à la main, et pousse un grondement guttural. "Ah… un invité imprévu ! Vous allez rejoindre votre amie ici !" Il s\'avance vers vous, sa massue prête à frapper. La tension est à son comble…';

let texteOgreVaincu = 'Le héros attaque avec son épée. L\'ogre tente de l\'éviter et lui assène un coup de massue. Grâce au bouclier, le héros bloque le coup puissant. Profitant de l\'ouverture, il contre-attaque et transperce le cœur de l\'ogre avec son épée. L\'ogre s\'effondre, vaincu. Le héros libère la fille du forgeron de sa cage. Elle est saine et sauve, et l\'aventure se termine triomphalement.';

let texteOgreSansArme = 'Le héros tente de se défendre, mais il est complètement désarmé. L\'ogre l\'attrape sans effort, le ligote et le place dans la marmite avec la fille du forgeron.';

let texteOgreSansBouclier = 'Le héros frappe de toutes ses forces avec son épée. L\'ogre esquive habilement et riposte d\'un violent coup de massue, tuant instantanément le héros !';

// == Variables globales ==

let inventory = [];

// == Fonctions globales ==

// Fonction qui affiche la scène de la mort
function mort() {

    // Met à jour l'image

    // Met à jour le texte

    // Vide les anciens choix
    
}

// Fonction de gestion des images dans l'inventaire

function inventoryImg(item) {
}

// == Fonctions scènes ==

// Fonction qui affiche la scène de la forêt
function sceneForet() {

    // 1. On change l'image pour celle de la forêt

    // 2. On met à jour le texte principal

    // 3. On vide les anciens choix (pour éviter l’accumulation)

    // 4. On crée les nouveaux choix

    // 5. On ajoute les choix à la page
}

// Fonction qui affiche la scène de la tour
function sceneTour() {
}

// Fonction qui affiche la scène de la prairie
function scenePrairie() { 
}

// Fonction qui affiche la scène du bâtiment
function sceneBat() {
}

// Fonction qui affiche la scène du magicien
function sceneMagicien() {
}

function sceneGrotte() {
}

function sceneOgre() {
}

// == Éléments du dom réutilisable ==

// == Code ==

document.addEventListener("DOMContentLoaded", () => {
});