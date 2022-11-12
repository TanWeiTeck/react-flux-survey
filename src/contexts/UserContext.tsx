import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type UserInfoType = {
    name: string;
    email: string;
};

type UserContextType = {
    userInfo: UserInfoType;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>;
    resetUser: (redirectPath?: string) => void;
};

const UserContext = createContext<UserContextType>({
    resetUser: () => {},
    userInfo: { name: '', email: '' },
    setUserInfo: () => {},
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
    const [cookies, setCookie, removeCookie] = useCookies([
        'user_info',
        'question_index',
        'result',
    ]);

    const [userInfo, setUserInfo] = useState(
        cookies.user_info || {
            name: '',
            email: '',
        }
    );

    useEffect(() => {
        userInfo.name && userInfo.email && setCookie('user_info', userInfo);
    }, [userInfo, setCookie]);

    const resetUser = (redirectPath?: string) => {
        removeCookie('user_info');
        removeCookie('question_index');
        removeCookie('result');
        redirectPath && window.location.assign(redirectPath);
    };

    return (
        <UserContext.Provider
            value={{
                resetUser,
                userInfo,
                setUserInfo,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
