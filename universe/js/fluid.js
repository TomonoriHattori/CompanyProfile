let count = 35;

let radius = [ 0.1, 100 ];
if(!isMobile()){
  radius = [ 0.1*1.5, 100*1.8 ];
}
const rand = function(min, max) {
  return Math.random() * ( max - min ) + min;
}


let colorsOrigin = [ '#ba55d3', "#ba55d3" ];
let colors = [ '#ba55d3', "#ba55d3" ];

let redColors = [ '#d41c78', "#a1144f" ];

let blueColors = [ '#202bc5', '#873dcc' ];

let targetColors = colors;
var explanationFixArea = $(".explanation__fix_area")
var fixTitle = $(".explanation__fix_area > .fix__title")
window.addEventListener('scroll', function() {
  let y1 =explanationFixArea[0].getBoundingClientRect().top
  if(window.scrollY > 3800) {
    //colors = blueColors;
    targetColors = blueColors
  } else if(window.scrollY < 2000) {
    //colors = colorsOrigin;
    targetColors = colorsOrigin
  }else   if(y1 < 40) { 
    //colors = redColors;
    targetColors = redColors
  }
});

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d' , { alpha: false });

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'lighter';
});

ctx.clearRect( 0, 0, canvas.width, canvas.height );
ctx.globalCompositeOperation = 'lighter';

let grd = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
grd.addColorStop(0, '#000');
grd.addColorStop(1, '#000');
ctx.fillStyle = grd;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let items = [];

while(count--) {

    let thisRadius = rand( radius[0], radius[1] );
    let blur = 100;
    let x = rand( -100, canvas.width + 100 );
    let y = rand( -100, canvas.height + 100 );
    //let colorIndex = Math.floor(rand(0, 199) / 100);
    let colorA = colors[0];
    let colorB = colors[1];
    
    ctx.beginPath();
    let grd = ctx.createLinearGradient(x - thisRadius / 2, y - thisRadius / 2, x + thisRadius, y + thisRadius);
  
    grd.addColorStop(0, colorA);
    grd.addColorStop(1, colorB);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.arc( x, y, thisRadius, 0, Math.PI * 2 );
    ctx.closePath();
    
    let directionX = Math.round(rand(-99, 99) / 100);
    let directionY = Math.round(rand(-99, 99) / 100);
  
    items.push({
      x: x,
      y: y,
      blur: blur,
      radius: thisRadius,
      initialXDirection: directionX,
      initialYDirection: directionY,
      initialBlurDirection: directionX,
      colorA: colorA,
      colorB: colorB,
      gradient: [ x - thisRadius / 2, y - thisRadius / 2, x + thisRadius, y + thisRadius ],
    });
}
let frame = 0;

let lerpFactor = 0.1;

function changeCanvas() {

  colors[0] = colorToString(lerpColor(hexToRgb(colors[0]),hexToRgb(targetColors[0]), lerpFactor));
  colors[1] = colorToString(lerpColor(hexToRgb(colors[1]),hexToRgb(targetColors[1]), lerpFactor));

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let adjX = 2;
  let adjY = 2;
  items.forEach(function(item) {
    
      if(item.x + (item.initialXDirection * adjX) >= canvas.width && item.initialXDirection !== 0 || item.x + (item.initialXDirection * adjX) <= 0 && item.initialXDirection !== 0) {
        item.initialXDirection = item.initialXDirection * -1;
      }
      if(item.y + (item.initialYDirection * adjY) >= canvas.height && item.initialYDirection !== 0 || item.y + (item.initialYDirection * adjY) <= 0 && item.initialYDirection !== 0) {
        item.initialYDirection = item.initialYDirection * -1;
      }

      item.initialBlurDirection *= -1;
    
      item.x += (item.initialXDirection * adjX);
      item.y += (item.initialYDirection * adjY);

      ctx.beginPath();
      let grd = ctx.createLinearGradient(item.gradient[0], item.gradient[1], item.gradient[2], item.gradient[3]);
      grd.addColorStop(0, colors[0]);
      grd.addColorStop(1, colors[1]);
      ctx.fillStyle = grd;
      ctx.arc( item.x, item.y, item.radius, 0, Math.PI * 2 );
      ctx.fill();
      ctx.closePath();
    
  });
  window.requestAnimationFrame(changeCanvas);
  
}

window.requestAnimationFrame(changeCanvas);


function hexToRgb(hexString) {
  let hex = hexString.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return { r: r, g: g, b: b };
}

//色の線形補完
function lerpColor(color1, color2, factor) {
  return {
    r: Math.round(color1.r + (color2.r - color1.r) * factor),
    g: Math.round(color1.g + (color2.g - color1.g) * factor),
    b: Math.round(color1.b + (color2.b - color1.b) * factor)
  };
}

//16進数値に変換
function colorToString(color) {
  // 各RGB成分を16進数に変換し、必要に応じてゼロ埋めする
  let rHex = color.r.toString(16).padStart(2, '0');
  let gHex = color.g.toString(16).padStart(2, '0');
  let bHex = color.b.toString(16).padStart(2, '0');
  
  // 変換された16進数値を組み合わせて#RRGGBB形式で返す
  return `#${rHex}${gHex}${bHex}`;
}
