$( document ).ready(function() {  
  var canvas =  document.querySelector('#canvas'),
                  context = canvas.getContext('2d');
                  context.canvas.width  = $("#canvas-container").width();
                  context.canvas.height = $("#canvas-container").height();


  var center, mousePos, vector, p1, p2, p3, p4, radius, beamCenter;

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
    x: center.x + vector.x * Math.cos(getRadians(9)),
    y: center.y + vector.y * Math.sin(getRadians(9))
  }

  p2 = {
    x: center.x + vector.x * Math.sin(getRadians(9)),
    y: center.y + vector.y * Math.cos(getRadians(9))
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

  //tangents

  var dist, dd, a, b, t, ta, tb;

  dist = {
    x: beamCenter.x - mousePos.x,
    y: beamCenter.y - mousePos.y
  }

  dd = Math.sqrt(dist.x * dist.x + dist.y * dist.y);

  a = Math.asin(radius / dd);
  b = Math.atan2(dist.y, dist.x);

  t = b - a;
  ta = { 
    x:radius * Math.sin(t), 
    y:radius * -Math.cos(t) 
  };
    
  t = b + a;
  tb = { 
    x:radius * -Math.sin(t), 
    y:radius * Math.cos(t) 
  };

  p3 = {
    x: beamCenter.x + ta.x,
    y: beamCenter.y + ta.y
  }

  p4 = {
    x: beamCenter.x + tb.x,
    y: beamCenter.y + tb.y
  }


  context.beginPath();
  context.moveTo(mousePos.x, mousePos.y);
  context.lineTo(center.x,center.y);
  context.stroke();
  
  context.beginPath();
  context.moveTo(mousePos.x,mousePos.y);
  context.lineTo(p3.x,p3.y);
  context.lineTo(p4.x,p4.y);
  context.fillStyle = "rgba(255, 255, 255, 0.7)";
  context.fill();

  context.beginPath();
  context.arc(beamCenter.x, beamCenter.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "rgba(255, 255, 255, 0.7)";
  context.fill();


  canvas.onmousemove = function (e) {
    mousePos = windowToCanvas(canvas, e.clientX, e.clientY);

    vector = {
      x: beamCenter.x - mousePos.x,
      y: beamCenter.y - mousePos.y
    }

    p1 = {
      x: center.x + vector.x * Math.cos(getRadians(9)),
      y: center.y + vector.y * Math.sin(getRadians(9))
    }

    p2 = {
      x: center.x + vector.x * Math.sin(getRadians(9)),
      y: center.y + vector.y * Math.cos(getRadians(9))
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

    dd = Math.sqrt(dist.x * dist.x + dist.y * dist.y);

    a = Math.asin(radius / dd);
    b = Math.atan2(dist.y, dist.x);

    t = b - a;
    ta = { 
      x:radius * Math.sin(t), 
      y:radius * -Math.cos(t) 
    };
      
    t = b + a;
    tb = { 
      x:radius * -Math.sin(t), 
      y:radius * Math.cos(t) 
    };

      eraseBackground();
      
    p3 = {
      x: beamCenter.x + ta.x,
      y: beamCenter.y + ta.y
    }

    p4 = {
      x: beamCenter.x + tb.x,
      y: beamCenter.y + tb.y
    }


    context.beginPath();
    context.moveTo(mousePos.x, mousePos.y);
    context.lineTo(center.x,center.y);
    context.stroke();
    
    context.beginPath();
    context.moveTo(mousePos.x,mousePos.y);
    context.lineTo(p3.x,p3.y);
    context.lineTo(p4.x,p4.y);
    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.fill();

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