import React from 'react';
import { TQuestion, TUserAnswer } from '../store/types';
import { callApi } from '../utils/callApi';
import { useMount } from './useMount';
// declare var document: Document;

export const useApp = () => {
  const [showR, setShowR] = React.useState(false);
  const [questionsCount, setQuestionsCount] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [question, setQuestions] = React.useState<TQuestion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [answers, setAnswers] = React.useState<TUserAnswer[]>([]);
  const [currAnswer, setCurAnswer] = React.useState<TUserAnswer | null>(null);
  const [testEnd, setTestEnd] = React.useState(false);
  const [testSuccess, setTestSuccess] = React.useState(false);
  const [testId, setTestId] = React.useState<null | string>(null);
  const [respData, setRespData] = React.useState('');

  const fn = async () => {
    if (document.getElementById('sp')) document.getElementById('sp')!.style.display = 'flex';
    if (document.getElementById('sp0')) document.getElementById('sp0')!.style.display = 'flex';
    if (document.getElementById('test_id')) {
      const input = document.getElementById('test_id') as HTMLInputElement;
      setTestId(input.value);
    }

    try {
      const data = await callApi('get', '/getTestQuestions');
      setQuestionsCount(data.total_question || 0);
      setQuestions(data.questions);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useMount(fn);

  const submitHandler = async (newAnswer: TUserAnswer | null | undefined) => {
    if (!newAnswer) return null;
    if (currentQuestion !== questionsCount - 1) {
      const oldAnswers = [...answers];
      setShowR(false);
      oldAnswers.push(newAnswer);
      setAnswers(oldAnswers);
      setCurAnswer(null);
      return setCurrentQuestion((oldQ) => oldQ + 1);
    }
    setLoading(true);

    try {
      const data = await callApi('post', '/putTestResult');
      setRespData(data.result_message || 'Нема повiдомлення');
      setTestSuccess(data.success);
      setTestEnd(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }

    console.log(
      JSON.stringify({
        testId,
        answers,
      })
    );

    return null;
  };

  return {
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
  };
};
