// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContatosClientesPage from './pages/ContatosClientesPage';
import AtualizarLocalidadesPage from './pages/AtualizarLocalidadesPage'; // Importe a página de atualização de localidades
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contatos-clientes" element={<ContatosClientesPage />} />
                    <Route path="/atualizar-localidades" element={<AtualizarLocalidadesPage />} /> {/* Nova rota */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
