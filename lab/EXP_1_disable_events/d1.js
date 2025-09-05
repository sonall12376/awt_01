$(document).ready(function(){
    $(document).on("contextmenu",function(e){
        e.preventDefault();
    })
})

$(document).on("selectstart", function(e) { e.preventDefault(); });

$(document).on("keydown", function(e) {
    if (e.ctrlKey && e.keyCode === 67) e.preventDefault();
});
