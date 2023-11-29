import { signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

const CerrarSesion = document.querySelector('#CerrarSesion');

CerrarSesion.addEventListener('click', async () => {
    await signOut(auth);
    alert('Hasta Pronto');

    // Agregar un retraso de 2 segundos antes de redirigir
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});


