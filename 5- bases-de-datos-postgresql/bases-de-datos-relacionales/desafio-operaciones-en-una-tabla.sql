-- Database: posts

-- DROP DATABASE IF EXISTS posts;

--1. Crear Base de Datos Posts (1 punto)
create database posts;

--2. Crear una tabla “post”, con los atributos id, nombre de usuario, fecha de creación, contenido y descripción.
create table post(
	id int primary key,
	nombre_usuario varchar(30),
	fecha_de_creacion timestamp,
	contenido varchar(100),
	descripcion varchar(100) 
);


select * from post;

--3. Insertar 3 post, 2 para el usuario "Pamela" y uno para "Carlos" (0.6 puntos)

--Primer post para Pamela
insert into post(id, nombre_usuario, fecha_de_creacion, contenido, descripcion)
values(01, 'Pamela', '1980-06-21', 'Lorem Ipsum', 'Lorem Ipsum2');
--Segundo post para Pamela
insert into post(id, nombre_usuario, fecha_de_creacion, contenido, descripcion)
values(02, 'Pamela', '1980-06-28', 'Lorem Ipsum', 'Lorem Ipsum2');
--Primer post para Carlos
insert into post(id, nombre_usuario, fecha_de_creacion, contenido, descripcion)
values(03, 'Carlos', '1975-06-28', 'Lorem Ipsum3', 'Lorem Ipsum4');

--4. Modificar la tabla post, agregando la columna título (1 punto)
alter table post add titulo varchar(50);

--5. Agregar título a las publicaciones ya ingresadas (1 punto)
update post set titulo = 'Mi primer post' where id = 1;
update post set titulo = 'Mi segundo post' where id = 2;
update post set titulo = 'Mi tercer post' where id = 3;

--6. Insertar 2 post para el usuario "Pedro" (0.4 puntos)
insert into post(id, nombre_usuario, fecha_de_creacion, contenido, descripcion, titulo)
values(04, 'Pedro', '1975-03-28', 'Lorem Ipsum3', 'Lorem Ipsum4', 'Mi cuarto post');

insert into post(id, nombre_usuario, fecha_de_creacion, contenido, descripcion, titulo)
values(05, 'Pedro', '1975-03-06', 'Lorem Ipsum3', 'Lorem Ipsum4', 'Mi quinto post');

--7. Eliminar el post de Carlos (1 punto)
delete from post where nombre_usuario = 'Carlos';

--8. Ingresar un nuevo post para el usuario "Carlos" (0.6 puntos)
insert into post(id, nombre_usuario, fecha_de_creacion, contenido, descripcion, titulo)
values(06, 'Carlos', '1975-03-29', 'Lorem Ipsum3', 'Lorem Ipsum4', 'Mi sexto post');

--Parte 2
--1. Crear una nueva tabla, llamada comentarios, con los atributos id, fecha y hora de creación, contenido que se relacione con la tabla posts. (1 punto)
create table comentarios(
    post_id int,
    fecha_hora_creacion timestamp,
    contenido varchar(100),
    foreign key(post_id) references post(id)
);

--2. Crear 2 comentarios para el post de "Pamela" y 4 para "Carlos" (0.4 puntos)
--Comentarios a los post de Pamela.
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(01, '2010-03-04', 'Lorem Ipsum');
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(02, '2000-03-04', 'Lorem Ipsum2');
--Comentarios a los post de Carlos.
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(06, '2000-03-05', 'Lorem Ipsum3');
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(06, '2000-03-06', 'Lorem Ipsum4');
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(06, '2000-03-07', 'Lorem Ipsum5');
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(06, '2000-03-08', 'Lorem Ipsum6');

--3. Crear un nuevo post para "Margarita" (1 punto)
insert into post(id, nombre_usuario, fecha_de_creacion, contenido, descripcion, titulo)
values(07, 'Margarita', '2020-02-28', 'Lorem Ipsum7', 'Lorem Ipsum8', 'Contenido');

--4. Ingresar 5 comentarios para el post de Margarita. (1 punto)
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(07, '2000-03-07', 'Lorem Ipsum5');
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(07, '2000-03-08', 'Lorem Ipsum6');
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(07, '2000-03-09', 'Lorem Ipsum7');
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(07, '2000-03-10', 'Lorem Ipsum8');
insert into comentarios(post_id, fecha_hora_creacion, contenido)
values(07, '2000-03-11', 'Lorem Ipsum9');

select * from post;
select * from comentarios;