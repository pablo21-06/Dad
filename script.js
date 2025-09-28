// Esperar a que la página se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Crear partículas flotantes en el fondo
    createFloatingParticles();
    
    // Añadir efectos de hover a las tarjetas
    addCardHoverEffects();
    
    // Añadir efecto de escritura al título principal
    typeWriterEffect();
    
    // Añadir efectos de scroll suaves
    addScrollEffects();
    
    // Manejar el cambio de imagen
    handleImageUpload();
    
    // Añadir efectos de mouse tracking
    addMouseTrackingEffects();
    
    // Inicializar animaciones en scroll
    initScrollAnimations();
});

// Función para crear partículas flotantes
function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Delay aleatorio para la animación
        particle.style.animationDelay = Math.random() * 8 + 's';
        
        // Duración aleatoria
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Efectos de hover para las tarjetas
function addCardHoverEffects() {
    const qualityCards = document.querySelectorAll('.quality-card');
    
    qualityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Añadir efecto de brillo
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Efecto de escritura para el título principal
function typeWriterEffect() {
    const title = document.querySelector('.main-title');
    const originalText = title.textContent;
    const speed = 100; // Velocidad de escritura en ms
    
    title.textContent = '';
    title.style.borderRight = '3px solid white';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Remover el cursor después de terminar
            setTimeout(() => {
                title.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Iniciar el efecto después de una pequeña pausa
    setTimeout(typeWriter, 500);
}

// Efectos de scroll suaves
function addScrollEffects() {
    // Scroll suave para toda la página
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Efecto parallax en el header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        const parallaxSpeed = 0.5;
        
        header.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        header.style.opacity = 1 - scrolled / window.innerHeight;
    });
}

// Manejar el cambio de imagen (simplificado)
function handleImageUpload() {
    const photoFrame = document.querySelector('.photo-frame');
    
    // Simular drag and drop visual feedback
    photoFrame.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(1.05)';
        this.style.opacity = '0.8';
    });
    
    photoFrame.addEventListener('dragleave', function(e) {
        this.style.transform = 'scale(1)';
        this.style.opacity = '1';
    });
}

// Efectos de seguimiento del mouse
function addMouseTrackingEffects() {
    const messageCard = document.querySelector('.message-card');
    const birthdayCard = document.querySelector('.birthday-card');
    
    [messageCard, birthdayCard].forEach(card => {
        if (card) {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        }
    });
}

// Animaciones activadas por scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll('.message-card, .quality-card, .birthday-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Función para añadir efectos de confeti (solo en cumpleaños)
function createConfetti() {
    const colors = ['#ff6b6b', '#ffa726', '#42a5f5', '#66bb6a', '#ab47bc'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remover confeti después de 5 segundos
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Evento especial para el cumpleaños
document.querySelector('.birthday-card').addEventListener('click', function() {
    createConfetti();
    
    // Añadir un mensaje especial
    const specialMessage = document.createElement('div');
    specialMessage.innerHTML = '🎉 ¡Que tengas el mejor cumpleaños del mundo, papá! 🎉';
    specialMessage.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ff6b6b, #ffa726);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1.2rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: bounceIn 0.6s ease-out;
    `;
    
    document.body.appendChild(specialMessage);
    
    // Remover mensaje después de 4 segundos
    setTimeout(() => {
        specialMessage.style.animation = 'bounceOut 0.6s ease-in forwards';
        setTimeout(() => specialMessage.remove(), 600);
    }, 4000);
});

// Función para crear corazones flotantes
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.style.position = 'fixed';
    heartsContainer.style.top = '0';
    heartsContainer.style.left = '0';
    heartsContainer.style.width = '100%';
    heartsContainer.style.height = '100%';
    heartsContainer.style.pointerEvents = 'none';
    heartsContainer.style.zIndex = '1000';
    
    document.body.appendChild(heartsContainer);
    
    const heartSymbols = ['❤️', '💖', '💝', '💗', '💓'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.animation = `floatUp ${Math.random() * 2 + 3}s ease-out forwards`;
        
        heartsContainer.appendChild(heart);
    }
    
    setTimeout(() => {
        heartsContainer.remove();
    }, 5000);
}

// Evento para crear corazones al hacer hover en la foto
document.querySelector('.father-photo').addEventListener('mouseenter', function() {
    createFloatingHearts();
});

// Función para mostrar mensaje motivacional aleatorio
function showRandomMessage() {
    const messages = [
        "Un padre como tú es un regalo del cielo 🌟",
        "Gracias por ser mi guía y mi ejemplo a seguir ✨",
        "Tu amor incondicional es mi mayor fortaleza 💪",
        "Eres el héroe de mi historia de vida 🦸‍♂️",
        "Cada día agradezco tenerte como padre ❤️"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 1rem;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

// Mostrar mensaje motivacional cada 30 segundos
setInterval(showRandomMessage, 30000);

// Función para añadir efecto de ondas al hacer click
function createRippleEffect(e) {
    const ripple = document.createElement('div');
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    e.target.style.position = 'relative';
    e.target.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Añadir efecto ripple a las tarjetas
document.querySelectorAll('.quality-card, .message-card').forEach(card => {
    card.addEventListener('click', createRippleEffect);
});

// Función para alternar modo nocturno (bonus)
function toggleNightMode() {
    document.body.classList.toggle('night-mode');
    
    const nightModeStyles = `
        .night-mode {
            filter: hue-rotate(180deg) invert(1);
        }
        .night-mode img {
            filter: hue-rotate(180deg) invert(1);
        }
    `;
    
    if (!document.querySelector('#night-mode-styles')) {
        const nightStyles = document.createElement('style');
        nightStyles.id = 'night-mode-styles';
        nightStyles.textContent = nightModeStyles;
        document.head.appendChild(nightStyles);
    }
}

// Easter egg: Tecla secreta para modo nocturno (presionar Ctrl + N)
document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'n' && e.ctrlKey) {
        e.preventDefault();
        toggleNightMode();
        
        const modeMessage = document.createElement('div');
        modeMessage.textContent = '🌙 Modo nocturno activado/desactivado';
        modeMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            font-size: 1.1rem;
            z-index: 10000;
            animation: fadeInOut 2s ease-in-out forwards;
        `;
        
        document.body.appendChild(modeMessage);
        setTimeout(() => modeMessage.remove(), 2000);
    }
});

// Añadir animación de caída para confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
`;
document.head.appendChild(style);