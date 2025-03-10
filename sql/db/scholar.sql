-- Création de la base de données scholar
CREATE DATABASE IF NOT EXISTS scholar;

-- Sélection de la base de données à utiliser
USE scholar;

-- Création de la table `student`
CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,  
    first_name VARCHAR(50) NOT NULL,            
    last_name VARCHAR(50) NOT NULL,             
    date_of_birth DATE NOT NULL,                
    average_grade DECIMAL(4,2),                 
    email VARCHAR(100),                         
    phone_number VARCHAR(20)                    
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

-- Insertion d'étudiants avec des données aléatoires
INSERT INTO student (first_name, last_name, date_of_birth, average_grade, email, phone_number) VALUES
('Alice', 'Dupont', '2003-01-15', 14.75, 'alice.dupont@mail.com', '0601020304'),
('Bob', 'Martin', '2002-03-20', 12.60, 'bob.martin@mail.com', '0602030405'),
('Claire', 'Lemoine', '2001-09-25', 16.20, 'claire.lemoine@mail.com', '0603040506'),
('David', 'Berger', '2003-02-05', 10.85, 'david.berger@mail.com', '0604050607'),
('Eva', 'Dufresne', '2002-07-10', 13.50, 'eva.dufresne@mail.com', '0605060708'),
('François', 'Petit', '2001-12-30', 15.40, 'francois.petit@mail.com', '0606070809'),
('Giselle', 'Roche', '2003-05-14', 11.90, 'giselle.roche@mail.com', '0607080901'),
('Hugo', 'Renard', '2002-10-02', 14.20, 'hugo.renard@mail.com', '0608091011'),
('Isabelle', 'Marchand', '2001-08-18', 17.30, 'isabelle.marchand@mail.com', '0609101112'),
('Jules', 'Gautier', '2003-04-28', 9.75, 'jules.gautier@mail.com', '0610111213'),
('Léo', 'Benoit', '2003-03-01', 12.30, 'leo.benoit@mail.com', '0601121314'),
('Mia', 'Bouvier', '2002-11-12', 16.10, 'mia.bouvier@mail.com', '0602233445'),
('Noah', 'Brunet', '2003-01-24', 18.30, 'noah.brunet@mail.com', '0603344556'),
('Olivia', 'Durand', '2002-06-17', 14.95, 'olivia.durand@mail.com', '0604455667'),
('Paul', 'Lemoine', '2002-08-21', 13.75, 'paul.lemoine@mail.com', '0605566778'),
('Quentin', 'Roussel', '2002-04-07', 15.20, 'quentin.roussel@mail.com', '0606677889'),
('Rachelle', 'Petit', '2003-09-03', 14.40, 'rachelle.petit@mail.com', '0607788990'),
('Sophie', 'Jacques', '2001-12-09', 16.50, 'sophie.jacques@mail.com', '0608899001'),
('Théo', 'Lefevre', '2003-02-13', 11.20, 'theo.lefevre@mail.com', '0609900112'),
('Alice', 'Lemoine', '2003-03-22', 13.00, 'alice.lemoine100@mail.com', '0612345678'),
('Bastien', 'Laurent', '2002-11-12', 15.80, 'bastien.laurent@mail.com', '0612345679'),
('Charlotte', 'Dupuis', '2001-09-14', 18.50, 'charlotte.dupuis@mail.com', '0612345680'),
('Dylan', 'Chauvet', '2002-12-30', 12.75, 'dylan.chauvet@mail.com', '0612345681'),
('Eva', 'Morin', '2003-05-22', 14.80, 'eva.morin@mail.com', '0612345682'),
('Frédéric', 'Vallet', '2002-10-02', 17.10, 'frederic.vallet@mail.com', '0612345683'),
('Géraldine', 'Brune', '2003-06-10', 13.40, 'geraldine.brune@mail.com', '0612345684'),
('Hugo', 'Tissot', '2001-07-17', 15.10, 'hugo.tissot@mail.com', '0612345685'),
('Inès', 'Gallet', '2003-05-07', 12.60, 'ines.gallet@mail.com', '0612345686'),
('Jérôme', 'Giraud', '2002-10-25', 13.90, 'jerome.giraud@mail.com', '0612345687'),
('Kélian', 'Dufresne', '2002-03-17', 14.70, 'kelian.dufresne@mail.com', '0612345688'),
('Léa', 'Leblanc', '2003-01-30', 12.80, 'lea.leblanc@mail.com', '0612345689'),
('Marion', 'Besson', '2002-06-20', 15.30, 'marion.besson@mail.com', '0612345690'),
('Nicolas', 'Leclerc', '2002-08-14', 13.60, 'nicolas.leclerc@mail.com', '0612345691'),
('Océane', 'Lemoine', '2003-05-01', 14.10, 'oceane.lemoine@mail.com', '0612345692'),
('Maxime', 'Dumas', '2003-11-10', 12.50, 'maxime.dumas@mail.com', '0612345693'),
('Raphaël', 'Germain', '2001-12-21', 16.90, 'raphael.germain@mail.com', '0612345694'),
('Sébastien', 'Vidal', '2002-11-19', 14.00, 'sebastien.vidal@mail.com', '0612345695'),
('Théodore', 'Chavanne', '2002-01-15', 16.20, 'theodore.chavanne@mail.com', '0612345696'),
('Yasmine', 'Lemoine', '2003-12-05', 14.30, 'yasmine.lemoine@mail.com', '0612345697');

-- Associer les étudiants aux départements
INSERT INTO student_department (student_id, department_id) VALUES
(1, 1), (2, 2), (3, 2), (4, 3), (5, 3), (6, 4), 
(7, 1), (8, 2), (9, 3), (10, 4),
(11, 1), (12, 2), (13, 3), (14, 4), (15, 1),
(16, 2), (17, 3), (18, 4), (19, 1), (20, 2)
;

-- Insertion des notes des étudiants pour les différentes matières
INSERT INTO note (student_id, subject_id, grade) VALUES
(1, 1, 15.50), (1, 2, 14.00), (2, 3, 11.50), (2, 4, 13.20),
(3, 3, 18.00), (3, 4, 16.00), (4, 5, 9.00), (4, 6, 10.50),
(5, 5, 14.00), (5, 6, 12.00), (6, 7, 16.00), (6, 8, 14.50),
(7, 1, 14.80), (7, 2, 13.70), (8, 3, 13.30), (8, 4, 15.20),
(9, 5, 17.60), (9, 6, 18.00), (10, 7, 10.50), (10, 8, 11.70)
;

-- Affichage des données insérées pour vérification
SELECT * FROM student;
SELECT * FROM department;
SELECT * FROM subject;
SELECT * FROM note;