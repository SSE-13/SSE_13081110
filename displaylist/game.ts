module game {


}

var human = new render.DisplayObjectContainer();

var humanContainer = new render.DisplayObjectContainer();

humanContainer.x=-80;
humanContainer.y=-80;
human.addChild(humanContainer);

var trunk = new render.Bitmap();
trunk.source = "trunk.png";
trunk.y=77;
trunk.x=14;
humanContainer.addChild(trunk)

var head = new render.Bitmap();
head.source = "head.png";
humanContainer.addChild(head)

var left_arm = new render.Bitmap();
left_arm.source = "left_arm.png";
left_arm.x=68;
left_arm.y=86;
humanContainer.addChild(left_arm)

var right_arm = new render.Bitmap();
right_arm.source = "right_arm.png";
right_arm.x=-5;
right_arm.y=70;
humanContainer.addChild(right_arm)

var left_leg = new render.Bitmap();
left_leg.source = "left_leg.png";
left_leg.x=45;
left_leg.y=110;
humanContainer.addChild(left_leg)

var right_leg = new render.Bitmap();
right_leg.source = "right_leg.png";
right_leg.x=10;
right_leg.y=110;
humanContainer.addChild(right_leg)

var renderCore = new render.RenderCore();
renderCore.start(human, ["trunk.png","head.png","left_arm.png","right_arm.png","left_leg.png","right_leg.png"]);


class HumanBody extends Body {
    x=0;
    y=0;
    vx=2;
    vy=3;
    vr=5;

    onTicker(duringTime: number) {

        this.x +=this.vx*duringTime; 
        this.y +=this.vy*duringTime; 
        this.rotation +=this.vr*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(human);
ticker.start([body]);











