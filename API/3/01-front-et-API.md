# Échanges de données entre frontend et API : formats et méthodes

Dans une application web moderne, le **frontend** (interface utilisateur) et le *backend* (API) doivent communiquer pour afficher des informations, envoyer des données ou déclencher des actions. Ces échanges se font via le protocole HTTP et utilisent des formats standardisés pour que les données soient comprises par les deux parties.

Les formats les plus courants sont **JSON** et **XML**. JSON est léger, facile à lire et à manipuler avec JavaScript, tandis que XML est plus verbeux et structuré, souvent utilisé dans des environnements d’entreprise ou pour des API anciennes.

Pour effectuer ces échanges, le frontend dispose de plusieurs méthodes : les **requêtes AJAX**, qui existent depuis longtemps, et la plus récente **Fetch API**, qui simplifie grandement la récupération et l’envoi de données. Comprendre ces formats et méthodes est essentiel pour créer des applications interactives, performantes et maintenables.

## Formats de données pour l’échange avec une API

Les API utilisent des formats standard pour que le frontend et le backend puissent c**omprendre et manipuler les mêmes données**.

### JSON

JSON (JavaScript Object Notation) est le format le plus courant. Il est **léger**, **facile à lire** et **à écrire**, et s’intègre parfaitement avec JavaScript.
Exemple d’objet JSON représentant un Pokémon
```json
{
  "id": 1,
  "name": "Bulbasaur",
  "types": ["grass", "poison"],
  "stats": {
    "hp": 45,
    "attack": 49
  }
}

```
Avec JavaScript, on peut facilement transformer ce JSON en objet utilisable :
```js
const pokemon = JSON.parse(jsonString);
console.log(pokemon.name); // "Bulbasaur"
```

### XML

XML (Extensible Markup Language) est plus verbeux et structuré, utilisé dans certaines entreprises ou pour des API anciennes :
```xml
<pokemon>
  <id>1</id>
  <name>Bulbasaur</name>
  <types>
    <type>grass</type>
    <type>poison</type>
  </types>
</pokemon>
```
Il faut généralement un parser pour convertir XML en objets utilisables côté JavaScript.

**Comparaison JSON vs XML**:
- JSON : léger, facile à manipuler avec JavaScript, très répandu.
- XML : plus lourd, permet des structures complexes, utilisé pour certaines intégrations legacy.

## Méthodes d’échange de données côté frontend

### AJAX et XMLHttpRequest

Avant l’avènement de Fetch, on utilisait **AJAX** avec ```XMLHttpRequest``` pour interroger une API sans recharger la page :
```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/1");
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data.name); // Bulbasaur
  }
};
xhr.send();
```
Même si cela fonctionne, la syntaxe est **verbeuse** et **moins intuitive** que Fetch.

### Fetch API

La **Fetch API** simplifie les requêtes. Elle repose sur des **promises** et permet de chaîner les opérations facilement :
```js
fetch("https://pokeapi.co/api/v2/pokemon/1")
  .then(res => res.json())
  .then(data => console.log(data.name))
  .catch(err => console.error("Erreur :", err));
```
```.then()``` : récupère la réponse quand elle est prête.
```.catch()``` : capture les erreurs (réseau, endpoint inexistant…).

### Méthodes HTTP et actions côté frontend

Les actions d’une API se basent sur les méthodes HTTP :
- ```GET``` : récupérer des données (ex: la fiche d’un Pokémon).
- ```POST``` : envoyer des données pour créer une ressource (ex: ajouter un joueur).
- ```PUT``` / ```PATCH``` : modifier une ressource existante (ex: mettre à jour un score).
- ```DELETE``` : supprimer une ressource (ex: effacer un joueur).

Exemple :
```js
fetch("https://monapi.com/players", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Pikachu", level: 5 })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

### Gestion des erreurs et des statuts HTTP côté frontend

Pour savoir si une requête a réussi, on peut vérifier la propriété ```res.ok``` ou le **code HTTP** :
```js
fetch("https://pokeapi.co/api/v2/pokemon/99999")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
```
```res.ok``` : true si le statut est 200–299.
```.catch() ```: capture toutes les erreurs réseau ou les exceptions levées.

Cette pratique permet de **gérer proprement les erreurs** côté frontend et d’afficher un message utilisateur clair.

### Appels multiples et optimisation

Pour interroger **plusieurs endpoints en parallèle**, on peut utiliser ```Promise.all``` :
```js
const urls = [
  "https://pokeapi.co/api/v2/pokemon/1",
  "https://pokeapi.co/api/v2/pokemon/2"
];

Promise.all(urls.map(url => fetch(url).then(res => res.json())))
  .then(results => {
    results.forEach(pokemon => console.log(pokemon.name));
  })
  .catch(err => console.error(err));
```
Cela permet de **réduire le temps total de récupération** quand plusieurs ressources sont nécessaires. Chaque promesse est indépendante, mais on récupère toutes les réponses ensemble.

---

© Vincent Chiofalo