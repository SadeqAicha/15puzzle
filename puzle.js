let puzzle = document.getElementsByClassName('puzzle')[0];
let result = document.getElementById('result');
let classic = document.getElementById('classic');
let images = document.getElementById('images');
let game_type = document.getElementById('game_type');
let puzzle_case = document.getElementsByClassName('puzzle_case');
let case_class = document.getElementsByClassName('case_class');
//audio
const click_audio = new Audio('audio/Mouse Click Sound Effect.mp3');
const victory_audio = new Audio('audio/Victory Sound Effect.mp3');


//( remplirer les cases - affichage )===================================================
const cases_img=[];
for(let i=0;i<16;i++){
    cases_img.push('slides/conan'+i+'.jpg');
}
do{
    Mylist = Randnum(15,16);
    case_vide = Mylist.indexOf(15);
}while(!is_solvable(Mylist));

// 15puzzle avec nombres
classic.addEventListener('click',function(){
    for(let i=0;i<16;i++){
        let case_num = Mylist[i]+1;
        if(i===case_vide){
            case_num = `<img src="${cases_img[15]}" draggable="false" >`;
        }
        puzzle.innerHTML+=`<button class="puzzle_case"> ${case_num} <button>`;
    }
    Deplacer();
});

// 15puzzle avec images
images.addEventListener('click',function(){
    for(let i=0;i<16;i++){
        puzzle.innerHTML+=`<button class="puzzle_case"><img class="case_class" 
        src="${cases_img[Mylist[i]]}" alt="case${Mylist[i]}" draggable="false" ></button>`;
    }
    Deplacer();
});

//( Deplacer les cases - onclick )============================================================
function Deplacer(){
    game_type.style.display='none';
    for(let i=0;i<16;i++){
        puzzle_case[i].style.display='block';
    }

    for(let i=0;i<16;i++){
    puzzle_case[i].onclick=function(){
        if(i+4==case_vide || i-4==case_vide || i+1==case_vide || i-1==case_vide){
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
    victory_audio.play();
    result.innerHTML=`!! أحسنت <a href="puzle.html" ><button id='play_again_btn'>إلعب مجددا</button></a>`;
    puzzle.classList.add('puzzle_result');
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