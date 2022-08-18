--1. Crear base de datos llamada películas.
create database peliculas_db;
--2. Cargar ambos archivos a su tabla correspondiente.
create table peliculas(
    id           int primary key,
    pelicula     varchar(100),
    anio_estreno int,
    director     varchar(50)
);
create table reparto(
    peliculas_fk int,
    actor        varchar(100),
    foreign key(peliculas_fk) references peliculas(id)
);

copy peliculas from '/home/romero-developments/Documentos/fullstack-javascript/postgreSQL/csv/peliculas.csv' delimiter ',' csv header;
copy reparto from '/home/romero-developments/Documentos/fullstack-javascript/postgreSQL/csv/reparto.csv' delimiter ',' csv;


--3. Obtener el ID de la película “Titanic”.
select id from peliculas where pelicula = 'Titanic';

--4. Listar a todos los actores que aparecen en la película "Titanic".
select * from reparto where peliculas_fk = 2;

--5. Consultar en cuántas películas del top 100 participa Harrison Ford.
select count(peliculas_fk) from reparto where actor = 'Harrison Ford';

--6. Indicar las películas estrenadas entre los años 1990 y 1999 ordenadas por título de manera ascendente.
select * from peliculas where anio_estreno between 1990 and 1999 order by pelicula asc;

--7. Hacer una consulta SQL que muestre los títulos con su longitud, la longitud debe ser nombrado para la consulta como “longitud_titulo”.
select pelicula, length(pelicula) as longitud_titulo from peliculas;

--8. Consultar cual es la longitud más grande entre todos los títulos de las películas.
select max(length(pelicula)) from peliculas;

select * from peliculas;
select * from reparto;