// Definicion de constante
// Ubicacion de la API.


document.addEventListener('DOMContentLoaded', () => {


    // eventos para el menu de navegacion
    document.getElementById('link-prend').addEventListener('click', () => mostrarSeccion('prendas'));
    document.getElementById('link-transactions').addEventListener('click', () => mostrarSeccion('transactions'));
    document.getElementById('link-marcas').addEventListener('click', () => mostrarSeccion('marcas'));
    
    obtenerTodasLasmarcas();
    obtenerTodasLasprendas();
   // fetchTransactions();

    document.getElementById('agregar-prenda-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = this;
        const data = {
            titulo: form.titulo.value,
            id_marca: parseInt(form.id_marca.value),
            precio: parseFloat(form.precio.value),
            cantidad_stock: parseInt(form.cantidad_stock.value)
        };
        guardarprenda(data);
        form.reset();
    });

    document.getElementById('update-prend-form').addEventListener('submit', function(event) {

        event.preventDefault();
        const form = this;
        console.log(form.id_prenda.value);
        const data = {
            id_prenda: parseInt(form.id_prenda.value),
            titulo: form.titulo.value,
            id_marca: parseInt(form.id_marca.value),
            precio: parseFloat(form.precio.value),
            cantidad_stock: parseInt(form.cantidad_stock.value)
        };
        actualizarprenda(data);
        form.reset();
        form.style.display = 'none';
    });

    
});


function mostrarSeccion(section) {
    document.getElementById('prendas-section').style.display = 'none';
    document.getElementById('transactions-section').style.display = 'none';
    document.getElementById('marcas-section').style.display = 'none';
    console.log(section);
    if (section === 'prendas') {
        document.getElementById('prendas-section').style.display = 'block';
    } else if (section === 'transactions') {
        document.getElementById('transactions-section').style.display = 'block';
    } else if (section === 'marcas') {
        document.getElementById('marcas-section').style.display = 'block';
    }
}

function obtenerTodasLasmarcas() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/marcas', true);
    xhr.onload = function () {
        if (this.status === 200) {
            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim();
            try {
                const marcs = JSON.parse(cleanedText);
                const tbody = document.querySelector('#marcs-table tbody');
                tbody.innerHTML = ''; 
                marcs.forEach(marc => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${marc.nombre}</td>
                        <td>${marc.descripcion}</td>
                        <td>${marc.nacionalidad}</td>
                    `;
                    tbody.appendChild(tr);
                });

                // Llenar el select de marcas en los formularios
                const marcsSelects = document.querySelectorAll('select[name="id_marca"]');
                marcsSelects.forEach(select => {
                    select.innerHTML = '<option value="">Selecciona una marca</option>'; // Opción predeterminada
                    marcs.forEach(marc => {
                        const option = document.createElement('option');
                        option.value = marc.id_marca;
                        option.textContent = `${marc.nombre} ${marc.descripcion}`;
                        select.appendChild(option);
                    });
                });

            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        } else {
            console.error('Error fetching authors:', this.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Request error...');
    };
    xhr.send();
}










