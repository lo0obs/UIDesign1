
document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById('canvasContainer')) {
    new p5(p => {
      p.setup = function() {
        let canvas = p.createCanvas(400, 540);
        canvas.parent('canvasContainer');
        p.currentMenu = localStorage.getItem('currentMenu');
        
        if (p.currentMenu && colorDic[p.currentMenu]) {
          p.background(colorDic[p.currentMenu]);
        } else {
          p.background(220); 
        }
        currentColor=colorDic[p.currentMenu];
      };

      p.draw = function() {
        p.background(currentColor); 
        p.fill(0);
        p.textSize(32);
        if (p.currentMenu) {
          let str = "#" + p.currentMenu.toUpperCase();
          p.text(str, 10, 30);
        } else {
          p.text('No Menu Selected', 10, 30);
        }
      };
    });
  }
});
