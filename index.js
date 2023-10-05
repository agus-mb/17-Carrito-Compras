let allContainerCart = document.querySelector('.products');

loadEventsListeners()
function loadEventsListeners(){
    allContainerCart.addEventListener('click', addProduct);

}

function addProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('.btn-add-cart'))



}