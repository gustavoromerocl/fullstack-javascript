--1. Crear el modelo en una base de datos llamada biblioteca, considerando las tablas definidas y sus atributos. (2 puntos).

create database biblioteca;

create table tipo_autor(
	id int not null,
	nombre varchar(50),
	primary key (id)
);


create table autor(
	codigo_autor serial,
	id_tipo_autor int,
	nombre_autor varchar(50) not null,
	apellido_autor varchar(50) not null,
	fecha_nacimiento date,
	fecha_muerte date,
	primary key (codigo_autor),
	foreign key (id_tipo_autor) references tipo_autor(id)
); 


create table libro(
	isbn varchar(15),
	codigo_autor int,
	titulo varchar(50) not null,
	numero_paginas int,
	primary key (isbn, codigo_autor),
	foreign key (codigo_autor) references autor(codigo_autor)
);


create table socio(
	rut varchar(10) not null,
	nombre varchar(30) not null,
	apellido varchar(30) not null,
	direccion varchar(100) not null,
	telefono varchar(10) not null,
	primary key (rut)
);

create table prestamo(
	id serial,
	isbn_libro varchar(15) not null,
	codigo_autor int,
	rut_socio varchar(10) not null,
	fecha_inicio date not null,
	fecha_devolucion date not null,
	primary key (id),
	foreign key (isbn_libro, codigo_autor) references libro(isbn, codigo_autor),
	foreign key (rut_socio) references socio(rut)
);

--2. Se deben insertar los registros en las tablas correspondientes (1 punto).

insert into socio 
values
	('1111111-1', 'JUAN', 'SOTO', 'AVENIDA 1, SANTIAGO', '911111111'),
	('2222222-2','ANA','PÉREZ','PASAJE 2, SANTIAGO', '922222222'),
	('3333333-3','SANDRA','AGUILAR','AVENIDA 2, SANTIAGO', '933333333'),
	('4444444-4','ESTEBAN','JEREZ','AVENIDA 3, SANTIAGO', '944444444'),
	('5555555-5','SILVANA','MUÑOZ','PASAJE 3, SANTIAGO', '955555555');

insert into tipo_autor 
values
	(1, 'PRINCIPAL'),
	(2, 'COAUTOR');

insert into autor 
values
	(default, 1, 'ANDRÉS', 'ULLOA', '1982-01-01', null),
	(default, 1, 'SERGIO', 'MARDONES','1950-01-01', '2012-01-01'),
	(default, 1, 'JOSE', 'SALGADO', '1968-01-01', '2020-01-01'),
	(default, 2, 'ANA', 'SALGADO', '1972-01-01', null),
	(default, 1, 'MARTIN', 'PORTA','1976-01-01', null);

insert into libro
values
	('111-1111111-111',3,'CUENTOS DE TERROR', 344),
	('111-1111111-111',4, 'CUENTOS DE TERROR', 344),
	('222-2222222-222',1, 'POESÍAS CONTEMPORANEAS', 167),
	('333-3333333-333',2, 'HISTORIA DE ASIA',511),
	('444-4444444-444',5, 'MANUAL DE MECÁNICA', 298);

insert into prestamo 
values
	(default,'111-1111111-111',3,'1111111-1','2020-01-20','2020-01-27'),
	(default, '222-2222222-222', 1, '5555555-5', '2020-01-20','2020-01-30'),
	(default, '333-3333333-333',2,'3333333-3','2020-01-22','2020-01-30'),
	(default, '444-4444444-444', 5,'4444444-4','2020-01-23','2020-01-30'),
	(default, '111-1111111-111',3, '2222222-2','2020-01-27','2020-02-04'),
	(default, '444-4444444-444', 5, '1111111-1', '2020-01-31','2020-02-12'),
	(default, '222-2222222-222', 1, '3333333-3', '2020-01-31','2020-02-12');

select * from tipo_autor;
select * from socio;
select * from autor;
select * from libro;
select * from prestamo;

--3. Realizar las siguientes consultas:

--a. Mostrar todos los libros que posean menos de 300 páginas. (0.5 puntos)

select * from libro
where numero_paginas < 300;

--b. Mostrar todos los autores que hayan nacido después del 01-01-1970.

select * from autor
where fecha_nacimiento > '01-01-1970';

--c. ¿Cuál es el libro más solicitado? (0.5 puntos).
select p.isbn_libro, count(*) from (select * from prestamo) as p group by p.isbn_libro limit 3;

--d. Si se cobrara una multa de $100 por cada día de atraso, mostrar cuánto debería pagar cada usuario que entregue el préstamo después de 7 días.(0.5 puntos)
select( fecha_devolucion - fecha_inicio-7)*100, rut_socio from prestamo
where fecha_devolucion - fecha_inicio > 7;

