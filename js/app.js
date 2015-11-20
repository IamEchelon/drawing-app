var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//==============================================================================================================
//
//==============================================================================================================

// when clicking on control list items
$(".controls").on("click", "li",function(){
    // remove class select from other elements
    $(this).siblings().removeClass("selected");

    // select clicked elements
    $(this).addClass("selected");

    // cache current color
    color = $(this).css("background-color");
});

//==============================================================================================================
//
//==============================================================================================================

//Button on page
$("#revealColorSelect").click(function(){
    changeColor();
    $("#colorSelect").toggle();
});


function changeColor(){
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")" );

}

//==============================================================================================================
//
//==============================================================================================================

// when color sliders change
$("input[type=range]").change(changeColor);

$("#addNewColor").click(function(){
    // append the color to the controls ul
    $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls  ul").append($newColor);

    // select the newColor
    $newColor.click();
});

//==============================================================================================================
//
//==============================================================================================================

// Draw on canvas
$canvas.mousedown(function(e){
    lastEvent = e;
    mouseDown = true;
}).mousemove(function(e){
    if(mouseDown){
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = color;
        context.stroke();
        lastEvent = e;
    }
}).mouseup(function(){
    mouseDown = false;
}).mouseleave(function(){
    $canvas.mouseup();
});
