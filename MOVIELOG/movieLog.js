let c = ['#CCFF00', '#FC3F56', '#E5E6E7', '#7C2CFF', '#FEC3D9'];
let almostblack='1F1F1F'
let darkgray="4C4D55"
let colorDic = {
  
  'sound': c[0],
  'analysis': c[1],
  'storyline': c[2],
  'acting': c[3],
  'cinematic': c[4]
};
let currentMenu = '';
let currentColor= '';

document.addEventListener("DOMContentLoaded", function() {
  setup();

  const selectItems = document.querySelectorAll("#selectMenu .selectItem");
  selectItems.forEach(item => {
    item.addEventListener("click", function(event) {
      const parentId = item.id;
      currentMenu = parentId;
      localStorage.setItem('currentMenu', currentMenu);
      window.location.href = 'HTMLstep/step1.html';
    });
  });
});

function setup() {
  let items = document.getElementsByClassName("selectItem");
  for (let i = 0; i < items.length; i++) {
    items[i].style.backgroundColor = c[i];
    items[i].style.zIndex=i;
  }
}

function colorSelect() {
  let colBtns = document.getElementsByClassName('colorSel');
  for (let i = 0; i < colBtns.length; i++) {
    colBtns[i].addEventListener('click', function(e) {
      currentColor = c[e.target.value];
    });
    colBtns[i].style.backgroundColor = c[i];
  }
}