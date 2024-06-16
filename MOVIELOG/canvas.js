document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById('canvasContainer')) {
    new p5(p => {
      p.Mlist = [];
      p.s0 = p.s1 = p.s2 = p.s3 = p.s4 = null;
      p.sult = null;
      p.star = '';
      p.xyMovie = [0, 0];
      p.cap = '';

      p.preload = function() {
        p.s0 = p.loadImage('./style/스타일1.svg', 
          () => console.log('스타일1 loaded'), 
          () => console.error('Failed to load 스타일1'));
        p.s1 = p.loadImage('./style/스타일2.svg', 
          () => console.log('스타일2 loaded'), 
          () => console.error('Failed to load 스타일2'));
        p.s2 = p.loadImage('./style/스타일3.svg', 
          () => console.log('스타일3 loaded'), 
          () => console.error('Failed to load 스타일3'));
        p.s3 = p.loadImage('./style/스타일4.svg', 
          () => console.log('스타일4 loaded'), 
          () => console.error('Failed to load 스타일4'));
        p.s4 = p.loadImage('./style/스타일5.svg', 
          () => console.log('스타일5 loaded'), 
          () => console.error('Failed to load 스타일5'));
        p.star = p.loadImage('./icon/star.svg', 
          () => console.log('Star icon loaded'), 
          () => console.error('Failed to load star icon'));
        p.sult = p.loadFont('./style/SUIT-Variable-ttf/SUIT-Variable.ttf', 
          () => console.log('Font loaded'), 
          () => console.error('Failed to load font'));
      }

      p.setup = function() {
        let canvas = p.createCanvas(353, 515);
        canvas.parent('canvasContainer');
        p.currentMenu = localStorage.getItem('currentMenu');
        p.currentStep = parseInt(localStorage.getItem('currentStep'), 10) || 0;
        p.currentColor = localStorage.getItem('currentColor');

        if (!p.currentColor) {
          if (p.currentMenu && colorDic[p.currentMenu]) {
            p.currentColor = colorDic[p.currentMenu];
          } else {
            p.currentColor = 220;
          }
        }

        p.background(p.currentColor);
        p.backgroundSvgDrawing();

        if(p.currentStep==4){
          let sBtn = document.getElementById("savePNG");
        sBtn.addEventListener('click', p.saveIMG);
        }
        
      };

      p.draw = function() {
        p.currentColor = localStorage.getItem('currentColor');
        p.background(p.currentColor);
        p.backgroundSvgDrawing();
        p.fill(0);
        if(p.currentStep!=1){
          p.writeMovie();
        }
        
      };

      p.backgroundSvgDrawing = function() {
        p.xyMovie[0] = 27;
        switch (p.currentColor) {
          case c[0]:
            if (p.s0) p.image(p.s0, 0, 0, 353, 530);
            p.xyMovie[1] = 20;
            break;
          case c[1]:
            if (p.s1) p.image(p.s1, 0, 0, 353, 530);
            p.xyMovie[1] = 20;
            break;
          case c[2]:
            if (p.s2) p.image(p.s2, 0, 0, 353, 530);
            p.xyMovie[1] = 70;
            break;
          case c[3]:
            if (p.s3) p.image(p.s3, 0, 0, 353, 530);
            p.xyMovie[1] = 91;
            break;
          case c[4]:
            if (p.s4) p.image(p.s4, 0, 0, 353, 530);
            p.xyMovie[1] = 64;
            break;
          default:
            if (p.s0) p.image(p.s0, 0, 0, 353, 530);
            p.xyMovie[1] = 20;
            break;
        }
      };

      p.writeMovie = function() {
        p.n = localStorage.getItem('Mtitle');
        p.d = localStorage.getItem("Mdirector");
        p.s = localStorage.getItem("Mscore");
        p.textMovie(p.n, p.d, p.s);
      }

      p.textMovie = function(st1, st2, st3) {
        if (!p.sult) return; // 폰트가 로드되지 않았으면 반환
        console.log(st1 + st2 + st3);
        let x = p.xyMovie[0];
        let y = p.xyMovie[1] + 30;
        p.textFont(p.sult);
        p.textStyle(p.BOLD);
        p.stroke(0);
        p.strokeWeight(3);
        p.textSize(40);
        p.text(st1, x, y);

        p.textSize(16);
        p.strokeWeight(1);
        p.text('감독', x, y + 55);

        p.textStyle(p.NORMAL);
        p.strokeWeight(0);
        p.text(st2, x + 33, y + 55);

        p.image(p.star, x, y + 65);
        p.text(st3, x + 20, y + 80);
      }

      p.saveIMG = function() {
        p.cap = p.get(0, 0, 353, 515);
        p.save(p.cap, "movielog.png");
      }
    });
  }
});
