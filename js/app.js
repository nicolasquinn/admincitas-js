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
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// Functions
function datosCita (e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj)
}