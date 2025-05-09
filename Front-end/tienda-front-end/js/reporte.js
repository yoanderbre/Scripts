document.addEventListener('DOMContentLoaded', () => {
alert("hola bienvenido")
fetchprend()
});


const API_URL = "http://localhost/tiendaropaY/api/v1/public/index.php";

function fetchprend() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL+'/prenda', true);
    xhr.onload = function () {
        if (this.status === 200) {
            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim();
            try {
                const prend = JSON.parse(cleanedText);
                const tbody = document.querySelector('#prenda-table tbody');
                tbody.innerHTML = ''; // Limpiar contenido previo
                prend.forEach(prend => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${prend.titulo}</td>
                        <td>$${prend.precio}</td>
                        <td>${prend.cantidad_stock}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        } else {
            console.error('Error fetching books:', this.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Request error...');
    };
    xhr.send();
}


