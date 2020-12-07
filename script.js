

// timer function
var secondsLeft = 90;

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    $("#timer").text("Time Left: " + secondsLeft);

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}

// sendMessage when time is up
function sendMessage() {
  alert("time is up!")
}

// user clicks "start quiz" button and the quiz will start

$("#start-button").on("click", function () {
  $("#start-container").attr("hidden", true);
  $("#quiz-container").removeAttr("hidden");
  showQuestions(questionList[0]);
  // setTime()
});

// start quiz function 
function startQuiz() {

}

// set next question
function setNextQuestion() {

}

// show questions

function showQuestions(question) {
  $("#question").text(question.question);
  for (i = 0; i < 4; i++) {
    var answerBtn = $("<button>")
    answerBtn.addClass("btn answer-btn");
    answerBtn.text(question.answers[i].text);
    console.log(question.answers[i].text);
    if (question.answers[i].correct) {
      answerBtn.attr("correct", "Correct");
    } else {
      answerBtn.attr("correct", "Wrong");
    }
    $("#answers").append(answerBtn);
    console.log(answerBtn.attr("correct"));
  }
}

$(".answer-btn").on("click", function () {
  console.log(this);
  var result = $("<div>");
  result.text($(this).attr("correct"));
  $("#result").text(result);
});




// question list Array

var questionList = [
  {
    question: "What is the correct way to call the random method on the Math global object?",
    answers: [
      { text: "Math(random)", correct: false },
      { text: "Math.random()", correct: true },
      { text: "math.random()", correct: false },
      { text: "random.Math()", correct: false }
    ]
  },
  {
    question: "What is the correct way to call the random method on the Math global obWhat is the correct way to call a string’s built-in method?",
    answers: [
      { text: "'String'.toUpperCase", correct: false },
      { text: "toUpperCase('String')", correct: false },
      { text: "toUpperCase.'String'()", correct: false },
      { text: "'String'.toUpperCase()", correct: true }
    ]
  },
  {
    question: "Which of the methods below does NOT change the array it is called on?",
    answers: [
      { text: ".push()", correct: false },
      { text: ".shift()", correct: false },
      { text: ".pop()", correct: false },
      { text: ".slice()", correct: true }
    ]
  },
  {
    question: "What is the purpose of an array?",
    answers: [
      { text: "To store data in an organized fashion.", correct: true },
      { text: "To organize data at lettered positions.", correct: false },
      { text: "To store data only of the same type.", correct: false },
      { text: "To organize data into key-value pairs.", correct: false }
    ]
  },
  {
    question: "Which of the following CSS property is used to set an HTML element’s foreground color?",
    answers: [
      { text: "foreground-color", correct: false },
      { text: "color-foreground", correct: false },
      { text: "color", correct: true },
      { text: "color-front", correct: false }
    ]
  }
]

