let i=0;
let j=0;
let jy=0;
let iy=0;
let hp=50;
let hp1=50;
let d=1;
let button;
var n=["Aaron","Blake","Evita","Nicolaus","Phil","Alberta","Delon","Misa","Henrique","Waldeinsamkeit","Culaccino","KomorebiMorgan","Maxwell","Kelvin","Kenton","Alton","Kendall","India","Lynn","Morgan","Rosemary","TaliaShirley","Sharon","Patricia","Felicia","Alicia","Stacia","Tricia","Lucia","Anastacia"];
function setup() {
  createCanvas(windowWidth,windowHeight);
  strokeWeight(3);
  background(0);
  noStroke();
  loop();
}
function draw() {
    //hp数字显示
    fill(0);
    noStroke();
    rect(10,0,120,40);
    fill(255,hp);
    textSize(32);
    textStyle(ITALIC);
    text('HP', 10, 30);
    text(hp,70,30);
    hp1=hp1-0.05;
    hp=int(hp1);
    //ecg显示
    i=i+int(random(3,5));
    background(0, 10)
    stroke(255);
    iy=windowHeight/2+random(-2, 2)
      //点击鼠标后开始抖动
    　if(mouseIsPressed==true){
      iy=windowHeight/2+random(-100,100);
      hp1=hp1+0.5;
      //名字显示
      fill(255);
      textStyle(ITALIC);
      textSize(random(10,50));
      text(n[int(random(n.length))],random(windowWidth), random(windowHeight));
    }
    line(j, jy, i, iy);
    j=i;
    jy=iy;
     //ecg曲线区域判断
    if(i>=windowWidth){
      i=0;
      j=0;
    }
    //成功条件判断
    if (hp>=100) {
        noLoop();
        background(0);
        textSize(32);
        text('when people are determined they can overcome anything', windowWidth/2-400,windowHeight/2);
        //显示按钮
        button = createButton('restart');
        button.position(width-100, 10);
        button.mousePressed(changeloop);
    }
    //失败条件判断
    if (hp<0) {
      noLoop();
      background(0);
      textSize(32);
      text("The phoenix must burn to emerge",windowWidth/2-300,windowHeight/2);
      //显示按钮
      button = createButton('restart');
      button.position(width-100, 10);
      button.mousePressed(changeloop);
    }
}
//按钮命令重启画面
function changeloop(){
  hp1=50;
  hp=50;
  loop();
  background(0);
}