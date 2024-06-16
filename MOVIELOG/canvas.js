document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById('canvasContainer')) {
    new p5(p => {
      p.s0,p.s1,p.s2,p.s3,p.s4;
      let sult;
      p.star='';
      p.xyMovie = [0,0];
      p.cap='';

      p.preload = function() {
        p.s0 = p.loadImage('../style/스타일1.svg', 
          () => console.log('스타일1 loaded'), 
          () => console.error('Failed to load 스타일1'));
        p.s1 = p.loadImage('../style/스타일2.svg', 
          () => console.log('스타일2 loaded'), 
          () => console.error('Failed to load 스타일2'));
        p.s2 = p.loadImage('../style/스타일3.svg', 
          () => console.log('스타일3 loaded'), 
          () => console.error('Failed to load 스타일3'));
        p.s3 = p.loadImage('../style/스타일4.svg', 
          () => console.log('스타일4 loaded'), 
          () => console.error('Failed to load 스타일4'));
        p.s4 = p.loadImage('../style/스타일5.svg', 
          () => console.log('스타일5 loaded'), 
          () => console.error('Failed to load 스타일5'));
        p.star = p.loadImage('../icon/star.svg', 
          () => console.log('Star icon loaded'), 
          () => console.error('Failed to load star icon'));
        sult = p.loadFont('../style/SUIT-Variable-ttf/SUIT-Variable.ttf', 
          () => console.log('Font loaded'), 
          () => console.error('Failed to load font'));
      }
      
      p.setup = function() {
        let canvas = p.createCanvas(353, 515);
        canvas.parent('canvasContainer');
        p.currentMenu = localStorage.getItem('currentMenu');
        p.preload();
        if (p.currentMenu && colorDic[p.currentMenu]) {
          currentColor = colorDic[p.currentMenu];
        } else {
          currentColor = 220;
        }
        p.background(currentColor);
        p.backgroundSvgDrawing(p.styleList);
      };

      p.draw = function() {
        p.background(currentColor);
        p.backgroundSvgDrawing();
        p.fill(0);
        p.writeMovie();
      };

      p.backgroundSvgDrawing = function() {
          p.xyMovie[0]=27;
        switch (currentColor) {
          case c[0]:
            p.image(p.s0, 0, 0, 353, 530);
            p.xyMovie[1]=20;
            break;
          case c[1]:
            p.image(p.s1, 0, 0, 353, 530);
            p.xyMovie[1]=20;
            break;
          case c[2]:
            p.image(p.s2, 0, 0, 353, 530);
            p.xyMovie[1]=70;
            break;
          case c[3]:
            p.image(p.s3, 0, 0, 353, 530);
            p.xyMovie[1]=91;
            break;
          case c[4]:
            p.image(p.s4, 0, 0, 353, 530);
            p.xyMovie[1]=64;
            break;
          default:
            p.image(p.s0, 0, 0, 353, 530);
            p.xyMovie[1]=20;
            break;
        }
      };

      p.writeMovie = function() {
        p.name = document.getElementById('Mtitle');
        p.direc = document.getElementById('Mdirector');
        p.score = document.getElementById('Mscore');
        
        if(p.name && p.name.value && p.direc && p.direc.value && p.score && p.score.value) {
          console.log('!');
        
          let st = p.name.value;
          let x = p.xyMovie[0];
          let y = p.xyMovie[1]+30;
          console.log(p.xyMovie);
          stroke('#1F1F1F');
          p.textFont(sult);
          p.textWidth(600);
          p.textSize(40);
          p.text(st, x, y);

          p.textSize(16);
          p.textWidth(700);
          p.text('감독', x, y + 55);

          st = p.direc.value;
          p.textWidth(400);
          p.text(st, x + 33, y + 55);

          p.image(p.star, x, y + 65);
          st = p.score.value + '/10';
          p.text(st, x + 20, y + 80);
        }
      }
      p.saveIMG=function(){
        p.cap = get(0,0,353,515);
        save(p.cap, "save.jpg");
      }
    });
  }
});
