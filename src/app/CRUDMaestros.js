import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Sombreros = document.querySelector('.Sombreros');
const FormularioActualizarSombrero = document.querySelector('#Formulario-ActualizarSombrero');

const obtenerSombrero = (id) => getDoc(doc(db, 'Sombreros', id));

let id = '';

// Nueva función para actualizar sombrero
const actualizarSombrero = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Sombreros', id), nuevosValores);
        alert('Sombrero actualizado correctamente');
    } catch (error) {
        alert('Error al actualizar el sombrero', 'error');
    }
};

export const MostrarListaSombreros = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Sombrero = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre del sombrero: ${Sombrero.Nombre} </h5>
                    <p> Tipo: ${Sombrero.Tipo} </p>
                    <p> Color: ${Sombrero.Color} </p>
                    <p> Tamaño: ${Sombrero.Tamaño} </p>
                    <p> Fecha de Fabricación: ${Sombrero.FechaFabricacion} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Sombrero" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-Sombrero" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarSombrero"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Sombreros.innerHTML = html;

        const BotonesEliminar = Sombreros.querySelectorAll('.Eliminar-Sombrero');

        // ELIMINAR SOMBREROS
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Sombreros', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar el sombrero:', 'error');
                }
            });
        });

        const BotonesActualizar = Sombreros.querySelectorAll('.Actualizar-Sombrero');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerSombrero(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarSombrero['Actualizar-Nombre'];
                const TIPO = FormularioActualizarSombrero['Actualizar-Tipo'];
                const COLOR = FormularioActualizarSombrero['Actualizar-Color'];
                const TAMAÑO = FormularioActualizarSombrero['Actualizar-Tamaño'];
                const FECHA_FABRICACION = FormularioActualizarSombrero['Actualizar-FechaFabricacion'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                TIPO.value = DATOSDOCUMENTO.Tipo;
                COLOR.value = DATOSDOCUMENTO.Color;
                TAMAÑO.value = DATOSDOCUMENTO.Tamaño;
                FECHA_FABRICACION.value = DATOSDOCUMENTO.FechaFabricacion;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar el sombrero al enviar el formulario
        FormularioActualizarSombrero.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarSombrero['Actualizar-Nombre'].value;
                const TIPO = FormularioActualizarSombrero['Actualizar-Tipo'].value;
                const COLOR = FormularioActualizarSombrero['Actualizar-Color'].value;
                const TAMAÑO = FormularioActualizarSombrero['Actualizar-Tamaño'].value;
                const FECHA_FABRICACION = FormularioActualizarSombrero['Actualizar-FechaFabricacion'].value;

                await actualizarSombrero(id, {
                    Nombre: NOMBRE,
                    Tipo: TIPO,
                    Color: COLOR,
                    Tamaño: TAMAÑO,
                    FechaFabricacion: FECHA_FABRICACION,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarSombrero');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Sombreros.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
