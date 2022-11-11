import { useContext } from 'react';
import Card from '../../components/Card/Card';

import styles from './WelcomePage.module.css';
import UserContext from '../../contexts/UserContext';

const WelcomePage = () => {
    const { userInfo, setUserInfo, resetUser } = useContext(UserContext);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        window.location.assign('/question');
    };

    const validityCheck =
        userInfo.name.trim().length > 3 &&
        userInfo.email.trim().length > 3 &&
        userInfo.email.includes('@')
            ? false
            : true;

    const cardContent = (
        <div className={styles.container}>
            <label htmlFor="email">
                Fill in your Name & Email to get started
            </label>
            <div className={styles.input}>
                <input
                    type="text"
                    onChange={(event) => {
                        resetUser();
                        setUserInfo((prev) => ({
                            ...prev,
                            name: event.target.value,
                        }));
                    }}
                    placeholder="name"
                    autoFocus={true}
                    value={userInfo.name}
                />
                <input
                    type="email"
                    onChange={(event) => {
                        resetUser();
                        setUserInfo((prev) => ({
                            ...prev,
                            email: event.target.value,
                        }));
                    }}
                    placeholder="email"
                    value={userInfo.email}
                />
            </div>
        </div>
    );

    return (
        <Card
            title={'It only takes 5 minutes to earn Rm10 voucher.'}
            content={cardContent}
            onSubmit={handleSubmit}
            btnDisable={validityCheck}
            okText={'start'}
        />
    );
};

export default WelcomePage;
