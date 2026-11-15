-- =====================================================================
-- Table de test pour la partie 8 : 500 000 connexions à l'espace
-- numérique de l'école, générées aléatoirement.
-- À exécuter sur une base scholar fraîchement importée (élèves 1 à 42).
-- Durée : de quelques secondes à une minute selon l'ordinateur.
-- =====================================================================

USE scholar;

DROP TABLE IF EXISTS connexion;

CREATE TABLE connexion (
    connexion_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    connected_at DATETIME NOT NULL,
    page VARCHAR(50) NOT NULL,
    duration_s INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
);

-- Autorise une requête récursive de 500 000 niveaux (1 000 par défaut)
SET SESSION cte_max_recursion_depth = 500000;

INSERT INTO connexion (student_id, connected_at, page, duration_s)
WITH RECURSIVE seq (n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < 500000
)
SELECT
    1 + FLOOR(RAND() * 42),
    TIMESTAMP('2025-09-01') + INTERVAL FLOOR(RAND() * 31536000) SECOND,
    ELT(1 + FLOOR(RAND() * 5), 'accueil', 'notes', 'planning', 'messagerie', 'profil'),
    10 + FLOOR(RAND() * 1800)
FROM seq;

SELECT COUNT(*) AS nb_connexions FROM connexion;
