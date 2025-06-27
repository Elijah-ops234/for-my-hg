// Play music button
const playBtn = document.getElementById('playMusic');
const music = document.getElementById('bg-music');
playBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    playBtn.textContent = 'Pause Music 🎶';
  } else {
    music.pause();
    playBtn.textContent = 'Play Music 🎶';
  }
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.animationPlayState = 'running';
    }
  });
});

// Floating Hearts
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createHeart() {
  hearts.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.5 + 0.5
  });
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, i) => {
    ctx.fillStyle = `rgba(255, 0, 100, ${heart.opacity})`;
    ctx.beginPath();
    ctx.moveTo(heart.x, heart.y);
    ctx.bezierCurveTo(
      heart.x - heart.size / 2, heart.y - heart.size / 2,
      heart.x - heart.size, heart.y + heart.size / 2,
      heart.x, heart.y + heart.size
    );
    ctx.bezierCurveTo(
      heart.x + heart.size, heart.y + heart.size / 2,
      heart.x + heart.size / 2, heart.y - heart.size / 2,
      heart.x, heart.y
    );
    ctx.fill();
    heart.y -= heart.speed;
    if (heart.y < -20) hearts.splice(i, 1);
  });
}

function animate() {
  drawHearts();
  if (Math.random() < 0.1) createHeart();
  requestAnimationFrame(animate);
}

animate();