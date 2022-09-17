import { datosCita, nuevaCita, baseDatos } from '../functions.js';
import { inputMascota, inputFecha, inputHora, inputPropietario, inputSintomas, inputTelefono, formulario } from '../selectors.js';

class App {

    constructor() {
        this.initApp();
    }

    initApp() {

        baseDatos();
        
        inputMascota.addEventListener('input', datosCita);
        inputPropietario.addEventListener('input', datosCita);
        inputTelefono.addEventListener('input', datosCita);
        inputFecha.addEventListener('input', datosCita);
        inputHora.addEventListener('input', datosCita);
        inputSintomas.addEventListener('input', datosCita);
        
        formulario.addEventListener('submit', nuevaCita);
        
    }
}

export default App;