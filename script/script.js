let allow=true;
let turn =0;
let last;
let first;
win_condition=[[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]]
potato_turns=[];
user_turns=[];
let t;
let win;
let win_point;
let corns = [1,3,7,9];
let fc = [2,4,6,8];
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
    t.alpha=1;
    
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
    if(turn==5){
        setTimeout(function(){
            document.write('<center><h1>Draw</h1><center>')
            throw new Error("Draw")
        },700)
    }
    if(turn==1){
        if(user_turns[0]==5){
            corner()
        }else if(corns.includes(parseInt(user_turns[0]))){
            mid()
            
        }
    }else if(turn>=2){
        if(win_check()){
            setTimeout(function(){
                //win.alpha=1;
                document.getElementById(win_point).innerText = "0";
                potato_turns.push(win_point);
                allow=true
                win_check()
            },700)
            
        }else{
            
            console.log('wincheck false')
            opposite();
            
        }
        
    }
    setTimeout(function(){
        console.log(potato_turns)
    },720);
    
}

function type(index){
    if(allow && checkempty(index)){
        document.getElementById(index).innerText = 'X';
        allow=false;
        turn+=1;
        t.setText(turn);
        user_turns.push(parseInt(index));
        potato()
    }
}

function opposite(){
    let oppo =10-user_turns[user_turns.length-1];
    if(checkempty(oppo)){
        setTimeout(function(){
            document.getElementById(oppo).innerText = '0';
            allow=true;
            potato_turns.push(oppo);
            console.log('opposite')
        },700)
    }else{
        if(oppocorns() || corners_full()){
            facecenter()
        }else{
            corner()
        }
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

    let r = Math.floor(Math.random()*4);
    if(checkempty(corns[r])){
        setTimeout(function(){
            document.getElementById(corns[r]).innerText = '0';
            allow=true;
            potato_turns.push(corns[r]);
            console.log('corner')
        },700)
    }else{
        corner();
    }
}
function facecenter(){
    let r = Math.floor(Math.random()*4);
    if(checkempty(fc[r])){
        setTimeout(function(){
            document.getElementById(fc[r]).innerText = '0';
            allow=true;
            potato_turns.push(fc[r]);
            console.log('facecenter')
        },700)
    }else{
        facecenter();
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
        if(potato_turns.includes(parseInt(win_condition[j][0]))){
            point[0]=true
            //console.log(potato_turns,' includes: ',win_condition[j][0])
        }
        if(potato_turns.includes(parseInt(win_condition[j][1]))){
            point[1]=true
            //console.log(potato_turns,' includes: ',win_condition[j][1])
        }
        if(potato_turns.includes(parseInt(win_condition[j][2]))){
            point[2]=true
            //console.log(potato_turns,' includes: ',win_condition[j][2])

        }
        let count=0;
        for(k=0;k<3;k++){
            if(point[k]==true){
                count+=1;
            }
        }
        if(count==3){
            document.write("game Over")
        }
        if(count==2){
            if(checkempty(win_condition[j][point.indexOf(false)])){
                console.log('win-check')
                win_point=win_condition[j][point.indexOf(false)];
                return true
            }
            //console.log(win_condition[j],potato_turns,point)
        }
    }
    for(let j=0;j<8;j++){
        let point = [false,false,false];
        if(user_turns.includes(parseInt(win_condition[j][0]))){
            point[0]=true
            console.log(user_turns,' includes: ',win_condition[j][0])
        }
        if(user_turns.includes(parseInt(win_condition[j][1]))){
            point[1]=true
            console.log(user_turns,' includes: ',win_condition[j][1])
        }
        if(user_turns.includes(parseInt(win_condition[j][2]))){
            point[2]=true
            console.log(user_turns,' includes: ',win_condition[j][2])

        }
        let count=0;
        for(k=0;k<3;k++){
            if(point[k]==true){
                count+=1;
            }
        }
        console.log('count '+count)
        if(count==3){
            document.write("game Over")
        }
        if(count==2){
            if(checkempty(win_condition[j][point.indexOf(false)])){
                console.log('loose-check')
                win_point=win_condition[j][point.indexOf(false)];
                return true
            }
            //console.log(win_condition[j],potato_turns,point)
        }
    }
    console.log('false_aya_frse')
    return false
    
}

function corners_full(){
    if(document.getElementById(1).innerText!='' && document.getElementById(3).innerText!='' && document.getElementById(7).innerText!='' && document.getElementById(9).innerText!=''){
        console.log('corners Full');
        return true
    }
    return false
}

function oppocorns(){
    if(document.getElementById(1).innerText=='X' && document.getElementById(9).innerText=='X'){
        //console.log('oppocorns 1 9')
        return true
    }else if(document.getElementById(3).innerText=='X' && document.getElementById(7).innerText=='X'){
        //console.log('oppocorns 3 7')
        return true
    }else{
        //console.log('oppocorns False')
        return false
    }
}
