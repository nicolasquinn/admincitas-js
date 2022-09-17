import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { inputMascota, inputFecha, inputHora, inputPropietario, inputSintomas, inputTelefono, formulario } from './selectors.js';

// Crear base de datos
export let DB;
export function baseDatos () {
    window.onload = () => {
        crearDB();
    }
}

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

        // Insertar la cita en la DB
        const transaction = DB.transaction(['citas'], 'readwrite');
        const objectStore = transaction.objectStore('citas')
        objectStore.add(citaObj)

        transaction.oncomplete = function () {
            console.log("Transacción exitosa, objeto insertado.")
            // Muestro mensaje en la UI.
            ui.mostrarAlerta('Cita agregada exitosamente.')
        }

    }

    // Reinicio form y objCitas.
    reiniciarObjeto();
    formulario.reset();
    // inserto en el HTML.
    ui.mostrarCitas();
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
    ui.mostrarCitas();
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

function crearDB () {

    // Creo la DB versión 1.0
    const crearDB = window.indexedDB.open('citas', 1);

    // Si hay un error
    crearDB.onerror = () => {
        console.log('Error al crear la base de datos.');
    }

    // Si se carga
    crearDB.onsuccess = () => {
        console.log('Base de datos cargada correctamente.')
        DB = crearDB.result;
        // Muestro las citas existenes en el HTML
        ui.mostrarCitas();
    }

    crearDB.onupgradeneeded = (e) => {
        const db = e.target.result;
        
        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true
        })

        // Defino las columnas
        objectStore.createIndex('mascota', 'mascota', { unique: false });
        objectStore.createIndex('propietario', 'propietario', { unique: false });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('fecha', 'fecha', { unique: false });
        objectStore.createIndex('hora', 'hora', { unique: false });
        objectStore.createIndex('sintomas', 'sintomas', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });

        console.log("DB Creada.")
    }

}