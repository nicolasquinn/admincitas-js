if( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('./sw.js')
        .then( registrado => console.log('Se instaló correctamente.', registrado) )
        .catch( error => console.log('Falló la instalación.', error ) );
} else {
    console.log('No se pudo registrar el SW, no es soportado.')
}