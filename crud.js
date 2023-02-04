//Creacion de Objeto del Inventario

var myModal = new bootstrap.Modal('#agg-modal');
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
var inputBuscar = document.getElementById('search-addon');
inputBuscar.addEventListener('input', function () {
  const tipoFil = document.getElementById('select').value
  Inventario.Buscar(this.value, tipoFil)
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

  static CreateObject(object) {
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
    var dup = false;
    if (localStorage.getItem('Data') !== null) {
      let inventario = JSON.parse(localStorage.getItem('Data'));
      inventario.forEach((i) => {
        if (
          i.nombre == object.nombre &&
          i.peso == object.peso &&
          i.unidad == object.unidad
        ) {
          dup = true;
        }
      });
    }
    return dup;
  }

  //Leer

  static read(data) {
    let Inventario = []
    if (data) {
      Inventario = data
    } else {
      Inventario = JSON.parse(localStorage.getItem('Data'));
    }
    if (
      localStorage.getItem('Data') !== null
        ? localStorage.getItem('Data') !== '[]'
        : false
    ) {
      document.getElementById('t-render').innerHTML = '';
      document.getElementById('menssage').innerHTML = '';
      for (let i = 0; i < Inventario.length; i++) {
        let nombre = Inventario[i].nombre;
        let cantidad = Inventario[i].cantidad;
        let peso = Inventario[i].peso;
        let unidad = Inventario[i].unidad;
        let precio = Inventario[i].precio;
        let id = Inventario[i].id;

        document.getElementById('t-render').innerHTML += `
          <tr>
              <td class="text-end">${nombre}</td>
              <td class="text-end">${cantidad}</td>
              <td class="text-end">${peso}</td>
              <td class="text-end">${unidad}</td>
              <td class="text-end">${precio}</td>
              <td class="d-flex justify-content-center">
                  <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-tertiary p-2" data-bs-toggle="modal" onclick="Inventario.Actualizar('${id}')" data-bs-target="#edit-modal"">
                      <i class="fa-solid fa-pen"></i>
                  </button>
                  <button type="button" class="btn btn-tertiary color-danger p-2" onclick="Inventario.Eliminar('${id}')">
                      <i class="fa-solid fa-trash"></i>
                  </button>
                  </div>
              </td>
              <td class="text-end">${id}</td>.
          </tr>
          `;
      }
    } else {
      document.getElementById('t-render').innerHTML = '';
      document.getElementById('menssage').innerHTML = '';
      document.getElementById('menssage').innerHTML += `
          <i class="fa-solid fa-face-frown"></i>
          <p>
            Parece que no hay ningún producto agregado
          </p>`;
    }
  }
  //editar

  static edit(index) {
    let inventario = JSON.parse(localStorage.getItem('Data'));
    inventario[index].nombre =
      document.getElementById('nombreProductoEdit').value;
    inventario[index].cantidad = document.getElementById(
      'cantidadProductoEdit'
    ).value;
    inventario[index].peso = document.getElementById('pesoEdit').value;
    inventario[index].unidad = document.querySelector(
      'input[name="unidadEdit"]:checked'
    ).value;
    inventario[index].precio = document.getElementById('precioEdit').value;
    localStorage.setItem('Data', JSON.stringify(inventario));
    Inventario.read();
  }

  //Actualizar

  static Actualizar(id) {
    let inventario = JSON.parse(localStorage.getItem('Data'));

    for (let i = 0; i < inventario.length; i++) {
      if (inventario[i].id == id) {
        document.getElementById('nombreProductoEdit').value =
          inventario[i].nombre;
        document.getElementById('cantidadProductoEdit').value =
          inventario[i].cantidad;
        document.getElementById('pesoEdit').value = inventario[i].peso;
        document.querySelector(
          `[id="${inventario[i].unidad}Edit"]`
        ).checked = true;
        document.getElementById('precioEdit').value = inventario[i].precio;
        let button = document.getElementById('guardarEdit');
        button.addEventListener('click', function () {
          Inventario.edit(i);
        });
      }
    }
  }

  //Eliminar

  static Eliminar(id) {
    let inventario = JSON.parse(localStorage.getItem('Data'));
    for (let i = 0; i < inventario.length; i++) {
      if (inventario[i].id == id) {
        inventario.splice(i, 1);
      }
    }
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

  //Buscar

  static Buscar(buscar, tipo) {
    let inventario = JSON.parse(localStorage.getItem('Data'));
    let filtrados = []

    if (tipo == 'Producto') {
      filtrados = inventario.filter(inv => inv.nombre.includes(buscar))
    } else if (tipo == 'Unidad') {
      filtrados = inventario.filter(inv => inv.unidad.includes(buscar))
    } else if (tipo == 'Peso') {
      filtrados = inventario.filter(inv => inv.peso.includes(buscar))
    } else {
      filtrados = inventario.filter(inv => inv.precio.includes(buscar))
    }
    if (filtrados.length) {
      Inventario.read(filtrados)
    } else {
      document.getElementById('t-render').innerHTML = '';
      document.getElementById('menssage').innerHTML = '';
      document.getElementById('menssage').innerHTML += `
        <i class="fa-solid fa-file-excel"></i>
        <p>
          No encontramos resultados en tu búsqueda
        </p>`;
    }
  }
  //Importar

  static Import() {
    let input_file = document.getElementById('input-file');
    input_file.setAttribute('accept', '.json');
    input_file.addEventListener('change', function () {
      let file = input_file.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener('load', function () {
        let data = JSON.parse(reader.result);
        for (let i = 0; i < data.length; i++) {
          localStorage.setItem('Data', JSON.stringify(data));
        }
        location.reload();
      });
    });
    input_file.click();
  }
}

function limpiarCampos() {
  document.getElementById('nombreProducto').value = '';
  document.getElementById('cantidadProducto').value = '';
  document.getElementById('peso').value = '';
  document.getElementById('precio').value = '';
  document
    .querySelectorAll('#addProducto input[type=radio]')
    .forEach(function (checkElement) {
      checkElement.checked = false;
    });
}

Inventario.read();

let addForm = document.getElementById('addProducto');
addForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let object = new Inventario(
    document.getElementById('nombreProducto').value,
    document.getElementById('cantidadProducto').value,
    document.getElementById('peso').value,
    document.getElementById('precio').value,
    document.querySelector('input[name="unidad"]:checked').value,
    uuid.v1()
  );

  if (Inventario.Duplicated(object)) {
    //aqui ira un mensaje jeje
  } else Inventario.CreateObject(object);
});
