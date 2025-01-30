import sqlite3

# Conectar a la base de datos (se creará si no existe)
conexion = sqlite3.connect('mi-base-de-datos.db')

# Crear un cursor para ejecutar consultas
cursor = conexion.cursor()

# Crear una tabla
cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        edad INTEGER
    )
''')

# Insertar datos en la tabla
cursor.execute("INSERT INTO usuarios (nombre, edad) VALUES (?, ?)", ('Juan', 25))
cursor.execute("INSERT INTO usuarios (nombre, edad) VALUES (?, ?)", ('Ana', 30))

# Guardar los cambios
conexion.commit()

# Consultar datos de la tabla
cursor.execute("SELECT id, nombre, edad FROM usuarios")
filas = cursor.fetchall()

for fila in filas:
    print(f"ID: {fila[0]}, Nombre: {fila[1]}, Edad: {fila[2]}")

# Cerrar la conexión
conexion.close()