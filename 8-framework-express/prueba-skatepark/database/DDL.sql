-- CREAR BASE DE DATOS
CREATE DATABASE skatepark;

-- CREAR TABBLA SKATERS
CREATE TABLE skaters (id SERIAL, email VARCHAR(50) NOT NULL UNIQUE, nombre
VARCHAR(25) NOT NULL, password VARCHAR(25) NOT NULL, anos_experiencia
INT NOT NULL, especialidad VARCHAR(50) NOT NULL, foto VARCHAR(255) NOT
NULL, estado BOOLEAN NOT NULL, is_admin BOOLEAN DEFAULT FALSE);

-- CREAR USUARIO ADMINNISTRADOR

-- LA PASSWORD VA ENCRIPTADA, SE DEBE INGRESAR CON LAS SIGUIENTES CREDECIALES

--USER admin@admin.com
--PASSWORD admin

INSERT INTO 
  skaters(email, nombre, password, anos_experiencia, especialidad, foto, estado, is_admin) 
VALUES 
  ('admin@admin.com', 'Gustavo Romero', 'jGl25bVBBB', 10, 'Ollie', 'sandia.jpeg', true, true);

