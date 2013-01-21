var canvas = document.getElementById('world');
var ctx = canvas.getContext('2d');

var board = new Array();

for(var i=0;i<9;i++){
    board[i] = 0;
}

function makeBoard(){
    for(var i=1;i<3;i++){
	ctx.beginPath();
	ctx.moveTo(i*100,0);
	ctx.lineTo(i*100,canvas.height);
	ctx.closePath();
	ctx.stroke();
    }
    
    for(var j=1;j<3;j++){
	ctx.beginPath();
	ctx.moveTo(0,j*100);
	ctx.lineTo(canvas.width,j*100);
	ctx.closePath();
	ctx.stroke();
    }
}

function drawBoard(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    makeBoard();
    
    ctx.font = "100px 'verdana'";
    
    for(var i=0;i<9;i++){
	switch(board[i]){
	    case 1:
        ctx.fillStyle="red";
		ctx.fillText("○",10+100*(i%3),80+100*(Math.floor(i/3)));
		break;
	    case 2:
        ctx.fillStyle="blue";
		ctx.fillText("×",10+100*(i%3),80+100*(Math.floor(i/3)));
		break;
	    default:
		break;
	}
    }
}

function check(fn){
    var result = 0;
    for(var i = 0;i < 3;i++){
	result += board[i] & board[i+3] & board[i+6];
    }
    
    for(var j = 0;j < 3;j++){
	result += board[j*3] & board[j*3+1] & board[j*3+2];
    }
    
    result += board[0] & board[4] & board[8];
    result += board[2] & board[4] & board[6];
    
    switch(result){
	case 1:
	    alert("○の勝ち！");
	    canvas.removeEventListener('click',fn,false);
	    break;
	case 2:
	    alert("×の勝ち！");
	    canvas.removeEventListener('click',fn,false);
	    break;
	default:
	    break;
    }
	
    return result;
}

window.addEventListener('load',function(){
    drawBoard();
    
    canvas.addEventListener('click',function(e){
	var railhead = e.target.getBoundingClientRect();
	var cx = e.clientX - railhead.left;
	var cy = e.clientY - railhead.top;
	var flag = 0;
	var fn = arguments.callee;
	
	var _x = Math.floor(cx/100);
	var _y = Math.floor(cy/100);
	
	if(!board[_x+_y*3]){
	    board[_x+_y*3] = 1;
	    flag = 1;
	    drawBoard();
	    if(check(fn)){
		flag=2;
	    }
	}
	
	if(flag == 1){
	    canvas.removeEventListener('click',fn,false);
	    
	    drawBoard();
	    
	    setTimeout(function(){
		var i = 0;
		while(1){
		    var ran = Math.floor(Math.random()*9);
		    if(!board[ran]){
			board[ran] = 2;
			break;
		    }
		    i++;
		    if(i>100)break;
		}
		
		drawBoard();
		if(check(fn)){
		    flag = 2;
		}
		if(flag == 1)canvas.addEventListener('click',fn,false);
	    },2000);
	}
    },false);
},false);