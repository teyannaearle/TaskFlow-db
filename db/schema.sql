DROP DATABASE IF EXISTS taskflow_db;
CREATE DATABASE taskflow_db;

\c taskflow_db;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    email VARCHAR (255) UNIQUE NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);