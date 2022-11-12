import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import QuestionContext from '../../contexts/QuestionContext';

import Card from '../../components/Card/Card';
import styles from './QuestionPage.module.css';

const QuestionPage = () => {
    const navigate = useNavigate();

    const { resetUser } = useContext(UserContext);
    const {
        maxQuestions,
        currentQuestionIndex,
        currentQuestion,
        currentProgress,
        setCurrentIndex,
        setSelectedAnswer,
        updateResult,
    } = useContext(QuestionContext);

    const lastQuestion = maxQuestions === currentQuestionIndex + 1;
    const firstQuestion = currentQuestionIndex === 0;

    const cardContent = (
        <>
            {currentQuestion.options.map((item) => (
                <label
                    className={styles.option}
                    key={currentQuestionIndex + item.id}
                >
                    <input
                        type="radio"
                        name={currentQuestion.id.toString()}
                        id={item.id}
                        value={item.value}
                        required
                        onChange={(event) => {
                            setSelectedAnswer(event.target.value === 'true');
                        }}
                    />
                    <div>{item.label}</div>
                </label>
            ))}
        </>
    );

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        updateResult();

        if (lastQuestion) {
            navigate('/result', { replace: true });
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentQuestionIndex + 1);
        }
    };

    const handleBack = () => {
        updateResult('revert');

        if (firstQuestion) {
            resetUser('/');
        } else {
            setCurrentIndex(currentQuestionIndex - 1);
        }
    };

    const cardSubTitle = (
        <div className={styles.subtitle}>
            <div className={styles.number}>Q{currentQuestionIndex + 1}: </div>
            <div className={styles.question}>{currentQuestion.title}</div>
        </div>
    );

    return (
        <>
            <Card
                subTitle={cardSubTitle}
                content={cardContent}
                okText={'next'}
                onSubmit={handleSubmit}
                cancelText={'back'}
                onCancel={handleBack}
                progressBar={true}
                progress={currentProgress}
            />
        </>
    );
};

export default QuestionPage;
