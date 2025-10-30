'use strict';

// Productos
const productos = [
  { id: 1, nombre: "Anillo de Plata", descripcion: "Anillo de plata 925", precio: 800000, imagen: "img/producto-AnillodePlata.png", categoria: "anillos" },
  { id: 2, nombre: "Collar Rueda", descripcion: "Collar clásico", precio: 900000, imagen: "img/producto-CollarClasico.png", categoria: "collares" },
  { id: 3, nombre: "Pulsera de oro", descripcion: "Pulsera Serpenti", precio: 980000, imagen: "img/producto-PulseradeOro.png", categoria: "pulseras" },
  { id: 4, nombre: "Aros de plata", descripcion: "Aros pequeños", precio: 505000, imagen: "img/producto-Aros.png", categoria: "aros" },
  { id: 5, nombre: "Reloj Clásico", descripcion: "Reloj analógico con correa de acero", precio: 120000, imagen: "img/producto-RelojClasico.png", categoria: "relojes" },
  { id: 6, nombre: "Anillo con Piedra", descripcion: "Anillo con piedra semipreciosa verde", precio: 1500000, imagen: "img/producto-AnilloconPiedra.png", categoria: "anillos" }
];


// Carrito de compras
class CarritoDeCompras {
  constructor() {
    this.items = []; // [{ productoId, cantidad }]
  }

  agregar(productoId) {
    const itemExistente = this.items.find(item => item.productoId === productoId);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.items.push({ productoId, cantidad: 1 });
    }
  }

  eliminarProducto(productoId) {
    this.items = this.items.filter(i => i.productoId !== productoId);
  }

  calcularTotal() {
    return this.items.reduce((total, item) => {
      const producto = productos.find(p => p.id === item.productoId);
      return total + (producto.precio * item.cantidad);
    }, 0);
  }

  cantidadTotal() {
    return this.items.reduce((acum, item) => acum + item.cantidad, 0);
  }

  vaciar() {
    this.items = [];
  }
}

const carrito = new CarritoDeCompras();


// Consigna: Cada producto deberá mostrarse con su nombre, descripción, precio, imagen y categoría, junto a un botón para agregar al carrito.

function renderizarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const div = document.createElement("div");
    div.classList.add("producto-info");

    const h2 = document.createElement("h3");
    h2.textContent = producto.nombre;
    h2.classList.add("producto-nombre");


    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;
    descripcion.classList.add("producto-descripcion");

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;
    precio.classList.add("producto-precio");

    const categoria = document.createElement("p");
    categoria.textContent = producto.categoria;
    categoria.classList.add("producto-categoria");

    const footer = document.createElement("footer");

    const btnDetalle = document.createElement("button");
    btnDetalle.textContent = "Ver detalle";
    btnDetalle.addEventListener("click", () => abrirModalDetalle(producto));

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar";
    btnAgregar.addEventListener("click", () => {
      carrito.agregar(producto.id);
      actualizarMiniCarrito();
    });

    footer.appendChild(btnDetalle);
    footer.appendChild(btnAgregar);

    div.appendChild(h2);
    div.appendChild(descripcion);
    div.appendChild(precio);
    div.appendChild(categoria);
    div.appendChild(footer);

    li.appendChild(img);
    li.appendChild(div);
    contenedor.appendChild(li);
  });
}


//  Consigna: Armar la ventana modal del detalle del producto, donde se podrá ver la información

function abrirModalDetalle(producto) {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");

  const detalle = document.createElement("div");
  detalle.classList.add("detalle");

  const img = document.createElement("img");
  img.src = producto.imagen;
  img.alt = producto.nombre;

  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;
  titulo.classList.add("producto-nombre");

  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcion;
  descripcion.classList.add("producto-descripcion");

  const precio = document.createElement("p");
  precio.textContent = `$${producto.precio}`;
  precio.classList.add("producto-precio");

  const categoria = document.createElement("p");
  categoria.textContent = producto.categoria;
  categoria.classList.add("producto-categoria");

  const footer = document.createElement("footer");

  const btnCerrar = document.createElement("button");
  btnCerrar.textContent = "Cerrar";
  btnCerrar.addEventListener("click", () => modal.close());

  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "Agregar";
  btnAgregar.addEventListener("click", () => {
    carrito.agregar(producto.id);
    actualizarMiniCarrito();
    modal.close();
  });

  footer.appendChild(btnCerrar);
  footer.appendChild(btnAgregar);

  detalle.appendChild(img);
  detalle.appendChild(titulo);
  detalle.appendChild(descripcion);
  detalle.appendChild(precio);
  detalle.appendChild(categoria);
  detalle.appendChild(footer);

  modal.appendChild(detalle);
  document.body.appendChild(modal);
  modal.showModal();

  // Esto es lo que pidio el profe que esté si o si en la clase del 24 de octubre
  modal.addEventListener('close', (evento) => evento.currentTarget.remove());
}


// Actualización de Mini Carrito

function actualizarMiniCarrito() {
  const miniCarrito = document.getElementById("mini-carrito");
  const spans = miniCarrito.getElementsByTagName("span");

  spans[0].textContent = carrito.cantidadTotal();
  spans[1].textContent = carrito.calcularTotal();
}


// Consigna: Armar la ventana modal del detalle del carrito

function abrirModalCarrito() {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");

  const contenedor = document.createElement("div");
  contenedor.classList.add("carrito");

  const header = document.createElement("header");
  const spanProductos = document.createElement("span");
  spanProductos.textContent = `Productos: ${carrito.cantidadTotal()} , `;
  const spanTotal = document.createElement("span");
  spanTotal.textContent = `Total: $${carrito.calcularTotal()}`;
  header.appendChild(spanProductos);
  header.appendChild(spanTotal);

  const lista = document.createElement("ul");

  carrito.items.forEach(item => {
    const producto = productos.find(p => p.id === item.productoId);
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - Cantidad: ${item.cantidad} x $${producto.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      carrito.eliminarProducto(item.productoId);
      actualizarMiniCarrito();
      modal.close();
      abrirModalCarrito();
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  const footer = document.createElement("footer");

  const btnCerrar = document.createElement("button");
  btnCerrar.textContent = "Cerrar";
  btnCerrar.addEventListener("click", () => modal.close());

  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "Vaciar";
  btnVaciar.addEventListener("click", () => {
    carrito.vaciar();
    actualizarMiniCarrito();
    modal.close();
  });

  const btnPagar = document.createElement("button");
  btnPagar.textContent = "Proceder al pago";

  footer.appendChild(btnCerrar);
  footer.appendChild(btnVaciar);
  footer.appendChild(btnPagar);

  contenedor.appendChild(header);
  contenedor.appendChild(lista);
  contenedor.appendChild(footer);

  modal.appendChild(contenedor);
  document.body.appendChild(modal);
  modal.showModal();

  // Esto dijo el profe que esté si o si en la clase del 24 de octubre
  modal.addEventListener('close', (evento) => evento.currentTarget.remove());
}


// Inicialización

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
  actualizarMiniCarrito();

  const btnVerCarrito = document.querySelector("#mini-carrito button");
  btnVerCarrito.addEventListener("click", abrirModalCarrito);
});
