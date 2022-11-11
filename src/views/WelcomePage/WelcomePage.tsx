import { useContext } from 'react';
import Card from '../../components/Card/Card';

import styles from './WelcomePage.module.css';
import UserContext from '../../contexts/UserContext';

const WelcomePage = () => {
    const { userEmail, setUserEmail, resetUser } = useContext(UserContext);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        window.location.assign('/question');
    };

    const disableButton =
        userEmail.length > 3 && userEmail.includes('@') ? false : true;

    const cardContent = (
        <div className={styles.container}>
            <label htmlFor="email">
                Fill in your Email address to get started
            </label>
            <input
                type="email"
                onChange={(event) => {
                    resetUser();
                    setUserEmail(event.target.value);
                }}
                placeholder="email"
                autoFocus={true}
                value={userEmail}
            />
        </div>
    );

    return (
        <Card
            title={
                'It only take 5 mins survey to see are you a car expert and earn Rm10 voucher.'
            }
            content={cardContent}
            onSubmit={handleSubmit}
            btnDisable={disableButton}
            okText={'start'}
        />
    );
};

export default WelcomePage;
