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

//Pulse Project item on hover
$(".img-responsive").hover(function (e) {                 
    $(this).addClass("wow pulse animated");
    $(this).attr("style","visibility: visible; animation-name: pulse;");                  
});

//Pulse image on hover
$("img").hover(function (e) {
    $(this).addClass("wow pulse animated");
    $(this).attr("style","visibility: visible; animation-name: pulse;");                        
});

//Resize overlay to size of image
function changeSize() {
    var elem = document.getElementById("img-cat");
    var sty = window.getComputedStyle(elem);
    var imgWidth = sty.getPropertyValue("width");
    var imgHeight = sty.getPropertyValue("height");

    var overlays = document.getElementsByClassName("portfolio-overlay");
    Array.prototype.forEach.call(overlays, function(overlay) {
        overlay.style.width = imgWidth;
        overlay.style.height = imgHeight;
        overlay.style.marginLeft = "15px";
    });
}
