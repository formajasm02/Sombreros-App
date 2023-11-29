const BotoneSinSesion = document.querySelectorAll('.botoneSinSesion'),
    botonesConSesion = document.querySelectorAll('.botonesConSesion');

export const revisaSesion = usuario => {
    if (usuario) {
        botonesConSesion.forEach(link => link.style.display = 'block')
        BotoneSinSesion.forEach(link => link.style.display = 'none')
    } else {
        botonesConSesion.forEach(link => link.style.display = 'None')
        BotoneSinSesion.forEach(link => link.style.display = 'block')
    }
}