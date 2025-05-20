# Introduction à MongoDB

![Bannière mongoDB](img/mongodb.png "Bannière mongoDB"){ style="display: block; margin: 0 auto" }

## Contexte d'émergence du NoSQL

Les bases de données **NoSQL** ont émergé pour répondre à un double besoin :

-   **Exploiter efficacement** des données massives (Big Data)
-   **Monétiser** cette exploitation, notamment dans les entreprises technologiques

Au début des années 2000, les bases relationnelles étaient jugées **trop rigides** et leur **coût explosait** dès qu'on les utilisait sur plusieurs machines en parallèle.

Les données modernes sont très diverses :

-   Audio
-   Vidéo
-   Images
-   Coordonnées géographiques
-   Textes, etc.

### SQL vs NoSQL

**MongoDB** et **MySQL** sont deux systèmes de **gestion de base de données** que vous pouvez utiliser pour stocker et gérer des données. MySQL est un système de **base de données relationnelle** qui stocke les données dans un format **tabulaire structuré**. En revanche, MongoDB stocke les données sous forme de **documents JSON** dans un format plus flexible. Les deux offrent des performances et une capacité de mise à l'échelle, mais ils offrent de meilleures performances pour des cas d'utilisation différents.

#### Modèle de données

MySQL est un système de base de données relationnelle qui stocke les données dans des colonnes, des lignes et des tableaux. Vous stockez les données dans des lignes, chaque colonne représentant un type de données différent. Vous définissez ensuite les relations entre les données à l'aide de clés étrangères et de clés primaires. Chaque tableau possède une clé primaire que vous utilisez pour l'identifier, la clé étrangère créant une relation.

MongoDB est une base de données orientée document qui stocke toutes ses données sous forme de documents binaires JSON (BSON). BSON vous permet de sérialiser de nombreuses formes de données. L'utilisation de documents BSON vous permet de stocker des données non structurées, semi-structurées et structurées. Au lieu d'un schéma de base de données, MongoDB utilise une approche flexible et stocke les documents dans des collections.

#### Performance

MySQL est conçu pour créer des jonctions performantes entre plusieurs tableaux correctement indexés. Toutefois, les données doivent être insérées ligne par ligne, ce qui ralentit les performances d'écriture.

Les documents MongoDB suivent un modèle de données hiérarchique et conservent la plupart des données dans un seul document, réduisant ainsi le besoin de jonctions entre plusieurs documents. Les jonctions sont prises en charge via l'opération $lookup, mais elles ne sont pas optimisées en termes de performances. Cependant, MongoDB propose une API insertMany() pour insérer rapidement des données, en donnant la priorité aux performances d'écriture.

#### Flexibilité

En tant que système de gestion de base de données relationnelle, MySQL possède une structure plus rigide que MongoDB. MySQL utilise un schéma fixe et organise les données en lignes et en tableaux. Vous devez structurer les données et les intégrer dans un système tabulaire pour utiliser MySQL. 

En stockant les données sous forme de documents JSON, MongoDB vous permet de créer des applications complexes avec de nombreux types de données distincts. Par exemple, vous pouvez créer de nouveaux champs en mettant à jour les champs imbriqués d'un tableau.