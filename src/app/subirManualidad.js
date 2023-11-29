import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioSombrero = document.querySelector('#Formulario-Sombrero');

    formularioSombrero.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioSombrero['Nombre-Sombrero'].value;
        const TIPO = formularioSombrero['Tipo-Sombrero'].value;
        const COLOR = formularioSombrero['Color-Sombrero'].value;
        const TAMAÑO = parseInt(formularioSombrero['Tamaño-Sombrero'].value);
        const FECHA_FABRICACION = formularioSombrero['FechaFabricacion-Sombrero'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoSombreroRef = await addDoc(collection(db, 'Sombreros'), {
                Nombre: NOMBRE,
                Tipo: TIPO,
                Color: COLOR,
                Tamaño: TAMAÑO,
                FechaFabricacion: FECHA_FABRICACION
            });

            // Muestra un mensaje si todo sale bien
            alert(`El sombrero ${NOMBRE} ha sido registrado exitosamente`);

            // Limpia el formulario
            formularioSombrero.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar el sombrero:', 'noValido');
        }
    });
});
