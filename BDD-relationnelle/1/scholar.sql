-- =====================================================================
-- Base de données scholar
-- Cours : Conception et intégration d'une base de données relationnelle
-- SGBD : MySQL 8 (à importer sur le serveur MySQL, pas MariaDB)
-- =====================================================================

-- Création de la base de données scholar
CREATE DATABASE IF NOT EXISTS scholar;

-- Sélection de la base de données à utiliser
USE scholar;

-- ---------------------------------------------------------------------
-- Table `student` : les élèves
-- ---------------------------------------------------------------------
CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    average_grade DECIMAL(4,2),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    city VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ---------------------------------------------------------------------
-- Table `department` : les départements (spécialisations)
-- ---------------------------------------------------------------------
CREATE TABLE department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ---------------------------------------------------------------------
-- Table `subject` : les matières, chacune rattachée à un département
-- ---------------------------------------------------------------------
CREATE TABLE subject (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ---------------------------------------------------------------------
-- Table `student_department` : inscriptions des élèves dans les départements
-- ---------------------------------------------------------------------
CREATE TABLE student_department (
    student_id INT,
    department_id INT,
    enrollment_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, department_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ---------------------------------------------------------------------
-- Table `note` : les notes des élèves dans les matières
-- ---------------------------------------------------------------------
CREATE TABLE note (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject_id INT,
    grade DECIMAL(4,2),
    note_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ---------------------------------------------------------------------
-- Données
-- ---------------------------------------------------------------------

-- Départements (Physique n'a encore ni matière ni élève)
INSERT INTO department (department_name) VALUES
('Informatique'),
('Mathématiques'),
('Biologie'),
('Chimie'),
('Physique');

-- Matières de chaque département
INSERT INTO subject (subject_name, department_id) VALUES
('Programmation', 1),
('Réseaux', 1),
('Algèbre', 2),
('Calcul différentiel', 2),
('Biologie Cellulaire', 3),
('Génétique', 3),
('Chimie Organique', 4),
('Chimie Physique', 4);

-- Élèves
-- average_grade : moyenne des notes de l'élève, stockée par simplification
-- (NULL pour les élèves qui n'ont encore aucune note)
INSERT INTO student (first_name, last_name, birth_date, average_grade, email, phone_number, city) VALUES
('Alice', 'Dupont', '2004-11-04', 14.83, 'alice.dupont@mail.com', '0601020304', 'Paris'),
('Bob', 'Martin', '2003-01-24', 12.35, 'bob.martin@mail.com', '0602030405', 'Toulouse'),
('Claire', 'Lemoine', '2002-05-08', 17.10, 'claire.lemoine@mail.com', '0603040506', 'Lyon'),
('David', 'Berger', '2001-04-05', 9.75, 'david.berger@mail.com', '0604050607', 'Rennes'),
('Eva', 'Dufresne', '2006-12-04', 13.00, 'eva.dufresne@mail.com', '0605060708', 'Paris'),
('François', 'Petit', '1995-11-24', 15.25, 'francois.petit@mail.com', '0606070809', 'Lyon'),
('Giselle', 'Roche', '2005-09-03', 14.25, 'giselle.roche@mail.com', '0607080901', 'Toulouse'),
('Hugo', 'Renard', '2000-10-14', 14.25, 'hugo.renard@mail.com', '0608091011', 'Rennes'),
('Isabelle', 'Marchand', '1994-01-01', 17.37, 'isabelle.marchand@mail.com', '0609101112', 'Paris'),
('Jules', 'Gautier', '1999-02-07', 11.10, 'jules.gautier@mail.com', '0610111213', 'Lyon'),
('Léo', 'Benoit', '2001-04-17', 13.00, NULL, '0601121314', 'Toulouse'),
('Mia', 'Bouvier', '2005-10-01', 15.75, 'mia.bouvier@mail.com', '0602233445', 'Rennes'),
('Noah', 'Brunet', '2003-09-07', 18.40, 'noah.brunet@mail.com', '0603344556', 'Paris'),
('Olivia', 'Durand', '2003-12-21', 15.50, 'olivia.durand@mail.com', '0604455667', 'Toulouse'),
('Paul', 'Lemoine', '1997-12-18', 14.67, NULL, '0605566778', 'Lyon'),
('Quentin', 'Roussel', '2002-07-08', 15.25, 'quentin.roussel@mail.com', '0606677889', 'Rennes'),
('Rachelle', 'Petit', '2007-08-19', 13.25, 'rachelle.petit@mail.com', '0607788990', 'Paris'),
('Sophie', 'Jacques', '1997-05-26', 17.00, 'sophie.jacques@mail.com', '0608899001', 'Lyon'),
('Théo', 'Lefevre', '2005-01-25', 10.67, 'theo.lefevre@mail.com', '0609900112', 'Toulouse'),
('Alice', 'Lemoine', '2004-03-23', 12.17, 'alice.lemoine@mail.com', '0612345678', 'Paris'),
('Bastien', 'Laurent', '1994-07-11', 14.67, 'bastien.laurent@mail.com', '0612345679', 'Lyon'),
('Charlotte', 'Dupuis', '1999-05-05', 17.50, NULL, '0612345680', 'Rennes'),
('Dylan', 'Chauvet', '2002-04-25', 13.17, 'dylan.chauvet@mail.com', '0612345681', 'Toulouse'),
('Eva', 'Morin', '2001-06-04', 13.67, 'eva.morin@mail.com', '0612345682', 'Paris'),
('Frédéric', 'Vallet', '2000-02-13', 17.10, 'frederic.vallet@mail.com', '0612345683', 'Lyon'),
('Géraldine', 'Brune', '2003-02-12', 13.50, 'geraldine.brune@mail.com', '0612345684', 'Toulouse'),
('Hugo', 'Tissot', '1996-06-20', 14.17, 'hugo.tissot@mail.com', '0612345685', 'Rennes'),
('Inès', 'Gallet', '2005-05-26', 12.50, 'ines.gallet@mail.com', '0612345686', 'Paris'),
('Jérôme', 'Giraud', '1997-01-24', 13.25, 'jerome.giraud@mail.com', '0612345687', 'Lyon'),
('Kélian', 'Dufresne', '2003-08-18', 15.25, 'kelian.dufresne@mail.com', '0612345688', 'Rennes'),
('Léa', 'Leblanc', '2004-02-13', 12.17, NULL, '0612345689', 'Toulouse'),
('Marion', 'Besson', '1998-02-18', 16.50, 'marion.besson@mail.com', '0612345690', 'Paris'),
('Nicolas', 'Leclerc', '2001-05-27', 13.75, 'nicolas.leclerc@mail.com', '0612345691', 'Lyon'),
('Océane', 'Lemoine', '2001-11-20', 15.50, 'oceane.lemoine@mail.com', '0612345692', 'Toulouse'),
('Maxime', 'Dumas', '1996-06-19', 12.00, NULL, '0612345693', 'Rennes'),
('Raphaël', 'Germain', '1994-04-23', 16.17, 'raphael.germain@mail.com', '0612345694', 'Paris'),
('Sébastien', 'Vidal', '1999-02-02', NULL, 'sebastien.vidal@mail.com', '0612345695', 'Lyon'),
('Théodore', 'Chavanne', '1995-11-08', NULL, 'theodore.chavanne@mail.com', '0612345696', 'Rennes'),
('Yasmine', 'Lemoine', '2004-05-03', NULL, 'yasmine.lemoine@mail.com', '0612345697', 'Toulouse'),
('Clara', 'Garcia', '2006-04-28', 15.00, 'clara.garcia@mail.com', '0612345698', 'Lyon'),
('Ibrahima', 'N''Diaye', '2002-02-13', 13.75, 'ibrahima.ndiaye@mail.com', '0612345699', 'Paris'),
('Lucas', 'Moreira', '2005-05-15', NULL, 'lucas.moreira@mail.com', NULL, 'Rennes');

-- Inscriptions des élèves dans les départements
INSERT INTO student_department (student_id, department_id, enrollment_date) VALUES
(1, 1, '2025-09-01'),
(2, 2, '2024-09-02'),
(3, 2, '2023-09-04'),
(3, 1, '2026-01-12'),
(4, 3, '2024-09-02'),
(5, 3, '2024-09-02'),
(6, 4, '2023-09-04'),
(7, 1, '2025-09-01'),
(8, 2, '2024-09-02'),
(9, 3, '2025-09-01'),
(10, 4, '2025-09-01'),
(11, 1, '2025-09-01'),
(12, 2, '2023-09-04'),
(13, 3, '2025-09-01'),
(13, 2, '2026-01-12'),
(14, 4, '2025-09-01'),
(15, 1, '2023-09-04'),
(16, 2, '2025-09-01'),
(17, 3, '2025-09-01'),
(18, 4, '2023-09-04'),
(19, 1, '2023-09-04'),
(20, 2, '2024-09-02'),
(21, 3, '2024-09-02'),
(22, 4, '2024-09-02'),
(23, 1, '2025-09-01'),
(24, 2, '2025-09-01'),
(25, 1, '2025-01-13'),
(25, 3, '2025-09-01'),
(26, 4, '2023-09-04'),
(27, 1, '2025-09-01'),
(28, 2, '2024-09-02'),
(29, 3, '2023-09-04'),
(30, 4, '2023-09-04'),
(31, 1, '2023-09-04'),
(32, 2, '2024-09-02'),
(33, 3, '2024-09-02'),
(34, 4, '2024-09-02'),
(35, 1, '2023-09-04'),
(36, 2, '2023-09-04'),
(40, 1, '2025-09-01'),
(41, 3, '2025-09-01');

-- Notes des élèves
INSERT INTO note (student_id, subject_id, grade, note_date) VALUES
(1, 1, 15.00, '2025-12-15'),
(1, 2, 14.00, '2026-01-17'),
(1, 1, 15.50, '2026-03-11'),
(2, 4, 13.20, '2025-11-11'),
(2, 3, 11.50, '2026-02-25'),
(3, 3, 16.00, '2024-11-12'),
(3, 4, 16.00, '2025-02-24'),
(3, 3, 18.00, '2026-01-13'),
(3, 1, 18.00, '2026-03-22'),
(3, 2, 17.50, '2026-05-30'),
(4, 6, 10.50, '2025-02-21'),
(4, 5, 9.00, '2025-06-30'),
(5, 5, 14.00, '2025-06-11'),
(5, 6, 12.00, '2026-04-29'),
(6, 8, 14.50, '2025-06-27'),
(6, 7, 16.00, '2026-04-05'),
(7, 2, 13.70, '2026-04-23'),
(7, 1, 14.80, '2026-05-08'),
(8, 4, 15.20, '2025-05-14'),
(8, 3, 13.30, '2025-10-07'),
(9, 6, 16.50, '2025-10-21'),
(9, 5, 17.60, '2025-12-10'),
(9, 6, 18.00, '2026-06-18'),
(10, 8, 11.70, '2025-11-16'),
(10, 7, 10.50, '2026-06-10'),
(11, 2, 14.50, '2025-10-06'),
(11, 1, 11.50, '2026-05-28'),
(12, 4, 17.50, '2025-09-14'),
(12, 3, 14.00, '2026-04-03'),
(13, 5, 16.00, '2026-02-12'),
(13, 4, 18.50, '2026-04-02'),
(13, 3, 20.00, '2026-04-28'),
(13, 5, 18.00, '2026-05-21'),
(13, 6, 19.50, '2026-06-17'),
(14, 7, 17.00, '2026-03-15'),
(14, 8, 13.00, '2026-04-04'),
(14, 7, 16.50, '2026-06-29'),
(15, 2, 16.00, '2024-12-27'),
(15, 1, 15.50, '2025-08-11'),
(15, 2, 12.50, '2026-05-04'),
(16, 4, 13.50, '2026-06-01'),
(16, 3, 17.00, '2026-06-30'),
(17, 6, 14.00, '2026-01-17'),
(17, 5, 12.50, '2026-06-28'),
(18, 7, 18.00, '2025-04-24'),
(18, 8, 16.00, '2025-10-18'),
(19, 2, 9.00, '2024-10-22'),
(19, 1, 11.50, '2025-02-01'),
(19, 2, 11.50, '2025-05-24'),
(20, 3, 10.50, '2024-12-01'),
(20, 4, 11.00, '2025-06-02'),
(20, 4, 15.00, '2025-09-05'),
(21, 6, 14.50, '2026-01-29'),
(21, 5, 15.50, '2026-04-07'),
(21, 5, 14.00, '2026-05-09'),
(22, 7, 17.00, '2025-01-09'),
(22, 8, 18.00, '2025-11-26'),
(23, 1, 14.00, '2025-11-20'),
(23, 2, 14.00, '2025-11-25'),
(23, 2, 11.50, '2026-01-06'),
(24, 4, 13.50, '2025-11-08'),
(24, 4, 14.50, '2025-11-20'),
(24, 3, 13.00, '2026-01-02'),
(25, 1, 14.50, '2025-03-31'),
(25, 2, 19.00, '2025-05-08'),
(25, 6, 15.50, '2025-10-02'),
(25, 1, 19.50, '2026-04-16'),
(25, 5, 17.00, '2026-04-24'),
(26, 7, 12.00, '2026-01-09'),
(26, 8, 14.00, '2026-02-11'),
(26, 8, 14.50, '2026-04-23'),
(27, 1, 14.00, '2025-10-30'),
(27, 1, 15.50, '2025-11-01'),
(27, 2, 13.00, '2026-06-02'),
(28, 4, 10.50, '2024-12-10'),
(28, 3, 14.50, '2025-03-12'),
(28, 4, 12.50, '2025-04-10'),
(29, 5, 12.50, '2025-01-31'),
(29, 6, 14.00, '2026-05-16'),
(30, 8, 15.00, '2025-08-20'),
(30, 7, 15.50, '2025-12-04'),
(31, 2, 12.50, '2024-12-14'),
(31, 2, 12.50, '2025-08-04'),
(31, 1, 11.50, '2025-08-18'),
(32, 3, 18.00, '2024-12-16'),
(32, 4, 15.50, '2025-02-14'),
(32, 3, 16.00, '2026-05-01'),
(33, 5, 15.50, '2025-06-09'),
(33, 6, 12.00, '2026-04-11'),
(34, 8, 16.50, '2025-01-16'),
(34, 8, 15.50, '2025-08-04'),
(34, 7, 14.50, '2026-03-27'),
(35, 1, 10.50, '2025-01-27'),
(35, 2, 13.50, '2025-03-09'),
(36, 4, 15.50, '2024-11-22'),
(36, 3, 15.50, '2025-06-28'),
(36, 3, 17.50, '2025-09-17'),
(40, 2, 16.50, '2026-02-12'),
(40, 1, 15.00, '2026-02-19'),
(40, 1, 13.50, '2026-03-20'),
(41, 5, 13.50, '2025-11-27'),
(41, 6, 15.00, '2025-12-16'),
(41, 6, 13.50, '2026-04-08'),
(41, 5, 13.00, '2026-05-07');

-- Affichage des données insérées pour vérification
SELECT * FROM student;
SELECT * FROM department;
SELECT * FROM subject;
SELECT * FROM student_department;
SELECT * FROM note;
