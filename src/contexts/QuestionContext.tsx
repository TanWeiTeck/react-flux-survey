import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const questionList = [
    {
        title: "Q1: A car engine's job is to:",
        options: [
            { label: 'convert fuel into heat', value: 'false' },
            { label: 'convert fuel into motion', value: 'true' },
            { label: 'convert fuel into exhaust', value: 'false' },
            { label: 'decorate the car', value: 'false' },
        ],
    },
    {
        title: "Q2: A car engine's job is to:",
        options: [
            { label: '2convert fuel into heat', value: 'false' },
            { label: '2convert fuel into motion', value: 'true' },
            { label: '2convert fuel into exhaust', value: 'false' },
            { label: '2decorate the car', value: 'false' },
        ],
    },
    {
        title: "Q3: A car engine's job is to:",
        options: [
            { label: '3convert fuel into heat', value: 'false' },
            { label: '3convert fuel into motion', value: 'true' },
            { label: '3convert fuel into exhaust', value: 'false' },
            { label: '3decorate the car', value: 'false' },
        ],
    },
];

export type QuestionListType = {
    title: string;
    options: { label: string; value: string }[];
};

type QuestionContextType = {
    questionIndex: number;
    question: QuestionListType;
    maxQuestions: number;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
};
const QuestionContext = createContext<QuestionContextType>({
    questionIndex: 0,
    question: questionList[0],
    maxQuestions: questionList.length,
    score: 0,
    setScore: () => {},
    setQuestionIndex: () => {},
});

export const QuestionContextProvider = (props: any) => {
    const [cookies, setCookie] = useCookies(['question_history']);
    const [questionIndex, setQuestionIndex] = useState(
        cookies.question_history || 0
    );
    const [score, setScore] = useState(0);
    const question = questionList[questionIndex];
    const maxQuestions = questionList.length;

    useEffect(() => {
        setCookie('question_history', questionIndex);
    }, [questionIndex, setCookie]);

    return (
        <QuestionContext.Provider
            value={{
                question,
                questionIndex,
                maxQuestions,
                setScore,
                score,
                setQuestionIndex,
            }}
        >
            {props.children}
        </QuestionContext.Provider>
    );
};

export default QuestionContext;
