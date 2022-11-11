import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type UserContextType = {
    userEmail: string;
    setUserEmail: React.Dispatch<React.SetStateAction<string>>;
    resetUser: (redirectPath?: string) => void;
};

const UserContext = createContext<UserContextType>({
    userEmail: '',
    setUserEmail: () => {},
    resetUser: () => {},
});

export const UserContextProvider = (props: any) => {
    const [cookies, setCookie, removeCookie] = useCookies([
        'user_email',
        'question_history',
        'question_history2',
    ]);
    const [userEmail, setUserEmail] = useState(cookies.user_email || '');

    useEffect(() => {
        userEmail && setCookie('user_email', userEmail);
    }, [userEmail, setCookie]);

    const resetUser = (redirectPath?: string) => {
        removeCookie('user_email');
        removeCookie('question_history');
        redirectPath && window.location.assign(redirectPath);
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
