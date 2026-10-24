/* ==========================================================
   ASSIGNMENT 3 — INTERACTIVE JAVASCRIPT QUIZ APP
========================================================== */

/* ----------------------------------------------------------
   1. DATA: Questions Array (8 objects)
---------------------------------------------------------- */
const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Multi Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<scripting>"],
    answer: "<script>"
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "create myFunction()"],
    answer: "function myFunction()"
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
    answer: "alert('Hello World');"
  },
  {
    question: "What is the correct way to write an array in JavaScript?",
    options: ["var colors = 'red', 'green', 'blue';", "var colors = ['red', 'green', 'blue'];", "var colors = (1:'red', 2:'green');", "var colors = {red, green, blue};"],
    answer: "var colors = ['red', 'green', 'blue'];"
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["x", "-", "=", "*"],
    answer: "="
  },
  {
    question: "What is the correct syntax for referring to an external script called 'app.js'?",
    options: ["<script href='app.js'>", "<script name='app.js'>", "<script src='app.js'>", "<script file='app.js'>"],
    answer: "<script src='app.js'>"
  }
];


/* ----------------------------------------------------------
   2. STATE VARIABLES
---------------------------------------------------------- */
let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false; // Prevents clicking multiple options

/* ----------------------------------------------------------
   3. DOM ELEMENTS (select them once)
---------------------------------------------------------- */
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');

const quizArea = document.getElementById('quiz-area');
const resultScreen = document.getElementById('result-screen');
const finalScoreText = document.getElementById('final-score-text');
const feedbackText = document.getElementById('feedback-text');
const restartBtn = document.getElementById('restart-btn');


/* ----------------------------------------------------------
   4. RENDER QUESTION FUNCTION
---------------------------------------------------------- */
function renderQuestion() {
  // Reset the "answered" flag for the new question
  hasAnswered = false;
  
  // Get the current question object
  const currentQuestion = questions[currentQuestionIndex];

  // Update header info
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;

  // Set question text
  questionText.textContent = currentQuestion.question;

  // Clear previous options
  optionsContainer.innerHTML = '';

  // Create 4 option buttons dynamically
  currentQuestion.options.forEach(optionString => {
    const button = document.createElement('button');
    button.textContent = optionString;
    button.classList.add('option-btn');
    
    // Attach click event listener to check answer
    button.addEventListener('click', () => handleOptionClick(button, optionString, currentQuestion.answer));
    
    // Append to container
    optionsContainer.appendChild(button);
  });

  // Reset Next button state
  nextBtn.disabled = true;
  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next Question';
}


/* ----------------------------------------------------------
   5. HANDLE OPTION CLICK FUNCTION
---------------------------------------------------------- */
function handleOptionClick(selectedBtn, selectedAnswer, correctAnswer) {
  // If already answered, ignore further clicks
  if (hasAnswered) return;
  hasAnswered = true;

  // Get all option buttons to disable them
  const allOptions = document.querySelectorAll('.option-btn');

  if (selectedAnswer === correctAnswer) {
    // Correct answer chosen
    selectedBtn.classList.add('correct');
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  } else {
    // Wrong answer chosen
    selectedBtn.classList.add('wrong');
    
    // Highlight the correct answer in green
    allOptions.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add('correct');
      }
    });
  }

  // Disable all options so user can't click again
  allOptions.forEach(btn => btn.disabled = true);

  // Enable the "Next Question" button
  nextBtn.disabled = false;
}


/* ----------------------------------------------------------
   6. NEXT QUESTION FUNCTION
---------------------------------------------------------- */
function handleNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    // Still have questions left
    renderQuestion();
  } else {
    // No more questions — show final screen
    showResults();
  }
}


/* ----------------------------------------------------------
   7. SHOW RESULTS FUNCTION
---------------------------------------------------------- */
function showResults() {
  quizArea.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  finalScoreText.textContent = `You scored ${score} out of ${questions.length}`;

  // Feedback message based on score
  let feedback = '';
  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    feedback = "Perfect score! You're a JavaScript master! 🌟";
  } else if (percentage >= 75) {
    feedback = "Great job! You have a strong grasp of the basics. 🎉";
  } else if (percentage >= 50) {
    feedback = "Good effort! A little more practice and you'll nail it. 👍";
  } else {
    feedback = "Keep practicing! Review the basics and try again. 📚";
  }

  feedbackText.textContent = feedback;
}


/* ----------------------------------------------------------
   8. RESTART QUIZ FUNCTION
---------------------------------------------------------- */
function restartQuiz() {
  // Reset state
  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;

  // Hide results, show quiz
  resultScreen.classList.add('hidden');
  quizArea.classList.remove('hidden');

  // Re-render first question
  renderQuestion();
}


/* ----------------------------------------------------------
   9. EVENT LISTENERS & INITIALIZATION
---------------------------------------------------------- */
nextBtn.addEventListener('click', handleNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Start the quiz immediately on page load
renderQuestion();