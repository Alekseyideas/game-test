import React from 'react';
import './App.scss';
import { Circle } from './components/Circle';
import { useApp } from './hooks/useApp';
import { IconCheck } from './svgs/IconCheck';
import { IconError } from './svgs/IconError';
import { IconSuccess } from './svgs/IconSuccess';
function App() {
  const {
    submitHandler,
    question,
    loading,
    currAnswer,
    testEnd,
    currentQuestion,
    testSuccess,
    questionsCount,
    setCurAnswer,
    showR,
    setShowR,
    respData,
  } = useApp();

  if (loading) return <div>Зачекайте ...</div>;

  if (!question[currentQuestion]) return <div>Нема запитань</div>;

  const calcNum = +((currentQuestion / questionsCount) * 100).toFixed();

  if (testEnd && testSuccess)
    return (
      <div className="testWrapper">
        <div className="testResultIcon testResultIcon--success">
          <IconSuccess />
        </div>
        <div className="testQuestionWrapper" dangerouslySetInnerHTML={{ __html: respData }} />
      </div>
    );
  if (testEnd && !testSuccess)
    return (
      <div className="testWrapper">
        <div className="testResultIcon testResultIcon--fail">
          <IconError />
        </div>
        <div className="testQuestionWrapper" dangerouslySetInnerHTML={{ __html: respData }} />
      </div>
    );

  return (
    <div>
      <h4 className="testTitle">{question[currentQuestion]?.question?.question_text}</h4>
      <div className="testWrapper">
        <Circle question={currentQuestion} num={calcNum} />
        <div className="testQuestionWrapper">
          <div className="testAnswers">
            {question[currentQuestion].answers.map((answer, i) => (
              <div
                key={answer.answer_id}
                onClick={() => setCurAnswer({ answer, question: question[currentQuestion].number })}
                className={`testSelectWrapper ${
                  String(currAnswer?.answer.answer_id) === String(answer.answer_id) ? 'active' : ''
                }`}
              >
                <div className="testImageWrapper">
                  <img
                    src={answer.answer_pic}
                    alt={answer.answer_text}
                    onLoad={() => {
                      if (question[currentQuestion].answers.length - 1 === i) {
                        setShowR(true);
                      }
                    }}
                  />
                </div>
                {showR ? <IconCheck /> : null}
              </div>
            ))}
          </div>
          {showR ? (
            <button
              type="button"
              className="testBtn"
              onClick={() => submitHandler(currAnswer)}
              disabled={!currAnswer?.answer.answer_id}
            >
              Вiдповiсти
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
