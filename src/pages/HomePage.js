// src/pages/HomePage.js
import React from 'react';
import AdicionarItens from '../components/AdicionarItens';
import ConsultaItens from '../components/ConsultaItens';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Header />
                <main>
                    <AdicionarItens />
                    <ConsultaItens />
                </main>
            </div>
        </div>
    );
};

export default HomePage;