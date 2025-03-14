let player_name = 'Mark';
npc_trainer = 'Rashid:';
npc_merchant = 'Flint:';
village_name = 'Endcity';

const armas_atributos = {
    'Peitoral lendário': {'defesa': 150},
    'Clava lendária': {'ataque': 95, 'defesa': 95, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Espada lendária': {'ataque': 70, 'defesa': 110, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Machado lendário': {'ataque': 110, 'defesa': 70, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Peitoral de ferro fundido': {'defesa': 80},
    'Clava de titânio': {'ataque': 55, 'defesa': 55, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Espada de titânio': {'ataque': 45, 'defesa': 65, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Machado de titânio': {'ataque': 65, 'defesa': 45, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Peitoral de aço': {'defesa': 40},
    'Clava de ferro': {'ataque': 25, 'defesa': 25, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Espada de ferro': {'ataque': 20, 'defesa': 32, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Machado de ferro': {'ataque': 32, 'defesa': 20, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Peitoral de ferro': {'defesa': 30},
    'Clava de pedra': {'ataque': 10, 'defesa': 10, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Espada de pedra': {'ataque': 7, 'defesa': 15, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Machado de pedra': {'ataque': 15, 'defesa': 7, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Peitoral de pano': {'defesa': 10},
    'Clava de madeira': {'ataque': 5, 'defesa': 5, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Espada de madeira': {'ataque': 4, 'defesa': 6, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Machado de madeira': {'ataque': 6, 'defesa': 4, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5},
    'Punhos': {'ataque': 0, 'defesa': 0, 'chance_critico_arma': 0, 'escalonamento_critico': 0.0},
    'Pelado': {'defesa': 4},
};

const armas_valores = {
    'Peitoral lendário': 180,
    'Clava lendária': 150,
    'Espada lendária': 150,
    'Machado lendário': 150,
    'Peitoral de ferro fundido': 105,
    'Clava de titânio': 95,
    'Espada de titânio': 95,
    'Machado de titânio': 95,
    'Peitoral de aço': 55,
    'Clava de ferro': 45,
    'Espada de ferro': 45,
    'Machado de ferro': 45,
    'Peitoral de ferro': 25,
    'Clava de pedra': 15,
    'Espada de pedra': 15,
    'Machado de pedra': 15,
    'Peitoral de pano': 5,
    'Clava de madeira': 5,
    'Espada de madeira': 5,
    'Machado de madeira': 5
};

const prefixos = ['Kra', 'Zor', 'Vel', 'Mor', 'Tor', 'Gor', 'Fen', 'Drak', 'Lug', 'Vex', 'Ser', 'Thal', 'Bru', 'Mal'];
const meios = ['ra', 'lo', 'mo', 'zi', 'ka', 'ro', 'ba', 'fi', 'zu', 'ter', 'dor', 'gir'];
const sufixos = ['gath', 'dor', 'nak', 'rith', 'zan', 'lox', 'moth', 'vor', 'rak', 'gorn', 'tuk', 'kash'];

// Substituir variáveis individuais por um objeto de "primeiras vezes"
const primeiraVez = {
  compra: true,
  monstro: true,
  // Adicione outras "primeiras vezes" aqui conforme necessário
  // exemplo: missao: true,
  // exemplo: boss: true,
};

// Listas de inventário
let armaduras_compradas = [];
let armas_compradas = [];
let armadura_equipada = 'Pelado';
let arma_equipada = 'Punhos';

let mana_max = 20.0;
let current_mana = 20.0;

let current_health = 100.0;
let health_max = 100.0;

let strength_player = 10.0;
let defense_player = 5.0;

let strength_weapon = 0;
let defense_weapon = 0;

let current_defense_bar = 0;
let defense_bar = 3;

let player_level = 1;
let magic_level = 1;
let xp = 0;
let xp_next_level = 50;
let hp_pot = 0;
let mp_pot = 0;
let gold = 0;

// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.querySelector("h1").classList.add("show");
        document.querySelector(".btn").classList.add("show");
    }, 500);
});

// Evento de clique no botão "Iniciar"
document.querySelector(".btn").addEventListener("click", function() {
    // Desativa o botão para evitar múltiplos cliques
    this.disabled = true;

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
                    storygame();

                }, 1000); // Tempo para fade-out completo
            }, 5000); // Tempo de exibição do texto
        }, 100);
    }, 1000); // Tempo para desaparecer completamente

    // Reativa o botão após um tempo para permitir outro clique, se necessário
    setTimeout(() => {
        this.disabled = false;
    }, 6000); // Tempo suficiente para a transição do jogo (ajustar conforme necessário)
});

/**
 * Cria a Top-Box na tela do jogo e exibe mensagens de forma sequencial
 * @param {string} imgSrc - Caminho da imagem (opcional, se vazio não exibe a imagem)
 * @param {string[]} messages - Lista de mensagens a serem exibidas uma por uma
 * @param {number} delay - Tempo em segundos antes de avançar automaticamente
 */
async function createTopBox(imgSrc, messages, delay) {
    return new Promise((resolve) => {
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
                requestplayer_name();
                return;
            }

            if (currentMessage < messages.length) {
                nextButton.style.display = "none";
                typeMessage(currentMessage);
            } else {
                topBox.remove();
                resolve(); // Quando todas as mensagens forem exibidas, a Promise será resolvida
            }
        }

        function requestplayer_name() {
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
                    player_name = inputField.value.trim();
                    inputField.remove();
                    messages[currentMessage + 1] = `Seja muito bem-vindo à vila, ${player_name}`;
                    nextMessage();
                }
            });
        }

        typeMessage(currentMessage);
        nextButton.addEventListener("click", nextMessage);

        setTimeout(() => {
            topBox.classList.add("show");
        }, 100);
    });
}

/**
 * Cria uma caixa de escolha com dois botões e retorna a escolha do jogador.
 * @param {string} question - Pergunta exibida na caixa de escolha.
 * @param {string} option1 - Texto do botão 1.
 * @param {string} option2 - Texto do botão 2.
 * @returns {Promise<string>} - Retorna a escolha do jogador.
 */
function createChoiceBox(question, option1, option2) {
    return new Promise((resolve) => {
        let parent = document.querySelector(".game-screen");
        if (!parent) return;

        // Criar a caixa de escolha
        let choiceBox = document.createElement("div");
        choiceBox.classList.add("choice-box");

        // Criar a pergunta
        let questionText = document.createElement("p");
        questionText.innerText = question;
        questionText.classList.add("choice-question");

        // Criar os botões
        let button1 = document.createElement("button");
        button1.innerText = option1;
        button1.classList.add("choice-button");
        button1.addEventListener("click", () => {
            choiceBox.remove();
            resolve(option1);
        });

        let button2 = document.createElement("button");
        button2.innerText = option2;
        button2.classList.add("choice-button");
        button2.addEventListener("click", () => {
            choiceBox.remove();
            resolve(option2);
        });

        // Adicionar elementos à caixa de escolha
        choiceBox.appendChild(questionText);
        choiceBox.appendChild(button1);
        choiceBox.appendChild(button2);

        // Adicionar caixa de escolha à tela do jogo
        parent.appendChild(choiceBox);
    });
}

async function gameplay() {
    await createTopBox("/static/pngs/npcs/Rashid.png", [
        `Desconhecido: Olá! Seja bem vindo ao reino, ${player_name}`,
        `${npc_trainer} Sou o Rashid, treinador da vila`,
        `${npc_trainer} Você deseja fazer o tutorial?`,
    ], 5);
    let escolha = await createChoiceBox("Deseja fazer o tutorial?", "Sim", "Não");

    if (escolha === "Sim") {
        tutorial_gameplay();
    } else {
        storygame();
    }
}

async function tutorial_gameplay() {
    await createTopBox("/static/pngs/npcs/Rashid.png", [
        `${npc_trainer} Bom vamos lá... a ${village_name} foi fundada há 15 anos atrás...`,
        `${npc_trainer} nosso glorioso ancião que fez tudo isso, ele continua construindo a nossa vila e permitindo que nossa raça evolua mais do que qualquer uma...`,
        `${npc_trainer} como a vila é "Recém fundada", temos poucos lugares que você pode ir aqui, temos a Igreja, a Forja, a Loja de equipamentos e a Torre do conhecimento`,
        `${npc_trainer} A igreja é um local onde você pode ser curado de envenenamentos e também poder comprar pots de cura e de mana`,
        `${npc_trainer} A Forja é um lugar onde você pode melhorar seus equipamentos!`,
        `${npc_trainer} A Loja de equipamentos é um lugar onde você pode comprar armaduras, escudos, e outros equipamentos`,
        `${npc_trainer} A Torre do conhecimento é um lugar onde você pode conseguir aprender novas habilidades, sejam elas de suporte, de ataque e aumento de skills temporárias`,
        `${npc_trainer} E por fim você pode ir para a floresta, onde você encontra inimigos, matando eles, eles tem incríveis loots sejam moedas de ouro, peças de armaduras, pots de vida e até mesmo pedras de ressureição. `,
        `${npc_trainer} Você já está pronto para começar!`,
    ], 10);
    storygame()

}

async function storygame(){
    await createTopBox("/static/pngs/npcs/Rashid.png", [
        `${npc_trainer} Antes de começar, te darei 10 moedas de ouro para que você compre uma armadura e uma arma`,
    ], 5);
    gold += 10
    await createTopBox("", [
        `Você ganhou 10 de ouro`
    ], 5);
    await createTopBox("/static/pngs/npcs/Rashid.png", [
        `${npc_trainer} Vamos ao conhecer o mercante agora!`,
    ], 5);
    await buy_itens()
    await createTopBox("/static/pngs/npcs/Rashid.png", [
        `${npc_trainer} Agora vamos equipar seus itens, ${player_name}`,
    ], 5);
    await backpack()
    await createTopBox("/static/pngs/npcs/Rashid.png", [
        `${npc_trainer} Agora vamos enfrentar um inimigo, ${player_name}`,
    ], 5);
    await Hunt()
    await createTopBox("/static/pngs/npcs/Rashid.png", [
        `${npc_trainer} Agora vamos visitar a forja, ${player_name}`,
    ], 5);
    // await forge()
    // print(f'{npc_trainer} Agora você pode ir se aventurar na floresta')
    // hunt()
    // print(f'{npc_trainer} Ora ora... vejo que você se saiu muito bem!')
    // print(f'{npc_trainer} Agora iremos visitar a forja')
    // forge()
    // print(f"{npc_trainer} Vamos conhecer a igreja agora")
    // church()
    // print(f'{npc_trainer} Agora, por ultimo, visitaremos a torre do conhecimento')
    // print(f'{npc_trainer} Dizem que lá é um lugar com forças mágicas extremamente poderosas controladas por um......')
    // print(f'{npc_trainer} PATO')
    // print(f'{npc_trainer} ...')
    // print(f'{npc_trainer} Pois é um pato kkkkk')
    // print(f'{npc_trainer} Não me questione, questione o programador que fez isso')
    // print(f'{npc_trainer} Enfim, vamos visitar a torre...')
    // tower_of_knowledge()
    // print(f'{npc_trainer} Você está pronto para se tornar um herói!')
    // print(f'{npc_trainer} Esperamos que você seja um herói forte!')
    // print(f'{npc_trainer} Agora você estará por conta própria')
    // print(f'{npc_trainer} No seu nível 10, você pode enfrentar um boss')
    // print(f'{npc_trainer} No seu nível 50, você pode enfrentar o boss final do jogo')
    // print(f'{npc_trainer} Boa sorte!!!')
    maingame()
}

async function buy_itens() {
    return new Promise(async (resolve) => {
        let parent = document.querySelector(".game-screen");
        if (!parent) return resolve();

        await createTopBox("", [`Você entrou na loja de equipamentos...`], 5);
        await createTopBox("/static/pngs/npcs/Flint.png", [
            `${npc_merchant} Fala meu guerreiro, tudo bem? O que deseja pra hoje?`,
        ], 5);

        let shopContainer = document.createElement("div");
        shopContainer.classList.add("shop-container");

        let goldContainer = document.createElement("div");
        goldContainer.classList.add("gold-container");

        let goldAmount = document.createElement("span");
        goldAmount.classList.add("gold-amount");
        goldAmount.innerText = `Seu ouro: ${gold}g`;

        let goldIcon = document.createElement("img");
        goldIcon.src = "/static/pngs/icons/gold.png";
        goldIcon.classList.add("gold-icon");

        goldContainer.appendChild(goldAmount);
        goldContainer.appendChild(goldIcon);

        let itemListContainer = document.createElement("div");
        itemListContainer.classList.add("item-list-container");

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        let buyButton = document.createElement("button");
        buyButton.innerText = "Comprar";
        buyButton.classList.add("shop-button");
        buyButton.disabled = true;

        let exitButton = document.createElement("button");
        exitButton.innerText = "Sair";
        exitButton.classList.add("shop-button");
        // Verifica se a primeira compra foi realizada antes de habilitar o botão
        if (!primeiraVez.compra) {
            exitButton.innerText = "Sair";
            exitButton.addEventListener("click", async () => {
                shopContainer.remove();
                await createTopBox("", [`Você saiu da loja de equipamentos...`], 5);
                resolve(); // Só continua o código após o usuário clicar em sair
            });
        } else {
            exitButton.classList.add("disabled"); // Adiciona a classe disabled

            // Adicionar um observador para verificar quando primeiraVez.compra mudar para false
            const checkFirstPurchaseInterval = setInterval(() => {
                if (!primeiraVez.compra) {
                    clearInterval(checkFirstPurchaseInterval);
                    exitButton.classList.remove("disabled");
                    exitButton.addEventListener("click", async () => {
                        shopContainer.remove();
                        await createTopBox("", [`Você saiu da loja de equipamentos...`], 5);
                        resolve(); // Agora o resolve está no escopo correto
                    });
                }
            }, 500); // Verifica a cada meio segundo
        }

        buttonContainer.appendChild(buyButton);
        buttonContainer.appendChild(exitButton);

        shopContainer.appendChild(goldContainer);
        shopContainer.appendChild(itemListContainer);
        shopContainer.appendChild(buttonContainer);
        parent.appendChild(shopContainer);

        showItemList(itemListContainer, buyButton, goldAmount);
    });
}

async function showItemList(parent, buyButton, goldDisplay) {
    parent.innerHTML = "";

    Object.entries(armas_valores).forEach(([item, price]) => {
        if (primeiraVez.compra && !(item.includes("madeira") || item.includes("Peitoral de pano"))) {
            return;
        }

        let attributes = armas_atributos[item] || {};
        let category = getItemCategory(item);
        let formattedItemName = item.replace(/\s+/g, '_');

        let itemRow = document.createElement("div");
        itemRow.classList.add("item-row");
        itemRow.dataset.price = price;
        itemRow.dataset.name = item;
        itemRow.style.marginBottom = "10px";

        let itemImg = document.createElement("img");
        if (item.includes('Peitoral')){
            itemImg.src = `/static/pngs/${category}/${formattedItemName}.png`;
        }
        else{
            itemImg.src = `/static/pngs/weapons/${category}/${formattedItemName}.png`;
        }
        itemImg.classList.add("item-img");

        let itemDetails = document.createElement("div");
        itemDetails.classList.add("item-details");
        itemDetails.innerHTML = `<strong>${item}</strong><br>
            ${attributes.ataque ? "Ataque: " + attributes.ataque + "<br>" : ""}
            ${attributes.defesa ? "Defesa: " + attributes.defesa + "<br>" : ""}`;

        let itemPrice = document.createElement("div");
        itemPrice.classList.add("item-price");
        itemPrice.innerText = `${price}g`;

        itemRow.appendChild(itemImg);
        itemRow.appendChild(itemDetails);
        itemRow.appendChild(itemPrice);
        parent.appendChild(itemRow);

        itemRow.addEventListener("mouseenter", () => itemRow.classList.add("hover"));
        itemRow.addEventListener("mouseleave", () => itemRow.classList.remove("hover"));

        itemRow.addEventListener("click", () => {
            document.querySelectorAll(".item-row").forEach(el => el.classList.remove("selected"));
            itemRow.classList.add("selected");
            buyButton.disabled = false;
            buyButton.dataset.selectedItem = itemRow.dataset.name;
            buyButton.dataset.selectedPrice = itemRow.dataset.price;
            buyButton.dataset.selectedRow = itemRow;
        });

        buyButton.onclick = () => {
            let selectedItem = buyButton.dataset.selectedItem;
            let selectedPrice = parseInt(buyButton.dataset.selectedPrice);
            let selectedRow = document.querySelector(".item-row.selected");
            showPurchaseConfirmation(selectedItem, selectedPrice, goldDisplay, buyButton, selectedRow, parent);
        };
    });
}

function showPurchaseConfirmation(itemName, price, goldDisplay, buyButton, itemRow, parent) {
    let existingPopup = document.querySelector(".popup-container");
    if (existingPopup) existingPopup.remove();

    let popup = document.createElement("div");
    popup.classList.add("popup-container");
    popup.innerHTML = `<p>Você quer comprar o <strong>${itemName}</strong> por <strong>${price}g</strong>?</p>`;

    let buttonYes = document.createElement("button");
    buttonYes.innerText = "Sim";
    buttonYes.classList.add("popup-button");
    buttonYes.addEventListener("click", () => {
        if (gold >= price) {
            gold -= price;
            goldDisplay.innerText = `Seu ouro: ${gold}g`;
            itemRow.remove(); // Remove o item da loja

            if (itemName.includes("Peitoral")) {
                armaduras_compradas.push(itemName);
            } else {
                armas_compradas.push(itemName);
            }

            popup.remove();
            if (primeiraVez.compra && itemName.includes("madeira")) {
                // Se for primeiraVez.compra e comprou uma arma de madeira, remove todas as outras armas de madeira
                document.querySelectorAll(".item-row").forEach(row => {
                    if (row.dataset.name.includes("madeira")) {
                        row.remove();
                    }
                });
            }

            // Verifica se já comprou uma arma de madeira e o peitoral de pano
            const temArmaMadeira = armas_compradas.some(arma => arma.includes("madeira"));
            const temPeitoralPano = armaduras_compradas.some(armadura => armadura.includes("Peitoral de pano"));

            // Se tiver ambos, marca a primeira compra como concluída
            if (temArmaMadeira && temPeitoralPano && primeiraVez.compra) {
                primeiraVez.compra = false;

                // Habilita o botão de sair
                const exitButton = document.querySelector(".shop-button.disabled");
                if (exitButton) {
                    exitButton.classList.remove("disabled");
                    exitButton.addEventListener("click", async () => {
                        const shopContainer = document.querySelector(".shop-container");
                        shopContainer.remove();
                        await createTopBox("", [`Você saiu da loja de equipamentos...`], 5);
                        // Removido o resolve() daqui, pois não está no escopo correto
                    });
                }
            }

            buyButton.disabled = true;
        } else {
            showPurchaseFail();
        }
    });

    let buttonNo = document.createElement("button");
    buttonNo.innerText = "Não";
    buttonNo.classList.add("popup-button");
    buttonNo.addEventListener("click", () => {
        popup.remove();
    });

    popup.appendChild(buttonYes);
    popup.appendChild(buttonNo);
    document.querySelector(".game-screen").appendChild(popup);
}

function showPurchaseFail() {
    let parent = document.querySelector(".game-screen");

    let existingPopup = document.querySelector(".popup-container");
    if (existingPopup) existingPopup.remove();

    let popup = document.createElement("div");
    popup.classList.add("popup-container");
    popup.innerHTML = `<p>Você não tem <span style="color: yellow;">OURO</span> suficiente!</p>`;

    let buttonOk = document.createElement("button");
    buttonOk.innerText = "OK";
    buttonOk.classList.add("popup-button");
    buttonOk.addEventListener("click", () => {
        popup.remove();
    });

    popup.appendChild(buttonOk);
    parent.appendChild(popup);
}

function getItemCategory(itemName) {
    if (itemName.includes("Espada")) return "swords";
    if (itemName.includes("Clava")) return "club's";
    if (itemName.includes("Machado")) return "axes";
    if (itemName.includes("Peitoral")) return "armors";
    return "misc";
}

async function backpack() {
    return new Promise(async (resolve) => {
        let parent = document.querySelector(".game-screen");
        if (!parent) return resolve();

        let backpack = document.createElement("div");
        backpack.classList.add("backpack-container");

        let equipadosContainer = document.createElement("div");
        equipadosContainer.classList.add("equipados-container");

        let armaEquipadaContainer = document.createElement("div");
        armaEquipadaContainer.classList.add("armaEquipada-container");
        armaEquipadaContainer.innerText = `Arma Equipada:`;
        armaEquipadaContainer.appendChild(document.createElement("br"));
        let armaImgBackpack = document.createElement("img");
        armaImgBackpack.classList.add("item-img");
        armaEquipadaContainer.appendChild(armaImgBackpack);
        if (arma_equipada != 'Punhos') {
            armaImgBackpack.src = `/static/pngs/weapons/${getItemCategory(arma_equipada)}/${arma_equipada.replace(/\s+/g, '_')}.png`;
            armaEquipadaContainer.appendChild(document.createTextNode(arma_equipada.replaceAll("_", " ")));
        }
        else{
            armaImgBackpack.src = `/static/pngs/icons/nothing.png`;
            arma_equipada_text = 'Punhos';
            armaEquipadaContainer.appendChild(document.createTextNode(arma_equipada_text));
        }

        let armaduraEquipadaContainer = document.createElement("div");
        armaduraEquipadaContainer.classList.add("armaduraEquipada-container");
        armaduraEquipadaContainer.innerText = `Armadura Equipada:`;
        armaduraEquipadaContainer.appendChild(document.createElement("br"));
        let armaduraImgBackpack = document.createElement("img");
        armaduraImgBackpack.classList.add("item-img");
        armaduraEquipadaContainer.appendChild(armaduraImgBackpack);
        if (armadura_equipada != 'Pelado') {
            armaduraImgBackpack.src = `/static/pngs/weapons/${getItemCategory(armadura_equipada)}/${armadura_equipada.replace(/\s+/g, '_')}.png`;
            armaduraEquipadaContainer.appendChild(document.createTextNode(armadura_equipada.replaceAll("_", " ")));
        }
        else{
            armaduraImgBackpack.src = `/static/pngs/icons/nothing.png`;
            armadura_equipada_text = 'Pelado';
            armaduraEquipadaContainer.appendChild(document.createTextNode(armadura_equipada_text));
        }

        let buttonArmasContainer = document.createElement("div");
        buttonArmasContainer.classList.add("buttonArmasContainer-container");

        let buttonArmas = document.createElement("div");
        buttonArmas.classList.add("buttonArmas-container");
        buttonArmas.classList.add("containerBackpack-Weapons");

        let btArmas = document.createElement("button");
        btArmas.classList.add("btArmas-bt");
        btArmas.classList.add("btArmasContainer");

        let btArmasimg = document.createElement("img");
        btArmasimg.classList.add("btArmasimg-bt");
        btArmasimg.classList.add("item-img");
        btArmasimg.src = `static/pngs/weapons/backpack/backpack-weapon.png`;

        let btArmasSpan = document.createElement("span");
        btArmasSpan.innerText = "ARMAS"

        let buttonArmaduras = document.createElement("div");
        buttonArmaduras.classList.add("buttonArmaduras-container");
        buttonArmaduras.classList.add("containerBackpack-Weapons");

        let btArmaduras = document.createElement("button");
        btArmaduras.classList.add("btArmaduras-bt");
        btArmaduras.classList.add("btArmasContainer");

        let btArmadurasimg = document.createElement("img");
        btArmadurasimg.classList.add("btArmadurasimg-bt");
        btArmadurasimg.classList.add("item-img");
        btArmadurasimg.src = `/static/pngs/weapons/backpack/backpack-armor.png`;

        let btArmadurasSpan = document.createElement("span");
        btArmadurasSpan.innerText = "ARMADURAS"

        let suprimentosContainer = document.createElement("div");
        suprimentosContainer.classList.add("suprimentos-container");

        let goldIcon = document.createElement("img");
        goldIcon.src = "/static/pngs/icons/gold.png";
        goldIcon.classList.add("gold-icon2");
        goldIcon.classList.add("icon-supply");

        let goldAmount = document.createElement("span");
        goldAmount.classList.add("gold-amount2");
        goldAmount.innerText = `SEU OURO: `;

        let goldValue = document.createElement("span");
        goldValue.classList.add("itens-qnt");
        goldValue.classList.add("gold-color");
        goldValue.innerText = `${gold}x`;

        goldAmount.appendChild(goldValue);

        let HPPotImg = document.createElement("img");
        HPPotImg.src = "/static/pngs/icons/HPPOT64px.png";
        HPPotImg.classList.add("hp-potion");
        HPPotImg.classList.add("icon-supply");

        let HPPot = document.createElement("span");
        HPPot.classList.add("hp-amount");
        HPPot.innerText = `HP POT: `;

        let hpvalue = document.createElement("span");
        hpvalue.classList.add("itens-qnt");
        hpvalue.classList.add("hp-color");
        hpvalue.innerText = `${hp_pot}x`;

        HPPot.appendChild(hpvalue);

        let MPPotImg = document.createElement("img");
        MPPotImg.src = "/static/pngs/icons/MPPOT64px.png";
        MPPotImg.classList.add("mp-potion");

        let MPPot = document.createElement("span");
        MPPot.classList.add("mp-amount");
        MPPot.innerText = `MP POT: `;

        let mpvalue = document.createElement("span");
        mpvalue.classList.add("itens-qnt");
        mpvalue.classList.add("mp-color");
        mpvalue.innerText = `${mp_pot}x`;

        MPPot.appendChild(mpvalue);

        equipadosContainer.appendChild(armaEquipadaContainer);
        equipadosContainer.appendChild(armaduraEquipadaContainer);

        buttonArmasContainer.appendChild(buttonArmas);
        buttonArmasContainer.appendChild(buttonArmaduras);

        buttonArmas.appendChild(btArmas)
        buttonArmaduras.appendChild(btArmaduras)
        btArmas.appendChild(btArmasimg)
        btArmas.appendChild(btArmasSpan)
        btArmaduras.appendChild(btArmadurasimg)
        btArmaduras.appendChild(btArmadurasSpan)

        suprimentosContainer.appendChild(goldAmount);
        suprimentosContainer.appendChild(goldIcon);
        suprimentosContainer.appendChild(HPPot);
        suprimentosContainer.appendChild(HPPotImg);
        suprimentosContainer.appendChild(MPPot);
        suprimentosContainer.appendChild(MPPotImg);

        backpack.appendChild(equipadosContainer);
        backpack.appendChild(buttonArmasContainer);
        backpack.appendChild(suprimentosContainer);

        parent.appendChild(backpack)

        // BOTÕES DO LAYOUT DE ARMAS
        let buttonArmasClick = document.querySelector(".btArmas-bt");
        buttonArmasClick.addEventListener('click', async () => {
            await BackpackArmas();
        });

        // BOTÕES DO LAYOUT DE ARMADURAS
        let buttonArmadurasClick = document.querySelector(".btArmaduras-bt");
        buttonArmadurasClick.addEventListener('click', async () => {
            await BackpackArmaduras();
        });

        let closeBtn = document.createElement("button");
        closeBtn.classList.add("close-btn");
        closeBtn.innerText = "⤶";
        backpack.appendChild(closeBtn);

        closeBtn.addEventListener('click', async () => {
            backpack.remove();
            resolve();
        });
    });
}

// FUNCOES ARMAS
async function BackpackArmas() {
    let backpackarmas = document.createElement("div");
    backpackarmas.classList.add("BackpackArmas-Container");

    let parent = document.querySelector(".game-screen.show");
    parent.appendChild(backpackarmas);

    let closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerText = "⤶";
    backpackarmas.appendChild(closeBtn);

    // Loop para adicionar os itens comprados à div
    for (let item of armas_compradas) {
        let itemDiv = document.createElement("div");
        itemDiv.style.borderBottom = "2px solid white";
        itemDiv.style.display = "flex";
        itemDiv.style.alignItems = "center";
        itemDiv.style.padding = "10px";
        itemDiv.style.flexDirection = "row";  // Garantir que a imagem e o texto fiquem ao lado

        let armaImg = document.createElement("img");
        armaImg.classList.add("item-img");
        armaImg.src = `/static/pngs/weapons/${getItemCategory(item)}/${item.replace(/\s+/g, '_')}.png`;

        let textContainer = document.createElement("div");
        textContainer.style.display = "flex";
        textContainer.style.flexDirection = "column";
        textContainer.style.marginLeft = "10px";

        let itemName = document.createElement("span");
        itemName.classList.add("WeaponArmor-ItemName");
        itemName.innerText = item;
        textContainer.appendChild(itemName);

        let ataque = document.createElement("span");
        ataque.classList.add("WeaponArmor-Attributes");
        ataque.innerText = `Ataque: ${armas_atributos[item].ataque}`;
        textContainer.appendChild(ataque);

        let defesa = document.createElement("span");
        defesa.classList.add("WeaponArmor-Attributes");
        defesa.innerText = `Defesa: ${armas_atributos[item].defesa}`;
        textContainer.appendChild(defesa);

        let buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.marginLeft = "auto";
        buttonContainer.style.flexDirection = "column";

        let equiparBtn = document.createElement("button");
        equiparBtn.classList.add("equipar-btn");
        equiparBtn.innerText = arma_equipada === item ? "Desequipar" : "Equipar";

        equiparBtn.addEventListener('click', async () => {
            let ArmaContainerBackpack = document.querySelector('.armaEquipada-container');
            let allEquipButtons = document.querySelectorAll('.equipar-btn');

            if (arma_equipada === item) {
                arma_equipada = 'Punhos';
                equiparBtn.innerText = "Equipar";

                // Remover atributos da arma equipada antes de desequipar
                strength_player -= strength_weapon;
                defense_player -= defense_weapon;
                await updateImgBackpack(ArmaContainerBackpack, 'Punhos');
            } else if (arma_equipada != item && arma_equipada != 'Punhos') {
                // Guardar os valores da arma antiga antes de equipar a nova
                let oldWeapon = arma_equipada;
                let oldStrength = armas_atributos[oldWeapon]['ataque'];
                let oldDefense = armas_atributos[oldWeapon]['defesa'];

                // Remover atributos da arma antiga
                strength_player -= oldStrength;
                defense_player -= oldDefense;

                // Equipar nova arma
                arma_equipada = item;
                strength_weapon = armas_atributos[item]['ataque'];
                defense_weapon = armas_atributos[item]['defesa'];

                // Adicionar atributos da nova arma
                strength_player += strength_weapon;
                defense_player += defense_weapon;

                allEquipButtons.forEach(btn => btn.innerText = "Equipar");

                equiparBtn.innerText = "Desequipar";
                await updateImgBackpack(ArmaContainerBackpack, item);
            } else{
                arma_equipada = item;
                strength_weapon = armas_atributos[item]['ataque'];
                defense_weapon = armas_atributos[item]['defesa'];

                // Adicionar atributos da arma nova
                strength_player += strength_weapon;
                defense_player += defense_weapon;

                equiparBtn.innerText = "Desequipar";
                await updateImgBackpack(ArmaContainerBackpack, item);
            }
        });

        let detalhesBtn = document.createElement("button");
        detalhesBtn.classList.add("detalhes-btn");
        detalhesBtn.innerText = "Detalhes";
        detalhesBtn.addEventListener('click', async () => {
            await DetalhesArmas(item);
        });

        let compararBtn = document.createElement("button");
        compararBtn.classList.add("comparar-btn");
        compararBtn.innerText = "Comparar";
        compararBtn.addEventListener('click', async () => {
            await CompararArmas(item);
        });

        buttonContainer.appendChild(equiparBtn);
        buttonContainer.appendChild(detalhesBtn);
        buttonContainer.appendChild(compararBtn);

        itemDiv.appendChild(armaImg);
        itemDiv.appendChild(textContainer);
        itemDiv.appendChild(buttonContainer);

        backpackarmas.appendChild(itemDiv);
    }

    closeBtn.addEventListener('click', () => {
        backpackarmas.classList.remove("show");
        setTimeout(() => {
            backpackarmas.remove();
        }, 1000);
    });

    setTimeout(() => {
        backpackarmas.classList.add("show");
    }, 10);
}

async function DetalhesArmas(item) {
    let DetalhesContainer = document.createElement("div");
    DetalhesContainer.classList.add("DetalhesContainer-Container");

    let parent = document.querySelector(".game-screen.show");
    parent.appendChild(DetalhesContainer);

    let closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerText = "⤶";

    let DivArmaImg = document.createElement("div");
    DivArmaImg.classList.add("DivArmaImg-Container");

    let armaImg = document.createElement("img");
    armaImg.classList.add("item-img-status");
    armaImg.src = `/static/pngs/weapons/${getItemCategory(item)}/${item.replace(/\s+/g, '_')}.png`;

    let DivStatusArma = document.createElement("div");
    DivStatusArma.classList.add('DivStatusArma-Container');

    // Ataque
    let DivStatusStrength = document.createElement("div");
    DivStatusStrength.classList.add('Strength-Status', 'DivStatus-Container');

    let spanStrengthLabel = document.createElement("span");
    spanStrengthLabel.innerHTML = `⚔️ Força: <span style="font-family: system-ui;">${armas_atributos[item]['ataque']}</span>`;

    // Defesa
    let DivStatusDefense = document.createElement("div");
    DivStatusDefense.classList.add('Defense-Status', 'DivStatus-Container');

    let spanDefenseLabel = document.createElement("span");
    spanDefenseLabel.innerHTML = `🛡️ Defesa: <span style="font-family: system-ui;">${armas_atributos[item]['defesa']}</span>`;

    // Chance de Crítico
    let DivStatusChanceCritical = document.createElement("div");
    DivStatusChanceCritical.classList.add('Chance-Critical-Status', 'DivStatus-Container');

    let spanChanceCriticalLabel = document.createElement("span");
    spanChanceCriticalLabel.innerHTML = `🎯 Chance Crítico: <span style="font-family: system-ui;">${armas_atributos[item]['chance_critico_arma']}</span>%`;

    // Escalonamento Crítico
    let DivStatusCriticalPower = document.createElement("div");
    DivStatusCriticalPower.classList.add('Critical-Power-Status', 'DivStatus-Container');

    let spanCriticalPowerLabel = document.createElement("span");
    spanCriticalPowerLabel.innerHTML = `💥 Escalonamento Crítico: <span style="font-family: system-ui;">${armas_atributos[item]['escalonamento_critico']}</span>x`;

    DivStatusStrength.appendChild(spanStrengthLabel);
    DivStatusDefense.appendChild(spanDefenseLabel);
    DivStatusChanceCritical.appendChild(spanChanceCriticalLabel);
    DivStatusCriticalPower.appendChild(spanCriticalPowerLabel);
    DivStatusArma.appendChild(DivStatusStrength)
    DivStatusArma.appendChild(DivStatusDefense)
    DivStatusArma.appendChild(DivStatusChanceCritical)
    DivStatusArma.appendChild(DivStatusCriticalPower)
    DivArmaImg.appendChild(armaImg);
    DetalhesContainer.appendChild(closeBtn);
    DetalhesContainer.appendChild(DivArmaImg);
    DetalhesContainer.appendChild(DivStatusArma);

    closeBtn.addEventListener('click', () => {
        DetalhesContainer.classList.remove("show");
        setTimeout(() => {
            DetalhesContainer.remove();
        }, 1000);
    });

    setTimeout(() => {
        DetalhesContainer.classList.add("show");
    }, 10);
}

async function CompararArmas(item) {
    let Comparar = document.createElement("div");
    Comparar.classList.add("Comparar-Container");

    let parent = document.querySelector(".game-screen.show");
    parent.appendChild(Comparar);

    let closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerText = "⤶";

    let DivArmaImgEquipado = document.createElement("div");
    DivArmaImgEquipado.classList.add("DivArmaImgEquipado-Container");

    let DivEquipado = document.createElement("div");
    DivEquipado.classList.add("DivEquipado-Container");

    let DivArmaEquipada = document.createElement("div");
    DivArmaEquipada.classList.add("DivArmaEquipada-Container");
    DivArmaEquipada.innerText = `Arma Equipada:`;
    DivArmaEquipada.appendChild(document.createElement("br"));
    let armaEquipada = document.createElement("img");
    armaEquipada.classList.add("item-img-compare");
    DivArmaEquipada.appendChild(armaEquipada);
    if (arma_equipada != 'Punhos') {
        armaEquipada.src = `/static/pngs/weapons/${getItemCategory(arma_equipada)}/${arma_equipada.replace(/\s+/g, '_')}.png`;
        DivArmaEquipada.appendChild(document.createTextNode(arma_equipada.replaceAll("_", " ")));
    }
    else{
        armaEquipada.src = `/static/pngs/icons/nothing.png`;
        arma_equipada_text = 'Punhos';
        DivArmaEquipada.appendChild(document.createTextNode(arma_equipada_text));
    }

    let DivCompare = document.createElement("div");
    DivCompare.classList.add("DivCompare-Container");

    let DivArmaCompare = document.createElement("div");
    DivArmaCompare.classList.add("DivArmaCompare-Container");
    DivArmaCompare.innerText = `Arma Inspecionada:`;
    DivArmaCompare.appendChild(document.createElement("br"));
    let armaCompare = document.createElement("img");
    armaCompare.classList.add("item-img-compare");
    DivArmaCompare.appendChild(armaCompare);
    armaCompare.src = `/static/pngs/weapons/${getItemCategory(item)}/${item.replace(/\s+/g, '_')}.png`;
    DivArmaCompare.appendChild(document.createTextNode(item.replaceAll("_", " ")));

    let DivArmaImgCompare = document.createElement("div");
    DivArmaImgCompare.classList.add("DivArmaImgCompare-Container");

    let armaImgCompare = document.createElement("img");
    armaImgCompare.classList.add("item-img-compare");
    armaImgCompare.src = `/static/pngs/weapons/${getItemCategory(item)}/${item.replace(/\s+/g, '_')}.png`;

    // Definição de DivStatusArmaEquipado e DivStatusArmaCompare antes do uso
    let DivStatusArmaEquipado = document.createElement("div");
    DivStatusArmaEquipado.classList.add('DivStatusArmaEquipado-Container');
    let DivStatusArmaCompare = document.createElement("div");
    DivStatusArmaCompare.classList.add('DivStatusArmaCompare-Container');

    // Força Equipado
    let DivStatusStrengthEquipado = document.createElement("div");
    DivStatusStrengthEquipado.classList.add("StatusComparer");

    let spanStrengthLabelEquipado = document.createElement("span");
    spanStrengthLabelEquipado.innerHTML = `⚔️ Força: <span style="font-family: system-ui;">${armas_atributos[arma_equipada]['ataque']}</span>`;

    let DivStatusStrengthCompare = document.createElement("div");
    DivStatusStrengthCompare.classList.add("StatusComparer");

    let spanStrengthLabelCompare = document.createElement("span");
    spanStrengthLabelCompare.innerHTML = `⚔️ Força: <span style="font-family: system-ui;">${armas_atributos[item]['ataque']}</span>`;

    if (armas_atributos[arma_equipada]['ataque'] < armas_atributos[item]['ataque']) {
        let diff = armas_atributos[item]['ataque'] - armas_atributos[arma_equipada]['ataque'];
        spanStrengthLabelEquipado.innerHTML += ` <span style="color: red; font-weight: bold; font-family: system-ui;">(-${diff} ↓)</span>`;
        spanStrengthLabelCompare.innerHTML += ` <span style="color: green; font-weight: bold; font-family: system-ui;">(+${diff} ↑)</span>`;
    } else if (armas_atributos[arma_equipada]['ataque'] > armas_atributos[item]['ataque']) {
        let diff = armas_atributos[arma_equipada]['ataque'] - armas_atributos[item]['ataque'];
        spanStrengthLabelEquipado.innerHTML += ` <span style="color: green; font-weight: bold; font-family: system-ui;">(+${diff} ↑)</span>`;
        spanStrengthLabelCompare.innerHTML += ` <span style="color: red; font-weight: bold; font-family: system-ui;">(-${diff} ↓)</span>`;
    }

    // Defesa Equipado
    let DivStatusDefenseEquipado = document.createElement("div");
    DivStatusDefenseEquipado.classList.add("StatusComparer");

    let spanDefenseLabelEquipado = document.createElement("span");
    spanDefenseLabelEquipado.innerHTML = `🛡️ Defesa: <span style="font-family: system-ui;">${armas_atributos[arma_equipada]['defesa']}</span>`;

    let DivStatusDefenseCompare = document.createElement("div");
    DivStatusDefenseCompare.classList.add("StatusComparer");

    let spanDefenseLabelCompare = document.createElement("span");
    spanDefenseLabelCompare.innerHTML = `🛡️ Defesa: <span style="font-family: system-ui;">${armas_atributos[item]['defesa']}</span>`;

    if (armas_atributos[arma_equipada]['defesa'] < armas_atributos[item]['defesa']) {
        let diff = armas_atributos[item]['defesa'] - armas_atributos[arma_equipada]['defesa'];
        spanDefenseLabelEquipado.innerHTML += ` <span style="color: red; font-weight: bold; font-family: system-ui;">(-${diff} ↓)</span>`;
        spanDefenseLabelCompare.innerHTML += ` <span style="color: green; font-weight: bold; font-family: system-ui;">(+${diff} ↑)</span>`;
    } else if (armas_atributos[arma_equipada]['defesa'] > armas_atributos[item]['defesa']) {
        let diff = armas_atributos[arma_equipada]['defesa'] - armas_atributos[item]['defesa'];
        spanDefenseLabelEquipado.innerHTML += ` <span style="color: green; font-weight: bold; font-family: system-ui;">(+${diff} ↑)</span>`;
        spanDefenseLabelCompare.innerHTML += ` <span style="color: red; font-weight: bold; font-family: system-ui;">(-${diff} ↓)</span>`;
    }

    // Chance de Crítico Equipado
    let DivStatusChanceCriticalEquipado = document.createElement("div");
    DivStatusChanceCriticalEquipado.classList.add("StatusComparer");

    let spanChanceCriticalLabelEquipado = document.createElement("span");
    spanChanceCriticalLabelEquipado.innerHTML = `🎯 Chance Crítico: <span style="font-family: system-ui;">${armas_atributos[arma_equipada]['chance_critico_arma']}</span>%`;

    let DivStatusChanceCriticalCompare = document.createElement("div");
    DivStatusChanceCriticalCompare.classList.add("StatusComparer");

    let spanChanceCriticalLabelCompare = document.createElement("span");
    spanChanceCriticalLabelCompare.innerHTML = `🎯 Chance Crítico: <span style="font-family: system-ui;">${armas_atributos[item]['chance_critico_arma']}</span>%`;

    if (armas_atributos[arma_equipada]['chance_critico_arma'] < armas_atributos[item]['chance_critico_arma']) {
        let diff = armas_atributos[item]['chance_critico_arma'] - armas_atributos[arma_equipada]['chance_critico_arma'];
        spanChanceCriticalLabelEquipado.innerHTML += ` <span style="color: red; font-weight: bold; font-family: system-ui;">(-${diff}% ↓)</span>`;
        spanChanceCriticalLabelCompare.innerHTML += ` <span style="color: green; font-weight: bold; font-family: system-ui;">(+${diff}% ↑)</span>`;
    } else if (armas_atributos[arma_equipada]['chance_critico_arma'] > armas_atributos[item]['chance_critico_arma']) {
        let diff = armas_atributos[arma_equipada]['chance_critico_arma'] - armas_atributos[item]['chance_critico_arma'];
        spanChanceCriticalLabelEquipado.innerHTML += ` <span style="color: green; font-weight: bold; font-family: system-ui;">(+${diff}% ↑)</span>`;
        spanChanceCriticalLabelCompare.innerHTML += ` <span style="color: red; font-weight: bold; font-family: system-ui;">(-${diff}% ↓)</span>`;
    }

    // Escalonamento Crítico Equipado
    let DivStatusCriticalPowerEquipado = document.createElement("div");
    DivStatusCriticalPowerEquipado.classList.add("StatusComparer-last");

    let spanCriticalPowerLabelEquipado = document.createElement("span");
    spanCriticalPowerLabelEquipado.innerHTML = `💥 Escalonamento Crítico: <span style="font-family: system-ui;">${armas_atributos[arma_equipada]['escalonamento_critico']}</span>x`;

    let DivStatusCriticalPowerCompare = document.createElement("div");
    DivStatusCriticalPowerCompare.classList.add("StatusComparer-last");

    let spanCriticalPowerLabelCompare = document.createElement("span");
    spanCriticalPowerLabelCompare.innerHTML = `💥 Escalonamento Crítico: <span style="font-family: system-ui;">${armas_atributos[item]['escalonamento_critico']}</span>x`;

    if (armas_atributos[arma_equipada]['escalonamento_critico'] < armas_atributos[item]['escalonamento_critico']) {
        let diff = armas_atributos[item]['escalonamento_critico'] - armas_atributos[arma_equipada]['escalonamento_critico'];
        spanCriticalPowerLabelEquipado.innerHTML += ` <span style="color: red; font-weight: bold; font-family: system-ui;">(-${diff} ↓)</span>`;
        spanCriticalPowerLabelCompare.innerHTML += ` <span style="color: green; font-weight: bold; font-family: system-ui;">(+${diff} ↑)</span>`;
    } else if (armas_atributos[arma_equipada]['escalonamento_critico'] > armas_atributos[item]['escalonamento_critico']) {
        let diff = armas_atributos[arma_equipada]['escalonamento_critico'] - armas_atributos[item]['escalonamento_critico'];
        spanCriticalPowerLabelEquipado.innerHTML += ` <span style="color: green; font-weight: bold; font-family: system-ui;">(+${diff} ↑)</span>`;
        spanCriticalPowerLabelCompare.innerHTML += ` <span style="color: red; font-weight: bold; font-family: system-ui;">(-${diff} ↓)</span>`;
    }

    let DivPaiEquipCompare = document.createElement('div');
    DivPaiEquipCompare.classList.add('Status-Armas-Container')

    DivStatusStrengthEquipado.appendChild(spanStrengthLabelEquipado);
    DivStatusDefenseEquipado.appendChild(spanDefenseLabelEquipado);
    DivStatusChanceCriticalEquipado.appendChild(spanChanceCriticalLabelEquipado);
    DivStatusCriticalPowerEquipado.appendChild(spanCriticalPowerLabelEquipado);

    DivStatusStrengthCompare.appendChild(spanStrengthLabelCompare);
    DivStatusDefenseCompare.appendChild(spanDefenseLabelCompare);
    DivStatusChanceCriticalCompare.appendChild(spanChanceCriticalLabelCompare);
    DivStatusCriticalPowerCompare.appendChild(spanCriticalPowerLabelCompare);

    DivStatusArmaEquipado.appendChild(DivStatusStrengthEquipado)
    DivStatusArmaEquipado.appendChild(DivStatusDefenseEquipado)
    DivStatusArmaEquipado.appendChild(DivStatusChanceCriticalEquipado)
    DivStatusArmaEquipado.appendChild(DivStatusCriticalPowerEquipado)

    DivStatusArmaCompare.appendChild(DivStatusStrengthCompare)
    DivStatusArmaCompare.appendChild(DivStatusDefenseCompare)
    DivStatusArmaCompare.appendChild(DivStatusChanceCriticalCompare)
    DivStatusArmaCompare.appendChild(DivStatusCriticalPowerCompare)

    DivEquipado.appendChild(DivArmaEquipada)
    DivEquipado.appendChild(DivStatusArmaEquipado)

    DivCompare.appendChild(DivArmaCompare)
    DivCompare.appendChild(DivStatusArmaCompare)

    Comparar.appendChild(closeBtn);
    Comparar.appendChild(DivEquipado);
    Comparar.appendChild(DivCompare);

    closeBtn.addEventListener('click', () => {
        Comparar.classList.remove("show");
        setTimeout(() => {
            Comparar.remove();
        }, 1000);
    });

    setTimeout(() => {
        Comparar.classList.add("show");
    }, 10);
}

// FUNCOES ARMADURAS
async function BackpackArmaduras() {
    let backpackarmaduras = document.createElement("div");
    backpackarmaduras.classList.add("BackpackArmaduras-Container");

    let parent = document.querySelector(".game-screen.show");
    parent.appendChild(backpackarmaduras);

    let closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerText = "⤶";
    backpackarmaduras.appendChild(closeBtn);

    // Loop para adicionar os itens comprados à div
    for (let item of armaduras_compradas) {
        let itemDiv = document.createElement("div");
        itemDiv.style.borderBottom = "2px solid white";
        itemDiv.style.display = "flex";
        itemDiv.style.alignItems = "center";
        itemDiv.style.padding = "10px";
        itemDiv.style.flexDirection = "row";  // Garantir que a imagem e o texto fiquem ao lado

        let armaImg = document.createElement("img");
        armaImg.classList.add("item-img");
        armaImg.src = `/static/pngs/${getItemCategory(item)}/${item.replace(/\s+/g, '_')}.png`;

        let textContainer = document.createElement("div");
        textContainer.style.display = "flex";
        textContainer.style.flexDirection = "column";
        textContainer.style.marginLeft = "10px";

        let itemName = document.createElement("span");
        itemName.classList.add("WeaponArmor-ItemName");
        itemName.innerText = item;
        textContainer.appendChild(itemName);

        let defesa = document.createElement("span");
        defesa.classList.add("WeaponArmor-Attributes");
        defesa.innerText = `Defesa: ${armas_atributos[item].defesa}`;
        textContainer.appendChild(defesa);

        let buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.marginLeft = "auto";
        buttonContainer.style.flexDirection = "column";

        let equiparBtn = document.createElement("button");
        equiparBtn.classList.add("equipar-btn");
        equiparBtn.innerText = armadura_equipada === item ? "Desequipar" : "Equipar";

        equiparBtn.addEventListener('click', () => {
            let ArmaduraContainerBackpack = document.querySelector('.armaduraEquipada-container');
            let allEquipButtons = document.querySelectorAll('.equipar-btn');

            if (armadura_equipada === item) {
                armadura_equipada = 'Pelado';
                equiparBtn.innerText = "Equipar";

                // Remover atributos da arma equipada antes de desequipar
                defense_player -= defense_weapon;
                updateImgBackpack(ArmaduraContainerBackpack, 'Pelado');
            } else if (armadura_equipada != item && armadura_equipada != 'Pelado') {
                // Guardar os valores da arma antiga antes de equipar a nova
                let oldWeapon = armadura_equipada;
                let oldDefense = armas_atributos[oldWeapon]['defesa'];

                // Remover atributos da arma antiga
                defense_player -= oldDefense;

                // Equipar nova arma
                armadura_equipada = item;
                defense_weapon = armas_atributos[item]['defesa'];

                // Adicionar atributos da nova arma
                defense_player += defense_weapon;

                allEquipButtons.forEach(btn => btn.innerText = "Equipar");

                equiparBtn.innerText = "Desequipar";
                updateImgBackpack(ArmaduraContainerBackpack, item);
            } else{
                armadura_equipada = item;
                defense_weapon = armas_atributos[item]['defesa'];

                // Adicionar atributos da arma nova
                defense_player += defense_weapon;

                equiparBtn.innerText = "Desequipar";
                updateImgBackpack(ArmaduraContainerBackpack, item);
            }
        });

        let detalhesBtn = document.createElement("button");
        detalhesBtn.classList.add("detalhes-btn");
        detalhesBtn.innerText = "Detalhes";
        detalhesBtn.addEventListener('click', async () => {
            await DetalhesArmaduras(item);
        });

        let compararBtn = document.createElement("button");
        compararBtn.classList.add("comparar-btn");
        compararBtn.innerText = "Comparar";
        compararBtn.addEventListener('click', async () => {
            await CompararArmaduras(item);
        });

        buttonContainer.appendChild(equiparBtn);
        buttonContainer.appendChild(detalhesBtn);
        buttonContainer.appendChild(compararBtn);

        itemDiv.appendChild(armaImg);
        itemDiv.appendChild(textContainer);
        itemDiv.appendChild(buttonContainer);

        backpackarmaduras.appendChild(itemDiv);
    }

    closeBtn.addEventListener('click', () => {
        backpackarmaduras.classList.remove("show");
        setTimeout(() => {
            backpackarmaduras.remove();
        }, 1000);
    });

    setTimeout(() => {
        backpackarmaduras.classList.add("show");
    }, 10);
}

async function updateImgBackpack(Container, item){
    const NamesToExclude = ["Espada", "Machado", "Clava", "Peitoral", "Punhos", "Pelado"];

    let RemoveIMG = Container.querySelector('.item-img');
    RemoveIMG.remove();

    Container.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            NamesToExclude.forEach(nome => {
                if (node.textContent.includes(nome)) {
                    node.remove();
                }
            });
        }
    });


    let UpdateIMG = document.createElement('img');
    UpdateIMG.classList.add('item-img');
    if (!item.includes('Peitoral') && item != 'Pelado'){
        if (item != 'Punhos'){
            UpdateIMG.src = `/static/pngs/weapons/${getItemCategory(item)}/${item.replace(/\s+/g, '_')}.png`;
        } else{
            UpdateIMG.src = `/static/pngs/icons/nothing.png`;
        }
    }
    else{
        if (item != 'Pelado'){
            UpdateIMG.src = `/static/pngs/${getItemCategory(item)}/${item.replace(/\s+/g, '_')}.png`;
        } else{
            UpdateIMG.src = `/static/pngs/icons/nothing.png`;
        }
    }

    // Criar novo texto
    let UpdateText = document.createTextNode(item);

    Container.appendChild(UpdateIMG);
    Container.appendChild(UpdateText);
}


async function Hunt() {
    monster_name = await CreateMonsterName()
    monster_config = await CreateMonsterLevel()
    monster_level = monster_config['level']
    hp_monster = monster_config['hp']
    strength_monster = monster_config['strength']
    defense_monster = monster_config['defense']
    xp_monster = monster_config['xp']
    await createTopBox("", [
        `Você encontrou um ${monster_name}`,
        `Seu level: ${player_level}, level do monstro: ${monster_level}`,
        `A luta vai começar...`
    ], 3.5);
    await PreBattle(monster_name, monster_level, hp_monster, strength_monster, defense_monster, xp_monster);
    await Battle(monster_name, monster_level, hp_monster, strength_monster, defense_monster, xp_monster)
}

async function CreateMonsterName() {
    const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
    const meio = Math.random() > 0.5 ? meios[Math.floor(Math.random() * meios.length)] : '';
    const sufixo = sufixos[Math.floor(Math.random() * sufixos.length)];
    return prefixo + meio + sufixo;
}

async function CreateMonsterLevel() {
    let monsterLevel, hpMonster, strengthMonster, defenseMonster, xpMonster;

    if (primeiraVez.monstro) {
        monsterLevel = 1;
        hpMonster = Math.floor(Math.random() * (30 - 25 + 1)) + 25; // Entre 25 e 30 de HP
        strengthMonster = Math.floor(Math.random() * (5 - 1 + 1)) + 1; // Entre 1 e 5 de Força
        defenseMonster = Math.floor(Math.random() * (5 - 1 + 1)) + 1; // Entre 1 e 5 de Defesa
        xpMonster = Math.floor(Math.random() * (50 - 30 + 1)) + 30; // Entre 30 e 50 XP
    } else {
        // Definir a variação de nível com base no nível do jogador
        let levelVariation = [];
        if (player_level < 5) {
            levelVariation = [-1, 0, 1];
        } else if (player_level < 10) {
            levelVariation = [-1, 0, 1, 2];
        } else if (player_level < 15) {
            levelVariation = [-1, 0, 1, 2, 3];
        } else {
            levelVariation = [-1, 0, 1, 2, 3];
        }

        monsterLevel = player_level + levelVariation[Math.floor(Math.random() * levelVariation.length)];
        monsterLevel = Math.max(1, monsterLevel); // Evita nível 0 ou negativo

        // Ajuste de atributos com base na diferença de nível
        let levelDifference = monsterLevel - player_level;
        let percentual = 0;

        if (levelDifference === 1) {
            percentual = 0.05;
        } else if (levelDifference === 2) {
            percentual = 0.15;
        } else if (levelDifference === 3) {
            percentual = 0.25;
        } else if (levelDifference === -1) {
            percentual = -0.15;
        }

        // Ajusta os atributos do monstro com base no percentual calculado
        hpMonster = Math.round(health_max * (1 + percentual));
        hpMonster = Math.max(hpMonster, 20); // Garante um mínimo de HP

        strengthMonster = Math.round(player_strength * (1 + percentual));
        strengthMonster = Math.max(strengthMonster, 3); // Garante um mínimo de Força

        defenseMonster = Math.round(player_defense * (1 + percentual));
        defenseMonster = Math.max(defenseMonster, 3); // Garante um mínimo de Defesa

        // XP ajustado conforme o nível do monstro
        let baseXP = monsterLevel <= player_level ? 30 : 50;
        xpMonster = Math.round(baseXP * (1 + (0.1 * levelDifference))); // XP cresce conforme o desafio
    }

    return {
        level: monsterLevel,
        hp: hpMonster,
        strength: strengthMonster,
        defense: defenseMonster,
        xp: xpMonster
    };
}

async function PreBattle() {
    // ================== ## CRIAÇÃO DA TELA ## ==================
    // Seleciona a div principal da tela de jogo
    const gameScreen = document.querySelector(".game-screen.show");

    // Cria a div principal da área de batalha
    const attackScreen = document.createElement("div");
    attackScreen.classList.add("attack-screen");

    // Criando os 4 quadrantes
    const dialogues = document.createElement("div");
    dialogues.classList.add("dialogues");

    const statusEnemy = document.createElement("div");
    statusEnemy.classList.add("status-enemy");

    const statusPlayer = document.createElement("div");
    statusPlayer.classList.add("status-player");

    const playerChoices = document.createElement("div");
    playerChoices.classList.add("player-choices");

    // Adicionando as divs-filhas na attack-screen
    attackScreen.appendChild(dialogues);
    attackScreen.appendChild(statusEnemy);
    attackScreen.appendChild(statusPlayer);
    attackScreen.appendChild(playerChoices);

    // Adicionando a attack-screen dentro da game-screen
    gameScreen.appendChild(attackScreen);

    // Chama as funções responsáveis por cada seção
    await createDialoguesSection(dialogues);
    await createEnemyStatusSection(statusEnemy);
    await createPlayerStatusSection(statusPlayer);
    await createPlayerChoicesSection(playerChoices);
}

// ================ ## DIV DIALOGUES ## ===================
async function createDialoguesSection(dialoguesContainer) {
    // Criar título "Histórico de Turno"
    const dialogueTitle = document.createElement("div");
    dialogueTitle.classList.add("dialogue-title");
    dialogueTitle.innerText = "Histórico de Turno";
    dialoguesContainer.appendChild(dialogueTitle);

    // Criar a caixa de chat
    const dialoguesBox = document.createElement("div");
    dialoguesBox.classList.add("dialogue-box");
    dialoguesContainer.appendChild(dialoguesBox);

    // adicionarMensagem("Atacou monstro com 5 de dano.", "jogador")
    // adicionarMensagem("Monstro atacou jogador com 5 de dano.", "monstro")
}

//================ ## DIV STATUS ENEMY ## ===================
async function createEnemyStatusSection(enemyStatusContainer) {
    // Gera um monstro aleatório com await
    const monsterName = await CreateMonsterName();
    const monsterStats = await CreateMonsterLevel();

    // Criando a box principal do status do monstro
    const enemyStatusBox = document.createElement("div");
    enemyStatusBox.classList.add("enemy-status-box");

    // Criando a linha do nome e nível
    const enemyInfo = document.createElement("div");
    enemyInfo.classList.add("enemy-info");

    // Criando nome do monstro
    const enemyName = document.createElement("span");
    enemyName.classList.add("enemy-name");
    enemyName.innerText = monsterName || "Monstro Desconhecido"; // Evita undefined

    // Criando nível do monstro
    const enemyLevel = document.createElement("span");
    enemyLevel.classList.add("enemy-level");
    enemyLevel.innerText = `Lv. ${monsterStats?.level ?? "??"}`; // Evita undefined

    // Adicionando nome e nível dentro da linha
    enemyInfo.appendChild(enemyName);
    enemyInfo.appendChild(enemyLevel);

    // Criando o container para a barra de vida + texto de HP
    const enemyHealthContainer = document.createElement("div");
    enemyHealthContainer.classList.add("enemy-health-container");

    // Criando a barra de vida (vermelha fixa)
    const enemyHealthBar = document.createElement("div");
    enemyHealthBar.classList.add("enemy-health-bar");

    // Criando a barra de vida dinâmica (verde que diminui com o dano)
    const enemyHealth = document.createElement("div");
    enemyHealth.classList.add("enemy-health");
    enemyHealth.style.width = "100%"; // Começa cheia
    enemyHealthBar.appendChild(enemyHealth);

    // Criando o texto da vida atual e máxima (Agora ao lado da barra)
    const enemyHealthText = document.createElement("span");
    enemyHealthText.classList.add("enemy-health-text");
    enemyHealthText.innerText = `${monsterStats.hp}/${monsterStats.hp}`;

    // Adicionando a barra de vida e o texto dentro do container
    enemyHealthContainer.appendChild(enemyHealthBar);
    enemyHealthContainer.appendChild(enemyHealthText);

    // Criando um espaço para a imagem do monstro (por enquanto um espaço vazio)
    const enemyImage = document.createElement("div");
    enemyImage.classList.add("enemy-image");
    enemyImage.innerText = "IMG"; // Placeholder (Depois trocamos pela imagem)

    // Adiciona os elementos dentro da box
    enemyStatusBox.appendChild(enemyInfo);
    enemyStatusBox.appendChild(enemyHealthContainer);

    // Adiciona a box e a imagem na div `status-enemy`
    enemyStatusContainer.appendChild(enemyStatusBox);
    enemyStatusContainer.appendChild(enemyImage);

    // Teste: Simulando dano no monstro
    // atualizarStatus(monsterStats.hp - 10, monsterStats.hp);
    // atualizarStatus("monstro", "health", 80, health_max), 2000);
}

// ================ ## DIV STATUS PLAYER ## ===================
async function createPlayerStatusSection(playerStatusContainer) {
    // Criando a box principal do status do jogador
    const playerStatusBox = document.createElement("div");
    playerStatusBox.classList.add("player-status-box");

    // Criando a linha do nome e nível
    const playerInfo = document.createElement("div");
    playerInfo.classList.add("player-info");

    // Criando nome do jogador
    const playerName = document.createElement("span");
    playerName.classList.add("player-name");
    playerName.innerText = player_name;

    // Criando nível do jogador
    const playerLevel = document.createElement("span");
    playerLevel.classList.add("player-level");
    playerLevel.innerText = `Lv. ${player_level}`;

    // Adicionando nome e nível dentro da linha
    playerInfo.appendChild(playerName);
    playerInfo.appendChild(playerLevel);

    // Função para criar uma barra com título antes dela
    function createBar(type, max, current, colorClass, label) {
        const container = document.createElement("div");
        container.classList.add("player-bar-container");

        // Criando o título antes da barra (HP, MANA, CARGAS, XP)
        const title = document.createElement("span");
        title.classList.add("player-bar-title");
        title.innerText = label;

        const bar = document.createElement("div");
        bar.classList.add("player-bar", colorClass);

        const fill = document.createElement("div");
        fill.classList.add("bar-fill", `${colorClass}-fill`);
        fill.style.width = `${(current / max) * 100}%`;

        // Define a cor inicial corretamente com base no valor atual
        if (type === "health") {
            fill.style.backgroundColor = `rgb(${255 - (current / max) * 255}, ${(current / max) * 255}, 0)`;
        } else if (type === "mana") {
            fill.style.backgroundColor = `rgb(${255 - (current / max) * 255}, ${255 - (current / max) * 255}, 255)`;
        }

        bar.appendChild(fill);

        const text = document.createElement("span");
        text.classList.add("player-bar-text");
        text.innerText = `${current}/${max}`;

        container.appendChild(title); // Adiciona o título antes da barra
        container.appendChild(bar);
        container.appendChild(text);

        return { container, fill, text };
    }

    // Criando a Barra de Vida com "HP"
    const { container: healthContainer, fill: healthFill, text: healthText } = createBar("health", health_max, current_health, "health-bar", "HP");

    // Criando a Barra de Mana com "MANA"
    const { container: manaContainer, fill: manaFill, text: manaText } = createBar("mana", mana_max, current_mana, "mana-bar", "MANA");

    // Criando a Barra de Defesa com "CARGAS"
    const defenseContainer = document.createElement("div");
    defenseContainer.classList.add("player-bar-container");

    const defenseTitle = document.createElement("span");
    defenseTitle.classList.add("player-bar-title");
    defenseTitle.innerText = "CARGAS";

    const defenseBar = document.createElement("div");
    defenseBar.classList.add("defense-bar");

    let defenseBlocks = [];
    for (let i = 0; i < defense_bar; i++) {
        let block = document.createElement("div");
        block.classList.add("defense-fill");
        block.style.backgroundColor = i < current_defense_bar ? "purple" : "gray"; // Aplicando cor inicial corretamente
        defenseBlocks.push(block);
        defenseBar.appendChild(block);
    }

    const defenseText = document.createElement("span");
    defenseText.classList.add("player-bar-text");
    defenseText.innerText = `${current_defense_bar}/${defense_bar}`;

    defenseContainer.appendChild(defenseTitle); // Adiciona o título antes da barra
    defenseContainer.appendChild(defenseBar);
    defenseContainer.appendChild(defenseText);

    // Criando a Barra de XP com "XP"
    const xpContainer = document.createElement("div");
    xpContainer.classList.add("player-bar-container");

    const xpTitle = document.createElement("span");
    xpTitle.classList.add("player-bar-title");
    xpTitle.innerText = "XP";

    const xpBar = document.createElement("div");
    xpBar.classList.add("player-bar", "xp-bar");

    const xpFill = document.createElement("div");
    xpFill.classList.add("xp-fill");
    xpBar.appendChild(xpFill);

    // Criando marcações dentro da barra de XP (10 divisões)
    for (let i = 1; i < 10; i++) {
        let mark = document.createElement("div");
        mark.style.position = "absolute";
        mark.style.left = `${i * 10}%`;
        mark.style.top = "0";
        mark.style.height = "100%";
        mark.style.width = "2px";
        mark.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        xpBar.appendChild(mark);
    }

    const xpText = document.createElement("span");
    xpText.classList.add("player-bar-text");
    xpText.innerText = `${xp}/${xp_next_level}`;

    // Adiciona os elementos dentro do container de XP
    xpContainer.appendChild(xpTitle);
    xpContainer.appendChild(xpBar);
    xpContainer.appendChild(xpText);

    // Adiciona os elementos dentro da box do jogador
    playerStatusBox.appendChild(playerInfo);
    playerStatusBox.appendChild(healthContainer);
    playerStatusBox.appendChild(manaContainer);
    playerStatusBox.appendChild(defenseContainer);
    playerStatusBox.appendChild(xpContainer);

    // Adiciona a box na div `status-player`
    playerStatusContainer.appendChild(playerStatusBox);

    // atualizarStatus("jogador", "health", 80, health_max);
    // atualizarStatus("jogador", "mana", 10, mana_max);
    // atualizarStatus("jogador", "defense", 1, defense_bar);
    // atualizarStatus("jogador", "xp", 10, xp_next_level);
}

// ================ ## DIV CHOICES PLAYER ## ===================
async function createPlayerChoicesSection(playerChoicesContainer) {
    let choicesContainerPai = document.createElement('div')
    choicesContainerPai.classList.add('Container-Choices-Pai')

    let choicesContainer = document.createElement('div')
    choicesContainer.classList.add('Container-Choices')

    // Criando os containers com ícones e textos
    let attackContainer = createChoiceButton('ATACAR', 'sword-icon', 'Attack-Container')
    let defenseContainer = createChoiceButton('DEFENDER', 'shield-icon', 'Defense-Container')
    let potionContainer = createChoiceButton('POÇÃO', 'flask-icon', 'Potion-Container')
    let spellContainer = createChoiceButton('MAGIA', 'magic-icon', 'Spell-Container')

    // Atualiza o multiplicador de ataque com base nas cargas de defesa
    updateAttackMultiplier(current_defense_bar);

    choicesContainer.appendChild(attackContainer)
    choicesContainer.appendChild(defenseContainer)
    choicesContainer.appendChild(potionContainer)
    choicesContainer.appendChild(spellContainer)
    choicesContainerPai.appendChild(choicesContainer)
    playerChoicesContainer.appendChild(choicesContainerPai)

    // Função auxiliar para criar botões de escolha com ícones
    function createChoiceButton(text, iconClass, containerClass) {
        const container = document.createElement('div');
        container.classList.add(containerClass);

        const buttonContent = document.createElement('div');
        buttonContent.classList.add('choice-button-content');

        const icon = document.createElement('div');
        icon.classList.add('choice-icon', iconClass);

        const label = document.createElement('span');
        label.classList.add('choice-label');
        label.textContent = text;

        buttonContent.appendChild(icon);
        buttonContent.appendChild(label);
        container.appendChild(buttonContent);

        // Adiciona eventos de clique para efeitos visuais
        container.addEventListener('click', function() {
            // Adiciona classe de selecionado
            document.querySelectorAll('.Attack-Container, .Defense-Container, .Potion-Container, .Spell-Container')
                .forEach(btn => btn.classList.remove('choice-selected'));
            container.classList.add('choice-selected');

            // Adiciona efeito de pulso
            container.classList.add('pulse-choice');
            setTimeout(() => {
                container.classList.remove('pulse-choice');
            }, 500);
        });

        return container;
    }
}

// Função global para atualizar o multiplicador de ataque com base nas cargas
function updateAttackMultiplier(charges) {
    const attackContainer = document.querySelector('.Attack-Container');
    if (!attackContainer) return;

    // Remove qualquer multiplicador existente
    const existingMultiplier = attackContainer.querySelector('.attack-multiplier');
    if (existingMultiplier) {
        existingMultiplier.remove();
    }

    // Remove efeitos anteriores
    attackContainer.classList.remove('attack-charge-1', 'attack-charge-2', 'attack-charge-3');
    const existingEffect = attackContainer.querySelector('.fire-effect');
    if (existingEffect) {
        existingEffect.remove();
    }

    // Se não tiver cargas, não mostra multiplicador
    if (charges === 0) return;

    // Cria o elemento multiplicador
    const multiplier = document.createElement('span');
    multiplier.classList.add('attack-multiplier', `multiplier-level-${charges}`);

    // Define o texto e a classe com base no número de cargas
    if (charges === 1) {
        multiplier.textContent = '+ 0.5x';
        attackContainer.classList.add('attack-charge-1');
    } else if (charges === 2) {
        multiplier.textContent = '+ 1.0x';
        attackContainer.classList.add('attack-charge-2');
    } else if (charges >= 3) {
        multiplier.textContent = '+ 1.5x';
        attackContainer.classList.add('attack-charge-3');

        // Adiciona o efeito de fogo melhorado
        createFireEffect(attackContainer);
    }

    // Adiciona o multiplicador ao botão de ataque
    const buttonContent = attackContainer.querySelector('.choice-button-content');
    buttonContent.appendChild(multiplier);
}

// Função para atualizar o status dinamicamente
function atualizarStatus(alvo, tipo, atual, max) {
    if (alvo === "monstro" || alvo === "enemy") {
        // Atualiza a barra de vida do monstro
        const enemyHealth = document.querySelector('.enemy-health');
        const enemyHealthText = document.querySelector('.enemy-health-text');

        if (enemyHealth && enemyHealthText) {
            // Atualiza a largura da barra
            enemyHealth.style.width = `${(atual / max) * 100}%`;

            // Atualiza o texto
            enemyHealthText.innerText = `${atual}/${max}`;

            // Atualiza a cor da barra baseada na porcentagem de vida
            const healthPercent = atual / max;
            enemyHealth.style.backgroundColor = `rgb(${255 - (healthPercent * 255)}, ${healthPercent * 255}, 0)`;

            // Adiciona efeito de pulso quando o monstro perde vida
            enemyHealth.classList.add('pulse-effect');
            setTimeout(() => {
                enemyHealth.classList.remove('pulse-effect');
            }, 500);
        }
    } else if (alvo === "jogador" || alvo === "player") {
        if (tipo === "health") {
            // Atualiza a barra de vida do jogador
            const healthFill = document.querySelector('.health-bar .bar-fill');
            const healthText = document.querySelector('.health-bar + .player-bar-text');

            if (healthFill && healthText) {
                // Atualiza a largura da barra
                healthFill.style.width = `${(atual / max) * 100}%`;

                // Atualiza o texto
                healthText.innerText = `${atual}/${max}`;

                // Atualiza a cor da barra baseada na porcentagem de vida
                const healthPercent = atual / max;
                healthFill.style.backgroundColor = `rgb(${255 - (healthPercent * 255)}, ${healthPercent * 255}, 0)`;

                // Adiciona efeito de pulso quando o jogador perde vida
                healthFill.classList.add('pulse-effect');
                setTimeout(() => {
                    healthFill.classList.remove('pulse-effect');
                }, 500);
            }
        } else if (tipo === "mana") {
            // Atualiza a barra de mana do jogador
            const manaFill = document.querySelector('.mana-bar .bar-fill');
            const manaText = document.querySelector('.mana-bar + .player-bar-text');

            if (manaFill && manaText) {
                // Atualiza a largura da barra
                manaFill.style.width = `${(atual / max) * 100}%`;

                // Atualiza o texto
                manaText.innerText = `${atual}/${max}`;

                // Atualiza a cor da barra baseada na porcentagem de mana
                const manaPercent = atual / max;
                manaFill.style.backgroundColor = `rgb(${255 - (manaPercent * 255)}, ${255 - (manaPercent * 255)}, 255)`;
            }
        } else if (tipo === "defense") {
            // Atualiza as cargas de defesa do jogador
            const defenseBlocks = document.querySelectorAll('.defense-bar .defense-fill');
            const defenseText = document.querySelector('.defense-bar + .player-bar-text');

            if (defenseBlocks.length > 0 && defenseText) {
                // Atualiza o texto
                defenseText.innerText = `${atual}/${max}`;

                // Atualiza as cargas visuais
                defenseBlocks.forEach((block, index) => {
                    block.style.backgroundColor = index < atual ? "purple" : "gray";
                });

                // Atualiza o multiplicador de ataque
                current_defense_bar = atual; // Atualiza a variável global
                updateAttackMultiplier(atual);

                // Adiciona efeito de brilho nas cargas quando aumentam
                if (atual > 0) {
                    defenseBlocks.forEach((block, index) => {
                        if (index < atual) {
                            block.classList.add('glow-effect');
                            setTimeout(() => {
                                block.classList.remove('glow-effect');
                            }, 1000);
                        }
                    });
                }
            }
        } else if (tipo === "xp") {
            // Atualiza a barra de XP do jogador
            const xpFill = document.querySelector('.xp-bar .xp-fill');
            const xpText = document.querySelector('.xp-bar + .player-bar-text');

            if (xpFill && xpText) {
                // Atualiza a largura da barra
                xpFill.style.width = `${(atual / max) * 100}%`;

                // Atualiza o texto
                xpText.innerText = `${atual}/${max}`;

                // Adiciona efeito de brilho quando ganha XP
                xpFill.classList.add('glow-effect');
                setTimeout(() => {
                    xpFill.classList.remove('glow-effect');
                }, 1000);
            }
        }
    }
}

// Função para adicionar mensagem ao histórico de batalha com animação
async function adicionarMensagem(mensagem, tipo = "jogador") {
    const dialogueBox = document.querySelector('.dialogue-box');
    if (!dialogueBox) return;

    // Cria a mensagem
    const messageElement = document.createElement('div');
    messageElement.classList.add('dialogue-message', `${tipo}-message`);

    // Adiciona ícone baseado no tipo de mensagem
    if (tipo === "monstro") {
        messageElement.innerHTML = `<span class="message-icon monster-icon">👹</span> ${mensagem}`;
    } else {
        messageElement.innerHTML = `<span class="message-icon player-icon">⚔️</span> ${mensagem}`;
    }

    // Adiciona a mensagem com efeito de entrada
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    dialogueBox.appendChild(messageElement);

    // Força um reflow para que a animação funcione
    void messageElement.offsetWidth;

    // Anima a entrada da mensagem
    messageElement.style.opacity = '1';
    messageElement.style.transform = 'translateY(0)';

    // Limita o número de mensagens (mantém as 5 mais recentes)
    const messages = dialogueBox.querySelectorAll('.dialogue-message');
    if (messages.length > 5) {
        messages[0].remove();
    }

    // Rola para a mensagem mais recente
    dialogueBox.scrollTop = dialogueBox.scrollHeight;
}

async function principal_menu() {
    await createTopBox("", [
        "Olá viajante, bem-vindo ao reino!",
        "Aqui você encontrará grandes aventuras.",
        "Está pronto para começar?",
        "*INPUT_NOME*",
        `Seja muito bem-vindo à vila, ${player_name}`,
        "Vamos começar a aventura!",
        "Alguem se aproxima de você..."
    ], 5);

    gameplay();
}

// Função para criar o efeito de fogo com partículas
function createFireEffect(container) {
    const fireEffect = document.createElement('div');
    fireEffect.classList.add('fire-effect');

    // Adiciona partículas de fogo
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('fire-particle');

        // Tamanho aleatório
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posição inicial aleatória
        const left = Math.random() * 100;
        particle.style.left = `${left}%`;

        // Animação com atraso aleatório
        const delay = Math.random() * 2;
        const duration = Math.random() * 2 + 1;

        particle.style.animation = `float-up ${duration}s infinite ease-out ${delay}s`;

        fireEffect.appendChild(particle);
    }

    container.appendChild(fireEffect);

    // Adiciona keyframes para animação das partículas
    if (!document.querySelector('#fire-particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'fire-particle-keyframes';
        style.textContent = `
            @keyframes float-up {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100px) scale(0.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    return fireEffect;
}

// Modificar a função updateAttackMultiplier para usar o novo efeito
function updateAttackMultiplier(charges) {
    const attackContainer = document.querySelector('.Attack-Container');
    if (!attackContainer) return;

    // Remove qualquer multiplicador existente
    const existingMultiplier = attackContainer.querySelector('.attack-multiplier');
    if (existingMultiplier) {
        existingMultiplier.remove();
    }

    // Remove efeitos anteriores
    attackContainer.classList.remove('attack-charge-1', 'attack-charge-2', 'attack-charge-3');
    const existingEffect = attackContainer.querySelector('.fire-effect');
    if (existingEffect) {
        existingEffect.remove();
    }

    // Se não tiver cargas, não mostra multiplicador
    if (charges === 0) return;

    // Cria o elemento multiplicador
    const multiplier = document.createElement('span');
    multiplier.classList.add('attack-multiplier', `multiplier-level-${charges}`);

    // Define o texto e a classe com base no número de cargas
    if (charges === 1) {
        multiplier.textContent = '+ 0.5x';
        attackContainer.classList.add('attack-charge-1');
    } else if (charges === 2) {
        multiplier.textContent = '+ 1.0x';
        attackContainer.classList.add('attack-charge-2');
    } else if (charges >= 3) {
        multiplier.textContent = '+ 1.5x';
        attackContainer.classList.add('attack-charge-3');

        // Adiciona o efeito de fogo melhorado
        createFireEffect(attackContainer);
    }

    // Adiciona o multiplicador ao botão de ataque
    const buttonContent = attackContainer.querySelector('.choice-button-content');
    buttonContent.appendChild(multiplier);
}