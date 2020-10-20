var glaze = 'none';
var quant = 1;
var price = '$1.85';
var cartCount = 0;
var cartItems = [];
var myCart;

function Bun (glaze, quant, price) {
    this.glaze = glaze;
    this.quant = quant;
    this.price = price;
}

function Cart (count, itemList) {
    this.count = count;
    this.itemList = itemList;
}

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

/*changeGlaze calls several helper functions*/
function changeGlaze() {
    glaze = document.getElementById("glazeSelect").value;
    updateImg();
    updateLabel();
    updatePrice();
}

/*changes the image*/
function updateImg() {
    if ("none" === glaze) {
        document.getElementById("prodImg").style.background = 'url(../img/caramelPecanjpg)';
    } 
    else {
        document.getElementById("prodImg").style.background = 'url(../img/' + glaze + '.jpg)';
    }
}

/*changes the label*/
function updateLabel() {
    if ("none" === glaze) {
        document.getElementsByClassName("flavorText")[0].innerHTML = "No Glaze";
    } else if ("sugarMilk" === glaze) {
        document.getElementsByClassName("flavorText")[0].innerHTML = "Sugar-Milk";
    } else if ("vanillaMilk" === glaze) {
        console.log('in nilla');
        document.getElementsByClassName("flavorText")[0].innerHTML = "Vanilla-Milk";
    } else if ("doubleChocolate" === glaze) {
        document.getElementsByClassName("flavorText")[0].innerHTML = "Double Chocolate";
    } else {
        console.log('error in glazing type');
    }
}

/*converts the quantity that the user selected from the dropdown into an int*/
function updateQuant() {
    var qString = document.getElementById('quantSelect').value;
    if ('one' === qString) {
        quant = 1;
    } else if ('three' === qString) {
        quant = 3;
    } else if ('six' === qString) {
        quant = 6;
    } else if ('twelve' === qString) {
        quant = 12;
    }
    updatePrice();
}

/*changes the price displayed based on price and glazing*/
function updatePrice() {
    console.log('in updatePrice');
    if ("none" === glaze) {
        if (1 === quant) {
            price = "$1.85";
        } else if (3 === quant) {
            price = "$5.30";
        } else if (6 === quant) {
            price = "$10.35";
        } else if (12 === quant) {
            price = "$20.45";
        }
    } else if ("sugarMilk" === glaze) {
        if (1 === quant) {
            price = "$2.35";
        } else if (3 === quant) {
            price = "$6.80";
        } else if (6 === quant) {
            price = "$13.35";
        } else if (12 === quant) {
            price = "$25.70";
        }
    } else if ("vanillaMilk" === glaze) {
        if (1 === quant) {
            price = "$2.35";
        } else if (3 === quant) {
            price = "$6.80";
        } else if (6 === quant) {
            price = "$13.35";
        } else if (12 === quant) {
            price = "$25.70";
        }
    } else if ("doubleChocolate" === glaze) {
        if (1 === quant) {
            price = "$2.85";
        } else if (3 === quant) {
            price = "$8.05";
        } else if (6 === quant) {
            price = "$14.35";
        } else if (12 === quant) {
            price = "$28.20";
        }
    }
    document.getElementById('priceField').innerHTML = price;
}

/*changes the count displayed in the icon*/
function addToCart() {
    cartCount += quant;
    console.log('cart in addtocart is: ' + myCart);
    myCart.count = cartCount;
    sessionStorage.setItem('myCart', JSON.stringify(myCart));
    document.getElementById('cart').innerHTML = cartCount;
}

function onLoad() {
    console.log('in onLoad');
    getCart();
    if (cartCount) {
        document.getElementById('cart').innerHTML = cartCount;
    }
}
