const store = {

  // Q1
questions: [
  {
    question: 'What horror movie is set at Camp Crystal Lake?',
    answers: [
      'Friday the 13th',
      'A Nightmare on Elm Street',
      'Halloween',
      'The Evil Dead'
    ],
    correctAnswer: 'Friday the 13th'
  },
    // Q2
  {
    question: 'What is the cursed object in the 2009 movie, Drag Me To Hell?',
    answers: [
      'A sacred book',
      'A knife',
      'A cross',
      'A button'
    ],
    correctAnswer: 'A button'
  },
    // Q3
  {
    question: 'Who was the original inspiration behind the Michael Myers mask?',
    answers: [
      'Freddy Krueger',
      'Clint Eastwood',
      'William Shatner',
      'Christopher Reeve'
    ],
    correctAnswer: 'William Shatner'
  },
    // Q4
  {
    question: 'In the 1981 movie, The Shining, what hotel/motel did Jack and his family look after?',
    answers: [
      'The Overlook Hotel',
      'The Bates Motel',
      'Hotel Excelsior',
      'Pinewood Hotel'
    ],
    correctAnswer: 'The Overlook Hotel'
  },
    // Q5
  {
    question: `What movie is this quote from: "Whatever you do, don't fall asleep."?`,
    answers: [
      'The Last House on the Left',
      'A Nightmare on Elm Street',
      'The Silence of the Lambs',
      'Friday the 13th'
    ],
    correctAnswer: 'A Nightmare on Elm Street'
  },
    // Q6
  {
    question: 'What famous actor played the killer in Se7en?',
    answers: [
      'Brad Pitt',
      'Edward Norton',
      'Johnny Depp',
      'Kevin Spacey'
    ],
    correctAnswer: 'Kevin Spacey'
  },
    // Q7
  {
    question: 'What is the name of the killer in the movie, Scream?',
    answers: [
      'Pennywise',
      'Jigsaw',
      'Ghostface',
      'Leatherface'
    ],
    correctAnswer: 'Ghostface'
  },
    // Q8
  {
    question: 'What is the name of the clown from the movie, It?',
    answers: [
      'Bozo',
      'Pennywise',
      'Krusty',
      'Pogo'
    ],
    correctAnswer: 'Pennywise'
  },
    // Q9
  {
    question: 'Which movie was the first horror movie to be nominated for the Best Picture Oscar?',
    answers: [
      'The Shining',
      'Psycho',
      'The Omen',
      'The Exorcist'
    ],
    correctAnswer: 'The Exorcist'
  },
    // Q10
  {
    question: `In the movie, The Strangers, what do the strangers answer when asked, "Why are you doing this?"`,
    answers: [
      'Because you were home.',
      "Because it's fun.",
      'Because we can.',
      'Because he told us to.'
    ],
    correctAnswer: 'Because you were home.'
  },
],
quizStarted: false,
currentQuestion: 0,
score: 0
};

// generate the start page
function generateStartPageHtml() {
  console.log('`generateStartPageHtml` ran');
  return `
    <div class="start-screen">
    <form action="#" id="js-start-quiz">
      <p>Welcome, horror movie fan!</p>  
      <p>Test your knowledge of all things scary with this 10 question quiz…Good luck!</p>
      <button type="button" id="js-start-btn">Start Quiz</button>
    </form>
    </div>
  `;
}

// generate the question and score tracker at the top of every new question asked
function generateQuestionNumberAndScoreTracker() {
  return `
    <ul class="question-and-score">
    <li id="question-number">
    Question Number: ${store.currentQuestion + 1}/${store.questions.length}
    </li>
    <li id="score">
    Score: ${store.score}/${store.questions.length}
    </li>
    </ul>
  `;
}

// generate the answer/radio buttons
function generateAnswersHtml() {
  const answersArray = store.questions[store.currentQuestion].answers;
    let answersHtml = '';
    let index = 0;
    answersArray.forEach(answer => {
      answersHtml += `
        <div class="options">
          <div class="answers">
            <div id="option-container-${index}">
              <input type="radio" name="option" id="option${index + 1}" value="${answer}" required>
              <label for="option${index +1}">${answer}</label>
            </div>
          </div>
        </div>
      `;
      index++;
  });
  return answersHtml;
}

// generate the question box and call the answer radio buttons below
function generateQuestionHtml() {
  currentQuestion = store.currentQuestion;
  return `
    <form action="#" id="question-form">
      <fieldset>
        <div class="question-area"
          <div class="question">
          </div>
        <div class="options">
        <div class="answers">
          <legend>${store.questions[currentQuestion].question}
          </legend>
        </div>
          ${generateAnswersHtml()}
        </div>
        <div class="submit-answer-btn">
            <button type="submit" id="js-submit-answer-btn">Submit Answer</button>
        </div>
      </div>
      <div class="result-area" style="display:none">
        <div class="next-question-btn">
            <button type="button" id="js-next-question-btn">Next Question</button>
        </div>
      </div>
      </fieldset>
    </form>
  `;
}

// generate HTML for grading once radio button has been selected
function generateAnswerResponseHtml(answerStatus) {
  let correctAnswer = store.questions[store.currentQuestion].correctAnswer;
  let html = '';
    if (answerStatus === 'correct') {
      html = `
      <div class="answer-screen">
        <div class="answer-response">
          <p>That is correct!</p>
        </div>
      </div>`;
    } else if (answerStatus === 'incorrect') {
      html = `
      <div class="answer-screen">
        <div class="answer-response">
          <p>That is incorrect! The correct answer is:</p> 
          <p>${correctAnswer}.</p>
        </div>
      </div>
      `;
}
  return html;
}

// generate screen at end to tell them their final score and prompt to restart the quiz
function generateResultsScreen() {
  return `
      <div class="results-screen">
      <form action="#" id="restart-quiz">
        <fieldset>
          <div class="total-score">
            <p>Your total score is: ${store.score}/${store.questions.length}!</p>
          </div>
          <div class="restart-quiz-btn">
            <button type="button" id="js-restart-quiz-btn">Restart Quiz</button>
          </div>
        </fieldset>
      </form>
    </div>
`;
}

/*********** Render Quiz ***********/

// render quiz - if quiz started is false, generate start page; if currentQuestion is >= to 0 AND currentQuestion is less than the length of the questions array in store, generate the question and answer tracker and the question HTML; if both of those are not true, generate the results screen as the quiz is over
function renderQuiz() {
  console.log('`renderQuiz` ran');

  currentQuestion = store.currentQuestion;

  if (store.quizStarted === false) {
    $('main').html(generateStartPageHtml());
  } else if ((currentQuestion >= 0) && (currentQuestion < store.questions.length)) {
    html = generateQuestionNumberAndScoreTracker();
    html += generateQuestionHtml();
    $('main').html(html);
  } else {
    $('main').html(generateResultsScreen());
    handleRestartQuizButtonClicked();
};
}

/*********** Handle Clicks Functions ***********/

// handle click on Start Quiz button
function handleStartQuizClicked() {
  console.log('`handleStartQuizClicked` ran')

  $('#js-start-btn').click(event => {
    store.quizStarted = true;
    renderQuiz();
    handleSubmitAnswerButtonClicked();
    handleNextQuestionClicked();
});
}

// handle click of Next Question button
function handleNextQuestionClicked() {
  console.log('`handleNextQuestionClicked` ran');

$('#js-next-question-btn').click(event => {
  renderQuiz();
  handleSubmitAnswerButtonClicked();
  handleNextQuestionClicked();
});
}

// handle click of Submit Answer button
function handleSubmitAnswerButtonClicked() {
  console.log('`handleSubmitAnswerButtonClicked` ran');

  $('#question-form').submit(event => {
  event.preventDefault();

//  grab current question object
  const currentQuestion = store.questions[store.currentQuestion];

  // grab selected answer
  let selectedOption = $('input[name=option]:checked').val();

// if the selected answer matches the value of the current question's correct answer, add one to the score and prepend the correct Html response; if incorrect, prepend the incorrect Html response and add one to the currentQuestion tracker
  if (selectedOption === currentQuestion.correctAnswer) {
    store.score++;
    $('.result-area').prepend(generateAnswerResponseHtml('correct'));
  } else {
    $('.result-area').prepend(generateAnswerResponseHtml('incorrect'));
  }
  // increase current question index by one
  store.currentQuestion++;

  // show and hide submit button and next question button
  $('#js-submit-answer-btn').hide();
  $('input[type=radio]').attr('disabled', true);
  $('.result-area').show();
});
}

// set all values back to 0 and false to restart the quiz
function restartQuiz() {
  store.quizStarted = false;
  store.currentQuestion = 0;
  store.score = 0;
}

// handle click on Restart Quiz button; will run restartQuiz function, render the quiz, and then prompt handleStartQuizClicked function
function handleRestartQuizButtonClicked() {
  console.log('`handleRestartQuizButtonClicked` ran');

$('#js-restart-quiz-btn').click(event => {
  restartQuiz();
  renderQuiz();
  handleStartQuizClicked();
})
}

/********** Handle Quiz ***********/

// call back function once page is loaded
function handleQuiz() {
  console.log('`handleQuiz` ran');
  renderQuiz();
  handleStartQuizClicked();
}

$(handleQuiz);