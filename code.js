var cards = [];
var r_index = [];

var box_list = [];

var turn = 0;
var wait = false;
var pairs_found = 0;

var won_theme = document.getElementById("won_theme");
var ok_bip = document.getElementById("ok_bip");

var score = 0;

createBoxes();
cards_init();
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
        new_box.addEventListener("click", clicked_box);
        document.getElementById("row"+(Math.floor(i/5)+1)).appendChild(new_box);
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
function init_rindex(){
    for(i = 0;i<20;i++){
        r_index[i] = i;
    }
    
}
function get_rindex(){
    var ran = Math.round(Math.random()*(r_index.length-1));
    var index = r_index[ran];
    r_index.splice(ran,1);
    return index;
}
function cards_init(){
    init_rindex();
    var index = 0;
    for(i = 0;i<10;i++){
        index = get_rindex();
        cards[index] = i;
        index = get_rindex();
        cards[index] = i;
    }
}
var disp_img = [];
var disp_img_num = [-1,-1];
function clicked_box(){
    if(!start_game){
        chronometer = setInterval(chronometer_fx, 100);
        start_game = true;
    }
    if(!wait){
        for(i = 0;i<20;i++){
            if(box_list[i] == this){
                if(disp_img_num[0] != i && disp_img_num[1] != i){
                    this.style.backgroundColor = "rgb(0,0,0)";
                    image =  document.createElement("img");
                    image.src = "/images/img"+cards[i]+".jpg";
                    image.width = 100;
                    image.height = 100;
                    this.appendChild(image);
                    disp_img[turn] = image;
                    disp_img_num[turn] = i;
                    if(turn == 0){
                        turn++;
                    }else{
                        turn = 0;
                        if(cards[i]==cards[disp_img_num[0]]){
                            box_list[i].removeEventListener("click", clicked_box);
                            box_list[disp_img_num[0]].removeEventListener("click", clicked_box);
                            pairs_found++;
                            console.log(pairs_found);
                            ok_bip.play();
                            score += 100;
                            if(pairs_found >= 10){
                                won_theme.play();
                                clearInterval(chronometer);
                                document.getElementById("timer_txt").innerHTML = "Time: "+chr_time/10+"s";
                                document.getElementById("score_txt").innerHTML = "Score: "+score;
                            }
                        }else{
                            bad_bip.play();
                            wait = true;
                            setTimeout(erase_img,1000);
                        }
                    }
                }
                break;
            }
        }
    }
}
function erase_img(){
    box_list[disp_img_num[0]].removeChild(disp_img[0]);
    box_list[disp_img_num[1]].removeChild(disp_img[1]);
    disp_img = [];
    disp_img_num = [];
    wait = false;
}
var chr_time = 0;
var start_game = false;
var chronometer;
function chronometer_fx(){
    chr_time++;
    score --;
    if(score  < 0){
        score = 0;
    }
    document.getElementById("timer_txt").innerHTML = "Time: "+chr_time/10+"s";
    document.getElementById("score_txt").innerHTML = "Score: "+score;
}