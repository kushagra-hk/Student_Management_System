-- Create the database
CREATE DATABASE student_management;
USE student_management;

-- Create the Students table
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    enrollment_date DATE NOT NULL
);

-- Create the Attendance table
CREATE TABLE attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('Present', 'Absent') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

-- Create the Grades table
CREATE TABLE grades (
    grade_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    grade DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

-- Insert sample data into Students table
INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-01-15'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-01-16'),
('Alice', 'Johnson', 'alice.johnson@example.com', '2023-01-17');

-- Insert sample data into Attendance table
INSERT INTO attendance (student_id, date, status) VALUES
(1, '2023-01-20', 'Present'),
(1, '2023-01-21', 'Absent'),
(2, '2023-01-20', 'Present'),
(3, '2023-01-21', 'Present');

-- Insert sample data into Grades table
INSERT INTO grades (student_id, subject, grade) VALUES
(1, 'Mathematics', 85.50),
(1, 'Science', 90.00),
(2, 'Mathematics', 78.00),
(3, 'Science', 88.00);