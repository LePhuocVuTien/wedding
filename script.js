// Gallery images array
const galleryImages = [
    'images/gallery-1.jpeg',
    'images/gallery-2.jpeg',
    'images/gallery-3.jpeg',
    'images/gallery-4.jpeg',
    'images/gallery-5.jpeg',
    'images/gallery-6.jpeg',
    'images/gallery-7.jpeg',
    'images/gallery-8.jpeg',
    'images/gallery-9.jpeg',
    'images/gallery-10.jpeg',
    'images/gallery-11.jpeg',
    'images/gallery-12.jpeg',
    'images/gallery-13.jpeg',
    'images/gallery-14.jpeg',
    'images/gallery-15.jpeg'
];

let currentImageIndex = 0;

// ========== COUNTDOWN TIMER ==========
// Wedding date: March 10, 2026
const weddingDate = new Date('2026-03-10T09:30:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update display
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // If countdown is over
    if (timeLeft < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// ========== FALLING PETALS EFFECT ==========
function createPetal() {
    const petalsContainer = document.getElementById('fallingPetals');
    if (!petalsContainer) return;

    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Random petal symbols
    const petalSymbols = ['❀', '✿', '❁', '✾', '🌸', '🌺'];
    petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
    
    // Random horizontal position
    petal.style.left = Math.random() * 100 + '%';
    
    // Random animation duration (slower = more elegant)
    const duration = Math.random() * 10 + 15; // 15-25 seconds
    petal.style.animationDuration = duration + 's';
    
    // Random delay
    petal.style.animationDelay = Math.random() * 5 + 's';
    
    // Random size variation
    const size = Math.random() * 10 + 15; // 15-25px
    petal.style.fontSize = size + 'px';
    
    // Random opacity
    petal.style.opacity = Math.random() * 0.4 + 0.3; // 0.3-0.7
    
    petalsContainer.appendChild(petal);
    
    // Remove petal after animation completes
    setTimeout(() => {
        petal.remove();
    }, (duration + 5) * 1000);
}

// Create petals periodically (adjust frequency for mobile)
function startFallingPetals() {
    const isMobile = window.innerWidth <= 768;
    const petalCount = isMobile ? 8 : 15; // Fewer petals on mobile for performance
    
    // Create initial batch of petals
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => createPetal(), i * 500);
    }
    
    // Continue creating petals
    const interval = isMobile ? 3000 : 2000; // Less frequent on mobile
    setInterval(createPetal, interval);
}

// Start petals when page loads
window.addEventListener('load', startFallingPetals);

// ========== MUSIC PLAYER ==========
const audio = document.getElementById('weddingMusic');
const musicPlayer = document.getElementById('musicPlayer');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;
let hasInteracted = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicPlayer.classList.remove('playing');
        musicIcon.textContent = '🎵';
        isPlaying = false;
    } else {
        // Start muted first for iOS Safari compatibility
        audio.muted = false;
        audio.play().then(() => {
            musicPlayer.classList.add('playing');
            musicIcon.textContent = '🎶';
            isPlaying = true;
        }).catch(error => {
            console.log('Không thể phát nhạc:', error);
            // Try with muted autoplay for iOS
            audio.muted = true;
            audio.play().then(() => {
                // Unmute after successful muted playback
                setTimeout(() => {
                    audio.muted = false;
                }, 100);
                musicPlayer.classList.add('playing');
                musicIcon.textContent = '🎶';
                isPlaying = true;
            });
        });
    }
}

// Auto-start music on first user interaction (iOS compatible)
function startMusicOnInteraction() {
    if (!hasInteracted && !isPlaying) {
        hasInteracted = true;
        // Start muted
        audio.muted = true;
        audio.play().then(() => {
            // Unmute after a short delay
            setTimeout(() => {
                audio.muted = false;
            }, 100);
            musicPlayer.classList.add('playing');
            musicIcon.textContent = '🎶';
            isPlaying = true;
        }).catch(error => {
            console.log('Không thể tự động phát nhạc:', error);
        });
    }
}

// Listen for any user interaction
['click', 'touchstart', 'keydown'].forEach(event => {
    document.body.addEventListener(event, startMusicOnInteraction, { once: true });
});

// ========== LIGHTBOX FUNCTIONS ==========
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event.target.id === 'lightbox' || event.target.className === 'lightbox-close') {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function changeImage(direction, event) {
    event.stopPropagation();
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    document.getElementById('lightbox-img').src = galleryImages[currentImageIndex];
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1, e);
        } else if (e.key === 'ArrowRight') {
            changeImage(1, e);
        }
    }
});

// ========== QR MODAL FUNCTIONS ==========
function openQRModal(type) {
    const modal = document.getElementById('qrModal');
    const img = document.getElementById('qrModalImg');
    
    if (type === 'groom') {
        img.src = 'images/groom-qr.jpeg';
        img.alt = 'QR Code chú rể - Lê Phước Vũ Tiến';
    } else {
        img.src = 'images/bride-qr.jpeg';
        img.alt = 'QR Code cô dâu - Lê Thị Xuân Giang';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQRModal(event) {
    if (event.target.id === 'qrModal' || event.target.className === 'qr-modal-close') {
        document.getElementById('qrModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ========== SCROLL ANIMATION OBSERVER ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Timeline items scroll animation - with staggered delays
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});