// TO DO: HIDE THE FORM INPUT AND FINISH ITS HTML





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

    {
        question: "what method lets you attach an event listener to a element?",
        answer: "addEventListener",
        choices: ["attachEvent", "insertEventListener", "eventListener", "addEventListener"]
    },

];

let scoreObject = {
    scoresArray: [
        {
            name: '',
            score: 0
        }
    ]
    
};





// Create variables to access HTML Elements

let timeEL = document.querySelector(".time");
let questionEL = document.querySelector(".question");
let discriptionEL = document.querySelector(".discription");
let choicesEL = document.querySelector(".choices");
let answerEL = document.querySelectorAll(".answer-button");
let startEL = document.querySelector(".start-button");


// Form Elements
let scoreFormEL = document.querySelector(".score-form");
let inputScoreEL = document.querySelector(".input-initials");
let submitBtnEL = document.querySelector(".submit-score-btn");

let highScoresEL = document.querySelector(".high-scores");




// Create variables as needed
let answer = "";
let currentQuestion = 0;
let questionsLeft = quizContent.length;
let timeLeft = 60;
let timeInterval;

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
    scoreFormEL.setAttribute('style', 'display: block');


    questionEL.textContent = `${reasonForQuizEnd}\nAll Done!!`;


    discriptionEL.textContent = `Your final score is ${scoreObject.scoresArray[0].score}`;

}

let loadScoreScreen = () => {
    scoreFormEL.setAttribute('style', 'display: none');
    highScoresEL.setAttribute('style', 'display: block');



}

let loadHomeScreen = () => {
    questionEL.textContent = "CODING QUIZ CHALLENGE";
    discriptionEL.textContent = "welcome to the coding quiz challenge.\nIn this challenge you will be given 60 seconds to answer as many code questions as possible, but if you get one wrong you lose 10 seconds\nGOOD LUCK!";
    choicesEL.setAttribute("style", "display: none");
    scoreFormEL.setAttribute("style", "display: none");
    highScoresEL.setAttribute("style", "display: none");
}


// Event Listener Functions COME BACK AFTER LOAD FUNCTION
let choiceFunction = (event) => {
    if(event.target.textContent == quizContent[currentQuestion-1].answer){
        scoreObject.scoresArray[0].score++;
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
        clearInterval(timeInterval);
        loadSaveScoreScreen("No More Questions");
    }
    else { 
        questionsLeft--;
        loadQuizContent();
    }
}

// create an array of objects that contain score data
// pull from local storage, add new score, push to local storage
let submitScore = (event) => {
    event.preventDefault();
    console.log(document.querySelector(".input-initials").value);

    scoreObject.scoresArray[0].name = document.querySelector(".input-initials").value;


    console.log(scoreObject);

    let savedScores = JSON.parse(localStorage.getItem("scores")).scoresArray;
    if(savedScores){
        for(let i = 0; i < savedScores.length; i++){
            scoreObject.scoresArray.push(savedScores[i]);
        }
    }

    localStorage.setItem("scores", JSON.stringify(scoreObject));

    // pull from local storage



    loadScoreScreen();

}


// Event Listeners
answerEL.forEach(element => {
    element.addEventListener('click', choiceFunction);
});

startEL.addEventListener('click', loadQuizScreen);
scoreFormEL.addEventListener('submit', submitScore)




// Create a timer function
let timerFunction = () => {

    timeInterval = setInterval(function(){
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
