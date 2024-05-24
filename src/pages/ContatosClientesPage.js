// ContatosClientesPage.js

import React, { useState } from 'react';
import ContatosConsultoria from '../components/ContatosConsultoria';
import ResponderContatos from '../components/ResponderContatos';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './ContatosClientesPage.css';

const ContatosClientesPage = () => {
    const [selectedContato, setSelectedContato] = useState(null);
    const [resposta, setResposta] = useState('');

    const handleContatoClick = (contato) => {
        setSelectedContato(contato);
    };

    const handleChange = (e) => {
        setResposta(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implemente a função de envio de resposta aqui
    };

    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Header />
                <main>
                    <ContatosConsultoria handleContatoClick={handleContatoClick} />
                    {selectedContato && ( // Renderiza apenas se um contato for selecionado
                        <ResponderContatos
                            selectedContato={selectedContato}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            resposta={resposta}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default ContatosClientesPage;
