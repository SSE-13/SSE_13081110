
var human = new render.DisplayObjectContainer();
var humanContainer = new render.DisplayObjectContainer();

humanContainer.x=-50;
humanContainer.y=-80;
human.addChild(humanContainer);

var trunk = new render.Bitmap();
trunk.source = "trunk.png";
trunk.y=77;
trunk.x=14;
humanContainer.addChild(trunk);

var head = new render.Bitmap();
head.source = "head.png";
humanContainer.addChild(head);



var left_arm = new render.Bitmap();
left_arm.source = "left_arm.png";
left_arm.x=68;
left_arm.y=86;
humanContainer.addChild(left_arm);

var right_arm = new render.Bitmap();
right_arm.source = "right_arm.png";
right_arm.x=-5;
right_arm.y=70;
humanContainer.addChild(right_arm);

var left_leg = new render.Bitmap();
left_leg.source = "left_leg.png";
left_leg.x=45;
left_leg.y=110;
humanContainer.addChild(left_leg);

var right_leg = new render.Bitmap();
right_leg.source = "right_leg.png";
right_leg.x=10;
right_leg.y=110;
humanContainer.addChild(right_leg);

var renderCore = new render.RenderCore();
renderCore.start(human, ["trunk.png","head.png","left_arm.png","right_arm.png","left_leg.png","right_leg.png"]);

class HumanBody extends Body {
    
     x=0;
    y=0;
    vy=1;
    vr=1;
    vx:number = 1;
    

    onTicker(duringTime: number) {
       // this.x = 100;//+= duringTime * this.vx;
        //this.y = 100;
        
        this.x +=this.vx*duringTime; 
        this.y +=this.vy*duringTime; 
        this.rotation +=this.vr*duringTime;
        

    }
}

var ticker = new Ticker();
var body = new HumanBody(human);
body.x=100;
body.y=100;
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    var b = false; 
    if(localPoint.x<=80 && localPoint.y<=80){
        b=true;
    }
    return b;
    
}

var legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    var c = false; 
    // alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if((localPoint.x>-35&&localPoint.x<=-6&&localPoint.y>0&&localPoint.y<=25)||
        (localPoint.x>-0&&localPoint.x<=15&&localPoint.y>0&&localPoint.y<=25)){
            c=true;
    }
    return c;
    
}



var headOnClick = () => {
    //修改 HumanBody 的速度，使其反向移动
    if(headHitTest){
        if(body.vr==0&&body.vx==0&&body.vy==0){
            body.vx=1;
            body.vy=1;
            body.vr=1;
        }else{
            body.vr*=-1;
        }
    }
}

var legOnClick = () => {
    if(legHitTest){
            body.vx=0;
            body.vy=0;
            body.vr=0;
            body.rotation=0;
      
    }
}

eventCore.register(head,headHitTest,headOnClick);
eventCore.register(left_leg,legHitTest,legOnClick);











