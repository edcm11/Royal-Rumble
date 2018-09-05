//canvas config
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

//testing
//ctx.fillRect(0,0,50,50)

//Variables globales
var images={
  bg:'./Imagenes/ring.jpg'
}


//clases
class Player{
  constructor(x,y,w,h,color){
    this.x=x
    this.y=y
    this.w=w
    this.h=h
    this.color=color
    this.right=true
    this.down=false
  }
  draw(){
    ctx.fillStyle=this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
  goRight(){
    if(this.x>canvas.width-this.w*2)return
    this.x+=this.w   
  }
  goLeft(){
    if(this.x==0)return
    this.x-=this.w
  }
  goDown(){
    if(this.y>canvas.height-this.h*2)return
    this.y+=this.h
  }
  goUp(){
    if(this.y==0)return
    this.y-=this.h
  }
}

class Player1 extends Player{
  constructor(){
    super()
    
  }

}

class Player2 extends Player{
  constructor(){
    super()
    
  }

}


//instancias
var p1 = new Player(0,0,50,50,'blue')
var p2 = new Player(100,50,50,50,'red')
var frames = 0

var interval = setInterval(function(){
  ctx.clearRect(0,0,800, 600)
  p1.draw()
  p2.draw()
}, 1000/60)





//funciones principales
function update(){
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  p1.draw()
  p2.draw
  checkGoompasCollitions()
  }
//funciones auxiliares
function crash(Player){
  if (p1.x < p2.x + p2.w){console.log('hola');p1.x=0}
  else if (p1.x + p1.w > p2.x){p2.x=0} 
  else if (p1.y < p2.y + p2.h){p1.y=0} 
  else if (p1.h + p1.y > p2.y){p2.y = 0};
}  

function checkPlayersCollitions(){
 // function(p2){
      if(p1.checkCollition(p2)){
          console.log("me siento sucio")
          p1-=3

//los observadores
document.onkeydown=function(e){
  switch(e.keyCode){
    case 38: p1.goUp()
       break;
    case 40: p1.goDown()
      break;
    case 37: p1.goLeft()
      break;
    case 39: p1.goRight()
      break;
    case 87: p2.goUp()
       break; 
    case 83: p2.goDown()
      break; 
    case 65: p2.goLeft()
      break;
    case 68: p2.goRight()
      break;  
         }
} 
