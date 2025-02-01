// Smoke Particle Animation
const canvas = document.getElementById('smokeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

let particlesArray = [];

function init() {
  particlesArray = [];
  const numberOfParticles = 100;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle(
      canvas.width / 2,
      canvas.height / 2
    ));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-title', {
  duration: 1.5,
  opacity: 0,
  y: 50,
  ease: 'power3.out'
});

gsap.from('.hero-subtitle', {
  duration: 1.5,
  opacity: 0,
  y: 50,
  delay: 0.5,
  ease: 'power3.out'
});

gsap.from('.cta-buttons', {
  duration: 1,
  opacity: 0,
  y: 50,
  delay: 1,
  ease: 'power3.out'
});

// Features Section Animation
gsap.from('.feature-card', {
  scrollTrigger: {
    trigger: '.features',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  duration: 1,
  opacity: 0,
  y: 50,
  stagger: 0.2,
  ease: 'power3.out'
});

// Circuit Node Animation
const circuitNodes = document.querySelectorAll('.circuit-node');
circuitNodes.forEach(node => {
  gsap.to(node, {
    duration: 2,
    scale: 1.2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
});

// Text shuffle effect for navbar links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  const originalText = link.textContent;
  
  link.addEventListener('mouseenter', () => {
    let intervalCount = 0;
    const shuffleInterval = setInterval(() => {
      if (intervalCount >= 10) {
        clearInterval(shuffleInterval);
        link.textContent = originalText;
        return;
      }
      
      link.textContent = originalText
        .split('')
        .map(char => {
          if (Math.random() > 0.5) {
            // Random uppercase/lowercase
            return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
          }
          // Random alphanumeric character
          return Math.random() > 0.5 ? getRandomChar() : char;
        })
        .join('');
      
      intervalCount++;
    }, 50);
  });
});

function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}
