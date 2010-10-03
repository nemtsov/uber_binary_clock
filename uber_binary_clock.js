var o=document.getElementById('c'),
    WIDTH=720, 
    HEIGHT=300,
    ctx=o.getContext('2d');

o.width=WIDTH;
o.height=HEIGHT;

// manual optimization
ctx.b=ctx.beginPath;
ctx.s=ctx.stroke;
ctx.f=ctx.fill;
ctx.t=ctx.fillText;
ctx.q=ctx.quadraticCurveTo;
ctx.l=ctx.lineTo;

function loop() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawBackground();
  drawClock();
  setTimeout(loop,00);
}

function drawBackground() {
  drawRectangle(10, WIDTH-20, HEIGHT-20, "#fafafa");
  //drawRectangle(445, 10, 265, 280, "#4682e6");
  //drawRectangle(445, 10, 265, 280, "#ab5ee8");
  drawRectangle(445, 265, 280, "#4682B4");
  //drawRectangle(445, 10, 265, 280, "#444");

  ctx.fillStyle = "#fff"; 
  ctx.font = "22px arial";
  ctx.t("Uber Binary Clock", 490, 80); 
  ctx.t("js1k", 490, 105); 
}

function drawRectangle(x, X, Y, bgcolor) {
  var y = 10
    , xX = x+X
    , yY = y+Y;

  ctx.b();
  ctx.moveTo(x, y);

  ctx.l(xX-10, y);
  ctx.q(xX, y, xX, y+10);

  ctx.l(xX, yY-10);
  ctx.q(xX, yY, xX-10, yY);

  ctx.l(x, yY);
  ctx.l(x, y);

  ctx.s();

  ctx.fillStyle = bgcolor; 
  ctx.f()
}

function drawClock() {
  var map = {0:1, 1:1, 8:1, 16:1}
    , x = 65 
    , y = 61; 

  for (i=x,a=0;i<=x*6;i+=x){
    for (j=y;j<=y*4;j+=y,a++){
      if (!map[a]) {
        binViewUnit(i,j,28,0,a,isTime(a));
      }
    }
  }
}

function binViewUnit(x,y,X,Y,a,f){
  ctx.b();
  ctx.strokeStyle = '#325FA2';
  ctx.arc(x,y,X,Y,Math.PI*2,true);
  ctx.s();
  ctx.fillStyle = 'rgb(70,130,'+a*10+')';
  f && ctx.f();
}

function isTime(a) {
  toBinAndPad = function(d) {
    d = parseInt(d,10).toString(2);
    while (d.length < 4)
      d = "0" + d;
    return d;
  }

  , padT = function(t) {
    t+='';
    return (t.length==1) ? "0"+t : t;
  }

  , D = new Date() 
  , hr = padT(D.getHours())
  , mn = padT(D.getMinutes())
  , se = padT(D.getSeconds())
  
  , tot = toBinAndPad(hr[0]) + toBinAndPad(hr[1])
    + toBinAndPad(mn[0]) + toBinAndPad(mn[1])
    + toBinAndPad(se[0]) + toBinAndPad(se[1]);

  return (tot[a]=="1"); 
}

loop();
