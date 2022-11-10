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
    data: QuestionListType;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    setQuestionIndexCookies: any;
    removeCookies: any;
};
const QuestionContext = createContext<QuestionContextType>({
    questionIndex: 0,
    data: questionList[0],
    score: 0,
    setScore: () => {},
    setQuestionIndex: () => {},
    setQuestionIndexCookies: () => {},

    removeCookies: () => {},
});

export const QuestionContextProvider = (props: any) => {
    const [cookies, setCookies, removeCookies] = useCookies([
        'user_email',
        'question_history',
    ]);
    const [questionIndex, setQuestionIndex] = useState(
        cookies.question_history || 0
    );
    const [score, setScore] = useState(0);
    const data = questionList[questionIndex];

    const setQuestionIndexCookies = (props: any) =>
        setCookies('question_history', props);

    // useEffect(() => {
    //     cookies.question_history
    //         ? setQuestionIndex(+cookies.question_history)
    //         : setQuestionIndexCookies(0);
    // }, [setCookies, cookies.question_history]);

    useEffect(() => {
        setQuestionIndexCookies(questionIndex);
    }, [questionIndex]);

    return (
        <QuestionContext.Provider
            value={{
                data,
                questionIndex,
                setScore,
                score,
                setQuestionIndexCookies,
                setQuestionIndex,
                removeCookies,
            }}
        >
            {props.children}
        </QuestionContext.Provider>
    );
};

export default QuestionContext;
