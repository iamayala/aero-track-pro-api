CREATE TABLE Notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    TYPE ENUM('maintenance', 'order', 'flight') NOT NULL,
    message TEXT NOT NULL,
    READ BOOLEAN NOT NULL DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for pilots
CREATE TABLE Pilots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    experience_years INT NOT NULL
);

-- Insert 5 pilots by default
INSERT INTO
    Pilots (name, age, experience_years)
VALUES
    ('John Smith', 35, 10),
    ('Alice Johnson', 40, 15),
    ('Michael Brown', 30, 8),
    ('Emily Davis', 45, 20),
    ('James Wilson', 38, 12);