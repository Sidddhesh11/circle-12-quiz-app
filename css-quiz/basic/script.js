let time = 1800; // 30 minutes in seconds
let timerInterval;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const timerDisplay = document.getElementById('timer');
const quizForm = document.getElementById('quizForm');
const progressBar = document.getElementById('progress-bar');

// Basic CSS question array.
const questions = [
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which HTML tag is used to link a CSS stylesheet?",
        options: ["<css>", "<link>", "<style>"],
        answer: "<link>"
    },
    {
        question: "How do you select an element with the id 'header' in CSS?",
        options: ["#header", ".header", "header"],
        answer: "#header"
    },
    {
        question: "Which property is used to change the font of an element?",
        options: ["font-family", "text-font", "font-style"],
        answer: "font-family"
    },
    {
        question: "What is the correct way to add a comment in CSS?",
        options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"],
        answer: "/* This is a comment */"
    },
    {
        question: "Which property is used to change the background color?",
        options: ["background-color", "bgcolor", "color"],
        answer: "background-color"
    },
    {
        question: "What is the default value of the position property?",
        options: ["static", "relative", "absolute"],
        answer: "static"
    },
    {
        question: "How do you center an element horizontally?",
        options: ["margin: auto;", "text-align: center;", "align: center;"],
        answer: "margin: auto;"
    },
    {
        question: "Which CSS property is used to control the text size?",
        options: ["font-size", "text-size", "size"],
        answer: "font-size"
    },
    {
        question: "How do you make a list that lists its items with squares?",
        options: ["list-style-type: square;", "list-type: square;", "list-style: square;"],
        answer: "list-style-type: square;"
    }
];

function startQuiz() {
    quizForm.style.display = 'block'; // Show the quiz form
    startBtn.disabled = true; // Disable the Start button
    pauseBtn.disabled = false; // Enable the Pause button
    startTimer(); // Start the timer
}

function pauseQuiz() {
    let restartQuiz = "Restart Quiz";
    const pauseBtnText = pauseBtn.innerText;
    clearInterval(timerInterval);

    if (pauseBtnText === restartQuiz) {
        quizForm.style.display = 'none'; // Hide the quiz form
        pauseBtn.innerText = "Pause Quiz"; // Change button text back to "Pause"
        resetQuiz(); // Reset the quiz if needed
    }

    pauseBtn.disabled = true; // Disable the Pause button
    startBtn.disabled = false; // Enable the Start button
}

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        timerDisplay.textContent = `Time left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (time <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
            checkAnswers(); // Check answers when time is up
        } else if (time === 300) {
            alert('Only 5 minutes left!');
        }
    }, 1000);
}

function checkAnswers() {
    let correctCount = 0;
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');
        const correctAnswer = question.getAttribute('data-answer');
        const feedback = question.querySelector('.feedback');

        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
            correctCount++;
            feedback.textContent = 'Correct';
            feedback.className = 'feedback correct';
        } else {
            feedback.textContent = 'Wrong';
            feedback.className = 'feedback wrong';
        }
    });

    alert(`You scored ${correctCount} out of ${questions.length}`);
    updateProgress(correctCount, questions.length);
}

function updateProgress(correctCount, totalQuestions) {
    const progressPercentage = (correctCount / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${progressPercentage.toFixed(2)}%`;
}

quizForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    clearInterval(timerInterval); // Stop the timer

    pauseBtn.innerText = "Restart Quiz"; // Change button text to Restart

    const submitBtn = document.querySelector("button[type=submit]");
    submitBtn.disabled = true; // Disable the submit button

    checkAnswers(); // Check answers
});

// Load questions dynamically
document.addEventListener("DOMContentLoaded", () => {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.setAttribute('data-answer', q.answer);

        const questionText = document.createElement('p');
        questionText.textContent = `Q${index + 1}: ${q.question}`;
        
        questionDiv.appendChild(questionText);

        q.options.forEach(option => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${index}`; // Ensure each question has a unique name
            radio.value = option;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
        });

        const feedback = document.createElement('span');
        feedback.className = 'feedback';
        questionDiv.appendChild(feedback);

        quizForm.appendChild(questionDiv); // Add question to the form
    });

    // Create and append the submit button at the end
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.innerText = "Submit";
    quizForm.appendChild(submitBtn); // Append the submit button at the end of the quiz form
});

startBtn.addEventListener('click', startQuiz); // Attach event listener to Start button
pauseBtn.addEventListener('click', pauseQuiz); // Attach event listener to Pause button
