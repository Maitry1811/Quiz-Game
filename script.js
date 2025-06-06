const questions =[
    {
        question: "which is largest animal in the world?",
        answers: [
            {Text: "shark", correct: false},
            {Text: "blue whale", correct: true},
            {Text: "Elephant", correct: false},
            {Text: "Giraffe", correct: false},
        ]
    },
    {
         question: "which is smallest country in the world?",
         answers: [
            {Text: "Vatican City", correct: true},
            {Text: "Bhutan", correct: false},
            {Text: "Nepal", correct: false},
            {Text: "Shri Lanka", correct: false},
        ]
    },
    {
         question: "which is largest desert in the world?",
         answers: [
            {Text: "Kalahari", correct: false},
            {Text: "Gobi", correct: false},
            {Text: "Sahara", correct: false},
            {Text: "Antarctica", correct: true},
        ]
    },
     {
        question: "which is smallest continent in the world?",
        answers: [
            {Text: "Asia", correct: false},
            {Text: "Australia", correct: true},
            {Text: "Arctic", correct: false},
            {Text: "Africa", correct: false},
        ]
    },
    {
        question:"Who was the first Prime Minister of India?",
        answers: [
            {Text: "Mahatma Gandhi", correct: false},
            {Text: "Jawaharlal Nehru", correct: true},
            {Text: "Sardar Vallabbhai Patel", correct: false},
            {Text: "Dr. B. R. Ambedkar", correct: false},
        ]
    },
    {
        question:"Which planet is known as the Red Planet?",
        answers: [
            {Text: "Earth", correct: false},
            {Text: "Jupiter", correct: false},
            {Text: "Mars", correct: true},
            {Text: "Venus", correct: false},
        ]
    },
    {
        question:"What is the chemical symbol for water?",
        answers: [
            {Text: "H2O", correct: true},
            {Text: "O2", correct: false},
            {Text: "CO2", correct: false},
            {Text: "HO", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;

currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
});
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showscore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){ 
        showQuestion();
    }else{
        showscore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();