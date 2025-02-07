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

// Define cities array outside the function so it can be modified
let cities = [
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' }
];

function updateClocks() {
  const clockContainers = document.querySelectorAll('.clock-container');
  
  clockContainers.forEach((container, index) => {
    if (index >= cities.length) return;
    
    const now = new Date().toLocaleString('en-US', { timeZone: cities[index].timezone });
    const time = new Date(now);
    
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    // Update analog clock hands
    const hourHand = container.querySelector('.hour-hand');
    const minuteHand = container.querySelector('.minute-hand');
    const secondHand = container.querySelector('.second-hand');
    
    const hourDegrees = ((hours % 12) / 12) * 360 + ((minutes / 60) * 30);
    const minuteDegrees = (minutes / 60) * 360;
    const secondDegrees = (seconds / 60) * 360;
    
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    
    // Update digital time display
    const timeString = time.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    container.querySelector('.time-display').textContent = timeString;
  });
}

// Update clocks every second
setInterval(updateClocks, 1000);
updateClocks(); // Initial update

function createClockElement(timezone) {
  const container = document.createElement('div');
  container.className = 'clock-container';
  
  container.innerHTML = `
    <div class="clock">
      <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand minute-hand"></div>
        <div class="hand second-hand"></div>
        <div class="center-dot"></div>
      </div>
    </div>
    <div class="city-name">${timezone.split('/')[1].replace('_', ' ')}</div>
    <div class="time-display"></div>
  `;
  
  return container;
}

document.getElementById('add-clock').addEventListener('click', () => {
  const select = document.getElementById('timezone-select');
  const selectedTimezone = select.value;
  
  if (selectedTimezone) {
    const clocksContainer = document.querySelector('.timezone-clocks');
    const controlsContainer = document.querySelector('.clock-controls');
    const newClock = createClockElement(selectedTimezone);
    
    // Insert the new clock before the controls
    clocksContainer.insertBefore(newClock, controlsContainer);
    
    // Add the new timezone to the cities array
    cities.push({ name: selectedTimezone.split('/')[1], timezone: selectedTimezone });
    
    // Reset the select
    select.value = '';
    
    // Update all clocks
    updateClocks();
  }
});

// Add this after your existing cities array
const allTimezones = [
  { zone: 'Africa/Abidjan', label: 'Abidjan, Ivory Coast' },
  { zone: 'Africa/Accra', label: 'Accra, Ghana' },
  { zone: 'Africa/Addis_Ababa', label: 'Addis Ababa, Ethiopia' },
  { zone: 'Africa/Algiers', label: 'Algiers, Algeria' },
  { zone: 'Africa/Cairo', label: 'Cairo, Egypt' },
  { zone: 'Africa/Casablanca', label: 'Casablanca, Morocco' },
  { zone: 'Africa/Johannesburg', label: 'Johannesburg, South Africa' },
  { zone: 'Africa/Lagos', label: 'Lagos, Nigeria' },
  { zone: 'Africa/Nairobi', label: 'Nairobi, Kenya' },
  { zone: 'America/Anchorage', label: 'Anchorage, USA' },
  { zone: 'America/Bogota', label: 'Bogota, Colombia' },
  { zone: 'America/Buenos_Aires', label: 'Buenos Aires, Argentina' },
  { zone: 'America/Caracas', label: 'Caracas, Venezuela' },
  { zone: 'America/Chicago', label: 'Chicago, USA' },
  { zone: 'America/Denver', label: 'Denver, USA' },
  { zone: 'America/Halifax', label: 'Halifax, Canada' },
  { zone: 'America/Los_Angeles', label: 'Los Angeles, USA' },
  { zone: 'America/Mexico_City', label: 'Mexico City, Mexico' },
  { zone: 'America/New_York', label: 'New York, USA' },
  { zone: 'America/Santiago', label: 'Santiago, Chile' },
  { zone: 'America/Sao_Paulo', label: 'São Paulo, Brazil' },
  { zone: 'America/Toronto', label: 'Toronto, Canada' },
  { zone: 'America/Vancouver', label: 'Vancouver, Canada' },
  { zone: 'Asia/Baghdad', label: 'Baghdad, Iraq' },
  { zone: 'Asia/Bangkok', label: 'Bangkok, Thailand' },
  { zone: 'Asia/Dubai', label: 'Dubai, UAE' },
  { zone: 'Asia/Hong_Kong', label: 'Hong Kong' },
  { zone: 'Asia/Istanbul', label: 'Istanbul, Turkey' },
  { zone: 'Asia/Jakarta', label: 'Jakarta, Indonesia' },
  { zone: 'Asia/Jerusalem', label: 'Jerusalem, Israel' },
  { zone: 'Asia/Kolkata', label: 'Mumbai/Kolkata, India' },
  { zone: 'Asia/Kuwait', label: 'Kuwait City, Kuwait' },
  { zone: 'Asia/Manila', label: 'Manila, Philippines' },
  { zone: 'Asia/Seoul', label: 'Seoul, South Korea' },
  { zone: 'Asia/Shanghai', label: 'Shanghai, China' },
  { zone: 'Asia/Singapore', label: 'Singapore' },
  { zone: 'Asia/Tokyo', label: 'Tokyo, Japan' },
  { zone: 'Australia/Adelaide', label: 'Adelaide, Australia' },
  { zone: 'Australia/Brisbane', label: 'Brisbane, Australia' },
  { zone: 'Australia/Melbourne', label: 'Melbourne, Australia' },
  { zone: 'Australia/Perth', label: 'Perth, Australia' },
  { zone: 'Australia/Sydney', label: 'Sydney, Australia' },
  { zone: 'Europe/Amsterdam', label: 'Amsterdam, Netherlands' },
  { zone: 'Europe/Athens', label: 'Athens, Greece' },
  { zone: 'Europe/Berlin', label: 'Berlin, Germany' },
  { zone: 'Europe/Brussels', label: 'Brussels, Belgium' },
  { zone: 'Europe/Budapest', label: 'Budapest, Hungary' },
  { zone: 'Europe/Copenhagen', label: 'Copenhagen, Denmark' },
  { zone: 'Europe/Dublin', label: 'Dublin, Ireland' },
  { zone: 'Europe/Helsinki', label: 'Helsinki, Finland' },
  { zone: 'Europe/Lisbon', label: 'Lisbon, Portugal' },
  { zone: 'Europe/London', label: 'London, UK' },
  { zone: 'Europe/Madrid', label: 'Madrid, Spain' },
  { zone: 'Europe/Moscow', label: 'Moscow, Russia' },
  { zone: 'Europe/Oslo', label: 'Oslo, Norway' },
  { zone: 'Europe/Paris', label: 'Paris, France' },
  { zone: 'Europe/Prague', label: 'Prague, Czech Republic' },
  { zone: 'Europe/Rome', label: 'Rome, Italy' },
  { zone: 'Europe/Stockholm', label: 'Stockholm, Sweden' },
  { zone: 'Europe/Vienna', label: 'Vienna, Austria' },
  { zone: 'Europe/Warsaw', label: 'Warsaw, Poland' },
  { zone: 'Europe/Zurich', label: 'Zurich, Switzerland' },
  { zone: 'Pacific/Auckland', label: 'Auckland, New Zealand' },
  { zone: 'Pacific/Fiji', label: 'Fiji' },
  { zone: 'Pacific/Honolulu', label: 'Honolulu, USA' },
  { zone: 'Pacific/Sydney', label: 'Sydney, Australia' }
];

// Add this after your updateClocks function
function populateTimezoneSelect(searchTerm = '') {
  const select = document.getElementById('timezone-select');
  select.innerHTML = '<option value="">Select a timezone...</option>';
  
  const filteredTimezones = allTimezones.filter(tz => 
    tz.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  filteredTimezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz.zone;
    option.textContent = tz.label;
    select.appendChild(option);
  });
}

// Initialize the timezone select
document.addEventListener('DOMContentLoaded', () => {
  populateTimezoneSelect();
  
  // Add search functionality
  const searchInput = document.getElementById('timezone-search');
  searchInput.addEventListener('input', (e) => {
    populateTimezoneSelect(e.target.value);
  });
});
