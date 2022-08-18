

select * from mis_pokemones mp ;
select * from pokemones p ;

SELECT *
-- selecciona todos los registros
FROM pokemones
-- de la tabla pokemones (tabla izquierda)
LEFT JOIN mis_pokemones
-- en relación a la tabla mis_pokemones (tabla derecha)
on pokemones.pokedex=mis_pokemones.pokedex
-- relacionados a través de la columna pokedex
ORDER BY nombre;
-- ordenados por nombre

--LEFT JOIN AND WHERE

SELECT *
-- selecciona todos los registros
FROM pokemones
-- de la tabla pokemones
LEFT JOIN mis_pokemones
-- en relación a la tabla mis_pokemones
on pokemones.pokedex=mis_pokemones.pokedex
-- a través de la columna pokedex
WHERE mis_pokemones IS NULL
-- donde el registro no exista en la tabla mis_pokemones
ORDER BY nombre;
-- ordenados por nombre