//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
//랜덤번호가 < 유저번호 down
//랜덤번호가 > 유저번호 up
//reset 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다(더이상 추측불가 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. 

let computerNum = 0;
let goButton = document.getElementById("go-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let heartSpan = document.getElementById("heart-span");
let chances = 5;
let history=[];
let gameOver = false; 

goButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus",function(){userInput.value = "";});

function pickRandomNum(){ 
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답은", computerNum);
};

function play(){
  let userValue = userInput.value;


  if(userValue < 1 || userValue > 100){
    resultArea.textContent = "1과 100사이 숫자를 입력해 주세요";
    return;
  } 

  if(history.includes(userValue)){
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
    return;
  }

  chances--;
  if(chances == 4){
  heartSpan.textContent=`♥♥♥♥`;
} else if(chances == 3){
  heartSpan.textContent=`♥♥♥`;
} else if(chances == 2){
  heartSpan.textContent=`♥♥`;
}else if(chances == 1){
  heartSpan.textContent=`♥`;
}else{
  heartSpan.textContent=``;
  resultArea.textContent = "다음기회에 다시 도전하세요 ㅠㅠ";
  gameOver = true;
}


  
  if (userValue < computerNum) {
    resultArea.textContent = "UP";
  } else if (userValue > computerNum) {
    resultArea.textContent = "DOWN";
  } else {
    resultArea.textContent = "정답입니다";
    gameOver = true;
  }

  if (gameOver == true){
    goButton.disabled = true;
  }
  history.push(userValue);

};

function reset(){
userInput.value = "";
pickRandomNum();
resultArea.textContent = "5번의 기회 동안 숫자를 맞춰보세요!";
gameOver = false;
goButton.disabled = false;
heartSpan.textContent=`♥♥♥♥♥`;
chances = 5;
};

pickRandomNum();
