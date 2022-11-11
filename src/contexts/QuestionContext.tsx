import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const questionList = [
    {
        title: "Q1: A car engine's job is to:",
        id: 1,
        options: [
            { label: 'convert fuel into heat', value: 'false', id: '1' },
            { label: 'convert fuel into motion', value: 'true', id: '2' },
            { label: 'convert fuel into exhaust', value: 'false', id: '3' },
            { label: 'decorate the car', value: 'false', id: '4' },
        ],
    },
    {
        title: "Q2: A car engine's job is to:",
        id: 2,
        options: [
            { label: '2convert fuel into heat', value: 'false', id: '1' },
            { label: '2convert fuel into motion', value: 'true', id: '2' },
            { label: '2convert fuel into exhaust', value: 'false', id: '3' },
            { label: '2decorate the car', value: 'false', id: '4' },
        ],
    },
    {
        title: "Q3: A car engine's job is to:",
        id: 3,
        options: [
            { label: '3convert fuel into heat', value: 'false', id: '1' },
            { label: '3convert fuel into motion', value: 'true', id: '2' },
            { label: '3convert fuel into exhaust', value: 'false', id: '3' },
            { label: '3decorate the car', value: 'false', id: '4' },
        ],
    },
    {
        title: "Q4: A car engine's job is to:",
        id: 4,
        options: [
            { label: '4convert fuel into heat', value: 'false', id: '1' },
            { label: '4convert fuel into motion', value: 'true', id: '2' },
            { label: '4convert fuel into exhaust', value: 'false', id: '3' },
            { label: '4decorate the car', value: 'false', id: '4' },
        ],
    },
    {
        title: "Q5: A car engine's job is to:",
        id: 5,
        options: [
            { label: '5convert fuel into heat', value: 'false', id: '1' },
            { label: '5convert fuel into motion', value: 'true', id: '2' },
            { label: '5convert fuel into exhaust', value: 'false', id: '3' },
            { label: '5decorate the car', value: 'false', id: '4' },
        ],
    },
];

export type QuestionListType = {
    title: string;
    id: number;
    options: { label: string; value: string; id: string }[];
};

type QuestionContextType = {
    questionIndex: number;
    question: QuestionListType;
    maxQuestions: number;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    setSelection: React.Dispatch<React.SetStateAction<boolean>>;
    updateResult: (revert?: 'revert') => void;
    result: { questionIndex: number; result: boolean }[] | [];
};
const QuestionContext = createContext<QuestionContextType>({
    questionIndex: 0,
    question: questionList[0],
    maxQuestions: questionList.length,
    setQuestionIndex: () => {},
    setSelection: () => {},
    updateResult: () => {},
    result: [],
});

export const QuestionContextProvider = (props: any) => {
    const [cookies, setCookie] = useCookies(['question_history', 'result']);
    const [questionIndex, setQuestionIndex] = useState(
        +cookies.question_history || 0
    );

    const question = questionList[questionIndex];
    const maxQuestions = questionList.length;
    const [result, setResult] = useState<QuestionContextType['result']>(
        cookies.result || []
    );

    const [selection, setSelection] = useState(false);

    useEffect(() => {
        setCookie('question_history', questionIndex);
        setCookie('result', result);
    }, [questionIndex, setCookie, result]);

    const updateResult = (revert?: 'revert') => {
        const newResult = revert
            ? result.filter((item) => item.questionIndex !== questionIndex - 1)
            : result &&
              !result.some((item) => item.questionIndex === questionIndex)
            ? [...result, { questionIndex: questionIndex, result: selection }]
            : result?.map((item) => {
                  if (item.questionIndex === questionIndex) {
                      return { ...item, result: selection };
                  }
                  return item;
              });
        setResult(newResult);
    };

    return (
        <QuestionContext.Provider
            value={{
                question,
                questionIndex,
                maxQuestions,
                // setScore,
                // score,
                setQuestionIndex,
                setSelection,
                updateResult,
                result,
                // getScore,
            }}
        >
            {props.children}
        </QuestionContext.Provider>
    );
};

export default QuestionContext;
