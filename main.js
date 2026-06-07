import './style.css'

// =====================================================
// ELITE MOCK DATABASE — British Era Strategic Collection
// =====================================================
const eliteBooks = [
  {
    title: "The Prince",
    author: "Niccolò Machiavelli",
    year: "1532",
    era: "Renaissance",
    status: "Classified Level I",
    analysis: "Core treatise on political realism and statecraft. Essential reading for understanding the mechanics of power acquisition and sovereign authority within the courts of Europe."
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    year: "5th Century BC",
    era: "Ancient",
    status: "Strategic Asset",
    analysis: "Foundational military strategy text. Its thirteen chapters on intelligence, deception, and terrain remain the bedrock of British military doctrine since the Empire's eastern campaigns."
  },
  {
    title: "On War",
    author: "Carl von Clausewitz",
    year: "1832",
    era: "Victorian",
    status: "Classified Level II",
    analysis: "Philosophical examination of total war. 'War is the continuation of politics by other means' — a maxim studied extensively at Sandhurst and within Whitehall corridors."
  },
  {
    title: "Diplomacy",
    author: "Henry Kissinger",
    year: "1994",
    era: "Modern",
    status: "Core Syllabus",
    analysis: "Comprehensive survey of international relations from the Congress of Vienna through the Cold War. Required reading for candidates entering the Foreign & Commonwealth Office."
  },
  {
    title: "The Grand Chessboard",
    author: "Zbigniew Brzezinski",
    year: "1997",
    era: "Modern",
    status: "Strategic Asset",
    analysis: "Geopolitical strategy concerning Eurasian hegemony. Critical for understanding NATO posture and the enduring relevance of Mackinder's Heartland Theory to British foreign policy."
  },
  {
    title: "World Order",
    author: "Henry Kissinger",
    year: "2014",
    era: "Contemporary",
    status: "Core Syllabus",
    analysis: "Examines competing world order concepts — Westphalian, Islamic, Chinese, and American — and the challenge of constructing a legitimate global framework in the 21st century."
  },
  {
    title: "The Great Game",
    author: "Peter Hopkirk",
    year: "1990",
    era: "Imperial",
    status: "Crown Archive",
    analysis: "The secret intelligence war between the British and Russian Empires for supremacy in Central Asia. A masterclass in espionage, cartography, and the shadowy diplomacy of the Raj."
  },
  {
    title: "The Decline and Fall of the Roman Empire",
    author: "Edward Gibbon",
    year: "1776",
    era: "Georgian",
    status: "Heritage Collection",
    analysis: "Gibbon's monumental history, composed during the golden age of British letters. Its analysis of imperial overreach and institutional decay remains a mirror for every great power."
  },
  {
    title: "Leviathan",
    author: "Thomas Hobbes",
    year: "1651",
    era: "Stuart",
    status: "Classified Level I",
    analysis: "The philosophical foundation of the modern state and the social contract. Written during the English Civil War, it remains essential to understanding sovereignty and civil authority."
  },
  {
    title: "The Wealth of Nations",
    author: "Adam Smith",
    year: "1776",
    era: "Georgian",
    status: "Crown Archive",
    analysis: "The foundational text of modern economics, penned by a Scottish moral philosopher. Its doctrines of free trade and the invisible hand shaped British imperial economic policy for centuries."
  },
  {
    title: "The Spy Who Came in from the Cold",
    author: "John le Carré",
    year: "1963",
    era: "Cold War",
    status: "Intelligence Brief",
    analysis: "The defining novel of Cold War espionage. Le Carré's portrayal of moral ambiguity within MI6 and the Circus offers an unflinching look at the human cost of intelligence operations."
  },
  {
    title: "On Liberty",
    author: "John Stuart Mill",
    year: "1859",
    era: "Victorian",
    status: "Heritage Collection",
    analysis: "Mill's impassioned defence of individual freedom and the tyranny of the majority. A cornerstone of liberal thought, debated in every Parliament since its publication."
  }
];

// =====================================================
// DOM ELEMENTS
// =====================================================
const parallaxLibrary = document.getElementById('parallax-layer-library');
const parallaxLondon  = document.getElementById('parallax-layer-london');
const fogCanvas       = document.getElementById('fog-canvas');
const searchInput     = document.getElementById('search-input');
const searchBtn       = document.getElementById('search-btn');
const searchWrapper   = document.querySelector('.search-input-wrapper');
const loader          = document.getElementById('loader');
const resultsGrid     = document.getElementById('results-grid');
const resultsCount    = document.getElementById('results-count');
const tags            = document.querySelectorAll('.tag');

// =====================================================
// PARALLAX EFFECT — Dual Layer
// =====================================================
document.addEventListener('mousemove', (e) => {
  const xFactor = e.clientX / window.innerWidth - 0.5;
  const yFactor = e.clientY / window.innerHeight - 0.5;

  // Layer 1: Library (slow, deep)
  parallaxLibrary.style.transform = `translate(${xFactor * 12}px, ${yFactor * 12}px)`;

  // Layer 2: London (faster, foreground feel)
  parallaxLondon.style.transform = `translate(${xFactor * 25}px, ${yFactor * 25}px)`;
});

// =====================================================
// LONDON FOG PARTICLE SYSTEM
// =====================================================
const ctx = fogCanvas.getContext('2d');
let fogParticles = [];

function resizeFogCanvas() {
  fogCanvas.width = window.innerWidth;
  fogCanvas.height = window.innerHeight;
}
resizeFogCanvas();
window.addEventListener('resize', resizeFogCanvas);

class FogParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * fogCanvas.width;
    this.y = Math.random() * fogCanvas.height;
    this.radius = Math.random() * 120 + 40;
    this.opacity = Math.random() * 0.06 + 0.01;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.1;
    this.life = Math.random() * 600 + 200;
    this.maxLife = this.life;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;

    if (this.life <= 0 || this.x < -this.radius || this.x > fogCanvas.width + this.radius) {
      this.reset();
    }
  }
  draw() {
    const fadeRatio = this.life / this.maxLife;
    const alpha = this.opacity * Math.sin(fadeRatio * Math.PI);
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, `rgba(180, 170, 140, ${alpha})`);
    gradient.addColorStop(1, `rgba(180, 170, 140, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize fog particles
for (let i = 0; i < 35; i++) {
  fogParticles.push(new FogParticle());
}

function animateFog() {
  ctx.clearRect(0, 0, fogCanvas.width, fogCanvas.height);
  fogParticles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateFog);
}
animateFog();

// =====================================================
// SEARCH TAGS — Quick Query
// =====================================================
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    searchInput.value = tag.dataset.query;
    initiateSearch();
  });
});

// =====================================================
// SEARCH LOGIC
// =====================================================
searchBtn.addEventListener('click', initiateSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') initiateSearch();
});

function initiateSearch() {
  const query = searchInput.value.toLowerCase().trim();

  // UI State: Scanning
  searchWrapper.classList.add('scanning');
  searchBtn.style.pointerEvents = 'none';
  resultsGrid.classList.add('hidden');
  resultsGrid.innerHTML = '';
  resultsCount.classList.add('hidden');
  loader.classList.add('active');

  // Simulate secure database access
  setTimeout(() => {
    searchWrapper.classList.remove('scanning');
    searchBtn.style.pointerEvents = 'auto';
    loader.classList.remove('active');
    displayResults(query);
  }, 2000);
}

function displayResults(query) {
  const filteredBooks = eliteBooks.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query) ||
    book.era.toLowerCase().includes(query) ||
    book.analysis.toLowerCase().includes(query)
  );

  // Results count
  resultsCount.classList.remove('hidden');
  resultsCount.innerHTML = `<span>${filteredBooks.length}</span> classified asset${filteredBooks.length !== 1 ? 's' : ''} retrieved from the archive`;

  resultsGrid.classList.remove('hidden');

  if (filteredBooks.length === 0) {
    resultsGrid.innerHTML = `
      <div class="no-results">
        <h3>No Records Found</h3>
        <p>The queried asset does not exist within the current clearance level, or has been redacted by the Crown.</p>
      </div>
    `;
    return;
  }

  filteredBooks.forEach((book, index) => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <span class="book-era">${book.era} Era</span>
      <div class="book-meta">
        <span>Ref. ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 9000) + 1000}</span>
        <span class="book-status">${book.status}</span>
      </div>
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">by ${book.author}, ${book.year}</p>
      <div class="book-card-divider"></div>
      <div class="book-analysis">
        <span class="analysis-label">⟐ Neural Summary</span>
        ${book.analysis}
      </div>
    `;

    resultsGrid.appendChild(card);

    // Staggered entrance with varying delays
    setTimeout(() => {
      card.classList.add('visible');
    }, 120 * index);
  });
}

// =====================================================
// INITIAL LOAD — Display all assets
// =====================================================
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    displayResults('');
  }, 600);
});
