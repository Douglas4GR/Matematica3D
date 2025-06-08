let swiper; // Swiper declarado no escopo global

document.addEventListener("DOMContentLoaded", function () {
  // Inicializa EmailJS
  emailjs.init("NIYDrK5we5-T6fQjH");

  // Envio do formulário
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      emailjs.send("service_hlevq7i", "template_uf5cfji", params)
        .then(() => {
          alert("Mensagem enviada com sucesso!");
          form.reset();
        }, (error) => {
          alert("Erro ao enviar mensagem, tente novamente!");
          console.error("Erro:", error);
        });
    });
  }

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
