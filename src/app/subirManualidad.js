import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioTiendaStarbucks = document.querySelector('#Formulario-TiendaStarbucks');

    formularioTiendaStarbucks.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioTiendaStarbucks['Nombre-Tienda'].value;
        const UBICACION = formularioTiendaStarbucks['Ubicacion-Tienda'].value;
        const CANTIDAD_MESAS = parseInt(formularioTiendaStarbucks['CantidadMesas-Tienda'].value);
        const GERENTE = formularioTiendaStarbucks['Gerente-Tienda'].value;
        const FECHA_APERTURA = formularioTiendaStarbucks['FechaApertura-Tienda'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevaTiendaRef = await addDoc(collection(db, 'Starbucks'), {
                Nombre: NOMBRE,
                Ubicacion: UBICACION,
                CantidadMesas: CANTIDAD_MESAS,
                Gerente: GERENTE,
                FechaApertura: FECHA_APERTURA
            });

            // Muestra un mensaje si todo sale bien
            alert(`La tienda de Starbucks ${NOMBRE} ha sido registrada exitosamente`);

            // Limpia el formulario
            formularioTiendaStarbucks.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar la tienda de Starbucks:', 'noValido');
        }
    });
});
