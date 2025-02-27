document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("NIYDrK5we5-T6fQjH"); // Inicia o EmailJS com sua Public Key

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Captura o token do reCAPTCHA
        var captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse) {
            alert("Por favor, complete o reCAPTCHA!");
            return;
        }

        // Dados do formulário
        var params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            "g-recaptcha-response": captchaResponse, // Envia o token do reCAPTCHA
        };

        // Envia o e-mail pelo EmailJS
        emailjs.send("service_hlevq7i", "template_uf5cfji", params)
            .then(function (response) {
                alert("Mensagem enviada com sucesso!");
                document.getElementById("contact-form").reset();
                grecaptcha.reset(); // Reseta o reCAPTCHA
            }, function (error) {
                alert("Erro ao enviar mensagem, tente novamente!");
                console.error("Erro:", error);
            });
    });
});


let lastSentTime = 0;

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let now = new Date().getTime();

    if (now - lastSentTime < 60000) { // 1 minuto de espera
        alert("Espere um pouco antes de enviar outra mensagem.");
        return;
    }

    lastSentTime = now;
});
