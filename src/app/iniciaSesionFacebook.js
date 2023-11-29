import { GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

const FacebookAuthButton = document.querySelector('#Facebook-Auth');
FacebookAuthButton.addEventListener('click', async () => {
    const provider = new GithubAuthProvider();

    try {
        const CREDENCIALES = await signInWithPopup(auth, provider)

        const MODALINICIASESION = document.querySelector('#InicioSesion'),
            MODAL = bootstrap.Modal.getInstance(MODALINICIASESION);
        MODAL.hide()

        alert(`Bienvenido ${CREDENCIALES.user.email}`)
    } catch (error) {
        console.log(error.code);
    }
})