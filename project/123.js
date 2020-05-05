let duanqiao;
let buildings=[];

function preload(){//预加载图片
duanqiao=loadImage("duanqiao.png");
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    building = new Building();
    ship = new Ship();
}

function draw(){
background(0);
ship.move();
ship.show();
// building.x=ship.x;
for(let a of buildings){
    a.show();
}
}

function mouseReleased(){
buildings.push(new Building);
}

function build(){//建造的方法

}

class Ship{
    constructor(){
        this.x;
        this.y=height/4*3;
        
    }
    move(){
        this.x=mouseX;
    }
    show(){
    rect(this.x,this.y,20,10);
    }
}

class Building{
    constructor(ship){
        this.x=mouseX;          
        this.img=duanqiao;
        this.w=this.img.width;
        this.h=this.img.height; 
        this.y=height/2-this.h;
    }
    show(){
        image(this.img,this.x,this.y,this.w,this.h);
    }
}