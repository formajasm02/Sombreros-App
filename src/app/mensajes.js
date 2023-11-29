export function mostrarMensaje(mensaje, tipo = "valido") {
    Toastify({
        text: mensaje,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: tipo === "valido" ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #ff0000, #ff8c00)"
        },
        onClick: function () { } // Callback after click
    }).showToast();
}