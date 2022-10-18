-- VERIFICA LA TRANSFERENCIA 1
SELECT * FROM usuarios WHERE email IN ('fletcher.flosi@yahoo.com', 'yuki_whobrey@aol.com');

-- VERIFICA LA TRANSFERENCIA 2
SELECT * FROM usuarios WHERE email IN ('bette_nicka@cox.net', 'vinouye@aol.com');

-- SUMAR SALDO PARA TRANSFERENCIA 3
UPDATE usuarios SET saldo = saldo + 50000 WHERE email = 'albina@glick.com';

-- VERIFICA LA TRANSFERENCIA 3
SELECT * FROM usuarios WHERE email IN ('albina@glick.com', 'shawna_palaspas@palaspas.org');
