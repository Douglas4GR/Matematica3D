let swiper; // Swiper declarado no escopo global

document.addEventListener("DOMContentLoaded", function () {


  // === Inicializa o Swiper ===
  swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    mousewheel: true,
    keyboard: true,
    pagination: {
      el: '.swiper-pagination',
    },
  });

  // === Loop de todas as galerias ===

  const galeriaInfos = [];

  document.querySelectorAll('.infinite-gallery-row').forEach((row) => {
    const gallery = row.querySelector('.infinite-gallery');

    // Clona o conteúdo sem usar innerHTML
    const repetitions = 3;
    for (let i = 0; i < repetitions - 1; i++) {
      const clone = gallery.cloneNode(true);
      gallery.append(...clone.children);
    }


    const originalWidth = gallery.scrollWidth / 2;
    const speed = parseFloat(row.dataset.speed) || 0.5;

    galeriaInfos.push({
      gallery,
      originalWidth,
      speed,
      position: 0
    });
  });

  function loopTodasGalerias() {
    galeriaInfos.forEach(info => {
      info.position -= info.speed;

      if (Math.abs(info.position) >= info.originalWidth) {
        info.position = 0;
      }

      info.gallery.style.transform = `translateX(${info.position}px)`;
    });

    requestAnimationFrame(loopTodasGalerias);
  }

  // Inicia o loop
  loopTodasGalerias();
});
