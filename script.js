let questions = [];

const categories = {
    "1": "História e Origens",
    "2": "Hierarquia e Membros",
    "3": "Festivais e Prémios",
    "4": "Digressões",
    "5": "CDs e Músicas",
    "6": "Condecorações",
    "7": "Cargos, Funções e Normas"
}

function loadQuestionsFromFile() {
    fetch('README.md')
        .then(response => response.text())
        .then(fileContent => {
            const questionsBlock = fileContent.match(/### INÍCIO PERGUNTAS\n([\s\S]*?)### FIM PERGUNTAS/);
            if (questionsBlock && questionsBlock[1]) {
                const blockContent = questionsBlock[1].trim();

                // remover header and empty rows
                const lines = blockContent.split('\n').filter(line => line.trim() !== '').slice(1);

                lines.forEach(line => {
                    const [category, question, options, answer] = line.split('|').map(item => item.trim());
                    const optionsArray = options.split(';').map(option => option.trim());
                    questions.push({
                        category,
                        question,
                        options: optionsArray,
                        answer
                    });
                });
            }
        })
        .catch(error => console.error("Erro ao carregar perguntas:", error));
}

loadQuestionsFromFile();

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 5;
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
const categorySelector = document.getElementById("question-category");

// update year
document.getElementById('current-year').textContent = new Date().getFullYear();

// function to generate a vector of random numbers between 0 and number of questions - 1
function generateShuffledIndexes(size) {
    const indexes = Array.from({ length: size }, (_, i) => i); // [0, 1, 2, ..., size-1]

    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
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
    const totalAnsweredQuestions = gameQuestions.length;
    questionContainer.textContent = "Fim do jogo!";
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    scoreContainer.style.display = "block";
    scoreElement.textContent = `Você acertou ${score} de ${totalAnsweredQuestions} perguntas!`;
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
    const selectedCategory = categorySelector.value;
    let filteredQuestions;

    if (selectedCategory === "0") {
        // all categories, shuffle per question game size
        const shuffledIndexes = generateShuffledIndexes(questions.length);
        const totalQuestions = parseInt(questionCountSelect.value, 10);
        const selectedIndexes = shuffledIndexes.slice(0, totalQuestions);
        filteredQuestions = selectedIndexes.map(index => questions[index]);
    } else {
        // questions must be filtered by choosen category
        const categoryName = categories[selectedCategory];
        filteredQuestions = questions.filter(q => q.category === categoryName);

        // shuffle all questions for that category
        const shuffledIndexes = generateShuffledIndexes(filteredQuestions.length);
        filteredQuestions = shuffledIndexes.map(index => filteredQuestions[index]);
    }

    // config game questions
    nextButton.style.display = "";
    gameQuestions = filteredQuestions;
    currentQuestionIndex = 0;
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
    document.getElementById('easter-egg-input').style.display = "none";

    startGame();
});

nextButton.addEventListener("click", nextQuestion);

categorySelector.addEventListener("change", () => {
    const selectedCategory = categorySelector.value;

    if (selectedCategory === "0") {
        // activate number of questions selector
        questionCountSelect.disabled = false;
    } else {
        // disable number of questions selector
        questionCountSelect.disabled = true;
    }
});

function activateEasterEgg() {
    document.getElementById("easter-egg").style.display = "block";
    alert("Easter Egg Desbloqueado! Veja os autores do projeto.");
}

// Função para verificar o código do easter egg
function checkEasterEggCode() {
    const codeInput = document.getElementById("easter-egg-code");
    if (codeInput.value === "0000FF") {
        activateEasterEgg();
        codeInput.value = ""; // Limpa o campo de entrada
    } else {
        alert("Código incorreto! Tente novamente.");
        codeInput.value = ""; // Limpa o campo de entrada
    }
}

// Adiciona o evento de duplo toque para mostrar o campo de código
let touchTimeout;
document.addEventListener("touchstart", () => {
    if (!gameStarted) {
        if (touchTimeout) {
            // Duplo toque detectado
            clearTimeout(touchTimeout);
            touchTimeout = null;

            // Exibe o input para o código do easter egg
            const codeContainer = document.getElementById("easter-egg-input");
            codeContainer.style.display = "block";
        } else {
            // Primeiro toque
            touchTimeout = setTimeout(() => {
                touchTimeout = null; // Reseta após o timeout
            }, 300);
        }
    }
});