const cargaProductos = async () => {
  try {
    const response = await fetch(
      `https://argprog4-default-rtdb.firebaseio.com/.json`
    );

    if (response.status === 200) {
      const datos = await response.json();
      console.log(datos);

      let opciones = "";
      datos.forEach((prod) => {
        opciones += `<option value="${prod.nombre} ($${prod.precio})">${prod.nombre} ($${prod.precio})</option>`;
      });

      document.getElementById("producto").innerHTML = opciones;
    } else {
      console.log("esta mal algo");
    }
  } catch (error) {
    console.log(error);
  }
};

cargaProductos();

let form = document.querySelector("form");
let comentario = document.getElementById("comentario");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = form.name.value;
  let email = form.email.value;
  let phone = form.phone.value;
  let pais = form.pais.value;
  let ciud = form.ciud.value;
  let cp = form.cp.value;
  let producto = form.producto.value;
  let pagoCheckboxes = form.querySelectorAll('input[name="pago"]:checked');
  let pago = [];
  for (let i = 0; i < pagoCheckboxes.length; i++) {
    pago.push(pagoCheckboxes[i].value);
  }

  let textoComentario = `${name} con correo: ${email} y teléfono: ${phone}, residiendo
  actualmente en ${pais}-${ciud} (CP:${cp}) escogió comprar "${producto}" con 
  el método de pago: "${pago.join(", ")}" para su compra.`;

  comentario.textContent = textoComentario;
  form.reset();

  // Prepara la ventana de impresión
  const printWindow = window.open("", "", "height=400,width=800");

  // Crea el contenido HTML que quieres imprimir
  let content = `
    <html>
      <head>
        <title>Compra</title>
      </head>
      <body>
        <h1>Compra</h1>
        <p>${textoComentario}</p>
      </body>
    </html>
  `;

  // Agrega el contenido al documento de la ventana de impresión
  printWindow.document.write(content);

  // Espera a que el contenido se cargue completamente antes de imprimirlo
  printWindow.document.addEventListener("DOMContentLoaded", () => {
    printWindow.print();
    printWindow.close();
  });
});
function imprimir() {
  window.print();
}
