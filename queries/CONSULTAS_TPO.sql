--TESTEAR
--1
--Me llama la atencion que digo "el telefono" ya que por lo que veo puede haber multiples telefonos...
SELECT *
FROM E01_TELEFONO
WHERE nro_cliente IN (
    SELECT nro_cliente
    FROM E01_CLIENTE
    WHERE nombre = "Wanda" && apellido = "Baker");

--TESTEAR
--2
SELECT * FROM E01_CLIENTE
WHERE nro_cliente IN (
    SELECT nro_cliente FROM E01_FACTURA);

--TESTEAR
--3
SELECT * FROM E01_CLIENTE
WHERE nro_cliente NOT IN (
    SELECT nro_cliente FROM E01_FACTURA);

--TESTEAR
--4
SELECT * FROM E01_PRODUCTO
WHERE codigo_producto IN (
    SELECT codigo_producto FROM E01_DETALLE_FACTURA);

--TESTEAR
--5
--Puede ser que un cliente no tenga numero de telefono, en tal caso el telefono queda null
--Hay algun problema con que quede la columa nro_cliente repetida? Se puede sacar?
SELECT *
FROM E01_CLIENTE LEFT JOIN E01_TELEFONO USING (nro_cliente);

--TESTEAR
--6
--Que quiere decir eso de admitir nulos?
SELECT *
FROM E01_CLIENTE JOIN (
    SELECT nro_cliente, COALESCE(COUNT(nro_factura), 0) as cant_facturas
    FROM E01_CLIENTE LEFT JOIN E01_FACTURA
    USING (nro_cliente)
    GROUP BY (nro_cliente);
    
--TESTEAR
--7
SELECT *
FROM E01_FACTURA
WHERE nro_factura IN (
    SELECT nro_factura
    FROM E01_CLIENTE JOIN E01_FACTURA
    USING (nro_cliente)
    WHERE nombre = "Pandora" && apellido = "Tate");

--TESTEAR
--8
SELECT *
FORM E01_FACTURA
WHERE nro_factura IN (
    SELECT nro_factura
    FROM E01_PRODUCTO JOIN E01_DETALLE_FACTURA
    USING (codigo_producto)
    WHERE marca = "In Faucibus Inc.");

--TESTEAR
--9
--Difere del 5 en que en esta query no figuraran clientes sin telefonos
SELECT *
FROM E01_TELEFONO JOIN E01_CLIENTE USING (nro_cliente);

--TESTEAR
--10
SELECT nombre, apellido, COALESCE(gasto, 0)
FROM E01_CLIENTE LEFT JOIN (
    SELECT nro_cliente, SUM(total_con_iva) as gasto
    FROM E01_FACTURA
    GROUP BY nro_cliente
    ) USING (nro_cliente);
