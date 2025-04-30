<?php
// http://localhost/tiendaropaY/api/v1/public/index.php/holamundo
// http://localhost/tiendaropaY/api/v1/public/index.php/holamundo?nombre=Messi
require_once 'controllers/PrendasController.php';
require_once 'utils/Auth.php';


// Obtener el método de la solicitud
// GET POST delete etc....
$method = $_SERVER['REQUEST_METHOD'];


// Obtener la ruta solicitada y quitar 'public' si es necesario
$requestUri = trim(str_replace('/TiendaropaY/api/v1/public', '', $_SERVER['REQUEST_URI']), '/');

// "index.php/holamundo"
 

$requestUriWithoutQuery = strtok($requestUri, '?');
// index.php/  explode devuelve un array index.php  /
$segments = explode('/', $requestUriWithoutQuery);
//var_dump($segments);

 

$queryString = $_SERVER['QUERY_STRING'] ?? '';
parse_str($queryString, $queryParams); // CONVIERTE LOS QUERY STRING EN UN ARRAY.
$id = $queryParams['id'] ?? null;



if (isset($segments[1]) && $segments[1] == "prenda") {
    switch ($method) {
        case 'GET':
            if($id != null){
                $PrendasController = new PrendasController();
                $PrendasController->ObtenerPorId($id);
                break;
            }
            else
            {	
                $PrendasController = new PrendasController();
                $PrendasController->ObtenerTodos();
                break;
            }
        case 'POST':
            $PrendasController = new PrendasController();
            $PrendasController->crearprenda();
            break;
        case 'DELETE':
            $PrendasController = new PrendasController();
            $PrendasController->eliminarprenda($id);
            break;
        case 'PUT':
            $PrendasController = new PrendasController();
            $PrendasController->actualizarprenda($id);

            break;

        default:
            // Método no permitido
            header('HTTP/1.1 405 Method Not Allowed');
            echo json_encode(['error' => 'Método no permitido']);
            break;
    }
}

// Manejo de la ruta "holamundo"
if (isset($segments[1]) && $segments[1] == "holamundo") {
    // puede ser get, post, put, delete, etc...
    switch ($method) {
        // URLS DE EJEMPLO:
            // http://localhost/TiendaropaY/api/v1/public/index.php/holamundo?id=12345
            // http://localhost/TiendaropaY/api/v1/public/index.php/holamundo
        case 'GET':
            if($id != null){
                echo json_encode(['Alert' => 'Llamando GET hola mundo con id: ' . $id]);
                break;
            }
            else{
                echo json_encode(['Alert' => 'Llamando GET hola mundo sin id']);
                break;
            }
            //if ($nombre != "") {
            //    echo json_encode(['Alert' => 'Hola: ' . $nombre]);
            //} else {
            //    echo json_encode(['Alert' => 'Llamando GET sin parámetros']);
            //}
        case 'POST':
                echo json_encode(['Alert' => 'Llamando POST hola mundo']);
                break;
        case 'DELETE':
            echo json_encode(['Alert' => 'Llamando delete hola mundo']);
            break;
        case 'PUT':
            echo json_encode(['Alert' => 'Llamando PUT hola mundo']);
            break;
        default:
            // Método no permitido
            header('HTTP/1.1 405 Method Not Allowed');
            echo json_encode(['error' => 'Método no permitido']);
            break;
    }
}
