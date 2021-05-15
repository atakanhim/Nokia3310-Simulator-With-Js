const ustbutton = document.querySelector(".border3pxsolid");

const resim=document.querySelector(".border2pxsolid");
const acmakapama=document.querySelector(".btn-open");
const ileri=document.querySelector("btn-up");
var sayfa =0;
var icerdema= false;
var mouseTimer;
var secim =0;
var yontuslariKullanilabilirmi=true;


eventListeners();

function eventListeners(){//this function just add events listener
ustbutton.addEventListener("click",mantiksal);
acmakapama.addEventListener("mousedown", mouseDown);
document.body.addEventListener("mouseup", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on

}
function mouseDown() { 
    mouseUp();
    mouseTimer = window.setTimeout(execMouseDown,1000);
     //set timeout to fire in 2 seconds when the user presses mouse button down

}
function mouseUp() { 
    if (mouseTimer) window.clearTimeout(mouseTimer);  //cancel timer when mouse button is released
}
function execMouseDown() { 
    telac();
}
function mantiksal(e){
 
    if(e.target.className==="buttons ustbutton btn-up"){
        if(yontuslariKullanilabilirmi){
            if(sayfa>0 && sayfa<3 && icerdema==false)
            {
             sayfa++;
             resimdegistir(sayfa);
            }
            if(sayfa>0 && sayfa<=3 && icerdema==true)
            {
             resim.innerHTML=`
             <h1 style="text-align: center;">OYUNLAR </h1>
                 <ul class="list-group">
                     <li class ="list-group-item" style="background-color:#add8e6 ;color:green;margin-left: 10px;" name="snake">1-Snake</li>
                     <li class ="list-group-item" style="margin-left: 10px;" name="Uzay">2-Uzay</li>
                 </ul>
             `;
             secim=1;
            }
         }
        }
     
    if(e.target.className==="buttons ustbutton btn-down"){
        if(yontuslariKullanilabilirmi){
            if(sayfa>1 && sayfa<=3 && icerdema==false) 
            {
                sayfa--;
                resimdegistir(sayfa);
            }
            if(sayfa>1 && sayfa<=3 && icerdema==true) 
            {
                resim.innerHTML=`
            <h1 style="text-align: center;">OYUNLAR </h1>
                <ul class="list-group">
                    <li class ="list-group-item" style="margin-left: 10px;" name="snake">1-Snake</li>
                    <li class ="list-group-item" style="background-color:#add8e6  ;color:green;margin-left: 10px;" name="Uzay">2-Uzay</li>
                </ul>
            `;
            secim =2;
            }
    }
        }
        
    if(e.target.className==="buttons ustbutton btn-okey"){
        
        if(sayfa==3)
         {
             if(icerdema==false){
                resim.innerHTML=`
                <h1 style="text-align: center;">OYUNLAR </h1>
                    <ul class="list-group">
                        <li class ="list-group-item" style="margin-left: 10px;" name="snake">1-Snake</li>
                        <li class ="list-group-item" style="margin-left: 10px;" name="Uzay">2-Uzay</li>
                    </ul>
                `;
             }
              icerdema=true;
             if(icerdema==true && secim ==1 ){
              
                yontuslariKullanilabilirmi=false;
                 //snakeoyunu();
                 resim.innerHTML = `
                 <canvas id="game" width="257px" height="257px" style="margin-left:19px" > </canvas> 
                 `;
                 const game = new Snakegame();
                 game.init();

             }
            if(icerdema==true && secim ==2 ){
                // oyun 2
                yontuslariKullanilabilirmi=false;
            }  
            
            
             

        }  

    }
    if(e.target.className==="buttons ustbutton btn-open"){
        
        if(sayfa==3)
         {
              secim=0;
              icerdema=false;
              yontuslariKullanilabilirmi=true;
              resimdegistir(sayfa);
         }  
    }
    
    
}



function resimdegistir(sayfa){
    resim.innerHTML=`
    <img src="screens/${sayfa}.png" width="300px">
    `;

}
function telac(){
   
    if(sayfa==1){

        if(confirm("Telefonu kapatmak istediginize emisnimisiniz ")){
            sayfa = 0;
            resimdegistir(sayfa);
        }
    }
    else if(sayfa==0){
        sayfa++;
       resimdegistir(sayfa);
       
    }
    else if(sayfa>1){
        sayfa=1;
        resimdegistir(sayfa);
    }
}

/////////////////////////////////////////////////////////////////

class Snakegame{
    constructor(){
        this.canvas= document.getElementById('game');
        this.context=this.canvas.getContext('2d');
        document.addEventListener('keydown',this.onKeyPress.bind(this));
    }
    init(){
        this.payda=1000;
        this.positionX = this.positionY = 0;
        this.appleX = this.appleY = 5;
        this.tallSize = 5;
        this.trail = [];
        this.gridSize = this.tileCount = 16;
        this.velocityX=this.velocityY=0;

        this.timer=setInterval(this.loop.bind(this), 100000/this.payda);

    }
    loop(){
        this.update();
        this.draw();

    }
    reset(){
        clearInterval(this.timer);
        this.init();
    }
    update(){
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        if(this.positionX < 0 ){
            this.positionX = this.tileCount - 1 ;

        }
        if(this.positionY < 0 ){
            this.positionY = this.tileCount - 1 ;

        }
        if(this.positionX > this.tileCount - 1 ){
            this.positionX = 0;

        }
        if(this.positionY > this.tileCount - 1 ){
            this.positionY = 0;

        }
        this.trail.forEach(t => {
            if(this.positionX === t.positionX && this.positionY === t.positionY  ){
                this.reset();
            }
        });
        this.trail.push({ positionX: this.positionX , positionY: this.positionY});

        while(this.trail.length > this.tallSize){
            this.trail.shift();
        }
        if(this.appleX === this.positionX && this.appleY === this.positionY){
            let x = true;
            this.tallSize++;
            this.payda += 5 ;
                
                do {
                    this.appleX=Math.floor(Math.random() * this.tileCount);
                    this.appleY=Math.floor(Math.random() * this.tileCount);  
                    
                        this.trail.forEach(t => {
                            if(this.appleX === t.positionX && this.appleY === t.positionY  ){

                                  this.appleX=Math.floor(Math.random() * this.tileCount);// bu kısım snake üzerinde yem çıkmaması içni 
                                  this.appleY=Math.floor(Math.random() * this.tileCount);                  
                                    x = false;
                            }
                        });
                } while (x = false);

             if((this.tallSize%5)===0){
                setTimeout(() => {
                    alert("helal"); 
                }, 200); 
             }
             clearInterval(this.timer);
             this.timer=setInterval(this.loop.bind(this), 100000/this.payda);
             console.log(this.payda);
                
        }

    }
    draw(){
        this.context.fillStyle='black';
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

        this.context.fillStyle='white';
        this.context.font='20px Arial';
        this.context.fillText(this.tallSize - 5 ,20,40); 

        this.context.fillStyle='blue';
        this.trail.forEach(t=>{
            this.context.fillRect(t.positionX * this.gridSize,t.positionY*this.gridSize  ,this.gridSize-1,this.gridSize-1);
        });

        this.context.fillStyle='purple';
        this.context.fillRect(this.appleX * this.gridSize,this.appleY*this.gridSize  ,this.gridSize-1,this.gridSize-1);

    }
    onKeyPress(e){
        if(e.keyCode === 37 && this.velocityX !== 1){
            this.velocityX = -1 ;
            this.velocityY = 0 ;

        }
        if(e.keyCode === 38 && this.velocityy !== 1){
            this.velocityX = 0 ;
            this.velocityY = -1 ;
            
        }
        if(e.keyCode === 39 && this.velocityX !== -1){
            this.velocityX = 1 ;
            this.velocityY = 0 ;
            
        }
        if(e.keyCode === 40 && this.velocityY !== -1){
            this.velocityX = 0 ;
            this.velocityY = 1 ;
            
        }
    }
}
