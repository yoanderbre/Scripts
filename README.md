# Proyecto-Tienda- API REST

Este repositorio contiene una colección de Postman que permite interactuar con una API REST para la gestión de prendas de una tienda. Incluye operaciones básicas como listar, obtener, crear, actualizar y eliminar productos.

##  Estructura del Proyecto

La colección de Postman incluye las siguientes peticiones:

### 🔹 Obtener Todos
- **Método:** `GET`
- **Descripción:** Recupera todas las prendas de la tienda.
- **URL:** `http://localhost/TiendaropaY/api/v1/public/index.php/prenda`

---

### 🔹 Obtener por ID
- **Método:** `GET`
- **Descripción:** Obtiene la información de una prenda específica por su ID.
- **URL:** `http://localhost/TiendaropaY/api/v1/public/index.php/prenda?id={id}`

---

### 🔹 Crear Prenda
- **Método:** `POST`
- **Descripción:** Crea una nueva prenda.
- **URL:** `http://localhost/TiendaropaY/api/v1/public/index.php/prenda`
- **Body (JSON):**
```json
{
  "titulo": "Impermeable",
  "id_marca": 1,
  "precio": 19.99,
  "cantidad_stock": 50
}
Actualizar Prenda
Método: PUT

Descripción: Actualiza una prenda existente.

URL: http://localhost/TiendaropaY/api/v1/public/index.php/prenda?id={id}

Body (JSON):
{
  "titulo": "Impermeable 2",
  "id_marca": 1,
  "precio": 19.99,
  "cantidad_stock": 50
}
🔹 Eliminar Prenda
•	Método: DELETE
•	Descripción: Elimina una prenda específica por su ID.
•	URL: http://localhost/TiendaropaY/api/v1/public/index.php/prenda?id={id}
Cómo usar esta colección
1.	Asegúrate de tener Postman instalado.
2.	Importa el archivo Proyecto tienda.postman_collection.json en Postman.
3.	Modifica los parámetros necesarios (por ejemplo, ID de prenda) según tu base de datos.
4.	Ejecuta las peticiones desde el entorno local (localhost).


