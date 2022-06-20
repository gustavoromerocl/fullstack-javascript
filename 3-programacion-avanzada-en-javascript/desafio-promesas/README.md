# Desafío promesas

## Autor

- Gustavo Romero

## Descripción

Se requiere desarrollar un programa con JavaScript, que al ser ejecutado en la consola del
navegador web, muestre los primeros 20 títulos de álbumes ofrecidos por una URL en la
nube, esto se puede lograr mediante el “id” que tiene cada objeto, que entrega la URL. Los
títulos de cada álbum se pueden rescatar desde el siguiente Link.
Igualmente, después de pasar 3 segundos, se debe mostrar un mensaje en la consola del
navegador web indicando que la información fue enviada.
El procedimiento de manera general para lograr lo solicitado será:
- Crear una función asíncrona que contenga la URL en una variable.
- Luego mediante el bloque de try/catch conectarse a la URL indicada anteriormente
con el método fetch, utilizando a la vez await para que retorne directamente el valor
de la promesa.
- Utilizando métodos para iterar arreglos, como por ejemplo el forEach, solamente
mostrar los primeros 20 títulos de álbumes de acuerdo al número de id indicados por
la URL.

## Requerimientos

1. Implementar ES6 para toda la estructura del código.

2. Crear una función asíncrona para obtener los datos de la URL.

3. Dentro de un bloque Try/Catch, utilizar el método fetch mediante la instrucción await
para recibir el valor directamente de la promesa.

4. Utilizar un método de iteración de arreglos (por ejemplo: forEach) para mostrar
solamente los primeros 20 títulos de los datos recibidos.

5. Crear una función que retorne una promesa después de tres (3) segundos utilizando
setTimeout. El mensaje a retornar debe ser un string que indique: “Información
Enviada”.

6. Crear una función asíncrona que permita recibir el mensaje de la promesa creada en
el requerimiento cinco (5), de forma directa con await, para ser mostrado en la
consola del navegador, agregando el llamado a las dos funciones principales.