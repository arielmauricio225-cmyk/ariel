// =======================
// SLIDER
// =======================
const track = document.getElementById("track");
const cards = document.querySelectorAll(".card");
const dotsContainer = document.getElementById("dots");

let index = 0;

const visible = 3;
const total = cards.length;
const maxIndex = total - visible;

if (dotsContainer) {
    for (let i = 0; i <= maxIndex; i++) {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        dotsContainer.appendChild(dot);
    }
}

const dots = document.querySelectorAll(".dot");

function updateSlider() {
    if (!track) return;

    track.style.transform = `translateX(-${index * (100 / visible)}%)`;

    dots.forEach(d => d.classList.remove("active-dot"));
    if (dots[index]) dots[index].classList.add("active-dot");
}

function auto() {
    index++;
    if (index > maxIndex) index = 0;
    updateSlider();
}

updateSlider();
setInterval(auto, 2500);


// =======================
// CARRITO (ÚNICO - LIMPIO)
// =======================
let carrito = [];
let productoActual = {};


// =======================
// AGREGAR BOTONES MENU
// =======================
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".agregar-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const nombre = btn.dataset.nombre;
            const precio = parseFloat(btn.dataset.precio);

            abrirModal(nombre, precio);
        });
    });

});


// =======================
// MODAL PRODUCTO
// =======================
function abrirModal(nombre, precio) {

    productoActual = { nombre, precio };

    const nombreEl = document.getElementById("nombreProd");
    const precioEl = document.getElementById("precioProd");
    const cantidadEl = document.getElementById("cantidad");

    if (nombreEl) nombreEl.innerText = nombre;
    if (precioEl) precioEl.innerText = precio;
    if (cantidadEl) cantidadEl.value = 1;

    const modal = document.getElementById("modalProducto");
    if (modal) modal.style.display = "block";
}

function cerrarProducto() {
    const modal = document.getElementById("modalProducto");
    if (modal) modal.style.display = "none";
}


// =======================
// AGREGAR AL CARRITO
// =======================
function agregarAlCarrito() {

    let cantidad = parseInt(document.getElementById("cantidad").value);

    let existe = carrito.find(p => p.nombre === productoActual.nombre);

    if (existe) {
        existe.cantidad += cantidad;
    } else {
        carrito.push({
            nombre: productoActual.nombre,
            precio: productoActual.precio,
            cantidad: cantidad
        });
    }

    actualizarCarrito();
    cerrarProducto();
}


// =======================
// ACTUALIZAR CARRITO
// =======================
function actualizarCarrito() {

    let lista = document.getElementById("lista-carrito");
    if (!lista) return;

    lista.innerHTML = "";

    let total = 0;
    let contador = 0;

    carrito.forEach((p, i) => {

        let subtotal = p.precio * p.cantidad;
        total += subtotal;
        contador += p.cantidad;

        lista.innerHTML += `
            <div>
                <b>${p.nombre}</b><br>
                Cant: ${p.cantidad}<br>
                S/ ${subtotal.toFixed(2)}<br>

                <button onclick="sumar(${i})">+</button>
                <button onclick="restar(${i})">-</button>
                <button onclick="eliminar(${i})">🗑</button>
                <hr>
            </div>
        `;
    });

    const totalEl = document.getElementById("total");
    if (totalEl) totalEl.innerText = total.toFixed(2);

    const contadorEl = document.getElementById("contador-carrito");
    if (contadorEl) contadorEl.innerText = contador;
}


// =======================
// MODIFICAR CANTIDAD
// =======================
function sumar(i) {
    carrito[i].cantidad++;
    actualizarCarrito();
}

function restar(i) {
    carrito[i].cantidad--;

    if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
    }

    actualizarCarrito();
}

function eliminar(i) {
    carrito.splice(i, 1);
    actualizarCarrito();
}


// =======================
// MODAL CARRITO
// =======================
function abrirCarrito() {
    const modal = document.getElementById("modalCarrito");
    if (modal) modal.style.display = "block";
}

function cerrarCarrito() {
    const modal = document.getElementById("modalCarrito");
    if (modal) modal.style.display = "none";
}


// =======================
// LOGIN
// =======================
function login() {

    let email = document.getElementById("loginEmail");
    let pass = document.getElementById("loginPass");

    if (!email.value || !pass.value) {
        alert("Completa los campos");
        return;
    }

    localStorage.setItem("usuarioLogueado", email.value);

    alert("✔ Sesión iniciada");

    cerrarLogin();
}


// =======================
// REGISTRO
// =======================
function registrar() {

    let nombre = document.getElementById("regNombre");
    let email = document.getElementById("regEmail");
    let pass = document.getElementById("regPass");

    // ❌ ESTA PARTE ESTABA MAL
    if (!nombre.value || !email.value || !pass.value) {
        alert("Completa todos los campos");
        return;
    }

    localStorage.setItem("usuarioLogueado", email.value);

    alert("✔ Registrado e iniciado sesión");

    cerrarRegistro();
}

// =======================
// MODALES LOGIN
// =======================
function abrirLogin() {
    document.getElementById("modalLogin").style.display = "block";
}

function cerrarLogin() {
    document.getElementById("modalLogin").style.display = "none";
}

function abrirRegistro() {
    document.getElementById("modalRegistro").style.display = "block";
}

function cerrarRegistro() {
    document.getElementById("modalRegistro").style.display = "none";
}


// =======================
// COMPRAR
// =======================
function comprar() {

    let usuario = localStorage.getItem("usuarioLogueado");

    if (!usuario) {
        alert("⚠ Debes iniciar sesión primero");
        cerrarCarrito();
        abrirLogin();
        return;
    }

    if (carrito.length === 0) {
        alert("🛒 El carrito está vacío");
        cerrarCarrito();
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push({
        cliente: usuario,
        productos: [...carrito],
        fecha: new Date().toLocaleString(),
        estado: "Pendiente"
    });

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert("🎉 Compra realizada con éxito");

    carrito = [];
    actualizarCarrito();
    cerrarCarrito();
}
// =======================
// POLÍTICA Y TÉRMINOS
// =======================

function abrirPolitica() {
    const modal = document.getElementById("modalPolitica");
    if (modal) modal.style.display = "block";
}

function cerrarPolitica() {
    const modal = document.getElementById("modalPolitica");
    if (modal) modal.style.display = "none";
}

function abrirTerminos() {
    const modal = document.getElementById("modalTerminos");
    if (modal) modal.style.display = "block";
}

function cerrarTerminos() {
    const modal = document.getElementById("modalTerminos");
    if (modal) modal.style.display = "none";
}

//---
//---Menu de Admin
//---

function abrirAdmin(){
    document.getElementById("modalAdmin").style.display = "block";
}

function cerrarAdmin(){
    document.getElementById("modalAdmin").style.display = "none";
}

function ingresarAdmin(){

    let pass = document.getElementById("adminPass").value;

    if(pass === "trokys123"){
        window.location.href = "/admin";
    }
    else{
        alert("Contraseña incorrecta");
    }
}

