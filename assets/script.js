var body = document.body;
var header = document.querySelector("#header")
var container = document.querySelector("#container")
var h1El = document.createElement("h1");
var score = 100;
var count = 0;
var timer = document.querySelector("#timer");
var timeRemaining = 100;
var quiz = [{
    question: "What is JavaScript?",
    options: ["1. A programming language used to make websites more interactive.", "2. A text editor used to write code","3. A type of coffee popular among developers","4. <script>"],
    answer: "4. <script>"},

    { question: "How many planets in the solar system",
    options: ["100", "20","9","8"],
    answer: "9"},
];

    

h1El.textContent = "JavaScript Fundamentals Quiz"

header.appendChild(h1El);





function begin () {
    
    container.innerHTML = "";

  start.setAttribute('style','display: none')

 var question1 = quiz[count].question;
 var options1 = quiz[count].options;
 var ul = document.createElement("ul");

 container.appendChild(ul);


 
ul.textContent = question1;


for (var j = 0; j < options1.length; j++){
var li = document.createElement("li");
li.textContent = options1[j];
ul.appendChild(li);
li.setAttribute('style', 'background-color: red;');
ul.setAttribute('style', 'list-style: none;');
li.style.margin = "5px";

li.addEventListener('click', function (event) {
var selected = event.target.textContent;
var answer = quiz[count].answer;
count = (count + 1) % quiz.length;
console.log(count);

if (selected !== answer){score -= 25;
timeRemaining -= 10;
console.log(score);}


begin();


});};

};
function startTimer(){

    var interval = setInterval(function(){
        if (timeRemaining>0){
        timeRemaining--;
        timer.textContent = timeRemaining + " seconds left";

        if(timeRemaining ===0){

        clearInterval(interval);
        }}
        

    }, 1000);

};





var start = document.querySelector(".start-button");


start.addEventListener('click', () => {
  begin();
startTimer();
  {console.log(count);}
});

//ul.setAttribute('style', 'list-style: none;');



//ul.setAttribute('style', 'list-style: none;');




