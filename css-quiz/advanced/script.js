let time = 1800; // 30 minutes in seconds
let timerInterval;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const timerDisplay = document.getElementById('timer');
const quizForm = document.getElementById('quizForm');
const progressBar = document.getElementById('progress-bar');

// Advanced CSS question array.
const questions = [
    {
        question: "What does the 'flex' property do in CSS?",
        options: ["Defines flex container properties", "Defines flex item properties", "Controls the spacing between items"],
        answer: "Defines flex item properties"
    },
    {
        question: "Which property is used to create a CSS Grid layout?",
        options: ["display: grid;", "layout: grid;", "grid-layout: true;"],
        answer: "display: grid;"
    },
    {
        question: "What is the purpose of the 'z-index' property?",
        options: ["Sets the stacking order of elements", "Controls the visibility of elements", "Defines the size of elements"],
        answer: "Sets the stacking order of elements"
    },
    {
        question: "How do you apply a CSS transition to an element?",
        options: ["transition: all 0.5s;", "animate: all 0.5s;", "change: all 0.5s;"],
        answer: "transition: all 0.5s;"
    },
    {
        question: "Which pseudo-class is used to style an element when a user mouses over it?",
        options: [":hover", ":focus", ":active"],
        answer: ":hover"
    },
    {
        question: "What is the difference between 'margin' and 'padding'?",
        options: ["Margin is outside, padding is inside the element", "Both are the same", "Margin is for text, padding is for layout"],
        answer: "Margin is outside, padding is inside the element"
    },
    {
        question: "Which property is used to create a space between the text and the border of an element?",
        options: ["padding", "margin", "border-spacing"],
        answer: "padding"
    },
    {
        question: "What does the 'display: none;' property do?",
        options: ["Hides the element and takes up no space", "Hides the element but takes up space", "Shows the element"],
        answer: "Hides the element and takes up no space"
    },
    {
        question: "What is the purpose of 'media queries' in CSS?",
        options: ["To apply styles based on device characteristics", "To change the document structure", "To add comments"],
        answer: "To apply styles based on device characteristics"
    },
    {
        question: "How do you create a CSS variable?",
        options: ["--my-variable: value;", "$my-variable: value;", "@my-variable: value;"],
        answer: "--my-variable: value;"
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
