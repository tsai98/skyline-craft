var visible = true;
var gui1,gui2,gui3,gui4;
var construction = ["断桥","浙江环球中心","雷峰塔","会议中心","市民中心","三潭印月",'来福士','火车东站','杭州大剧院','奥体中心','绿植1','绿植2'];
var weather = ["晴天","多云","雨",'黑夜'];
var size=100;
var backgroundcolor='#6FCEDE';
var watercolor='#38C7D6';
var wave=true;
var reflect=true;
var construct='Press c';
var undo='Press z';
var screenshot='Press s';

let rains=[];
let imageflag=1;
let imgConstruction=[];
let imgWeather=[];
let buildings=[];
let buildings2=[];
let lastAddTime1=0;
let lastAddTime2=0;
let lastAddTime3=0;
let weatherflag=1;
let andi;
let clouds=[];
let waves=[];
let index=1;
let imgWave=[];
let imgship;
let andi2;
let s;//水波间隔

function preload(){//预加载图片
    andi=loadImage("andi.png");
    andi2=loadImage("andi2.png");
    imgship=loadImage("ship.png");
    for(let i=1;i<13;i++){
    let str1 ="c"+i+".png"
    imgConstruction[i]= loadImage(str1); 
    }
    for(let i=1;i<5;i++){
    let str2 ="tianqi"+i+".png"
    imgWeather[i]= loadImage(str2); 
    }
    for(let i=1;i<4;i++){
    let str3 ="wave"+i+".png"
    imgWave[i]= loadImage(str3); 
    }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  building = new Building();
  ship = new Ship();
  rain = new Rain();
  gui2 = createGui('Menu').setPosition(width - 220, 20);
  colorMode(HSB);
  sliderRange(0, 50, 1);
  gui2.addGlobals('backgroundcolor','watercolor','weather', 'construction');
  sliderRange(0, 200, 10);
  gui2.addGlobals('size','wave','reflect','construct','undo','screenshot');
  noStroke();
}

function draw(){
basic();
if(weatherflag==1){//晴天的贴图
  image(imgWeather[1],0,height/3*2-imgWeather[1].height*windowWidth/1920,imgWeather[1].width*windowWidth/1920,imgWeather[1].height*windowWidth/1920);
}else{
  clear();
  basic();
  drawcoast()
}


switch(construction) {

    case '断桥':
      imageflag=1;
      break;

    case '浙江环球中心':
      imageflag=2;
      break;

    case '雷峰塔':
      imageflag=3;
      break;
    case '会议中心':
      imageflag=4;
      break;
    case '市民中心':
      imageflag=5;
      break;
    case '三潭印月':
      imageflag=6;
      break;
    case '来福士':
      imageflag=7;
      break;
    case '火车东站':
      imageflag=8;
      break;
    case '杭州大剧院':
      imageflag=9;
      break;
    case '奥体中心':
      imageflag=10;
      break;
    case '绿植1':
      imageflag=11;
      break;
    case '绿植2':
      imageflag=12;
      break;
  }
switch(weather) {

    case '晴天':
      weatherflag=1;
      drawwave()
      break;

    case '多云':
      weatherflag=2;  
      image(imgWeather[1],0,height/3*2-imgWeather[1].height*windowWidth/1920,imgWeather[1].width*windowWidth/1920,imgWeather[1].height*windowWidth/1920);
      let interval2=random(4000,6000);         
      if (millis()-lastAddTime2 > interval2) {  
      clouds.push(new Cloud());        
      clouds=clouds.splice(-100,100);                    
      lastAddTime2= millis();           
      }
      for(let c of clouds){
        c.move();
        c.show();
      }
      drawwave();
      break;

    case '雨':
      weatherflag=3;
      let interval1=random(1,10);         
      if (millis()-lastAddTime1 > interval1) {  
        rains.push(new Rain());        
        rains=rains.splice(-1000,1000);                    
        lastAddTime1= millis();           
      }
      for(let c of rains){
        c.move();
        c.show();
      }
      drawwave();
      break;
     case '黑夜':
      weatherflag=4;
      image(imgWeather[4],0,height/3*2-imgWeather[4].height*windowWidth/1920,imgWeather[4].width*windowWidth/1920,imgWeather[4].height*windowWidth/1920);
      drawwave();
      break;
}


// ship.move();
// ship.show();  
for(let a of buildings){
  a.show();
  // a.show();
}
for(let a of buildings2){
  a.show();
}
}

function keyPressed(){
  if(key =="c"){
    if(mouseY<height/3*2){
    buildings.push(new Building); 
    }else{
    buildings2.push(new Building2);
    }
  }
  if(key=="z"){ 
    if(mouseY<height/3*2){
    buildings=buildings.splice(0,buildings.length-1);
    }else{
    buildings2=buildings2.splice(0,buildings2.length-1);
    }
  }
  if(key=="s"){ 
    save('myCanvas.jpg'); 
  }
 
}
    
class Ship{
 constructor(){
  this.x;
  this.y=height/3*2+height/6
  this.img=imgship;    
   }
  move(){
  this.x=mouseX;
  }
  show(){
  image(imgship,this.x,this.y,this.img.width,this.img.height);
  }
}
    
class Building{
 constructor(){
   this.x=mouseX;          
   this.img=imgConstruction[imageflag];
   this.w=this.img.width*size/100*windowHeight/1080;
   this.h=this.img.height*size/100*windowHeight/1080; 
   this.y=height/3*2-this.h;
   this.y2=height/4*3+andi2.height*windowHeight/1080;
 }
 show(){
   image(this.img,this.x,this.y,this.w,this.h);  
}
}
class Building2{
  constructor(){
    this.x=mouseX;          
    this.img=imgConstruction[imageflag];
    this.w=this.img.width*size/100*windowHeight/1080;
    this.h=this.img.height*size/100*windowHeight/1080; 
    this.y2=height/4*3+andi2.height*windowHeight/1080-this.h-2;
  }
  show(){
    image(this.img,this.x,this.y2,this.w,this.h);  
 }
}


//天气系统'雨'
class Rain{
  constructor(){
    this.x=random(0, width);
    this.y=0;
    this.h=random(5,20)
  }
  move(){
    this.y+=10;
    // this.y = constrain(this.y, 0, height/4*3)
  }
  show(){
    fill(255);
    rect(this.x,this.y,3,this.h);
  }
}

//天气系统'云'
class Cloud{
  constructor(){
    this.img=imgWeather[int(random(2,3.9))];
    this.x=-200;
    this.y=random(0,height/2);
  }
  move(){
    this.x+=1;
    // this.y = constrain(this.y, 0, height/4*3)
  }
  show(){
    image(this.img,this.x,this.y, this.img.width, this.img.height);
  }
}

//水波系统
class Wave{
  constructor(){
    this.img=imgWave[int(random(1, 3))];
    this.x=-500;
    // this.y=height/3*2+andi.height*windowHeight/1080+round(random((height-(height/3*2+andi.height*windowHeight/1080))%this.img.height))*this.img.height;
    s=round((height/3)/5);
    this.y1=height/3*2+20;
    // this.y2=height/3*2+andi.height*windowHeight/1080+(height-(height/3*2+andi.height*windowHeight/1080)/3);
    // this.y3=height/3*2+andi.height*windowHeight/1080+(height-(height/3*2+andi.height*windowHeight/1080)/3*2);
    this.y2=height/3*2+20+s;
    this.y3=height/3*2+20+s*2;
    this.y4=height/3*2+20+s*3;
    this.y5=height/3*2+20+s*4;
  }
  move(){
    this.x+=3;
    // this.y = constrain(this.y, 0, height/4*3)
  }
  show1(){
    image(this.img,this.x,this.y1, this.img.width, this.img.height);
  }
  show2(){
    image(this.img,this.x-50,this.y2, this.img.width, this.img.height);
  }
  show3(){
    image(this.img,this.x-150,this.y3, this.img.width, this.img.height);
  }
  show4(){
    image(this.img,this.x-200,this.y4, this.img.width, this.img.height);
  }
  show5(){
    image(this.img,this.x-250,this.y5, this.img.width, this.img.height);
  }

}
//倒影效果
function basic(){
  background(backgroundcolor);
  fill(watercolor);
  rect(0,height/3*2,width,height/3*2);
}
function drawcoast(){
  image(andi2,0,height/4*3,andi2.width*windowWidth/1920,andi2.height*windowHeight/1080);
}
function drawwave(){
  if(wave){
    let interval3=random(1500,2200);         
    if (millis()-lastAddTime3 > interval3) { 
    waves.push(new Wave());        
    waves=waves.splice(-100,100);                    
    lastAddTime3= millis();           
    }
    for(let c of waves){
      c.move();
      c.show1();
      c.show2();
      c.show3();
      c.show4();
      c.show5();
    }
    drawcoast()
  }
  else{
    drawcoast()
  }
}