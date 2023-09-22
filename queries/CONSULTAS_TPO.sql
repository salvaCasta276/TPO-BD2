--TESTEAR
--1
--Me llama la atencion que digo "el telefono" ya que por lo que veo puede haber multiples telefonos...
-- . Obtener el teléfono y el número de cliente del cliente con nombre “Wanda” y apellido
-- “Baker”
SELECT *
FROM E01_TELEFONO
WHERE nro_cliente IN (
    SELECT nro_cliente
    FROM E01_CLIENTE
    WHERE nombre = 'Wanda' AND apellido = 'Baker'
);


--TESTEAR
--2
-- 2. Seleccionar todos los clientes que tengan registrada al menos una factura
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
-- 5. Seleccionar los datos de los clientes junto con sus teléfonos.
-- teniendo en cuenta que un cliente puede tener mas de un telefono o ninguno
-- obtamos por mostrar a los clientes tantas veces como telefonos tengan, o sin el telefono si no tienen uno
SELECT *
FROM E01_CLIENTE LEFT JOIN E01_TELEFONO USING (nro_cliente);

--TESTEAR
--6
--Que quiere decir eso de admitir nulos?
-- 6. Devolver todos los clientes, con la cantidad de facturas que tienen registradas (admitir
-- nulos en valores de Clientes).
SELECT E01_CLIENTE.*, COALESCE(sub.cant_facturas, 0) AS cant_facturas
FROM E01_CLIENTE
LEFT JOIN (
    SELECT nro_cliente, COUNT(nro_factura) AS cant_facturas
    FROM E01_FACTURA
    GROUP BY nro_cliente
) AS sub ON E01_CLIENTE.nro_cliente = sub.nro_cliente;
    
--TESTEAR
--7
-- 7. Listar todas las Facturas que hayan sido compradas por el cliente de nombre "Pandora" y
-- apellido "Tate".
SELECT *
FROM E01_FACTURA
WHERE nro_factura IN (
    SELECT nro_factura
    FROM E01_CLIENTE JOIN E01_FACTURA
    USING (nro_cliente)
    WHERE nombre = 'Pandora' AND apellido = 'Tate');

--TESTEAR
--8
-- 8. Listar todas las Facturas que contengan productos de la marca “In Faucibus Inc.”
SELECT *
FROM E01_FACTURA
WHERE nro_factura IN (
    SELECT E01_DETALLE_FACTURA.nro_factura
    FROM E01_PRODUCTO JOIN E01_DETALLE_FACTURA
    USING (codigo_producto)
    WHERE marca = 'In Faucibus Inc.'
);


--TESTEAR
--9
--Difere del 5 en que en esta query no figuraran clientes sin telefonos
-- 9. Mostrar cada teléfono junto con los datos del cliente.
SELECT *
FROM E01_TELEFONO JOIN E01_CLIENTE USING (nro_cliente);

--TESTEAR
--10
-- 10. Mostrar nombre y apellido de cada cliente junto con lo que gastó en total (con IVA
-- incluido).
SELECT nombre, apellido, COALESCE(gasto, 0)
FROM E01_CLIENTE LEFT JOIN (
    SELECT nro_cliente, SUM(total_con_iva) as gasto
    FROM E01_FACTURA
    GROUP BY nro_cliente
    ) as gasto_total USING (nro_cliente);
