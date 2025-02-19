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
  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendMessage');
  const chatMessages = document.getElementById('chatMessages');
  const minimizeBtn = document.getElementById('minimizeChat');
  const chatWidget = document.getElementById('chatWidget');

  // Send message function
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    chatMessages.appendChild(userMessageDiv);

    // Clear input and disable it while waiting for response
    chatInput.value = '';
    chatInput.disabled = true;
    sendButton.disabled = true;

    // Add loading message
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot';
    loadingDiv.innerHTML = `<div class="message-content">Thinking...</div>`;
    chatMessages.appendChild(loadingDiv);

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      // Call the API
      const response = await fetch('https://207.180.235.87/chat/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Remove loading message
      chatMessages.removeChild(loadingDiv);

      // Extract the message from the response
      const botResponse = data.message || "Sorry, I couldn't process that.";

      // Add bot response
      const botMessageDiv = document.createElement('div');
      botMessageDiv.className = 'message bot';
      botMessageDiv.innerHTML = `<div class="message-content">${botResponse}</div>`;
      chatMessages.appendChild(botMessageDiv);

    } catch (error) {
      // Remove loading message
      chatMessages.removeChild(loadingDiv);

      // Add error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'message bot error';
      errorDiv.innerHTML = `<div class="message-content">Sorry, I encountered an error. Please try again.</div>`;
      chatMessages.appendChild(errorDiv);
      console.error('Error:', error);
    }

    // Re-enable input and button
    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.focus();

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  minimizeBtn.addEventListener('click', () => {
    chatWidget.classList.toggle('minimized');
    minimizeBtn.textContent = chatWidget.classList.contains('minimized') ? '+' : '−';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeChatWidget();
  // ... rest of your initialization code
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