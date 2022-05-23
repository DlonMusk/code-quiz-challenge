// will put the objects into an array to randomly select
let quizContent = [ 
    
    {
        question: "what one?",
        answer: "this one",
        choices: ["this one", "this two", "this three", "this four"]
    },

    {
        question: "What variable type is associated with true and false?",
        answer: "boolean",
        choices: ["boolean", "number", "Object", "int"]
    },

    {
        question: "what method lets you retrieve a single element from the document object",
        answer: "querySelector",
        choices: ["getSelector", "querySelectorAll", "getElement", "querySelector"]
    },

    {
        question: "what method lets you attach an event listener to a element?",
        answer: "addEventListener",
        choices: ["attachEvent", "insertEventListener", "eventListener", "addEventListener"]
    },

];



// Create variables to access HTML Elements

let timeEL = document.querySelector(".time");
let questionEL = document.querySelector(".question");
let discriptionEL = document.querySelector(".discription");
let choicesEL = document.querySelector(".choices");
let answerEL = document.querySelectorAll(".answer-button");
let startEL = document.querySelector(".start-button");




// Create variables as needed
let answer = "";
let currentQuestion = 0;
let questionsLeft = quizContent.length;
let timeLeft = 60;

// Variables for Stats
let correct = 0;
let incorrect = 0;

// pre loading html elements

timeEL.textContent = `TIME: ${timeLeft}s\nQUESTIONS LEFT: ${questionsLeft}`;



// PAGE LOADING FUNCTIONS

let loadQuizContent = () => {
    let currentContent = quizContent[currentQuestion];
    questionEL.textContent = currentContent.question;
    answer = currentContent.answer;
    for(let i = 0; i < answerEL.length && currentContent.choices.length; i++){
        answerEL[i].textContent = currentContent.choices[i];
    }
    currentQuestion++;


}

let loadQuizScreen = () => {
    timerFunction();
    startEL.setAttribute('style', 'display: none');
    questionEL.textContent = "";
    discriptionEL.textContent = "";
    choicesEL.setAttribute('style', 'display: block');
    loadQuizContent();
}

let loadSaveScoreScreen = (reasonForQuizEnd) => {
    // hide and reveal needed elements
    timeEL.setAttribute('style', 'display: none');
    discriptionEL.setAttribute('style', 'display: block');
    choicesEL.setAttribute('style', 'display: none');


    questionEL.textContent = `${reasonForQuizEnd}\nAll Done!!`;


    discriptionEL.textContent = `Your final score is ${correct}`;

}

let loadScoreScreen = () => {

}

let loadHomeScreen = () => {
    questionEL.textContent = "CODING QUIZ CHALLENGE";
    discriptionEL.textContent = "welcome to the coding quiz challenge.\nIn this challenge you will be given 60 seconds to answer as many code questions as possible, but if you get one wrong you lose 10 seconds\nGOOD LUCK!";
    choicesEL.setAttribute("style", "display: none");
}

// Event Listener Functions COME BACK AFTER LOAD FUNCTION
let choiceFunction = (event) => {
    if(event.target.textContent == quizContent[currentQuestion-1].answer){
        correct++;
        console.log("CORRECT: " + correct);
    }
    else{
        incorrect++;
        timeLeft = timeLeft - 10;
        console.log("WRONG: " + incorrect);

    }
    
    // if there are no more questions end the quiz early
    if(currentQuestion == quizContent.length){
        questionsLeft--;
        loadSaveScoreScreen("No More Questions");
    }
    else { 
        questionsLeft--;
        loadQuizContent();
    }
}

// Event Listeners
answerEL.forEach(element => {
    element.addEventListener('click', choiceFunction);
});

startEL.addEventListener('click', loadQuizScreen);






// Create a timer function
let timerFunction = () => {

    let timeInterval = setInterval(function(){
        timeLeft--;
        timeEL.textContent = `TIME: ${timeLeft}s\nQUESTIONS LEFT: ${questionsLeft}`;

        if(timeLeft < 1){
            timeLeft = 60;
            questionsLeft = quizContent.length;
            timeEL.textContent = `TIME: ${timeLeft}\nQUESTIONS LEFT: ${questionsLeft}`;
            clearInterval(timeInterval);
            loadSaveScoreScreen("Out Of Time");
        }
    },1000);
}

let startQuiz = () => {
    loadHomeScreen();

}


startQuiz();
