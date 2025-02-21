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
    'Machado de madeira': {'ataque': 6, 'defesa': 4, 'chance_critico_arma': 0, 'escalonamento_critico': 0.5}
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


let Primeira_Compra = true;

// Listas de inventário
let armaduras_compradas = [];
let armas_compradas = [];
let armadura_equipada = null;
let arma_equipada = null;

let mana_max = 20.0;
let current_mana = 20.0;

let current_health = 100.0;
let health_max = 100.0;

let strength_player = 10.0;
let defense_player = 5.0;

let strength_weapon = 0;
let defense_weapon = 0;

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
    await createTopBox("", [`Você saiu da loja de equipamentos...`], 5);
    await createTopBox("/static/pngs/npcs/Rashid.png", [
        `${npc_trainer} Agora vamos equipar seus itens, ${player_name}`,
    ], 5);
    await backpack()
    console.log('Saiu da BACKPACk')
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
        exitButton.addEventListener("click", () => {
            shopContainer.remove();
            resolve(); // Só continua o código após o usuário clicar em sair
        });

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
        if (Primeira_Compra && !(item.includes("madeira") || item.includes("Peitoral de pano"))) {
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
            if (Primeira_Compra && itemName.includes("madeira")) {
                // Se for Primeira_Compra e comprou uma arma de madeira, remove todas as outras armas de madeira
                document.querySelectorAll(".item-row").forEach(row => {
                    if (row.dataset.name.includes("madeira")) {
                        row.remove();
                    }
                });
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
    let parent = document.querySelector(".game-screen");

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
    if (arma_equipada != null) {
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
    if (armadura_equipada != null) {
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
                arma_equipada = null;
                equiparBtn.innerText = "Equipar";

                // Remover atributos da arma equipada antes de desequipar
                strength_player -= strength_weapon;
                defense_player -= defense_weapon;
                await updateImgBackpack(ArmaContainerBackpack, 'Punhos');
            } else if (arma_equipada != item && arma_equipada != null) {
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

    let parent = document.querySelector(".BackpackArmas-Container.show");
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
                armadura_equipada = null;
                equiparBtn.innerText = "Equipar";

                // Remover atributos da arma equipada antes de desequipar
                defense_player -= defense_weapon;
                updateImgBackpack(ArmaduraContainerBackpack, 'Pelado');
            } else if (armadura_equipada != item && armadura_equipada != null) {
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