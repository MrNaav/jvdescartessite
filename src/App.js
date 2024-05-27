import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import ItensPage from './pages/ItensPage';
import LocalidadesPage from './pages/LocalidadesPage';
import ContatosClientesPage from './pages/ContatosClientesPage';
import LoginPage from './pages/LoginPage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isAuthenticated = () => {
        return isLoggedIn || localStorage.getItem('token');
    };

    const PrivateRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" replace />;
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                    <Route
                        path="/Home"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/itens"
                        element={
                            <PrivateRoute>
                                <ItensPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/contatosClientes"
                        element={
                            <PrivateRoute>
                                <ContatosClientesPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/adicionarLocalidades"
                        element={
                            <PrivateRoute>
                                <LocalidadesPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
