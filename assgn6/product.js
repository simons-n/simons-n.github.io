var glaze = 'none';
var quant = 1;
var price = '$1.50';
var cartCount = 0;

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
        document.getElementById("prodImg").style.background = 'url(./img/original.jpg)';
    } 
    else {
        document.getElementById("prodImg").style.background = 'url(./img/' + glaze + '.jpg)';
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
            price = "$1.50";
        } else if (3 === quant) {
            price = "$4.25";
        } else if (6 === quant) {
            price = "$8.25";
        } else if (12 === quant) {
            price = "$16.25";
        }
    } else if ("sugarMilk" === glaze) {
        if (1 === quant) {
            price = "$2.00";
        } else if (3 === quant) {
            price = "$5.75";
        } else if (6 === quant) {
            price = "$11.25";
        } else if (12 === quant) {
            price = "$21.50";
        }
    } else if ("vanillaMilk" === glaze) {
        console.log('in nilla price');
        if (1 === quant) {
            console.log('quant yay');
            price = "$2.00";
        } else if (3 === quant) {
            price = "$5.75";
        } else if (6 === quant) {
            price = "$11.25";
        } else if (12 === quant) {
            price = "$21.50";
        }
    } else if ("doubleChocolate" === glaze) {
        if (1 === quant) {
            price = "$2.50";
        } else if (3 === quant) {
            price = "$7.00";
        } else if (6 === quant) {
            price = "$12.25";
        } else if (12 === quant) {
            price = "$24.00";
        }
    }
    console.log('glaze is: ' + glaze + ' and price is: ' + price);
    document.getElementById('priceField').innerHTML = price;
}

/*changes the count displayed in the icon*/
function updateCart() {
    cartCount += quant;
    document.getElementById('cart').innerHTML = cartCount;
}
