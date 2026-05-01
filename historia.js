// --- 1. ALGORITMO DE FOTOS PEQUEÑAS FLOTANTES ---
// Pon el nombre de tus imágenes aquí (pueden ser de la misma carpeta)
const miniFotos = ["img_h/1.jpeg", "img_h/2.jpeg", "img_h/3.jpeg", "img_h/5.jpeg", "img_h/6.jpeg", "img_h/7.jpeg"];

function createFloatingPhotos() {
    const container = document.getElementById('photos-container');
    
    miniFotos.forEach((src, index) => {
        const img = document.createElement('img');
        img.className = 'floating-pic';
        
        // Si no tienes la foto todavía, pone este cuadro rosado de prueba
        img.onerror = () => { img.src = 'https://via.placeholder.com/100/ffb3c1/ffffff?text=Amor' };
        img.src = src;

        // Distribución aleatoria por la pantalla evitando el centro exacto
        img.style.top = (Math.random() * 80 + 10) + 'vh';
        let randomLeft = Math.random() * 80 + 10;
        img.style.left = randomLeft + 'vw';
        
        // Diferentes tiempos de animación para que no se muevan igual
        img.style.animationDelay = (Math.random() * 5) + 's';
        img.style.animationDuration = (Math.random() * 4 + 6) + 's'; // Levitan entre 6s y 10s

        container.appendChild(img);
    });
}

// --- 2. GENERADOR DE CORAZONES ---
function createHearts() {
    const container = document.getElementById('hearts-container');
    const symbols = ['❤️', '💖', '✨']; 

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px'; 
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's'; 
        
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 8000); 
    }, 400); 
}

// Inicializar elementos decorativos al cargar
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    createFloatingPhotos();
});

// --- 3. TRANSICIONES LIMPIAS DE CAPAS ---
function nextStep(current, next) {
    const currentCard = document.getElementById(`step${current}`);
    const nextCard = document.getElementById(`step${next}`);

    currentCard.classList.replace('animate__fadeInUp', 'animate__fadeOutDown');

    setTimeout(() => {
        currentCard.classList.add('d-none');
        nextCard.classList.remove('d-none');
        nextCard.classList.replace('animate__fadeOutDown', 'animate__fadeInUp');
    }, 600);
}

// --- 4. ALGORITMO MULTIPLATAFORMA DEL BOTÓN "NO" ---
function smartEscape(e) {
    if(e) e.preventDefault(); // Bloquea clicks o toques fantasma en móvil
    
    const btnNo = document.getElementById('btnNo');
    
    // Cambiar a fixed solo cuando se activa, para mantener el responsive inicial
    if(btnNo.style.position !== 'fixed') {
        btnNo.style.position = 'fixed';
        
        // ¡EL TRUCO MAESTRO!
        // Lo sacamos de la tarjeta y lo ponemos directamente en el body
        document.body.appendChild(btnNo); 
        
        // Nos aseguramos de que esté por encima de absolutamente todo
        btnNo.style.zIndex = '99999'; 
    }

    // Calculamos el espacio asegurándonos de que no se salga de la ventana
    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    // Aplicamos la nueva posición
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

// Escuchadores de eventos para Celular y PC
const btnNo = document.getElementById('btnNo');
btnNo.addEventListener('mouseover', smartEscape);
btnNo.addEventListener('touchstart', smartEscape); 
btnNo.addEventListener('click', smartEscape);

// --- 5. REDIRECCIÓN ---
function goToGalaxy() {
    window.location.href = 'universo.html';
}