import React, { useState } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './ContatosClientesPage.css';

const ContatosClientesPage = () => {
    const [selectedContact, setSelectedContact] = useState({
        id: "1",
        nome: "Cliente 1",
        celular: "(99) 99999-9999",
        email: "cliente1@example.com",
        motivo: "Dúvida",
        detalhes: "Detalhes do contato..."
    });

    const [resposta, setResposta] = useState('');

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        // Resetar a resposta do consultor
        setResposta('');
    };

    const handleChangeResposta = (event) => {
        setResposta(event.target.value);
    };

    const contatos = [
        { id: "1", nome: "Cliente 1", motivo: "Dúvida", celular: "(99) 99999-9999", email: "cliente1@example.com", detalhes: "Detalhes do contato..." },
        { id: "2", nome: "Cliente 2", motivo: "Reclamação", celular: "(98) 88888-8888", email: "cliente2@example.com", detalhes: "Detalhes do contato..." },
        // Adicione mais contatos conforme necessário
    ];

    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Header />
                <main>
                    <h2>Responder Contatos de Clientes</h2>
                    <div className="cliente-info">
                        <div className="info-group">
                            <label className="label-id">ID:</label>
                            <span className="id">{selectedContact.id}</span>
                        </div>
                        <div className="info-group">
                            <label className="label-nome">Nome:</label>
                            <span className="nome">{selectedContact.nome}</span>
                        </div>
                        <div className="info-group">
                            <label className="label-celular">Celular:</label>
                            <span className="celular">{selectedContact.celular}</span>
                        </div>
                        <div className="info-group">
                            <label className="label-email">E-mail:</label>
                            <span className="email">{selectedContact.email}</span>
                        </div>
                    </div>
                    <div className="cliente-info">
                        <div className="info-group">
                            <label className="label-motivo">Motivo do Contato:</label>
                            <span className="motivo">{selectedContact.motivo}</span>
                        </div>
                        <div className="info-group">
                            <label className="label-detalhes">Detalhes:</label>
                            <span className="detalhes">{selectedContact.detalhes}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="resposta">Resposta do Consultor:</label>
                        <textarea
                            id="resposta"
                            name="resposta"
                            value={resposta}
                            onChange={handleChangeResposta}
                            className="resposta-consultor"
                        ></textarea>
                    </div>

                    <button type="submit">Responder</button>
                    
                    <h2>Todos os Contatos de Clientes</h2>
                    <ul className="contatos-list">
                        {contatos.map((contact) => (
                            <li key={contact.id} onClick={() => handleContactClick(contact)}>
                                ID: <span className="id">{contact.id}</span> 
                                Nome: <span className="nome">{contact.nome}</span> 
                                Motivo: <span className="motivo">{contact.motivo}</span>
                            </li>
                        ))}
                    </ul>

                </main>
            </div>
        </div>
    );
};

export default ContatosClientesPage;
