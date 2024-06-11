CREATE TABLE Notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    timestamp DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

CREATE TABLE ComplianceReports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    aircraft_id INT NOT NULL,
    report_date DATETIME NOT NULL,
    report_type VARCHAR(100) NOT NULL,
    description TEXT,
    findings TEXT,
    corrective_actions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);