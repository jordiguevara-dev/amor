// --- 1. TUS FOTOS (Agrega todas las que quieras aquí) ---
// Puedes poner fotos de sus viajes a Chanchamayo, de la familia, etc.
const misFotos = [
    "img_u/1.jpeg", "img_u/2.jpeg", "img_u/3.jpeg", "img_u/4.jpeg", "img_u/5.jpeg",
    "img_u/6.jpeg", "img_u/7.jpeg", "img_u/8.jpeg", "img_u/9.jpeg", "img_u/10.jpeg", 
    "img_u/11.jpeg", "img_u/12.jpeg", "img_u/13.jpeg", "img_u/14.jpeg", "img_u/15.jpeg", "img_u/16.jpeg"
];

// --- 2. GENERADOR DEL UNIVERSO ---
const scene = document.getElementById('scene');
const depthPerPhoto = window.innerWidth < 768 ? 600 : 1000; // En celular están más cerca, en PC más lejos

misFotos.forEach((src, index) => {
    const div = document.createElement('div');
    div.className = 'photo-layer';
    
    // Esparcimiento caótico pero controlado
    // La X (horizontal) y la Y (vertical) son aleatorias.
    const maxSpreadX = window.innerWidth < 768 ? 300 : 1200;
    const maxSpreadY = window.innerWidth < 768 ? 400 : 800;
    
    const x = (Math.random() - 0.5) * maxSpreadX; 
    const y = (Math.random() - 0.5) * maxSpreadY;  
    
    // La Z es la profundidad. Cada foto está más "adentro" que la anterior.
    const z = -(index * depthPerPhoto) - 500; 
    
    div.style.transform = `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`;
    
    // Fallback: Si no has puesto la foto, pone un cuadro rosa bonito
    div.innerHTML = `<img src="${src}" onerror="this.src='https://via.placeholder.com/400x400/ffb3c1/ffffff?text=Nuestra+Foto'">`;
    scene.appendChild(div);
});

// Colocar el mensaje final al fondo de todo el túnel
const maxDepth = -(misFotos.length * depthPerPhoto) - 1500;
document.getElementById('final-message').style.transform = `translate3d(0, 0, ${maxDepth}px) translate(-50%, -50%)`;

// --- 3. GENERADOR DE ESTRELLAS REALISTAS ---
function createStars() {
    const starField = document.getElementById('star-field');
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 70 : 150; // Menos estrellas en móvil para no saturar la memoria

    for(let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        star.className = 'glowing-star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        let size = Math.random() * 3 + 1; 
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 3 + 's';
        starField.appendChild(star);
    }
}
createStars();

// --- 4. FÍSICA DE NAVEGACIÓN 3D (LERP) ---
let targetZ = 0, currentZ = 0;
let targetX = 0, currentX = 0;
let targetY = 0, currentY = 0;

// A. Control en PC (Rueda del Mouse y Movimiento)
window.addEventListener('wheel', (e) => {
    targetZ += e.deltaY * 2.5; 
    // Evitar retroceder antes de la primera foto y no pasarse del mensaje final
    if (targetZ < 0) targetZ = 0; 
    if (targetZ > Math.abs(maxDepth) + 500) targetZ = Math.abs(maxDepth) + 500;
});

window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX - window.innerWidth / 2) * 0.05;
    targetY = -(e.clientY - window.innerHeight / 2) * 0.05;
});

// B. Control en Celulares (Pantalla Táctil)
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    
    targetZ += deltaY * 8; // Sensibilidad del deslizamiento
    if (targetZ < 0) targetZ = 0; 
    if (targetZ > Math.abs(maxDepth) + 500) targetZ = Math.abs(maxDepth) + 500;
    
    // Efecto parallax sutil al deslizar
    targetX = (window.innerWidth / 2 - e.touches[0].clientX) * 0.1;
    targetY = -(window.innerHeight / 2 - touchY) * 0.1;

    touchStartY = touchY;
});

// C. Bucle de Animación a 60fps
function animate() {
    // Interpolación lineal (suaviza los movimientos abruptos)
    currentZ += (targetZ - currentZ) * 0.08;
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    
    // Aplicar la transformación a toda la escena
    scene.style.transform = `translateZ(${currentZ}px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;
    requestAnimationFrame(animate);
}
animate();

// --- 5. SORPRESA FINAL (CONFETTI) ---
function celebrate() {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffffff', '#ffb3c1', '#2ecc71']
    });
}