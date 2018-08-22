var box_ref= document.getElementsByClassName("box");
var new_box;
for(i = 0;i<20;i++){
    new_box =  document.createElement("div");
    // new_box.className = "box";
    new_box.style.backgroundColor = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"; 
    new_box.classList.add("box");
    document.getElementById("main").appendChild(new_box);
}
