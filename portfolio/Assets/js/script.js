//initialize wow for animations
$(document).ready(function(){
    new WOW().init();
});

//Flip project item image before linking to next page
$(".portfolio-thumb").click(function (e) {
    e.preventDefault();                   
    var nextPage = this.getAttribute("href"); // stores the href

    $(this).addClass("wow flipOutY animated");
    $(this).attr("style","visibility: visible; animation-name: flipOutY;");

    setTimeout(function(){
         window.location = nextPage;
    }, 865);                             
});

//Pulse Project item on hover
$(".portfolio-thumb").hover(function (e) {                 
    $(this).addClass("wow pulse animated");
    $(this).attr("style","visibility: visible; animation-name: pulse;");                        
});

//Pulse image on hover
$("img").hover(function (e) {
    $(this).addClass("wow pulse animated");
    $(this).attr("style","visibility: visible; animation-name: pulse;");                        
});
