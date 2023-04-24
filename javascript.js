function setReset(buttons,startmode,playerX,playerO){
    let reset=document.querySelector(".reset");
    let header=document.querySelector(".header");
    reset.addEventListener("click",()=>{
        let help;
        buttons=document.querySelectorAll(".field");
        buttons.forEach(button=>{
            button.style.color="rgb(148, 147, 147)";
            button.textContent=("S");
            if(button.id[0]=="s" && button.id.length==3){
                help=button.id[1]+button.id[2];
                button.id=help;
            }
            button.replaceWith(button.cloneNode(true));
        });
        header.textContent=("TicTacToe");
        if(startmode =="X") startmode="O";
        else if (startmode=="O") startmode="X";
        playerX=[];
        playerO=[];
        buttons=document.querySelectorAll(".field");
        setTurn(startmode);
        setfields(buttons,startmode,playerX,playerO);
    });

}
function setfields(buttons, mode, playerX, playerO){
    let stop=true;
    buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            if(button.id[0]!="s"){
                mode=eventClick(button,mode);
                stop=addtoGameboard(playerX,playerO,button.id,mode,buttons);
                setTurn(mode);
                button.id="s"+button.id;
            }
            if(stop==false) blockfield(buttons);
        },{once:true});
        button.addEventListener("mouseover",()=>{
            if(button.id[0]!="s" && stop==true){
                button.style.color="rgb(168, 167, 167)";
                button.textContent=(mode);
                button.setAttribute("style","background-color: rgb(226, 226, 226);cursor:pointer");
            }
        });
        button.addEventListener("mouseout",()=>{
            if(button.id[0]!="s" && stop==true){
                button.style.color=" rgb(148, 147, 147)";
                button.textContent=("S");
                button.setAttribute("style","background-color: rgb(148, 147, 147)");
            }
        });
        
    });
}
function setTurn(mode){
    let turn=document.querySelector(".turn");
    turn.textContent=("Turn: "+mode);
};
function eventClick(button,mode){
    button.textContent=(mode);
    button.setAttribute("style","background-color: rgb(148, 147, 147);color:black;cursor:default;");
    if(mode=="X")return "O";
    else if(mode=="O")return "X";
};
function addtoGameboard(playerX,playerO,id,mode){
    if(mode=="X"){
        for(let i=0;i<=playerX.length;i++){
        if (i==playerX.length){
                playerX.push(id);
                break;
            }
            else if (Number(id)<Number(playerX[i])){
                playerX.splice(i,0,id);
                break;
            }
        }
    }
    else if(mode=="O"){
        for(let i=0;i<=playerO.length;i++){
        if (i==playerO.length){
                playerO.push(id);
                break;
            }
            else if (Number(id)<Number(playerO[i])){
                playerO.splice(i,0,id);
                break;
            }
        }
    }
    return checkwin(playerX,playerO,buttons);
}
function checkwin(playerX,playerO){
    let countcolumn=0,countrow=0;equal=0,special=0;
    if(playerX.length>2){
        for(let i=0;i<playerX.length;i++){
            if(playerX[i][0]=="2" && playerX[i][1]=="2") special++;
            if(playerX[i][0]=="1" && playerX[i][1]=="3") special++;
            if(playerX[i][0]=="3" && playerX[i][1]=="1") special++;
            if(playerX[i][0]==playerX[i][1]) equal++;
            for(let j=0;j<playerX.length;j++){
                if(playerX[i]!=playerX[j]){
                    if(playerX[i][1]==playerX[j][1])countcolumn++;
                    if(playerX[i][0]==playerX[j][0]) countrow++;
                }
            }
            if(countcolumn==2 || countrow==2 || equal==3 || special==3){displayWinner("Player O ");return false;}
            else countcolumn=countrow=0;
        }
    }
    countcolumn=0,countrow=0;equal=0,special=0;
    if(playerO.length>2){
        for(let i=0;i<playerO.length;i++){
            if(playerO[i][0]=="2" && playerO[i][1]=="2") special++;
            if(playerO[i][0]=="1" && playerO[i][1]=="3") special++;
            if(playerO[i][0]=="3" && playerO[i][1]=="1") special++;
            if(playerO[i][0]==playerO[i][1]) equal++;
            for(let j=0;j<playerO.length;j++){
                if(playerO[i]!=playerO[j]){
                    if(playerO[i][1]==playerO[j][1])countcolumn++;
                    if(playerO[i][0]==playerO[j][0]) countrow++;
                }
            }
            if(countcolumn==2 || countrow==2 || equal==3 || special==3){displayWinner("Player X ");return false;}
            else countcolumn=countrow=0;
        }
    }
    if(playerO.length+playerX.length==9) displayWinner("Its a draw");

    return true;
}
function displayWinner(winner){
    let header=document.querySelector(".header");
    let scoreX=document.getElementById("ScoreX");
    let scoreO=document.getElementById("ScoreO");
    let scoreDraw=document.getElementById("ScoreDraw");
    if(winner=="Player X "){
        header.textContent=(winner+"wins the game");
        scoreX.textContent=(Number(scoreX.textContent)+1)
    }
    else if(winner=="Player O "){
        header.textContent=(winner+"wins the game");
        scoreO.textContent=(Number(scoreO.textContent)+1)
    }
    else if (winner=="Its a draw"){
        header.textContent=(winner);
        scoreDraw.textContent=(Number(scoreDraw.textContent)+1)
    }
}
function blockfield(buttons){
    buttons.forEach(button=>{
        if(button.id[0]!="s"){
            button.setAttribute("style","background-color: rgb(148, 147, 147);cursor:default;");
        }
        button.replaceWith(button.cloneNode(true));
    });
}

let buttons=document.querySelectorAll(".field");
let mode="X";
let playerX=[],playerO=[];
setfields(buttons,mode,playerX,playerO);
setReset(buttons,mode,playerX,playerO);