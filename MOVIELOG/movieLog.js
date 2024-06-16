
let c = ['#CCFF00', '#FC3F56', '#E5E6E7', '#7C2CFF', '#FEC3D9'];
let almostblack = '#1F1F1F';
let darkgray = "#4C4D55";
let colorDic = {
  'sound': c[0],
  'analysis': c[1],
  'storyline': c[2],
  'acting': c[3],
  'cinematic': c[4]
};

let htmlLink = ['/index.html', '/HTMLstep/step1.html', '/HTMLstep/step2.html', '/HTMLstep/step2r.html','/HTMLstep/step5.html'];
let currentMenu = localStorage.getItem('currentMenu') || '';
let currentColor = localStorage.getItem('currentColor') || '';
let currentStep = parseInt(localStorage.getItem('currentStep')) || 0;

document.addEventListener("DOMContentLoaded", function() {
  setup();
  pageBtn();
  const selectItems = document.querySelectorAll("#selectMenu .selectItem");
  selectItems.forEach(item => {
    item.addEventListener("click", function() {
      currentMenu = item.id;
      localStorage.setItem('currentMenu', currentMenu);
      currentStep = 1;
      localStorage.setItem('currentStep', currentStep);
      window.location.href = htmlLink[currentStep];
    });
  });
});

function setup() {
  let items = document.getElementsByClassName("selectItem");
  for (let i = 0; i < items.length; i++) {
    items[i].style.backgroundColor = c[i];
    items[i].style.zIndex = i+10;
    items[i].style.top=200+100*i+'px';
  }
}

function init(step) {
  currentStep = step;
  if(currentStep>0){
    let Mname = document.querySelector('.cMenu'); 
    if (Mname) {
      Mname.innerHTML = currentMenu; 
    }
  }

  if (currentStep==2||currentStep==3){
    let box = document.getElementById('qBox');
    switch (currentStep) {
      case 2:
        box.innerHTML='';
        qMovie();
        break;
      case 3:
        box.innerHTML='';
        qReview();
        break;
    }
  }
  
  switch (currentStep) {
    case 1:
      colorSelect();
      break;

  }
}

function pageBtn() {
  let Lbtn = document.querySelectorAll('.leftBtn');
  let Rbtn = document.querySelectorAll('.rightBtn');
  
  Lbtn.forEach(btn => {
    btn.addEventListener('click', function() {
        currentStep--;
        if (currentStep < 0) currentStep = 0;
        localStorage.setItem('currentStep', currentStep);
        window.location.href = htmlLink[currentStep];
    });
  });

  Rbtn.forEach(btn => {
    btn.addEventListener('click', function() {
        currentStep++;
        if (currentStep > 4) currentStep = 4;
        localStorage.setItem('currentStep', currentStep);
        window.location.href = htmlLink[currentStep];
    });
  });
}


function colorSelect() {
  let colBtns = document.getElementsByClassName('colorSel');
  let checkedIcons = document.getElementsByClassName('checked');
  for (let i = 0; i < colBtns.length; i++) {
    colBtns[i].addEventListener('click', function(e) {
      for (let btn of colBtns) {
        btn.style.border = 'none';
        btn.style.backgroundColor = c[btn.value];
      }
      for (let icon of checkedIcons) {
        icon.style.visibility = 'hidden';
      }
      let clickedButton = e.currentTarget;
      clickedButton.querySelector('.checked').style.visibility = 'visible';
      currentColor = c[clickedButton.value];
      clickedButton.style.backgroundColor = almostblack;
      clickedButton.style.border = `4px solid ${currentColor}`;
      localStorage.setItem('currentColor', currentColor);
      let canvasContainer = document.getElementById('canvasContainer');
      if (canvasContainer) {
        canvasContainer.style.backgroundColor = currentColor;
      }
    });
    colBtns[i].style.backgroundColor = c[i];
  }
}


function qMovie() {
  createQ('영화 제목', '을 적어주세요');
  createInputBox('Mtitle', '이름을 입력하세요', 'text');
  createQ('감독 이름', '을 적어주세요');
  createInputBox('Mdirector', '이름을 입력하세요', 'text');
  createQ('10점 만점', '중 총점을 매겨주세요');
  createInputBox('Mscore', '숫자를 입력하세요', 'number');
}

function qReview() {
  createQ('리뷰 제목', '을 적어주세요');
  createInputBox('Rtitle', '리뷰 제목을 입력하세요', 'text');
  createQ('리뷰 내용', '을 적어주세요');
  createInputBox('Rcontent', '리뷰 내용을 입력하세요', 'text');
}

function createInputBox(id, placeH, type) {
  let box = document.getElementById('qBox');
  let textBox = document.createElement('div');
  let inputBox = document.createElement('input');
  let writed = document.createElement('div');
  let vec = document.createElement('object');
  
  inputBox.placeholder = placeH;
  inputBox.type = type;
  inputBox.id = id;
  inputBox.classList.add('inputBox');
  

  textBox.className = 'textBox';
  writed.className = 'writed';
  writed.style.width='42px';
  vec.className = 'vec';
  vec.data = '../icon/Write.svg';

  writed.appendChild(vec);
  textBox.appendChild(inputBox);
  textBox.appendChild(writed);
  box.appendChild(textBox);

  inputBox.addEventListener('input', function() {
    let inputValue = inputBox.value;
    if (inputValue) {
      writed.style.backgroundColor = c[0];
      vec.data = '../icon/Checked.svg';
    } else {
      writed.style.backgroundColor = '#999AA0';
      vec.data = '../icon/Write.svg';
    }
  });
}

function createQ(strong, text) {
  let box = document.getElementById('qBox');
  let textQ = document.createElement('div');
  textQ.className = 'question';
  textQ.innerHTML = `<span class='mark'>${strong}</span><span class='normal'>${text}</span>`;
  box.appendChild(textQ);
}