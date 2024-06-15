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

let htmlLink = ['/index.html', '/HTMLstep/step1.html', '/HTMLstep/step2.html', '/HTMLstep/step3.html', '/HTMLstep/step4.html', '/HTMLstep/step5.html'];
let currentMenu = '';
let currentColor = '';
let currentStep = parseInt(localStorage.getItem('currentStep')) || 0;
let qNum = 0;

document.addEventListener("DOMContentLoaded", function() {
  setup();
  pageBtn();
  init(currentStep);
  const selectItems = document.querySelectorAll("#selectMenu .selectItem");
  selectItems.forEach(item => {
    item.addEventListener("click", function() {
      const parentId = item.id;
      currentMenu = parentId;
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
    items[i].style.zIndex = i;
  }
}

function init(step) {
  currentStep = step;
  localStorage.setItem('currentStep', currentStep);
  switch (currentStep) {
    case 1:
      colorSelect();
      break;
    case 2:
      qStep();
      break;
  }
}

function pageBtn() {
  let Lbtn = document.getElementsByClassName('leftBtn');
  let Rbtn = document.getElementsByClassName('rightBtn');
  for (let l of Lbtn) {
    l.addEventListener('click', function() {
      if (currentStep == 2 && qNum == 1) {
        qNum = 0;
      } else if (currentStep == 2 && qNum == 2) {
        qNum = 1;
      } else {
        currentStep -= 1;
        if (currentStep < 0) { currentStep = 0; }
        localStorage.setItem('currentStep', currentStep);
        window.location.href = htmlLink[currentStep];
      }
    });
  }
  for (let r of Rbtn) {
    r.addEventListener('click', function() {
      if (currentStep == 2 && qNum == 0) {
        qNum = 1;
      } else if (currentStep != 2 || qNum == 2) {
        currentStep += 1;
        if (currentStep > 5) { currentStep = 5; }
        localStorage.setItem('currentStep', currentStep);
        window.location.href = htmlLink[currentStep];
      }
    });
  }
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
      // Update canvas background color
      let canvasContainer = document.getElementById('canvasContainer');
      if (canvasContainer) {
        canvasContainer.style.backgroundColor = currentColor;
      }
    });
    colBtns[i].style.backgroundColor = c[i];
  }
}

function qStep() {
  switch (qNum) {
    case 0:
      qMovie();
      break;
    case 1:
      qReview();
      break;
  }
}

function qMovie() {
  createQ('영화 제목', '을 적어주세요');
  createInput('Mtitle', '이름을 입력하세요', 'text');
  createQ('감독 이름', '을 적어주세요');
  createInput('Mdirector', '이름을 입력하세요', 'text');
  createQ('10점 만점', '중 총점을 매겨주세요');
  createInput('Mscore', '숫자를 입력하세요', 'number');
}

function qReview() {
  // Placeholder function
}

function createInput(id, placeH, type) {
  let box = document.getElementById('qBox');
  let textBox = document.createElement('div');
  let input = document.createElement('input');
  let writed = document.createElement('div');
  let vec = document.createElement('object');
  
  input.placeholder = placeH;
  input.type = type;
  input.id = id;

  textBox.className = 'textBox';
  writed.className = 'writed';
  vec.className = 'vec';
  vec.data = '';

  textBox.appendChild(input);
  textBox.appendChild(writed);
  textBox.appendChild(vec);
  box.appendChild(textBox);

  input.addEventListener('input', function() {
    let inputValue = input.value;
    if (inputValue) {
      writed.style.backgroundColor = c[0];
      textBox.style.backgroundColor = 'white';
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
  textQ.innerHTML = `<p class='mark'>${strong}</p><p class='nomal'>${text}</p>`;
  box.appendChild(textQ);
}
