const quizData = [
    {
        question:'1] Garampani Sanctuary is located at',
        options: ['a) Junagarh, Gujarat','b) Diphu, Assam','c) Kohima, Nagaland','d) Gangtok, Sikkim'],
        answer:'b) Diphu, Assam',
    },

    {
        question:'2] Which of the following is used in pencils ?',
        options: ['a) Graphite','b) Silicon','c) Charcoal','d) Phosphorous'],
        answer:'a) Graphite',
    },

    {
        question:'3] Who was known as Iron Man of India ?',
        options: ['a) Govind Ballabh Pant','b) Jawaharlal Nehru','c) Subhash Chandra Bose','d) Sardar Vallabhbhai Patel'],
        answer:'d) Sardar Vallabhbhai Patel',
    },

    {
        question:'4] The power to decide an election petition is vested in the',
        options: ['a) Parliament','b) Supreme Court','c) High Court','d) Election Commission'],
        answer:'c) High Court',
    },

    {
        question:'5] The Homolographic projection has the correct representation of',
        options: ['a) Shape','b) Area','c) Baring','d) Distance'],
        answer:'b) Area',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers =[];

function shuffleArray(array) {
    for (let i = array.length - 1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [array[i],array[j]] = [array[j],array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i=0; i < shuffledOptions.length; i++)
    {
        const option = document.createElement('label');
        option.className='option';

        const radio = document.createElement('input');
        radio.type='radio';
        radio.name='quiz';
        radio.value = shuffledOptions[i];

        const optionText =
         document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML='';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() 
{
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption)
    {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer)
        {
            score++;
        }
        else
        {
            incorrectAnswers.push({question:quizData[currentQuestion].question,incorrectAnswers:answer,correctAnswer:quizData[currentQuestion].answer,});
        }

        currentQuestion++;
        selectedOption.checked=false;
        if(currentQuestion<quizData.length)
        {
            displayQuestion();
        }
        else
        {
            displayResult();
        }
    }
}

function displayResult()
{
    quizContainer.style.display='none';
    submitButton.style.display='none';
    retryButton.style.display='inline-block';
    showAnswerButton.style.display='inline-block';
    resultContainer.innerHTML=`You Scored ${score} out of ${quizData.length}!`;
}

function retryQuiz()
{
    currentQuestion=0;
    score=0;
    incorrectAnswers=[];
    quizContainer.style.display='block';
    submitButton.style.display='inline-block';
    retryButton.style.display='none';
    showAnswerButton.style.display='none';
    resultContainer.innerHTML='';
    displayQuestion();
}

function showAnswer()
{
    quizContainer.style.display='none';
    submitButton.style.display='none';
    retryButton.style.display='inline-block';
    showAnswerButton.style.display='none';

    let incorrectAnswersHtml='';
    for(let i=0; i < incorrectAnswers.length; i++)
    {
        incorrectAnswersHtml +=`
        <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswers} <br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
        `;
    }

    resultContainer.innerHTML = `
    <p>You Scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answer:</p>
    ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click',checkAnswer);
retryButton.addEventListener('click',retryQuiz);
showAnswerButton.addEventListener('click',showAnswer);

displayQuestion();
