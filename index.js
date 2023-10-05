let allContainerCart = document.querySelector('.products');
let containerBuyCard = document.querySelector('.card-items');
let buyThings =[];

loadEventsListeners()
function loadEventsListeners(){
    allContainerCart.addEventListener('click', addProduct);

}

function addProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('btn-add-cart')){
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);
    } //si el elemento clickeado contiene esa clase, selecciona a su padre y se lo manda a la funcion que leera su contenido.

}

function readTheContent(product){
    //sacamos los atributos de cada producto, creando un OBJETO y alli exponiendo los atrubutos:

    const infoProduct = {
        image: product.querySelector('div img').src, //no tiene clase asi que selecciono las etiquetas.
        title: product.querySelector('.title').textContent,//tiene clase asi que selecciono sus clases.
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1 //es como un contador de objetos
    }

    buyThings=[...buyThings, infoProduct]; //de alguna forma es vincular array y productos.
    loadHtml() //hace aparecer los item-cards en el carrito.

}

function loadHtml(){

    clearHTML(); //funcion que apenas abramos el carrito este todo limpio de rows.

    buyThings.forEach(product=>{ //para cada elemento del array
        const {image, title, price, id, amount}=product;

        const row = document.createElement('div'); //asi se construye html con js
        row.classList.add('item');
        row.innerHTML= `
        <img src="${image}" alt="">
       <div class="item-content">
           <h5>${title}</h5>
           <h5 class="cart-price">${price}</h5>
           <h6>Amount: ${amount}</h6>
       </div>
       <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCard.appendChild(row); //a el contenedor de items le vamos agregando hijos, los hijos son el row (item) que creamos con js.
    });
}

function clearHTML(){
    containerBuyCard.innerHTML= " ";
}