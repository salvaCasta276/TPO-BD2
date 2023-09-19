SELECT nro_telefono, E01_CLIENTE.nro_cliente FROM
E01_CLIENTE JOIN E01_TELEFONO
ON E01_CLIENTE.nro_cliente = E01_TELEFONO.nro_cliente
WHERE nombre = "Wanda" && apellido = "Baker";

SELECT * FROM E01_CLIENTE
WHERE nro_cliente IN (
    SELECT E01_CLIENTE.nro_cliente FROM
    E01_CLIENTE JOIN E01_FACTURA
    ON E01_CLIENTE.nro_cliente = E01_FACTURA.nro_cliente);

SELECT * FROM E01_CLIENTE
WHERE nro_cliente NOT IN (
    SELECT E01_CLIENTE.nro_cliente FROM
    E01_CLIENTE JOIN E01_FACTURA
    ON E01_CLIENTE.nro_cliente = E01_FACTURA.nro_cliente);


