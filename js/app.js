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
        this.citas = []
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

}

class UI {

    mostrarAlerta(msj, tipo) {

        // Crear e insertar alerta al validar formulario
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

    mostrarCitas({ citas }) {

        this.limpiarHTML();

        citas.forEach( item => {

            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = item;

            const divCita = document.createElement('DIV');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos
            const mascotaParrafo = document.createElement('H2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Teléfono:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;

            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora:</span> ${hora}
            `;

            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Síntomas:</span> ${sintomas}
            `;

            // Agregar los elementos de scripting al divCita e insertar en el HTML
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            contenedorCitas.appendChild(divCita);

        })

    }

    limpiarHTML () {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }


}

// Instanciamiento
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
}

// Validar y agregar citas a la class Citas
function nuevaCita(e) {
    e.preventDefault();

    // destruct. de citaObj y validación
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
    if ( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    // generar ID y agrego el objeto al arreglo, reinicio objeto y form.
    citaObj.id = Date.now();
    adminCitas.agregarCita({ ...citaObj });
    reiniciarObjeto();
    formulario.reset();

    // inserto en el HTML.
    ui.mostrarCitas(adminCitas);

}

// Reiniciar el citaObj tras haber creado una cita.
function reiniciarObjeto () {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}