import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

const GoogleAuthButton = document.querySelector('#Google-Auth');
GoogleAuthButton.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();

    try {
        const CREDENCIALES = await signInWithPopup(auth, provider)

        const MODALINICIASESION = document.querySelector('#InicioSesion'),
            MODAL = bootstrap.Modal.getInstance(MODALINICIASESION);
        MODAL.hide()

        alert(`Bienvenido ${CREDENCIALES.user.displayName}`)
    } catch (error) {
        console.log(error.code);
    }
})