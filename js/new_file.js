const canvas = document.getElementById("aCanvas");
const mouse = {
	x: null,
	y: null,
	lx: null,
	ly: null,
	radius: 150 + 150 * Math.random()
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
canvas.getContext('2d').fillStyle = "rgba(0,0,0,0.5)";
canvas.getContext('2d').fill();


const radius = 200;
var particleNum = 15;
var particleList = [];



function draw() {
	
    window.addEventListener("mousemove", mouseMoveListener, false);
	window.addEventListener('resize', reset());
	createParticle();
	for (var i = 0; i < particleList.length; i++) {
		particleList[i].angle += particleList[i].speed;
		particleList[i].varietyX += (mouse.x - particleList[i].varietyX) * particleList[i].speed;
		particleList[i].varietyY += (mouse.y - particleList[i].varietyY) * particleList[i].speed;
		particleList[i].lx = particleList[i].x;
		particleList[i].ly = particleList[i].y;
		particleList[i].x = particleList[i].varietyX + Math.cos(i + particleList[i].angle) * particleList[i].radius;
		particleList[i].y = particleList[i].varietyY + Math.sin(i + particleList[i].angle) * particleList[i].radius;
		canvas.getContext('2d').beginPath();
		canvas.getContext('2d').fillStyle = particleList[i].fillColor;
		canvas.getContext('2d').strokeStyle = particleList[i].fillColor;

		canvas.getContext('2d').moveTo(particleList[i].lx, particleList[i].ly);
		canvas.getContext('2d').lineTo(particleList[i].x, particleList[i].y);
		canvas.getContext('2d').stroke();
		// canvas.getContext('2d').arc(particleList[i].x, particleList[i].y, particleList[i].size, 0, Math.PI * 2,
		// 	true);
		// canvas.getContext('2d').fill();
		canvas.getContext('2d').closePath();
	}
	
	requestAnimationFrame(draw);
}

function mouseMoveListener(e) {
	mouse.x = e.x;
	mouse.y = e.y;
}



function reset() {
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	canvas.getContext('2d').fillStyle = 'black';
	canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
}

function createParticle() {

	for (var i = 0; i < particleNum; i++) {
		var particle = {
			fillColor: '#' + (Math.random() * 0x504040 + 0xaaaaaa | 0).toString(16),
			size: 2 + 0.5*Math.random(),
			x: mouse.x,
			y: mouse.y,
			lx: mouse.x,
			ly: mouse.y,
			varietyX: mouse.x,
			varietyY: mouse.y,
			speed: 0.01 + Math.random() * 0.04,
			angle: 0,
			radius: 150 + 100 * Math.random(),
		};
		particleList.push(particle);
	}
}

draw();