var box_list = [];
createBoxes();
timer = setInterval(boxes_setColor,500);
timer2 = setInterval(timer_change,2000);
// clearTimeout(timer);
function createBoxes(){
    var new_box;
    for(i = 0;i<20;i++){
        new_box =  document.createElement("div");
        // new_box.className = "box";
        new_box.style.backgroundColor = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"; 
        new_box.classList.add("box");
        document.getElementById("main").appendChild(new_box);
        box_list.push(new_box);
    }
}
function boxes_setColor(){
    for(i = 0;i<20;i++){
        box_list[i].style.backgroundColor = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"; 
    }
}
function timer_change(){
    clearTimeout(timer);
    timer = setInterval(boxes_setColor, Math.round(Math.random()*1000)+500);
}