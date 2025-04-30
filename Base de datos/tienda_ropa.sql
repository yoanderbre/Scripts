--Base de datos

CREATE DATABASE tienda_ropa;
USE tienda_ropa;

--Tablas
CREATE TABLE marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
 
CREATE TABLE prendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    marca_id INT,
    stock INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (marca_id) REFERENCES marcas(id)
);
 
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prenda_id INT,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (prenda_id) REFERENCES prendas(id)
);

--Inserción de datos de ejemplo

INSERT INTO marcas (nombre) VALUES ('New Balance'), ('The North Face'), ('Puma'), ('Adidas'), ('Nike');

INSERT INTO prendas (nombre, marca_id, stock, precio) VALUES
('Sudadera de manga larga', 1, 60, 39.99),
('Calcetines deportivos', 2, 100, 9.99),
('Zapatillas de baloncesto', 3, 25, 89.99),
('Guantes de entrenamiento', 4, 20, 14.99),
('Pantalón de yoga', 5, 50, 44.99);


INSERT INTO ventas (prenda_id, cantidad, fecha) VALUES
(1, 8, '2025-03-01'), -- Venta de una sudadera popular en marzo
(2, 5, '2025-03-02'), -- Calcetines deportivos con alta rotación
(3, 2, '2025-03-03'), -- Zapatillas de baloncesto vendidas justo antes de un torneo local
(4, 2, '2025-03-04'), -- Guantes de entrenamiento vendidos para la temporada de gimnasio
(5, 6, '2025-03-05'); -- Pantalones de yoga vendidos tras una promoción de bienestar

--Eliminación de un dato ( específico)

-- Eliminar las ventas asociadas a la prenda con id = 3
DELETE FROM ventas WHERE prenda_id = 3;

-- Ahora eliminar la prenda
DELETE FROM prendas WHERE id = 3;
 
--Actualización de un dato (Actualizar el stock)
UPDATE prendas SET stock = 45 WHERE id = 1;

--Consultas (SELECT)

-- a) Consulta para obtener las ventas por marca
SELECT m.nombre AS marca, SUM(v.cantidad) AS total_vendido
FROM ventas v
JOIN prendas p ON v.prenda_id = p.id
JOIN marcas m ON p.marca_id = m.id
GROUP BY m.nombre;

-- b) Obtener la cantidad vendida de prendas por fecha filtrada con una fecha específica
SELECT fecha, SUM(cantidad) AS total_vendido FROM ventas WHERE fecha = '2024-02-01' GROUP BY fecha;

--Creación de vistas

-- a) Vista para obtener las ventas por marca
CREATE VIEW VentasPorMarca AS
SELECT m.nombre AS marca, SUM(v.cantidad) AS total_vendido
FROM ventas v
JOIN prendas p ON v.prenda_id = p.id
JOIN marcas m ON p.marca_id = m.id
GROUP BY m.nombre;

-- b) Vista para obtener las ventas diarias
CREATE VIEW VentasDiarias AS
SELECT fecha, SUM(cantidad) AS total_vendido
FROM ventas
GROUP BY fecha
ORDER BY fecha ASC;

-- c) Lista de marcas con al menos una venta
CREATE VIEW marcas_con_ventas AS
SELECT DISTINCT m.id, m.nombre FROM marcas m
JOIN prendas p ON m.id = p.marca_id
JOIN ventas v ON p.id = v.prenda_id;
