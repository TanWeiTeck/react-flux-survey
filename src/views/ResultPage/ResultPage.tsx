import { useContext, useMemo, useState } from 'react';

import QuestionContext from '../../contexts/QuestionContext';
import UserContext from '../../contexts/UserContext';

import Card from '../../components/Card/Card';
import styles from './ResultPage.module.css';

const ResultPage = () => {
    const [score, setScore] = useState(0);
    const { userInfo, resetUser } = useContext(UserContext);
    const { maxQuestions, result } = useContext(QuestionContext);

    useMemo(() => {
        result.map(
            (item) => item.result === true && setScore((prev) => prev + 1)
        );
    }, [result, setScore]);

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

    const getCardTitle = () => {
        const mark = score / maxQuestions;
        let cardTitle = '';

        if (mark === 1) {
            cardTitle = 'Your are a car expert!!';
        } else if (mark >= 0.7) {
            cardTitle = 'Your are better than most of the people!';
        } else if (mark >= 0.4) cardTitle = 'You are above Average!';
        else cardTitle = 'No worry! You still get the voucher';

        return cardTitle;
    };

    return (
        <Card
            title={getCardTitle()}
            content={cardContent}
            okText={'restart'}
            onSubmit={resetUser}
            progressBar={true}
            progress={1}
        />
    );
};

export default ResultPage;
