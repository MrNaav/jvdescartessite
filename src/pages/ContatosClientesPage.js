import React from 'react';
import ContatosConsultoria from '../components/ContatosConsultoria';
import ResponderContatos from '../components/ResponderContatos';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './ContatosClientesPage.css';

const ContatosClientesPage = () => {
    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Header />
                <main>
                    <ResponderContatos />
                    <ContatosConsultoria />
                </main>
            </div>
        </div>
    );
};

export default ContatosClientesPage;
