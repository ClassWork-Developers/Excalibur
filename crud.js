//Creacion de Objeto del Inventario

class Inventario {
    constructor(nombre, cantidad, peso, precio, unidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.peso = peso;
        this.precio = precio;
        this.unidad = unidad;
    }

    //Crear y Guardar

    static CreateObject() {
        let object = new Inventario(
            document.getElementById('nombreProducto').value,
            document.getElementById('cantidadProducto').value,
            document.getElementById('peso').value,
            document.getElementById('precio').value,
            document.querySelector('input[name="unidad"]:checked').value
        );

        if (localStorage.getItem('Data') === null) {
            let inventario = [];
            inventario.push(object);
            if (Inventario.Duplicated(object) === false) {
                localStorage.setItem('Data', JSON.stringify(inventario));
            } else {
                alert('Ya existe');
            }
        } else {
            let inventario = JSON.parse(localStorage.getItem('Data'));
            inventario.push(object);
            if (Inventario.Duplicated(object) === false) {
                localStorage.setItem('Data', JSON.stringify(inventario));
            } else {
                alert('Ya existe');
            }
        }
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

    static Actualizar(i) {
        let Inventario = localStorage.getItem(JSON.parse('Inventario'));
        Inventario[i].nombre = document.getElementById('ID DEL INPUT DEL FORM');
        Inventario[i].marca = document.getElementById('ID DEL INPUT DEL FORM');
        Inventario[i].descripcion = document.getElementById(
            'ID DEL INPUT DEL FORM'
        );
        Inventario[i].precio = document.getElementById('ID DEL INPUT DEL FORM');
        localStorage.setItem('Inventario', JSON.stringify(Inventario));
    }

    //Eliminar

    static Eliminar(name) {
        let Inventario = localStorage.getItem(JSON.parse('Inventario'));
        Inventario.forEach((i) => {
            if (i.nombre === tittle) {
                Inventario.slice(i, 1);
            }
        });
        localStorage.setItem('Inventario', JSON.stringify(Inventario));
    }
}
