var cartCount = 0;
var cartItems = [];
var myCart;

function getCart () {
    console.log('in get cart');
    if (sessionStorage.getItem('myCart') === null) {
        myCart = new Cart(cartCount, cartItems);
    } else {
        myCart = JSON.parse(sessionStorage.getItem('myCart'));
    }
    cartCount = myCart.count;
    cartItems = myCart.itemList;
}

function onLoad() {
    console.log('in onLoad');
    getCart();
    if (cartCount) {
        document.getElementById('cart').innerHTML = cartCount;
    }
}