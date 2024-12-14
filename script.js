// game questions
const questions = [
     // history and background
     { question: "Em que ano foi fundada a RaussTuna?", options: ["2009", "2010", "2012", "2013"], answer: "2009" },
     { question: "Qual era o primeiro nome da RaussTuna?", options: ["Grupo IG", "Rauss IG", "Tuna de Bragança", "Grupo Acadêmico"], answer: "Grupo IG" },
     { question: "Quando foi oficializada a alteração para Tuna Mista?", options: ["12/12/12", "29/10/09", "15/03/11", "01/01/13"], answer: "12/12/12" },
     { question: "Qual foi o local da primeira atuação?", options: ["Restaurante Borralho", "Centro Acadêmico", "Pólis", "Casa do Obi"], answer: "Restaurante Borralho" },
     { question: "Onde foi a primeira atuação fora de Bragança?", options: ["Arcos de Valdevez", "Seia", "Gouveia", "Aveiro"], answer: "Arcos de Valdevez" },
     { question: "Quem foram os três fundadores iniciais?", options: ["Obi, Sticks, Torres", "Major, Conde, Obi", "Sticks, Duque, Torres", "Obi, Zé, Pablo"], answer: "Obi, Sticks, Torres" },
     { question: "O que significa IG no símbolo do bandolim?", options: ["Informática de Gestão", "Início Geral", "Identidade Gráfica", "Instituto Geral"], answer: "Informática de Gestão" },
     { question: "Quantas salas administrativas a RaussTuna teve no Centro Acadêmico?", options: ["3", "4", "2", "5"], answer: "3" },
     { question: "Quais foram os primeiros cinco originais da RaussTuna?", options: ["Febres Altas, Serenata Menina, Hino do Caloiro, Sempre Bragança, A Aventura Começou", "Sempre Bragança, Hino do Caloiro, Febres Altas, A Tuna!, Rauss e Amigos", "Febres Altas, A Tuna!, Serenata Rauss, Caloiro de Bragança, Vencer"], answer: "Febres Altas, Serenata Menina, Hino do Caloiro, Sempre Bragança, A Aventura Começou" },
     { question: "Onde foi criada a primeira música?", options: ["Arcos de Valdevez", "Bragança", "Centro Acadêmico", "Gouveia"], answer: "Arcos de Valdevez" },
     
     // order and members
     { question: "O que significa PCV?", options: ["Presidente do Conselho de Veteranos", "Padrinho Central de Veteranos", "Presidente Coordenador Veterano", "Prática Central Veterana"], answer: "Presidente do Conselho de Veteranos" },
     { question: "Quem foi o primeiro PCV não fundador?", options: ["Fausto Martins de Melo", "Obi", "Sticks", "Pablo"], answer: "Fausto Martins de Melo" },
     { question: "Qual hierarquia era representada pelo botão azul?", options: ["Caloiro", "Criadage", "Veterano", "Tuno"], answer: "Caloiro" },
     { question: "Quantos votos têm os Tunos na Reunião das Côrtes?", options: ["6", "8", "12", "15"], answer: "6" },
     { question: "Qual hierarquia tinha um botão preto?", options: ["Veterano", "Tuno", "Caloiro", "PCV"], answer: "Veterano" },
     { question: "Quem foi o primeiro Veterano não fundador?", options: ["Fausto Martins de Melo", "Obi", "Pablo", "Caxias"], answer: "Fausto Martins de Melo" },
     { question: "Quem foi a primeira Magíster mulher?", options: ["Gina", "Caxias", "INEM", "Obi"], answer: "Gina" },
     { question: "Quem foi o primeiro Coordenador Musical não fundador?", options: ["Frodo", "Pablo", "Obi", "Gaby"], answer: "Frodo" },
     { question: "Quem é a mascote oficial da RaussTuna?", options: ["Lobo Rauss", "Gato Azul", "Águia Branca", "Raposa Tunada"], answer: "Lobo Rauss" },
     { question: "Quem foi o primeiro PCV mulher?", options: ["Caxias", "Gina", "INEM", "Obi"], answer: "Caxias" },
     
     // festivals and awards
     { question: "Qual foi o primeiro festival em que a RaussTuna participou?", options: ["Seia", "Aveiro", "Arcos de Valdevez", "Figueira da Foz"], answer: "Seia" },
     { question: "Quantos prêmios de Melhor Tuna a RaussTuna já ganhou?", options: ["12", "10", "15", "8"], answer: "12" },
     { question: "Qual o objetivo do festival Rauss&Tuna’S?", options: ["Solidariedade", "Concurso de Prêmios", "Atuar para a Academia", "Arrecadar fundos"], answer: "Solidariedade" },
     { question: "Quantos prêmios a RaussTuna ganhou nos festivais?", options: ["134", "120", "100", "150"], answer: "134" },
     { question: "Quantos prêmios de Serenata foram ganhos?", options: ["10", "8", "12", "15"], answer: "10" },
     { question: "Qual prêmio a RaussTuna ganhou mais vezes?", options: ["Porta-Estandarte", "Tuna+Tuna", "Serenata", "Solista"], answer: "Porta-Estandarte" },
     { question: "Quantos prêmios de Pandeireta foram ganhos?", options: ["5", "10", "8", "12"], answer: "5" },
     { question: "Em que festival a RaussTuna ganhou 5 prêmios pela primeira vez?", options: ["Seia", "Arcos de Valdevez", "Figueira da Foz", "Gouveia"], answer: "Seia" },
     
     // digression
     { question: "Qual o local da digressão de 2015?", options: ["Costa da Caparica", "Albufeira", "Nazaré", "Monte Gordo"], answer: "Costa da Caparica" },
     { question: "Onde foi a digressão de 2014?", options: ["Mindelo", "Madeira", "Açores", "Figueira da Foz"], answer: "Mindelo" },
     { question: "Quantos dias dura a digressão anual?", options: ["10", "7", "14", "5"], answer: "10" },
     
     // CDs e musics
     { question: "Qual é o nome do CD lançado em 2024?", options: ["Vencer", "Tunamente Mistos", "Tuna+Tuna", "A TUNA!"], answer: "Vencer" },
     { question: "Quantas músicas originais foram lançadas no primeiro CD?", options: ["12", "10", "15", "8"], answer: "12" },
     { question: "Quem lançou o single do Hino do Lagoa Azul?", options: ["RaussTuna", "Grupo de Cantares", "Pablo", "Obi"], answer: "RaussTuna" },
     { question: "Quantos videoclipes foram produzidos pela RaussTuna?", options: ["31", "29", "28", "35"], answer: "31" },
     
     // decorations
     { question: "Qual é a condecoração mais alta da RaussTuna?", options: ["Unio, Labor et Justitia", "Medalha de Mérito", "Votos de Louvor", "Ordem Honorífica"], answer: "Unio, Labor et Justitia" },
     { question: "Quem foi o primeiro nomeado Unio, Labor et Justitia?", options: ["Obi", "Sticks", "Major", "Fausto Martins"], answer: "Obi" },
     { question: "Qual título é representado por uma medalha dourada?", options: ["Honoris Causa", "Veterano Nomeado", "Mestre", "Tuno"], answer: "Honoris Causa" },
];

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 5;
let easterEggSequence = ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowDown", "ArrowLeft"];
let currentInputIndex = 0;
let gameStarted = false;

// DOM elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");
const questionCountSelect = document.getElementById("question-count");
const questionContainer = document.getElementById("question");
const scoreContainer = document.getElementById("result-container");

// update year
document.getElementById('current-year').textContent = new Date().getFullYear();

function randomSeed() {
    const seed = Date.now();
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// function to generate a vector of random numbers between 0 and number of questions - 1
function generateShuffledIndexes(size) {
    const indexes = Array.from({ length: size }, (_, i) => i); // [0, 1, 2, ..., size-1]
    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(randomSeed() * (i + 1));
        // change order
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]]; 
    }
    return indexes;
}

function selectOption(element, option) {
    const currentQuestion = gameQuestions[currentQuestionIndex];
    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
        element.classList.add("correct");
        score++;
    } else {
        element.classList.add("incorrect");
    }

    Array.from(optionsContainer.children).forEach(child => {
        child.onclick = null;
        if (child.textContent === currentQuestion.answer) {
            child.classList.add("correct");
        }
    });

    nextButton.disabled = false;
}

function loadQuestion() {
    const currentQuestion = gameQuestions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    nextButton.disabled = true;

    // shuffle indexes
    const shuffledOptionsIndexes = generateShuffledIndexes(currentQuestion.options.length);
    const shuffledOptions = [];

    // fill array
    for (let i = 0; i < shuffledOptionsIndexes.length; i++) {
        shuffledOptions[i] = currentQuestion.options[shuffledOptionsIndexes[i]];
    }

    // show shuffled
    shuffledOptions.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(optionElement, option);
        optionsContainer.appendChild(optionElement);
    });
}

function showResult() {
    questionContainer.textContent = "Fim do jogo!";
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    scoreContainer.style.display = "block";
    scoreElement.textContent = `Você acertou ${score} de ${totalQuestions} perguntas!`;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < gameQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function startGame() {
    const shuffledIndexes = generateShuffledIndexes(questions.length);
    const selectedIndexes = shuffledIndexes.slice(0, totalQuestions);
    nextButton.style.display = "";
    gameQuestions = selectedIndexes.map(index => questions[index]);

    loadQuestion();
}

startButton.addEventListener("click", () => {
    totalQuestions = parseInt(questionCountSelect.value); 
    currentQuestionIndex = 0; 
    score = 0; 
    scoreContainer.style.display = "none"; 
    gameContainer.style.display = "block"; 
    startButton.style.backgroundColor = '#f44336';
    startButton.style.color = 'white'; 
    startButton.textContent = 'Recomeçar';
    gameStarted = true;
    document.getElementById('easter-egg').style.display = "none";

    startGame();
});

nextButton.addEventListener("click", nextQuestion);

document.addEventListener("keydown", (event) => {
    // game could not be started to show easter egg
    if (!gameStarted) {
        if (event.key === easterEggSequence[currentInputIndex]) {
            currentInputIndex++;
            if (currentInputIndex === easterEggSequence.length) {
                // correct sequence detected
                document.getElementById("easter-egg").style.display = "block";
                alert("Easter Egg Desbloqueado! Veja os autores do projeto.");
                currentInputIndex = 0;
            }
        } else {
            currentInputIndex = 0; // wrong sequence
        }
    }
});

startGame();