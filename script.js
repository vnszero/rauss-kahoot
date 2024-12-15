let questions = [];

function loadQuestionsFromFile() {
    fetch('README.md') // Faz uma requisição para o arquivo README.md
        .then(response => response.text()) // Converte o conteúdo para texto
        .then(fileContent => {
            // Extrai o bloco entre ÍNICIO PERGUNTAS e FIM PERGUNTAS
            const questionsBlock = fileContent.match(/### ÍNICIO PERGUNTAS\n([\s\S]*?)### FIM PERGUNTAS/);
            if (questionsBlock && questionsBlock[1]) {
                const blockContent = questionsBlock[1];

                // Regex para extrair perguntas, opções e respostas
                const questionRegex = /- \*\*Pergunta:\*\* (.*?)\n\s*\*\*Opções:\*\* (.*?)\n\s*\*\*Resposta:\*\* (.*?)(?=\n- \*\*Pergunta:\*\*|$)/gs;
                let match;

                while ((match = questionRegex.exec(blockContent)) !== null) {
                    const question = match[1].trim();
                    const options = match[2].split(';').map(option => option.trim());
                    const answer = match[3].trim();
                    questions.push({ question, options, answer });
                }
            }
        })
        .catch(error => console.error("Erro ao carregar perguntas:", error));
}

// Chama a função para carregar perguntas
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