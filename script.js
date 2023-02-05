
var questions = [{
  question: 'What car is this',
  imgSrc: 'assets/pictures/s15.jpg',
  choiceA: 'a.S15',
  choiceB: 'b.Supra',
  choiceC: 'c.Ford Fusion',
  correct: 'A'
}, {
  question: 'Who is this and where is he from?',
  imgSrc: 'assets/pictures/bty war.jpg',
  choiceA: 'a. tupac from sesame street',
  choiceB: 'b. Janitor from the simpsons',
  choiceC: 'c. "The Warrior" from the boondocks',
  correct: 'C'
}, {
  question: 'Who is this Certified Lover Boy?',
  imgSrc: 'assets/pictures/dwake.jpg',
  choiceA: 'a.Kanye',
  choiceB: 'b.Drake',
  choiceC: 'c.Jay z',
  correct: 'B'
}, {
  question: 'Finish the sentence : Help I fallen and _____up',
  imgSrc: 'assets/pictures/fallen.jpg',
  choiceA: 'I got my money',
  choiceB: 'My depression is',
  choiceC: 'I cant get',
  correct: 'C'
}];

var start = document.getElementById('start-btn'),
    startContainer = document.getElementById('start-container'),
    quiz = document.getElementById('quiz-container'),
    question = document.getElementById('question'),
    qImg = document.getElementById('quiz-img'),
    choiceA = document.getElementById('choice-a'),
    choiceB = document.getElementById('choice-b'),
    choiceC = document.getElementById('choice-c'),
    counter = document.getElementById('counter'),
    timeGauge = document.getElementById('timeGauge'),
    progress = document.getElementById('progress'),
    scoreDiv = document.getElementById('score'),
    scoreContent = document.getElementById('score-content'),
    submitBtn = document.getElementById('submit-score'),
    userName = document.getElementById('user-name'),
    userScore = 0,
    highScoreDiv = document.getElementById('high-score-container'),
    runningQuestion = 0,
    count = 0,
    users = [],
    questionTime = 10, // 10s
    lastQuestion = questions.length - 1,
    gaugeWidth = 150, // 150px
    gaugeUnit = gaugeWidth / questionTime,
    score = 0;
let TIMER;

start.addEventListener("click", startQuiz);
if (localStorage.getItem('users')) {
  users = JSON.parse(localStorage.getItem('users'));
}


function startQuiz() {
  startContainer.classList.add('d-none');
  quiz.classList.remove('d-none');
  renderQuestion();
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

function renderQuestion() {
  var q = questions[runningQuestion];

  question.innerHTML = q.question;
  qImg.src = q.imgSrc;
  choiceA.textContent = q.choiceA;
  choiceB.textContent = q.choiceB;
  choiceC.textContent = q.choiceC;
}


function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}


function renderCounter() {
  if (count <= questionTime) {
    counter.textContent = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++
  } else {
    count = 0;

    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {

      clearInterval(TIMER);
      scoreRender();
    }
  }
}


function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {

    score++;

    answerIsCorrect();
  } else {

    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
  
    clearInterval(TIMER);
    scoreRender();
  }
}


function answerIsCorrect() {
  document.getElementById(runningQuestion).classList.add('correct');
}


function answerIsWrong() {
  document.getElementById(runningQuestion).classList.add('incorrect');
}


function scoreRender(userscore) {
  quiz.classList.add('d-none');
  scoreDiv.classList.remove('d-none');
  userScore = Math.round(100 * score / questions.length);
  scoreContent.textContent = 'You scored ' + userScore + '%!';
}


submitBtn.addEventListener('click', function(event) {
  event.prevendDefault;

  var user = {
    userName: userName.value.trim().toUpperCase(),
    score: userScore.toString()
  };

  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));

  scoreDiv.classList.add('d-none');

  highScoreDiv.classList.remove('d-none');

  for (var i = 0; i < users.length; i++) {
    var highScoreList = document.querySelector('ul');
    var li = document.createElement('li');
    li.textContent = `${users[i].userName}: ${users[i].score}`;
    highScoreList.append(li);
  }
});