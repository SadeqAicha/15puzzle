let puzzle = document.getElementsByClassName('puzzle')[0];
let result = document.getElementById('result');
let classic = document.getElementById('classic');
let images = document.getElementById('images');
let game_type = document.getElementById('game_type');
let puzzle_case = document.getElementsByClassName('puzzle_case');
let case_class = document.getElementsByClassName('case_class');
const game_container = document.getElementById('game_container');
const dark = document.getElementById('dark');
const reset_btn = document.getElementById('reset_btn');
const cach_btn = document.getElementById('cach_btn');
const mouvements_counter = document.getElementById('mouvements_counter');
const counter_num = document.getElementById('counter_num');
const pause = document.getElementById('pause');
const play = document.getElementById('play');
const pause_img = document.getElementById('pause_img');
const images_container = document.getElementById('images_container');
const images_class = document.getElementsByClassName('images_class');

for(i=0;i<9;i++){
    images_container.innerHTML+=`<img class="images_class" src="images/${i}.jpg">`;
}


//------------------------------------------------------------------------------------
//audio
const click_audio = new Audio('audio/Mouse Click Sound Effect.mp3');
const victory_audio = new Audio('audio/Victory Sound Effect.mp3');

let mouv_num=0;
let count_num=0;
reset_btn.onclick=function(){
    game_type.style.display='block';
    cach_btn.style.display='flex';
    dark.style.display='flex';
    cach_btn.onclick=function(){
        game_type.style.display='none';
        dark.style.display='none';
    }
}
pause.onclick=function(){
    if(mouv_num<1) return;
    if (typeof intervalId!=='undefined')
        clearInterval(intervalId);
    dark.style.display='flex';
    play.style.display='block';
    play.onclick=function(){
        dark.style.display='none';
        play.style.display='none';
        intervalId = setInterval(function(){counter_num.innerHTML=++count_num;},1000);
    }
}

images.onclick=function(){
    if(images_container.style.display!=='flex')
        images_container.style.display='flex';
    else
        images_container.style.display='none';
}
//( remplirer les cases - affichage )===================================================
let cases_img=[];
function cases_mix(cases_folder){
    cases_img=[];
    for(let i=0;i<16;i++){
        cases_img.push(`Images_cases/${cases_folder}/${i+1}.png`);
    }
    do{
        Mylist = Randnum(15,16);
        case_vide = Mylist.indexOf(15);
    }while(!is_solvable(Mylist));
}

function default_desplay(){
    cases_mix(1);
    for(let i=0;i<16;i++){
    let case_num = Mylist[i]+1;
    if(i===case_vide){
        case_num = `<img src="${cases_img[15]}" draggable="false" >`;
    }
    puzzle.innerHTML+=`<button class="puzzle_case"> ${case_num} </button>`;
}}
default_desplay();
// 15puzzle avec nombres
classic.addEventListener('click',function(){
    cases_mix(1);
    dark.style.display='none';
    puzzle.innerHTML='';
    default_desplay();
    Deplacer();
});

// 15puzzle avec images-----------------------------------------------------------------------
for(let i=0;i<9;i++){
images_class[i].addEventListener('click',function(){
    puzzle.innerHTML='';
    cases_mix(i);
    dark.style.display='none';
    for(let i=0;i<16;i++){
        puzzle.innerHTML+=`<button class="puzzle_case"><img class="case_class" 
        src="${cases_img[Mylist[i]]}" alt="case${Mylist[i]}" draggable="false" ></button>`;
    }
    Deplacer();
    console.log(cases_img);
});
}
//( Deplacer les cases - onclick )============================================================
function Deplacer(){
    pause.style.cursor='no-drop';
    pause_img.style.opacity='50%';
    mouvements_counter.innerHTML=0;
    mouv_num=0;
    counter_num.innerHTML=0;
    count_num=0;
    if (typeof intervalId!=='undefined')
        clearInterval(intervalId);

    result.style.display='none';
    game_type.style.display='none';
    for(let i=0;i<16;i++){
    puzzle_case[i].onclick=function(){
        if(i+4==case_vide || i-4==case_vide || i+1==case_vide || i-1==case_vide){
            mouvements_counter.innerHTML=++mouv_num;
            pause_img.style.opacity='100%';
            pause.style.cursor='pointer'; 
            if(mouv_num===1)
                intervalId = setInterval(function(){counter_num.innerHTML=++count_num;},1000);
            click_audio.play();
            let tmp = puzzle_case[case_vide].innerHTML;
            puzzle_case[case_vide].innerHTML = puzzle_case[i].innerHTML;
            puzzle_case[i].innerHTML = tmp;
            case_vide=i;
            resultat();
        }
    }}
}

//( Les fonctions utilisee )===============================================================
//--------------------------------------------------
function is_solvable(arr){
    let inv_count = 0; // variable pour calculer le nombre des reflexions 
    for(let i = 0; i < arr.length; i++) {
        if(i===case_vide) continue;
        for(let j = i + 1; j < arr.length; j++) {
            if(j===case_vide) continue;
            if (arr[i] > arr[j]) inv_count++;
        }
    }
    console.log(inv_count);

    let case_vide_from_bottom = 4 - Math.floor(case_vide / 4);
    console.log(case_vide_from_bottom);
    if(case_vide_from_bottom%2===0)
        return inv_count%2 === 1;
    else
        return inv_count % 2 === 0;
}

//--------------------------------------------------

function resultat(){
    let case_class = document.getElementsByClassName('case_class');
if (case_class.length===0){
    for(let i=0 ;i<Mylist.length;i++){
    if (i===case_vide) continue;
    if(puzzle_case[i].innerHTML != i+1) return;
}
}else{
    for(let i=0 ;i<Mylist.length;i++){
    if (i===case_vide) continue;
    if(case_class[i].alt != `case${i}`) return;
}}
    mouv_num=0;
    pause_img.style.opacity='50%';
    pause.style.cursor='no-drop';
    clearInterval(intervalId);
    victory_audio.play();
    result.innerHTML=`!! أحسنت <a href="index.html" ><button id='play_again_btn'>إلعب مجددا</button></a>`;
    result.style.display='grid';
    for(let i=0 ;i<Mylist.length;i++)
        puzzle_case[i].disabled=true;
}

//--------------------------------------------------
function Randnum(max,count){
    let listRand=[];
    while(listRand.length!=count){
        let r = Math.floor(Math.random()*(max+1));
        if(!listRand.includes(r)){
            listRand.push(r);
        }
    }
    return listRand;

}
