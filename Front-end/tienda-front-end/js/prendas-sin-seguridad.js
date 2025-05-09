const API_URL = "http://localhost/tiendaropaY/api/v1/public/index.php";


function obtenerTodasLasprendas() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL+'/prenda', true);



    xhr.onload = function () {

        // Nos conectamos a la API por el endpoint usando get
        // si el status 200 significa que esta bien.
        // Leemos la respuesta de la api. 
        // Selecionas la tabla  #libro-table
        // creamos logica para tomar todos esos datos y adjuntarlos(append) a #libro-table
        if (this.status === 200) {


            console.log("Respuesta: " + this.responseText);
           // console.log(this.responseText);
            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim();
           
           
           
           
           
           
            try {
                const prendas = JSON.parse(cleanedText);
                document.querySelector('#prenda-table tbody').innerHTML = ''; // Limpiar de la tabla primero.
                console.log(prendas);

                prendas.forEach(prend => {
                    console.log("marca: "+ prend.marca
                    )
                });
                prendas.forEach(prenda => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${prenda.titulo}</td>
                         <td>${prenda.marca}</td>
                        <td>$${prenda.precio}</td>
                        <td>${prenda.cantidad_stock}</td>
                        <td>
                         <button onclick="mostrarFormActualizarprenda(${prenda.id_prenda}, '${prenda.titulo}', ${prenda.id_marca}, ${prenda.precio}, ${prenda.cantidad_stock})">Actualizar</button>
                         <button onclick="eliminarprenda(${prenda.id_prenda})">Eliminar</button>
                        </td>
                    `;
                    document.querySelector('#prenda-table tbody').appendChild(tr);
                });
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        } else {
            console.error('Error fetching prends:', this.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Request error...');
    };
    xhr.send();
}


function guardarprenda(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST',  API_URL+'/prenda', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Prenda guardado exitosamente');
            obtenerTodasLasprendas(); // Actualizar lista de Prendas después de guardar
        } else {
            console.error('Error al guardar la prenda:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Error en la solicitud');
    };
    xhr.send(JSON.stringify(data));
}


function actualizarprenda(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', API_URL + '/prenda/' + data.id_prenda, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('prenda actualizado exitosamente');
            obtenerTodasLasprendas(); // Actualizar lista de prendas después de actualizar
        } else {
            console.error('Error al actualizar la prenda:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Error en la solicitud');
    };
    xhr.send(JSON.stringify(data));
}


function eliminarprenda(prendId) {
    alert("Estas seguro de eliminar la prenda?")
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', API_URL + '/prenda/' + prendId, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Prenda eliminada exitosamente');
            obtenerTodasLasprendas(); // Actualizar lista de prendas después de eliminar
        } else {
            console.error('Error al eliminar la prenda:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Error en la solicitud');
    };
    xhr.send();
}

/* Metodo que muestra el formulario para actualizar con la informacion de las prendas.*/

function mostrarFormActualizarprenda(id_prenda, titulo, id_marca, precio, cantidad_stock) {

    alert("Mostrar formulario para actualizar")
    console.log(id_marca)
    const form = document.getElementById('update-prend-form');
    form.querySelector('#update-id_prenda').value = id_prenda;
    form.querySelector('#update-titulo').value = titulo;
    form.querySelector('#update-id_marca').value = id_marca;
    form.querySelector('#update-precio').value = precio;
    form.querySelector('#update-cantidad_stock').value = cantidad_stock;
    form.style.display = 'block';
}
