
// Cuando se instala el SW por primera vez.
self.addEventListener('install', e => {
    console.log('Se instaló correctamente el SW, esto no se volverá a mostrar.');
    console.log(e);
});

// Cuando se activa el SW
self.addEventListener('activate', e => {
    console.log('Se activó el SW.');
    console.log(e);
});

// Evento fetch para descargarla
self.addEventListener('fetch', e => {
    console.log('Fetch', e);
})