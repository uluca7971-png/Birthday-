const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
const wishBtn = document.getElementById("wishBtn");

let width, height, pieces;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createPiece() {
  const colors = ["#ff6b9d", "#ffd93d", "#6bcbff", "#fff", "#c77dff", "#ff85a2"];
  return {
    x: Math.random() * width,
    y: Math.random() * height - height,
    size: Math.random() * 8 + 4,
    speedY: Math.random() * 2 + 1.5,
    speedX: Math.random() * 1.5 - 0.75,
    rotation: Math.random() * 360,
    spin: Math.random() * 4 - 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.5 ? "rect" : "circle"
  };
}

function initConfetti(count = 120) {
  pieces = Array.from({ length: count }, createPiece);
}

function drawPiece(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.fillStyle = p.color;

  if (p.shape === "rect") {
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function update() {
  ctx.clearRect(0, 0, width, height);

  for (const p of pieces) {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.spin;

    if (p.y > height + 20) {
      p.y = -20;
      p.x = Math.random() * width;
    }

    drawPiece(p);
  }

  requestAnimationFrame(update);
}

function burstConfetti(amount = 80) {
  for (let i = 0; i < amount; i++) {
    const p = createPiece();
    p.x = width / 2 + (Math.random() * 200 - 100);
    p.y = height / 2;
    p.speedY = Math.random() * -6 - 2;
    p.speedX = Math.random() * 6 - 3;
    pieces.push(p);
  }
}

window.addEventListener("resize", resize);
wishBtn.addEventListener("click", () => burstConfetti(100));

resize();
initConfetti();
update();