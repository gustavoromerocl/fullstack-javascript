create database pokemones;
​
create table pokemones(
	pokedex	int,
	nombre	varchar(15),
	tipo1	varchar(15),
	tipo2	varchar(15),
	primary key(pokedex)
);
​
create table mis_pokemones(
	pokedex			int,
	fecha_captura	date,
	lugar			varchar(100),
	huevo			boolean,
	peso			float,
	estatura		float,
	foreign key(pokedex) references pokemones(pokedex)
);
​
select * from pokemones;
select * from mis_pokemones;
​
copy pokemones from '/Users/rafariass/Desktop/Apoyo_Lectura/pokemonesKanto.csv' delimiter ',' csv header;
copy mis_pokemones from '/Users/rafariass/Desktop/Apoyo_Lectura/mis_pokemones.csv' delimiter ',' csv header;
​
-- E1
select * from pokemones
where pokedex > 50;
​
-- E2
select * from pokemones
where tipo1 = 'psiquico' or tipo2 = 'psiquico';
​
-- E3
select * from pokemones
limit 22;
​
-- Alias
select pokedex as numero_pokedex from pokemones;
select pokedex num_pokedex from pokemones;
​
select pokedex as num, nombre as pokemon from pokemones p;
​
-- E4
select pokedex as nro_pokedex, nombre as pokename from pokemones
limit 30;
​
-- min
select min(pokedex) from pokemones;
​
-- max
select max(pokedex) from pokemones;
​
-- length
select pokedex, nombre, length(nombre) as cantidad from pokemones;
​
-- count 
select count(*) from pokemones;
select count(nombre) from pokemones;
​
-- sum
select sum(pokedex) from pokemones;
​
-- E5
select count(*) from pokemones;
​
-- E6
select count(*) from pokemones
where tipo2 = 'roca';
​
-- Group by (MALO)
select * from pokemones
group by tipo2;
​
-- Group by (Bueno)
select tipo2 from pokemones
where tipo2 is not null
group by tipo2
order by tipo2 desc;
​
select tipo2 from pokemones
where tipo2 != 'null'
group by tipo2
order by tipo2 asc;
​
-- Group by and count
select tipo2, count(tipo2) as cantidad from pokemones
where tipo2 is not null
group by tipo2
order by tipo2 asc; 
​
-- indices
create index index_pokemones_nombre on pokemones(nombre);
select * from pg_indexes where tablename = 'pokemones';
drop index index_pokemones_nombre;