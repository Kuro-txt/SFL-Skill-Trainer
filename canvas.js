const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Spore {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.speedY = -(Math.random() * 0.35 + 0.1);
    this.alpha = Math.random() * 0.6 + 0.2;
    this.hue = Math.random() > 0.4 ? 42 : 160;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y < 0 || this.x < 0 || this.x > canvas.width) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = `hsl(${this.hue}, 90%, 50%)`;
    ctx.fill();
  }
}

for (let i = 0; i < 45; i++) particles.push(new Spore());

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(loop);
}
loop();
