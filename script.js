let swiper; // Declara fora para ter acesso global

window.addEventListener('load', () => {
  swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    mousewheel: true,
    keyboard: true,
    pagination: {
      el: '.swiper-pagination',
    },
  });
});


document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("NIYDrK5we5-T6fQjH");

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Dados do formulário
        var params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            // Não enviar mais o campo "g-recaptcha-response"
        };

        // Envia o e-mail pelo EmailJS
        emailjs.send("service_hlevq7i", "template_uf5cfji", params)
            .then(function (response) {
                alert("Mensagem enviada com sucesso!");
                document.getElementById("contact-form").reset();
            }, function (error) {
                alert("Erro ao enviar mensagem, tente novamente!");
                console.error("Erro:", error);
            });
    });
});
