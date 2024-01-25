// alert("a");
// 正能量开关
function oAndOff() {
	if (document.getElementById('kaibaila').style.visibility == "hidden") {
		document.getElementById('kaibaila').style.visibility = "visible";
		document.getElementById('zheng').style.display = "none"
		document.getElementById('yoshi').innerHTML="空洞的口号";
	} else {
		document.getElementById('kaibaila').style.visibility = "hidden";
		document.getElementById('zheng').style.display = "block";
		document.getElementById('yoshi').innerHTML="不如意的现实";
	}
}
// 尝试绘图
const mycanvas = document.getElementById("myCanvas");
// mycanvas.getContext('2d').fillText("aba", 5, 10);


// function draw() {
// 	var c = document.getElementById("myCanvas");
// 	var ctx = c.getContext("2d");
// 	var gra = ctx.createLinearGradient(0, 0, 200, 0);
// 	gra.addColorStop(0, "red");
// 	gra.addColorStop(1, "white");
// 	ctx.fillStyle = gra;
// 	ctx.fillRect(20, 20, 100, 50);
// }

// // 尝试控制bgm播放

// function audioplayer1() {
// 	var bgm = document.getElementById("bgmSoF");
// 	if (bgm.paused) {
// 		bgm.play();
// 	} else {
// 		bgm.pause();
// 	}
// }

// // 
// document.getElementById("button1").style.backgroundImage = "url(img/taimai.jpg)";

// function changebgi() {
// 	const button = document.getElementById("button1");
// 	button.style.backgroundImage = "url(img/siha.jpg)";
// }
// 鼠标轨迹
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var RADIUS = 70;
var QUANTITY = 25;
var RADIUS_SCALE = 1;
var RADIUS_SCALE_MIN = 1;
var RADIUS_SCALE_MAX = 1.5;
var canvas;
var context;
var particles;
var mouseX = SCREEN_WIDTH * 0.5;
var mouseY = SCREEN_HEIGHT * 0.5;
var mouseIsDown = false;

function init() {

	canvas = document.getElementById('mouseCanvas');
	if (canvas && canvas.getContext) {
		context = canvas.getContext('2d');
		window.addEventListener('mousemove', documentMouseMoveHandler, false);
		window.addEventListener('mousedown', documentMouseDownHandler, false);
		window.addEventListener('mouseup', documentMouseUpHandler, false);
		// document.addEventListener('touchstart', documentTouchStartHandler, false);
		// document.addEventListener('touchmove', documentTouchMoveHandler, false);
		window.addEventListener('resize', windowResizeHandler, false);
		createParticles();
		windowResizeHandler();
		setInterval(loop, 1000 / 60);

		init2();




	}


}

function createParticles() {
	particles = [];
	for (var i = 0; i < QUANTITY; i++) {
		var particle = {
			size: 1,
			position: {
				x: mouseX,
				y: mouseY
			},
			offset: {
				x: 0,
				y: 0
			},
			shift: {
				x: mouseX,
				y: mouseY
			},
			speed: 0.01 + Math.random() * 0.04,
			targetSize: 1,
			fillColor: '#' + (Math.random() * 0x904040 + 0xaaaaaa | 0).toString(16),
			orbit: RADIUS * .5 + (RADIUS * .5 * Math.random())
		};
		particles.push(particle)
	}
}

function documentMouseMoveHandler(event) {
	mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
	mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5
}

function documentMouseDownHandler(event) {
	mouseIsDown = true
}

function documentMouseUpHandler(event) {
	mouseIsDown = false
}

// function documentTouchStartHandler(event) {
// 	if (event.touches.length == 1) {
// 		event.preventDefault();
// 		mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
// 		mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5
// 	}
// }

// function documentTouchMoveHandler(event) {
// 	if (event.touches.length == 1) {
// 		event.preventDefault();
// 		mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
// 		mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5
// 	}
// }

function windowResizeHandler() {
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT
}

function loop() {
	if (mouseIsDown) {
		RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * (0.02)
	} else {
		RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * (0.02)
	}
	RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);
	context.fillStyle = 'rgba(0,0,0,0.05)';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	for (i = 0, len = particles.length; i < len; i++) {
		animate();
		var particle = particles[i];
		var lp = {
			x: particle.position.x,
			y: particle.position.y
		};
		particle.offset.x += particle.speed;
		particle.offset.y += particle.speed;
		particle.shift.x += (mouseX - particle.shift.x) * (particle.speed);
		particle.shift.y += (mouseY - particle.shift.y) * (particle.speed);
		particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
		particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);
		particle.position.x = Math.max(Math.min(particle.position.x, SCREEN_WIDTH), 0);
		particle.position.y = Math.max(Math.min(particle.position.y, SCREEN_HEIGHT), 0);
		particle.size += (particle.targetSize - particle.size) * 0.01;
		if (Math.round(particle.size) == Math.round(particle.targetSize)) {
			particle.targetSize = 1 + Math.random() * 2
		}
		context.beginPath();
		context.fillStyle = particle.fillColor;
		context.strokeStyle = particle.fillColor;
		context.lineWidth = particle.size;
		context.moveTo(lp.x, lp.y);
		context.lineTo(particle.position.x, particle.position.y);
		context.stroke();
		context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
		context.fill()
	}

}

const ctx = mouseCanvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;



// 获取画布100*100区域的像素点信息
const imageData = ctx.getImageData(0, 0, 100, 100);
// 记录鼠标位置
const mouse = {
	x: null,
	y: null,
	radius: 150
};

window.addEventListener("mousemove", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;

});

class Particle1 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.baseX = x;
		this.baseY = y;
		this.size = 3;
		this.density = Math.random() * 50 + 5;
	}
	draw() {
		ctx.fillStyle = "#ffffff";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();

	}
	update() {
		const dx = mouse.x - this.x;
		const dy = mouse.y - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy)
		const maxDistance = mouse.radius;

		const force = (maxDistance - distance) / distance;
		const forceDirectionX = dx / distance;
		const forceDirectionY = dy / distance;
		const directionX = forceDirectionX * force * this.density;
		const directionY = forceDirectionY * force * this.density;


		if (distance < maxDistance) {
			// this.size=10;
			this.x -= directionX;
			this.y -= directionY;

		} else {
			if (this.x !== this.baseX) {
				const dx = this.x - this.baseX;
				this.x -= dx / 10;
			}
			if (this.y !== this.baseY) {
				const dy = this.y - this.baseY;
				this.y -= dy / 10;
			}
		}
	}
}




let ParticleList = [];

function init2() {
	// Array.from({
	// 	length: 300
	// }).forEach(() => {
	// 	ParticleList.push(new Particle(
	// 		canvas.width * math.random(),
	// 		canvas.height * math.random()
	// 	))
	// })
	// imageDate=>{width,height,date}
	// date=>{r,g,b,a}
	ctx.fillStyle = "#003bff";
	ctx.font = "normal normal 800 16px 宋体";
	ctx.fillText("测试", 100, 40);
	for (let y = 0; y < imageData.height; y++) {
		for (let x = 0; x < imageData.width; x++) {
			if (imageData.data[y * 4 * imageData.width + x * 4 + 3] > 100) {
				const p = new Particles(x * 20, y * 20);
				ParticleList.push(p);
			}
		}
	}
}
// init2();



function animate() {
	// ctx.clearRect(0, 0, mouseCanvas.width, mouseCanvas.height);
	ParticleList.forEach((p) => {
		p.update();
		p.draw();
	});
	// connect();
	// requestAnimationFrame(animate);

}
// animate();

function connect() {
	let o = 1;

	for (let a = 0; a < ParticleList.length; a++) {
		for (let b = 0; b < ParticleList.length; b++) {
			const dx = ParticleList[a].x - ParticleList[b].x;
			const dy = ParticleList[a].y - ParticleList[b].y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			o = 1 - distance / 50;
			ctx.strokeStyle = "rgba(255,255,255," + o + ")";
			if (distance < 30) {
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(ParticleList[a].x, ParticleList[a].y);
				ctx.lineTo(ParticleList[b].x, ParticleList[b].y);
				ctx.stroke();

			}
		}
	}
}

// 更换图片
var j = 0;

var mcimg = [];

function read() {
	var mc2 = "img/mc2.jpg";
	mcimg.push(mc2);
	var mc03 = "img/3.jpg";
	mcimg.push(mc03);
	var mc7 = "img/7.jpg";
	mcimg.push(mc7);
	var mc08 = "img/8.jpg";
	mcimg.push(mc08);
}

function alternative() {
	document.getElementById("img1").src = mcimg[j];
	j++;
	j %= mcimg.length;
}


// 
window.onload = function() {
	document.getElementById('mouseCanvas').style =
		"width:100%;height:100%;position: fixed;top: 0;left: 0;z-index: -999;";
	document.getElementsByTagName('html')[0].style = 'margin:0;width:100%;height:100%;';
	document.getElementsByTagName('body')[0].style = 'margin:0;width:100%;height:100%;';
	read();

	setInterval(alternative, 3000);
	// 
	init();

}
