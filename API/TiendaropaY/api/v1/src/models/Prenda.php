<?php
require_once __DIR__ . '/../db/Database.php';

class prenda
{
    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function obtenerTodos()
    {
        $stmt = $this->db->query("
        SELECT 
                prendas.id_prenda,
                prendas.titulo,
                prendas.precio,
                prendas.cantidad_stock,
                prendas.id_marca,
                CONCAT(marcas.nombre, ' ', marcas.descripcion) AS marcas
            FROM 
                prendas
            JOIN 
                marcas
            ON 
                prendas.id_prenda = marcas.id_marca;
        ");
        return $stmt->fetchAll();
    }

    public function obtenerPorId($id)
    {
        $stmt = $this->db->prepare("
        SELECT 
                prendas.id_prenda,
                prendas.titulo,
                prendas.precio,
                prendas.cantidad_stock,
                prendas.id_marca,
                CONCAT(marcas.nombre, ' ', marcas.descripcion) AS marcas
            FROM 
                prendas
            JOIN 
                marcas
            ON 
                prendas.id_marca = marcas.id_marca
            WHERE 
                prendas.id_prenda = :id_prenda;
        ");
        $stmt->execute(['id_prenda' => $id]);
        return $stmt->fetch();
    }

///Abro conexion con $this->db
// Hacemos prepare para la consulta
// Adjustamos los parametros
// Ejecutamos la consulta
    public function crear($data)
    {
        $stmt = $this->db->prepare("
            INSERT INTO prendas (titulo, id_marca, precio, cantidad_stock)
            VALUES (:titulo, :id_marca, :precio, :cantidad_stock);
        ");
        $stmt->execute([
            'titulo' => $data['titulo'],
            'id_marca' => $data['id_marca'],
            'precio' => $data['precio'],
            'cantidad_stock' => $data['cantidad_stock']
        ]);
        // retorna el ultimo id insertado.
        return $this->db->lastInsertId();
    }

    public function eliminar($id)
    {
        $stmt = $this->db->prepare("
            DELETE FROM prendas WHERE id_prenda = :id_prenda;
        ");
        return $stmt->execute(['id_prenda' => $id]);
    }

    public function actualizar($id, $data)

    {
        
        $stmt = $this->db->prepare("
            UPDATE prendas SET titulo = :titulo,
             id_marca = :id_marca,
              precio = :precio,
               cantidad_stock = :cantidad_stock
          WHERE id_prenda = :id_prenda;
        ");
        return $stmt->execute([
            'id_prenda' => $id,
            'titulo' => $data['titulo'],
            'id_marca' => $data['id_marca'],
            'precio' => $data['precio'],
            'cantidad_stock' => $data['cantidad_stock']
        ]);
    }
}
