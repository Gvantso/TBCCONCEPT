
// code for sliders

document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
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
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
            calculateVelocity(e.pageX, Date.now());
        });
    });
});


// code for mobile nav menu and nav button span animations

const hamMenu = document.getElementById("ham")
const hamFirst = document.getElementById("span1")
const hamSecond = document.getElementById("span2")
const hamThird = document.getElementById("span3")

const navMenu = document.getElementById("nav-menu")

hamMenu.addEventListener('click', function () {

    hamFirst.classList.toggle("span1-active")
    hamSecond.classList.toggle("span2-active")
    hamThird.classList.toggle("span3-active")

    navMenu.classList.toggle("nav-active")
})

const handlers = document.querySelectorAll(".handler");
const handlerArrows = document.querySelectorAll(".handler-arrow");

handlers.forEach((handler, index) => {
    handler.addEventListener("click", function() {
        const hiddenItems = this.nextElementSibling;
        const handlerArrow = handlerArrows[index];

        // Close all other handlers which are open excluding the one which is clicked
        handlers.forEach((otherHandler, otherIndex) => {
            if (otherHandler !== handler) {
                const otherHiddenItems = otherHandler.nextElementSibling;
                otherHiddenItems.style.maxHeight = "0";
                otherHiddenItems.style.paddingBottom = "0";
                handlerArrows[otherIndex].classList.remove("arrow-active");
            }
        });

        // Toggle the clicked handler
        if (hiddenItems.style.maxHeight === "0px" || hiddenItems.style.maxHeight === "") {
            hiddenItems.style.maxHeight = hiddenItems.scrollHeight + 16 + "px";
            hiddenItems.style.paddingTop = "16px";
            handlerArrow.classList.add("arrow-active");
        } else {
            hiddenItems.style.maxHeight = "0";
            hiddenItems.style.paddingBottom = "0";
            handlerArrow.classList.toggle("arrow-active");
        }
    });
});