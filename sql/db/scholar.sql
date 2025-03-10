-- Création de la base de données scholar
CREATE DATABASE IF NOT EXISTS scholar;

-- Sélection de la base de données à utiliser
USE scholar;

-- Création de la table `student` avec l'âge et la ville de résidence
CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,  
    first_name VARCHAR(50) NOT NULL,            
    last_name VARCHAR(50) NOT NULL,             
    age INT NOT NULL,                          
    average_grade DECIMAL(4,2),                 
    email VARCHAR(100),                         
    phone_number VARCHAR(20),                   
    city VARCHAR(50) NOT NULL                   
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Création de la table `department`
CREATE TABLE department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,  
    department_name VARCHAR(100) NOT NULL          
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertion des départements
INSERT INTO department (department_name) VALUES
('Informatique'),
('Mathématiques'),
('Biologie'),
('Chimie');

-- Création de la table `subject`
CREATE TABLE subject (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,  
    subject_name VARCHAR(100) NOT NULL,         
    department_id INT,                          
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertion des matières pour chaque spécialisation
INSERT INTO subject (subject_name, department_id) VALUES
('Programmation', 1),
('Réseaux', 1),
('Algèbre', 2),
('Calcul différentiel', 2),
('Biologie Cellulaire', 3),
('Génétique', 3),
('Chimie Organique', 4),
('Chimie Physique', 4);

-- Création de la table `student_department` (lien entre étudiants et départements)
CREATE TABLE student_department (
    student_id INT,                             
    department_id INT,                          
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, department_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Création de la table `note`
CREATE TABLE note (
    note_id INT AUTO_INCREMENT PRIMARY KEY,     
    student_id INT,                             
    subject_id INT,                             
    grade DECIMAL(4,2),                         
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertion d'étudiants avec des âges compris entre 18 et 60 ans, villes aléatoires et autres données
INSERT INTO student (first_name, last_name, age, average_grade, email, phone_number, city) VALUES
('Alice', 'Dupont', 22, 14.75, 'alice.dupont@mail.com', '0601020304', 'Paris'),
('Bob', 'Martin', 23, 12.60, 'bob.martin@mail.com', '0602030405', 'Toulouse'),
('Claire', 'Lemoine', 24, 16.20, 'claire.lemoine@mail.com', '0603040506', 'Lyon'),
('David', 'Berger', 25, 10.85, 'david.berger@mail.com', '0604050607', 'Rennes'),
('Eva', 'Dufresne', 19, 13.50, 'eva.dufresne@mail.com', '0605060708', 'Paris'),
('François', 'Petit', 30, 15.40, 'francois.petit@mail.com', '0606070809', 'Lyon'),
('Giselle', 'Roche', 21, 11.90, 'giselle.roche@mail.com', '0607080901', 'Toulouse'),
('Hugo', 'Renard', 26, 14.20, 'hugo.renard@mail.com', '0608091011', 'Rennes'),
('Isabelle', 'Marchand', 32, 17.30, 'isabelle.marchand@mail.com', '0609101112', 'Paris'),
('Jules', 'Gautier', 27, 9.75, 'jules.gautier@mail.com', '0610111213', 'Lyon'),
('Léo', 'Benoit', 25, 12.30, null, '0601121314', 'Toulouse'),
('Mia', 'Bouvier', 21, 16.10, 'mia.bouvier@mail.com', '0602233445', 'Rennes'),
('Noah', 'Brunet', 23, 18.30, 'noah.brunet@mail.com', '0603344556', 'Paris'),
('Olivia', 'Durand', 22, 14.95, 'olivia.dufresne@mail.com', '0604455667', 'Toulouse'),
('Paul', 'Lemoine', 28, 13.75, null, '0605566778', 'Lyon'),
('Quentin', 'Roussel', 24, 15.20, 'quentin.roussel@mail.com', '0606677889', 'Rennes'),
('Rachelle', 'Petit', 19, 14.40, 'rachelle.petit@mail.com', '0607788990', 'Paris'),
('Sophie', 'Jacques', 29, 16.50, 'sophie.jacques@mail.com', '0608899001', 'Lyon'),
('Théo', 'Lefevre', 21, 11.20, 'theo.lefevre@mail.com', '0609900112', 'Toulouse'),
('Alice', 'Lemoine', 22, 13.00, 'alice.lemoine100@mail.com', '0612345678', 'Paris'),
('Bastien', 'Laurent', 32, 15.80, 'bastien.laurent@mail.com', '0612345679', 'Lyon'),
('Charlotte', 'Dupuis', 27, 18.50, null, '0612345680', 'Rennes'),
('Dylan', 'Chauvet', 24, 12.75, 'dylan.chauvet@mail.com', '0612345681', 'Toulouse'),
('Eva', 'Morin', 25, 14.80, 'eva.morin@mail.com', '0612345682', 'Paris'),
('Frédéric', 'Vallet', 26, 17.10, 'frederic.vallet@mail.com', '0612345683', 'Lyon'),
('Géraldine', 'Brune', 23, 13.40, 'geraldine.brune@mail.com', '0612345684', 'Toulouse'),
('Hugo', 'Tissot', 30, 15.10, 'hugo.tissot@mail.com', '0612345685', 'Rennes'),
('Inès', 'Gallet', 21, 12.60, 'ines.gallet@mail.com', '0612345686', 'Paris'),
('Jérôme', 'Giraud', 29, 13.90, 'jerome.giraud@mail.com', '0612345687', 'Lyon'),
('Kélian', 'Dufresne', 23, 14.70, 'kelian.dufresne@mail.com', '0612345688', 'Rennes'),
('Léa', 'Leblanc', 22, 12.80, null, '0612345689', 'Toulouse'),
('Marion', 'Besson', 28, 15.30, 'marion.besson@mail.com', '0612345690', 'Paris'),
('Nicolas', 'Leclerc', 25, 13.60, 'nicolas.leclerc@mail.com', '0612345691', 'Lyon'),
('Océane', 'Lemoine', 24, 14.10, 'oceane.lemoine@mail.com', '0612345692', 'Toulouse'),
('Maxime', 'Dumas', 30, 12.50, null, '0612345693', 'Rennes'),
('Raphaël', 'Germain', 32, 16.90, 'raphael.germain@mail.com', '0612345694', 'Paris'),
('Sébastien', 'Vidal', 27, 14.00, 'sebastien.vidal@mail.com', '0612345695', 'Lyon'),
('Théodore', 'Chavanne', 31, 16.20, 'theodore.chavanne@mail.com', '0612345696', 'Rennes'),
('Yasmine', 'Lemoine', 22, 14.30, 'yasmine.lemoine@mail.com', '0612345697', 'Toulouse');

-- Associer les étudiants aux départements
INSERT INTO student_department (student_id, department_id) VALUES
(1, 1), (2, 2), (3, 2), (4, 3), (5, 3), (6, 4), 
(7, 1), (8, 2), (9, 3), (10, 4),
(11, 1), (12, 2), (13, 3), (14, 4), (15, 1),
(16, 2), (17, 3), (18, 4), (19, 1), (20, 2);

-- Insertion des notes des étudiants pour les différentes matières
INSERT INTO note (student_id, subject_id, grade) VALUES
(1, 1, 15.50), (1, 2, 14.00), (2, 3, 11.50), (2, 4, 13.20),
(3, 3, 18.00), (3, 4, 16.00), (4, 5, 9.00), (4, 6, 10.50),
(5, 5, 14.00), (5, 6, 12.00), (6, 7, 16.00), (6, 8, 14.50),
(7, 1, 14.80), (7, 2, 13.70), (8, 3, 13.30), (8, 4, 15.20),
(9, 5, 17.60), (9, 6, 18.00), (10, 7, 10.50), (10, 8, 11.70);

-- Affichage des données insérées pour vérification
SELECT * FROM student;
SELECT * FROM department;
SELECT * FROM subject;
SELECT * FROM note;