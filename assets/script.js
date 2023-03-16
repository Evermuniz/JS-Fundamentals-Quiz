var body = document.body;
var h1El = document.createElement("h1");
var list = document.createElement("ul");
var options = document.createElement("li")

h1El.textContent = "JavaScript Fundamentals Quiz"
list.textContent = "Question"
options.textContent = "Answers"

body.appendChild(h1El);
body.appendChild(list);
body.appendChild(options)
