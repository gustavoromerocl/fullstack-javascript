-- Creamos una tabla con el nombre directorio_telefonico
CREATE TABLE Directorio_telefonico(
-- Definimos el campo nombre con el tipo de dato cadena con un largo de 25 caracteres.
nombre VARCHAR(25),
-- Definimos el campo apellido con el tipo de dato cadena con un largo de 25 caracteres.
apellido VARCHAR(25),
-- Definimos el campo numero_telefonico con el tipo de dato cadena con un largo de 8 caracteres.
numero_telefonico VARCHAR(8),
-- Definimos el campo dirección con el tipo de dato cadena con un largo de 255 caracteres.
direccion VARCHAR(255),
-- Definimos el campo edad con el tipo de dato entero
edad INT,
-- Definimos que el campo numero_telefonico representará la clave
primaria de la tabla.
PRIMARY KEY (numero_telefonico)
);

select * from directorio_telefonico;

-- Creamos una tabla con el nombre agenda
CREATE TABLE Agenda(
-- Definimos el campo nick con el tipo de dato cadena con un largo de 25 caracteres
nick VARCHAR(25),
-- Definimos el campo numero_telefonico con el tipo de dato cadena con un largo de 8 caracteres.
numero_telefonico VARCHAR(8),
-- Vinculamos una clave foránea entre nuestra columna numero_telefonico y su símil en la tabla directorio telefónico
FOREIGN KEY (numero_telefonico) REFERENCES
Directorio_telefonico(numero_telefonico)
);

-- Definimos qué tabla vamos a insertar datos
INSERT INTO directorio_telefonico
-- Explicitamos cuáles son las columnas a insertar
(nombre, apellido, numero_telefonico, direccion, edad)
-- Con la instrucción VALUES logramos asociada cada columna con un valor específico
VALUES ('Juan', 'Perez', '12345678' , 'Villa Pajaritos', 21);

INSERT INTO Directorio_telefonico
(nombre, apellido, numero_telefonico, direccion, edad) VALUES
('Fabian', 'Salas', '32846352', 'Playa Ancha', 21);
INSERT INTO Directorio_telefonico
(nombre, apellido, numero_telefonico, direccion, edad) VALUES
('John', 'Rodriguez', '23764362', 'Constitución', 21);
INSERT INTO Directorio_telefonico
(nombre, apellido, numero_telefonico, direccion, edad) VALUES
('Braulio', 'Fuentes', '23781363', 'Rancagua', 19);

-- Realicemos el mismo procedimiento en la tabla Agenda
INSERT INTO Agenda (nick, numero_telefonico) VALUES ('Juanito',
'12345678');

INSERT INTO Agenda (nick, numero_telefonico) VALUES ('Juancho',
'12345678');

copy directorio_telefonico TO '/home/romero-developments/Documentos/fullstack-javascript/postgreSQL/exportar.csv' csv header;

SELECT * FROM pg_indexes where tablename = 'directorio_telefonico';



