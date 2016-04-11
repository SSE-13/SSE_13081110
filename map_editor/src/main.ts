
import * as fs from 'fs';


function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}

function writeFile(mapData_new) {
    var content_new=JSON.stringify(mapData_new);
    fs.writeFileSync( __dirname + "/map.json",'{"map":'+content_new+'}');
}

var mapData_new=new Array();
function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
       mapData_new[col]=new Array();
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            mapData_new[col][row]=mapData[col][row];
            console.log(mapData_new[col][row]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            

            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;

}

function onTileClick(tile: editor.Tile) {
    console.log(tile);
    if(mapData_new[tile.ownedRow][tile.ownedCol]==1){
        tile.setWalkable(0);
        mapData_new[tile.ownedRow][tile.ownedCol]=0;

       
    }else{
         tile.setWalkable(1);
         mapData_new[tile.ownedRow][tile.ownedCol]=1;
    }
}

 var button = new render.DisplayObjectContainer();
 button.width=50;
 button.height=30;
    var rect = new render.Rect();
    rect.width =50;
    rect.height = 30;
    rect.color = '#086fbe'
    button.addChild(rect);


    var text = new render.TextField();
    text.x = 3;
    text.y = 5;
    text.text = '保存';
    button.addChild(text);

var onButtonClick = () => {
    
    writeFile(mapData_new);
    alert("保存成功");
    
}

var mapData = readFile();
writeFile(mapData);

var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
eventCore.register(button,events.displayObjectRectHitTest,onButtonClick);

var editor = createMapEditor();
renderCore.start(editor);
var world_button = new render.DisplayObjectContainer();
world_button.addChild(button);
world_button.addChild(editor);
editor.y=40;


 var renderCore = new render.RenderCore();
    renderCore.start(world_button);