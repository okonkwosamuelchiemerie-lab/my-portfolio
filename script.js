// ===== THEME TOGGLE =====
function getSavedTheme() {
    try { return localStorage.getItem('theme') || 'dark'; }
    catch (e) { return 'dark'; }
}

function updateThemeIcons(theme) {
    const iconClass = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    document.querySelectorAll('.theme-toggle i').forEach(i => {
        i.className = iconClass;
    });
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    });
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateThemeIcons(next);
}

// FIX: the buttons have no inline onclick any more, so they must be wired up here
document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
});

const savedTheme = getSavedTheme();
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

// ===== MOBILE NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav .nav-links a');

function openMenu() {
    hamburger.classList.add('active');
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function toggleMenu() {
    if (mobileNav.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
}

if (hamburger) hamburger.addEventListener('click', toggleMenu);
if (overlay) overlay.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
        closeMenu();
    }
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#22c55e';
            this.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ===== YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});