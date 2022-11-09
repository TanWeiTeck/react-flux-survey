import { useState } from 'react';
import Card from '../../components/Card/Card';
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
    const [userEmail, setUserEmail] = useState('');
    console.log('userEmail :>> ', userEmail);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        console.log('userEmail', userEmail);
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
                onChange={(event) => setUserEmail(event.target.value)}
                placeholder="email"
                autoFocus={true}
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
            cancelText={'back'}
        />
    );
};

export default WelcomePage;
