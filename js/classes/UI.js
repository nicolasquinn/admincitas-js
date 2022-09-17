import { cargarEdicion, DB, eliminarCita } from '../functions.js';
import { contenedorCitas } from '../selectors.js';

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

    mostrarCitas() {

        this.limpiarHTML();

        // Leo el contenido de la DB para mostrarlo en la UI.
        const objectStore = DB.transaction('citas').objectStore('citas');
        objectStore.openCursor().onsuccess = function (e) {
            const cursor = e.target.result;
            if (cursor) {

                const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;

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
    
                // Boton para eliminar
                const btnBorrar = document.createElement('BUTTON');
                btnBorrar.classList.add('btn', 'btn-danger', 'mr-2');
                btnBorrar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>`;
                btnBorrar.onclick = () => eliminarCita(id);
    
                // Botón para editar
                const btnEditar = document.createElement('BUTTON');
                btnEditar.classList.add('btn', 'btn-info');
                btnEditar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>`;
                btnEditar.onclick = () => cargarEdicion(item);
    
                // Agregar los elementos de scripting al divCita e insertar en el HTML
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);
                divCita.appendChild(btnBorrar);
                divCita.appendChild(btnEditar);
                contenedorCitas.appendChild(divCita);

                // Utilizo .continue para que siga iterando con el resto de elementos de la DB
                cursor.continue();

            }

        }

    }

    limpiarHTML () {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }


}

export default UI;