import { useContext } from 'react';
import Card from '../../components/Card/Card';
import QuestionContext, {
    QuestionListType,
} from '../../contexts/QuestionContext';
import UserContext from '../../contexts/UserContext';
import styles from './QuestionPage.module.css';

const QuestionPage = () => {
    console.log('renderquestionpage :>> ');
    const { data, questionIndex, setQuestionIndex } =
        useContext(QuestionContext);

    const { resetUser } = useContext(UserContext);

    const cardContent = (options: QuestionListType['options']) => (
        <>
            {options.map((item, index) => (
                <label className={styles.option} key={index}>
                    <input
                        type="radio"
                        id="id"
                        name="question"
                        value={item.value}
                        required
                        onChange={(event) => {
                            console.log('event', event);
                            // setAnswerCheck(event.target.value);
                        }}
                    />
                    <div>{item.label}</div>
                </label>
            ))}
        </>
    );

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setQuestionIndex(+questionIndex + 1);
    };

    const handleBack = () => {
        console.log('questionIndex :>> ', questionIndex);
        if (+questionIndex === 0) {
            resetUser();
        } else {
            setQuestionIndex(+questionIndex - 1);
        }
    };

    return (
        <Card
            subTitle={data.title}
            content={cardContent(data.options)}
            okText={'next'}
            cancelText={'back'}
            onCancel={handleBack}
            onSubmit={handleSubmit}
        />
    );
};

export default QuestionPage;
