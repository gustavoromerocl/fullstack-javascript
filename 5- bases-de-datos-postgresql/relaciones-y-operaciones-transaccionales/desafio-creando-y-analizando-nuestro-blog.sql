--1. Crear base de datos llamada blog
create database blog;
--2. Crear las tablas indicadas de acuerdo al modelo de datos.
--drop table usuarios; 
create table usuarios(
    id      serial not null,
    email   varchar (50) not null unique,
    primary key (id)
);
create table posts(
    id          serial not null,
    usuario_id  int not null,
    titulo      varchar(50),
    fecha       date,
    primary key (id),
    foreign key (usuario_id) references usuarios(id)        
);
create table comentarios(
    id             serial not null,
    post_id         int,
    usuario_id      int,
    texto           varchar(50),
    fecha           date,   
    primary key (id),
    foreign key (post_id) references posts(id),
    foreign key (usuario_id) references usuarios(id)    
);
----
select * from usuarios;
select * from posts;
select * from comentarios;
----
-- 3. Insertar los siguientes registros
insert into usuarios (email) values 
('usuario01@hotmail.com'),
('usuario02@gmail.com'),
('usuario03@gmail.com'),
('usuario04@hotmail.com'),
('usuario05@yahoo.com'),
('usuario06@hotmail.com'),
('usuario07@yahoo.com'),
('usuario08@yahoo.com'),
('usuario09@yahoo.com')
;
insert into posts (usuario_id, titulo, fecha) values
('1','post1: Esto es malo','2020-06-29'),
('5','post 2:esto es malo','2020-06-20'),
('1','post 3: esto es excelente','2020-05-30'),
('9','Post 4: Esto es bueno ', '2020-05-09'),
('7','Post 5: Esto es bueno','2020-07-10'),
('5','Post 6: Esto es excelente','2020-07-18'),
('8','Post 7: Esto es excelente','2020-07-07'),
('5','Post 8: Esto es excelente','2020-05-14'),
('2','Post 9: Esto es bueno','2020-05-08'),
('6','Post 10: Esto es bueno','2020-06-02'),
('4','Post 11: Esto es bueno','2020-05-05'),
('9','Post 12: Esto es malo','2020-07-23'),
('5','Post 13: Esto es excelente','2020-05-30'),
('8','Post 14: Esto es excelente','2020-05-01'),
('7','Post 15: Esto es malo','2020-06-17')
;
insert into comentarios (post_id, usuario_id,texto, fecha) values
('6','3','Este es el comentario 1','2020-07-08'),
('2','4','Este es el comentario 2','2020-06-07'),
('4','6','Este es el comentario 3','2020-06-16'),
('13','2','Este es el comentario 4','2020-06-15'),
('6','6','Este es el comentario 5','2020-05-14'),
('3','3','Este es el comentario 6','2020-07-08'),
('1','6','Este es el comentario 7','2020-05-22'),
('7','6','Este es el comentario 8','2020-07-09'),
('13','8','Este es el comentario 9','2020-06-30'),
('6','8','Este es el comentario 10','2020-06-19'),
('1','5','Este es el comentario 11','2020-05-09'),
('15','8','Este es el comentario 12','2020-06-17'),
('9','1','Este es el comentario 13 ','2020-05-01'),
('5','2','Este es el comentario 14 ','2020-05-31'),
('3','4','Este es el comentario 15 ','2020-06-28')
;
-- 4. Seleccionar el correo, id y título de todos los post publicados por el usuario 5.
select u.email, p.id, p.titulo from posts p inner join usuarios as u on p.usuario_id = u.id where u.id = 5; 
--
select u.email, tablatemporal.id, tablatemporal.titulo  from (select usuario_id, id,titulo from posts where usuario_id = 5) as tablatemporal join usuarios as u on tablatemporal.usuario_id = u.id ;
-- 5 Listar el correo, id y el detalle de todos los comentarios que no hayan sido realizados
-- por el usuario con email usuario06@hotmail.com. 
select u.email, c.id, c.texto from comentarios as c join usuarios as u on c.usuario_id = u.id where u.email != 'usuario06@hotmail.com';
-----
select u.email, subtabla.id, subtabla.texto from (
    select id, texto, usuario_id from comentarios where usuario_id <> 6
)as subtabla join usuarios as u on subtabla.usuario_id = u.id  ;
---
select u.email "correo" , c.id id,c.texto detalle from comentarios c join usuarios u on c.usuario_id = u.id where u.id != 6 ; 
---
select u.email "correo",(c.id*1.19) as "total con iva" , c.id id,c.texto detalle from comentarios c join usuarios u on c.usuario_id = u.id where u.id != 6 order by "total con iva" desc ;
-- 6. Listar los usuarios que no han publicado ningún post.
select u.id, u.email from usuarios as u left join posts as p on u.id = p.usuario_id where p.usuario_id is null;
-- 7. Listar todos los post con sus comentarios (incluyendo aquellos que no poseen
--comentarios). 
select p.titulo as posteo, c.texto as comentario from posts p full join comentarios c on p.id = c.post_id order by p.id,c.id ;
--8. Listar todos los usuarios que hayan publicado un post en Junio.
select u.id, u.email,p.fecha from usuarios as u inner join posts as p on u.id = p.usuario_id where cast(p.fecha as varchar) like '%-06-%';  
----
select u.id, u.email,p.fecha from usuarios as u inner join posts as p on u.id = p.usuario_id where p.fecha between '2020-06-01' and '2020-06-30';  
----
select u.id, u.email,p.fecha from usuarios as u inner join posts as p on u.id = p.usuario_id where date_part('month',p.fecha) = '06' ;
