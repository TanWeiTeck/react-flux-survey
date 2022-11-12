import { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import UserContext from './contexts/UserContext';

import WelcomePage from './views/WelcomePage/WelcomePage';
import QuestionPage from './views/QuestionPage/QuestionPage';
import ResultPage from './views/ResultPage/ResultPage';

function App() {
    const { userInfo } = useContext(UserContext);

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<WelcomePage />}></Route>
                    <Route
                        path="/question"
                        element={
                            !(userInfo.email && userInfo.name) ? (
                                <Navigate to={'/'} replace />
                            ) : (
                                <QuestionPage />
                            )
                        }
                    />
                    <Route
                        path="/result"
                        element={
                            !(userInfo.email && userInfo.name) ? (
                                <Navigate to={'/'} replace />
                            ) : (
                                <ResultPage />
                            )
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
