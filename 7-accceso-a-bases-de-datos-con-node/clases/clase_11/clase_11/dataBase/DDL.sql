CREATE DATABASE clientes;

CREATE TABLE usuarios (
  first_name varchar(100),
  last_name varchar(100),
  email varchar(100)
);

COPY usuarios (first_name, last_name, email)
FROM '/Users/rafariass/Desktop/Desafio Latam/0- desafios/node/clase_11/dataBase/usuarios _database.csv'
DELIMITER ',' CSV HEADER;

ALTER TABLE usuarios ADD COLUMN saldo DECIMAL DEFAULT 0 NOT NULL CHECK (saldo >= 0);
