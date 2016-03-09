/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {
    
    text = ' ';
    render(context: CanvasRenderingContext2D) {
        context.font = "20px Arial";
        context.fillStyle = '#000000';
        context.fillText(this.text, 0, 20);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
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
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game");
var context = canvas.getContext("2d");


var rect = new Rect();
rect.width = 800;
rect.height = 360;
rect.color = '#04a3f4'


var rect2 = new Rect();
rect2.width = 150;
rect2.height = 10;
rect2.x = 600;
rect2.y = 0;
//rect2.rotation = Math.PI / 8;
rect2.color = '#95de4e'

var rect3 = new Rect();
rect3.width = 150;
rect3.height = 10;
rect3.x = 220;
rect3.y = 0;
rect3.color = '#086fbe'

var rect4 = new Rect();
rect4.width = 150;
rect4.height = 10;
rect4.x = 750;
rect4.y = 0;
rect4.color = '#086fbe'


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
var renderQueue = [rect, rect2, rect3, rect4,text,text1,text2,bitmap];
//资源加载列表
var imageList = ['icon.png'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


