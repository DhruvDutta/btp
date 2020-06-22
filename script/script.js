let allow=true;
let turn =0;
let last;
let first;
win_condition=[[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]]
potato_turns=[];
let t;
let win;
let config = {
    height:window.innerHeight -8,
    width:window.innerWidth -8,
    physics: { default: 'arcade' },
    backgroundColor:'#232946',
    dom: {
        createContainer: true
    },
    parent: '.game-area',
    scene:{
        preload:preload,
        create:create,
        update:update
    }
}
let game = new Phaser.Game(config);
function preload(){

}
function create(){
    let W = game.config.width;
    let H = game.config.height;
    let div1 = document.createElement('div');
    t = this.add.text(W/2,50,turn)
    
    
    div1.setAttribute('class','game');
    div1.style = `width:${Math.min(W,H)-70}px;height:${Math.min(W,H)-70}px`;
    div1.innerText = '';
    for(let i=0;i<9;i++){
        let div2 = document.createElement('div');
        div2.setAttribute('class','cell');
        div2.setAttribute('id',i+1);
        div2.style=`width:${div1.style.width.split('p')[0]/3-12}px;height:${div1.style.width.split('p')[0]/3-12}px;float:left;`;
        div2.innerHTML='';
        div2.setAttribute('onclick','type(this.id)');
        div1.appendChild(div2);
    }
    var element1 = this.add.dom(W/2, H/2, div1);
    win = this.add.text(W/2,100,'Win',{font:'20px '})
    win.alpha=0;
}
function update(){
    
}

function potato(){
    if(turn==1){
        first=parseInt(last);
        if(last==5){
            corner()
        }else{
            mid()
        }
    }else if(turn==2 && first==5){
        opposite()
    }else if(turn>=3){
        if(win_check()){
            win.alpha=1;
            win_check()
            
        }else{
            //opposite()
            console.log('nowin')
        }
        
    }
    //setTimeout(function(){
    //    console.log(potato_turns)
    //},720);
    
}

function type(index){
    if(allow && checkempty(index)){
        last=index;
        document.getElementById(index).innerText = 'X';
        allow=false;
        turn+=1;
        t.setText(turn);
        potato()
    }
}

function opposite(){
    if(checkempty(10-last)){
        setTimeout(function(){
            document.getElementById(10-last).innerText = '0';
            allow=true;
            potato_turns.push(10-last)
        },700)
    }else{
        corner()
    }
}
function mid(){
    setTimeout(function(){
        if(checkempty(5)){
            document.getElementById(5).innerText = '0';
            allow=true;
            potato_turns.push(5)
        }
        
    },700)
}
function corner(){
    let pos = [1,3,7,9];
    let r = Math.floor(Math.random()*4);
    if(checkempty(pos[r])){
        setTimeout(function(){
            document.getElementById(pos[r]).innerText = '0';
        allow=true;
        potato_turns.push(pos[r]);
        },700)
    }else{
        corner()
    }
}
function checkempty(index){
    if(document.getElementById(index).innerText==''){
        return true
    }else{
        return false
    }
}

function win_check(){
    //potato_turns,win_condition
    for(let j=0;j<8;j++){
        let point = [false,false,false];
        if(potato_turns.includes(win_condition[j][0])){
            point[0]=true
            //console.log(potato_turns,' includes: ',win_condition[j][0])
        }
        if(potato_turns.includes(win_condition[j][1])){
            point[1]=true
            //console.log(potato_turns,' includes: ',win_condition[j][0])
        }
        if(potato_turns.includes(win_condition[j][2])){
            point[2]=true
            //console.log(potato_turns,' includes: ',win_condition[j][0])

        }
        let count=0;
        for(k=0;k<3;k++){
            if(point[k]==true){
                count+=1;
            }
        }
        if(count==2){
            setTimeout(function(){
                if(checkempty(win_condition[j][point.indexOf(false)])){
                    document.getElementById(win_condition[j][point.indexOf(false)]).innerText = "0";
                    potato_turns.push(win_condition[j][point.indexOf(false)])
                }
            },700)
            console.log(win_condition[j],potato_turns,point)
            return true
        }
    }
    return false
}
