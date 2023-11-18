from pymongo import MongoClient
import psycopg2
from dotenv import load_dotenv
import os
import datetime


load_dotenv('api/.env')

def conectarPostgreSQL():
    try:
        conexion = psycopg2.connect(
            host=os.getenv('DB_HOST'),
            database=os.getenv('DB_DATABASE'),
            user= os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
        )
        print("Conexión exitosa")
        return conexion
    except Exception as e:
        print("Ocurrió un error al conectar a PostgreSQL: ", e)


def conectarMongoDB():
    client = MongoClient('localhost', 27017) 
    db = client['bd2']
    return db

def transferir_datos(cliente_sql, mongo_db):
    try:
        db = mongo_db
        
        print('POR HACER CLIENTE')

        # Transferencia de Clientes
        cliente_sql.execute('SELECT * FROM E01_CLIENTE')
        res_clientes = cliente_sql.fetchall()
        collection_clientes = db['clientes']
        print("pasamos")
        for cliente in res_clientes:
            print("entramos")
            cliente_sql.execute('SELECT * FROM E01_TELEFONO WHERE nro_cliente = %s', [cliente['nro_cliente']])
            print('execute con parametros')
            telefonos = cliente_sql.fetchall()
            cliente['telefonos'] = []
            for telefono in telefonos:
                cliente['telefonos'].append({'codigo_area':telefono['codigo_area'], 'nro_telefono': telefono['nro_telefono'], 'tipo': telefono['tipo']})
            print('por hacer el update')
            collection_clientes.update_one({'_id': cliente['nro_cliente']}, {'$set': cliente}, upsert=True)
        
        
        print('POR HACER PRODUCTO')
        
        
        # Transferencia de Productos
        cliente_sql.execute('SELECT * FROM E01_PRODUCTO')
        res_productos = cliente_sql.fetchall()
        collection_productos = db['productos']

        for producto in res_productos:
            collection_productos.update_one({'_id': producto['codigo_producto']}, {'$set': producto}, upsert=True)


        print('POR HACER FACTURAS')


        # Transferencia de Facturas
        cliente_sql.execute('SELECT * FROM E01_FACTURA')
        res_facturas = cliente_sql.fetchall()
        collection_facturas = db['facturas']

        for factura in res_facturas:
            print('query')
            cliente_sql.execute('SELECT * FROM E01_DETALLE_FACTURA WHERE nro_factura = %s', [factura['nro_factura']])
            detalles = cliente_sql.fetchall()
            factura['detalles'] = []
            for detalle in detalles:
                producto = collection_productos.find_one({'codigo_producto': detalle['codigo_producto']})
                detalle['producto_id'] = producto['_id'] if producto else None
                factura['detalles'].append(detalle)
            factura['fecha'] = datetime.datetime.combine(factura['fecha'], datetime.datetime.min.time())
            collection_facturas.update_one({'_id': factura['nro_factura']}, {'$set': factura}, upsert=True)

    except Exception as e:
        print("Ocurrió un error durante la transferencia de datos: ", e)
    finally:
        cliente_sql.close()

def convertir_fecha_a_datetime(factura):
    for clave, valor in factura.items():
        if isinstance(valor, datetime.date):
            factura[clave] = datetime.datetime.combine(valor, datetime.datetime.min.time())
    return factura


conexion = conectarPostgreSQL()

db = conectarMongoDB()
coleccion = db['prueba']
coleccion.insert_one({'dato':'muy bueno'})

from psycopg2.extras import RealDictCursor

cursor = conexion.cursor(cursor_factory=RealDictCursor)

transferir_datos(cursor,db)
