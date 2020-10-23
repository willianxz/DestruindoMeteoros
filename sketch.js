var tiros = [];
var meteoros = [];
var removido = 0;
var dificuldade = 0;
var tempoNovosMeteoros = 0;
var tempoJogo = 0;
var foiremovido = false;


var meteorosDestruidos = 0;
var pontuacao = 0;
var vida = 10;


function setup(){
 createCanvas(windowWidth, windowHeight);
 
 somDoTiro = loadSound("data/laser3.mp3");
 somDoMeteoroExplodindo = loadSound("data/boom2.mp3");
 somDePontuacao = loadSound("data/coin.mp3");
 
 gerarMeteoros(); //Gera meteoros apenas uma vez.
}

function draw() {
    //Se a vida for maior que 0, então inicie o jogo.
    if(vida > 0){
        background(148, 146, 148);
        criarMenuLateral();
       
        gerarNovosMeteoros();
    
        ellipse(mouseX, mouseY, 20, 20);
        
        fill(255, 0, 0);
        
        for(var m = 0; m < meteoros.length; m++){
             ellipse(meteoros[m].x, meteoros[m].y++, 10, 10);
            
            //Deleta os meteoros do array, caso cheguem ao final.
            if(meteoros[m].y > height){
                meteoros.splice(0, 1);
                if(vida > 0){
                  vida--;
                }
            }
        }
        
        fill(10, 10, 10);
        for(var i = 0; i < tiros.length; i++){ //Percorre os tiros
              
             ellipse(tiros[i].x, tiros[i].y--, 5, 5);
              
              for(var m = 0; m < meteoros.length; m++){
                 
                 //Calcula a colisão entre os tiros e os meteoros
                  var calcDist = dist(tiros[i].x, tiros[i].y, meteoros[m].x, meteoros[m].y);
                    
                    if(calcDist < 10/2){ //Se acertou algum faça:
                          meteoros.splice(m, 1); //Remova o meteoro atingido
                          removido = i;
                          meteorosDestruidos++;
                          pontuacao = meteorosDestruidos * 25;
                          foiremovido = true;
                          somDoMeteoroExplodindo.play();
                          somDePontuacao.play();
                    }
               }
             
            
          //Deleta os tiros do array, caso cheguem ao final.
          if(tiros[i].y < 0){
                tiros.splice(0, 1);
          }
        }
        
        //Deleta os tiros que colidiram com os meteoros.
         if(foiremovido){
             tiros.splice(removido, 1);
             foiremovido = false;
        }
    }
    if(vida === 0){
        fill(255);
        rect(0, 0, width, height);
        fill(0);
        textSize(20);
        textAlign(CENTER);
        text("GAME OVER, tente novamente!!", width/2, height/2);
        
        textSize(15);
        text("Pontuação: "+pontuacao,width/2, height/2+25);
        text("Meteoros Destruidos: "+meteorosDestruidos,width/2, height/2+45);
        
        textSize(25);
        fill(0);
        rect(width/2 - 100, height/2+60, 200, 50);
        fill(255);
        text("JOGAR", width/2, height/2+95);
    }
    
    
};




function gerarMeteoros(){
  
  for(var i = 0; i < 4; i++){
      var novoMeteoro = createVector(random(20, width - 20), 0);
      meteoros.push(novoMeteoro);
  }
};

function gerarNovosMeteoros(){
  
  if(tempoJogo > 200 && tempoJogo < 500){
      dificuldade = 0;
  }else if(tempoJogo > 500 && tempoJogo < 1000){
      dificuldade = 1;
  }else if(tempoJogo > 1000 && tempoJogo < 2000){
      dificuldade = 2;
  }else if(tempoJogo > 2000 && tempoJogo < 2500){
      dificuldade = 3;
  }else if(tempoJogo > 2500){
      dificuldade = 0;
      tempoJogo = 0;
  }
  
  if(dificuldade === 0){
      if(tempoNovosMeteoros > 200){ 
         for(var i = 0; i < 4; i++){
             var novoMeteoro = createVector(random(20, width - 20), 0);
             meteoros.push(novoMeteoro);
             tempoNovosMeteoros = 0;
        }
     }
  }else if(dificuldade === 1){
     if(tempoNovosMeteoros > 400){ 
         for(var i = 0; i < 10; i++){
             var novoMeteoro = createVector(random(20, width - 20), 0);
             meteoros.push(novoMeteoro);
             tempoNovosMeteoros = 0;
        }
     } 
  }else if(dificuldade === 2){
     if(tempoNovosMeteoros > 700){ 
         for(var i = 0; i < 15; i++){
             var novoMeteoro = createVector(random(20, width - 20), 0);
             meteoros.push(novoMeteoro);
             tempoNovosMeteoros = 0;
        }
     } 
  }else if(dificuldade === 3){
     if(tempoNovosMeteoros > 1000){ 
         for(var i = 0; i < 15; i++){
             var novoMeteoro = createVector(random(20, width - 20), random(0, 50));
             meteoros.push(novoMeteoro);
             tempoNovosMeteoros = 0;
        }
     } 
  }
  
  //println(dificuldade+" "+tempoJogo);
  tempoNovosMeteoros++;
  tempoJogo++;
};

function criarMenuLateral(){
  textSize(15);
  textAlign(LEFT);
  fill(8, 7, 7);
  text("Pontuação: "+pontuacao, 20, 20);
  text("Meteoros Destruidos: "+meteorosDestruidos, 20, 34);
  text("Dificuldade: "+dificuldade, 20, 50);
  text("Vida: "+vida, 20, 64);
  
  
};

function mousePressed(){
    if(vida > 0){
     var novoTiro = createVector(mouseX, mouseY-10);
     tiros.push(novoTiro);
     somDoTiro.play();
    }else{
      
      //Botão responsivo.
      if(mouseX > width/2-100 && mouseX < (width/2-100)+200 && mouseY > height/2+60 && mouseY < height/2+60+50){
        //print("mouseX: "+mouseX+" mouseY: "+mouseY, "Width/2: "+width/2+ " Height/2: "+height/2);
        
          print("Começar novo jogo!");
         
        
          tiros.splice(0, tiros.length);
          meteoros.splice(0, meteoros.length);
        
          
          vida = 10;
          dificuldade = 0;
          pontuacao = 0;
          meteorosDestruidos = 0;
          tempoJogo = 0;
      }
    }
    
};
