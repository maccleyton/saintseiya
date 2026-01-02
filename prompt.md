**Contexto:**
Estou desenvolvendo um projeto web chamado **"Saint Seiya"** usando HTML, CSS e JavaScript puro (Vanilla). Preciso criar o "Motor de Batalha" que calcula as sinergias de time baseadas nas regras do jogo *Saint Seiya: Legend of Justice*.

**Sua Tarefa:**
Crie um módulo JavaScript chamado `SaintSeiyaFormationEngine.js` e um arquivo HTML de teste (`index.html`) que implementem a lógica de Elementos e Formação.

**Requisitos Técnicos:**

1. **Constantes e Dados:**
* Defina os Elementos: Água, Fogo, Vento, Terra, Luz, Trevas.
* Crie um array `databaseCavaleiros` com objetos contendo `{ id, nome, elemento, role }`.
* **Dados Iniciais:** Inclua pelo menos:
* Aldebaran (Terra, Tank)
* Aiolos (Fogo, Assassino)
* Camus (Vento, Mago)
* Milo (Água, Assassino)
* Saga (Luz, Guerreiro)
* **Pandora (Trevas, Suporte)** -> *Novo dado adicionado.*

2. **Lógica de Formação (`calcularBonusFormacao`):**
* A função deve receber um array de 5 cavaleiros.
* Deve retornar o nome do bônus ativo e os valores de `% DMG` e `% HP`.
* **Regras de Bônus:**
* **Básico (3 do mesmo elemento):** +10% DMG / +10% HP.
* **Misto (3 do mesmo elemento + 2 de outro elemento):** +15% DMG / +15% HP.
* **Dominante (4 do mesmo elemento):** +15% DMG / +20% HP.
* **Penta/Arco-íris (5 Elementos Diferentes):** +20% DMG / +20% HP.
* **Mono (5 do mesmo elemento):** +25% DMG / +25% HP.

* **REGRA CRUCIAL (Curingas):** Cavaleiros de **Luz** e **Trevas** funcionam como **Curingas**. Eles contam como "qualquer elemento" para fechar os conjuntos de 3, 4 ou 5 do mesmo tipo. (Ex: 3 Fogo + 2 Luz = Conta como 5 Fogo para o bônus Mono).
* *Correction/Refinement needed on Joker logic*: Usually Light/Dark amplify existing bonuses or count towards the majority. The prompt says "Count as 'any element' to close sets". I will implement this logic specifically: They adapt to the element that yields the highest bonus.

3. **Lógica de Dano (`calcularMultiplicadorElemental`):**
* Implemente a função que recebe `(atacante, defensor)` e retorna o multiplicador de dano.
* **Regras:**
* Água > Fogo > Vento > Terra > Água: Multiplicador **1.25x**.
* Luz <> Trevas (Vantagem Mútua): Multiplicador **1.25x**.
* Caso contrário: **1.0x**.

4. **Interface de Teste (HTML/CSS):**
* Crie uma interface simples onde eu possa clicar em 5 nomes da lista para montar o time.
* Exiba em tempo real qual o **Bônus de Formação** ativado (Ex: "Sinergia Mista: +15% DMG / +15% HP").

5. **Informações Adicionais**

Na pasta personagens estão os dados de cada personagem em markdown separados por arquivo. Também há separação em pastas conforme o tipo do personagem (Deus, Ouro, Marina etc).

Na pasta assets estão as imagens para cada um dos cavaleiros, organizadas conforme o tipo do personagem.

**Observação:** O código deve ser limpo, modular e comentado, focado em performance (Vanilla JS).