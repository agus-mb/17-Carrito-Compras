let allContainerCart = document.querySelector(".products");
let containerBuyCard = document.querySelector(".card-items");
let priceTotal = document.querySelector(".price-total");
let buyThings = [];
let totalCard = 0;

loadEventsListeners();
function loadEventsListeners() {
  allContainerCart.addEventListener("click", addProduct);
  containerBuyCard.addEventListener("click", deleteProduct);
}

//Si clickeamos en un elemento con la clase delte-product vamos a crear una const que tome su id, luego, recorreremos el array de productos a comprar para indicarle que si el id coincide con uno ya clcikeado anteriormente este ultimo no se agregue, no se repita.

function deleteProduct(e) {
  if (e.target.classList.contains("delete-product")) {
    const deleteId = e.target.getAttribute("data-id");

    buyThings.forEach((value) => {
      if (value.id === deleteId) {
        let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
        totalCard = totalCard - priceReduce;
        totalCard = totalCard.toFixed(2);
      }
    });
    buyThings = buyThings.filter((product) => product.id !== deleteId);

    updateTotal();
  }

  loadHtml();
}

function addProduct(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-add-cart")) {
    const selectProduct = e.target.parentElement;
    readTheContent(selectProduct);
  } //si el elemento clickeado contiene esa clase, selecciona a su padre y se lo manda a la funcion que leera su contenido.
}

function readTheContent(product) {
  //sacamos los atributos de cada producto, creando un OBJETO y alli exponiendo los atrubutos:

  const infoProduct = {
    image: product.querySelector("div img").src, //no tiene clase asi que selecciono las etiquetas.
    title: product.querySelector(".title").textContent, //tiene clase asi que selecciono sus clases.
    price: product.querySelector("div p span").textContent,
    id: product.querySelector("a").getAttribute("data-id"),
    amount: 1, //es como un contador de objetos
  };

  totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price); //el parseFloat es para lo relacionado a decimales, nada importante.
  totalCard = totalCard.toFixed(2); //redondea a 2 decimales.

  const exist = buyThings.some((product) => product.id === infoProduct.id);
  if (exist) {
    const pro = buyThings.map((product) => {
      if (product.id === infoProduct.id) {
        product.amount++;
        return product;
      } else {
        return product;
      }
    });
    buyThings = [...pro];
  } else {
    buyThings = [...buyThings, infoProduct];
  }

  //de alguna forma es vincular array y productos.
  loadHtml(); //hace aparecer los item-cards en el carrito.
}

function loadHtml() {
  clearHTML(); //funcion que apenas abramos el carrito este todo limpio de rows.

  buyThings.forEach((product) => {
    //para cada elemento del array
    const { image, title, price, id, amount } = product;

    const row = document.createElement("div"); //asi se construye html con js
    row.classList.add("item");
    row.innerHTML = `
        <img src="${image}" alt="">
       <div class="item-content">
           <h5>${title}</h5>
           <h5 class="cart-price">${price}</h5>
           <h6>Amount: ${amount}</h6>
       </div>
       <span class="delete-product" data-id="${id}">X</span>
        `;

    containerBuyCard.appendChild(row); //a el contenedor de items le vamos agregando hijos, los hijos son el row (item) que creamos con js.

    priceTotal.innerHTML = totalCard;
  });

  updateTotal();
}

function clearHTML() {
  containerBuyCard.innerHTML = " ";
}

function updateTotal() {
  //cuando no hay productos en el carrito el total vuelve a ser 0.
  totalCard = buyThings
    .reduce((total, product) => {
      const productPrice = parseFloat(product.price);
      const productAmount = parseInt(product.amount);
      return total + productPrice * productAmount;
    }, 0)
    .toFixed(2);

  // Actualiza el elemento en el HTML con el total
  priceTotal.innerHTML = totalCard;
}
