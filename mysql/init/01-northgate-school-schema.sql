-- Northgate School Database Initialization
-- This script runs when the MySQL container starts for the first time

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS northgate_school CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE northgate_school;

-- Create a sample users table for the school website
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('student', 'teacher', 'admin', 'parent') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Create a sample courses table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor_id INT,
  max_students INT DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_instructor (instructor_id)
);

-- Create a sample enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_enrollment (student_id, course_id),
  INDEX idx_student (student_id),
  INDEX idx_course (course_id)
);

-- Insert sample data
INSERT IGNORE INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@northgate.edu', '$2b$10$sample.hash.for.demo.purposes.only', 'System', 'Administrator', 'admin'),
('teacher1@northgate.edu', '$2b$10$sample.hash.for.demo.purposes.only', 'John', 'Smith', 'teacher'),
('student1@northgate.edu', '$2b$10$sample.hash.for.demo.purposes.only', 'Alice', 'Johnson', 'student');

-- Insert sample courses
INSERT IGNORE INTO courses (title, description, instructor_id, max_students) VALUES
('Mathematics 101', 'Basic mathematics and algebra', 2, 25),
('English Literature', 'Introduction to classic literature', 2, 20),
('Computer Science', 'Programming fundamentals', 2, 15);

-- Insert sample enrollments
INSERT IGNORE INTO enrollments (student_id, course_id) VALUES
(3, 1),
(3, 2);

-- Create a simple events/announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_published (published_at),
  INDEX idx_active (is_active)
);

-- Insert sample announcement
INSERT IGNORE INTO announcements (title, content, author_id) VALUES
('Welcome to Northgate School', 'Welcome to our new school website! We are excited to have you here.', 1);

-- Show created tables
SHOW TABLES;

-- Show sample data counts
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Courses' as table_name, COUNT(*) as count FROM courses
UNION ALL
SELECT 'Enrollments' as table_name, COUNT(*) as count FROM enrollments
UNION ALL
SELECT 'Announcements' as table_name, COUNT(*) as count FROM announcements;
