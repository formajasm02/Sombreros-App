import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const TiendasStarbucks = document.querySelector('.TiendasStarbucks');
const FormularioActualizarTienda = document.querySelector('#Formulario-ActualizarTienda');

const obtenerTienda = (id) => getDoc(doc(db, 'Starbucks', id));

let id = '';

// Nueva función para actualizar tienda
const actualizarTienda = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Starbucks', id), nuevosValores);
        alert('Tienda de Starbucks actualizada correctamente');
    } catch (error) {
        alert('Error al actualizar la tienda de Starbucks', 'error');
    }
};

export const MostrarListaTiendasStarbucks = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const TiendaStarbucks = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre de la tienda: ${TiendaStarbucks.Nombre} </h5>
                    <p> Ubicación: ${TiendaStarbucks.Ubicacion} </p>
                    <p> Cantidad de Mesas: ${TiendaStarbucks.CantidadMesas} </p>
                    <p> Gerente: ${TiendaStarbucks.Gerente} </p>
                    <p> Fecha de Apertura: ${TiendaStarbucks.FechaApertura} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-TiendaStarbucks" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-TiendaStarbucks" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarTiendaStarbucks"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        TiendasStarbucks.innerHTML = html;

        const BotonesEliminar = TiendasStarbucks.querySelectorAll('.Eliminar-TiendaStarbucks');

        // ELIMINAR TIENDAS DE STARBUCKS
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Starbucks', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar la tienda de Starbucks:', 'error');
                }
            });
        });

        const BotonesActualizar = TiendasStarbucks.querySelectorAll('.Actualizar-TiendaStarbucks');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerTienda(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarTienda['Actualizar-Nombre'];
                const UBICACION = FormularioActualizarTienda['Actualizar-Ubicacion'];
                const CANTIDAD_MESAS = FormularioActualizarTienda['Actualizar-CantidadMesas'];
                const GERENTE = FormularioActualizarTienda['Actualizar-Gerente'];
                const FECHA_APERTURA = FormularioActualizarTienda['Actualizar-FechaApertura'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                UBICACION.value = DATOSDOCUMENTO.Ubicacion;
                CANTIDAD_MESAS.value = DATOSDOCUMENTO.CantidadMesas;
                GERENTE.value = DATOSDOCUMENTO.Gerente;
                FECHA_APERTURA.value = DATOSDOCUMENTO.FechaApertura;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar la tienda de Starbucks al enviar el formulario
        FormularioActualizarTienda.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarTienda['Actualizar-Nombre'].value;
                const UBICACION = FormularioActualizarTienda['Actualizar-Ubicacion'].value;
                const CANTIDAD_MESAS = FormularioActualizarTienda['Actualizar-CantidadMesas'].value;
                const GERENTE = FormularioActualizarTienda['Actualizar-Gerente'].value;
                const FECHA_APERTURA = FormularioActualizarTienda['Actualizar-FechaApertura'].value;

                await actualizarTienda(id, {
                    Nombre: NOMBRE,
                    Ubicacion: UBICACION,
                    CantidadMesas: CANTIDAD_MESAS,
                    Gerente: GERENTE,
                    FechaApertura: FECHA_APERTURA,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarTiendaStarbucks');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        TiendasStarbucks.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
