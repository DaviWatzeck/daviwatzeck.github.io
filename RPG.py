import random
import time
from math import ceil

# |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
# |                                                      |
# |                                                      |
# |                                                      |
# |                                                      |
# |            Criado por Davi Watzeck Souza             |
# |                                                      |
# |                                                      |
# |                                                      |
# |                                                      |
# |______________________________________________________|


# Configurações
base_loot_chances = {
    'gold': 0.5,  # Probabilidade base de 50%
    'hp_potion': 0.35,  # Probabilidade base de 35%
    'mp_potion': 0.15,  # Probabilidade base de 15%
    'pedra_forja': 0.17,  # Probabilidade base de 17%
    'pedra_ressureicao': 0.09  # Probabilidade base de 09%
}

base_amounts = {
    'gold': 5,
    'hp_potion': 2,
    'mp_potion': 1,
    'pedra_forja': 1,
    'pedra_ressureicao': 1
}


prefixos = ['Kra', 'Zor', 'Vel', 'Mor', 'Tor', 'Gor', 'Fen', 'Drak', 'Lug', 'Vex', 'Ser', 'Thal', 'Bru', 'Mal']
meios = ['ra', 'lo', 'mo', 'zi', 'ka', 'ro', 'ba', 'fi', 'zu', 'ter', 'dor', 'gir']
sufixos = ['gath', 'dor', 'nak', 'rith', 'zan', 'lox', 'moth', 'vor', 'rak', 'gorn', 'tuk', 'kash']

village_name = "Vila Endllage"
npc_trainer = "Jackie Chan - O treinador:"
npc_merchant = "Barões da Roubadinha - O mercante:"
npc_forger = "Tony Stark - O ferreiro:"
npc_priest = "Padre Marcelo - O padre:"
npc_wizard = "Patolino - O mago:"

current_health = float(100)
current_mana = float(20)

health_max = float(100)
mana_max = float(20)
strength = float(10)
defense = float(5)


player_level = 1
magic_level = 1
xp = 0
xp_next_level = 50
gold = 0
hp_pot = 0
mp_pot = 0

armas_atributos = {
    'Peitoral lendário': {'defesa': 150},
    'Clava lendária': {'ataque': 80, 'defesa': 80, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Espada lendária': {'ataque': 70, 'defesa': 90, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Machado lendário': {'ataque': 90, 'defesa': 65, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Peitoral de ferro fundido': {'defesa': 80},
    'Clava de titânio': {'ataque': 50, 'defesa': 50, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Espada de titânio': {'ataque': 45, 'defesa': 50, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Machado de titânio': {'ataque': 55, 'defesa': 40, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Peitoral de aço': {'defesa': 40},
    'Clava de ferro': {'ataque': 25, 'defesa': 25, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Espada de ferro': {'ataque': 20, 'defesa': 30, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Machado de ferro': {'ataque': 30, 'defesa': 20, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Peitoral de ferro': {'defesa': 30},
    'Clava de pedra': {'ataque': 10, 'defesa': 10, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Espada de pedra': {'ataque': 8, 'defesa': 12, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Machado de pedra': {'ataque': 12, 'defesa': 8, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Peitoral de pano': {'defesa': 10},
    'Clava de madeira': {'ataque': 5, 'defesa': 5, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Espada de madeira': {'ataque': 4, 'defesa': 6, 'chance_critico_arma': 0, 'escalonamento_critico': 0},
    'Machado de madeira': {'ataque': 6, 'defesa': 4, 'chance_critico_arma': 0, 'escalonamento_critico': 0}
}


itens_disponiveis_npc_merchant = {
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
}

primeira_visita = True
first_monster = True
first_forge = True
first_church = True
first_tower = True

armaduras_compradas = []
armas_compradas = []
armadura_equipada = None
arma_equipada = None

pedra_forja = 0
pedra_ressureicao = 0
dano_arma = 0
defesa_arma = 0
chance_critico_arma = 0
defense_boost = 0

spells_learned = {
    "Ataque": [],
    "Suporte": [],
    "Buff's": []
}


def create_monster_name():
    prefixo = random.choice(prefixos)
    meio = random.choice(meios) if random.random() > 0.5 else ''
    sufixo = random.choice(sufixos)
    return prefixo + meio + sufixo


def create_monster_level():
    global player_level, strength, defense, health_max
    if first_monster:
        monster_level = 1
        hp_monster = random.randint(25, 30)
        strength_monster = random.randint(1, 5)
        defense_monster = random.randint(1, 5)
        xp_monster = random.randint(30, 50)

    else:
        # Definir a variação de nível com base no nível do jogador
        if player_level < 5:
            level_variation = [-1, 0, 1]  # Máximo de 1 nível acima
        elif player_level < 10:
            level_variation = [-1, 0, 1, 2]  # Máximo de 2 níveis acima
        elif player_level < 15:
            level_variation = [-1, 0, 1, 2, 3]  # Máximo de 3 níveis acima
        else:
            level_variation = [-1, 0, 1, 2, 3]  # Mantém até 3 níveis acima

        monster_level = player_level + random.choice(level_variation)
        monster_level = max(1, monster_level)  # Evita nível 0 ou negativo

        # Balanceamento baseado na diferença de nível
        level_difference = monster_level - player_level
        if level_difference == 1:
            percentual = 0.15  # Pequena vantagem para o monstro
        elif level_difference == 2:
            percentual = 0.25  # Monstro bem mais forte, mas ainda possível de vencer
        elif level_difference == 3:
            percentual = 0.35  # Monstro muito forte, mas com estratégia pode ser vencido
        elif level_difference == -1:
            percentual = -0.15  # Pequena desvantagem para o monstro
        else:
            percentual = 0  # Nível igual, sem ajustes

        # Ajusta HP com base no percentual
        hp_monster = round(health_max * (1 + percentual))
        hp_monster = max(hp_monster, 20)  # Evita que fique muito fraco

        # Ajusta Força
        strength_monster = round(strength * (1 + percentual))
        strength_monster = max(strength_monster, 3)  # Evita que fique fraco demais

        # Ajusta Defesa
        defense_monster = round(defense * (1 + percentual))
        defense_monster = max(defense_monster, 3)  # Defesa mínima para não ser inútil

        # XP ajustado com base no nível do monstro
        base_xp = 30 if monster_level <= player_level else 50  # XP menor para monstros mais fracos, maior para mais fortes
        xp_monster = round(base_xp * (1 + (0.1 * level_difference)))  # XP cresce conforme o desafio
    return monster_level, hp_monster, strength_monster, defense_monster, xp_monster


def generate_random_monster():
    head = random.choice([' .....  ', r" \\\||// ", '  ^^^^  ', '  ~~~~  ', '  ----  '])
    eyes = random.choice([' (o o)', ' (O O)', ' (- -)', ' (* *)', ' (x x)', ' (; ;)'])
    mouth = random.choice(['  [X]  ', r'  \_/  ', '  [-]  ', '  (.)  ', '   X  '])
    arms = random.choice([r' _/|\\_  ', r' </|\>  ', '  |||  ', r'  /-\\  ', r'  \\-/  '])
    body = random.choice([r'  /|\\  ', '  | |  ', ' |===|', '  |-|  ', '  | |  '])
    legs = random.choice([r' _/ \\_ ', '  V V  ', ' <| |> ', r' /   \\ ', '  >_>  '])

    # Montar o monstro
    monster_visual = f"""
    {head}
    {eyes}
    {mouth}
    {arms}
    {body}
    {legs}
    """
    return monster_visual


def player_health_mana():
    global health_max, current_health
    global mana_max, current_mana
    global player_name

    # Cálculo da barra de vida
    porcentagem_life = current_health / health_max
    tamanho_barra_life = 20
    preenchimento_life = int(tamanho_barra_life * porcentagem_life)
    barra_life = "█" * preenchimento_life + "░" * (tamanho_barra_life - preenchimento_life)

    # Cálculo da barra de mana
    porcentagem_mana = current_mana / mana_max
    tamanho_barra_mana = 20
    preenchimento_mana = int(tamanho_barra_mana * porcentagem_mana)
    barra_mana = "█" * preenchimento_mana + "░" * (tamanho_barra_mana - preenchimento_mana)

    return f"{player_name} Vida: [{barra_life}] {current_health:.2f}/{health_max:.2f}\n{player_name} Mana: [{barra_mana}] {current_mana:.2f}/{mana_max:.2f}"


def generate_loot(monster_level):
    loot = {}
    for item, base_chance in base_loot_chances.items():
        # Calcula a chance de loot baseada no nível do monstro
        chance = min(base_chance + (monster_level * 0.01), 1.0)  # Aumenta a chance e limita a 100%

        # Calcula a quantidade do item baseada no nível do monstro
        base_amount = base_amounts[item]
        increased_amount = min(base_amount + int(base_amount * (monster_level * 0.02)), base_amount * 2)  # Limita a quantidade ao dobro do máximo base

        # Verifica se o item vai dropar
        if random.random() < chance:
            loot[item] = random.randint(1, increased_amount)  # Quantidade aleatória do item

    return loot


def view_status():
    global defense, strength, health_max, mana_max, player_level
    print(rf"╔═════════════════════════════════════╗")  # noqa 541
    print(rf"║    Você        Armadura: {defense:.2f}      ║")
    print(rf"║     O          Força:    {strength:.2f}      ║")
    print(rf"║    /|\         Vida Máxima: {health_max:.2f}  ║")
    print(rf"║   / | \        Mana Máxima: {mana_max:.2f}   ║")
    print(rf"║    / \         Nível Magia: {magic_level}       ║")
    print(rf"║   /   \        Nível:   {player_level}           ║")
    print(rf"╚═════════════════════════════════════╝")  # noqa 541


def format_item_name(item):
    # Formata o nome do item com base no tipo de item
    item_names = {
        'gold': "Moedas de Ouro",
        'mp_potion': "Poção de Mana",
        'hp_potion': "Poção de Vida",
        'pedra_forja': "Pedra de Forja",
        'pedra_ressureicao': "Pedra de Ressureicao"
    }
    return item_names.get(item, item.capitalize())


def update_attributes(player_level, strength, defense, health_max, mana_max):
    new_player_level = player_level + 1
    new_strength = ceil((strength + ((strength * 0.0652) * 1.25)) * 100) / 100  # Aumento maior para dano (força)
    new_defense = ceil((defense + ((defense * 0.025) * 1.25)) * 100) / 100  # Aumento menor para defesa
    new_health_max = ceil((health_max + ((health_max * 0.1) * 0.84)) * 100) / 100  # Saúde com crescimento mais expressivo
    new_mana_max = ceil((mana_max + ((mana_max * 0.075) * 1.12)) * 100) / 100  # Mana
    return new_player_level, new_strength, new_defense, new_health_max, new_mana_max


def player_name_choice():
    player_name = input('Digite seu nome: ')
    resposta = input('Você tem certeza que quer ficar com esse nome? Sim ou não?: ').upper()
    if resposta == 'SIM' or resposta == 'S':
        return player_name
    elif resposta == 'NÃO' or resposta == 'N' or resposta == 'NAO':
        print('Vamos escolher um novo nome...')
        return player_name_choice()
    else:
        print('Resposta inválida. Tente novamente.')
        return player_name_choice()


def tutorial_choice():
    tutorial = input(f"{npc_trainer} Você deseja fazer o tutorial? (Sim/não): "
                     "\n")
    time.sleep(2)
    if tutorial.upper() == 'SIM' or tutorial.upper() == 'S':
        return True
    elif tutorial.upper() == 'NÃO' or tutorial.upper() == 'N' or tutorial.upper() == 'NAO':
        print('Vamos começar a aventura!')
        return False
    else:
        print('Resposta inválida. Tente novamente.')
        tutorial_choice()


def tutorial_gameplay():
    print(f"{npc_trainer} Bom vamos lá... a {village_name} foi fundada há 15 anos atrás...")
    time.sleep(5)
    print(f"{npc_trainer} nosso glorioso ancião que fez tudo isso, ele continua construindo a nossa vila e permitindo que nossa raça evolua mais do que qualquer uma...")
    time.sleep(5)
    print(f'{npc_trainer} como a vila é "Recém fundada", temos poucos lugares que você pode ir aqui, temos a Igreja, a Forja, a Loja de equipamentos e a Torre do conhecimento')
    time.sleep(5)
    print(f'{npc_trainer} A igreja é um local onde você pode ser curado de envenenamentos e também poder comprar pots de cura e de mana')
    time.sleep(5)
    print(f'{npc_trainer} A Forja é um lugar onde você pode melhorar seus equipamentos!')
    time.sleep(5)
    print(f'{npc_trainer} A Loja de equipamentos é um lugar onde você pode comprar armaduras, escudos, e outros equipamentos')
    time.sleep(5)
    print(f'{npc_trainer} A Torre do conhecimento é um lugar onde você pode conseguir aprender novas habilidades, sejam elas de suporte, de ataque e aumento de skills temporárias')
    time.sleep(5)
    print(f'{npc_trainer} E por fim você pode ir para a floresta, onde você encontra inimigos, matando eles, eles tem incríveis loots sejam moedas de ouro, peças de armaduras, pots de vida e até mesmo pedras de ressureição. ')
    time.sleep(7)
    print(f'{npc_trainer} Você já está pronto para começar!')
    storygame()


def merchant_offer():
    print('Itens disponíveis:')
    for idx, (item, preco) in enumerate(itens_disponiveis_npc_merchant.items(), start=1):
        print(f'{idx}. {item:<20} {preco:>02}$')
    print(f'Você tem: {gold}$')


def buy_itens():
    global gold
    global primeira_visita

    while True:
        print('\n')
        print(f'{npc_merchant} Vai querer algo?')
        resposta = input('Sim ou não? ').upper()
        if resposta == 'SIM' or resposta == 'S':
            merchant_offer()
            idx_item = int(input('Digite o número do item: '))
            if idx_item in range(1, len(itens_disponiveis_npc_merchant) + 1):
                item, preco = list(itens_disponiveis_npc_merchant.items())[idx_item - 1]
                if item in ['Espada de madeira', 'Machado de madeira', 'Clava de madeira'] and primeira_visita:
                    if not any(i in ['Peitoral de pano'] for i in armaduras_compradas):
                        print('Você precisa comprar uma armadura antes de comprar uma arma.')
                        continue

                if gold >= preco:
                    gold -= preco
                    print(f'Você comprou {item} por {preco}$')
                    print(f'Você tem {gold} moedas de ouro')
                    if item == 'Peitoral de pano':
                        armaduras_compradas.append('Peitoral de pano')
                        del itens_disponiveis_npc_merchant[item]

                    elif item == 'Clava de madeira':
                        armas_compradas.append('Clava de madeira')
                        del itens_disponiveis_npc_merchant[item]

                    elif item == 'Espada de madeira':
                        armas_compradas.append('Espada de madeira')
                        del itens_disponiveis_npc_merchant[item]

                    elif item == 'Machado de madeira':
                        armas_compradas.append('Machado de madeira')
                        del itens_disponiveis_npc_merchant[item]

                    if primeira_visita and armaduras_compradas and armas_compradas:
                        primeira_visita = False

                else:
                    print('Você não tem ouro suficiente')
                    continue
            else:
                print('Nenhum item com esse indice!')
                print('\n')
                continue
        else:
            if primeira_visita and not armaduras_compradas:
                print('Você não pode sair sem comprar uma armadura.')
                continue
            elif primeira_visita and not armas_compradas:
                print('Você não pode sair sem comprar uma arma.')
                continue
            else:
                break


def backpack_itens():
    global armadura_equipada, arma_equipada, dano_arma, defesa_arma, strength, defense
    global current_health, current_mana
    global hp_pot, mp_pot

    while True:
        time.sleep(2)
        print("\nEscolha o que deseja visualizar:")
        print("1. Ver armaduras")
        print("2. Ver armas")
        print("3. Ver poções")
        print("4. Sair")

        escolha = input("Digite o número da opção: ")

        if escolha == '1':
            # Mostrar armaduras
            print("\nArmaduras compradas:")
            if armadura_equipada:
                print(f"{armadura_equipada} (EQUIPADO)")
            for i, armadura in enumerate(armaduras_compradas, 1):
                print(f"{i}. {armadura}")

            # Perguntar se deseja equipar
            equipar_arma = input("\nDeseja equipar alguma arma? (Sim/Não): ").strip().upper()
            if equipar_arma in {'SIM', 'S'}:
                try:
                    idx_arma = int(input("\nDigite o número da arma para ver os atributos: "))
                    if 1 <= idx_arma <= len(armaduras_compradas):
                        armadura_nova = armaduras_compradas[idx_arma - 1]
                        atributos_nova = armas_atributos[armadura_nova]
                        print(f"{armadura_nova}, Defesa = {atributos_nova['defesa']}")

                        confirmar_equipar = input("Deseja equipar essa arma? (Sim/Não): ").strip().upper()
                        if confirmar_equipar in {'SIM', 'S'}:
                            if armadura_equipada:
                                # Remover atributos da arma atual
                                atributos_atual = armas_atributos[armadura_equipada]
                                defense -= atributos_atual['defesa']
                                print(f"Você removeu {armadura_equipada}.")

                            # Equipar nova arma
                            armadura_equipada = armadura_nova
                            defense += atributos_nova['defesa']
                            print(f"Você equipou {armadura_equipada}")

                        else:
                            print("Arma não equipada.")
                    else:
                        print("Opção inválida.")
                except ValueError:
                    print("Entrada inválida. Digite um número.")
            else:
                print("Opção inválida, tente novamente.")

        elif escolha == '2':
            # Mostrar armas
            print("\nArmas compradas:")
            if arma_equipada:
                print(f"{arma_equipada} (EQUIPADO)")
            for i, arma in enumerate(armas_compradas, 1):
                print(f"{i}. {arma}")

            # Perguntar se deseja equipar
            equipar_arma = input("\nDeseja equipar alguma arma? (Sim/Não): ").strip().upper()
            if equipar_arma in {'SIM', 'S'}:
                try:
                    idx_arma = int(input("\nDigite o número da arma para ver os atributos: "))
                    if 1 <= idx_arma <= len(armas_compradas):
                        arma_nova = armas_compradas[idx_arma - 1]
                        atributos_nova = armas_atributos[arma_nova]
                        print(f"{arma_nova}, Dano = {atributos_nova['ataque']}, Defesa = {atributos_nova['defesa']}")

                        confirmar_equipar = input("Deseja equipar essa arma? (Sim/Não): ").strip().upper()
                        if confirmar_equipar in {'SIM', 'S'}:
                            if arma_equipada:
                                # Remover atributos da arma atual
                                atributos_atual = armas_atributos[arma_equipada]
                                strength -= atributos_atual['ataque']
                                defense -= atributos_atual['defesa']
                                print(f"Você removeu {arma_equipada}.")

                            # Equipar nova arma
                            arma_equipada = arma_nova
                            strength += atributos_nova['ataque']
                            defense += atributos_nova['defesa']
                            print(f"Você equipou {arma_equipada}")

                        else:
                            print("Arma não equipada.")
                    else:
                        print("Opção inválida.")
                except ValueError:
                    print("Entrada inválida. Digite um número.")
            else:
                print("Opção inválida, tente novamente.")

        elif escolha == '3':
            # Mostrar poções
            print(f"\nPoções de vida: {hp_pot}")
            print(f"Poções de mana: {mp_pot}")
            escolha3 = input("Usar alguma poção? (Sim/Não/Y/N): ").strip().upper()
            if escolha3 in {'SIM', 'S', 'Y'}:
                try:
                    escolha_potion = input("Digite o número da poção (1/2): ").strip()
                    if escolha_potion == '1':
                        if hp_pot > 0:
                            current_health += 20
                            if current_health > health_max:
                                current_health = health_max
                            print(f"Você usou uma poção de vida. Agora você tem {current_health} pontos de vida.")
                            hp_pot -= 1
                        else:
                            print("Você não possui poções de vida.")
                    elif escolha_potion == '2':
                        if mp_pot > 0:
                            current_mana += 10
                            if current_mana > mana_max:
                                current_mana = mana_max
                            print(f"Você usou uma poção de mana. Agora você tem {current_mana}.")
                        else:
                            print("Você não possui poções de mana.")
                    else:
                        print("Entrada inválida. Digite 1 ou 2.")
                        continue
                except ValueError:
                    print("Entrada inválida. Digite 1 ou 2.")
                    continue

        elif escolha == '4':
            break

        else:
            print("Opção inválida, tente novamente.")


def hunt():
    monster_name = create_monster_name()
    monster_config = create_monster_level()
    monster_level = monster_config[0]
    hp_monster = monster_config[1]
    strength_monster = monster_config[2]
    defense_monster = monster_config[3]
    xp_monster = monster_config[4]
    time.sleep(2)
    print(f"Você encontrou um {monster_name}")
    time.sleep(1)
    print(f"Seu level: {player_level}, level do monstro: {monster_level}")
    time.sleep(1)
    print(f"Sua vida atual: {current_health}, vida do monstro: {hp_monster}")
    time.sleep(1)
    print(f"Sua força: {strength}, força do monstro: {strength_monster}")
    time.sleep(1)
    print(f"Sua defesa: {defense}, defesa do monstro: {defense_monster}")
    time.sleep(1)
    battle(monster_name, monster_level, hp_monster, strength_monster, defense_monster, xp_monster)


def player_level_up(monster_name, xp_monster, monster_level):
    global player_level, current_health, health_max, mana_max, current_health, current_mana
    global strength, defense, defense_boost, strength_boost, xp_next_level, xp
    global first_monster
    global gold
    global hp_pot, mp_pot, gold, pedra_forja, pedra_ressureicao
    print(f'Você derrotou o {monster_name}!')
    xp += xp_monster
    print(f"Você ganhou {xp_monster} XP.")
    time.sleep(1)
    while True:
        if xp >= xp_next_level:
            if first_monster is True:
                first_monster = False
            print("Parabéns! Você subiu de nível!")
            xp -= xp_next_level
            xp_next_level = int(xp_next_level * 1.5)
            new_player_level, new_strength, new_defense, new_health_max, new_mana_max = update_attributes(player_level, strength, defense, health_max, mana_max)
            print("Seus atributos aumentaram:")
            time.sleep(1)
            print(f"\nLevel: {player_level} -> {new_player_level}")
            time.sleep(1)
            print(f"\nForça: {strength:.2f} -> {new_strength:.2f}")
            time.sleep(1)
            print(f"\nDefesa: {defense:.2f} -> {new_defense:.2f}")
            time.sleep(1)
            print(f"\nVida Máxima: {health_max:.2f} -> {new_health_max:.2f}")
            time.sleep(1)
            print(f"\nMana Máxima: {mana_max:.2f} -> {new_mana_max:.2f}")
            time.sleep(2)
            # Atualiza os atributos do jogador
            player_level, strength, defense, health_max, mana_max = new_player_level, new_strength, new_defense, new_health_max, new_mana_max

            # Depois que o jogador upa, sua vida e mana são restaurados
            current_health = health_max
            current_mana = mana_max
        else:
            break

    loot = generate_loot(monster_level)
    if loot != {}:
        for item, amount in loot.items():
            name = format_item_name(item)
            print(f'Você encontrou {amount} {name}!')
            if item == 'gold':
                gold += amount
            elif item == 'hp_potion':
                hp_pot += amount
            elif item == 'mp_potion':
                mp_pot += amount
            elif item == 'pedra_forja':
                pedra_forja += amount
            elif item == 'pedra_ressureicao':
                pedra_ressureicao += amount
    else:
        print('O monstro não dropou nenhum item.')
    time.sleep(1)


def battle(monster_name, monster_level, hp_monster, strength_monster, defense_monster, xp_monster):
    global current_health, current_mana, health_max, mana_max
    global xp, xp_next_level
    global hp_pot, mp_pot, gold, pedra_forja, pedra_ressureicao
    global defense, defense_boost, strength
    global player_level
    global first_monster
    monster_visual = generate_random_monster()
    current_health_monster = hp_monster
    rodada_monstro = False
    while current_health_monster > 0 or current_health > 0:
        # Monstro HP
        percent_hp_monster = current_health_monster / hp_monster
        bar_length_monster = 20
        filled_length_monster = int(bar_length_monster * percent_hp_monster)
        health_bar_monster = '█' * filled_length_monster + '-' * (bar_length_monster - filled_length_monster)

        print(monster_visual)
        print(f'{monster_name} HP: [{health_bar_monster}] {current_health_monster:.2f}/{hp_monster:.2f}')

        time.sleep(1)
        # Player HP
        percent_hp_player = current_health / health_max
        bar_length_player = 20
        filled_length_player = int(bar_length_player * percent_hp_player)

        # Construir a barra de vida
        health_bar_player = '█' * filled_length_player + '-' * (bar_length_player - filled_length_player)

        # Player MP
        percent_mp_player = current_mana / mana_max
        bar_length_player_mp = 20
        filled_length_player_mp = int(bar_length_player_mp * percent_mp_player)

        # Construir a barra de vida
        mana_bar_player = '█' * filled_length_player_mp + '-' * (bar_length_player_mp - filled_length_player_mp)

        # Exibir a barra de vida com o valor numérico ao lado
        print('\n')
        print(r'Você: ‾\O/‾')  # noqa : W605
        print(f'{player_name} HP: [{health_bar_player}] {current_health:.2f}/{health_max:.2f}')
        print(f'{player_name} MP: [{mana_bar_player}] {current_mana:.2f}/{mana_max:.2f}')
        time.sleep(1)
        print("\nEscolha sua ação:")
        print("[1] Atacar 🗡️")
        print("[2] Defender 🛡️")
        print("[3] Usar Poção 🧪")
        print("[4] Usar Magia 🔮")
        player_choice = input('').upper()
        if player_choice == '1':  # Atacar
            damage_dealt = round(float((random.randint(int(strength - 5), int(strength))) + (0.35 * strength)), 2)
            if armas_atributos[arma_equipada]['chance_critico_arma'] > 0:
                random_chance = round(random.uniform(0.1, 1.0), 1)

                # Verifica se houve acerto crítico
                if random_chance <= armas_atributos[arma_equipada]['chance_critico_arma']:
                    crit_multiplier = 1 + armas_atributos[arma_equipada]['escalonamento_critico']
                    damage_dealt = round(damage_dealt * crit_multiplier, 2)
                    print("🔥 CRÍTICO! 🔥")

            if round(damage_dealt - (0.15 * defense_monster), 2) <= 0.00:
                print('Você errou seu ataque.')
            else:
                current_health_monster -= round(damage_dealt - (0.15 * defense_monster), 2)
                print(f'Você atacou o monstro, causando {round(damage_dealt - (0.15 * defense_monster), 2)} de dano')
            rodada_monstro = True
            time.sleep(1)

        elif player_choice == '2':  # Defender
            defense_boost = round(float((random.randint(int(defense - 5), int(defense))) + (0.35 * defense)), 2)
            print(f'Você se preparou para defender, aumentando sua defesa em {defense_boost}')
            defense += defense_boost
            rodada_monstro = True
            time.sleep(1)

        elif player_choice == '3':  # Usar Poção
            if hp_pot > 0 or mp_pot > 0:
                pergunta_pot = input(
                    "Qual poção você quer usar?\n"
                    "[1] Poção de Vida 🧪❤️ (Restantes: {})\n"
                    "[2] Poção de Mana 🧪💙 (Restantes: {})\n".format(hp_pot, mp_pot)
                )
                if pergunta_pot == '1':
                    if hp_pot > 0:
                        current_health += 25
                        hp_pot -= 1
                        print('Você usou uma Poção de Vida e restaurou 25 pontos de vida.')
                        rodada_monstro = True
                    else:
                        print('Você não tem mais Poções de Vida.')
                elif pergunta_pot == '2':
                    if mp_pot > 0:
                        current_mana += 25
                        mp_pot -= 1
                        print('Você usou uma Poção de Mana e restaurou 25 pontos de mana.')
                        rodada_monstro = True
                    else:
                        print('Você não tem mais Poções de Mana.')
                else:
                    print('Opção inválida.')
            else:
                print('Você não possui mais poções.')

        elif player_choice == '4':  # Magia
            print("Sem magias por enquanto...")

        else:
            print('Opção inválida')
            continue

        if current_health_monster <= 0.00:
            player_level_up(monster_name, xp_monster, monster_level)
            break

        else:
            if rodada_monstro is True:
                rodada_monstro = False
                damage_dealt = round(float((random.randint(int(strength_monster - 5), int(strength_monster))) + (0.35 * strength_monster)), 2)
                if round(damage_dealt - (0.15 * defense), 2) <= 0.00:
                    print('Você defendeu o ataque do monstro!')
                else:
                    current_health -= round(damage_dealt - (0.15 * defense), 2)
                    print(f'O monstro atacou você, causando {round(damage_dealt - (0.15 * defense), 2)} de dano')
                if defense_boost > 0:
                    defense -= defense_boost
                time.sleep(1)

        if current_health <= 0:
            print("Você foi derrotado! Game Over.")
            break

    # Mensagem final após a batalha
    print('Batalha encerrada.')


def forge():
    global first_forge, pedra_forja, gold, chance_critico_arma
    print("Seja bem vindo a forja...")
    if first_forge is False:
        print(f'{npc_forger} Fala meu guerreiro, vai querer aprimorar o que hoje?')
    time.sleep(2)
    while True:
        if first_forge is True:
            print(f'{npc_trainer} Na forja é possível melhorar suas armas e armaduras...')
            time.sleep(2)

            print(f'{npc_trainer} Existem 2 tipos de melhoria na arma e armadura:')
            time.sleep(2)

            print(f'{npc_trainer} 1° Tipo de melhoria na arma:')
            print(f'{npc_trainer} Você adiciona uma possibilidade do seu dano no inimigo critar (x0,5 a mais do ano)')
            time.sleep(6.5)

            print(f'{npc_trainer} 2° Tipo de melhoria na arma:')
            print(f'{npc_trainer} Você aumenta o dano base, a defesa base e escalonamento do crítico')
            time.sleep(4.5)

            print(f'{npc_trainer} 1° Tipo de melhoria na armadura:')
            print(f'{npc_trainer} Você aumenta a possibilidade de defender um ataque')
            time.sleep(5.5)

            print(f'{npc_trainer} 2° Tipo de melhoria na armadura:')
            print(f'{npc_trainer} Você aumenta a possibilidade do seu dano refletir no inimigo (baseado no dano que ele te deu)')
            time.sleep(7)

            print(f'{npc_trainer} Mas é claro que tudo tem seu preço e nem sempre voce pode ter sucesso ao melhorar sua arma hahahaha...')
            time.sleep(5)
            print(f'{npc_trainer} Vamos começar?')
            time.sleep(2)
            if pedra_forja == 1:
                print(f'{npc_trainer} Eu te darei os 50 de ouro, mas vejo que no primeiro monstro você dropou uma pedra de forja, vou poupar a minha então hahahaha')
                time.sleep(6)
            else:
                print(f'{npc_trainer} Vou te emprestar a minha pedra de forja e te dar 50 de ouro')
                time.sleep(2)
                pedra_forja += 1
                print('Você ganhou 1 pedra de forja de Jackie Chan')
            time.sleep(3)
            gold += 50
            print('Você ganhou 50 moedas de ouro de Jackie Chan')
            time.sleep(2)

        if first_forge is True:
            escolha = input("[1] Aprimorar armas ⚔️ 🦯 🪓 "
                            "\nEscolha uma opção:  ")
        else:
            escolha = input("[1] Aprimorar armas ⚔️ 🦯 🪓"
                            "\n[2] Aprimorar armadura 🛡️"
                            "\n[3] Sair 🚪"
                            "\nEscolha uma opção:  ")
        time.sleep(2)
        if escolha == '1':
            if first_forge is True:
                print(f'{npc_forger} Qual tipo de aprimoramento?')
                escolha_1 = input("[1] Aprimorar chance de crítico ➕💥 - (50 de gold e 1 pedra de forja)"
                                  "\nEscolha uma opção:  ")
            else:
                print(f'{npc_forger} Qual tipo de aprimoramento?')
                escolha_1 = input("[1] Aprimorar chance de crítico ➕💥 - (50 de gold e 1 pedra de forja)"
                                  "\n[2] Aprimorar dano base, defesa base e escalonamento do crítico da arma ➕💪 (100 de gold e 2 pedra de forja)"
                                  "\n[3] Voltar 🚪"
                                  "\nEscolha uma opção:  ")
            time.sleep(2)
            if escolha_1 == '1':
                if gold >= 50 and pedra_forja >= 1:
                    if first_forge is True:
                        print(f"{npc_forger} Vejo que está com a treinador, vou garantir o sucesso de melhoria da sua arma, mas só dessa vez, não se acostume hein...")
                        time.sleep(5)
                        print("Melhorando.")
                        time.sleep(1)
                        print("Melhorando..")
                        time.sleep(1)
                        print("Melhorando...")
                        time.sleep(1)
                        print("Sucesso!")
                        time.sleep(2)
                        print('Você aumentou a chance de crítico da sua arma em 10%!')
                        armas_atributos[arma_equipada]['chance_critico_arma'] += 0.10  # 10% chance de crítico
                        armas_atributos[arma_equipada]['escalonamento_critico'] += 0.50
                        time.sleep(2)
                        print('Você usou 50 moedas de ouro e 1 pedra de forja')
                        gold -= 50
                        pedra_forja -= 1
                        time.sleep(2)
                        first_forge = False
                    else:
                        # Logica para ser 75% de chance de sucesso
                        print(f'{npc_forger} Você aumentou a chance de crítico em 10%!')
                        armas_atributos[arma_equipada]['chance_critico_arma'] += 0.10  # 10% chance de crítico
                        time.sleep(2)
                        print('Você usou 50 moedas de ouro e 1 pedra de forja')
                        if armas_atributos[arma_equipada]['escalonamento_critico'] == 0:
                            armas_atributos[arma_equipada]['escalonamento_critico'] += 0.50
                        gold -= 50
                        pedra_forja -= 1
                        time.sleep(2)
                else:
                    print(f'{npc_forger} Você não possui moedas de ouro ou pedras de forja suficiente')
                    time.sleep(2)
                    continue
            elif escolha_1 == '2' and first_forge is False:
                if gold >= 100 and pedra_forja >= 2:
                    print(f'{npc_forger} Você aumentou o dano base, defesa base e escalonamento do crítico em 15%!')
                    armas_atributos[arma_equipada]['ataque'] += armas_atributos[arma_equipada]['ataque'] * 0.15  # 15% aumento de dano base
                    armas_atributos[arma_equipada]['defesa'] += armas_atributos[arma_equipada]['defesa'] * 0.15  # 15% aumento de defesa base
                    armas_atributos[arma_equipada]['escalonamento_critico'] += armas_atributos[arma_equipada]['escalonamento_critico'] * 0.25
                    # damage_base += 0.1  # 10% aumento de dano base
                    # defense_base += 0.1  # 10% aumento de defesa base
                    # escalonamento_critico += 0.1  # 10% aumento de escalonamento do crítico
                    # time.sleep(2)
                    # print('Você usou 100 moedas de ouro e 2 pedras de forja')
                    # gold -= 100
                    # pedra_forja -= 2
                    # time.sleep(2)
                else:
                    print(f'{npc_forger} Você não possui moedas de ouro ou pedras de forja suficiente')
                    time.sleep(2)
                    continue
            elif escolha_1 == '3' and first_forge is False:
                continue
            else:
                print('Opção inválida')
        elif escolha == '2' and first_forge is False:
            ...
            # Logica a ser implementada
        elif escolha == '3' and first_forge is False:
            print(f'{npc_forger} Até mais {player_name}, volte sempre!')
            break
        else:
            print('Opção inválida')
    print("Você saiu da forja...")


def church():
    global envenenamento, hp_pot, mp_pot, current_health, gold, player_name, first_church
    print("Você entrou na igreja...")
    time.sleep(2)
    if first_church is True:
        print(f'{npc_priest} Deus abençoe meus filhos...')
    else:
        print(f'{npc_priest} Deus te abençoe meu filho...')
    time.sleep(2)
    print(f'{player_name}: Amém Padre')
    time.sleep(2)
    if first_church is True:
        print(f'{npc_trainer} Amém Padre Marcelo')
        time.sleep(2)
    print(f'{npc_priest} Em que posso te ajudar hoje?')
    time.sleep(2)
    while True:
        if first_church is True:
            print(f'{npc_trainer} Padre, esse é o nosso novo aventureiro {player_name}, estou explicando a ele como funciona as coisas por aqui')
            time.sleep(7)
            print(f'{npc_priest} Fique a vontade filho... Seja bem vindo {player_name}')
            time.sleep(5)
            print(f'{npc_trainer} Aqui com o nosso Padre Marcelo, podemos comprar pots de vida e mana, curar a nossa vida depois de uma batalha ou pedir pra ele nos curar de algum envenenamento')
            time.sleep(10)
            print(f'{npc_trainer} Aqui, tome 20 moedas de ouro e compre 2 pots de vida e 2 pots de mana')
            time.sleep(2)
            gold += 20
            print("Você ganhou 20 moedas de ouro de Jackie Chan")
            time.sleep(2)
            print(f"{npc_priest}"
                  "\n[1] Comprar pots de vida e mana")

        else:
            print("[1] Comprar pots de vida e mana"
                  "\n[2] Retirar envenenamento"
                  "\n[3] Curar vida"
                  "\n[4] Sair")
        escolha = input("\nEscolha uma opção:  ")
        time.sleep(2)

        def comprar_hp_mp(gold, hp_pot, mp_pot):
            global envenenamento, current_health, player_name, first_church
            while True:
                if globals()['hp_pot'] >= 2 and globals()['mp_pot'] >= 2:
                    first_church = False
                    print(f"{npc_trainer} Vejo que comprou as pot de vida e mana, vamos para o ultimo lugar, a Torre do conhecimento")
                    time.sleep(5)
                    return True
                print("[1] Potion de vida"
                      "\n[2] Potion de Mana"
                      "\n[3] Voltar")
                escolha_1 = input("\nEscolha uma opção:  ")
                if escolha_1 == '1':
                    try:
                        preco_hp = 5
                        escolha_1_1 = int(input(f"1x HP POT = R${preco_hp}"
                                                "\ndigite a quantidade que você quer comprar: "))
                    except ValueError:
                        print("Escolha inválida, não é um número.")
                        comprar_hp_mp()
                        time.sleep(2)
                    else:
                        time.sleep(2)
                        preco_hp_final = escolha_1_1 * preco_hp
                        if first_church is True:
                            if escolha_1_1 != 2:
                                print("Você foi instruído a comprar 2 unidades de pot de vida...")
                            else:
                                if gold >= preco_hp_final:
                                    gold -= preco_hp_final
                                    print(f'Você comprou {escolha_1_1} poção(ões) de vida por {preco_hp_final}$')
                                    time.sleep(2)
                                    globals()['hp_pot'] += escolha_1_1
                                    print(f'Você agora tem {globals()['hp_pot']} poção(ões) de vida')
                                    time.sleep(2)
                                else:
                                    print('Você não tem moedas de ouro suficientes')
                                    time.sleep(2)
                                continue
                        else:
                            if gold >= preco_hp_final:
                                gold -= preco_hp_final
                                print(f'Você comprou {escolha_1_1} poção(ões) de vida por {preco_hp_final}$')
                                time.sleep(2)
                                globals()['hp_pot'] += escolha_1_1
                                print(f'Você agora tem {globals()['hp_pot']} poção(ões) de vida')
                                time.sleep(2)
                            else:
                                print('Você não tem moedas de ouro suficientes')
                                time.sleep(2)
                        continue
                elif escolha_1 == '2':
                    try:
                        preco_mp = 5
                        escolha_1_2 = int(input(f"1x MP POT = R${preco_mp}"
                                                "\ndigite a quantidade que você quer comprar: "))
                    except ValueError:
                        print("Escolha inválida, não é um número.")
                        time.sleep(2)
                    else:
                        time.sleep(2)
                        preco_mp_final = escolha_1_2 * preco_mp
                        if first_church is True:
                            if escolha_1_1 != 2:
                                print("Você foi instruído a comprar 2 unidades de pot de mana...")
                            else:
                                if gold >= preco_mp_final:
                                    gold -= preco_mp_final
                                    print(f'Você comprou {escolha_1_2} poção(ões) de mana por {preco_mp_final}$')
                                    time.sleep(2)
                                    globals()['mp_pot'] += escolha_1_2
                                    print(f'Você agora tem {globals()['mp_pot']} poção(ões) de mana')
                                    time.sleep(2)
                                else:
                                    print('Você não tem moedas de ouro suficientes')
                                    time.sleep(2)
                        else:
                            if gold >= preco_mp_final:
                                gold -= preco_mp_final
                                print(f'Você comprou {escolha_1_2} poção(ões) de mana por {preco_mp_final}$')
                                time.sleep(2)
                                globals()['mp_pot'] += escolha_1_2
                                print(f'Você agora tem {globals()['mp_pot']} poção(ões) de mana')
                                time.sleep(2)
                            else:
                                print('Você não tem moedas de ouro suficientes')
                                time.sleep(2)
                        continue
                elif escolha_1 == '3' and first_church is True:
                    print('Você não pode sair sem comprar as pots com as moedas que o Jackie Chan te deu')
                    time.sleep(2)
                    continue
                elif escolha_1 == '3' and first_church is False:
                    break
                else:
                    print('Opção inválida')
                    continue

        if escolha == '1':
            returntrue = comprar_hp_mp(gold, hp_pot, mp_pot)
            if returntrue is True:
                break
        elif escolha == '2' and first_church is False:
            if envenenamento is True:
                print(f"{npc_priest} Vejo que está envenenado, posso retirar o envenenamento por 15 moedas de ouro, aceita?")
                time.sleep(3)
                escolha_2 = input("\n[1] Sim"
                                  "\n[2] Não")
                if escolha_2 == '1' and gold >= 15:
                    print(f"{npc_priest} Per divinas vires hanc veneficium tollo.")
                    time.sleep(5)
                    envenenamento = False
                    print(f"{npc_priest} Feito! Envenenamento retirado")
                elif escolha_2 == '1' and gold < 15:
                    print(f"{npc_priest} Não posso aceitar, você não tem moedas de ouro suficientes")
                elif escolha == '2':
                    continue
                else:
                    print('Opção inválida')
                    continue
            else:
                print(f"{npc_priest} Você nao está envenenado")
        elif escolha == '3' and first_church is False:
            if current_health != health_max:
                print(f"{npc_priest} Eu posso recuperar sua vida por 20 moedas de ouro, aceita?")
                time.sleep(3)
                escolha_3 = input("\n[1] Sim"
                                  "\n[2] Não")
                if escolha_3 == '1' and gold >= 20:
                    print(f"{npc_priest} Per numina divina, Dono tibi sanitatem")
                    time.sleep(5)
                    gold -= 20
                    current_health = health_max
                    print(f"{npc_priest} Feito! Vida recuperada")
            else:
                print(f"{npc_priest} Não posso aceitar, você já está com a vida cheia")
        elif escolha == '4' and first_church is False:
            break
        else:
            print('Opção inválida')
            continue
    print("Você saiu da igreja...")
    time.sleep(2)


def npc_fanho(texto):
    fanho = texto.replace('r', 'l').replace('R', 'L')

    # Adiciona gagueira aleatória para tornar mais engraçado
    fanho_gagueira = ''
    for char in fanho:
        if random.random() < 0.05 and char.isalpha():  # 20% de chance de gaguejar
            fanho_gagueira += char + '-' + char
        fanho_gagueira += char

    print(f'{npc_wizard} {fanho_gagueira}')


def tower_of_knowledge():
    global first_tower, gold, spells_learned
    print("Você adentrou na torre do conhecimento...")
    time.sleep(3)
    npc_fanho("Sejam muito bem vindos meus nobres guerreiros...")
    if first_tower is True:
        time.sleep(5)
        print(f"{npc_trainer} ...")
        print(f"{player_name}: ...")
        time.sleep(3)
        npc_fanho("O que foi? Nunca viram um pato mago?")
        time.sleep(5)
        print(f"{npc_trainer} Isso é o de menos kkkkkk")
        time.sleep(3)
        print(f"{player_name}: Nunca vi um pato fanho, ainda mais gago KKKKKKKK")
        time.sleep(5)
        npc_fanho("...")
        time.sleep(3)
        npc_fanho("Vocês vieram aqui pra me zoar ou pra aprenderem magias?")
        time.sleep(5)
        print(f"{npc_trainer} Bom, vamos lá entao, vou te dar 100 moedas de ouro para você aprender uma magia de cura básica")
        time.sleep(7)
        gold += 100
        print("Você ganhou 100 moedas de ouro de Jackie Chan")
        time.sleep(3)
    while True:
        if first_tower is True:
            npc_fanho("Por agora, vou te ensinar uma magia de cura básica")
            time.sleep(3)
            print('Você aprendeu uma magia de cura: "Exura Ico"')
            gold -= 100
            spells_learned["Suporte"].append("Exura Ico")
            time.sleep(3)
            npc_fanho("A Magia Exura Ico cura sua vida com base no nível da sua habilidade de magia")
            time.sleep(6)
            first_tower = False
        print("╔═════════════════════════╗")
        print("║ 1. Aprender magias      ║")
        print("║ 2. Aprimorar magia      ║")
        print("║ 3. Melhorar habilidade  ║")
        print("║ 4. Sair                 ║")
        print("╚═════════════════════════╝")
        escolha = input("Digite uma opção: ")
        if escolha == '1':
            ...
        elif escolha == '2':
            ...
        elif escolha == '3':
            ...
        elif escolha == '4':
            break
        else:
            print('Opção inválida')
            continue


def storygame():
    print(f'{npc_trainer} Antes de começar, te darei 10 moedas de ouro para que você compre uma armadura e uma arma')
    time.sleep(3)
    global gold
    gold += 10
    print(f'Você tem {gold} moedas de ouro')
    print('Voce entrou na loja de equipamentos...')
    time.sleep(2)
    print(f'{npc_merchant} Fala meu guerreiro, tudo bem? o que deseja pra hoje?')
    buy_itens()
    print('Você saiu da loja de equipamentos...')
    time.sleep(2)
    print(f'{npc_trainer} Agora vamos equipar seus itens, {player_name}')
    backpack_itens()
    time.sleep(2)
    print(f'{npc_trainer} Agora você pode ir se aventurar na floresta')
    hunt()
    time.sleep(2)
    print(f'{npc_trainer} Ora ora... vejo que você se saiu muito bem!')
    time.sleep(2)
    print(f'{npc_trainer} Agora iremos visitar a forja')
    forge()
    time.sleep(2)
    print(f"{npc_trainer} Vamos conhecer a igreja agora")
    time.sleep(2)
    church()
    print(f'{npc_trainer} Agora, por ultimo, visitaremos a torre do conhecimento')
    time.sleep(4)
    print(f'{npc_trainer} Dizem que lá é um lugar com forças mágicas extremamente poderosas controladas por um......')
    time.sleep(7)
    print(f'{npc_trainer} PATO')
    time.sleep(2)
    print(f'{npc_trainer} ...')
    time.sleep(2)
    print(f'{npc_trainer} Pois é um pato kkkkk')
    time.sleep(2)
    print(f'{npc_trainer} Não me questione, questione o programador que fez isso')
    time.sleep(5)
    print(f'{npc_trainer} Enfim, vamos visitar a torre...')
    time.sleep(2)
    tower_of_knowledge()
    print(f'{npc_trainer} Você está pronto para se tornar um herói!')
    time.sleep(5)
    print(f'{npc_trainer} Esperamos que você seja um herói forte!')
    time.sleep(5)
    print(f'{npc_trainer} Agora você estará por conta própria')
    time.sleep(3)
    print(f'{npc_trainer} No seu nível 10, você pode enfrentar um boss')
    time.sleep(2)
    print(f'{npc_trainer} No seu nível 50, você pode enfrentar o boss final do jogo')
    time.sleep(3)
    print(f'{npc_trainer} Boa sorte!!!')
    time.sleep(2)
    maingame()


def gameplay():
    print('Alguem se aproxima de você...')
    time.sleep(3)
    print(f"{npc_trainer} Olá! Seja bem vindo {player_name} a {village_name}")
    time.sleep(5)
    print(f"{npc_trainer} Sou o treinador da vila")
    time.sleep(5)
    tutorial = tutorial_choice()
    if tutorial is True:
        tutorial_gameplay()
    elif tutorial is False:
        storygame()


def maingame():
    while True:
        print(player_health_mana())
        print("╔══════════════════════════╗")
        print("║ 1. Mercante              ║")
        print("║ 2. Forja                 ║")
        print("║ 3. Igreja                ║")
        print("║ 4. Torre do conhecimento ║")
        print("║ 5. Mochila               ║")
        print("║ 6. Ver Status            ║")
        print("║ 7. Ir para floresta      ║")
        print("╚══════════════════════════╝")
        escolha = input("Escolha uma opção: ")
        if escolha == '1':
            buy_itens()
        elif escolha == '2':
            forge()
        elif escolha == '3':
            church()
        elif escolha == '4':
            tower_of_knowledge()
        elif escolha == '5':
            backpack_itens()
        elif escolha == '6':
            view_status()
        elif escolha == '7':
            hunt()
        else:
            print('Opção inválida')
            time.sleep(2)
            continue


def main():
    print('\n')
    print("Seja bem vindo ao jogo de RPG")
    time.sleep(2)
    print('Você é um novo integrante da vila')
    time.sleep(3)
    print('Você precisa escolher um nome para seu personagem:')
    global player_name
    player_name = player_name_choice()
    time.sleep(2)
    print(f'Seja muito bem vindo a vila, {player_name}')
    time.sleep(4)
    print('Vamos começar a aventura!')
    time.sleep(2)
    gameplay()


if __name__ == '__main__':
    main()

# Boss a ser implementado
# Sua aparência VVVVVV
# ascii_art = """
#          ,     .
#         /(     )\               A
#    .--.( `.___.' ).--.     ^   /_\   ^
#    `._ `%_&%#%$_ ' _.'    /|  <___>  |\\
#       `|(@\\\*%%/@)|'     / (__ |L| __) \\
#        |  |%%#|  |      J d8bo |=|od8b  L
#         \\\ \$#%/ /      | 8888 |=|8888  |
#         |\\\|%%#|/|      J Y8P"_|=|_"Y8P F
#         | (.".)%|        \\\ (  |L|  ) //
#     ___.'  `-'  `.___     \\\|  |L|  |//
#   .'#*#`-       -'$#*`.       /(_)
#  /#%^#%*_ *%^%_  #  %$%\\\    .(__)
#  #&  . %%%#% ###%*.   *%\\\.-'&(__)
#  %*  J %.%#_|_#$.\\\J* \\\ %'#%*(__)
#  *#% J %$%%#|#$#$ J\\\%   *   .-(_)
#  |%  J\\\ `%%#|#%%' / `.   _.'  |L|
#  |#$%||` %%%$### '|   `-'      |L|
#  (#%%||` #$#$%%% '|            |L|
#  | ##||  $%%.%$%  |            |L|
#  |$%^||   $%#$%   |            |L|
#  |&^ ||  #%#$%#%  |            |L|
#  |#$*|| #$%$$#%%$ |\\\          |L|
#  ||||||  %%(@)$#  |\\\\\\\        |L|
#  `|||||  #$$|%#%  | L|         |L|
#       |  #$%|$%%  | ||l        |L|
#       |  ##$H$%%  | |\\\\\\\      |L|
#       |  #%%H%##  | |\\\\\\\|     |L|
#       |  ##% $%#  | Y|||       |L|
#       J $$#* *%#% L  |E/       \=/
#       J#%$ | |%%#%L  F/         V
#       |$$%#& & %%#|
#       J##$ J % %%$F
#        %$# * * %#&
#        %#$ | |%#$%
#        *#$%| | #$*
#       /$#' ) ( `%%\\\\
#      /#$# /   \\\ %$%\\\\
#     ooooO'     `Ooooo
# """

# print(ascii_art)
