class Citas {

    constructor () {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( (cita) => cita.id !== id);
    }

    editarCita(citaAct) {
        this.citas = this.citas.map( (cita) => cita.id === citaAct.id ? citaAct : cita);
    }
    
}

export default Citas;