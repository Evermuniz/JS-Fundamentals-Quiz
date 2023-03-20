//declaring most of the gloabal variables to be used throughout the code. Primarily using ID's to select elements in HTML
var header = document.querySelector("#header");
var container = document.querySelector("#container");
var h1El = document.createElement("h1");
var score = 100; //This variable is used for the score tracking
var count = 0; //This variable is used to rotate through the questions
var timer = document.querySelector("#timer");
var timeRemaining = 60; //this variable is used for the timer countdown
var playerName = document.querySelector("#player-name");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");
var highScores = document.querySelector("#highScores");
var highscore = []; //the player initials and scores are pushed into this variable for local storage
var startOver = document.querySelector("#startOver");
var start = document.querySelector(".start-button");
var quiz = [
  //all the sets of questions, options, and answers are in this array as objects
  {
    question: "Which does the .pop method accomplish?",
    options: [
      "1. Inserts an element to the end of an array",
      "2. Removes the last element in an array",
      "3. Creates a new array with the values you defined",
      "4. Prevents event bubbling",
    ],
    answer: "2. Removes the last element in an array",
  },

  {
    question: "If var states = [''Utah'', ''Arizona'', ''Florida'', ''Arkansas'']; what is the value of states[1]?",
    options: ["1. Florida", "2. Utah", "3. Arizona", "4. None of the above"],
    answer: "3. Arizona",
  },

  {
    question: "Which of the following is NOT a primitive type?",
    options: ["1. Variable", "2. Boolean", "3. Number", "4. Undefined"],
    answer: "1. Variable",
  },

  {
    question: "What is the purpose of a for-loop?",
    options: [
      "1. For creating variable values that loop",
      "2. To declare a new variable if certain conditions are met",
      "3. It is a specific kind of function",
      "4. To execute code more than once as long as certain conditions are met",
    ],
    answer: "4. To execute code more than once as long as certain conditions are met",
  },

  {
    question: "For best practices, where is the best place to link your JS file in HTML?",
    options: [
      "1. In the head, just like CSS",
      "2. At the end of the body",
      "3. At the beginning of body",
      "4. JavaScrip is not linked through the HTML file",
    ],
    answer: "2. At the end of the body",
  },
];

h1El.textContent = "JavaScript Fundamentals Quiz"; //Added the header text through JS
header.appendChild(h1El); //appending the h1 element to the header

function begin() {
  // this is the main function to rotate through questions, keep track of score and timer
  container.innerHTML = ""; //resetting the content whenever this function runs
  highScores.setAttribute("style", "display: none"); //removing the high scores link when quiz begins to avoid users from clicking

  start.setAttribute("style", "display: none"); //hiding the Begin Quiz button when the function begins

  //using the count variable stated above to rotate through the questions and options
  var question1 = quiz[count].question;
  var options1 = quiz[count].options;
  var ul = document.createElement("ul"); //created a ul element for the list of questions

  container.appendChild(ul); //appending UL to the container
  ul.textContent = question1; //assigning the first question to be displayed in the ul

  for (var j = 0; j < options1.length; j++) {
    //adding a loop to create an option for every answer option in the same bank of questions
    var li = document.createElement("li"); //creating a new li element
    li.textContent = options1[j]; //adding the option text to li element
    ul.appendChild(li); //appending the li element to the question in the ul
    li.setAttribute("style", "background-color: red;"); //setting some styling for the list
    ul.setAttribute("style", "list-style: none;");
    li.style.margin = "5px";

    li.addEventListener("click", function (event) {
      //creating an event listener when an li element is clicked
      var selected = event.target.textContent; //defining a new variable to be the li variable that was clicked
      var answer = quiz[count].answer; // creating a new variable to be the respective correct answer
      count = count + 1; //adding 1 to the count variable to move to the next question

      if (selected !== answer) {
        //if the selected option was incorrect then subtract time from the timer and remove 20 from the points
        score -= 20;
        timeRemaining -= 10;
      }

      if (count > 4) {
        //once the count is over 4, which is the limit for the number of 5 questions then run the win function, otherwise repeat the function
        win();
      } else if (count <= 4) {
        begin();
      }
    });
  }
}

function startTimer() {
  //this function starts the timer
  var interval = setInterval(function () {
    if (timeRemaining > 0) {
      //if the timer is above 0 then keep subtracting down to 0
      timeRemaining--;
      timer.textContent = timeRemaining + " seconds left"; //display the timer plus text

      if (timeRemaining === 0) {
        //if the timer runs out first then run the lose function
        lose();
      }

      if (count > 4) {
        //stop the timer once all quiz questions have been answered
        clearInterval(interval);
      }
    }
  }, 1000); //setting the timer interval to be 1 second
}

start.addEventListener("click", function () {
  //when the Begin Quiz button is clicked then the begin and startTimer functions are triggered
  startTimer();
  begin();
});

function lose() {
  //This function is used when the timer runs out
  container.innerHTML = ""; //clear the contents to stop displaying questions
  var lose = document.createElement("h2"); //create a new element
  container.appendChild(lose); //append the new h2 element to the container
  lose.textContent = "Time's Up"; //text for the new h2 element
  startOver.setAttribute("style", "display: block");//adding the go back button when time runs out
}

function win() {
  //this is triggered when someone answers all questions before the time is up
  container.innerHTML = ""; //clear the content to stop displaying the questions
  var win = document.createElement("h2"); //create a new element and assign it to a variable
  container.appendChild(win); //append the new element to the container
  win.textContent = "Your final score was: " + score + "%"; //text to display final score
  playerName.setAttribute("style", "display: block"); //display the text box for the user to input their initials
}

submit.addEventListener("click", function (event) {
  // this function is triggered when the submit button is clicked for scores
  event.preventDefault();
  var session = {
    //creating a new variable with an object to add to the local storage
    initials: initials.value,
    score: score.valueOf(),
  };

  var storedData = JSON.parse(localStorage.getItem("session")); //creating a new variable with the current local storage data
  if (storedData !== null) {
    //if there is content in the local storage then the highscore variable is equal to the stored data so we don't lose it
    highscore = storedData;
  }

  highscore.push(session); //push the content of the newly finished game to the highscore variable so it includes past and current info

  localStorage.setItem("session", JSON.stringify(highscore)); //add all the content to local storage as a string

  location.reload(); //reload the page to go home after submission
});

highScores.addEventListener("click", function (event) {
  //adding an event listener to the high score list link
  event.preventDefault;
  start.setAttribute("style", "display: none"); //hiding the begin quiz button when viewing high scores
  scoreContent(); //triggering the score content function below
});

var compiledScores = JSON.parse(localStorage.getItem("session")); //creating a new variable with the parsed local storage data
function scoreContent() {
  highScores.setAttribute("style", "display: none"); //hiding the link to view high scores to prevent users from viewing it
  startOver.setAttribute("style", "display: block"); //displaying the start over button so users can navigate back to the main page
  for (var i = 0; i < compiledScores.length; i++) {
    //adding a loop for all the objects in local storage
    var storedData = JSON.parse(localStorage.getItem("session"))[i]; //getting items in an index for the loop to display all local storage object separately
    var li = document.createElement("li"); //creating a new list item for each score and user
    li.textContent = "Player Initials: " + storedData.initials + ".    " + "Score: " + storedData.score; //adding the text and content to li elements
    document.querySelector("#scoresContent").appendChild(li); //appending it to a div in html to display
  }
}

startOver.addEventListener("click", function () {
  //adding event listener to go back button to restart the page
  location.reload();
});
