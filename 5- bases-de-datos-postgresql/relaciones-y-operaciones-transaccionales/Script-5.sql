--1. Cargar el respaldo de la base de datos unidad2.sql. (2 Puntos)

create database desafio_clientes

--\i '/home/romero-developments/Descargas/desafio/unidad2.sql'

select * from cliente;
select * from compra;
select * from detalle_compra;

/*
El cliente usuario01 ha realizado la siguiente compra:
● producto: producto9.
● cantidad: 5.
● fecha: fecha del sistema.
Mediante el uso de transacciones, realiza las consultas correspondientes para este
requerimiento y luego consulta la tabla producto para validar si fue efectivamente
descontado en el stock. (3 Puntos)
 */

begin transaction;
insert into compra (cliente_id, fecha) values ((select id from cliente where nombre = 'usuario01'),current_date);

insert into detalle_compra (producto_id, compra_id, cantidad) values 
((select id from producto where descripcion = 'producto9'),
(select max(id) from compra),
5);

update producto set stock = stock -5 where id = (select id from producto where descripcion = 'producto9');

commit;
--rollback;

select * from producto where descripcion = 'producto9'

/*
3. El cliente usuario02 ha realizado la siguiente compra:
● producto: producto1, producto 2, producto 8.
● cantidad: 3 de cada producto.
● fecha: fecha del sistema.
Mediante el uso de transacciones, realiza las consultas correspondientes para este
requerimiento y luego consulta la tabla producto para validar que si alguno de ellos
se queda sin stock, no se realice la compra. (3 Puntos)
 */
select * from cliente;
select * from compra;
select * from detalle_compra;

begin transaction ;
insert into compra (cliente_id, fecha) values ((select id from cliente where nombre = 'usuario02'), current_date);
insert into detalle_compra (producto_id, compra_id, cantidad) values 



