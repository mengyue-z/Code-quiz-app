

// timer function
var secondsLeft = 90;
var totalScore =0;
var highScores = [];
var savedResults = localStorage.getItem("highScores");

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
var qIndex = 0;
$("#start-button").on("click", function () {
  resetQuestion()
  $("#start-container").attr("hidden", true);
  $("#quiz-container").removeAttr("hidden");
  qIndex=0;
  showQuestions(questionList[qIndex]);
  // setTime()
});

// set next question
function setNextQuestion() {
  qIndex ++;
  console.log(qIndex);
  console.log(questionList.length)
  if (qIndex >= questionList.length) {
    getScore();
  } else {
  resetQuestion()
  showQuestions(questionList[qIndex]);
   }
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

// reset question
function resetQuestion() {
  $("#question").empty();
  $("#answers").empty();
  $("#result").empty();
}

$(document).on('click','.answer-btn',function(e) {
  var result = $(this).attr("correct");
  $("#result").text(result+"!");
  if (result == "Correct") {
    totalScore+=20;
  }
  setNextQuestion();
  // setTimeout(setNextQuestion,1000);
  // $(".answer-btn").attr("disabled","disabled");
});

// Score and inital input Page 
function getScore() {
  $("#start-container").attr("hidden", true);
  $("#quiz-container").attr("hidden", true);
  $("#score-container").removeAttr("hidden");
  var score = $("<h2>");
  score.addClass("score");
  score.text("Your score:" + totalScore);
  var userIni = $("<input>");
  userIni.addClass("initial");
  userIni.text("Please enter your initial here:");
  $("#score").append(score);
  $("#initial").append(userIni);
}

// function to sort highscores
function compare(a,b){
  if(a.totalScore > b.totalScore){
    return -1;
  } else if (a.totalScore == b.totalScore) {
return 0
  } else {
    return 1;
  }
}

// high score page 
$("#submit").on("click", function () {
  var userInitial = $(".initial").val();
  var newHighScore = {userInitial: userInitial,totalScore: totalScore};
  if(savedResults != null){
    var savedResultsArray = JSON.parse(savedResults);
    savedResultsArray.push(newHighScore);
    savedResultsArray.sort(compare);
    localStorage.setItem("highScores",JSON.stringify(savedResultsArray));
  } else {
    highScores.push(newHighScore);
    highScores.sort(compare);
    localStorage.setItem("highScores",JSON.stringify(highScores));
  }
  goToHighScore();
});
console.log(highScores);
function goToHighScore() {
  $("#start-container").attr("hidden", true);
  $("#quiz-container").attr("hidden", true);
  $("#score-container").attr("hidden", true);
  $("#highscore-container").removeAttr("hidden");
  appendHighscores();
}

// append highscores function
function appendHighscores(){
  var scoreText = localStorage.getItem("highScores");
  var scoreList = JSON.parse(scoreText);
  for (scoreIndex=0; scoreIndex<scoreList.length;scoreIndex++){
    var scoreDiv = $("<h2>");
    scoreDiv.text("Inital: "+ scoreList[scoreIndex].userInitial +"   Score: " + scoreList[scoreIndex].totalScore);
    $("#score-list").append(scoreDiv);
  }
  console.log(scoreList[0].totalScore);
}

// clear highscores click event
$("#clear-highscores").on("click", function () {
  localStorage.clear();
  $("#score-list").empty();
});

// go back to start quiz page
$("#go-back").on("click", function () {
  $("#start-container").removeAttr("hidden");
  $("#quiz-container").attr("hidden", true);
  $("#score-container").attr("hidden", true);
  $("#highscore-container").attr("hidden", true);
  $(".score").empty();
  $(".initial").remove();
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
    question: "What is the correct way to call a string’s built-in method?",
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

