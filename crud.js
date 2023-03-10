//Creacion de Objeto del Inventario
var identificador = '';
var myModal = new bootstrap.Modal('#agg-modal');
var myModal2 = new bootstrap.Modal('#edit-modal');
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
  const tipoFil = document.getElementById('select').value;
  Inventario.Buscar(this.value, tipoFil);
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
    mensajeSatisfactorio('agregado');
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
    let Inventario = [];
    if (data) {
      Inventario = data;
    } else {
      Inventario = JSON.parse(localStorage.getItem('Data'));
    }
    if (
      localStorage.getItem('Data') !== null
        ? localStorage.getItem('Data') !== '[]'
        : false
    ) {
      document.getElementById('table').classList.remove('d-none')
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
            <td class="col nombre-id text-capitalize text-end text-md-start">
              <p>
                ${nombre}
                <small class="d-block id">${id}</small>
              </p>
            </td>
            <td class="col col-md-3 cantidad-peso text-end">
              <p class="col-9">
                ${cantidad}
                <small class="d-block">${peso}${unidad}</small>
              </p>
            </td>
            <td class="col-md-3 text-end precio">${precio}$</td>
            <td class="col-md-3 opciones">
              <div class="col-md-auto d-flex justify-content-md-center">
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-tertiary p-2" data-bs-toggle="modal" onclick="Inventario.Actualizar('${id}')" data-bs-target="#edit-modal"">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  <button type="button" class="btn btn-tertiary color-danger p-2" onclick="Inventario.Eliminar('${id}')">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </td>
          </tr>
        `;
      }
    } else {
      document.getElementById('table').classList.add('d-none')
      document.getElementById('t-render').innerHTML = '';
      document.getElementById('menssage').innerHTML = '';
      document.getElementById('menssage').innerHTML += `
        <div class="table-message">
          <i class="fa-solid fa-face-frown"></i>
          <p class="my-2">
            Parece que no hay ning??n producto agregado
            <button
              type="button"
              class="btn text-link d-block mx-auto"
              data-bs-toggle="modal"
              data-bs-target="#agg-modal"
            >
              da clic aqu?? para agregar uno
            </button>
          </p>
        </div>
        `;
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
    myModal2.hide();
    mensajeSatisfactorio('actualizado');
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
        identificador = i;
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
    if (
      localStorage.getItem('Data') !== null
        ? localStorage.getItem('Data') !== '[]'
        : false
    ) {
      let data = 'data:text/json;charset=utf-8,' + encodeURIComponent(object);
      let download = document.createElement('a');
      download.setAttribute('href', data);
      download.setAttribute('download', 'Exportacion' + '.json');
      download.click();
      download.remove();
    } else {
      document.getElementById('notificacion').innerHTML = '';
      document.getElementById('notificacion').classList.add('color-error');
      document.getElementById('notificacion').innerHTML += `
      <i class="fa-solid fa-triangle-exclamation"></i>
      <p class="m-0 px-2">Asegurese de tener datos para exportar</p>`;
      setTimeout(() => {
        document.getElementById('notificacion').classList.remove('color-error');
        document.getElementById('notificacion').innerHTML = '';
      }, 5000);
    }
  }

  //Buscar

  static Buscar(buscar, tipo) {
    let inventario = JSON.parse(localStorage.getItem('Data'));
    let filtrados = [];

    if (tipo == 'Producto') {
      filtrados = inventario.filter((inv) => inv.nombre.includes(buscar));
    } else if (tipo == 'Unidad') {
      filtrados = inventario.filter((inv) => inv.unidad.includes(buscar));
    } else if (tipo == 'Peso') {
      filtrados = inventario.filter((inv) => inv.peso.includes(buscar));
    } else {
      filtrados = inventario.filter((inv) => inv.precio.includes(buscar));
    }
    if (filtrados.length) {
      Inventario.read(filtrados);
    } else {
      document.getElementById('t-render').innerHTML = '';
      document.getElementById('menssage').innerHTML = '';
      document.getElementById('menssage').innerHTML += `
      <div class="table-message">
        <i class="fa-solid fa-file-excel"></i>
        <p class="my-2">
          No encontramos resultados en tu b??squeda
        </p>
      </div>
      `;
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
        localStorage.setItem('Data', JSON.stringify(data));
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

function mensajeSatisfactorio(men) {
  document.getElementById('notificacion').innerHTML = '';
  document.getElementById('notificacion').classList.add('color-success');
  document.getElementById('notificacion').innerHTML +=
    `
  <i class="fa-solid fa-circle-check"></i>
  <p class="m-0 px-2">Se ha ` +
    men +
    ` satisfactoriamente</p>`;
  setTimeout(() => {
    document.getElementById('notificacion').classList.remove('color-success');
    document.getElementById('notificacion').innerHTML = '';
  }, 5000);
}

function mensajeError() {
  document.getElementById('notificacion').innerHTML = '';
  document.getElementById('notificacion').classList.add('color-error');
  document.getElementById('notificacion').innerHTML += `
  <i class="fa-solid fa-triangle-exclamation"></i>
  <p class="m-0 px-2">Producto duplicado</p>`;
  setTimeout(() => {
    document.getElementById('notificacion').classList.remove('color-error');
    document.getElementById('notificacion').innerHTML = '';
  }, 5000);
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

  var verificacion = document.getElementById('basic-addon1');
  if (Inventario.Duplicated(object)) {
    verificacion.classList.replace('color-success', 'color-error');
    mensajeError();
  } else {
    verificacion.classList.replace('color-error', 'color-success');
    Inventario.CreateObject(object);
  }
});

let editForm = document.getElementById('editProducto');
editForm.addEventListener('submit', function (e) {
  e.preventDefault();
});
