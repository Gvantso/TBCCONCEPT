document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX;
    let lastTime;
    let animationFrameId;

    function calculateVelocity(x, time) {
        if (lastX !== undefined && lastTime !== undefined) {
            const deltaX = x - lastX;
            const deltaTime = time - lastTime;
            if (deltaTime > 0) {
                velocity = deltaX / deltaTime;
            }
        }
        lastX = x;
        lastTime = time;
    }

    function applyMomentum() {
        if (Math.abs(velocity) < 0.1) {
            cancelAnimationFrame(animationFrameId);
            return;
        }
        const newScrollLeft = slider.scrollLeft - velocity * 6;
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

        if (newScrollLeft < -20) {
            slider.scrollLeft = -20;
        } else if (newScrollLeft > maxScrollLeft + 20) {
            slider.scrollLeft = maxScrollLeft + 20;
        } else {
            slider.scrollLeft = newScrollLeft;
        }

        velocity *= 0.95;
        animationFrameId = requestAnimationFrame(applyMomentum);
    }

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        lastX = e.pageX;
        lastTime = Date.now();
        e.preventDefault();
    });

    slider.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            slider.classList.remove('active');
            applyMomentum();
        }
    });

    slider.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            slider.classList.remove('active');
            applyMomentum();
        }
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.3;
        slider.scrollLeft = scrollLeft - walk;
        calculateVelocity(e.pageX, Date.now());
    });
});
