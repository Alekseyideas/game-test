import React from 'react';
import { TQuestion, TUserAnswer } from '../store/types';
import { callApi } from '../utils/callApi';
import { useMount } from './useMount';

export const useApp = () => {
  const [questionsCount, setQuestionsCount] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [question, setQuestions] = React.useState<TQuestion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [answers, setAnswers] = React.useState<TUserAnswer[]>([]);
  const [currAnswer, setCurAnswer] = React.useState<TUserAnswer | null>(null);
  const [testEnd, setTestEnd] = React.useState(false);
  const [testSuccess, setTestSuccess] = React.useState(false);

  const fn = async () => {
    try {
      const data = await callApi('get', '/tests.json');
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
      oldAnswers.push(newAnswer);
      setAnswers(oldAnswers);
      setCurAnswer(null);
      return setCurrentQuestion((oldQ) => oldQ + 1);
    }

    console.log(answers);
    setTestSuccess(true);

    setTestEnd(true);
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
  };
};
