import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { inputMascota, inputFecha, inputHora, inputPropietario, inputSintomas, inputTelefono, formulario } from './selectors.js';

// Instanciamiento
export const adminCitas = new Citas();
export const ui = new UI();

// Modo edición
let editando;

// Información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// Agrega datos al obj. de cita
export function datosCita (e) {
    citaObj[e.target.name] = e.target.value;
}

// Validar y agregar citas a la class Citas
export function nuevaCita(e) {
    e.preventDefault();

    // destruct. de citaObj y validación
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
    if ( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if (editando) {
        // Modo edición
        adminCitas.editarCita({...citaObj});
        ui.mostrarAlerta('Cita editada exitosamente.');
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        editando = false;
    } else {
        // Modo nueva cita creo ID único agrego al array de citas.
        citaObj.id = Date.now();
        adminCitas.agregarCita({ ...citaObj });
        ui.mostrarAlerta('Cita agregada exitosamente.')
    }

    // Reinicio form y objCitas.
    reiniciarObjeto();
    formulario.reset();
    // inserto en el HTML.
    ui.mostrarCitas(adminCitas);
    // Guardo en el LocalStorage

}

// Reiniciar el citaObj tras haber creado una cita.
export function reiniciarObjeto () {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

// Elimina cita del array como en la UI
export function eliminarCita(id) {
    adminCitas.eliminarCita(id);
    ui.mostrarAlerta('Cita eliminada exitosamente');
    ui.mostrarCitas(adminCitas);
}

// Carga los datos y modo edición
export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Lleno los inputs con los datos de la cita
    inputMascota.value = mascota;
    inputPropietario.value = propietario;
    inputTelefono.value = telefono;
    inputFecha.value = fecha;
    inputHora.value = hora;
    inputSintomas.value = sintomas;

    // Modificar el objeto global
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambio el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Editar y guardar cambios';

    editando = true;

}