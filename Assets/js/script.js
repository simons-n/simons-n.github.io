//initialize wow for animations
$(document).ready(function(){
    new WOW().init();
});

//Flip project item image before linking to next page
$(".img-responsive").click(function (e) {
    e.preventDefault();                   
    var nextPage = this.getAttribute("href"); // stores the href

    $(this).addClass("wow flipOutY animated");
    $(this).attr("style","visibility: visible; animation-name: flipOutY;");

    setTimeout(function(){
         window.location = nextPage;
    }, 865);                             
});

/*
//Pulse Project item on hover
$(".img-responsive").hover(function (e) {                 
    $(this).addClass("wow pulse animated");
    $(this).attr("style","visibility: visible; animation-name: pulse;");                  
});

//Pulse image on hover
$("img").hover(function (e) {
    $(this).addClass("wow pulse animated");
    $(this).attr("style","visibility: visible; animation-name: pulse;");                        
});*/

//Resize overlay to size of image
function changeSize() {
    var elem = document.getElementById("img-cat");
    var sty = window.getComputedStyle(elem);
    var imgWidth = sty.getPropertyValue("width");
    var imgHeight = sty.getPropertyValue("height");

    var overlays = document.getElementsByClassName("portfolio-overlay");
    var h4s = document.getElementsByTagName("h4");
    var items = document.getElementsByClassName("portfolio-item");
    Array.prototype.forEach.call(overlays, function(overlay) {
        overlay.style.width = imgWidth;
        overlay.style.height = imgHeight;
        overlay.style.marginLeft = "15px";
    });
    if (parseFloat(imgWidth) < 432.5) {
        Array.prototype.forEach.call(h4s, function(h4) { 
            h4.style.display = "none";
        });
        Array.prototype.forEach.call(items, function(item) { 
            item.style.display = "flex";
        });
    } else {
        Array.prototype.forEach.call(h4s, function(h4) { 
            h4.style.display = "block";
        });
        Array.prototype.forEach.call(items, function(item) { 
            item.style.display = "block";
        });
    }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
modal.style.display = "block";
modalImg.src = this.src;
captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}