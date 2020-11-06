const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score = 0;
var bird2, bird3, bird4;

var gameState = "onSling";
var change = [];

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    getBackgroundImage();  
    flybird = loadSound("sounds/bird_flying.mp3");
    selectbird = loadSound("sounds/bird_select.mp3");
}

function setup(){
    var canvas = createCanvas(1200,400);

    refresh = createImg("sounds/refresh.png");
    refresh.position(1150,25);

    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150,150);
    bird3 = new Bird(100,150);
    bird4 = new Bird(50,150);
    change.push(bird4);
    change.push(bird3);
    change.push(bird2);
    change.push(bird);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    fill("white")
    textSize(25);
    pig1.score();
    pig3.score();
    text("Score:"+score,1000,25);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();  
    refresh.mousePressed(reset());
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(change[change.length-1].body,{x: mouseX , y: mouseY});

    }
}


function mouseReleased(){
    slingshot.fly();
    change.pop();
    gameState = "launched";
    flybird.play();
}

function keyPressed(){
    if(keyCode === 32&&gameState == "launched"){
    Matter.Body.setPosition(change[change.length-1].body,{x:200,y:50});
       slingshot.attach(change[change.length-1].body);
       gameState = "onsling";
       selectbird.play();
    }
}

async function getBackgroundImage(){

    var Response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London")
    var ResponseJson = await Response.json();

    var datetime = ResponseJson.datetime;
    var time = datetime.slice(11,13);
    if(time >= 6 && time <= 16){

        bg = "sprites/bg.png"

    }else{

        bg = "sprites/bg2.jpg"

    }
    backgroundImg = loadImage(bg);
    console.log(backgroundImg);

}
function reset(){

    location.reload();

}