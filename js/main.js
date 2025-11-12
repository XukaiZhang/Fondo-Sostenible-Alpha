/* Por qué 'DOMContentLoaded':
  Este evento nos asegura que el script solo se ejecute DESPUÉS
  de que todo el HTML de la página (DOM) se haya cargado.
  Si no lo usamos, el script podría intentar buscar 'sector-inversion'
  antes de que exista, y fallaría.
*/
document.addEventListener('DOMContentLoaded', function() {

    // 1. OBTENER LOS ELEMENTOS DEL DOM
    // Por qué 'getElementById': Es la forma más rápida de encontrar un elemento por su ID.
    const selector = document.getElementById('sector-inversion');
    
    // Por qué 'querySelectorAll': Encuentra TODOS los elementos que coinciden
    // con la clase '.ods-icon-card' y los devuelve como una lista.
    const odsIcons = document.querySelectorAll('.ods-icon-card');
    
    // Por qué estas variables: Guardamos los elementos del panel de resultados
    // para no tener que buscarlos en el DOM cada vez que se actualiza. Es más eficiente.
    const resultadoPanel = document.getElementById('resultado-texto');
    const resultadoTitulo = document.getElementById('resultado-titulo');
    const resultadoDescripcion = document.getElementById('resultado-descripcion');

    // 2. DEFINIR LA LÓGICA (MAPA DE DATOS)
    // Por qué un objeto: Es la forma más limpia de almacenar la lógica.
    // Mapea el 'value' de la opción <select> con los ODS que debe activar
    // y el texto que debe mostrar.
    const sectorODSMap = {
        'eolica': {
            ods: ['7', '13'], // Energía Eólica activa ODS 7 y 13
            titulo: 'Impacto: Energía Eólica',
            desc: 'Este sector es crucial para la transición energética (ODS 7) y es una de las herramientas más efectivas en la acción climática (ODS 13).'
        },
        'infraestructura': {
            ods: ['9', '13'], // Infraestructura activa ODS 9 y 13
            titulo: 'Impacto: Infraestructura Sostenible',
            desc: 'Invertir en infraestructura resiliente (ODS 9) es vital para adaptarnos a los efectos del cambio climático (ODS 13) y reducir emisiones.'
        },
        'cleantech': {
            ods: ['7', '9'], // CleanTech activa ODS 7 y 9
            titulo: 'Impacto: Tecnología Limpia',
            desc: 'La innovación (ODS 9) en tecnologías limpias, como el almacenamiento de energía (baterías), habilita el despliegue de energía renovable (ODS 7).'
        },
        'todas': {
            ods: ['7', '9', '13'], // La cartera completa activa los 3
            titulo: 'Impacto: Cartera Completa (Fondo Alpha)',
            desc: 'Nuestra cartera diversificada busca un impacto integral, abordando la innovación, la energía limpia y la acción climática de forma conjunta.'
        },
        'default': {
            ods: [], // 'default' (ninguno seleccionado) no activa ninguno
            titulo: '',
            desc: ''
        }
    };

    // 3. ESCUCHAR EVENTOS
    // Por qué 'if (selector)': Es una buena práctica de programación defensiva.
    // El script se carga en TODAS las páginas, pero el selector
    // solo existe en 'simulador.html'. Esto evita un error en las otras páginas.
    if (selector) {
        // Por qué 'change': Este evento se dispara cada vez que el
        // usuario selecciona una NUEVA opción en el menú <select>.
        selector.addEventListener('change', function(event) {
            
            // Por qué 'event.target.value': Obtiene el valor de la opción
            // seleccionada (ej. 'eolica', 'infraestructura', etc.).
            const sectorSeleccionado = event.target.value;
            
            // Por qué llamar a una función: Es una buena práctica (separación de
            // responsabilidades). Este listener "escucha" y la función "hace el trabajo".
            actualizarPanelODS(sectorSeleccionado);
        });
    }

    // 4. FUNCIÓN DE ACTUALIZACIÓN (Lógica principal)
    
    // Por qué esta función: Centraliza toda la lógica de la UI.
    // Recibe el sector (ej. 'eolica') y se encarga de cambiar las clases CSS.
    function actualizarPanelODS(sector) {
        
        // Obtiene la información (ODS a activar, título, desc) desde nuestro 'mapa'
        const infoSector = sectorODSMap[sector] || sectorODSMap['default'];
        const odsParaActivar = infoSector.ods;

        // A. Actualizar los Iconos ODS
        
        // Por qué 'forEach': Recorremos CADA icono ODS (los 3) uno por uno.
        odsIcons.forEach(icon => {
            // Obtenemos su número de ODS (ej. '7') guardado en 'data-ods' en el HTML
            const odsNum = icon.dataset.ods; 

            // Por qué esta lógica (includes):
            // Comprobamos si el número de este icono (odsNum)
            // está INCLUIDO en la lista de ODS que queremos activar (odsParaActivar).
            if (odsParaActivar.includes(odsNum)) {
                // SÍ está: quitamos 'dimmed' y añadimos 'active'.
                icon.classList.remove('dimmed');
                icon.classList.add('active');
            } else {
                // NO está: quitamos 'active' y volvemos a poner 'dimmed'.
                icon.classList.remove('active');
                icon.classList.add('dimmed');
            }
        });

        // B. Actualizar el Panel de Resultados (Texto)
        
        // Por qué 'textContent': Es la forma segura de insertar texto
        // (evita problemas de seguridad XSS) en un elemento HTML.
        if (sector !== 'default') {
            resultadoTitulo.textContent = infoSector.titulo;
            resultadoDescripcion.textContent = infoSector.desc;
            resultadoPanel.style.display = 'block'; // Hacemos visible el panel
        } else {
            resultadoPanel.style.display = 'none'; // Ocultamos el panel si no hay nada seleccionado
        }
    }
});