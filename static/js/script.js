// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.querySelector("h1").classList.add("show");
        document.querySelector(".btn").classList.add("show");
    }, 500);
});

// Evento de clique no botão "Iniciar"
document.querySelector(".btn").addEventListener("click", function() {
    let container = document.querySelector(".container");

    // Adiciona classe para desaparecer suavemente e subir
    container.classList.add("disappear");

    // Aguarda o fim da animação antes de criar a tela do jogo
    setTimeout(() => {
        container.style.display = "none"; // Remove o container da tela

        // Criar a tela do jogo dinamicamente
        let gameScreen = document.createElement("div");
        gameScreen.classList.add("game-screen");

        // Adiciona um texto inicial
        let welcomeText = document.createElement("h2");
        welcomeText.classList.add("welcome-text");
        welcomeText.innerText = "Bem-vindo à sua aventura!";
        gameScreen.appendChild(welcomeText);

        // Adiciona a tela ao corpo da página
        document.body.appendChild(gameScreen);

        // Faz a nova tela aparecer suavemente
        setTimeout(() => {
            gameScreen.classList.add("show");

            // Aguarda 5 segundos antes de desaparecer o texto
            setTimeout(() => {
                welcomeText.classList.add("fade-out");

                // Aguarda a animação do fade-out antes de criar a nova div retangular
                setTimeout(() => {
                    welcomeText.remove(); // Remove o texto após desaparecer

                    // Criar a div retangular no topo usando a função
                    principal_menu();

                }, 1000); // Tempo para fade-out completo
            }, 5000); // Tempo de exibição do texto
        }, 100);
    }, 1000); // Tempo para desaparecer completamente
});

/**
 * Cria a Top-Box na tela do jogo e exibe mensagens de forma sequencial
 * @param {string} imgSrc - Caminho da imagem (opcional, se vazio não exibe a imagem)
 * @param {string[]} messages - Lista de mensagens a serem exibidas uma por uma
 * @param {number} delay - Tempo em segundos antes de avançar automaticamente
 */
function createTopBox(imgSrc, messages, delay) {
    let parent = document.querySelector(".game-screen");
    if (!parent) return; // Se a tela do jogo não existir, não faz nada

    // Remover Top-Box anterior se existir
    let oldBox = document.querySelector(".top-box");
    if (oldBox) oldBox.remove();

    // Criar a Top-Box
    let topBox = document.createElement("div");
    topBox.classList.add("top-box");

    // Criar container da imagem e do texto
    let contentBox = document.createElement("div");
    contentBox.classList.add("content-box");

    // Criar elemento de imagem (se existir um caminho válido)
    if (imgSrc) {
        let img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("npc-image");
        contentBox.appendChild(img);
    }

    // Criar o elemento de texto
    let textBox = document.createElement("p");
    textBox.classList.add("top-box-text");
    contentBox.appendChild(textBox);

    // Adicionar o conteúdo na Top-Box
    topBox.appendChild(contentBox);

    // Criar botão de próxima fala
    let nextButton = document.createElement("button");
    nextButton.innerText = "▶";
    nextButton.classList.add("next-button");
    nextButton.style.display = "none"; // Inicialmente invisível
    topBox.appendChild(nextButton);

    // Adicionar Top-Box na tela
    parent.appendChild(topBox);

    let playerName = ""; // Variável para armazenar o nome do jogador
    let currentMessage = 0;

    function typeMessage(index) {
        textBox.innerHTML = "";
        let message = messages[index];
        let charIndex = 0;

        function typeLetter() {
            if (charIndex < message.length) {
                textBox.innerHTML += message[charIndex];
                charIndex++;
                setTimeout(typeLetter, 50);
            } else {
                nextButton.style.display = "block";

                setTimeout(() => {
                    if (nextButton.style.display !== "none") {
                        nextMessage();
                    }
                }, delay * 1000);
            }
        }

        typeLetter();
    }

    function nextMessage() {
        currentMessage++;
        
        // Se chegou no momento de pedir o nome do jogador, cria o input
        if (messages[currentMessage] === "*INPUT_NOME*") {
            requestPlayerName();
            return;
        }

        if (currentMessage < messages.length) {
            nextButton.style.display = "none";
            typeMessage(currentMessage);
        } else {
            topBox.remove();
        }
    }

    function requestPlayerName() {
        textBox.innerHTML = "Digite seu nome:";
        nextButton.style.display = "none";

        let inputField = document.createElement("input");
        inputField.setAttribute("type", "text");
        inputField.setAttribute("placeholder", "Seu nome...");
        inputField.classList.add("name-input");

        parent.appendChild(inputField);
        inputField.focus();

        inputField.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && inputField.value.trim() !== "") {
                playerName = inputField.value.trim();
                inputField.remove();
                messages[currentMessage] = `Seja muito bem-vindo à vila, ${playerName}`;
                nextMessage();
            }
        });
    }

    typeMessage(currentMessage);
    nextButton.addEventListener("click", nextMessage);

    setTimeout(() => {
        topBox.classList.add("show");
    }, 100);
}


async function player_name_choice() {
    if (typeof window !== "undefined") {
        // Código para navegador
        return prompt("Digite o nome do seu personagem:");
    } else {
        // Código para Node.js
        const readline = require("readline");
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => {
            rl.question("Digite o nome do seu personagem: ", nome => {
                rl.close();
                resolve(nome);
            });
        });
    }
}

function sleep(segundos) {
    return new Promise(resolve => setTimeout(resolve, segundos * 1000));
}


async function gameplay() {
    console.log("Iniciando gameplay...");
    // Aqui você adicionaria a lógica do jogo
}

async function principal_menu() {
    createTopBox("", [
        "Olá viajante, bem-vindo ao reino!",
        "Aqui você encontrará grandes aventuras.",
        "Está pronto para começar?",
        "*INPUT_NOME*", // Aqui será exibido o input para digitar o nome
        "Seja muito bem-vindo à vila, ${player_name}",
        "Vamos começar a aventura!"
    ], 3);
    console.log("Seja bem-vindo ao jogo de RPG");
    await sleep(2);

    console.log('Você é um novo integrante da vila');
    await sleep(3);

    console.log('Você precisa escolher um nome para seu personagem:');
    let player_name = await player_name_choice();  // Aguarda o jogador inserir um nome
    await sleep(2);

    console.log(`Seja muito bem-vindo à vila, ${player_name}`);
    await sleep(4);

    console.log('Vamos começar a aventura!');
    await sleep(2);

    gameplay();  // Inicia o jogo
}

// Iniciar o menu principal
