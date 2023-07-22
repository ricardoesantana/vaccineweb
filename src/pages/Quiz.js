import React, { useState } from 'react';
import '../App.css';
import 'materialize-css/dist/css/materialize.min.css';

const questions = {
    easy: [
      {
        question: 'Qual vacina previne a poliomielite?',
        options: ['BCG', 'DTP', 'Sabin', 'Tríplice viral'],
        answer: 'Sabin',
      },
      {
        question: 'Qual é o componente mais importante da vacina contra a gripe?',
        options: ['Vírus inativo', 'Adjuvante', 'Mercúrio', 'Vírus atenuado'],
        answer: 'Vírus inativo',
      },
      {
        question: 'Quem desenvolveu a primeira vacina contra a varíola?',
        options: ['Albert Sabin', 'Edward Jenner', 'Jonas Salk', 'Louis Pasteur'],
        answer: 'Edward Jenner',
      },
    ],
    medium: [
      {
        question: 'Qual é o número recomendado de doses da vacina MMR (tríplice viral)?',
        options: ['1', '2', '3', '4'],
        answer: '2',
      },
      {
        question: 'Qual doença é prevenida pela vacina contra a Hepatite B?',
        options: ['Hepatite A', 'Hepatite B', 'Hepatite C', 'HIV'],
        answer: 'Hepatite B',
      },
      {
        question: 'A vacina contra a febre amarela é administrada com que frequência?',
        options: ['1 vez ao ano', '1 vez a cada 5 anos', '1 vez a cada 10 anos', '1 vez na vida'],
        answer: '1 vez a cada 10 anos',
      },
    ],
    hard: [
      {
        question: 'Qual é o organismo responsável pela certificação de vacinas nos EUA?',
        options: ['FDA', 'CDC', 'OMS', 'NIH'],
        answer: 'FDA',
      },
      {
        question: 'Em que ano a vacina contra a pólio foi introduzida no Brasil?',
        options: ['1956', '1962', '1973', '1980'],
        answer: '1956',
      },
      {
        question: 'Qual doença é prevenida pela vacina pneumocócica conjugada?',
        options: ['Tuberculose', 'Pneumonia', 'Sarampo', 'Difteria'],
        answer: 'Pneumonia',
      },
    ],
  };
  

  const Quiz = () => {
    const [level, setLevel] = useState('easy');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showCorrect, setShowCorrect] = useState(null); // Estado para mostrar feedback da resposta correta
    const [selectedOption, setSelectedOption] = useState(null); // Estado para armazenar a opção selecionada pelo usuário
  
    const handleAnswerButtonClick = (selectedOption) => {
      if (showCorrect === null) {
        console.log('dentro')
        setSelectedOption(selectedOption);
        if (selectedOption === questions[level][currentQuestion].answer) {
          setScore(score + 1);
        }
        setShowCorrect(selectedOption === questions[level][currentQuestion].answer);
      }
      console.log('fora')
    };
  
    const handleNextButtonClick = () => {
      setSelectedOption(null);
      setShowCorrect(null);
      console.log('ui')
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions[level].length) {
        setCurrentQuestion(nextQuestion);
        console.log(level);
        console.log(currentQuestion);
        console.log(nextQuestion);
      } else {
        if (level === 'easy') {
          setLevel('medium');
          setCurrentQuestion(0);
          console.log('easy!');
        } else if (level === 'medium') {
          setLevel('hard');
          setCurrentQuestion(0);
        } else {
          if (currentQuestion + 1 >= questions.hard.length) {
            setShowScore(true);
            console.log('score!');
        } else {
            setCurrentQuestion(nextQuestion);
            console.log('cq!');
          }
        }
      }
    };
  
    const handleRestartButtonClick = () => {
      setLevel('easy');
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
      setShowCorrect(null);
      setSelectedOption(null);
    };

    const handleHomeButtonClick = () => {
      window.location.assign("/home");
    };
    
    return (
      
      
      <div className="quiz-container">
        {showScore ? (
          <div className="score-section">
            Você acertou {score} de {questions.hard.length + questions.medium.length + questions.easy.length} perguntas!
            <button onClick={handleRestartButtonClick}>Reiniciar</button>
            <button onClick={handleHomeButtonClick}>Página Inicial</button>
          </div>
        ) : (
          <div className="question-section">
            <div className="question-count">
              Nível: {level} | Pergunta {currentQuestion + 1} de {questions[level].length}
            </div>
            <div className="question-text">{questions[level][currentQuestion].question}</div>
            <div className="answer-options">
              {questions[level][currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerButtonClick(option)}
                  className={
                    selectedOption === option
                      ? showCorrect
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  }
                  disabled={showCorrect !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {showCorrect && <div className="feedback correct">Resposta correta!</div>}
            {showCorrect === false && (
              <div className="feedback incorrect">Resposta incorreta! A alternativa correta é: {questions[level][currentQuestion].answer}</div>
            )}
            {showCorrect !== null && (
              <button onClick={handleNextButtonClick} disabled={showCorrect === null || currentQuestion >= questions[level].length}>
                {(level === 'hard' && currentQuestion + 1 >= questions.hard.length)
                  ? 'Ver resultado'
                  : 'Próxima pergunta'}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default Quiz;