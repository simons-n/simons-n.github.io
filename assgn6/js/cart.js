
var cartCount = 0;
var cartItems = [];
var myCart;
var cartPrice = "";

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

function getTotalPrice() {
    var totalPrice = 0;
    for (i = 0; i < cartItems.length; i++) {
        if (cartItems[i] != null) {
            var tempPrice = cartItems[i].price;
            tempPrice = tempPrice.slice(1, tempPrice.length);
            tempPrice = parseFloat(tempPrice);
            totalPrice += tempPrice;
        }
    }
    totalPrice = totalPrice.toString();
    if (!totalPrice.includes('.')) {
        totalPrice = totalPrice + ".00";
    }
    else if (totalPrice.charAt(totalPrice.length-2)===".") {
        totalPrice = totalPrice + "0";
    }
    totalPrice = "$" + totalPrice;
    cartPrice = totalPrice;
}

function removeItem(buttonId) {
    console.log("in removeItem(), buttonId = " + buttonId);
    var index = buttonId.charAt(buttonId.length-1);
    var tempItem = cartItems[index];
    console.log(tempItem);
    updatePrice(tempItem.price);
    updateCount(tempItem.quant);

    var node1 = document.getElementById("product" + index);
    var node2 = document.getElementById("prod" + index + "Details");
    var node3 = document.getElementById("quant" + index);
    var node4 = document.getElementById("remove" + index);
    var node5 = document.getElementById("prodTotal" + index);
    node1.parentNode.removeChild(node1);
    node2.parentNode.removeChild(node2);
    node3.parentNode.removeChild(node3);
    node4.parentNode.removeChild(node4);
    node5.parentNode.removeChild(node5);

    styleToRem = document.getElementById("style" + index);
    styleToRem.parentNode.removeChild(styleToRem);

    //update the cart object in storage
    cartItems[index] = null;
    myCart.itemList = cartItems;
    myCart.count = cartCount;
    sessionStorage.setItem("myCart", JSON.stringify(myCart));
}

function updatePrice(priceToSub) {
    priceToSub = priceToSub.slice(1, priceToSub.length);
    priceToSub = parseFloat(priceToSub);
    var newPrice;
    var totalDiv = document.getElementById("total");
    var oldTotal = cartPrice.slice(1, cartPrice.length);
    oldTotal = parseFloat(oldTotal);
    
    newPrice = oldTotal-priceToSub;
    newPrice = newPrice.toString();
    if (!newPrice.includes('.')) {
        newPrice = newPrice + ".00";
    }
    else if (newPrice.charAt(newPrice.length-2)===".") {
        newPrice = newPrice + "0";
    }

    cartPrice = "$" + newPrice;
    totalDiv.innerHTML = "Your Total: " + cartPrice;
}

function updateCount(quantToSub) {
    var cartDiv = document.getElementById('cart');
    var oldCount = cartCount;
    var newCount = oldCount - quantToSub;
    cartCount = newCount;
    cartDiv.innerHTML = cartCount;
}


function onLoad() {
    getCart();
    if (cartCount) {
        document.getElementById('cart').innerHTML = cartCount;
    }

    let order = JSON.stringify(myCart.itemList[0]);
    var main = document.getElementsByTagName('main')[0];
    var rect = document.getElementById('cartRectangle');

    //The following code is SUPER janky because I misunderstood CSS grids in the last assignment, so I had to inject 
    //html (and css into the html) in rather unfortunate ways.  Sorry about this.
    numRows = 9;
    rectHeight = 555;
    startRow = 3;
    endRow = 5;
    var nullCount = 0;
    for (i = 0; i < cartItems.length; i++) {
        
        curItem = cartItems[i];

        if (curItem != null) {
            //increases number of rows, and size of the white rectangle, if necessary
            if (i > 1) {
                numRows += 2*(i-1-nullCount);
                main.style.gridTemplateRows = 'repeat(' + numRows.toString() + '56px)';
                rectHeight += 152;
                rect.style.height = rectHeight.toString() + 'px';
                rect.style.marginBottom = '50px';
            }
            
            var node1 = document.createElement('div');
            
            node1.id = 'product' + i.toString();
            node1.className = 'product';
            var imgSrc = curItem.flavor;
            if (curItem.glaze != 'none') {
                imgSrc = curItem.glaze;
            }
            node1.innerHTML = '<img src="../img/' + imgSrc + '.jpg" height="113" width="141" alt="cart product' + i.toString() + '">';
            
            var node2 = document.createElement('div');
            node2.className = 'prodDetails';
            node2.id = 'prod' + i.toString() + 'Details';
            node2.innerHTML = "Flavor: " + curItem.flavor + " <br/> Glaze: " + curItem.glaze;

            var node3 = document.createElement('div');
            node3.className = "quant";
            node3.id = "quant" + i.toString();
            node3.innerHTML = "Quantity: " + curItem.quant.toString();
            
            var node4 = document.createElement('button');
            node4.className = "remove";
            node4.id = "remove" + i.toString();
            node4.setAttribute("onclick", "removeItem(this.id)");
            node4.innerHTML = "Remove";

            var node5 = document.createElement('div');
            node5.className = "prodTotal";
            node5.id = "prodTotal" + i.toString();
            node5.innerHTML = "Total: " + curItem.price;

            main.appendChild(node1);
            main.appendChild(node2);
            main.appendChild(node3);
            main.appendChild(node4);
            main.appendChild(node5);

            //all of this is because my current grid is based on hard-coding grid-area. Oops
            styleStr = "";
            var newStyle = document.createElement('style');
            newStyle.className = "injectedStyles";
            newStyle.id = "style" + i.toString();
            styleStr += "#product" + i.toString() + " { position: relative; grid-area: " + startRow + " / 3 / " + endRow + " / 15; } ";
            styleStr += " #prod" + i.toString() + "Details { grid-area: " + startRow + " / 5 / " + endRow + " / 8; } ";
            styleStr += " #quant" + i.toString() + " { grid-area: " + startRow + " / 8 / " + endRow + " / 10; } ";
            styleStr += " #remove" + i.toString() + " { grid-area: " + startRow + " / 10 / " + endRow + " / 12; } ";
            styleStr += " #prodTotal" + i.toString() + " { grid-area: " + startRow + " / 12 / " + endRow + " / 15; } ";
            startRow += 2;
            endRow += 2;
            newStyle.innerHTML = styleStr;
            document.body.appendChild(newStyle);
        } else {
            nullCount += 1;
        }
    }
    var totalStyle = document.createElement('style');
    totalStyle.innerHTML = '#total { position: relative; grid-area: ' + (endRow - 2).toString() + ' / 12 / ' + (endRow - 1).toString() + ' / 15; border: 1px solid lightgray; padding: 9px; font-size: 26px; font-family: "American Typewriter"; }';
    document.body.appendChild(totalStyle);

    var bottomCheckoutStyle = document.createElement('style');
    bottomCheckoutStyle.innerHTML = "#checkout2 { grid-area: " + (endRow - 1).toString() + " / 11 / auto / auto; }"
    document.body.appendChild(bottomCheckoutStyle);

    var totalDiv = document.getElementById("total");
    getTotalPrice();
    totalDiv.innerHTML = "Your Total: " + cartPrice;

}