/* ==========================================================================
   INTELLIGENZ 2K26 - TACTICAL LOGIC & INTERACTIVITY (MAIN.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initLocalClock();
  initCountdown();
  initNavigation();
  initFaqAccordion();
  initTerminalCLI();
  initScrollEffects();
  initDispatchForm();
});

/* ==========================================================================
   1. PRELOADER & INITIALIZATION SEQUENCE
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressFill = document.getElementById('preloaderProgress');
  const percentText = document.getElementById('preloaderPercent');
  const logsContainer = document.getElementById('preloaderLogs');
  const skipBtn = document.getElementById('preloaderSkip');

  if (!preloader) return;

  const bootLogs = [
    { time: "[0.001s]", text: "KERNEL_INIT: INTELLIGENZ OS v4.09 loading...", type: "normal" },
    { time: "[0.045s]", text: "MEM_ALLOC: 64GB High-Density RAM mapped.", type: "normal" },
    { time: "[0.120s]", text: "NET_SYNC: Establishing encrypted uplink...", type: "normal" },
    { time: "[0.350s]", text: "SEC_CHK: Defcon 1 protocols activated.", type: "success" },
    { time: "[0.680s]", text: "CYBER_ARENA: Initializing INTELLIGENZ 2K26 matrices...", type: "normal" },
    { time: "[0.950s]", text: "SYSTEM READY: Status Online & Armed.", type: "success" }
  ];

  let progress = 0;
  let logIndex = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress > 100) progress = 100;

    if (progressFill) progressFill.style.width = `${progress}%`;
    if (percentText) percentText.textContent = `${progress}%`;

    // Add log entries progressively
    if (logIndex < bootLogs.length && progress >= (logIndex + 1) * 16) {
      const log = bootLogs[logIndex];
      const line = document.createElement('div');
      line.className = 'log-line';
      line.innerHTML = `<span class="log-time">${log.time}</span> <span class="log-text ${log.type === 'success' ? 'log-success' : ''}">${log.text}</span>`;
      logsContainer.appendChild(line);
      logsContainer.scrollTop = logsContainer.scrollHeight;
      logIndex++;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(hidePreloader, 400);
    }
  }, 70);

  function hidePreloader() {
    preloader.classList.add('hidden');
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', hidePreloader);
  }
}

/* ==========================================================================
   2. REAL-TIME HUD LOCAL CLOCK
   ========================================================================== */
function initLocalClock() {
  const hudClock = document.getElementById('hudLocalClock');
  const heroClock = document.getElementById('heroLocalClock');

  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const formatted = `${timeStr} IST`;

    if (hudClock) hudClock.textContent = formatted;
    if (heroClock) heroClock.textContent = formatted;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   3. EVENT COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMinutes = document.getElementById('cdMinutes');
  const cdSeconds = document.getElementById('cdSeconds');

  const targetDate = new Date('October 9, 2026 09:00:00').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMinutes) cdMinutes.textContent = '00';
      if (cdSeconds) cdSeconds.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(d).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(h).padStart(2, '0');
    if (cdMinutes) cdMinutes.textContent = String(m).padStart(2, '0');
    if (cdSeconds) cdSeconds.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. NAVIGATION & DROPDOWN HANDLING
   ========================================================================== */
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownTrigger = document.getElementById('moreDropdownTrigger');
  const dropdownMenu = document.getElementById('moreDropdownMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });
  }

  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && !dropdownTrigger.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  }

  // Close mobile menu when clicking links
  document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');
      if (dropdownMenu) dropdownMenu.classList.remove('show');
    });
  });

  // Sticky Navbar border transition on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   5. INTERACTIVE FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(other => other.classList.remove('active'));

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   6. INTERACTIVE MINI TERMINAL CLI WIDGET
   ========================================================================== */
function initTerminalCLI() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  if (!terminalInput || !terminalOutput) return;

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';

      if (command.length === 0) return;

      // Print command line
      appendTerminalLine(`> ${command}`, 't-command-line');

      // Process command
      processCommand(command);

      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  function appendTerminalLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `t-line ${className}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
  }

  function processCommand(cmd) {
    switch (cmd) {
      case 'help':
        appendTerminalLine('AVAILABLE COMMANDS:', 't-highlight');
        appendTerminalLine('  events       - List main battle arenas');
        appendTerminalLine('  location     - Show venue map & GPS intel');
        appendTerminalLine('  register     - Jump to pass registration');
        appendTerminalLine('  status       - Print defense telemetry');
        appendTerminalLine('  accommodation - Show lodging rules & fee');
        appendTerminalLine('  matrix       - Render hacker matrix effect');
        appendTerminalLine('  clear        - Flush terminal buffer');
        break;

      case 'location':
        appendTerminalLine('LOCATION INTEL: https://maps.app.goo.gl/5B6TnnpnXJMTeKta8', 't-highlight');
        const locSec = document.getElementById('location');
        if (locSec) locSec.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'events':
        appendTerminalLine('[TECH]: Innov Expo | Prompt-a-thon | Paper Talks | Workshop');
        appendTerminalLine('[NON-TECH]: Esport Gaming (Free Fire) | IPL Auction');
        break;

      case 'register':
        appendTerminalLine('Redirecting tactical operative to registration matrix...', 't-highlight');
        const regSec = document.getElementById('registration');
        if (regSec) regSec.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'status':
        appendTerminalLine('STATUS: ONLINE & ARMED | DEFCON: 1 | ENCRYPTION: AES-256 | BOUNTY: ₹25,000+');
        break;

      case 'accommodation':
        appendTerminalLine('LODGING FEE: ₹300/night | INCLUDES: Dormitory, 24/7 Wi-Fi, Security, Mess Meals');
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        appendTerminalLine('INTELLIGENZ 2K26 TERMINAL CLI v4.09');
        appendTerminalLine('Type "help" for a list of available tactical directives.');
        break;

      case 'matrix':
        appendTerminalLine('01001110 01000101 01010101 01010010 01000001 01001100 01011111 01001110 01000101 01011000 01010101 01010011', 't-highlight');
        break;

      default:
        appendTerminalLine(`Command not recognized: "${cmd}". Type "help" for available commands.`, 't-error');
        break;
    }
  }
}

/* ==========================================================================
   7. SCROLL EFFECTS & ACTIVE HIGHLIGHT
   ========================================================================== */
function initScrollEffects() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. DISPATCH FORM SIMULATION
   ========================================================================== */
function initDispatchForm() {
  const form = document.getElementById('dispatchForm');
  const statusMsg = document.getElementById('dispatchStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.className = 'badge-tactical badge-cyan';
        statusMsg.textContent = '[COMMUNICATION TRANSMITTED SUCCESSFULLY to INTELLIGENZ COMMAND HQ]';
        form.reset();
        setTimeout(() => {
          statusMsg.style.display = 'none';
        }, 5000);
      }
    });
  }
}

/* ==========================================================================
   9. TACTICAL MODAL HANDLERS
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modals when clicking backdrop
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('tactical-modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});