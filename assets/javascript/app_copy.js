var intervalId;
var clockRunning = false;
var time = 11;

function countDown() {
  time--;
  $("#timer").text(time);
  // console.log(time);
  if (time === 0) {
    clearInterval(intervalId);
    clockRunning = false;
  }
}

function start() {
  if (!clockRunning) {
    intervalId = setInterval(countDown, 1000);
    clockRunning = true;
  }
}

start();

// var question_1 = {
//   question: "Which family member does Meg ask to take her SATs?",
//   answer_1: "Stewie",
//   answer_2: "Brian",
//   answer_3: "Peter",
//   answer_4: "Chris",
//   correctAnswer: "answer_1",
// }

var question_1 = ["Which family member does Meg ask to take her SATs?",
"Stewie",
"Brian",
"Peter",
"Chris",
"Brian",
]

var question_2 = ["At Stewie's playschool graduation, which family member is scouted to be a model?",
"Peter",
"Lois",
"Meg",
"Brian",
"Meg",
]

// var question_1 = ["Which family member does Meg ask to take her SATs?",
// "Stewie",
// "Brian",
// "Peter",
// "Chris",
// "Brian",
// ]

$("#question").text(question_1[0]);
// $("#answer-1").text(question_1.answer_1);
// $("#answer-2").text(question_1.answer_2);
// $("#answer-3").text(question_1.answer_3);
// $("#answer-4").text(question_1.answer_4);

function questionList(e) {
  // for (var i=0; i<question_1.length; i++) {
    $("#main-content").append('<li id="answer-1" class="answer list-group-item">' + question_1[1] + '</li>');
    $("#main-content").append('<li id="answer-2" class="answer list-group-item">' + question_1[2] + '</li>');
  // }
  return question_1[5];

}

questionList();
console.log(question_1[5]);


$("#main-content").on("click", function(event){
  // var target = $(event.target);
  // if ( target.is( "li" ) ) {
  if($(this).is("#answer-1") && questionList === question_1[6]) {
    $("#main-content").empty();
    $("#main-content").html('<h1 id="notice">Correct!</h1>');
    $("#notice").append('<img src="assets/images/peter.png" class="img-card" width=200 height=200 alt="peter">');
  } else {
    $("#main-content").empty();
    $("#main-content").html('<h1 id="notice">Nope!</h1>');
    $("#main-content").html('<p id="notice">The correct answer was: ' + question_1[5] + '</p>');
    $("#notice").append('<img src="assets/images/monkey.png" class="img-card" width=200 height=200 alt="peter">');
  }
});
