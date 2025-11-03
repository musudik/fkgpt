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

// Keep the existing adjectives and nouns arrays
const adjectives = [
  'Cosmic', 'Quantum', 'Neon', 'Cyber', 'Digital', 'Crystal', 'Solar', 'Lunar',
  'Stellar', 'Astral', 'Nebula', 'Plasma', 'Vector', 'Binary', 'Neural', 'Fusion',
  'Photon', 'Quantum', 'Zenith', 'Echo', 'Pulse', 'Void', 'Nova', 'Apex', 'Prime',
  'Galactic', 'Celestial', 'Radiant', 'Horizon', 'Ethereal', 'Hyper', 'Vortex', 'Chrome',
  'Psycho', 'Arcane', 'Holographic', 'Magneto', 'Dynamic', 'Electric', 'Sonic', 'Warp',
  'Fractal', 'Glacial', 'Mirage', 'Titanium', 'Infernal', 'Omega', 'Ultra', 'Cyborg',
  'Prismatic', 'Solaris', 'Chroma', 'Eon', 'Oblivion', 'Terra', 'Graviton', 'Hypernova',
  'Pyro', 'Nebular', 'Eclipse', 'Monolithic', 'Spectral', 'Pulsar', 'Aurora', 'Blazing',
  'Turbulent', 'Resonant', 'Luminous', 'Temporal', 'Singular', 'Empyreal', 'Harmonic',
  'Titan', 'Celestine', 'Subzero', 'Kinetic', 'Echoing', 'Hallowed', 'Exalted', 'Stormborne',
  'Shimmering', 'Wraithlike', 'Solarwind', 'Halcyon', 'Illuminated', 'Omnipresent', 'Perpetual',
  'Lucid', 'Eldritch', 'Obsidian', 'Etherbound', 'Astronomic', 'Nocturnal', 'Zephyr', 'Eruptive',
  'Cyclonic', 'Stygian', 'Penumbral', 'Thundering', 'Radiative', 'Temporal', 'Futuristic', 'Voidborn',
  'Empowered', 'Glistening', 'Augmented', 'Chromatic', 'Venerated', 'Omniscient', 'Sublime', 'Galvanic',
  'Blitz', 'Superluminal', 'Transcendent', 'Synaptic', 'Volatile', 'Dissonant', 'Etheric', 'Encrypted'
];

const nouns = [
  'Phoenix', 'Matrix', 'Nexus', 'Vector', 'Cipher', 'Prism', 'Vertex', 'Core',
  'Spark', 'Wave', 'Pulse', 'Node', 'Grid', 'Sphere', 'Helix', 'Echo', 'Flux',
  'Blade', 'Storm', 'Shadow', 'Light', 'Dawn', 'Drift', 'Path', 'Edge',
  'Beacon', 'Galaxy', 'Quasar', 'Horizon', 'Comet', 'Satellite', 'Vortex', 'Circuit',
  'Warp', 'Helium', 'Nova', 'Astro', 'Pluton', 'Orbit', 'Solarflare', 'Equinox',
  'Binary', 'Algorithm', 'Code', 'Glitch', 'Firewall', 'Neutron', 'Aether', 'Stratos',
  'Chrono', 'Eon', 'Havoc', 'Titan', 'Nebulae', 'Quantumgate', 'Zephyr', 'Singularity',
  'Infinity', 'Tesseract', 'Blackhole', 'Solarwind', 'Aurora', 'Supernova', 'Graviton',
  'Starlight', 'Radiance', 'Sentinel', 'Parallax', 'Mnemonic', 'Exosphere', 'Abyss',
  'EventHorizon', 'Asteroid', 'Propulsion', 'Omniverse', 'Tesla', 'Empyrean', 'Polaris',
  'Oblivion', 'Resonance', 'Pioneer', 'Hyperdrive', 'Dimensional', 'Shockwave', 'Meteor',
  'NeuralNet', 'Eclipse', 'Elysium', 'Arcade', 'Ether', 'Zodiac', 'Subsonic', 'Machina',
  'Fission', 'Draconis', 'Ignition', 'Chronos', 'Spectrum', 'Crypton', 'Monolith', 'Synthetica',
  'Obsidian', 'Mindstorm', 'Aurorae', 'NeonFlux', 'Hypercube', 'Cybernetic', 'Omicron', 'Darkstar',
  'Pandora', 'Celestia', 'Nebular', 'Enigma', 'Galvanic', 'Mecha', 'Voidheart', 'Solstice'
];


function generateCustomName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
}

function generateRandomName() {
  const generatedName = document.getElementById('generatedName');
  generatedName.textContent = 'Generating...';
  
  // Add loading animation
  generatedName.style.opacity = '0.7';

  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      const user = data.results[0];
      const names = [
        // API generated name
        `${user.name.first} ${user.name.last}`,
        // Custom generated name
        generateCustomName()
      ];
      
      // Randomly choose between API name and custom name
      const selectedName = names[Math.floor(Math.random() * names.length)];
      
      // Update display with animation
      generatedName.textContent = selectedName;
      generatedName.style.opacity = '1';
      
      // Add glow animation
      generatedName.classList.remove('animate');
      void generatedName.offsetWidth; // Trigger reflow
      generatedName.classList.add('animate');
    },
    error: function() {
      // Fallback to custom name generator if API fails
      const fallbackName = generateCustomName();
      generatedName.textContent = fallbackName;
      generatedName.style.opacity = '1';
      
      // Add glow animation
      generatedName.classList.remove('animate');
      void generatedName.offsetWidth;
      generatedName.classList.add('animate');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  generateBtn.addEventListener('click', generateRandomName);
});

// Update chat widget initialization
function initializeChatWidget() {
  const chatIcon = document.querySelector('.chat-bot-icon');
  const chatWidget = document.getElementById('chatWidget');
  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendMessage');
  const chatMessages = document.getElementById('chatMessages');
  const minimizeBtn = document.getElementById('minimizeChat');

  // Modified sendMessage function to work on all devices
  async function sendMessage(event) {
    // If event exists, prevent default behavior
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const message = chatInput.value.trim();
    if (message === '') return;

    try {
      // Add user message
      const userMessageDiv = document.createElement('div');
      userMessageDiv.className = 'message user';
      userMessageDiv.innerHTML = `<div class="message-content">${message}</div>`;
      chatMessages.appendChild(userMessageDiv);

      // Clear input and disable controls
      chatInput.value = '';
      chatInput.disabled = true;
      sendButton.disabled = true;

      // Add loading message
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'message bot';
      loadingDiv.innerHTML = `<div class="message-content">Thinking...</div>`;
      chatMessages.appendChild(loadingDiv);

      // Auto scroll
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // API call
      const response = await fetch('https://207.180.235.87/chat/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: message })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Remove loading message
      chatMessages.removeChild(loadingDiv);

      // Add bot response
      const botMessageDiv = document.createElement('div');
      botMessageDiv.className = 'message bot';
      botMessageDiv.innerHTML = `<div class="message-content">${data.message}</div>`;
      chatMessages.appendChild(botMessageDiv);

    } catch (error) {
      alert(error);
      console.error('Error:', error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'message bot error';
      errorDiv.innerHTML = `<div class="message-content">Sorry, I encountered an error. Please try again.</div>`;
      chatMessages.appendChild(errorDiv);
    } finally {
      // Re-enable controls
      chatInput.disabled = false;
      sendButton.disabled = false;
      chatInput.focus();
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  // Event Listeners
  sendButton.addEventListener('click', function(e) {
    sendMessage(e);
  });

  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage(e);
    }
  });

  // Touch event for mobile
  sendButton.addEventListener('touchend', function(e) {
    sendMessage(e);
  });

  // Chat widget toggle
  chatIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    chatWidget.classList.toggle('show');
    if (chatWidget.classList.contains('show')) {
      chatInput.focus();
    }
  });

  // Prevent chat closing when clicking inside
  chatWidget.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  minimizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatWidget.classList.toggle('minimized');
    minimizeBtn.textContent = chatWidget.classList.contains('minimized') ? '+' : '−';
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initializeChatWidget();
});

document.addEventListener('DOMContentLoaded', () => {
  const coin = document.getElementById('coin');
  const flipButton = document.getElementById('flip-button');
  const resultDisplay = document.getElementById('flip-result');
  let isFlipping = false;

  function flipCoin() {
    if (isFlipping) return;
    isFlipping = true;

    // Reset classes
    resultDisplay.className = 'flip-result';
    resultDisplay.textContent = 'Flipping...';
    
    // Add flipping animation
    coin.classList.add('flipping');
    
    // Disable button during flip
    flipButton.disabled = true;
    flipButton.style.opacity = '0.5';

    // Generate random result
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    // After animation completes
    setTimeout(() => {
      // Remove flipping animation
      coin.classList.remove('flipping');
      
      // Set final rotation based on result
      coin.style.transform = result === 'heads' ? 'rotateY(0)' : 'rotateY(180deg)';
      
      // Update result text with animation
      resultDisplay.className = `flip-result ${result}`;
      resultDisplay.textContent = result.toUpperCase();
      
      // Re-enable button
      flipButton.disabled = false;
      flipButton.style.opacity = '1';
      isFlipping = false;

      // Add result animation
      resultDisplay.style.animation = 'none';
      resultDisplay.offsetHeight; // Trigger reflow
      resultDisplay.style.animation = 'glowPulse 0.5s ease-in-out';
    }, 3000);
  }

  flipButton.addEventListener('click', flipCoin);
});

document.addEventListener('DOMContentLoaded', () => {
  const typeSound = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA==');
  const hoverSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');

  typeSound.volume = 0.1;
  hoverSound.volume = 0.05;

  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        typeSound.currentTime = 0;
        typeSound.play();
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  const neonColors = [
    ['#ff00ff', '#00ffff', '#ff00aa'],
    ['#00ff00', '#00ffff', '#00aa00'],
    ['#ff0000', '#ff00ff', '#aa0000'],
    ['#00ffff', '#0000ff', '#00aaff'],
    ['#ffff00', '#ff00ff', '#ffaa00']
  ];

  function getRandomNeonTheme() {
    return neonColors[Math.floor(Math.random() * neonColors.length)];
  }

  const appDescriptions = {
    'nameGenerator': `
     CYBERNETIC NAME GENERATOR v2.0
      =============================
      PRIMARY FUNCTION:
      Generate unique identifiers for entities in the digital realm using advanced AI algorithms 
      and quantum randomization protocols.
    `,
    
    'coinToss': `
      BINARY FATE DETERMINATOR v1.5
      ============================
      PRIMARY FUNCTION:
      Harness quantum uncertainty principles to generate true random binary outcomes through 
     an advanced visualization interface.
     `
  };

  function createHelpBubble(description, iconElement) {
    const bubble = document.createElement('div');
    bubble.className = 'help-bubble';
    
    const iconRect = iconElement.getBoundingClientRect();
    bubble.style.top = `${iconRect.top}px`;
    bubble.style.left = `${iconRect.left - 780}px`; // Adjusted for new width
    
    const bubbleBackground = document.createElement('div');
    bubbleBackground.className = 'bubble-background';
    
    const neonGradient = document.createElement('div');
    neonGradient.className = 'neon-gradient';
    
    const bubbleBorder = document.createElement('div');
    bubbleBorder.className = 'bubble-border';
    
    const content = document.createElement('div');
    content.className = 'bubble-content';
    
    bubbleBackground.appendChild(neonGradient);
    bubble.appendChild(bubbleBackground);
    bubble.appendChild(bubbleBorder);
    bubble.appendChild(content);
    
    document.body.appendChild(bubble);
    
    // Digital text reveal animation
    function revealText() {
      const chars = description.split('');
      content.innerHTML = '';
      
      chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;
        content.appendChild(span);
        
        setTimeout(() => {
          span.classList.add('visible');
          if (char !== ' ') {
            typeSound.currentTime = 0;
            typeSound.play();
          }
        }, index * 30); // Adjust speed here
      });
    }
    
    // Start the reveal animation after bubble is added
    setTimeout(revealText, 100);
    
    return bubble;
  }

  document.querySelectorAll('.help-icon').forEach(icon => {
    const card = icon.closest('.app-card');
    const appType = card.classList.contains('name-generator') ? 'nameGenerator' : 'coinToss';
    const description = appDescriptions[appType];
    let bubble = null;

    icon.addEventListener('mouseenter', () => {
      document.querySelectorAll('.help-bubble').forEach(b => b.remove());
      bubble = createHelpBubble(description, icon);
      
      const [color1, color2, color3] = getRandomNeonTheme();
      bubble.style.setProperty('--color1', color1);
      bubble.style.setProperty('--color2', color2);
      bubble.style.setProperty('--color3', color3);
      
      requestAnimationFrame(() => {
        bubble.classList.add('active');
      });
      
      hoverSound.currentTime = 0;
      hoverSound.play();
    });

    icon.addEventListener('mouseleave', () => {
      if (bubble) {
        bubble.classList.remove('active');
        setTimeout(() => bubble.remove(), 300);
      }
    });
  });

  // Close overlay when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.help-icon')) {
      document.querySelectorAll('.app-description-overlay').forEach(overlay => {
        overlay.classList.remove('active');
        overlay.querySelector('.typing-text').textContent = '';
      });
    }
  });

  // Prevent overlay from closing when clicking inside it
  document.querySelectorAll('.app-description-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
});

async function fetchNews() {
    try {
        // Using rss2json service to convert RSS feed to JSON and handle CORS
        const rssUrl = 'https://news.google.com/rss/search?q=apple&hl=en-US&gl=US&ceid=US:en';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        
        const data = await response.json();
        
        if (data.status === 'ok') {
            let newsText = '';
            data.items.forEach(item => {
                newsText += `${item.title} • `;
            });

            const tickerElement = document.querySelector('.ticker-text');
            tickerElement.textContent = newsText;
        } else {
            throw new Error('Failed to fetch RSS feed');
        }

    } catch (error) {
        console.error('Error fetching news:', error);
        const tickerElement = document.querySelector('.ticker-text');
        tickerElement.textContent = 'Loading latest Apple news... Please wait •';
    }
}

// Initial fetch
fetchNews();

// Refresh every 5 minutes
setInterval(fetchNews, 300000);

// Add event listener to restart animation when it completes
document.querySelector('.ticker-text').addEventListener('animationend', function() {
    this.style.animation = 'none';
    this.offsetHeight; // Trigger reflow
    this.style.animation = 'ticker 60s linear infinite';
});

// Update Tambola initialization and controls
class TambolaGame {
  constructor() {
    this.numbers = Array.from({length: 90}, (_, i) => i + 1);
    this.calledNumbers = [];
    this.currentNumber = null;
    this.isGameActive = false;
    
    this.initializeBoard();
    this.initializeControls();
  }

  initializeBoard() {
    const board = document.querySelector('.tambola-board');
    if (!board) return;
    
    board.innerHTML = '';
    for (let i = 1; i <= 90; i++) {
      const cell = document.createElement('div');
      cell.className = 'number-cell';
      cell.textContent = i;
      board.appendChild(cell);
    }
  }

  initializeControls() {
    const drawBtn = document.getElementById('drawNumber');
    const restartGameToggle = document.querySelector('.restart-game-toggle');
    
    if (drawBtn) {
      drawBtn.addEventListener('click', () => this.drawNumber());
    }
    
    if (restartGameToggle) {
      restartGameToggle.addEventListener('click', () => {
        // Add rotation animation
        const icon = restartGameToggle.querySelector('i');
        icon.style.transform = 'rotate(360deg)';
        
        // Reset the game
        this.resetGame();
        
        // Reset the rotation after animation
        setTimeout(() => {
          icon.style.transform = 'rotate(0deg)';
        }, 1000);
      });
    }
  }

  drawNumber() {
    if (this.numbers.length === 0) {
      alert('Game Over! All numbers have been called.');
      return;
    }

    const index = Math.floor(Math.random() * this.numbers.length);
    this.currentNumber = this.numbers.splice(index, 1)[0];
    this.calledNumbers.push(this.currentNumber);

    // Update display
    const currentNumberDisplay = document.getElementById('currentNumber');
    if (currentNumberDisplay) {
      currentNumberDisplay.textContent = this.currentNumber;
    }
    
    // Update board
    const cells = document.querySelectorAll('.number-cell');
    cells[this.currentNumber - 1].classList.add('called', 'just-called');
    setTimeout(() => {
      cells[this.currentNumber - 1].classList.remove('just-called');
    }, 500);

    // Update history
    this.updateHistory();
  }

  updateHistory() {
    const history = this.calledNumbers.slice(-5).reverse().join(' - ');
    const historyDisplay = document.getElementById('numberHistory');
    if (historyDisplay) {
      historyDisplay.textContent = history;
    }
  }

  resetGame() {
    this.numbers = Array.from({length: 90}, (_, i) => i + 1);
    this.calledNumbers = [];
    this.currentNumber = null;
    
    const currentNumberDisplay = document.getElementById('currentNumber');
    if (currentNumberDisplay) {
      currentNumberDisplay.textContent = '--';
    }
    
    const historyDisplay = document.getElementById('numberHistory');
    if (historyDisplay) {
      historyDisplay.textContent = '';
    }
    
    document.querySelectorAll('.number-cell').forEach(cell => {
      cell.classList.remove('called', 'just-called');
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const tambolaGame = new TambolaGame();
});

// Add this to your existing clock initialization code
function initializeClockControls() {
  const toggleBtn = document.querySelector('.add-clock-toggle');
  const clockControls = document.querySelector('.clock-controls');
  
  toggleBtn.addEventListener('click', () => {
    clockControls.classList.toggle('show');
    // Change icon based on state
    const icon = toggleBtn.querySelector('i');
    if (clockControls.classList.contains('show')) {
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-minus');
    } else {
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
    }
  });

  // Close controls when clicking outside
  document.addEventListener('click', (e) => {
    if (!clockControls.contains(e.target) && 
        !toggleBtn.contains(e.target) && 
        clockControls.classList.contains('show')) {
      clockControls.classList.remove('show');
      const icon = toggleBtn.querySelector('i');
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
    }
  });
}

// Add to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  initializeClockControls();
  // ... rest of your initialization code
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        navLinks.classList.remove('active');
      }
    });
  });

  // Initialize Calculator
  initializeCalculator();
  
  // Initialize QR Generator
  initializeQRGenerator();
  
  // Enhanced Chat Widget
  initializeEnhancedChat();
  
  // Initialize GSAP animations
  initializeAnimations();
});

// Calculator Functionality
function initializeCalculator() {
  const display = document.getElementById('calcDisplay');
  const buttons = document.querySelectorAll('.calc-btn');
  let currentInput = '';
  let operator = '';
  let previousInput = '';

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const value = this.textContent;
      
      if (this.classList.contains('clear')) {
        currentInput = '';
        operator = '';
        previousInput = '';
        display.value = '';
      } else if (this.classList.contains('equals')) {
        if (currentInput && operator && previousInput) {
          const result = calculate(previousInput, operator, currentInput);
          display.value = result;
          currentInput = result.toString();
          operator = '';
          previousInput = '';
        }
      } else if (this.classList.contains('operator')) {
        if (currentInput) {
          if (value === '±') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            display.value = currentInput;
          } else if (value === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            display.value = currentInput;
          } else {
            operator = value;
            previousInput = currentInput;
            currentInput = '';
          }
        }
      } else {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        display.value = currentInput;
      }
    });
  });

  function calculate(a, op, b) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    
    switch (op) {
      case '+': return numA + numB;
      case '-': return numA - numB;
      case '×': return numA * numB;
      case '÷': return numB !== 0 ? numA / numB : 'Error';
      default: return b;
    }
  }
}

// QR Generator Functionality
function initializeQRGenerator() {
  const generateBtn = document.getElementById('generateQR');
  const qrInput = document.getElementById('qrInput');
  const qrDisplay = document.getElementById('qrCode');

  if (generateBtn && qrInput && qrDisplay) {
    generateBtn.addEventListener('click', function() {
      const text = qrInput.value.trim();
      if (text) {
        qrDisplay.innerHTML = '';
        QRCode.toCanvas(qrDisplay, text, {
          width: 200,
          height: 200,
          colorDark: '#00ffff',
          colorLight: '#000000',
          margin: 2
        }, function (error) {
          if (error) {
            qrDisplay.innerHTML = '<p style="color: #ff0080;">Error generating QR code</p>';
          }
        });
      } else {
        qrDisplay.innerHTML = '<p style="color: #ff0080;">Please enter text or URL</p>';
      }
    });

    // Generate QR on Enter key
    qrInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        generateBtn.click();
      }
    });
  }
}

// Enhanced Chat Widget
function initializeEnhancedChat() {
  const chatIcon = document.querySelector('.chat-bot-icon');
  const chatWidget = document.getElementById('chatWidget');
  const chatClose = document.querySelector('.chat-close');
  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendMessage');
  const chatMessages = document.getElementById('chatMessages');

  // Toggle chat widget
  if (chatIcon) {
    chatIcon.addEventListener('click', function() {
      chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Close chat widget
  if (chatClose) {
    chatClose.addEventListener('click', function() {
      chatWidget.style.display = 'none';
    });
  }

  // Enhanced send message function
  async function sendMessage(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, true);
    chatInput.value = '';

    // Show typing indicator
    const typingIndicator = addTypingIndicator();

    try {
      const response = await fetch('https://207.180.235.87/chat/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Remove typing indicator
      removeTypingIndicator(typingIndicator);
      
      // Add bot response
      if (data && data.message) {
        addMessageToChat(data.message, false);
      } else {
        addMessageToChat('Sorry, I received an invalid response. Please try again.', false);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      removeTypingIndicator(typingIndicator);
      addMessageToChat('Sorry, I encountered an error. Please try again or contact us via WhatsApp.', false);
    }
  }

  function addMessageToChat(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = message;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
      messageDiv.style.transition = 'all 0.3s ease';
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0)';
    }, 10);
  }

  function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.innerHTML = '<div class="message-content">Typing<span class="dots">...</span></div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }

  function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  // Event listeners for sending messages
  if (sendButton) {
    sendButton.addEventListener('click', sendMessage);
  }

  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage(e);
      }
    });
  }
}

// GSAP Animations
function initializeAnimations() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animations
  gsap.timeline()
    .from('.profile-image', { duration: 1, scale: 0, ease: 'back.out(1.7)' })
    .from('.profile-name', { duration: 1, y: 50, opacity: 0 }, '-=0.5')
    .from('.profile-title', { duration: 1, y: 30, opacity: 0 }, '-=0.3')
    .from('.hero-subtitle', { duration: 1, y: 30, opacity: 0 }, '-=0.3')
    .from('.service-highlights .highlight-item', { 
      duration: 0.8, 
      y: 30, 
      opacity: 0, 
      stagger: 0.2 
    }, '-=0.3')
    .from('.cta-buttons .cta', { 
      duration: 0.8, 
      y: 30, 
      opacity: 0, 
      stagger: 0.1 
    }, '-=0.3');

  // Service cards animation
  gsap.fromTo('.service-card', 
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Portfolio items animation
  gsap.fromTo('.portfolio-item',
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portfolio-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Utility apps animation
  gsap.fromTo('.app-card',
    { rotationY: 90, opacity: 0 },
    {
      rotationY: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#utilities',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Floating elements animation
  gsap.to('.circuit-node', {
    y: '+=20',
    duration: 2,
    ease: 'power1.inOut',
    stagger: 0.5,
    repeat: -1,
    yoyo: true
  });

  // Parallax effect for background elements
  gsap.to('.neon-circuit', {
    y: '-50%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
}

// Enhanced ticker with more dynamic content
function updateTicker() {
  const techNews = [
    "🚀 Latest: AI-powered web development solutions now available",
    "💡 New: Custom chatbot integration services launched",
    "🌟 Featured: Mobile-first responsive design packages",
    "⚡ Update: Cloud hosting with 99.9% uptime guarantee",
    "🔥 Trending: React & Node.js development services",
    "🎯 Special: Free consultation for new projects",
    "🛡️ Security: SSL certificates included with all hosting plans",
    "📱 Mobile: Cross-platform app development available"
  ];
  
  const tickerText = document.querySelector('.ticker-text');
  if (tickerText) {
    const randomNews = techNews[Math.floor(Math.random() * techNews.length)];
    tickerText.textContent = randomNews;
  }
}

// Update ticker every 10 seconds
setInterval(updateTicker, 10000);
updateTicker(); // Initial call

// Smooth reveal animations for elements coming into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .app-card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Add typing effect for chat messages
function typeMessage(element, message, speed = 50) {
  element.textContent = '';
  let i = 0;
  
  function typeChar() {
    if (i < message.length) {
      element.textContent += message.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    }
  }
  
  typeChar();
}

// Initialize typewriter effect for code lines with sequential animation
function initializeTypewriterCode() {
  const codeGroups = document.querySelectorAll('.code-group');
  let currentGroupIndex = 0;
  
  function showNextGroup() {
    // Hide all groups first
    codeGroups.forEach(group => {
      group.classList.remove('active', 'scroll-up');
    });
    
    // Show current group
    const currentGroup = codeGroups[currentGroupIndex];
    currentGroup.classList.add('active');
    
    // Type out the lines in the current group
    const codeLines = currentGroup.querySelectorAll('.code-line');
    
    codeLines.forEach((line, lineIndex) => {
      const text = line.getAttribute('data-text');
      
      // Clear initial text
      line.textContent = '';
      line.classList.remove('typing');
      
      setTimeout(() => {
        line.classList.add('typing');
        typewriterEffect(line, text, 50);
      }, lineIndex * 600); // Stagger lines within group
    });
    
    // Calculate total time for this group (typing + pause)
    const typingTime = codeLines.length * 600 + 2000; // Lines + 2s pause
    const pauseTime = 2000; // 2 second pause after completion
    
    setTimeout(() => {
      // Scroll up current group
      currentGroup.classList.remove('active');
      currentGroup.classList.add('scroll-up');
      
      // Move to next group
      currentGroupIndex = (currentGroupIndex + 1) % codeGroups.length;
      
      // Show next group after scroll animation
      setTimeout(showNextGroup, 800);
    }, typingTime + pauseTime);
  }
  
  // Start the animation cycle
  showNextGroup();
}

function typewriterEffect(element, text, speed = 50) {
  let i = 0;
  element.style.width = 'auto';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Enhanced error handling for mobile devices
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});

// Service worker registration for better mobile performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed');
      });
  });
}

// Add utilities link functionality and neural network generation
document.addEventListener('DOMContentLoaded', function() {
  // Initialize typewriter code effect
  initializeTypewriterCode();
  
  // Utilities section toggle
  const utilitiesLink = document.getElementById('utilities-link');
  const utilitiesSection = document.getElementById('utilities');
  
  if (utilitiesLink && utilitiesSection) {
    utilitiesLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (utilitiesSection.classList.contains('show')) {
        // Hide utilities
        utilitiesSection.classList.remove('show');
        setTimeout(() => {
          utilitiesSection.style.display = 'none';
        }, 800);
      } else {
        // Show utilities
        utilitiesSection.style.display = 'block';
        setTimeout(() => {
          utilitiesSection.classList.add('show');
          utilitiesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 50);
      }
    });
  }

  // Generate Neural Network Nodes
  generateNeuralNetwork();
  
  // Initialize existing functionality
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scrolling for navigation links (except utilities)
  document.querySelectorAll('a[href^="#"]:not(#utilities-link)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        navLinks.classList.remove('active');
      }
    });
  });

  // Initialize other components
  initializeCalculator();
  initializeQRGenerator();
  initializeEnhancedChat();
  initializeAnimations();
});

// Generate Neural Network Nodes
function generateNeuralNetwork() {
  const neuralNetwork = document.querySelector('.neural-network');
  if (!neuralNetwork) return;

  // Clear existing nodes
  neuralNetwork.innerHTML = '';

  // Create neural nodes
  const nodePositions = [
    { x: 50, y: 50 }, // Center
    { x: 20, y: 30 }, { x: 80, y: 30 }, // Top layer
    { x: 30, y: 70 }, { x: 70, y: 70 }, // Bottom layer
    { x: 10, y: 50 }, { x: 90, y: 50 }, // Side nodes
    { x: 40, y: 20 }, { x: 60, y: 20 }, // Top nodes
    { x: 40, y: 80 }, { x: 60, y: 80 }  // Bottom nodes
  ];

  // Create nodes
  nodePositions.forEach((pos, index) => {
    const node = document.createElement('div');
    node.className = 'neural-node';
    node.style.left = `${pos.x}%`;
    node.style.top = `${pos.y}%`;
    node.style.animationDelay = `${index * 0.2}s`;
    neuralNetwork.appendChild(node);
  });

  // Create connections between nodes
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], // Center to others
    [1, 2], [3, 4], // Horizontal connections
    [1, 7], [2, 8], [3, 9], [4, 10], // Vertical connections
    [5, 0], [6, 0] // Side to center
  ];

  connections.forEach((connection, index) => {
    const [start, end] = connection;
    const startPos = nodePositions[start];
    const endPos = nodePositions[end];
    
    const connectionEl = document.createElement('div');
    connectionEl.className = 'neural-connection';
    
    // Calculate connection properties
    const deltaX = endPos.x - startPos.x;
    const deltaY = endPos.y - startPos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    connectionEl.style.left = `${startPos.x}%`;
    connectionEl.style.top = `${startPos.y}%`;
    connectionEl.style.width = `${distance}%`;
    connectionEl.style.transform = `rotate(${angle}deg)`;
    connectionEl.style.transformOrigin = '0 50%';
    connectionEl.style.animationDelay = `${index * 0.3}s`;
    
    neuralNetwork.appendChild(connectionEl);
  });
}

// Enhanced Deploy Button Interaction
document.addEventListener('DOMContentLoaded', function() {
  const deployButton = document.querySelector('.deploy-button');
  if (deployButton) {
    deployButton.addEventListener('click', function() {
      // Add click effect
      this.style.transform = 'scale(0.95)';
      this.style.boxShadow = '0 0 50px #00ff00';
      
      // Create deployment particles
      createDeploymentParticles();
      
      // Reset button after animation
      setTimeout(() => {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 0 30px #00ff00';
      }, 200);
    });
  }
});

// Create Deployment Particles Effect
function createDeploymentParticles() {
  const hero = document.querySelector('.hero');
  const deployButton = document.querySelector('.deploy-button');
  const buttonRect = deployButton.getBoundingClientRect();
  const heroRect = hero.getBoundingClientRect();
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#00ff00';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '100';
    
    // Position relative to hero section
    const startX = ((buttonRect.left + buttonRect.width / 2) - heroRect.left) / heroRect.width * 100;
    const startY = ((buttonRect.top + buttonRect.height / 2) - heroRect.top) / heroRect.height * 100;
    
    particle.style.left = `${startX}%`;
    particle.style.top = `${startY}%`;
    
    // Random direction
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = 50 + Math.random() * 100;
    const endX = startX + Math.cos(angle) * velocity / heroRect.width * 100;
    const endY = startY + Math.sin(angle) * velocity / heroRect.height * 100;
    
    hero.appendChild(particle);
    
    // Animate particle
    particle.animate([
      { 
        transform: 'translate(0, 0) scale(1)',
        opacity: 1
      },
      { 
        transform: `translate(${endX - startX}vw, ${endY - startY}vh) scale(0)`,
        opacity: 0
      }
    ], {
      duration: 1000 + Math.random() * 500,
      easing: 'ease-out'
    }).onfinish = () => {
      particle.remove();
    };
  }
}

// Enhanced Code Snippet Animation with Dynamic Generation
function enhanceCodeSnippets() {
  const codeSnippets = document.querySelectorAll('.code-snippet');
  
  // Enhanced AI/ML code examples for more realistic feel
  const codeExamples = {
    python: [
      'def neural_network(input_data):',
      'import tensorflow as tf',
      'model.compile(optimizer="adam")',
      'np.dot(weights, inputs)',
      'from sklearn import datasets',
      'model.fit(X_train, y_train)',
      'predictions = model.predict(X_test)',
      'loss = tf.keras.losses.mse(y_true, y_pred)',
      'optimizer = tf.keras.optimizers.Adam()',
      'layer = tf.keras.layers.Dense(128)',
      'activation = tf.nn.relu(x)',
      'gradient = tf.gradients(loss, weights)'
    ],
    java: [
      'public class AIProcessor {',
      '@Override public void process()',
      'Matrix multiply(Matrix a, Matrix b)',
      'double sigmoid(double x) {',
      'public void backpropagate() {',
      'private float[] weights;',
      'public class NeuralNetwork {',
      'void updateWeights(float[] gradients)',
      'float calculateLoss(float[] predicted)',
      'public void train(Dataset data) {',
      'Matrix transpose(Matrix matrix)',
      'void initializeWeights(int size)'
    ],
    assembly: [
      'MOV AX, 0x1000',
      'JMP neural_loop',
      'CALL activation_function',
      'PUSH gradient_value',
      'ADD EAX, EBX',
      'MUL weight_matrix',
      'CMP result, threshold',
      'JNE continue_training',
      'LOAD input_vector',
      'STORE output_result',
      'LOOP matrix_multiply',
      'RET from_function'
    ],
    cpp: [
      'std::vector<float> weights;',
      'class DeepLearning {',
      'auto result = forward_pass();',
      'backpropagation();',
      'template<typename T>',
      'Matrix<float> multiply(Matrix<float>&)',
      'void train(const Dataset& data)',
      'float sigmoid(float x) {',
      'std::unique_ptr<Layer> layer;',
      'void updateWeights(const Gradient&)',
      'class NeuralNetwork {',
      'float calculateError(float target)'
    ]
  };
  
  codeSnippets.forEach((snippet, index) => {
    // Add random delay to each snippet
    snippet.style.animationDelay = `${index * 0.3}s`;
    
    // Randomly change code content every 8 seconds
    setInterval(() => {
      const type = snippet.classList.contains('python') ? 'python' : 
                   snippet.classList.contains('java') ? 'java' : 
                   snippet.classList.contains('assembly') ? 'assembly' : 'cpp';
      const examples = codeExamples[type];
      const randomCode = examples[Math.floor(Math.random() * examples.length)];
      snippet.innerHTML = randomCode;
    }, 8000 + Math.random() * 4000);
    
    // Add hover effect
    snippet.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
      this.style.transform += ' scale(1.2)';
      this.style.zIndex = '20';
    });
    
    snippet.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
      this.style.transform = this.style.transform.replace(' scale(1.2)', '');
      this.style.zIndex = '3';
    });
  });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', function() {
  enhanceCodeSnippets();
  
  // Add dynamic background particles
  createBackgroundParticles();
});

// Enhanced Background Particles with Multiple Types
function createBackgroundParticles() {
  const hero = document.querySelector('.hero');
  
  // Create floating particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.position = 'absolute';
    particle.style.width = `${2 + Math.random() * 4}px`;
    particle.style.height = `${2 + Math.random() * 4}px`;
    particle.style.background = `hsl(${180 + Math.random() * 60}, 100%, 70%)`;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.4';
    particle.style.boxShadow = `0 0 10px currentColor`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation
    particle.style.animation = `floatParticle ${5 + Math.random() * 10}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    hero.appendChild(particle);
  }
  
  // Create binary code particles
  for (let i = 0; i < 20; i++) {
    const binaryParticle = document.createElement('div');
    binaryParticle.className = 'binary-particle';
    binaryParticle.style.position = 'absolute';
    binaryParticle.style.color = `hsl(${120 + Math.random() * 120}, 100%, 70%)`;
    binaryParticle.style.fontSize = '12px';
    binaryParticle.style.fontFamily = 'monospace';
    binaryParticle.style.pointerEvents = 'none';
    binaryParticle.style.opacity = '0.6';
    binaryParticle.textContent = Math.random() > 0.5 ? '1' : '0';
    
    // Random position
    binaryParticle.style.left = `${Math.random() * 100}%`;
    binaryParticle.style.top = `${Math.random() * 100}%`;
    
    // Random animation
    binaryParticle.style.animation = `binaryFloat ${8 + Math.random() * 6}s linear infinite`;
    binaryParticle.style.animationDelay = `${Math.random() * 8}s`;
    
    hero.appendChild(binaryParticle);
    
    // Change binary value periodically
    setInterval(() => {
      binaryParticle.textContent = Math.random() > 0.5 ? '1' : '0';
    }, 1000 + Math.random() * 2000);
  }
}

// Add sound effects for interactions
function initializeSoundEffects() {
  // Create audio context for sound effects
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  function playBeep(frequency = 800, duration = 100) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }
  
  // Add sound to deploy button
  const deployButton = document.querySelector('.deploy-button');
  if (deployButton) {
    deployButton.addEventListener('click', () => playBeep(1000, 200));
  }
  
  // Add sound to neural nodes
  document.querySelectorAll('.neural-node').forEach(node => {
    node.addEventListener('mouseenter', () => playBeep(600, 50));
  });
}

// Initialize sound effects after user interaction
document.addEventListener('click', function initAudio() {
  initializeSoundEffects();
  document.removeEventListener('click', initAudio);
}, { once: true });

// GDPR Cookie Consent Management
class GDPRManager {
  constructor() {
    this.cookieConsent = this.getCookieConsent();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkConsentStatus();
    this.loadConsentedServices();
  }

  setupEventListeners() {
    // Banner buttons
    document.getElementById('gdpr-accept')?.addEventListener('click', () => this.acceptAll());
    document.getElementById('gdpr-decline')?.addEventListener('click', () => this.declineAll());
    document.getElementById('gdpr-settings')?.addEventListener('click', () => this.showSettings());

    // Modal buttons
    document.getElementById('save-preferences')?.addEventListener('click', () => this.savePreferences());
    document.getElementById('close-modal')?.addEventListener('click', () => this.hideSettings());

    // Footer links
    document.getElementById('privacy-policy-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showPrivacyPolicy();
    });
    document.getElementById('cookie-policy-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showCookiePolicy();
    });
    document.getElementById('gdpr-settings-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showSettings();
    });
    document.getElementById('footer-privacy-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showPrivacyPolicy();
    });
    document.getElementById('footer-cookie-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showSettings();
    });
    document.getElementById('banner-privacy-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showPrivacyPolicy();
    });

    // Toggle switches
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
      if (!toggle.classList.contains('active') || toggle.dataset.type !== 'essential') {
        toggle.addEventListener('click', () => this.toggleCookie(toggle));
      }
    });

    // Close modal on outside click
    document.getElementById('privacy-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'privacy-modal') {
        this.hideSettings();
      }
    });
  }

  checkConsentStatus() {
    if (!this.cookieConsent.hasConsented) {
      setTimeout(() => {
        document.getElementById('gdpr-banner')?.classList.add('show');
      }, 2000); // Show banner after 2 seconds
    }
  }

  getCookieConsent() {
    const consent = localStorage.getItem('gdpr-consent');
    if (consent) {
      return JSON.parse(consent);
    }
    return {
      hasConsented: false,
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: null
    };
  }

  setCookieConsent(consent) {
    consent.timestamp = new Date().toISOString();
    localStorage.setItem('gdpr-consent', JSON.stringify(consent));
    this.cookieConsent = consent;
  }

  acceptAll() {
    const consent = {
      hasConsented: true,
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    this.setCookieConsent(consent);
    this.hideBanner();
    this.loadConsentedServices();
    this.showNotification('All cookies accepted. Thank you!', 'success');
  }

  declineAll() {
    const consent = {
      hasConsented: true,
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    this.setCookieConsent(consent);
    this.hideBanner();
    this.loadConsentedServices();
    this.showNotification('Only essential cookies will be used.', 'info');
  }

  showSettings() {
    // Update toggle states
    document.getElementById('analytics-toggle')?.classList.toggle('active', this.cookieConsent.analytics);
    document.getElementById('marketing-toggle')?.classList.toggle('active', this.cookieConsent.marketing);
    document.getElementById('functional-toggle')?.classList.toggle('active', this.cookieConsent.functional);
    
    document.getElementById('privacy-modal')?.classList.add('show');
  }

  hideSettings() {
    document.getElementById('privacy-modal')?.classList.remove('show');
  }

  savePreferences() {
    const consent = {
      hasConsented: true,
      essential: true,
      analytics: document.getElementById('analytics-toggle')?.classList.contains('active') || false,
      marketing: document.getElementById('marketing-toggle')?.classList.contains('active') || false,
      functional: document.getElementById('functional-toggle')?.classList.contains('active') || false
    };
    
    this.setCookieConsent(consent);
    this.hideSettings();
    this.hideBanner();
    this.loadConsentedServices();
    this.showNotification('Cookie preferences saved successfully!', 'success');
  }

  toggleCookie(toggle) {
    toggle.classList.toggle('active');
  }

  hideBanner() {
    document.getElementById('gdpr-banner')?.classList.remove('show');
  }

  loadConsentedServices() {
    // Load Google Analytics if consented
    if (this.cookieConsent.analytics && !window.gtag) {
      this.loadGoogleAnalytics();
    }

    // Load other marketing/functional scripts based on consent
    if (this.cookieConsent.marketing) {
      this.loadMarketingScripts();
    }

    if (this.cookieConsent.functional) {
      this.loadFunctionalScripts();
    }
  }

  loadGoogleAnalytics() {
    // Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics ID
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `;
    document.head.appendChild(script2);
  }

  loadMarketingScripts() {
    // Add marketing/advertising scripts here
    console.log('Loading marketing scripts...');
  }

  loadFunctionalScripts() {
    // Add functional scripts here (chat widgets, etc.)
    console.log('Loading functional scripts...');
  }

  showPrivacyPolicy() {
    const modal = document.getElementById('privacy-modal');
    const content = modal.querySelector('.privacy-content');
    content.innerHTML = `
      <h3>🔒 Privacy Policy</h3>
      <div style="max-height: 400px; overflow-y: auto;">
        <h4>Data Controller</h4>
        <p><strong>FK.GPT</strong><br>
        Email: contact@fkgpt.dev<br>
        Website: www.fkgpt.dev</p>

        <h4>Data We Collect</h4>
        <ul>
          <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent, interactions</li>
          <li><strong>Contact Data:</strong> Name, email when you contact us</li>
        </ul>

        <h4>How We Use Your Data</h4>
        <ul>
          <li>Provide and improve our services</li>
          <li>Analyze website usage and performance</li>
          <li>Respond to your inquiries</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h4>Your Rights (GDPR)</h4>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Rectification:</strong> Correct inaccurate data</li>
          <li><strong>Erasure:</strong> Request deletion of your data</li>
          <li><strong>Portability:</strong> Receive your data in a structured format</li>
          <li><strong>Objection:</strong> Object to processing of your data</li>
        </ul>

        <h4>Data Retention</h4>
        <p>We retain personal data only as long as necessary for the purposes outlined in this policy or as required by law.</p>

        <h4>Contact Us</h4>
        <p>For any privacy-related questions or to exercise your rights, contact us at: <strong>contact@fkgpt.dev</strong></p>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <button id="close-privacy" class="gdpr-btn gdpr-accept">Close</button>
      </div>
    `;
    
    document.getElementById('close-privacy').addEventListener('click', () => this.hideSettings());
    modal.classList.add('show');
  }

  showCookiePolicy() {
    const modal = document.getElementById('privacy-modal');
    const content = modal.querySelector('.privacy-content');
    content.innerHTML = `
      <h3>🍪 Cookie Policy</h3>
      <div style="max-height: 400px; overflow-y: auto;">
        <h4>What Are Cookies?</h4>
        <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.</p>

        <h4>Types of Cookies We Use</h4>
        
        <h5>Essential Cookies (Always Active)</h5>
        <ul>
          <li><strong>Session cookies:</strong> Remember your preferences during your visit</li>
          <li><strong>Security cookies:</strong> Protect against malicious attacks</li>
        </ul>

        <h5>Analytics Cookies (Optional)</h5>
        <ul>
          <li><strong>Google Analytics:</strong> Understand how visitors use our site</li>
          <li><strong>Performance monitoring:</strong> Track site performance and errors</li>
        </ul>

        <h5>Marketing Cookies (Optional)</h5>
        <ul>
          <li><strong>Advertising:</strong> Show relevant ads based on your interests</li>
          <li><strong>Social media:</strong> Enable social sharing features</li>
        </ul>

        <h5>Functional Cookies (Optional)</h5>
        <ul>
          <li><strong>Chat widgets:</strong> Enable customer support features</li>
          <li><strong>Preferences:</strong> Remember your settings and choices</li>
        </ul>

        <h4>Managing Cookies</h4>
        <p>You can control cookies through:</p>
        <ul>
          <li>Our cookie consent banner</li>
          <li>Your browser settings</li>
          <li>Third-party opt-out tools</li>
        </ul>

        <h4>Third-Party Cookies</h4>
        <p>Some cookies are set by third-party services we use, such as Google Analytics. These services have their own privacy policies.</p>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <button id="close-cookie-policy" class="gdpr-btn gdpr-accept">Close</button>
      </div>
    `;
    
    document.getElementById('close-cookie-policy').addEventListener('click', () => this.hideSettings());
    modal.classList.add('show');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'linear-gradient(45deg, #00ff00, #00cc00)' : 'linear-gradient(45deg, #00ffff, #0080ff)'};
      color: #000;
      padding: 15px 20px;
      border-radius: 10px;
      z-index: 10002;
      font-weight: bold;
      box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Initialize GDPR Manager
document.addEventListener('DOMContentLoaded', () => {
  new GDPRManager();
  
  // Initialize Live Projects Toggle
  initializeLiveProjectsToggle();
});

// Live Projects Section Toggle Functionality
function initializeLiveProjectsToggle() {
  const toggle = document.getElementById('live-projects-toggle');
  const section = document.getElementById('live-projects-section');
  const arrow = document.getElementById('projects-arrow');
  const closeBtn = document.getElementById('close-projects');
  
  if (!toggle || !section || !arrow) return;
  
  let isVisible = false;
  
  // Toggle section visibility
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isVisible) {
      showProjectsSection();
    } else {
      hideProjectsSection();
    }
  });
  
  // Close button functionality
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      hideProjectsSection();
    });
  }
  
  function showProjectsSection() {
    isVisible = true;
    section.classList.add('show');
    arrow.classList.add('rotated');
    
    // Smooth scroll to the section
    setTimeout(() => {
      section.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
    
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
  }
  
  function hideProjectsSection() {
    isVisible = false;
    section.classList.remove('show');
    arrow.classList.remove('rotated');
    
    // Scroll back to hero section
    document.getElementById('home').scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
  }
  
  function handleEscapeKey(e) {
    if (e.key === 'Escape' && isVisible) {
      hideProjectsSection();
    }
  }
  
  // Add smooth animations for project cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe project cards when section becomes visible
  const projectCards = section.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}