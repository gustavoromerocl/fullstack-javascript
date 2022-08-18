/*--Integrantes--
Elizabeth Ramirez
Romina Rios
Cristian Torres
Gustavo Romero
Jorge Leiva
Daniela Saavedra
*/

-- Para cumplir los siguientes requerimientos, debes recordar tener desactivado el autocommit
--en tu base de datos.

\set AUTOCOMMIT off


--1 Cargar el respaldo de la base de datos unidad2.sql.
create database desafio_clientes;
\c desafio_clientes
\i 'C:/desafios_csv/unidad2.sql'
\q  
\c desafio_clientes
\dt


/* 2 El cliente usuario01 ha realizado la siguiente compra:
● producto: producto9.
● cantidad: 5.
● fecha: fecha del sistema.
Mediante el uso de transacciones, realiza las consultas correspondientes para este
requerimiento y luego consulta la tabla producto para validar si fue efectivamente
descontado en el stock. (3 Puntos)
*/
begin transaction;
insert into compra (cliente_id,fecha) values
((select id from cliente where nombre = 'usuario01'),current_date);
insert into detalle_compra (producto_id,compra_id,cantidad) values
((select id from producto where descripcion = 'producto9'),(select max(id) from compra),5);
update producto set stock = stock - 5 where id = (select id from producto where descripcion = 'producto9');
commit;
select * from producto where descripcion = 'producto9';

/* 3. El cliente usuario02 ha realizado la siguiente compra:
● producto: producto1, producto 2, producto 8.
● cantidad: 3 de cada producto.
● fecha: fecha del sistema.
Mediante el uso de transacciones, realiza las consultas correspondientes para este
requerimiento y luego consulta la tabla producto para validar que si alguno de ellos
se queda sin stock, no se realice la compra.
*/
begin transaction;
insert into compra (cliente_id,fecha) values ((select id from cliente where nombre = 'usuario02'),current_date);
-----Alternativa A
insert into detalle_compra (producto_id,compra_id,cantidad) values
((select id from producto where descripcion = 'producto1'),(select max(id) from compra),3);
insert into detalle_compra (producto_id,compra_id,cantidad) values 
((select id from producto where descripcion = 'producto2'),(select max(id) from compra),3);
insert into detalle_compra (producto_id,compra_id,cantidad) values
((select id from producto where descripcion = 'producto8'),(select max(id) from compra),3);

-----Alternativa B
insert into detalle_compra (producto_id,compra_id,cantidad) values
((select id from producto where descripcion = 'producto1'),(select max(id) from compra),3),
((select id from producto where descripcion = 'producto2'),(select max(id) from compra),3),
((select id from producto where descripcion = 'producto8'),(select max(id) from compra),3);
--- Se resta Stock
update producto set stock = stock -3 where id = (select id from producto where descripcion = 'producto1');
update producto set stock = stock -3 where id = (select id from producto where descripcion = 'producto2');
update producto set stock = stock -3 where id = (select id from producto where descripcion = 'producto8');
rollback;
------
/* 4 Realizar las siguientes consultas (2 Puntos):
a. Deshabilitar el AUTOCOMMIT .
b. Insertar un nuevo cliente.
c. Confirmar que fue agregado en la tabla cliente.
d. Realizar un ROLLBACK.
e. Confirmar que se restauró la información, sin considerar la inserción del
punto b.
f. Habilitar de nuevo el AUTOCOMMIT.*/
\set AUTOCOMMIT off
begin transaction;
insert into cliente (nombre,email) values ('usuario99','usuario99@gmail.com');
select * from cliente where nombre = 'usuario99';
rollback;
select * from cliente where nombre = 'usuario99';
\set AUTOCOMMIT on 

-------