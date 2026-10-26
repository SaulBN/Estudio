
//Gestiona los productos y calcula el total

class Carrito {

//Guarda los productos de la API

    constructor(productos) {
        this.productos = productos;
        this.items = {};
    }

//Actualiza las unidades del carrito

    actualizarUnidades(sku, unidades) {
        this.items[sku] = unidades;
    }

//Total de la compra

    obtenerCarrito() {

        let total = 0;

//Recorre todos los productos        

        for (let sku in this.items) {

//Busca por el SKU

            const producto = this.productos.find(
                producto => producto.SKU === sku
            );

//Suma al total

            total += producto.price * this.items[sku];
        }

//Con dos decimales

        return total.toFixed(2);
    }
}

//Leer la API.Obtiene los productos de la API de JSONBlob

fetch("https://jsonblob.com/api/jsonBlob/01a17964-b70d-714a-ab10-83a581df6129")
   
//Convierte al formato JSON y procesa los datos

    .then(response => response.json())
    .then(data => {

//Crea una instancia en el carrito

        const carrito = new Carrito(data.products);

//Muestra los productos

        mostrarProductos(
            data.products,
            carrito
        );
    })

//Captura el error

    .catch(error => {
        console.log("Error:", error);
    });


//Mostrar los productos

    function mostrarProductos(productos, carrito) {

    const contenedor =
        document.getElementById("productos");

    productos.forEach(producto => {

        const div =
            document.createElement("div");
            div.classList.add("producto");

        div.innerHTML = `
            <h3>${producto.title}</h3>
            <p>${producto.price} €</p>

            <input
                type="number"
                min="0"
                value="0">
        `;

        const input =
            div.querySelector("input");


// cambios en el input

    input.addEventListener("change", () => {

            carrito.actualizarUnidades(
                producto.SKU,
                Number(input.value)
            );

//Recalcula el total

            actualizarTotal(carrito);
        });

//Añadir productos a la lista
        
         contenedor.appendChild(div);
    });
}

// Actualiza el total

function actualizarTotal(carrito) {

    document.getElementById("total").textContent =
        carrito.obtenerCarrito() + " €";
}
