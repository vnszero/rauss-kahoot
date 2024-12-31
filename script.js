let questions = [];

const categories = {
    "1": "História e Origens",
    "2": "Hierarquia e Membros",
    "3": "Festivais e Prémios",
    "4": "Digressões",
    "5": "CDs e Músicas",
    "6": "Condecorações"
}

function loadQuestionsFromFile() {
    fetch('README.md')
        .then(response => response.text())
        .then(fileContent => {
            const questionsBlock = fileContent.match(/### ÍNICIO PERGUNTAS\n([\s\S]*?)### FIM PERGUNTAS/);
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
        // Todas as categorias, selecione perguntas aleatórias
        const shuffledIndexes = generateShuffledIndexes(questions.length);
        const totalQuestions = parseInt(questionCountSelect.value, 10);
        const selectedIndexes = shuffledIndexes.slice(0, totalQuestions);
        filteredQuestions = selectedIndexes.map(index => questions[index]);
    } else {
        // Filtrar perguntas pela categoria selecionada
        const categoryName = categories[selectedCategory];
        filteredQuestions = questions.filter(q => q.category === categoryName);

        // Usar todas as perguntas da categoria embaralhadas
        const shuffledIndexes = generateShuffledIndexes(filteredQuestions.length);
        filteredQuestions = shuffledIndexes.map(index => filteredQuestions[index]);
    }

    // Configurar as perguntas do jogo
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

    startGame();
});

nextButton.addEventListener("click", nextQuestion);

categorySelector.addEventListener("change", () => {
    const selectedCategory = categorySelector.value;

    if (selectedCategory === "0") {
        // Habilitar o seletor de número de questões
        questionCountSelect.disabled = false;
    } else {
        // Desabilitar o seletor de número de questões
        questionCountSelect.disabled = true;
    }
});

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