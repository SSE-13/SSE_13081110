var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = ' ';
    }
    TextField.prototype.render = function (context) {
        context.font = "20px Arial";
        context.fillStyle = '#000000';
        context.fillText(this.text, 0, 20);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var rect = new Rect();
rect.width = 800;
rect.height = 360;
rect.color = '#04a3f4';
var rect2 = new Rect();
rect2.width = 120;
rect2.height = 20;
rect2.x = 450;
rect2.y = 100;
//rect2.rotation = Math.PI / 8;
rect2.color = '#95de4e';
var rect3 = new Rect();
rect3.width = 120;
rect3.height = 20;
rect3.x = 220;
rect3.y = 100;
rect3.color = '#086fbe';
var rect4 = new Rect();
rect4.width = 120;
rect4.height = 20;
rect4.x = 600;
rect4.y = 100;
rect4.color = '#086fbe';
var text = new TextField();
text.x = 400;
text.y = 250;
text.text = '开始';
var text1 = new TextField();
text1.x = 240;
text1.y = 250;
text1.text = '设置';
var text2 = new TextField();
text2.x = 540;
text2.y = 250;
text2.text = '联系我们';
var bitmap = new Bitmap();
bitmap.source = 'icon.png';
bitmap.x = 300;
bitmap.y = 50;
//渲染队列
var renderQueue = [rect, rect2, rect3, rect4, text, text1, text2, bitmap];
//资源加载列表
var imageList = ['icon.png'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
