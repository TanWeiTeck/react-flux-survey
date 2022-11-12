import React, {
    createContext,
    PropsWithChildren,
    useEffect,
    useState,
} from 'react';
import { useCookies } from 'react-cookie';

const questionList: QuestionItemType[] = [
    {
        title: "A car engine's job is to?",
        id: 1,
        options: [
            { label: 'convert fuel into heat', value: 'false', id: '1' },
            { label: 'convert fuel into motion', value: 'true', id: '2' },
            { label: 'convert fuel into exhaust', value: 'false', id: '3' },
            { label: 'decorate the car', value: 'false', id: '4' },
        ],
    },
    {
        title: 'What is the full form of ABS, a safety technology used in cars?',
        id: 2,
        options: [
            { label: 'All lock Braking System', value: 'false', id: '1' },
            { label: 'Anti-lock Braking System', value: 'true', id: '2' },
            { label: 'Anti Braking System', value: 'false', id: '3' },
            { label: 'Anti-lock Braking Solution', value: 'false', id: '4' },
        ],
    },
    {
        title: 'A Spark Plug is used to ignite the fuel in a Diesel Engine?',
        id: 3,
        options: [
            { label: 'True', value: 'true', id: '1' },
            { label: 'False', value: 'false', id: '2' },
        ],
    },
    {
        title: 'Which company owns the following brands: Bentley, Buggati, Lamborghini & Audi?',
        id: 4,
        options: [
            { label: 'Proton', value: 'false', id: '1' },
            { label: 'Mercedes-Benz', value: 'false', id: '2' },
            { label: 'Volkswagen', value: 'true', id: '3' },
            { label: 'BMW', value: 'false', id: '4' },
        ],
    },
    {
        title: 'Which amongst the following is a South Korean carmaker',
        id: 5,
        options: [
            { label: 'Mazda', value: 'false', id: '1' },
            { label: 'Kia', value: 'true', id: '2' },
            { label: 'Honda', value: 'false', id: '3' },
            { label: 'Greely', value: 'false', id: '4' },
        ],
    },
    {
        title: 'Double Wishbone is a type of _______?',
        id: 6,
        options: [
            { label: 'Brake', value: 'false', id: '1' },
            { label: 'Engine', value: 'false', id: '2' },
            { label: 'Tire', value: 'false', id: '3' },
            { label: 'Suspension', value: 'true', id: '4' },
        ],
    },
    {
        title: 'The first modern three-point seat belt was developed by which carmaker?',
        id: 7,
        options: [
            { label: 'SAAB ', value: 'false', id: '1' },
            { label: 'Volvo', value: 'true', id: '2' },
            { label: 'Ford', value: 'false', id: '3' },
            { label: 'Toyota', value: 'false', id: '4' },
        ],
    },
    {
        title: 'What is the speed limit in Malaysia',
        id: 8,
        options: [
            { label: '80km/h', value: 'false', id: '1' },
            { label: '100km/h', value: 'false', id: '2' },
            { label: '110km/h', value: 'true', id: '3' },
            { label: '150km/h', value: 'false', id: '4' },
        ],
    },
    {
        title: 'Use of ____ in vehicle reduces pollution',
        id: 9,
        options: [
            { label: 'Petro', value: 'false', id: '1' },
            { label: 'Diesel', value: 'false', id: '2' },
            { label: 'Lithium battery', value: 'false', id: '3' },
            { label: 'Non of the above', value: 'true', id: '4' },
        ],
    },
    {
        title: 'What does a car spoiler do?',
        id: 10,
        options: [
            { label: 'Give away the end of a film', value: 'false', id: '1' },
            { label: 'Increase downforce', value: 'true', id: '2' },
            { label: 'Increase top speed', value: 'false', id: '3' },
            { label: 'Increase braking', value: 'false', id: '4' },
        ],
    },
];

type QuestionItemType = {
    title: string;
    id: number;
    options: { label: string; value: string; id: string }[];
};

type QuestionContextType = {
    maxQuestions: number;
    currentQuestionIndex: number;
    currentQuestion: QuestionItemType;
    currentProgress: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setSelectedAnswer: React.Dispatch<React.SetStateAction<boolean>>;
    updateResult: (condition?: 'revert') => void;
    result: { questionIndex: number; result: boolean }[] | [];
};

const QuestionContext = createContext<QuestionContextType>({
    maxQuestions: questionList.length,
    currentQuestionIndex: 0,
    currentQuestion: questionList[0],
    currentProgress: 0,
    setCurrentIndex: () => {},
    setSelectedAnswer: () => {},
    updateResult: () => {},
    result: [],
});

export const QuestionContextProvider = ({ children }: PropsWithChildren) => {
    const [cookies, setCookie] = useCookies(['question_index', 'result']);

    const [currentIndex, setCurrentIndex] = useState(
        +cookies.question_index || 0
    );
    const [result, setResult] = useState<QuestionContextType['result']>(
        cookies.result || []
    );
    const [selectedAnswer, setSelectedAnswer] = useState(false);

    useEffect(() => {
        setCookie('question_index', currentIndex);
        setCookie('result', result);
    }, [setCookie, currentIndex, result]);

    const removeResult = result.filter(
        (item) => item.questionIndex !== currentIndex - 1
    );
    const isResultExist = result?.some(
        (item) => item.questionIndex === currentIndex
    );
    const addNewResult = [
        ...result,
        { questionIndex: currentIndex, result: selectedAnswer },
    ];
    const mutateResult = result?.map((item) => {
        if (item.questionIndex === currentIndex) {
            return { ...item, result: selectedAnswer };
        }
        return item;
    });

    const updateResult = (condition: 'revert' | undefined) => {
        const newResult =
            condition === 'revert'
                ? removeResult
                : isResultExist
                ? mutateResult
                : addNewResult;

        setResult(newResult);
    };

    const currentProgress = (currentIndex + 1) / questionList.length;

    return (
        <QuestionContext.Provider
            value={{
                maxQuestions: questionList.length,
                currentQuestionIndex: currentIndex,
                currentQuestion: questionList[currentIndex],
                currentProgress,
                setCurrentIndex,
                setSelectedAnswer,
                updateResult,
                result,
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export default QuestionContext;
