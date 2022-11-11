import { useContext, useMemo, useState } from 'react';
import Card from '../../components/Card/Card';
import QuestionContext from '../../contexts/QuestionContext';
import UserContext from '../../contexts/UserContext';
import styles from './ResultPage.module.css';

const ResultPage = () => {
    const { userInfo, resetUser } = useContext(UserContext);
    const { maxQuestions, result } = useContext(QuestionContext);
    const [score, setScore] = useState(0);

    useMemo(() => {
        result.map(
            (item) => item.result === true && setScore((prev) => prev + 1)
        );
    }, [result]);

    const cardContent = (
        <>
            <div className={styles.score}>
                Hey <span className={styles.bold}>{userInfo.name}</span>, you
                scored <span className={styles.bold}>{score}</span> out of{' '}
                <span className={styles.bold}>{maxQuestions}</span>
            </div>
            <div className={styles.description}>
                You can claim your voucher code worth{' '}
                <span className={styles.bold}>RM10</span> from your email:
                <span className={styles.email}>{userInfo.email}</span>
            </div>
        </>
    );

    return (
        <Card
            title={'Your are a car expert!!'}
            content={cardContent}
            okText={'restart'}
            onSubmit={resetUser}
            progressBar={true}
        />
    );
};

export default ResultPage;
