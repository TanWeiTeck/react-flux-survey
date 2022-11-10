import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type UserContextType = {
    userEmail: string;
    setUserEmail: React.Dispatch<React.SetStateAction<string>>;
    resetUser: () => void;
};

const UserContext = createContext<UserContextType>({
    userEmail: '',
    setUserEmail: () => {},
    resetUser: () => {},
});

export const UserContextProvider = (props: any) => {
    const [cookies, setCookies, removeCookies] = useCookies([
        'user_email',
        'question_history',
    ]);
    const [userEmail, setUserEmail] = useState(cookies.user_email || '');

    useEffect(() => {
        userEmail && setCookies('user_email', userEmail);
    }, [userEmail, setCookies]);

    const resetUser = () => {
        removeCookies('user_email');
        removeCookies('question_history');
        window.location.assign('/');
    };

    return (
        <UserContext.Provider
            value={{
                userEmail,
                setUserEmail,
                resetUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
