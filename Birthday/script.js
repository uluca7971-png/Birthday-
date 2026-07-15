const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
const wishBtn = document.getElementById("wishBtn");
const wishModal = document.getElementById("wishModal");
const submitWishBtn = document.getElementById("submitWishBtn");
const wishInput = document.getElementById("wishInput");
const cardMessage = document.getElementById("cardMessage");
const flames = document.querySelectorAll(".flame");

let width, height, pieces;
const colors = ["#ff6b9d", "#ffd93d", "#6bcbff", "#ffffff", "#c77dff", "#ff85a2", "#ffb347"];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createPiece(extra = {}) {
  return {
    x: Math.random() * width,
    y: Math.random() * height - height,
    size: Math.random() * 9 + 4,
    speedY: Math.random() * 2.2 + 1.4,
    speedX: Math.random() * 1.4 - 0.7,
    rotation: Math.random() * 360,
    spin: Math.random() * 5 - 2.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.45 ? "rect" : "circle",
    ...extra
  };
}

function initConfetti(count = 140) {
  pieces = Array.from({ length: count }, () => createPiece());
}

function drawPiece(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.fillStyle = p.color;

  if (p.shape === "rect") {
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
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

    if (p.y > height + 30) {
      Object.assign(p, createPiece({ y: -20 }));
    }

    drawPiece(p);
  }

  requestAnimationFrame(update);
}

function burstConfetti(amount = 140) {
  for (let i = 0; i < amount; i++) {
    pieces.push(
      createPiece({
        x: width / 2 + (Math.random() * 200 - 100),
        y: height / 2,
        speedY: Math.random() * -8 - 3,
        speedX: Math.random() * 10 - 5
      })
    );
  }
}

wishBtn.addEventListener("click", () => {
  wishModal.classList.add("active");
});

submitWishBtn.addEventListener("click", () => {
  const wish = wishInput.value.trim();
  
  wishModal.classList.remove("active");
  
  flames.forEach(flame => {
    flame.classList.add("extinguished");
  });
  
  burstConfetti(220);
  
  if (wish) {
    cardMessage.innerHTML = `✨ Your wish has been sent to the stars: <br><strong>"${wish}"</strong><br><br>May your year ahead be absolutely magical! 💖`;
  } else {
    cardMessage.innerHTML = `✨ *Woosh!* The candles are blown out! ✨<br><br>May all your quiet hopes and dreams find their way to you this year! 💖`;
  }
  
  wishBtn.outerHTML = `<div class="wished-note">🎂 Happy Birthday, Kiki! 🎂</div>`;
});

window.addEventListener("resize", resize);
resize();
initConfetti();
update();
