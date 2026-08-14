// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const icons = document.querySelectorAll('.theme-toggle i');
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    icons.forEach(i => i.className = next === 'light' ? 'fas fa-sun' : 'fas fa-moon');
}

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
document.querySelectorAll('.theme-toggle i').forEach(i => {
    i.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
});

// Mobile Nav — FIXED
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.querySelector('.overlay');
    const hamburger = document.querySelector('.hamburger');
    
    if (!mobileNav || !overlay || !hamburger) return;
    
    const isActive = mobileNav.classList.contains('active');
    
    if (isActive) {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close mobile nav on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    }
});

// Auto-close mobile nav when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    }
});

// Navbar scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Form
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#22c55e';
        e.target.reset();
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
}

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});