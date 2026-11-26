// ===== CUENTAS (simulación en el navegador) =====
const cuUsuario = document.getElementById("cuUsuario");
const cuClave = document.getElementById("cuClave");
const mensajeCuenta = document.getElementById("mensajeCuenta");
const estadoSesion = document.getElementById("estadoSesion");
const listaPedidos = document.getElementById("listaPedidos");
const botonRegistro = document.getElementById("btnRegistro");
const botonEntrar = document.getElementById("btnEntrar");
const botonSalir = document.getElementById("btnSalir");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioActivo = localStorage.getItem("usuarioActivo");

function avisar(texto, color) {
    if (mensajeCuenta !== null) {
        mensajeCuenta.textContent = texto;
        mensajeCuenta.style.color = color;
    }
}

function buscarUsuario(nombre) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === nombre) {
            return usuarios[i];
        }
    }
    return null;
}

function registrar() {
    const nombre = cuUsuario.value.trim();
    const clave = cuClave.value;
    if (nombre === "" || clave.length < 6) {
        avisar("Escribe un usuario y una contraseña de al menos 6 caracteres.", "red");
        return;
    }
    if (buscarUsuario(nombre) !== null) {
        avisar("Ese usuario ya existe.", "red");
        return;
    }
    usuarios.push({ usuario: nombre, clave: clave });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    avisar("Cuenta creada. Ahora inicia sesión.", "green");
}

function iniciarSesion() {
    const u = buscarUsuario(cuUsuario.value.trim());
    if (u === null || u.clave !== cuClave.value) {
        avisar("Usuario o contraseña incorrectos.", "red");
        return;
    }
    usuarioActivo = u.usuario;
    localStorage.setItem("usuarioActivo", usuarioActivo);
    avisar("Bienvenido, " + usuarioActivo + ".", "green");
    actualizarSesion();
}

function cerrarSesion() {
    usuarioActivo = null;
    localStorage.removeItem("usuarioActivo");
    avisar("Sesión cerrada.", "green");
    actualizarSesion();
}

function mostrarPedidos() {
    if (listaPedidos === null) {
        return;
    }
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    let html = "";
    for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].usuario === usuarioActivo) {
            html = html + "<li>" + pedidos[i].fecha + " - " + pedidos[i].cantidad + " producto(s) - $" + pedidos[i].total.toFixed(2) + "</li>";
        }
    }
    if (html === "") {
        html = "<li>Aún no tienes pedidos.</li>";
    }
    listaPedidos.innerHTML = html;
}

function actualizarSesion() {
    if (estadoSesion !== null) {
        if (usuarioActivo === null) {
            estadoSesion.textContent = "Sin sesión.";
        } else {
            estadoSesion.textContent = "Sesión activa: " + usuarioActivo;
        }
    }
    mostrarPedidos();
}

if (botonRegistro !== null && botonEntrar !== null && botonSalir !== null) {
    botonRegistro.addEventListener("click", registrar);
    botonEntrar.addEventListener("click", iniciarSesion);
    botonSalir.addEventListener("click", cerrarSesion);
}

actualizarSesion();
const campoNombre = document.getElementById("campoNombre");
const botonSaludo = document.getElementById("btnSaludo");
const resultadoSaludo = document.getElementById("resultadoSaludo");
if (campoNombre !== null && botonSaludo !== null && resultadoSaludo !== null) {
    botonSaludo.addEventListener("click", function() {
        const nombreIngresado = campoNombre.value;
        resultadoSaludo.textContent = "¡Hola, " + nombreIngresado + "! Bienvenido a mi proyecto.";
    });
}
const campoEdad = document.getElementById("campoEdad");

const botonEdad = document.getElementById("btnEdad");

const resultadoEdad = document.getElementById("resultadoEdad");

if (campoEdad !== null && botonEdad !== null && resultadoEdad !== null) {

    botonEdad.addEventListener("click", function() {

        const edad = Number(campoEdad.value);

        if (edad >= 18) {

            resultadoEdad.textContent = "Acceso permitido. ¡Bienvenido!";

        } else {

            resultadoEdad.textContent = "Acceso no permitido: debes tener 18 años o más.";

        }

    });

}
const productos = [
    { id: 1, nombre: "Capítulo 1", precio: 8, categoria: "cap1", foto: "Imagenes/img1.png" },
    { id: 2, nombre: "Capítulo 2", precio: 4, categoria: "cap2", foto: "Imagenes/img2.png" },
    { id: 3, nombre: "Capítulo 3", precio: 5, categoria: "cap3", foto: "Imagenes/img3.png" },
    { id: 4, nombre: "Capítulo 4", precio: 5, categoria: "cap4", foto: "Imagenes/img4.png" },
    { id: 5, nombre: "Capítulo 5", precio: 3, categoria: "cap5", foto: "Imagenes/img5.png" },
];

const listaProductos = document.getElementById("listaProductos");
const campoBuscar = document.getElementById("campoBuscar");
const selCategoria = document.getElementById("selCategoria");
const botonFiltrar = document.getElementById("btnFiltrar");
function mostrarProductos(lista) {
    let html = "";
    for (let i = 0; i < lista.length; i++) {
        const p = lista[i];
        html = html + "<li><img src='" + p.foto + "' alt='" + p.nombre + "' class='foto-producto'><h3>" + p.nombre + "</h3><p>$" + p.precio.toFixed(2) + "</p><button onclick='agregarAlCarrito(" + p.id + ")'>Agregar</button></li>";
    }
    if (lista.length === 0) {
        html = "<li>No se encontraron productos.</li>";
    }
    listaProductos.innerHTML = html;
}

if (listaProductos !== null) {
    mostrarProductos(productos);
}
function filtrarProductos() {
    const texto = campoBuscar.value.trim().toLowerCase();
    const categoria = selCategoria.value;
    const resultado = [];

    for (let i = 0; i < productos.length; i++) {
        const p = productos[i];
        const coincideNombre = p.nombre.toLowerCase().includes(texto);
        const coincideCategoria = categoria === "todas" || p.categoria === categoria;

        if (coincideNombre && coincideCategoria) {
            resultado.push(p);
        }
    }

    mostrarProductos(resultado);
}

if (campoBuscar !== null && selCategoria !== null && botonFiltrar !== null) {
    botonFiltrar.addEventListener("click", filtrarProductos);
}
let carrito = [];

const textoCarrito = document.getElementById("textoCarrito");
const botonVaciar = document.getElementById("btnVaciar");

function agregarAlCarrito(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            carrito.push(productos[i]);
        }
    }
    mostrarCarrito();
}

function mostrarCarrito() {
    if (textoCarrito === null) {
        return;
    }

    if (carrito.length === 0) {
        textoCarrito.textContent = "El carrito está vacío.";
        return;
    }

    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total = total + carrito[i].precio;
    }

    textoCarrito.textContent = "Productos: " + carrito.length + " | Total: $" + total.toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

if (botonVaciar !== null) {
    botonVaciar.addEventListener("click", vaciarCarrito);
}
function aplicarDescuento(precio, porcentaje) {
    return precio - precio * porcentaje / 100;
}

console.log(aplicarDescuento(50, 10));
console.log(aplicarDescuento(productos[0].precio, 20).toFixed(2));

// ===== COMPRA (requiere sesión) =====
const botonComprar = document.getElementById("btnComprar");
const mensajeCompra = document.getElementById("mensajeCompra");

function calcularTotalCarrito() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total = total + carrito[i].precio;
    }
    return total;
}

function finalizarCompra() {
    if (usuarioActivo === null) {
        mensajeCompra.textContent = "Inicia sesión para comprar.";
        mensajeCompra.style.color = "red";
        return;
    }
    if (carrito.length === 0) {
        mensajeCompra.textContent = "Tu carrito está vacío.";
        mensajeCompra.style.color = "red";
        return;
    }
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedido = {
        usuario: usuarioActivo,
        cantidad: carrito.length,
        total: calcularTotalCarrito(),
        fecha: new Date().toLocaleDateString()
    };
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    mensajeCompra.textContent = "Gracias, " + usuarioActivo + ". Pedido registrado por $" + pedido.total.toFixed(2) + ".";
    mensajeCompra.style.color = "green";
    vaciarCarrito();
    mostrarPedidos();
}

if (botonComprar !== null) {
    botonComprar.addEventListener("click", finalizarCompra);
}

const botonMeGusta1 = document.getElementById("btnMeGusta1");
const textoMeGusta1 = document.getElementById("textoMeGusta1");

let meGusta1 = 0;

if (botonMeGusta1 !== null && textoMeGusta1 !== null) {
    botonMeGusta1.addEventListener("click", function() {
        meGusta1 = meGusta1 + 1;
        textoMeGusta1.textContent = "Me gusta: " + meGusta1;
    });
}
const botonMeGusta2 = document.getElementById("btnMeGusta2");
const textoMeGusta2 = document.getElementById("textoMeGusta2");

let meGusta2 = 0;

if (botonMeGusta2 !== null && textoMeGusta2 !== null) {
    botonMeGusta2.addEventListener("click", function() {
        meGusta2 = meGusta2 + 1;
        textoMeGusta2.textContent = "Me gusta: " + meGusta2;
    });
}
const botonMeGusta3 = document.getElementById("btnMeGusta3");
const textoMeGusta3 = document.getElementById("textoMeGusta3");

let meGusta3 = 0;

if (botonMeGusta3 !== null && textoMeGusta1 !== null) {
    botonMeGusta3.addEventListener("click", function() {
        meGusta3 = meGusta3 + 1;
        textoMeGusta3.textContent = "Me gusta: " + meGusta3;
    });
}
const botonMeGusta4 = document.getElementById("btnMeGusta4");
const textoMeGusta4 = document.getElementById("textoMeGusta4");

let meGusta4 = 0;

if (botonMeGusta4 !== null && textoMeGusta1 !== null) {
    botonMeGusta4.addEventListener("click", function() {
        meGusta4 = meGusta4 + 1;
        textoMeGusta4.textContent = "Me gusta: " + meGusta4;
    });
}
const botonMeGusta5 = document.getElementById("btnMeGusta5");
const textoMeGusta5 = document.getElementById("textoMeGusta5");

let meGusta5 = 0;

if (botonMeGusta5 !== null && textoMeGusta1 !== null) {
    botonMeGusta5.addEventListener("click", function() {
        meGusta5 = meGusta5 + 1;
        textoMeGusta5.textContent = "Me gusta: " + meGusta5;
    });
}

const botonSi = document.getElementById("btnMensajeSi");
const botonNo = document.getElementById("btnMensajeNo");
const mensaje = document.getElementById("mensaje");
botonSi.addEventListener("click", function() {
    mensaje.textContent = "¡Excelente! Haz ganado un descuento del 10%.";
});
botonNo.addEventListener("click", function() {
    mensaje.textContent = "Sentimos oir eso, no importa";
});

