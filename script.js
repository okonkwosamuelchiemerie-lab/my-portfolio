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

        // Mobile Nav
        function toggleMobileNav() {
            document.getElementById('mobileNav').classList.toggle('active');
            document.querySelector('.overlay').classList.toggle('active');
            document.querySelector('.hamburger').classList.toggle('active');
        }

        // Navbar scroll
        window.addEventListener('scroll', () => {
            document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
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

        document.getElementById('year').textContent = new Date().getFullYear();

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });