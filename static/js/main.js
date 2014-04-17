$( document ).ready(function() {  
  var canvas =  document.querySelector('#canvas'),
                  context = canvas.getContext('2d');
                  context.canvas.width  = $("#canvas-container").width();
                  context.canvas.height = $("#canvas-container").height();


  var center, mousePos, vector, p1, p2, p3, p4, radius, beamCenter;

  var angle = 18;

  center = { 
    x: context.canvas.width/2,
    y: context.canvas.height/2
  };

  mousePos = {
      x: 0,
      y: 0
    };

  vector = {
    x: center.x - mousePos.x,
    y: center.y - mousePos.y
  }

  p1 = {
    x: center.x + vector.x * Math.cos(getRadians(angle)),
    y: center.y + vector.y * Math.sin(getRadians(angle))
  }

  p2 = {
    x: center.x + vector.x * Math.sin(getRadians(angle)),
    y: center.y + vector.y * Math.cos(getRadians(angle))
  }

  beamCenter = {
    x: (p1.x + p2.x)/2,
    y: (p1.y + p2.y)/2
  }

  radius = getDist(p1.x, p1.y, p2.x, p2.y)/2;

  dist = {
    x: beamCenter.x - mousePos.x,
    y: beamCenter.y - mousePos.y
  }

 //Calculate Tangents
  var pointDistance = {
      x: beamCenter.x - mousePos.x,
      y: beamCenter.y - mousePos.y,
      length: function () {
          return Math.sqrt(this.x * this.x + this.y * this.y)
      }
  }

  //Alpha
  var a = Math.asin(radius / pointDistance.length());
  //Beta
  var b = Math.atan2(pointDistance.y, pointDistance.x);
  //Tangent angle
  var t = b - a;
  //Tangent points
  var T1 = {
      x: beamCenter.x + radius * Math.sin(t),
      y: beamCenter.y + radius * -Math.cos(t)
  };

  t = b + a;
  var T2 = {
      x: beamCenter.x + radius * -Math.sin(t),
      y: beamCenter.y + radius * Math.cos(t)
  }


  context.save();

  eraseBackground();

  context.beginPath();
  context.rect(0,0,context.canvas.width,context.canvas.height);
  context.fillStyle = "#2CB34A";
  context.fill();

  context.beginPath();
  context.moveTo(mousePos.x,mousePos.y);
  context.lineTo(T1.x,T1.y);
  context.lineTo(T2.x,T2.y);
  context.fillStyle = "rgba(255, 255, 255, 0.7)";
  context.fill();

  context.globalCompositeOperation = 'xor';

  context.beginPath();
  context.arc(beamCenter.x, beamCenter.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#FFF";
  context.fill();

  context.restore();

  context.beginPath();
  context.arc(beamCenter.x, beamCenter.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "rgba(255, 255, 255, 0.2)";
  context.fill();



  canvas.onmousemove = function (e) {
    mousePos = windowToCanvas(canvas, e.clientX, e.clientY);

    vector = {
      x: beamCenter.x - mousePos.x,
      y: beamCenter.y - mousePos.y
    }

    p1 = {
      x: center.x + vector.x * Math.cos(getRadians(angle)),
      y: center.y + vector.y * Math.sin(getRadians(angle))
    }

    p2 = {
      x: center.x + vector.x * Math.sin(getRadians(angle)),
      y: center.y + vector.y * Math.cos(getRadians(angle))
    }

    beamCenter = {
      x: (p1.x + p2.x)/2,
      y: (p1.y + p2.y)/2
    }

    radius = getDist(p1.x, p1.y, p2.x, p2.y)/2;

    //Calculate Tangents
    pointDistance = {
        x: beamCenter.x - mousePos.x,
        y: beamCenter.y - mousePos.y,
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }
    }
    //Alpha
    a = Math.asin(radius / pointDistance.length());
    //Beta
    b = Math.atan2(pointDistance.y, pointDistance.x);
    //Tangent angle
    t = b - a;
    //Tangent points
    T1 = {
        x: beamCenter.x + radius * Math.sin(t),
        y: beamCenter.y + radius * -Math.cos(t)
    };

    t = b + a;
    T2 = {
        x: beamCenter.x + radius * -Math.sin(t),
        y: beamCenter.y + radius * Math.cos(t)
    }

    context.save();

    eraseBackground();

    context.beginPath();
    context.rect(0,0,context.canvas.width,context.canvas.height);
    context.fillStyle = "#2CB34A";
    context.fill();

    context.beginPath();
    context.moveTo(mousePos.x,mousePos.y);
    context.lineTo(T1.x,T1.y);
    context.lineTo(T2.x,T2.y);
    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.fill();

    context.globalCompositeOperation = 'xor';

    context.beginPath();
    context.arc(beamCenter.x, beamCenter.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#FFF";
    context.fill();

    context.restore();

    context.beginPath();
    context.arc(beamCenter.x, beamCenter.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.fill();


  }

  // ------------------------------------------------
  // utilitits
  // ------------------------------------------------
  function map(value, inputMin, inputMax, outputMin, outputMax, clamp){
    var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
    if( clamp ){
      if(outputMax < outputMin){
        if( outVal < outputMax )outVal = outputMax;
        else if( outVal > outputMin )outVal = outputMin;
      }else{
        if( outVal > outputMax )outVal = outputMax;
        else if( outVal < outputMin )outVal = outputMin;
      }
    }
    return outVal;
  }

  function getDist(x1, y1, x2, y2) {
    return Math.round( Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2)) );
  }

  function getHypotenuse(x, y) {
    return Math.sqrt( x*x + y*y );
  }

  function getRadians(degrees) {
    return degrees*Math.PI/180;
  }

  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
  }

  function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width  / bbox.width),
             y: y - bbox.top  * (canvas.height / bbox.height)
          };
  }

  function eraseBackground() {
    context.clearRect(0,0,canvas.width,canvas.height);
  }

});