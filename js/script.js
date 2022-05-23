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

console.log(answerEL);
console.log(timeEL);


// Create variables as needed
let answer = "";
let currentQuestion = 0;
let timeLeft = 60;

// Variables for Stats
let correct = 0;
let incorrect = 0;



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
    startEL.setAttribute('style', 'display: none');
    questionEL.textContent = "";
    discriptionEL.textContent = "";
    choicesEL.setAttribute('style', 'display: block');
    loadQuizContent();
}

let loadSaveScoreScreen = () => {

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
        console.log("WRONG: " + incorrect);

    }
    
    // if there are no more questions end the quiz early
    if(currentQuestion == quizContent.length){
        console.log("NO MORE QUESTIONS");
        //loadScoreScreen();
    }
    else {
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
        timeEL.textContent = `TIME: ${timeLeft}s`;

        if(timeLeft === 0){
            timeEL.textContent = "TIME: 60s";
            clearInterval(timeInterval);
        }
    },1000)
}


loadHomeScreen();
