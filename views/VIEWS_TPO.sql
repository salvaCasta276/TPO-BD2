-- 1. Se debe realizar una vista que devuelva las facturas ordenadas por fecha.
CREATE VIEW E01_FACTURAS_ORDENADAS AS
SELECT *
FROM E01_FACTURA
ORDER BY fecha;

SELECT * FROM E01_FACTURAS_ORDENADAS;



-- 2. Se necesita una vista que de devuelva todos los productos que aún no han sido facturados.
CREATE VIEW E01_PRODUCTOS_NO_FACTURADOS AS
SELECT *
FROM E01_PRODUCTO
WHERE codigo_producto NOT IN (
    SELECT codigo_producto
    FROM E01_DETALLE_FACTURA);

SELECT * FROM E01_PRODUCTOS_NO_FACTURADOS;
