var body = document.body;
var header = document.querySelector("#header");
var container = document.querySelector("#container");
var h1El = document.createElement("h1");
var score = 100;
var count = 0;
var timer = document.querySelector("#timer");
var timeRemaining = 100;
var playerName = document.querySelector("#player-name");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");
var highScores = document.querySelector("#highScores");
var player = [];
var quiz = [
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

h1El.textContent = "JavaScript Fundamentals Quiz";
header.appendChild(h1El);

function begin() {
  container.innerHTML = "";

  start.setAttribute("style", "display: none");

  var question1 = quiz[count].question;
  var options1 = quiz[count].options;
  var ul = document.createElement("ul");

  container.appendChild(ul);
  ul.textContent = question1;

  for (var j = 0; j < options1.length; j++) {
    var li = document.createElement("li");
    li.textContent = options1[j];
    ul.appendChild(li);
    li.setAttribute("style", "background-color: red;");
    ul.setAttribute("style", "list-style: none;");
    li.style.margin = "5px";

    li.addEventListener("click", function (event) {
      var selected = event.target.textContent;
      var answer = quiz[count].answer;
      count = count + 1;
      console.log(count);

      if (selected !== answer) {
        score -= 20;
        timeRemaining -= 10;
        console.log(score);
      }

      if (count > 4) {
        win();
      } else if (count <= 4) {
        begin();
      }
    });
  }
}
function startTimer() {
  var interval = setInterval(function () {
    if (timeRemaining > 0) {
      timeRemaining--;
      timer.textContent = timeRemaining + " seconds left";

      if (timeRemaining === 0) {
        lose();
        clearInterval(interval);
      }

      if (count > 4) {
        clearInterval(interval);
      }
    }
  }, 1000);
};

function displayScore() {
  var finalScore = score;
  localStorage.setItem("score", finalScore);
  window.alert(finalScore);
};

var start = document.querySelector(".start-button");

start.addEventListener("click", () => {
  begin();
  startTimer();
  {
    console.log(count);
  }
});

function lose() {
  container.innerHTML = "";
  var lose = document.createElement("h2");
  container.appendChild(lose);
  lose.textContent = "Time's Up";
};

function win() {
  container.innerHTML = "";
  var win = document.createElement("h2");
  container.appendChild(win);
  win.textContent = "You're final score was: " + score + "%";
  playerName.setAttribute("style", "display: block");
};

  submit.addEventListener('click', function (event) {
    event.preventDefault();
     var session = {
       initials: initials.value,
       score: score.valueOf()
     };
     player.push(session);
    localStorage.setItem("session", JSON.stringify(player));

    location.reload();
  });

highScores.addEventListener('click', function(event){
event.preventDefault; 
  start.setAttribute("style", "display: none");
  scoreContent();

});


function scoreContent() {
  for (var i = 0; i < localStorage.length; i++) {
    var compiledScores = JSON.parse(localStorage.getItem("session"));
    document.querySelector("#scoresContent").textContent = compiledScores.initials + compiledScores.score;
  };}

