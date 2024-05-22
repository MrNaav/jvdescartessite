import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import LocalidadesPage from './pages/LocalidadesPage';
import ContatosClientesPage from './pages/ContatosClientesPage';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contatosClientes" element={<ContatosClientesPage />} />
                    <Route path="/adicionarLocalidades" element={<LocalidadesPage />} /> {/* Nova rota */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
