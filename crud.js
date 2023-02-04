//Creacion de Objeto del Inventario

var myModal = new bootstrap.Modal('#exampleModal');
var inputPrecio = document.getElementById('precio');
inputPrecio.addEventListener('input', function () {
    if (this.value < 0) {
        this.value = this.value * -1;
    }
});
var inputcantidadProducto = document.getElementById('cantidadProducto');
inputcantidadProducto.addEventListener('input', function () {
    if (this.value < 0) {
        this.value = this.value * -1;
    }
});
var inputPeso = document.getElementById('peso');
inputPeso.addEventListener('input', function () {
    if (this.value < 0) {
        this.value = this.value * -1;
    }
});
class Inventario {
    constructor(nombre, cantidad, peso, precio, unidad, id) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.peso = peso;
        this.unidad = unidad;
        this.precio = precio;
        this.id = id;
    }

    //Crear y Guardar

    static CreateObject() {
        let object = new Inventario(
            document.getElementById('nombreProducto').value,
            document.getElementById('cantidadProducto').value,
            document.getElementById('peso').value,
            document.getElementById('precio').value,
            document.querySelector('input[name="unidad"]:checked').value,
            uuid.v1()
        );

        if (localStorage.getItem('Data') === null) {
            let inventario = [];
            inventario.push(object);
            localStorage.setItem('Data', JSON.stringify(inventario));
        } else {
            let inventario = JSON.parse(localStorage.getItem('Data'));
            inventario.push(object);
            localStorage.setItem('Data', JSON.stringify(inventario));
        }
        limpiarCampos();
        myModal.hide();
        Inventario.read();
    }

    static Duplicated(object) {
        if (localStorage.getItem('Data') === null) {
            return false;
        } else {
            let inventario = JSON.parse(localStorage.getItem('Data'));
            inventario.forEach((i) => {
                if (i.nombre === object.nombre && i.peso === object.peso) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }

    //Leer

    static read() {
        let Inventario = JSON.parse(localStorage.getItem('Data'));
        document.getElementById('t-render').innerHTML = '';
        for (let i = 0; i < Inventario.length; i++) {
            let nombre = Inventario[i].nombre;
            let cantidad = Inventario[i].cantidad;
            let peso = Inventario[i].peso;
            let unidad = Inventario[i].unidad;
            let precio = Inventario[i].precio;
            let id = Inventario[i].id;

            document.getElementById('t-render').innerHTML += `
        <tr>
            <td scope="row">1</th>
            <td class="text-end">${nombre}</td>
            <td class="text-end">${cantidad}</td>
            <td class="text-end">${peso}</td>
            <td class="text-end">${unidad}</td>
            <td class="text-end">${precio}</td>
            <td class="d-flex justify-content-center">
                <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-tertiary p-2" onclick="Inventario.Actualizar('${id}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="btn btn-tertiary color-danger p-2" onclick="Inventario.Eliminar('${id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
                </div>
            </td>
            <td class="text-end">${id}</td>.
        </tr>
        `
        }
    }

    //editar

    static edit(name) {
        let Inventario = localStorage.getItem(JSON.parse('Inventario'));
        Inventario.forEach((i) => {
            if (i.nombre == name) {
                document.getElementById(
                    'ID DEL INPUT A LLENAR CON DATA'
                ).value = i.nombre;
                document.getElementById(
                    'ID DEL INPUT A LLENAR CON DATA'
                ).value = i.marca;
                document.getElementById(
                    'ID DEL INPUT A LLENAR CON DATA'
                ).value = i.descripcion;
                document.getElementById(
                    'ID DEL INPUT A LLENAR CON DATA'
                ).value = i.precio;
                document.getElementById(
                    'ID DEL INPUT NO DISPLAY DE LA POSICION'
                ).value = i;
            }
        });
    }

    //Actualizar

    static Actualizar(id) {

        


        let inventario = JSON.parse(localStorage.getItem('Data'));



        Inventario[i].nombre = document.getElementById('ID DEL INPUT DEL FORM');
        Inventario[i].marca = document.getElementById('ID DEL INPUT DEL FORM');
        Inventario[i].descripcion = document.getElementById(
            'ID DEL INPUT DEL FORM'
        );
        Inventario[i].precio = document.getElementById('ID DEL INPUT DEL FORM');
        localStorage.setItem('Inventario', JSON.stringify(Inventario));
    }

    //Eliminar

    static Eliminar(id) {
        let inventario = JSON.parse(localStorage.getItem('Data'));
        inventario.forEach((i) => {
            if (i.id == id) {
                inventario.splice(i, 1);
            }
        });
        localStorage.setItem('Data', JSON.stringify(inventario));
        Inventario.read();
    }

    //Exportar

    static Export() {
        let object = localStorage.getItem('Data');
        let data = 'data:text/json;charset=utf-8,' + encodeURIComponent(object);
        let download = document.createElement('a');
        download.setAttribute('href', data);
        download.setAttribute('download', 'Exportacion' + '.json');
        download.click();
        download.remove();
    }
}

function limpiarCampos() {
    document.getElementById('nombreProducto').value = '';
    document.getElementById('cantidadProducto').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('precio').value = '';
    document.querySelector('input[name="unidad"]:checked').value = false;
}

Inventario.read();

let addForm = document.getElementById('addProducto');
addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    Inventario.CreateObject();
});
