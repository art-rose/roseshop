CREATE DATABASE IF NOT EXISTS boutique CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE boutique;

-- جدول المستخدمين (مديرين)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'admin'
);

-- حساب مدير افتراضي (كلمة السر مشفرة بـ password_hash('admin123', PASSWORD_DEFAULT))
INSERT INTO users (username, password, role) VALUES
('admin', '$2y$10$O2mIFJcF7DwcdQf0yXxLruYp0F8a5m7T12QyozCimRijIwdhS/.zO', 'admin');

-- جدول المنتجات
CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) DEFAULT 'default.jpg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الطلبات
CREATE TABLE commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_nom VARCHAR(100),
    client_email VARCHAR(100),
    client_telephone VARCHAR(30),
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);