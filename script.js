document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. LOADING SCREEN LOGIC ---
    const loader = document.getElementById('loader');
    const percentEl = document.getElementById('loader-percent');
    let percent = 0;

    // Simulate loading progress
    const interval = setInterval(() => {
        percent += Math.floor(Math.random() * 10) + 1;
        if (percent > 100) percent = 100;
        percentEl.innerText = percent + '%';
        
        if (percent === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 700);
            }, 500);
        }
    }, 100);


    // --- 1. FLUID SIMULATION ---
    const canvas = document.getElementById('fluid-canvas');
    if (typeof webGLFluidSimulation !== 'undefined') {
        webGLFluidSimulation(canvas, {
            TRIGGER: 'hover',
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 512,
            CAPTURE_RESOLUTION: 512,
            DENSITY_DISSIPATION: 0.8,
            VELOCITY_DISSIPATION: 0.98,
            PRESSURE: 0.8,
            CURL: 30,
            SPLAT_RADIUS: 0.35,
            SPLAT_FORCE: 6000,
            SHADING: true,
            COLORFUL: true,
            COLOR_UPDATE_SPEED: 10,
            BACK_COLOR: { r: 10, g: 10, b: 10 },
            BLOOM: true,
            BLOOM_ITERATIONS: 8,
            BLOOM_INTENSITY: 0.4,
            BLOOM_THRESHOLD: 0.6,
        });
    }

    // --- 2. CUSTOM CURSOR LOGIC ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverTriggers = document.querySelectorAll('.hover-trigger');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    hoverTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px'; // Grow on hover
            cursorOutline.style.height = '60px';
            // Keeping outline opacity 1 to avoid transparency "gray" look
            cursorOutline.style.opacity = '1'; 
            cursorDot.style.opacity = '0';
        });

        trigger.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '20px'; // Reset to small size
            cursorOutline.style.height = '20px';
            cursorOutline.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    });

    // --- 3. FORM VALIDATION & HANDLING ---
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            e.preventDefault(); 
            alert("Please fill in Name, Email, and Message before sending.");
            return;
        }

        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerHTML = 'Sending...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
        }, 3000);
    });
});