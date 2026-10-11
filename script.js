const openButton = document.getElementById('openButton');
const replayButton = document.getElementById('replayButton');
const surprise = document.getElementById('surprise');
const doorFrame = document.getElementById('doorFrame');
const doorImage = document.getElementById('doorImage');
const doorCaption = document.getElementById('doorCaption');
const memories = document.getElementById('memories');
const finalMessage = document.getElementById('finalMessage');
const memoryPhoto = document.getElementById('memoryPhoto');
const photoCaption = document.getElementById('photoCaption');
const dots = document.getElementById('dots');
const music = document.getElementById('backgroundMusic');

const photos = [
  { src: 'imagenes/foto1.jpg', caption: 'A tu lado, hasta los momentos sencillos se vuelven recuerdos bonitos. 💚' },
  { src: 'imagenes/foto2.jpg', caption: 'Tu sonrisa tiene una forma especial de alegrarme el día.' },
  { src: 'imagenes/foto3.jpg', caption: 'Me encanta guardar estos pedacitos de felicidad contigo. ✨' },
  { src: 'imagenes/foto4.jpg', caption: 'Un atardecer lleno de corazones para recordarte lo mucho que importas. ❤️' },
  { src: 'imagenes/foto5.jpg', caption: 'Hasta los momentos cotidianos se vuelven recuerdos especiales.' },
  { src: 'imagenes/ilustracion_amor.png', caption: 'Aunque seamos diferentes, nuestros corazones siempre encuentran la forma de estar juntos. ❤️' },
  { src: 'imagenes/ternurita_rosa.png', caption: 'Así me quedo cuando pienso en ti: con ojitos de corazón y una rosa para mi amor. 🌹' },
  { src: 'imagenes/foto6.jpg', caption: 'Contigo, una foto puede guardar mil emociones. 💚' },
  { src: 'imagenes/foto7.jpg', caption: 'Gracias por cada sonrisa y cada recuerdo bonito.' },
  { src: 'imagenes/foto8.jpg', caption: 'Que nunca nos falten razones para reír y estar cerquita.' },
  { src: 'imagenes/foto9.jpg', caption: 'Un pequeño detalle para recordarte lo especial que eres, Edith. 🌹' },
  { src: 'imagenes/foto10.jpg', caption: 'Y todavía quedan muchos recuerdos lindos por crear juntos. 💚' },
  { src: 'imagenes/ramo_final.png', caption: 'Y para terminar, un ramo de rosas para ti, mi amor. 🌹💗 Siempre quiero verte sonreír.' }
];
let photoIndex = 0;
let photoTimer = null;
let started = false;

function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = Math.random() > .3 ? '♥' : '♡';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (14 + Math.random() * 30) + 'px';
  heart.style.animationDuration = (7 + Math.random() * 8) + 's';
  document.querySelector('.hearts-bg').appendChild(heart);
  setTimeout(() => heart.remove(), 16000);
}
setInterval(createHeart, 420);
for (let i = 0; i < 16; i++) setTimeout(createHeart, i * 180);

function makeDots() {
  dots.innerHTML = '';
  photos.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === photoIndex ? ' active' : '');
    dots.appendChild(dot);
  });
}
function showPhoto(index) {
  photoIndex = index;
  memoryPhoto.classList.remove('show-photo');
  memoryPhoto.style.opacity = '0';
  memoryPhoto.style.transform = 'translateY(10px) scale(.98)';
  setTimeout(() => {
    memoryPhoto.src = photos[index].src;
    photoCaption.textContent = photos[index].caption;
    makeDots();
    memoryPhoto.style.transition = 'opacity .8s ease, transform .8s ease';
    memoryPhoto.style.opacity = '1';
    memoryPhoto.style.transform = 'translateY(0) scale(1)';
  }, 350);
}
function startSlideshow() {
  showPhoto(0);
  photoTimer = setInterval(() => {
    if (photoIndex < photos.length - 1) {
      showPhoto(photoIndex + 1);
    } else {
      clearInterval(photoTimer);
      setTimeout(() => {
        memories.classList.add('hidden');
        finalMessage.classList.remove('hidden');
        finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 3600);
    }
  }, 4200);
}
function resetExperience() {
  clearInterval(photoTimer);
  started = false;
  surprise.classList.add('hidden');
  memories.classList.add('hidden');
  finalMessage.classList.add('hidden');
  doorImage.classList.remove('open');
  doorFrame.classList.remove('approach');
  doorCaption.textContent = 'Hay una sorpresa esperándote al otro lado…';
  openButton.disabled = false;
  openButton.textContent = 'Presiona este botón 💚';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
async function beginExperience() {
  if (started) return;
  started = true;
  openButton.disabled = true;
  openButton.textContent = 'Preparando tu sorpresa… 💚';
  surprise.classList.remove('hidden');
  surprise.scrollIntoView({ behavior: 'smooth', block: 'start' });
  try { music.volume = 0.65; await music.play(); } catch (e) {
    doorCaption.textContent = 'Si la música no empezó, toca el reproductor del navegador para activarla.';
  }
  setTimeout(() => {
    doorFrame.classList.add('approach');
    doorCaption.textContent = 'Acércate un poquito… la puerta está por abrirse.';
  }, 500);
  setTimeout(() => {
    doorImage.classList.add('open');
    doorCaption.textContent = '¡Bienvenida a esta pequeña sorpresa, Edith! 💚';
  }, 2600);
  setTimeout(() => {
    memories.classList.remove('hidden');
    memories.scrollIntoView({ behavior: 'smooth', block: 'start' });
    startSlideshow();
    openButton.disabled = false;
    openButton.textContent = 'Sorpresa abierta 💚';
  }, 4900);
}
openButton.addEventListener('click', beginExperience);
replayButton.addEventListener('click', () => {
  resetExperience();
  setTimeout(beginExperience, 500);
});
