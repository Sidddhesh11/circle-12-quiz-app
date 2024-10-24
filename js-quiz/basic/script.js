let time = 1800; // 30 minutes in seconds
let timerInterval;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const timerDisplay = document.getElementById('timer');
const quizForm = document.getElementById('quizForm');
const progressBar = document.getElementById('progress-bar');

// Basic JavaScript question array.
const questions = [
    {
        question: "What does 'var' declare in JavaScript?",
        options: ["A variable", "A function", "An object"],
        answer: "A variable"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "/*"],
        answer: "//"
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = (1, 2, 3)", "var colors = [1, 2, 3]", "var colors = {1, 2, 3}"],
        answer: "var colors = [1, 2, 3]"
    },
    {
        question: "Which method is used to convert a string to a number?",
        options: ["Number()", "parseInt()", "toString()"],
        answer: "Number()"
    },
    {
        question: "Which of the following is not a primitive data type in JavaScript?",
        options: ["String", "Number", "Object"],
        answer: "Object"
    },
    {
        question: "What will the following code return: Boolean(0)?",
        options: ["true", "false", "undefined"],
        answer: "false"
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "create myFunction()", "function:myFunction()"],
        answer: "function myFunction()"
    },
    {
        question: "What is the output of 'typeof NaN'?",
        options: ["number", "undefined", "NaN"],
        answer: "number"
    },
    {
        question: "What is used to declare a constant in JavaScript?",
        options: ["const", "let", "var"],
        answer: "const"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onclick", "onchange", "onmouseover"],
        answer: "onclick"
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
