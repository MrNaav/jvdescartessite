import React from 'react';
import AdicionarLocalidades from '../components/AdicionarLocalidades';
import ConsultaLocalidades from '../components/ConsultaLocalidades';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './LocalidadesPage.css';

const LocalidadesPage = () => {
    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Header />
                <main>
                    <AdicionarLocalidades />
                    <ConsultaLocalidades />
                </main>
            </div>
        </div>
    );
};

export default LocalidadesPage;
