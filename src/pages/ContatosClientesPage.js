import React from 'react';
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
                    <h2>Responder Contatos de Clientes</h2>
                    <div className="cliente-info">
                        <div className="info-group">
                            <label className="label-id">ID:</label>
                            <span className="id">1</span>
                        </div>
                        <div className="info-group">
                            <label className="label-nome">Nome:</label>
                            <span className="nome">Cliente 1</span>
                        </div>
                        <div className="info-group">
                            <label className="label-celular">Celular:</label>
                            <span className="celular"> (99) 99999-9999</span>
                        </div>
                        <div className="info-group">
                            <label className="label-email">E-mail:</label>
                            <span className="email">cliente1@example.com</span>
                        </div>
                    </div>
                    <div className="cliente-info">
                        <div className="info-group">
                            <label className="label-motivo">Motivo do Contato:</label>
                            <span className="motivo">Dúvida</span>
                        </div>
                        <div className="info-group">
                            <label className="label-detalhes">Detalhes:</label>
                            <span className="detalhes">Detalhes do contato...</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="resposta">Resposta do Consultor:</label>
                        <textarea id="resposta" name="resposta"></textarea>
                    </div>
                    <button type="submit">Responder</button>
                    
                    <h2>Todos os Contatos de Clientes</h2>
                    {/* Listagem de todos os contatos de clientes */}
                    <ul className="contatos-list">
                        <li>ID: <span className="id">1</span> Nome: <span className="nome">Cliente 1</span> Motivo: <span className="motivo">Dúvida</span></li>
                        <li>ID: <span className="id">2</span> Nome: <span className="nome">Cliente 2</span> Motivo: <span className="motivo">Reclamação</span></li>
                    </ul>

                </main>
            </div>
        </div>
    );
};

export default ContatosClientesPage;
