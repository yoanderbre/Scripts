<?php
require_once __DIR__ . '/../models/prenda.php';
class PrendasController
{

    public function ObtenerTodos()
    {
        $prenda = new prenda();
        $prendas = $prenda->obtenerTodos();
        echo json_encode($prendas);
    }

    public function obtenerPorId($id)
    {
        $prenda = new prenda();
        $prendas = $prenda->obtenerPorId($id);
        if ($prendas == null) {
            echo json_encode(['Alert' => 'Prenda no encontrada']);
            return;
        }
        echo json_encode($prendas);
    }

    public function crearprenda()
    {
        $data = json_decode(file_get_contents(filename: 'php://input'), true);

        $prenda = new prenda();
        $resultado = $prenda->crear($data);
        echo json_encode($resultado);
    }

    public function eliminarprenda($id)
    {
        $prenda = new prenda();
        $resultado = $prenda->eliminar($id);
        echo json_encode($resultado);
    }

    public function actualizarprenda($id)
    {
        $data = json_decode(file_get_contents(filename: 'php://input'), true);
        
        $prenda = new prenda();
        $resultado = $prenda->actualizar($id, $data);
        echo json_encode($resultado);
    }
}
