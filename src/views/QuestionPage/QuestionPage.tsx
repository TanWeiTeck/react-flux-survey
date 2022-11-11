import { useContext } from 'react';
import Card from '../../components/Card/Card';
import QuestionContext, {
    QuestionListType,
} from '../../contexts/QuestionContext';
import UserContext from '../../contexts/UserContext';
import styles from './QuestionPage.module.css';

const QuestionPage = () => {
    const {
        question,
        maxQuestions,
        questionIndex,
        setQuestionIndex,
        setSelection,
        updateResult,
    } = useContext(QuestionContext);

    const { resetUser } = useContext(UserContext);
    const cardContent = (options: QuestionListType['options']) => (
        <>
            {options.map((item) => (
                <label className={styles.option} key={item.id + questionIndex}>
                    <input
                        type="radio"
                        name={question.id.toString()}
                        id={item.id}
                        value={item.value}
                        required
                        onChange={(event) => {
                            setSelection(event.target.value === 'true');
                        }}
                    />
                    <div>{item.label}</div>
                </label>
            ))}
        </>
    );

    const handleSubmit = (event: any) => {
        event.preventDefault();
        updateResult();
        if (maxQuestions !== questionIndex + 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            setQuestionIndex(0);
            window.location.assign('/result');
        }
    };

    const handleBack = () => {
        updateResult('revert');
        if (questionIndex === 0) {
            resetUser('/');
        } else {
            setQuestionIndex(questionIndex - 1);
        }
    };

    const progressPercentage =
        ((+questionIndex + 1) / +maxQuestions) * 100 + '%';

    return (
        <>
            <Card
                subTitle={question.title}
                content={cardContent(question.options)}
                okText={'next'}
                cancelText={'back'}
                onCancel={handleBack}
                onSubmit={handleSubmit}
                progressBar={true}
                progress={progressPercentage}
            />
        </>
    );
};

export default QuestionPage;
