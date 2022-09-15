// Variables

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

const inputMascota = document.querySelector('#mascota');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');

// Event Listeners
eventListeners();
function eventListeners() {

    inputMascota.addEventListener('input', datosCita);
    inputPropietario.addEventListener('input', datosCita);
    inputTelefono.addEventListener('input', datosCita);
    inputFecha.addEventListener('input', datosCita);
    inputHora.addEventListener('input', datosCita);
    inputSintomas.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);

}

class Citas {
    constructor () {
        this.citas = [];
    }
}

class UI {

    mostrarAlerta(msj, tipo) {

        const divAlerta = document.createElement('DIV');
        divAlerta.textContent = msj;
        divAlerta.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if (tipo === 'error') {
            divAlerta.classList.add('alert-danger');
        } else {
            divAlerta.classList.add('alert-success');
        }

        document.querySelector('#contenido').insertBefore(divAlerta, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divAlerta.remove();
        }, 5000);

    }

}

const adminCitas = new Citas();
const ui = new UI();

// Información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// Functions

// Agrega datos al obj. de cita
function datosCita (e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj)
}

// Validar y agregar citas a la class Citas
function nuevaCita(e) {
    e.preventDefault();

    // destruct. de citaObj y validación
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

}