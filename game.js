var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var badGuys = []
var interval;
var juego = {
    status:"iniciando"
  }


  class Board{
    constructor(){
      this.x =0
      this.y =0
      this.width = canvas.width
      this.height = canvas.height
      this.image = new Image ()
      this.image.src = "./Imagenes/neblina.png"
      this.image.onload = () =>{ //tambien se puede usar bind this.image.onload = () =>{}
      this.draw()
    }
      this.music = new Audio()
      this.music.src = "./Musica/Light_Years_Away.mp3"
      this.music.loop = true
      this.crowd = new Audio()
      this.crowd.src = "./Musica/Battle_Intimidation_Loud.mp3"
      this.music.loop = true
    }
    draw(){ //dibuja la pantalla del juego
        this.x--
        if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)   
    }  
    
}

    class Character{
        constructor(){
            this.x = 0
            this.y = 0
            this.width = 70
            this.height=80
            this.right=true
            this.down=false
            this.image3 = new Image()
            this.image3.src = "./Imagenes/bat1.png"
            this.image2 = new Image()
            this.image2.src = "./Imagenes/bat2.png"
            this.image1 = new Image()
            this.image1.src = "./Imagenes/bat3.png"
            this.theImage = this.image1
            // this.howManyTimesbatmanHasBeenTouched = 0
        }
        goRight(){
          if(this.x>canvas.width-this.width*2)return
          this.x+=this.width   
        }
        goLeft(){
          if(this.x==0)return
          this.x-=this.width
        }
        goDown(){
          if(this.y>canvas.height-this.height*2)return
          this.y+=this.height
        }
        goUp(){
          if(this.y==0)return
          this.y-=this.height
        }
        animate(){
            if(frames % 10 === 0){
                if(this.theImage === this.image1) this.theImage = this.image2
                else if(this.theImage === this.image2) this.theImage = this.image3
                else if(this.theImage === this.image3) this.theImage = this.image1
            }
        }
        changePosition(){}
        draw(){
            this.changePosition()
            this.animate()
            ctx.drawImage(this.theImage,this.x,this.y,this.width,this.height)
        }
    } // char

    class Me extends Character{
        constructor(){
            super()
            this.x = 0
            this.y = 550
            this.width = 50
            this.height = 60
            this.image1.src = "./Imagenes/me1.png"
            this.image2.src = "./Imagenes/me2.png"
            this.image3.src = "./Imagenes/me3.png"
        }
    }
    class Joker extends Character{
        constructor(){
            super()
            this.x = 800
            this.y = Math.floor(Math.random() * 500) 

            this.width = 60
            this.height = 70
            this.image1.src = "./Imagenes/joker1.png"
            this.image2.src = "./Imagenes/joker2.png"
            this.image3.src = "./Imagenes/joker3.png"
            this.direction = true
        
        
            this.crash = new Audio()
            this.crash.src = "./Musica/Somber.mp3"
         }
        changePosition(){
            if(this.direction) this.x--
            else this.x++
        }
        checkCollition(batman){
            return  (this.x < batman.x + batman.width) &&
                    (this.x + this.width > batman.x) &&
                    (this.y < batman.y + batman.height) &&
                    (this.y + this.height > batman.y);
        }
        checkCollition(me){
            return  (this.x < me.x + me.width) &&
                    (this.x + this.width > me.x) &&
                    (this.y < me.y + me.height) &&
                    (this.y + this.height > me.y);
        }
}
    //instancia
    var batman = new Character()
    var me = new Me()
    var frames = 0
    var board = new Board()

    function update(){
        frames++
        ctx.clearRect(0,0,canvas.width,canvas.height)
        board.draw()
        batman.draw()
        me.draw()
        generateJoker()
        drawJokers()
        checkJokersCollitions()
    }
    var canvas
    var ctx
    function start(){
        interval = setInterval(update,1000/60)
        document.getElementById('b').remove()
        board.music.play()
        board.crowd.play()
    }
    function gameOver(){
        clearInterval(interval)
        interval = null
        ctx.fontstyle = 'white'
        ctx.font = '150px Avenir'
        ctx.fillText('Game Over', 50 ,250)
        board.music.pause()
      }
      

    //aux func 
    function checkJokersCollitions(){
      badGuys.forEach(function(Joker){
          if(Joker.checkCollition(batman)){
              Joker.direction = false
          }
          if(Joker.x == 0)
           gameOver() && Joker.crash.play()
      })
      badGuys.forEach(function(Joker){
        if(Joker.checkCollition(me)){
            Joker.direction = false
        }
    })
    }
  function drawJokers(){
      badGuys.forEach(function(Joker){
          Joker.draw()
      })
  }
  function generateJoker(){
      if(frames % 20 === 0){
          badGuys.push(new Joker(
          ))
    }}
    document.onkeydown=function(e){
      switch(e.keyCode){
        case 38: batman.goUp()
           break;
        case 40: batman.goDown()
          break;
        case 37: batman.goLeft()
          break;
        case 39: batman.goRight()
          break;
        case 87: me.goUp()
           break; 
        case 83: me.goDown()
          break; 
        case 65: me.goLeft()
          break;
        case 68: me.goRight()
          break;  
             }}       