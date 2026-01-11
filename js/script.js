document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const headerRight = document.querySelector('.header-right');
    
    if (hamburger && headerRight) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            headerRight.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        const navLinks = headerRight.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                headerRight.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        let currentIndex = 1;
        let isTransitioning = false;
        const slideCount = slides.length;
        
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                currentIndex = index + 1;
                updateCarousel();
                resetTimer(); 
            });
            dotsContainer.appendChild(dot);
        });

        const activeBar = document.createElement('div');
        activeBar.classList.add('active-bar');
        activeBar.style.width = `${100 / slideCount}%`;
        dotsContainer.appendChild(activeBar);
        
        const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slideCount - 1].cloneNode(true);
        
        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);
        
        const allSlides = document.querySelectorAll('.slide');
        
        track.style.transform = `translateX(-100%)`;

        function updateCarousel(transition = true) {
            if (transition) {
                track.style.transition = 'transform 0.5s ease-in-out';
                isTransitioning = true;
            } else {
                track.style.transition = 'none';
            }
            
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            let dotIndex = currentIndex - 1;
            if (dotIndex < 0) dotIndex = slideCount - 1;
            if (dotIndex >= slideCount) dotIndex = 0;
            
            activeBar.style.transform = `translateX(${dotIndex * 100}%)`;
        }

        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (currentIndex === 0) {
                currentIndex = slideCount;
                updateCarousel(false);
            } else if (currentIndex === slideCount + 1) {
                currentIndex = 1;
                updateCarousel(false);
            }
        });

        let interval = setInterval(() => {
            if (!isTransitioning) {
                currentIndex++;
                updateCarousel();
            }
        }, 3000);

        function resetTimer() {
            clearInterval(interval);
            interval = setInterval(() => {
                if (!isTransitioning) {
                    currentIndex++;
                    updateCarousel();
                }
            }, 3000);
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (isTransitioning) return;
                currentIndex++;
                updateCarousel();
                resetTimer();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (isTransitioning) return;
                currentIndex--;
                updateCarousel();
                resetTimer();
            });
        }
    }

    const donationBtns = document.querySelectorAll('.donation-btn');
    donationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            } else {
                donationBtns.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            }
        });
    });
});
