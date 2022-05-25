
// Quiz content data
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

// Object to store scores in
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
let timeEL = document.querySelector(".time");
let highScoresBtn = document.querySelector(".high-scores-btn");


// Quiz Card Elements

// General Elements
let questionEL = document.querySelector(".question");
let discriptionEL = document.querySelector(".discription");

// Home Page Elements
let startEL = document.querySelector(".start-button");

// Quiz Elements
let choicesEL = document.querySelector(".choices");
let answerEL = document.querySelectorAll(".answer-button");

// Form Elements
let scoreFormEL = document.querySelector(".score-form");
let inputInitialsEL = document.querySelector(".input-initials");
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



// pre loading html elements
timeEL.textContent = `TIME: ${timeLeft}s  QUESTIONS LEFT: ${questionsLeft}`;



// PAGE LOADING FUNCTIONS

// grabs question data from the quiz content object and loads the content into the appropriate elements then increments the question counter by one
let loadQuizContent = () => {
    let currentContent = quizContent[currentQuestion];
    questionEL.textContent = currentContent.question;
    answer = currentContent.answer;
    for(let i = 0; i < answerEL.length && currentContent.choices.length; i++){
        answerEL[i].textContent = currentContent.choices[i];
    }
    currentQuestion++;

}

// Starts the quiz, set off the timer, hides un-needed elements, reveals needed elements, clears text contents
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

    // set the question text to a all done message and the reason for the quiz ending
    questionEL.textContent = `${reasonForQuizEnd}\nAll Done!!`;


    discriptionEL.textContent = `Your final score is ${scoreObject.scoresArray[0].score}`;

}


// Loads the high scores screen
let loadScoreScreen = () => {

    // hide score form elements
    scoreFormEL.setAttribute('style', 'display: none');
    discriptionEL.setAttribute('style', 'display: none');
    startEL.setAttribute('style', 'display: none');

    // show page elements and set question text to high scores
    highScoresEL.setAttribute("style", "display: block");
    goBackBtnEL.setAttribute("style", "display: block");
    clearScoresEL.setAttribute("style", "display: block");
    highScoresEL.setAttribute('style', 'display: block');
    questionEL.textContent = "HIGH SCORES";


    // clear then load the UL with array data

    // grabing all li elements in high-scores class
    let scoreList = document.querySelectorAll(".high-scores > li");

    // removing all li elements from the list
    scoreList.forEach(element => {
        element.remove();
    });


    // pulling list from local storage
    savedScores = JSON.parse(localStorage.getItem("scores"));

    // if there is a list in local storage create new li items, add the data plus current data and push them all into the score object array then push back to local storage
    if(savedScores){
        for(let i = 0; i < savedScores.scoresArray.length; i++){
            scoreObject.scoresArray.push(savedScores.scoresArray[i]);
        }
        savedScores.scoresArray.forEach(element => {
            let newLI = document.createElement('li');
            newLI.textContent = `${element.name.toUpperCase()} ${element.score}`
            highScoresEL.append(newLI);
        });
    }
    else if(scoreObject.scoresArray[0].name == ""){
        // if no name do nothing
        // prevents blank data when going to highscores before playing or no local storage data
    }
    // if there is name data, add the first element to the unordered list
    else {
        let newLI = document.createElement('li');
        newLI.textContent = `${scoreObject.scoresArray[0].name.toUpperCase()} ${scoreObject.scoresArray[0].score}`
        highScoresEL.append(newLI);
    }

    inputInitialsEL.value = "";

}


// Resets all data, hides and reveals all needed elements
let loadHomeScreen = () => {

    // Reset counting data
    timeLeft = 60;
    questionsLeft = quizContent.length;
    currentQuestion = 0;
    timeEL.textContent = `TIME: ${timeLeft}s  QUESTIONS LEFT: ${questionsLeft}`;
    scoreObject.scoresArray = [{name: "", score: 0}];

    // Turn on home screen elements
    questionEL.setAttribute('style', 'display: block');
    discriptionEL.setAttribute('style', 'display: block');
    startEL.setAttribute('style', 'display: block');
    highScoresBtn.setAttribute('style', 'display: block');

    // Set text elements to homescreen messages
    questionEL.textContent = "CODING QUIZ CHALLENGE";
    discriptionEL.textContent = "welcome to the coding quiz challenge.\nIn this challenge you will be given 60 seconds to answer as many code questions as possible, but if you get one wrong you lose 10 seconds\nGOOD LUCK!";

    choicesEL.setAttribute("style", "display: none");
    scoreFormEL.setAttribute("style", "display: none");
   

    // Hide all other elements
    highScoresEL.setAttribute("style", "display: none");
    goBackBtnEL.setAttribute("style", "display: none");
    clearScoresEL.setAttribute("style", "display: none");

}







// Event Listener Functions not related to page loading

// Check answer that was clicked on by user against answer in quiz content object data
let choiceFunction = (event) => {

    // check the answer for the current question
    if(event.target.textContent == quizContent[currentQuestion-1].answer){
        scoreObject.scoresArray[0].score++;
    }
    else{
        timeLeft = timeLeft - 10;
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

// Submit score data function
// pull from local storage, add new score, push to local storage then load high score screen
let submitScore = (event) => {
    event.preventDefault();
    
    // set name variable from text area
    scoreObject.scoresArray[0].name = document.querySelector(".input-initials").value;

    // grab all saved scores from local storage
    savedScores = JSON.parse(localStorage.getItem("scores"));

    // if there are saved scores push them into the current score object array
    if(savedScores){
        for(let i = 0; i < savedScores.scoresArray.length; i++){
            scoreObject.scoresArray.push(savedScores.scoresArray[i]);
        }
    }

    // set the local storage to the updated array
    localStorage.setItem("scores", JSON.stringify(scoreObject));


    loadScoreScreen();

}


// Clear Score Button
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





// Create a timer function will run every 0.1 seconds
let timerFunction = () => {

    timeInterval = setInterval(function(){
        timeLeft-=0.1;
        // truncate time to display
        timeEL.textContent = `TIME: ${Math.trunc(timeLeft)}s  QUESTIONS LEFT: ${questionsLeft}`;

        // if no time left, load save score screen and reset time display
        if(timeLeft < 1){
            clearInterval(timeInterval);
            timeEL.textContent = `TIME: 0s  QUESTIONS LEFT: ${questionsLeft}`;
            loadSaveScoreScreen("Out Of Time");
        }
    },100);
}

// init function
let init = () => {
    loadHomeScreen();

}

// Run Web App
init();
