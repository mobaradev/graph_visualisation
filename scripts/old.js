
//const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
//
// canvas.width  = 800;
// canvas.height = 600;
//
// ctx.fillStyle = 'rgb(100, 110, 220)';
// ctx.fillRect(10, 10, 50, 50);
// ctx.fil
document.getElementById("canvas").width = 1200;
document.getElementById("canvas").height = 900;

const stage = new createjs.Stage("canvas");

let circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(0, 0, 50);
circle.x = 150;
circle.y = 100;
stage.addChild(circle);

circle.y = 300;
stage.addChild(circle);
stage.update();