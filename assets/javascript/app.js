$(document).ready(function () {
  var options = [
    {
      question: "Which family member does Meg ask to take her SATs?",
      choice: ["Stewie", "Brian", "Peter", "Chris",],
      answer: 1,
    },
    {
      question: "At Stewie's playschool graduation, which family member is scouted to be a model?",
      choice: ["Peter", "Lois", "Meg", "Brian",],
      answer: 2,
    },
     {
     	question: "What is Peter's real first name?",
    	choice: ["Ben", "Peter", "Justin", "Alex"],
    	answer: 2,
    },
    {
    	question: "Where did Lois want to take Stewie on his first birthday?",
    	choice: ["Chuck E Cheese", "Cheese E Charlie's", "Chet E Cheese", "Charlie's Funhouse"],
    	answer: 1,
    },
    {
    	question: "Lois forces Peter to take a CPR class after who goes overboard on his boat?",
    	choice: ["Joe", "Quagmire", "Stewie", "Meg" ],
    	answer: 0,
    },
    {
    	question: "Who isn't invited when the neighborhood adults book a trip to the Bahamas?",
    	choice: ["Peter", "Cleveland", "Joe", "Quagmire" ],
    	answer: 3,
    },
    {
    	question: "Who finds the first scroll to tour the Pawtucket Patriot Brewery?",
    	choice: [" Peter", "Joe", "Tom Tucker", "Dr. Hartman"],
    	answer: 1,
    },
    {
    	question: "At the petting zoo, Brian sticks animal feed in Stewie's back pocket. Which animal does not bite him?",
    	choice: ["Goat", "Horse", "Duck", "Sheep"],
    	answer: 3,
    }
  ];

  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 16;
  var intervalId;
  var userGuess ="";
  var clockRunning = false;
  var questionCount = options.length;
  console.log("Question Count: " + options.length);
  var pick;
  var index;
  var newArray = [];
  var holder = [];

  // $("#reset").hide();
  //click start button to start game
  $("#start").on("click", function () {
    $("#start").hide();
    displayQuestion();
    runTimer();
    for(var i = 0; i < options.length; i++) {
      holder.push(options[i]);
    }
  })
  //timer start
  function runTimer(){
    if (!clockRunning) {
      intervalId = setInterval(countDown, 1000);
      clockRunning = true;
    }
  }
  //timer countdown
  function countDown() {
    timer--;
    $("#timeLeft").html("<h2> Time Remaining: " + timer + "</h2>");
    //stop timer if reach 0
    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#answerSection").html("<h3> Time is up! The correct answer is: " + pick.choice[pick.answer] + "</h3>");
      $("#answerSection").append('<img src="assets/images/brian.png" class="img-card" height=250 alt="brian">');
      endGame();
    }
  }

  //timer stop
  function stop() {
    clockRunning = false;
    clearInterval(intervalId);
  }
  //randomly pick question in array if not already shown
  //display question and loop though and display possible answers
  function displayQuestion() {
    //generate random index in array
    index = Math.floor(Math.random()*options.length);
    // index = options.length;
    pick = options[index];
    //iterate through answer array and display
    $("#questionSection").html("<h3>" + pick.question + "</h3>");
    for(var i = 0; i < pick.choice.length; i++) {
      var userChoice = $("<h4>");
      userChoice.addClass("answerChoice list-group-item");
      userChoice.html(pick.choice[i]);
      //assign array position to it so can check answer
      userChoice.attr("userGuess", i);
      $("#answerSection").append(userChoice);
    }

    // Change the background color when mouse hovers an answer
    $(".answerChoice").hover(function(){
      $(this).css("background-color", "yellow");
      }, function(){
      $(this).css("background-color", "transparent");
    });

    //click function to select answer and outcomes
    $(".answerChoice").on("click", function(){
    //grab array position from userGuess
      userGuess = parseInt($(this).attr("userGuess"));
      //correct guess or wrong guess outcomes
      if (userGuess === pick.answer){
        stop();
        correctCount++;
        userGuess="";
        $("#answerSection").html("<h3>Correct!</h3>");
        $("#answerSection").append('<img src="assets/images/peter.png" class="img-card" width=250 alt="peter">');
        endGame();
      } else {
        stop();
        wrongCount++;
        userGuess="";
        $("#answerSection").html("<h3>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</h3>");
        $("#answerSection").append('<img src="assets/images/monkey.png" class="img-card" width=250 alt="monkey">');
        endGame();
      }
    })

    console.log("Wrong Count: " + wrongCount);
    console.log("Corret Count: " + correctCount);
    console.log("Unanswered Count: " + unanswerCount);
  }

  function endGame () {
    // $("#answerSection").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    options.splice(index,1);

    var resetQuestion = setTimeout(function() {
      $("#answerSection").empty();
      timer= 16;

    //run the score screen if all questions answered
    if ((wrongCount + correctCount + unanswerCount) === questionCount) {
      $("#questionSection").empty();
      $("#questionSection").html("<h3>All done!  Here's how you did: </h3>");
      $("#answerSection").append("<h4> Correct: " + correctCount + "</h4>" );
      $("#answerSection").append("<h4> Incorrect: " + wrongCount + "</h4>" );
      $("#answerSection").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
      $("#reset").append("<button class ='btn btn-success btn-lg'>Play Again?</button>");
      correctCount = 0;
      wrongCount = 0;
      unanswerCount = 0;
    } else {
      runTimer();
      displayQuestion();
    }
    }, 3000);
  }

  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerSection").empty();
    $("#questionSection").empty();
    for(var i = 0; i < holder.length; i++) {
      options.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  })
})
