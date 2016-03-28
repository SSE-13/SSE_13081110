var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "head.png";
humanContainer.addChild(head);
var trunk = new render.Bitmap();
trunk.source = "trunk.png";
trunk.y = 77;
trunk.x = 14;
humanContainer.addChild(trunk);
var left_arm = new render.Bitmap();
left_arm.source = "left_arm.png";
left_arm.x = 68;
left_arm.y = 86;
humanContainer.addChild(left_arm);
var right_arm = new render.Bitmap();
right_arm.source = "right_arm.png";
right_arm.x = -5;
right_arm.y = 70;
humanContainer.addChild(right_arm);
var left_leg = new render.Bitmap();
left_leg.source = "left_leg.png";
left_leg.x = 45;
left_leg.y = 110;
humanContainer.addChild(left_leg);
var right_leg = new render.Bitmap();
right_leg.source = "right_leg.png";
right_leg.x = 10;
right_leg.y = 110;
humanContainer.addChild(right_leg);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "trunk.png", "left_arm.png", "right_arm.png", "left_leg.png", "right_leg.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        // this.x = 
        // this.y = 
        // this.rotation =
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map