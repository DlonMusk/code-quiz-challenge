// TO DO: HIDE THE FORM INPUT AND FINISH ITS HTML





// will put the objects into an array to randomly select
let quizContent = [ 
    
    {
        question: "what property allows the user to access the browsers storage?",
        answer: "localStorage",
        choices: ["getData", "localStorage", "accessData", "toStorage"]
    },

    {
        question: "What variable type is associated with true and false?",
        answer: "boolean",
        choices: ["boolean", "number", "Object", "int"]
    },

    {
        question: "what method lets you retrieve a single element from the document object?",
        answer: "querySelector",
        choices: ["getSelector", "querySelectorAll", "getElement", "querySelector"]
    },

    {
        question: "what method lets you attach an event listener to a element?",
        answer: "addEventListener",
        choices: ["attachEvent", "insertEventListener", "eventListener", "addEventListener"]
    },

    {
        question: "what bootstrap class will take up the full screen",
        answer: "col-12",
        choices: ["row-12", "col-0", "col-xxl", "col-12"]
    },

    {
        question: "What bootstrap class is for mobile?",
        answer: "col-xs-10",
        choices: ["col-xs-10", "col-md-12", "col-xxl-0", "col-12-xs"]
    },

    {
        question: "what method adds a non-specific eventListener in JQuery?",
        answer: "on()",
        choices: ["click()", "addEventListener()", "attachEvent()", "on()"]
    },

    {
        question: "what syntax is used to create an element in JQuery?",
        answer: "$()",
        choices: ["new element =", "newEl()", "$()", "createElement()"]
    },

    {
        question: "What syntax is used to get an element from DOM in JQuery",
        answer: "$()",
        choices: ["getEL()", "$()", "get()", "pull()"]
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

// Nav Bar Elements
let highScoresBtn = document.querySelector(".high-scores-btn");

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




// Score Card Elements
let highScoresEL = document.querySelector(".high-scores");
let goBackBtnEL = document.querySelector(".go-back-btn");
let clearScoresEL = document.querySelector(".clear-scores");



// Create variables as needed
let answer = "";
let currentQuestion = 0;
let questionsLeft = quizContent.length;
let timeLeft = 60;
let timeInterval;
let savedScores;

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
    highScoresBtn.setAttribute('style', 'display: none');
    questionEL.textContent = "";
    discriptionEL.textContent = "";
    choicesEL.setAttribute('style', 'display: block');
    loadQuizContent();
}

let loadSaveScoreScreen = (reasonForQuizEnd) => {
    // hide and reveal needed elements
    discriptionEL.setAttribute('style', 'display: block');
    choicesEL.setAttribute('style', 'display: none');
    scoreFormEL.setAttribute('style', 'display: flex');




    questionEL.textContent = `${reasonForQuizEnd}\nAll Done!!`;


    discriptionEL.textContent = `Your final score is ${scoreObject.scoresArray[0].score}`;

}

let loadScoreScreen = () => {


    // hide score form elements
    scoreFormEL.setAttribute('style', 'display: none');
    discriptionEL.setAttribute('style', 'display: none');
    startEL.setAttribute('style', 'display: none');

    // show page elements
    highScoresEL.setAttribute("style", "display: block");
    goBackBtnEL.setAttribute("style", "display: block");
    clearScoresEL.setAttribute("style", "display: block");
    
    questionEL.textContent = "HIGH SCORES";

    highScoresEL.setAttribute('style', 'display: block');
    // clear then load the UL with array data
    
    let scoreList = document.querySelectorAll(".high-scores > li");


    scoreList.forEach(element => {
        element.remove();
    });


    savedScores = JSON.parse(localStorage.getItem("scores"));

    if(savedScores){
        for(let i = 0; i < savedScores.scoresArray.length; i++){
            scoreObject.scoresArray.push(savedScores.scoresArray[i]);
        }
        savedScores.scoresArray.forEach(element => {
            let newLI = document.createElement('li');
            newLI.textContent = `${element.name} ${element.score}`
            highScoresEL.append(newLI);
        });
    }else {
        let newLI = document.createElement('li');
        newLI.textContent = `${scoreObject.scoresArray[0].name} ${scoreObject.scoresArray[0].score}`
        highScoresEL.append(newLI);
    }


    console.log("SCORE OBJECT FROM SCORESCREEN");
    console.log(scoreObject);
    




}

let loadHomeScreen = () => {

    // reset counting data
    timeLeft = 60;
    questionsLeft = quizContent.length;
    currentQuestion = 0;
    timeEL.textContent = `TIME: ${timeLeft}\nQUESTIONS LEFT: ${questionsLeft}`;
    scoreObject.scoresArray = [{name: "", score: 0}];

    // turn on home screen elements
    questionEL.setAttribute('style', 'display: block');
    discriptionEL.setAttribute('style', 'display: block');
    startEL.setAttribute('style', 'display: block');
    highScoresBtn.setAttribute('style', 'display: block');

    // reset count and time
    questionEL.textContent = "CODING QUIZ CHALLENGE";
    discriptionEL.textContent = "welcome to the coding quiz challenge.\nIn this challenge you will be given 60 seconds to answer as many code questions as possible, but if you get one wrong you lose 10 seconds\nGOOD LUCK!";

    choicesEL.setAttribute("style", "display: none");
    scoreFormEL.setAttribute("style", "display: none");
   

    // hide all other elements
    highScoresEL.setAttribute("style", "display: none");
    goBackBtnEL.setAttribute("style", "display: none");
    clearScoresEL.setAttribute("style", "display: none");

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

    console.log("SCOREOBJECT: ");
    console.log(scoreObject);

    scoreObject.scoresArray[0].name = document.querySelector(".input-initials").value;



    savedScores = JSON.parse(localStorage.getItem("scores"));
    console.log("SAVEDSCORES");
    console.log(savedScores);

    if(savedScores){
        for(let i = 0; i < savedScores.scoresArray.length; i++){
            scoreObject.scoresArray.push(savedScores.scoresArray[i]);
        }
    }

    localStorage.setItem("scores", JSON.stringify(scoreObject));

    console.log("SCOREOBJECT: ");
    console.log(scoreObject);
    // pull from local storage



    loadScoreScreen();

}


// CLEAR SCORE BUTTON
let clearScoreFunction = () => {
    localStorage.removeItem("scores");
    highScoresEL.setAttribute('style', 'display: none');
}




// Event Listeners
answerEL.forEach(element => {
    element.addEventListener('click', choiceFunction);
});

startEL.addEventListener('click', loadQuizScreen);
scoreFormEL.addEventListener('submit', submitScore);
clearScoresEL.addEventListener('click', clearScoreFunction);
goBackBtnEL.addEventListener('click', loadHomeScreen);
highScoresBtn.addEventListener('click', loadScoreScreen);





// Create a timer function
let timerFunction = () => {

    timeInterval = setInterval(function(){
        timeLeft--;
        timeEL.textContent = `TIME: ${timeLeft}s\nQUESTIONS LEFT: ${questionsLeft}`;

        if(timeLeft < 1){

            clearInterval(timeInterval);
            loadSaveScoreScreen("Out Of Time");
        }
    },1000);
}

let startQuiz = () => {
    loadHomeScreen();

}


startQuiz();
