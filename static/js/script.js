// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", function() {
    // Adiciona a classe "show" ao título e ao botão após um pequeno delay
    setTimeout(() => {
        document.querySelector("h1").classList.add("show");
        document.querySelector(".btn").classList.add("show");
    }, 500); // Meio segundo de atraso
});
