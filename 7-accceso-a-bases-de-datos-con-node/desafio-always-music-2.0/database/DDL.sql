create database alwaysmusic;

-- CONECTARSE A LA BASE DE DATOS
sudo su [usuario (postgres)]
psql
\c alwaysmusic;

-- CREAR TABLA
create table usuarios(
    nombre varchar(50),
    rut varchar(15) primary key,
    curso varchar(50),
    nivel smallint
);

drop table usuario;
