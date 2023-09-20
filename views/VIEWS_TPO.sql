CREATE VIEW E01_FACTURAS_ORDENADAS AS
SELECT *
FROM E01_FACTURA
ORDER BY fecha;

CREATE VIEW E01_PRODUCTOS_NO_FACTURADOS AS
SELECT *
FROM E01_PRODUCTO
WHERE codigo_producto NOT IN (
    SELECT codigo_producto
    FROM E01_DETALLE_FACTURA);