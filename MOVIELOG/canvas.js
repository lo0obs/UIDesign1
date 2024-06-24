document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("canvasContainer")) {
    new p5((p) => {
      p.Mlist = [];
      p.s0 = p.s1 = p.s2 = p.s3 = p.s4 = null;
      p.sult = null;
      p.star = "";
      p.xyMovie = [0, 0];
      p.cap = "";
      p.fontLoaded = false;

      p.preloadAssets = function () {
        p.star = p.loadImage(
          "./icon/star.svg",
          () => console.log("Star icon loaded"),
          () => console.error("Failed to load star icon")
        );
        p.sult = p.loadFont(
          "./style/SUIT-Variable-ttf/SUIT-Variable.ttf",
          () => {
            console.log("Font loaded");
            p.fontLoaded = true;
          },
          () => console.error("Failed to load font")
        );
      };

      p.preload = function () {
        p.preloadAssets();
      };


      p.setup = function () {
        let canvas = p.createCanvas(353, 515);
        canvas.parent("canvasContainer");
        p.currentMenu = localStorage.getItem("currentMenu");
        p.currentStep = parseInt(localStorage.getItem("currentStep"), 10) || 0;
        p.currentColor = localStorage.getItem("currentColor");

        if (!p.currentColor) {
          if (p.currentMenu && colorDic[p.currentMenu]) {
            p.currentColor = colorDic[p.currentMenu];
          } else {
            p.currentColor = 220;
          }
        }

        p.background(p.currentColor);
        p.backgroundSvgDrawing();

        if (p.currentStep == 4) {
          let sBtn = document.getElementById("savePNG");
          sBtn.addEventListener("click", p.saveIMG);
        }
      };

      p.draw = function () {
        p.currentColor = localStorage.getItem("currentColor");
        p.background(p.currentColor);
        p.backgroundSvgDrawing();
        p.fill(0);
        if (p.currentStep>1) {
          p.writeMovie();
        }
        if (p.currentStep>2){
          p.writeReview();
        }
          
      };

      p.backgroundSvgDrawing = function () {
        p.xyMovie[0] = 27;
        p.backStyle=document.getElementById("backgroundStyle");
        
        switch (p.currentColor) {
          case c[0]:
            p.xyMovie[1] = 20;
            p.style1();
            break;
          case c[1]:
            p.xyMovie[1] = 20;
            p.style2();
            break;
          case c[2]:
            p.xyMovie[1] = 70;
            p.style3();
            break;
          case c[3]:
            p.xyMovie[1] = 91;
            p.style4();
            break;
          case c[4]:
            p.xyMovie[1] = 64;
            p.style5();
            break;
          default:
            p.xyMovie[1] = 20;
            p.style1();
            break;
        }
        
      };

      p.writeMovie = function () {
        p.n = localStorage.getItem("Mtitle");
        p.d = localStorage.getItem("Mdirector");
        p.s = localStorage.getItem("Mscore");
        p.textMovie(p.n, p.d, p.s);
      };

      p.textMovie = function (st1, st2, st3) {
        if (!p.sult) return; 
        console.log(st1 + st2 + st3);
        let x = p.xyMovie[0];
        let y = p.xyMovie[1] + 45;
        p.textFont(p.sult);
        p.textStyle(p.BOLD);
        p.stroke(0);
        p.strokeWeight(3);
        p.textSize(40);
        p.text(st1, x, y);

        p.textSize(16);
        p.strokeWeight(1);
        p.text("감독", x, y + 35);

        p.textStyle(p.NORMAL);
        p.strokeWeight(0.5);
        p.text(st2, x + 36, y + 35);

        p.image(p.star, x, y + 47);
        p.text(st3, x + 20, y + 60);
      };

      p.saveIMG = function () {
        p.cap = p.get(0, 0, 353, 515);
        p.save(p.cap, "movielog.png");
      };

      p.writeReview = function () {
        p.reviewAarray = JSON.parse(localStorage.getItem("reviewAarray"));
        p.reviewTitle = JSON.parse(localStorage.getItem("reviewQarrayString"));
        let x = 27;
        let y = 0;
        let xgap = 158;
        let ygap = 82;
    
        if (p.reviewAarray && p.reviewTitle) {
            switch (p.currentColor) {
                case c[0]:
                    y = 216+32;
                    ygap = 113;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x + xgap, y + ygap);
                    break;
    
                case c[1]:
                    y = 166.5+32;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x + xgap, y + ygap);
                    break;
                case c[2]:
                    y = 313+32;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x + xgap, y + ygap);
                    break;
                case c[3]:
                    y = 220+32;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x + xgap, y + ygap);
                    break;
                case c[4]:
                    y = 196+32;
                    ygap = 69;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x, y + ygap + 125);
                    break;
            }
        }
    };
    
    p.textReview = function (title, content, x, y) {

      function insertLineBreaks(input) {
        let output = '';
        for (let i = 0; i < input.length; i++) {
            output += input[i];
            if ((i + 1) % 14 === 0) {
                output += '\n';
            }
        }
        return output;
    }
    
      if (p.sult && title && content) {
            p.textFont(p.sult);
            p.fill('#1F1F1F');
            p.textStyle(p.BOLD);
            p.stroke('#1F1F1F');
            p.strokeWeight(1);
            p.textSize(14);
            p.text(title, x, y);
    
            p.textSize(12);
            p.strokeWeight(0.5);
            
            p.text(insertLineBreaks(content), x, y + 14, '140px', '40px');
        }
    };
    

      p.style1=function(){
      p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.beginShape();
      p.vertex(0,0);
      p.vertex(353,0);
      p.quadraticVertex(353,0,353,0);
      p.vertex(353,530);
      p.quadraticVertex(353,530,353,530);
      p.vertex(0,530);
      p.quadraticVertex(0,530,0,530);
      p.vertex(0,0);
      p.quadraticVertex(0,0,0,0);
      p.endShape();
      p.fill("#ccff00")
      p.beginShape();
      p.vertex(0.000164032,530);
      p.vertex(266.589,530);
      p.vertex(304.279,530);
      p.vertex(353,530);
      p.vertex(353,454.764);
      p.bezierVertex(353,445.455,348.678,436.672,341.301,430.993);
      p.vertex(266.589,373.471);
      p.vertex(323,373.471);
      p.bezierVertex(339.569,373.471,353,360.04,353,343.471);
      p.vertex(353,216.943);
      p.vertex(353,183.99);
      p.vertex(353,168.199);
      p.vertex(353,129.152);
      p.bezierVertex(353,111.127,337.218,97.172,319.329,99.3779);
      p.vertex(156.5,119.456);
      p.vertex(329.973,78.0027);
      p.bezierVertex(343.475,74.7761,353,62.7068,353,48.8242);
      p.vertex(353,0);
      p.vertex(0,0);
      p.vertex(0.000164032,119.456);
      p.vertex(0.000116396,139.112);
      p.vertex(116,168.199);
      p.vertex(22.1846,193.514);
      p.bezierVertex(9.09417,197.046,0.00000584705,208.919,0.0000142635,222.478);
      p.vertex(0.000164032,463.75);
      p.vertex(0.000164032,530);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(221.889,128.599);
      p.vertex(222.81,136.145);
      p.vertex(221.337,136.325);
      p.vertex(220.085,126.069);
      p.vertex(221.683,125.874);
      p.vertex(226.02,131.705);
      p.vertex(228.812,125.004);
      p.vertex(230.424,124.807);
      p.vertex(231.677,135.063);
      p.vertex(230.203,135.242);
      p.vertex(229.282,127.697);
      p.vertex(226.885,133.476);
      p.vertex(225.592,133.633);
      p.vertex(221.889,128.599);
      p.endShape();
      p.vertex(238.115,133.078);
      p.bezierVertex(238.829,132.991,239.439,132.751,239.946,132.36);
      p.bezierVertex(240.461,131.959,240.831,131.444,241.055,130.815);
      p.bezierVertex(241.287,130.175,241.356,129.466,241.261,128.688);
      p.bezierVertex(241.166,127.91,240.929,127.243,240.551,126.687);
      p.bezierVertex(240.181,126.121,239.698,125.71,239.103,125.454);
      p.bezierVertex(238.515,125.187,237.865,125.097,237.152,125.184);
      p.bezierVertex(236.438,125.271,235.829,125.515,235.323,125.915);
      p.bezierVertex(234.816,126.306,234.446,126.822,234.214,127.461);
      p.bezierVertex(233.99,128.09,233.925,128.794,234.02,129.572);
      p.bezierVertex(234.115,130.35,234.348,131.022,234.718,131.588);
      p.bezierVertex(235.096,132.144,235.579,132.555,236.166,132.822);
      p.bezierVertex(236.752,133.079,237.402,133.165,238.115,133.078);
      p.endShape();
      p.vertex(236.994,123.892);
      p.bezierVertex(237.985,123.771,238.892,123.886,239.716,124.236);
      p.bezierVertex(240.548,124.586,241.231,125.133,241.764,125.876);
      p.bezierVertex(242.296,126.62,242.624,127.497,242.748,128.506);
      p.bezierVertex(242.871,129.516,242.763,130.446,242.425,131.296);
      p.bezierVertex(242.087,132.146,241.556,132.841,240.832,133.381);
      p.bezierVertex(240.118,133.919,239.265,134.249,238.273,134.37);
      p.bezierVertex(237.291,134.49,236.384,134.375,235.551,134.025);
      p.bezierVertex(234.728,133.675,234.05,133.127,233.517,132.384);
      p.bezierVertex(232.985,131.64,232.657,130.763,232.533,129.754);
      p.bezierVertex(232.41,128.744,232.518,127.814,232.856,126.964);
      p.bezierVertex(233.194,126.114,233.72,125.42,234.435,124.881);
      p.bezierVertex(235.159,124.342,236.012,124.012,236.994,123.892);
      p.endShape();
      p.vertex(248.991,132.949);
      p.vertex(247.268,133.159);
      p.vertex(242.222,123.366);
      p.vertex(243.792,123.175);
      p.vertex(247.873,131.068);
      p.vertex(249.74,122.448);
      p.vertex(251.31,122.257);
      p.vertex(248.991,132.949);
      p.endShape();
      p.vertex(254.086,121.918);
      p.vertex(255.338,132.174);
      p.vertex(253.865,132.353);
      p.vertex(252.613,122.098);
      p.vertex(254.086,121.918);
      p.endShape();
      p.vertex(262.535,122.198);
      p.vertex(257.379,122.827);
      p.vertex(257.75,125.871);
      p.vertex(262.183,125.329);
      p.vertex(262.34,126.608);
      p.vertex(257.907,127.149);
      p.vertex(258.315,130.498);
      p.vertex(263.471,129.869);
      p.vertex(263.629,131.161);
      p.vertex(257,131.971);
      p.vertex(255.748,121.715);
      p.vertex(262.377,120.905);
      p.vertex(262.535,122.198);
      p.endShape();
      p.vertex(269.251,129.163);
      p.vertex(273.893,128.596);
      p.vertex(274.05,129.889);
      p.vertex(267.936,130.635);
      p.vertex(266.684,120.38);
      p.vertex(268.157,120.2);
      p.vertex(269.251,129.163);
      p.endShape();
      p.vertex(279.34,128.044);
      p.bezierVertex(280.053,127.957,280.664,127.718,281.171,127.327);
      p.bezierVertex(281.686,126.926,282.055,126.41,282.28,125.781);
      p.bezierVertex(282.512,125.142,282.58,124.433,282.485,123.655);
      p.bezierVertex(282.39,122.876,282.154,122.209,281.776,121.654);
      p.bezierVertex(281.406,121.088,280.923,120.677,280.327,120.42);
      p.bezierVertex(279.74,120.153,279.09,120.064,278.376,120.151);
      p.bezierVertex(277.663,120.238,277.053,120.481,276.547,120.882);
      p.bezierVertex(276.04,121.273,275.671,121.788,275.439,122.428);
      p.bezierVertex(275.215,123.057,275.15,123.76,275.245,124.539);
      p.bezierVertex(275.34,125.317,275.573,125.989,275.943,126.555);
      p.bezierVertex(276.321,127.11,276.803,127.522,277.391,127.788);
      p.bezierVertex(277.977,128.046,278.627,128.131,279.34,128.044);
      p.endShape();
      p.vertex(278.219,118.858);
      p.bezierVertex(279.21,118.737,280.117,118.852,280.94,119.203);
      p.bezierVertex(281.773,119.553,282.455,120.099,282.988,120.843);
      p.bezierVertex(283.521,121.586,283.849,122.463,283.972,123.473);
      p.bezierVertex(284.096,124.483,283.988,125.413,283.65,126.263);
      p.bezierVertex(283.312,127.113,282.781,127.807,282.057,128.347);
      p.bezierVertex(281.342,128.886,280.489,129.215,279.498,129.336);
      p.bezierVertex(278.516,129.456,277.609,129.342,276.776,128.992);
      p.bezierVertex(275.953,128.641,275.275,128.094,274.742,127.35);
      p.bezierVertex(274.209,126.607,273.881,125.73,273.758,124.72);
      p.bezierVertex(273.635,123.71,273.742,122.78,274.08,121.93);
      p.bezierVertex(274.419,121.081,274.945,120.386,275.66,119.848);
      p.bezierVertex(276.383,119.308,277.236,118.978,278.219,118.858);
      p.endShape();
      p.vertex(294.89,122.789);
      p.bezierVertex(295.006,123.734,294.901,124.574,294.577,125.309);
      p.bezierVertex(294.263,126.043,293.767,126.64,293.089,127.099);
      p.bezierVertex(292.411,127.548,291.596,127.841,290.644,127.976);
      p.bezierVertex(289.662,128.096,288.754,127.981,287.922,127.631);
      p.bezierVertex(287.098,127.28,286.42,126.733,285.888,125.989);
      p.bezierVertex(285.355,125.246,285.027,124.369,284.904,123.359);
      p.bezierVertex(284.78,122.349,284.888,121.424,285.228,120.584);
      p.bezierVertex(285.566,119.734,286.092,119.039,286.807,118.501);
      p.bezierVertex(287.531,117.961,288.384,117.631,289.366,117.511);
      p.bezierVertex(290.413,117.383,291.336,117.515,292.136,117.906);
      p.bezierVertex(292.936,118.298,293.559,118.814,294.004,119.456);
      p.vertex(292.819,120.263);
      p.bezierVertex(292.497,119.785,292.051,119.403,291.48,119.115);
      p.bezierVertex(290.917,118.817,290.265,118.713,289.524,118.804);
      p.bezierVertex(288.81,118.891,288.196,119.135,287.681,119.536);
      p.bezierVertex(287.174,119.927,286.804,120.438,286.57,121.068);
      p.bezierVertex(286.346,121.697,286.282,122.401,286.377,123.179);
      p.bezierVertex(286.472,123.958,286.704,124.63,287.074,125.196);
      p.bezierVertex(287.452,125.751,287.935,126.162,288.523,126.429);
      p.bezierVertex(289.118,126.686,289.772,126.77,290.486,126.683);
      p.bezierVertex(291.123,126.587,291.678,126.401,292.153,126.127);
      p.bezierVertex(292.635,125.843,292.998,125.464,293.241,124.993);
      p.bezierVertex(293.483,124.512,293.565,123.947,293.486,123.299);
      p.vertex(290.289,123.689);
      p.vertex(290.14,122.466);
      p.vertex(294.796,121.898);
      p.vertex(294.89,122.789);
      p.endShape();
      p.vertex(297.617,125.474);
      p.bezierVertex(297.867,125.443,298.081,125.502,298.259,125.649);
      p.bezierVertex(298.436,125.788,298.539,125.982,298.57,126.232);
      p.bezierVertex(298.602,126.491,298.548,126.71,298.41,126.886);
      p.bezierVertex(298.273,127.072,298.079,127.181,297.829,127.211);
      p.bezierVertex(297.57,127.243,297.347,127.185,297.159,127.039);
      p.bezierVertex(296.983,126.901,296.878,126.702,296.847,126.442);
      p.bezierVertex(296.816,126.192,296.87,125.979,297.008,125.802);
      p.bezierVertex(297.155,125.615,297.358,125.506,297.617,125.474);
      p.endShape();
      
      }
      p.style2=function(){
        p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#f3493e")
      p.beginShape();
      p.vertex(0,-14.5);
      p.vertex(353,-14.5);
      p.vertex(353,367.654);
      p.vertex(71,397);
      p.vertex(71,367.654);
      p.vertex(0,367.654);
      p.vertex(0,-14.5);
      p.endShape();
      p.fill("#f3493e")
      p.beginShape();
      p.vertex(0,397);
      p.vertex(353,397);
      p.vertex(353,426.729);
      p.vertex(100.5,456);
      p.vertex(100.5,426.729);
      p.vertex(0,426.729);
      p.vertex(0,397);
      p.endShape();
      p.fill("#f3493e")
      p.beginShape();
      p.vertex(0,455);
      p.vertex(353,455);
      p.vertex(353,467.976);
      p.vertex(143.5,493);
      p.vertex(143.5,467.976);
      p.vertex(0,467.976);
      p.vertex(0,455);
      p.endShape();
      p.fill("#f3493e")
      p.beginShape();
      p.vertex(0,493);
      p.vertex(353,493);
      p.vertex(353,496.143);
      p.vertex(188,515);
      p.vertex(188,496.143);
      p.vertex(0,496.143);
      p.vertex(0,493);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(242.604,409.51);
      p.vertex(242.604,417.112);
      p.vertex(241.12,417.112);
      p.vertex(241.12,406.78);
      p.vertex(242.73,406.78);
      p.vertex(246.328,413.094);
      p.vertex(249.912,406.78);
      p.vertex(251.536,406.78);
      p.vertex(251.536,417.112);
      p.vertex(250.052,417.112);
      p.vertex(250.052,409.51);
      p.vertex(246.972,414.956);
      p.vertex(245.67,414.956);
      p.vertex(242.604,409.51);
      p.endShape();
      p.vertex(258.168,415.922);
      p.bezierVertex(258.887,415.922,259.521,415.759,260.072,415.432);
      p.bezierVertex(260.632,415.096,261.061,414.629,261.36,414.032);
      p.bezierVertex(261.668,413.425,261.822,412.73,261.822,411.946);
      p.bezierVertex(261.822,411.162,261.668,410.471,261.36,409.874);
      p.bezierVertex(261.061,409.267,260.632,408.801,260.072,408.474);
      p.bezierVertex(259.521,408.138,258.887,407.97,258.168,407.97);
      p.bezierVertex(257.449,407.97,256.815,408.138,256.264,408.474);
      p.bezierVertex(255.713,408.801,255.284,409.267,254.976,409.874);
      p.bezierVertex(254.677,410.471,254.528,411.162,254.528,411.946);
      p.bezierVertex(254.528,412.73,254.677,413.425,254.976,414.032);
      p.bezierVertex(255.284,414.629,255.713,415.096,256.264,415.432);
      p.bezierVertex(256.815,415.759,257.449,415.922,258.168,415.922);
      p.endShape();
      p.vertex(258.168,406.668);
      p.bezierVertex(259.167,406.668,260.053,406.892,260.828,407.34);
      p.bezierVertex(261.612,407.788,262.223,408.413,262.662,409.216);
      p.bezierVertex(263.101,410.019,263.32,410.929,263.32,411.946);
      p.bezierVertex(263.32,412.963,263.101,413.873,262.662,414.676);
      p.bezierVertex(262.223,415.479,261.612,416.104,260.828,416.552);
      p.bezierVertex(260.053,417,259.167,417.224,258.168,417.224);
      p.bezierVertex(257.179,417.224,256.292,417,255.508,416.552);
      p.bezierVertex(254.733,416.104,254.127,415.479,253.688,414.676);
      p.bezierVertex(253.249,413.873,253.03,412.963,253.03,411.946);
      p.bezierVertex(253.03,410.929,253.249,410.019,253.688,409.216);
      p.bezierVertex(254.127,408.413,254.733,407.788,255.508,407.34);
      p.bezierVertex(256.292,406.892,257.179,406.668,258.168,406.668);
      p.endShape();
      p.vertex(268.979,417.112);
      p.vertex(267.243,417.112);
      p.vertex(263.421,406.78);
      p.vertex(265.003,406.78);
      p.vertex(268.097,415.11);
      p.vertex(270.995,406.78);
      p.vertex(272.577,406.78);
      p.vertex(268.979,417.112);
      p.endShape();
      p.vertex(275.374,406.78);
      p.vertex(275.374,417.112);
      p.vertex(273.89,417.112);
      p.vertex(273.89,406.78);
      p.vertex(275.374,406.78);
      p.endShape();
      p.vertex(283.726,408.082);
      p.vertex(278.532,408.082);
      p.vertex(278.532,411.148);
      p.vertex(282.998,411.148);
      p.vertex(282.998,412.436);
      p.vertex(278.532,412.436);
      p.vertex(278.532,415.81);
      p.vertex(283.726,415.81);
      p.vertex(283.726,417.112);
      p.vertex(277.048,417.112);
      p.vertex(277.048,406.78);
      p.vertex(283.726,406.78);
      p.vertex(283.726,408.082);
      p.endShape();
      p.vertex(289.549,415.81);
      p.vertex(294.225,415.81);
      p.vertex(294.225,417.112);
      p.vertex(288.065,417.112);
      p.vertex(288.065,406.78);
      p.vertex(289.549,406.78);
      p.vertex(289.549,415.81);
      p.endShape();
      p.vertex(299.699,415.922);
      p.bezierVertex(300.418,415.922,301.052,415.759,301.603,415.432);
      p.bezierVertex(302.163,415.096,302.592,414.629,302.891,414.032);
      p.bezierVertex(303.199,413.425,303.353,412.73,303.353,411.946);
      p.bezierVertex(303.353,411.162,303.199,410.471,302.891,409.874);
      p.bezierVertex(302.592,409.267,302.163,408.801,301.603,408.474);
      p.bezierVertex(301.052,408.138,300.418,407.97,299.699,407.97);
      p.bezierVertex(298.98,407.97,298.346,408.138,297.795,408.474);
      p.bezierVertex(297.244,408.801,296.815,409.267,296.507,409.874);
      p.bezierVertex(296.208,410.471,296.059,411.162,296.059,411.946);
      p.bezierVertex(296.059,412.73,296.208,413.425,296.507,414.032);
      p.bezierVertex(296.815,414.629,297.244,415.096,297.795,415.432);
      p.bezierVertex(298.346,415.759,298.98,415.922,299.699,415.922);
      p.endShape();
      p.vertex(299.699,406.668);
      p.bezierVertex(300.698,406.668,301.584,406.892,302.359,407.34);
      p.bezierVertex(303.143,407.788,303.754,408.413,304.193,409.216);
      p.bezierVertex(304.632,410.019,304.851,410.929,304.851,411.946);
      p.bezierVertex(304.851,412.963,304.632,413.873,304.193,414.676);
      p.bezierVertex(303.754,415.479,303.143,416.104,302.359,416.552);
      p.bezierVertex(301.584,417,300.698,417.224,299.699,417.224);
      p.bezierVertex(298.71,417.224,297.823,417,297.039,416.552);
      p.bezierVertex(296.264,416.104,295.658,415.479,295.219,414.676);
      p.bezierVertex(294.78,413.873,294.561,412.963,294.561,411.946);
      p.bezierVertex(294.561,410.929,294.78,410.019,295.219,409.216);
      p.bezierVertex(295.658,408.413,296.264,407.788,297.039,407.34);
      p.bezierVertex(297.823,406.892,298.71,406.668,299.699,406.668);
      p.endShape();
      p.vertex(315.771,412.59);
      p.bezierVertex(315.771,413.542,315.566,414.363,315.155,415.054);
      p.bezierVertex(314.754,415.745,314.189,416.277,313.461,416.65);
      p.bezierVertex(312.733,417.014,311.889,417.205,310.927,417.224);
      p.bezierVertex(309.938,417.224,309.051,417,308.267,416.552);
      p.bezierVertex(307.493,416.104,306.886,415.479,306.447,414.676);
      p.bezierVertex(306.009,413.873,305.789,412.963,305.789,411.946);
      p.bezierVertex(305.789,410.929,306.009,410.023,306.447,409.23);
      p.bezierVertex(306.886,408.427,307.493,407.802,308.267,407.354);
      p.bezierVertex(309.051,406.906,309.938,406.682,310.927,406.682);
      p.bezierVertex(311.982,406.682,312.883,406.925,313.629,407.41);
      p.bezierVertex(314.376,407.895,314.931,408.483,315.295,409.174);
      p.vertex(314.021,409.832);
      p.bezierVertex(313.76,409.319,313.363,408.885,312.831,408.53);
      p.bezierVertex(312.309,408.166,311.674,407.984,310.927,407.984);
      p.bezierVertex(310.209,407.984,309.569,408.152,309.009,408.488);
      p.bezierVertex(308.459,408.815,308.029,409.277,307.721,409.874);
      p.bezierVertex(307.423,410.471,307.273,411.162,307.273,411.946);
      p.bezierVertex(307.273,412.73,307.423,413.425,307.721,414.032);
      p.bezierVertex(308.029,414.629,308.459,415.096,309.009,415.432);
      p.bezierVertex(309.569,415.759,310.209,415.922,310.927,415.922);
      p.bezierVertex(311.571,415.903,312.145,415.787,312.649,415.572);
      p.bezierVertex(313.163,415.348,313.569,415.017,313.867,414.578);
      p.bezierVertex(314.166,414.13,314.315,413.579,314.315,412.926);
      p.vertex(311.095,412.926);
      p.vertex(311.095,411.694);
      p.vertex(315.785,411.694);
      p.vertex(315.771,412.59);
      p.endShape();
      p.vertex(318.153,415.586);
      p.bezierVertex(318.405,415.586,318.61,415.67,318.769,415.838);
      p.bezierVertex(318.927,415.997,319.007,416.202,319.007,416.454);
      p.bezierVertex(319.007,416.715,318.927,416.925,318.769,417.084);
      p.bezierVertex(318.61,417.252,318.405,417.336,318.153,417.336);
      p.bezierVertex(317.891,417.336,317.677,417.252,317.509,417.084);
      p.bezierVertex(317.35,416.925,317.271,416.715,317.271,416.454);
      p.bezierVertex(317.271,416.202,317.35,415.997,317.509,415.838);
      p.bezierVertex(317.677,415.67,317.891,415.586,318.153,415.586);
      p.endShape();
      
      }
      p.style3=function(){
        p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#e5e6e7")
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(246.604,52.51);
      p.vertex(246.604,60.112);
      p.vertex(245.12,60.112);
      p.vertex(245.12,49.78);
      p.vertex(246.73,49.78);
      p.vertex(250.328,56.094);
      p.vertex(253.912,49.78);
      p.vertex(255.536,49.78);
      p.vertex(255.536,60.112);
      p.vertex(254.052,60.112);
      p.vertex(254.052,52.51);
      p.vertex(250.972,57.956);
      p.vertex(249.67,57.956);
      p.vertex(246.604,52.51);
      p.endShape();
      p.vertex(262.168,58.922);
      p.bezierVertex(262.887,58.922,263.521,58.7587,264.072,58.432);
      p.bezierVertex(264.632,58.096,265.061,57.6293,265.36,57.032);
      p.bezierVertex(265.668,56.4253,265.822,55.73,265.822,54.946);
      p.bezierVertex(265.822,54.162,265.668,53.4713,265.36,52.874);
      p.bezierVertex(265.061,52.2673,264.632,51.8007,264.072,51.474);
      p.bezierVertex(263.521,51.138,262.887,50.97,262.168,50.97);
      p.bezierVertex(261.449,50.97,260.815,51.138,260.264,51.474);
      p.bezierVertex(259.713,51.8007,259.284,52.2673,258.976,52.874);
      p.bezierVertex(258.677,53.4713,258.528,54.162,258.528,54.946);
      p.bezierVertex(258.528,55.73,258.677,56.4253,258.976,57.032);
      p.bezierVertex(259.284,57.6293,259.713,58.096,260.264,58.432);
      p.bezierVertex(260.815,58.7587,261.449,58.922,262.168,58.922);
      p.endShape();
      p.vertex(262.168,49.668);
      p.bezierVertex(263.167,49.668,264.053,49.892,264.828,50.34);
      p.bezierVertex(265.612,50.788,266.223,51.4133,266.662,52.216);
      p.bezierVertex(267.101,53.0187,267.32,53.9287,267.32,54.946);
      p.bezierVertex(267.32,55.9633,267.101,56.8733,266.662,57.676);
      p.bezierVertex(266.223,58.4787,265.612,59.104,264.828,59.552);
      p.bezierVertex(264.053,60,263.167,60.224,262.168,60.224);
      p.bezierVertex(261.179,60.224,260.292,60,259.508,59.552);
      p.bezierVertex(258.733,59.104,258.127,58.4787,257.688,57.676);
      p.bezierVertex(257.249,56.8733,257.03,55.9633,257.03,54.946);
      p.bezierVertex(257.03,53.9287,257.249,53.0187,257.688,52.216);
      p.bezierVertex(258.127,51.4133,258.733,50.788,259.508,50.34);
      p.bezierVertex(260.292,49.892,261.179,49.668,262.168,49.668);
      p.endShape();
      p.vertex(272.979,60.112);
      p.vertex(271.243,60.112);
      p.vertex(267.421,49.78);
      p.vertex(269.003,49.78);
      p.vertex(272.097,58.11);
      p.vertex(274.995,49.78);
      p.vertex(276.577,49.78);
      p.vertex(272.979,60.112);
      p.endShape();
      p.vertex(279.374,49.78);
      p.vertex(279.374,60.112);
      p.vertex(277.89,60.112);
      p.vertex(277.89,49.78);
      p.vertex(279.374,49.78);
      p.endShape();
      p.vertex(287.726,51.082);
      p.vertex(282.532,51.082);
      p.vertex(282.532,54.148);
      p.vertex(286.998,54.148);
      p.vertex(286.998,55.436);
      p.vertex(282.532,55.436);
      p.vertex(282.532,58.81);
      p.vertex(287.726,58.81);
      p.vertex(287.726,60.112);
      p.vertex(281.048,60.112);
      p.vertex(281.048,49.78);
      p.vertex(287.726,49.78);
      p.vertex(287.726,51.082);
      p.endShape();
      p.vertex(293.549,58.81);
      p.vertex(298.225,58.81);
      p.vertex(298.225,60.112);
      p.vertex(292.065,60.112);
      p.vertex(292.065,49.78);
      p.vertex(293.549,49.78);
      p.vertex(293.549,58.81);
      p.endShape();
      p.vertex(303.699,58.922);
      p.bezierVertex(304.418,58.922,305.052,58.7587,305.603,58.432);
      p.bezierVertex(306.163,58.096,306.592,57.6293,306.891,57.032);
      p.bezierVertex(307.199,56.4253,307.353,55.73,307.353,54.946);
      p.bezierVertex(307.353,54.162,307.199,53.4713,306.891,52.874);
      p.bezierVertex(306.592,52.2673,306.163,51.8007,305.603,51.474);
      p.bezierVertex(305.052,51.138,304.418,50.97,303.699,50.97);
      p.bezierVertex(302.98,50.97,302.346,51.138,301.795,51.474);
      p.bezierVertex(301.244,51.8007,300.815,52.2673,300.507,52.874);
      p.bezierVertex(300.208,53.4713,300.059,54.162,300.059,54.946);
      p.bezierVertex(300.059,55.73,300.208,56.4253,300.507,57.032);
      p.bezierVertex(300.815,57.6293,301.244,58.096,301.795,58.432);
      p.bezierVertex(302.346,58.7587,302.98,58.922,303.699,58.922);
      p.endShape();
      p.vertex(303.699,49.668);
      p.bezierVertex(304.698,49.668,305.584,49.892,306.359,50.34);
      p.bezierVertex(307.143,50.788,307.754,51.4133,308.193,52.216);
      p.bezierVertex(308.632,53.0187,308.851,53.9287,308.851,54.946);
      p.bezierVertex(308.851,55.9633,308.632,56.8733,308.193,57.676);
      p.bezierVertex(307.754,58.4787,307.143,59.104,306.359,59.552);
      p.bezierVertex(305.584,60,304.698,60.224,303.699,60.224);
      p.bezierVertex(302.71,60.224,301.823,60,301.039,59.552);
      p.bezierVertex(300.264,59.104,299.658,58.4787,299.219,57.676);
      p.bezierVertex(298.78,56.8733,298.561,55.9633,298.561,54.946);
      p.bezierVertex(298.561,53.9287,298.78,53.0187,299.219,52.216);
      p.bezierVertex(299.658,51.4133,300.264,50.788,301.039,50.34);
      p.bezierVertex(301.823,49.892,302.71,49.668,303.699,49.668);
      p.endShape();
      p.vertex(319.771,55.59);
      p.bezierVertex(319.771,56.542,319.566,57.3633,319.155,58.054);
      p.bezierVertex(318.754,58.7447,318.189,59.2767,317.461,59.65);
      p.bezierVertex(316.733,60.014,315.889,60.2053,314.927,60.224);
      p.bezierVertex(313.938,60.224,313.051,60,312.267,59.552);
      p.bezierVertex(311.493,59.104,310.886,58.4787,310.447,57.676);
      p.bezierVertex(310.009,56.8733,309.789,55.9633,309.789,54.946);
      p.bezierVertex(309.789,53.9287,310.009,53.0233,310.447,52.23);
      p.bezierVertex(310.886,51.4273,311.493,50.802,312.267,50.354);
      p.bezierVertex(313.051,49.906,313.938,49.682,314.927,49.682);
      p.bezierVertex(315.982,49.682,316.883,49.9247,317.629,50.41);
      p.bezierVertex(318.376,50.8953,318.931,51.4833,319.295,52.174);
      p.vertex(318.021,52.832);
      p.bezierVertex(317.76,52.3187,317.363,51.8847,316.831,51.53);
      p.bezierVertex(316.309,51.166,315.674,50.984,314.927,50.984);
      p.bezierVertex(314.209,50.984,313.569,51.152,313.009,51.488);
      p.bezierVertex(312.459,51.8147,312.029,52.2767,311.721,52.874);
      p.bezierVertex(311.423,53.4713,311.273,54.162,311.273,54.946);
      p.bezierVertex(311.273,55.73,311.423,56.4253,311.721,57.032);
      p.bezierVertex(312.029,57.6293,312.459,58.096,313.009,58.432);
      p.bezierVertex(313.569,58.7587,314.209,58.922,314.927,58.922);
      p.bezierVertex(315.571,58.9033,316.145,58.7867,316.649,58.572);
      p.bezierVertex(317.163,58.348,317.569,58.0167,317.867,57.578);
      p.bezierVertex(318.166,57.13,318.315,56.5793,318.315,55.926);
      p.vertex(315.095,55.926);
      p.vertex(315.095,54.694);
      p.vertex(319.785,54.694);
      p.vertex(319.771,55.59);
      p.endShape();
      p.vertex(322.153,58.586);
      p.bezierVertex(322.405,58.586,322.61,58.67,322.769,58.838);
      p.bezierVertex(322.927,58.9967,323.007,59.202,323.007,59.454);
      p.bezierVertex(323.007,59.7153,322.927,59.9253,322.769,60.084);
      p.bezierVertex(322.61,60.252,322.405,60.336,322.153,60.336);
      p.bezierVertex(321.891,60.336,321.677,60.252,321.509,60.084);
      p.bezierVertex(321.35,59.9253,321.271,59.7153,321.271,59.454);
      p.bezierVertex(321.271,59.202,321.35,58.9967,321.509,58.838);
      p.bezierVertex(321.677,58.67,321.891,58.586,322.153,58.586);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(113.256,1.21229);
      p.bezierVertex(155.256,6.4124,170.423,42.0456,172.756,59.2123);
      p.vertex(124.756,59.2123);
      p.vertex(124.756,39.7123);
      p.vertex(23.2563,39.7123);
      p.bezierVertex(33.7563,23.7123,51.7563,-6.40215,113.256,1.21229);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(240.256,1.21229);
      p.bezierVertex(198.256,6.4124,183.09,42.0456,180.756,59.2123);
      p.vertex(228.756,59.2123);
      p.vertex(228.756,39.7123);
      p.vertex(330.256,39.7123);
      p.bezierVertex(319.756,23.7123,301.756,-6.40215,240.256,1.21229);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(29.7564,220.734);
      p.vertex(29.7564,252.234);
      p.bezierVertex(3.7564,221.834,13.6123,213.734,22.2564,214.234);
      p.bezierVertex(23.61,214.312,27.6122,215.234,29.7564,220.734);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(29.7564,294.734);
      p.vertex(29.7564,263.234);
      p.bezierVertex(3.7564,293.634,13.6123,301.734,22.2564,301.234);
      p.bezierVertex(23.61,301.156,27.6122,300.234,29.7564,294.734);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(124.756,214.212);
      p.quadraticVertex(132.756,214.212,132.756,222.212);
      p.vertex(132.756,293.212);
      p.quadraticVertex(132.756,301.212,124.756,301.212);
      p.vertex(124.756,301.212);
      p.quadraticVertex(116.756,301.212,116.756,293.212);
      p.vertex(116.756,222.212);
      p.quadraticVertex(116.756,214.212,124.756,214.212);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(228.756,214.212);
      p.quadraticVertex(236.756,214.212,236.756,222.212);
      p.vertex(236.756,293.212);
      p.quadraticVertex(236.756,301.212,228.756,301.212);
      p.vertex(228.756,301.212);
      p.quadraticVertex(220.756,301.212,220.756,293.212);
      p.vertex(220.756,222.212);
      p.quadraticVertex(220.756,214.212,228.756,214.212);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(323.756,220.734);
      p.vertex(323.756,252.234);
      p.bezierVertex(349.756,221.834,339.9,213.734,331.256,214.234);
      p.bezierVertex(329.903,214.312,325.9,215.234,323.756,220.734);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(323.756,294.734);
      p.vertex(323.756,263.234);
      p.bezierVertex(349.756,293.634,339.9,301.734,331.256,301.234);
      p.bezierVertex(329.903,301.156,325.9,300.234,323.756,294.734);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(113.256,514.255);
      p.bezierVertex(155.256,509.055,170.423,473.422,172.756,456.255);
      p.vertex(124.756,456.255);
      p.vertex(124.756,475.755);
      p.vertex(23.2563,475.755);
      p.bezierVertex(33.7563,491.755,51.7563,521.87,113.256,514.255);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(240.256,514.255);
      p.bezierVertex(198.256,509.055,183.09,473.422,180.756,456.255);
      p.vertex(228.756,456.255);
      p.vertex(228.756,475.755);
      p.vertex(330.256,475.755);
      p.bezierVertex(319.756,491.755,301.756,521.87,240.256,514.255);
      p.endShape();
      
      }
      p.style4=function(){
        p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.fill("#000000")
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(0,65);
      p.vertex(224,65);
      p.vertex(224,396);
      p.vertex(0,396);
      p.vertex(0,65);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(53,34);
      p.vertex(207,34);
      p.vertex(207,359);
      p.vertex(53,359);
      p.vertex(53,34);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(155,86);
      p.vertex(309,86);
      p.vertex(309,440);
      p.vertex(155,440);
      p.vertex(155,86);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(18,86);
      p.vertex(353,86);
      p.vertex(353,416);
      p.vertex(18,416);
      p.vertex(18,86);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(51,185);
      p.vertex(207,185);
      p.vertex(207,515);
      p.vertex(51,515);
      p.vertex(51,185);
      p.endShape();
      p.fill("#000000")
      p.beginShape();
      p.vertex(60.604,485.51);
      p.vertex(60.604,493.112);
      p.vertex(59.12,493.112);
      p.vertex(59.12,482.78);
      p.vertex(60.73,482.78);
      p.vertex(64.328,489.094);
      p.vertex(67.912,482.78);
      p.vertex(69.536,482.78);
      p.vertex(69.536,493.112);
      p.vertex(68.052,493.112);
      p.vertex(68.052,485.51);
      p.vertex(64.972,490.956);
      p.vertex(63.67,490.956);
      p.vertex(60.604,485.51);
      p.endShape();
      p.vertex(76.1681,491.922);
      p.bezierVertex(76.8867,491.922,77.5214,491.759,78.0721,491.432);
      p.bezierVertex(78.6321,491.096,79.0614,490.629,79.3601,490.032);
      p.bezierVertex(79.6681,489.425,79.8221,488.73,79.8221,487.946);
      p.bezierVertex(79.8221,487.162,79.6681,486.471,79.3601,485.874);
      p.bezierVertex(79.0614,485.267,78.6321,484.801,78.0721,484.474);
      p.bezierVertex(77.5214,484.138,76.8867,483.97,76.1681,483.97);
      p.bezierVertex(75.4494,483.97,74.8147,484.138,74.2641,484.474);
      p.bezierVertex(73.7134,484.801,73.2841,485.267,72.9761,485.874);
      p.bezierVertex(72.6774,486.471,72.5281,487.162,72.5281,487.946);
      p.bezierVertex(72.5281,488.73,72.6774,489.425,72.9761,490.032);
      p.bezierVertex(73.2841,490.629,73.7134,491.096,74.2641,491.432);
      p.bezierVertex(74.8147,491.759,75.4494,491.922,76.1681,491.922);
      p.endShape();
      p.vertex(76.1681,482.668);
      p.bezierVertex(77.1667,482.668,78.0534,482.892,78.8281,483.34);
      p.bezierVertex(79.6121,483.788,80.2234,484.413,80.6621,485.216);
      p.bezierVertex(81.1007,486.019,81.3201,486.929,81.3201,487.946);
      p.bezierVertex(81.3201,488.963,81.1007,489.873,80.6621,490.676);
      p.bezierVertex(80.2234,491.479,79.6121,492.104,78.8281,492.552);
      p.bezierVertex(78.0534,493,77.1667,493.224,76.1681,493.224);
      p.bezierVertex(75.1787,493.224,74.2921,493,73.5081,492.552);
      p.bezierVertex(72.7334,492.104,72.1267,491.479,71.6881,490.676);
      p.bezierVertex(71.2494,489.873,71.0301,488.963,71.0301,487.946);
      p.bezierVertex(71.0301,486.929,71.2494,486.019,71.6881,485.216);
      p.bezierVertex(72.1267,484.413,72.7334,483.788,73.5081,483.34);
      p.bezierVertex(74.2921,482.892,75.1787,482.668,76.1681,482.668);
      p.endShape();
      p.vertex(86.9789,493.112);
      p.vertex(85.2429,493.112);
      p.vertex(81.4209,482.78);
      p.vertex(83.0029,482.78);
      p.vertex(86.0969,491.11);
      p.vertex(88.9949,482.78);
      p.vertex(90.5769,482.78);
      p.vertex(86.9789,493.112);
      p.endShape();
      p.vertex(93.3736,482.78);
      p.vertex(93.3736,493.112);
      p.vertex(91.8896,493.112);
      p.vertex(91.8896,482.78);
      p.vertex(93.3736,482.78);
      p.endShape();
      p.vertex(101.726,484.082);
      p.vertex(96.5317,484.082);
      p.vertex(96.5317,487.148);
      p.vertex(100.998,487.148);
      p.vertex(100.998,488.436);
      p.vertex(96.5317,488.436);
      p.vertex(96.5317,491.81);
      p.vertex(101.726,491.81);
      p.vertex(101.726,493.112);
      p.vertex(95.0477,493.112);
      p.vertex(95.0477,482.78);
      p.vertex(101.726,482.78);
      p.vertex(101.726,484.082);
      p.endShape();
      p.vertex(107.549,491.81);
      p.vertex(112.225,491.81);
      p.vertex(112.225,493.112);
      p.vertex(106.065,493.112);
      p.vertex(106.065,482.78);
      p.vertex(107.549,482.78);
      p.vertex(107.549,491.81);
      p.endShape();
      p.vertex(117.699,491.922);
      p.bezierVertex(118.418,491.922,119.052,491.759,119.603,491.432);
      p.bezierVertex(120.163,491.096,120.592,490.629,120.891,490.032);
      p.bezierVertex(121.199,489.425,121.353,488.73,121.353,487.946);
      p.bezierVertex(121.353,487.162,121.199,486.471,120.891,485.874);
      p.bezierVertex(120.592,485.267,120.163,484.801,119.603,484.474);
      p.bezierVertex(119.052,484.138,118.418,483.97,117.699,483.97);
      p.bezierVertex(116.98,483.97,116.346,484.138,115.795,484.474);
      p.bezierVertex(115.244,484.801,114.815,485.267,114.507,485.874);
      p.bezierVertex(114.208,486.471,114.059,487.162,114.059,487.946);
      p.bezierVertex(114.059,488.73,114.208,489.425,114.507,490.032);
      p.bezierVertex(114.815,490.629,115.244,491.096,115.795,491.432);
      p.bezierVertex(116.346,491.759,116.98,491.922,117.699,491.922);
      p.endShape();
      p.vertex(117.699,482.668);
      p.bezierVertex(118.698,482.668,119.584,482.892,120.359,483.34);
      p.bezierVertex(121.143,483.788,121.754,484.413,122.193,485.216);
      p.bezierVertex(122.632,486.019,122.851,486.929,122.851,487.946);
      p.bezierVertex(122.851,488.963,122.632,489.873,122.193,490.676);
      p.bezierVertex(121.754,491.479,121.143,492.104,120.359,492.552);
      p.bezierVertex(119.584,493,118.698,493.224,117.699,493.224);
      p.bezierVertex(116.71,493.224,115.823,493,115.039,492.552);
      p.bezierVertex(114.264,492.104,113.658,491.479,113.219,490.676);
      p.bezierVertex(112.78,489.873,112.561,488.963,112.561,487.946);
      p.bezierVertex(112.561,486.929,112.78,486.019,113.219,485.216);
      p.bezierVertex(113.658,484.413,114.264,483.788,115.039,483.34);
      p.bezierVertex(115.823,482.892,116.71,482.668,117.699,482.668);
      p.endShape();
      p.vertex(133.771,488.59);
      p.bezierVertex(133.771,489.542,133.566,490.363,133.155,491.054);
      p.bezierVertex(132.754,491.745,132.189,492.277,131.461,492.65);
      p.bezierVertex(130.733,493.014,129.889,493.205,128.927,493.224);
      p.bezierVertex(127.938,493.224,127.051,493,126.267,492.552);
      p.bezierVertex(125.493,492.104,124.886,491.479,124.447,490.676);
      p.bezierVertex(124.009,489.873,123.789,488.963,123.789,487.946);
      p.bezierVertex(123.789,486.929,124.009,486.023,124.447,485.23);
      p.bezierVertex(124.886,484.427,125.493,483.802,126.267,483.354);
      p.bezierVertex(127.051,482.906,127.938,482.682,128.927,482.682);
      p.bezierVertex(129.982,482.682,130.883,482.925,131.629,483.41);
      p.bezierVertex(132.376,483.895,132.931,484.483,133.295,485.174);
      p.vertex(132.021,485.832);
      p.bezierVertex(131.76,485.319,131.363,484.885,130.831,484.53);
      p.bezierVertex(130.309,484.166,129.674,483.984,128.927,483.984);
      p.bezierVertex(128.209,483.984,127.569,484.152,127.009,484.488);
      p.bezierVertex(126.459,484.815,126.029,485.277,125.721,485.874);
      p.bezierVertex(125.423,486.471,125.273,487.162,125.273,487.946);
      p.bezierVertex(125.273,488.73,125.423,489.425,125.721,490.032);
      p.bezierVertex(126.029,490.629,126.459,491.096,127.009,491.432);
      p.bezierVertex(127.569,491.759,128.209,491.922,128.927,491.922);
      p.bezierVertex(129.571,491.903,130.145,491.787,130.649,491.572);
      p.bezierVertex(131.163,491.348,131.569,491.017,131.867,490.578);
      p.bezierVertex(132.166,490.13,132.315,489.579,132.315,488.926);
      p.vertex(129.095,488.926);
      p.vertex(129.095,487.694);
      p.vertex(133.785,487.694);
      p.vertex(133.771,488.59);
      p.endShape();
      p.vertex(136.153,491.586);
      p.bezierVertex(136.405,491.586,136.61,491.67,136.769,491.838);
      p.bezierVertex(136.927,491.997,137.007,492.202,137.007,492.454);
      p.bezierVertex(137.007,492.715,136.927,492.925,136.769,493.084);
      p.bezierVertex(136.61,493.252,136.405,493.336,136.153,493.336);
      p.bezierVertex(135.891,493.336,135.677,493.252,135.509,493.084);
      p.bezierVertex(135.35,492.925,135.271,492.715,135.271,492.454);
      p.bezierVertex(135.271,492.202,135.35,491.997,135.509,491.838);
      p.bezierVertex(135.677,491.67,135.891,491.586,136.153,491.586);
      p.endShape();
      
      }
      p.style5=function(){
        p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#f3493e")
      p.translate(-1,0,0,1,353,0);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(353,28);
      p.bezierVertex(353,12.536,340.464,0,325,0);
      p.vertex(325,377);
      p.bezierVertex(340.464,377,353,364.464,353,349);
      p.vertex(353,28);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(325,67);
      p.bezierVertex(325,29.9969,295.003,0,258,0);
      p.vertex(258,377);
      p.bezierVertex(295.003,377,325,347.003,325,310);
      p.vertex(325,67);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(353,377);
      p.vertex(325,377);
      p.vertex(325,421);
      p.bezierVertex(340.464,421,353,408.464,353,393);
      p.vertex(353,377);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(353,421);
      p.vertex(325,421);
      p.vertex(325,515);
      p.bezierVertex(340.464,515,353,502.464,353,487);
      p.vertex(353,421);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(325,377);
      p.vertex(258,377);
      p.vertex(258,421);
      p.vertex(281,421);
      p.bezierVertex(305.301,421,325,401.301,325,377);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(325,421);
      p.vertex(258,421);
      p.vertex(258,515);
      p.bezierVertex(295.003,515,325,485.003,325,448);
      p.vertex(325,421);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(258,421);
      p.vertex(0,421);
      p.vertex(0,515);
      p.vertex(164,515);
      p.bezierVertex(215.915,515,258,472.915,258,421);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(258,377);
      p.vertex(0,377);
      p.vertex(0,421);
      p.vertex(214,421);
      p.bezierVertex(238.301,421,258,401.301,258,377);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(258,129);
      p.bezierVertex(258,57.7553,200.245,0,129,0);
      p.bezierVertex(57.7553,0,0,57.7553,0,129);
      p.vertex(0,248);
      p.bezierVertex(0,319.245,57.7553,377,129,377);
      p.bezierVertex(200.245,377,258,319.245,258,248);
      p.vertex(258,129);
      p.endShape();
      p.fill("#f3493e")
      p.beginShape();
      p.vertex(315.51,153.396);
      p.vertex(323.112,153.396);
      p.vertex(323.112,154.88);
      p.vertex(312.78,154.88);
      p.vertex(312.78,153.27);
      p.vertex(319.094,149.672);
      p.vertex(312.78,146.088);
      p.vertex(312.78,144.464);
      p.vertex(323.112,144.464);
      p.vertex(323.112,145.948);
      p.vertex(315.51,145.948);
      p.vertex(320.956,149.028);
      p.vertex(320.956,150.33);
      p.vertex(315.51,153.396);
      p.endShape();
      p.vertex(321.922,137.832);
      p.bezierVertex(321.922,137.113,321.759,136.479,321.432,135.928);
      p.bezierVertex(321.096,135.368,320.629,134.939,320.032,134.64);
      p.bezierVertex(319.425,134.332,318.73,134.178,317.946,134.178);
      p.bezierVertex(317.162,134.178,316.471,134.332,315.874,134.64);
      p.bezierVertex(315.267,134.939,314.801,135.368,314.474,135.928);
      p.bezierVertex(314.138,136.479,313.97,137.113,313.97,137.832);
      p.bezierVertex(313.97,138.551,314.138,139.185,314.474,139.736);
      p.bezierVertex(314.801,140.287,315.267,140.716,315.874,141.024);
      p.bezierVertex(316.471,141.323,317.162,141.472,317.946,141.472);
      p.bezierVertex(318.73,141.472,319.425,141.323,320.032,141.024);
      p.bezierVertex(320.629,140.716,321.096,140.287,321.432,139.736);
      p.bezierVertex(321.759,139.185,321.922,138.551,321.922,137.832);
      p.endShape();
      p.vertex(312.668,137.832);
      p.bezierVertex(312.668,136.833,312.892,135.947,313.34,135.172);
      p.bezierVertex(313.788,134.388,314.413,133.777,315.216,133.338);
      p.bezierVertex(316.019,132.899,316.929,132.68,317.946,132.68);
      p.bezierVertex(318.963,132.68,319.873,132.899,320.676,133.338);
      p.bezierVertex(321.479,133.777,322.104,134.388,322.552,135.172);
      p.bezierVertex(323,135.947,323.224,136.833,323.224,137.832);
      p.bezierVertex(323.224,138.821,323,139.708,322.552,140.492);
      p.bezierVertex(322.104,141.267,321.479,141.873,320.676,142.312);
      p.bezierVertex(319.873,142.751,318.963,142.97,317.946,142.97);
      p.bezierVertex(316.929,142.97,316.019,142.751,315.216,142.312);
      p.bezierVertex(314.413,141.873,313.788,141.267,313.34,140.492);
      p.bezierVertex(312.892,139.708,312.668,138.821,312.668,137.832);
      p.endShape();
      p.vertex(323.112,127.021);
      p.vertex(323.112,128.757);
      p.vertex(312.78,132.579);
      p.vertex(312.78,130.997);
      p.vertex(321.11,127.903);
      p.vertex(312.78,125.005);
      p.vertex(312.78,123.423);
      p.vertex(323.112,127.021);
      p.endShape();
      p.vertex(312.78,120.626);
      p.vertex(323.112,120.626);
      p.vertex(323.112,122.11);
      p.vertex(312.78,122.11);
      p.vertex(312.78,120.626);
      p.endShape();
      p.vertex(314.082,112.274);
      p.vertex(314.082,117.468);
      p.vertex(317.148,117.468);
      p.vertex(317.148,113.002);
      p.vertex(318.436,113.002);
      p.vertex(318.436,117.468);
      p.vertex(321.81,117.468);
      p.vertex(321.81,112.274);
      p.vertex(323.112,112.274);
      p.vertex(323.112,118.952);
      p.vertex(312.78,118.952);
      p.vertex(312.78,112.274);
      p.vertex(314.082,112.274);
      p.endShape();
      p.vertex(321.81,106.451);
      p.vertex(321.81,101.775);
      p.vertex(323.112,101.775);
      p.vertex(323.112,107.935);
      p.vertex(312.78,107.935);
      p.vertex(312.78,106.451);
      p.vertex(321.81,106.451);
      p.endShape();
      p.vertex(321.922,96.3012);
      p.bezierVertex(321.922,95.5825,321.759,94.9478,321.432,94.3972);
      p.bezierVertex(321.096,93.8372,320.629,93.4078,320.032,93.1092);
      p.bezierVertex(319.425,92.8012,318.73,92.6472,317.946,92.6472);
      p.bezierVertex(317.162,92.6472,316.471,92.8012,315.874,93.1092);
      p.bezierVertex(315.267,93.4078,314.801,93.8372,314.474,94.3972);
      p.bezierVertex(314.138,94.9478,313.97,95.5825,313.97,96.3012);
      p.bezierVertex(313.97,97.0198,314.138,97.6545,314.474,98.2052);
      p.bezierVertex(314.801,98.7558,315.267,99.1852,315.874,99.4932);
      p.bezierVertex(316.471,99.7918,317.162,99.9412,317.946,99.9412);
      p.bezierVertex(318.73,99.9412,319.425,99.7918,320.032,99.4932);
      p.bezierVertex(320.629,99.1852,321.096,98.7558,321.432,98.2052);
      p.bezierVertex(321.759,97.6545,321.922,97.0198,321.922,96.3012);
      p.endShape();
      p.vertex(312.668,96.3012);
      p.bezierVertex(312.668,95.3025,312.892,94.4158,313.34,93.6412);
      p.bezierVertex(313.788,92.8572,314.413,92.2458,315.216,91.8072);
      p.bezierVertex(316.019,91.3685,316.929,91.1492,317.946,91.1492);
      p.bezierVertex(318.963,91.1492,319.873,91.3685,320.676,91.8072);
      p.bezierVertex(321.479,92.2458,322.104,92.8572,322.552,93.6412);
      p.bezierVertex(323,94.4158,323.224,95.3025,323.224,96.3012);
      p.bezierVertex(323.224,97.2905,323,98.1772,322.552,98.9612);
      p.bezierVertex(322.104,99.7358,321.479,100.342,320.676,100.781);
      p.bezierVertex(319.873,101.22,318.963,101.439,317.946,101.439);
      p.bezierVertex(316.929,101.439,316.019,101.22,315.216,100.781);
      p.bezierVertex(314.413,100.342,313.788,99.7358,313.34,98.9612);
      p.bezierVertex(312.892,98.1772,312.668,97.2905,312.668,96.3012);
      p.endShape();
      p.vertex(318.59,80.2287);
      p.bezierVertex(319.542,80.2287,320.363,80.4341,321.054,80.8447);
      p.bezierVertex(321.745,81.2461,322.277,81.8107,322.65,82.5387);
      p.bezierVertex(323.014,83.2667,323.205,84.1114,323.224,85.0727);
      p.bezierVertex(323.224,86.0621,323,86.9487,322.552,87.7327);
      p.bezierVertex(322.104,88.5074,321.479,89.1141,320.676,89.5527);
      p.bezierVertex(319.873,89.9914,318.963,90.2107,317.946,90.2107);
      p.bezierVertex(316.929,90.2107,316.023,89.9914,315.23,89.5527);
      p.bezierVertex(314.427,89.1141,313.802,88.5074,313.354,87.7327);
      p.bezierVertex(312.906,86.9487,312.682,86.0621,312.682,85.0727);
      p.bezierVertex(312.682,84.0181,312.925,83.1174,313.41,82.3707);
      p.bezierVertex(313.895,81.6241,314.483,81.0687,315.174,80.7047);
      p.vertex(315.832,81.9787);
      p.bezierVertex(315.319,82.2401,314.885,82.6367,314.53,83.1687);
      p.bezierVertex(314.166,83.6914,313.984,84.3261,313.984,85.0727);
      p.bezierVertex(313.984,85.7914,314.152,86.4307,314.488,86.9907);
      p.bezierVertex(314.815,87.5414,315.277,87.9707,315.874,88.2787);
      p.bezierVertex(316.471,88.5774,317.162,88.7267,317.946,88.7267);
      p.bezierVertex(318.73,88.7267,319.425,88.5774,320.032,88.2787);
      p.bezierVertex(320.629,87.9707,321.096,87.5414,321.432,86.9907);
      p.bezierVertex(321.759,86.4307,321.922,85.7914,321.922,85.0727);
      p.bezierVertex(321.903,84.4287,321.787,83.8547,321.572,83.3507);
      p.bezierVertex(321.348,82.8374,321.017,82.4314,320.578,82.1327);
      p.bezierVertex(320.13,81.8341,319.579,81.6847,318.926,81.6847);
      p.vertex(318.926,84.9047);
      p.vertex(317.694,84.9047);
      p.vertex(317.694,80.2147);
      p.vertex(318.59,80.2287);
      p.endShape();
      p.vertex(321.586,77.8474);
      p.bezierVertex(321.586,77.5954,321.67,77.3901,321.838,77.2314);
      p.bezierVertex(321.997,77.0727,322.202,76.9934,322.454,76.9934);
      p.bezierVertex(322.715,76.9934,322.925,77.0727,323.084,77.2314);
      p.bezierVertex(323.252,77.3901,323.336,77.5954,323.336,77.8474);
      p.bezierVertex(323.336,78.1087,323.252,78.3234,323.084,78.4914);
      p.bezierVertex(322.925,78.6501,322.715,78.7294,322.454,78.7294);
      p.bezierVertex(322.202,78.7294,321.997,78.6501,321.838,78.4914);
      p.bezierVertex(321.67,78.3234,321.586,78.1087,321.586,77.8474);
      p.endShape();
      
      }
      p.drawStar=function(){
      p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.fill("#000000")
      p.beginShape();
      p.vertex(7.36842,11.2516);
      p.vertex(11.9221,14);
      p.vertex(10.7137,8.82);
      p.vertex(14.7368,5.33474);
      p.vertex(9.43895,4.88526);
      p.vertex(7.36842,0);
      p.vertex(5.29789,4.88526);
      p.vertex(0,5.33474);
      p.vertex(4.02316,8.82);
      p.vertex(2.81474,14);
      p.vertex(7.36842,11.2516);
      p.endShape();
      
      }




    });
  }
});
