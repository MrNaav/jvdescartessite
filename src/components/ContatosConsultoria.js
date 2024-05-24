// ContatosConsultoria.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContatosConsultoria.css';

const ContatosConsultoria = ({ handleContatoClick }) => {
    const [contatos, setContatos] = useState([]);

    useEffect(() => {
        const fetchContatos = async () => {
            try {
                const response = await axios.get('http://192.168.1.22:3000/contatos_consultoria');
                setContatos(response.data);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchContatos();
    }, []);

    return (
        <section className="consulta-contatos">
            <h2>Consulta de Contatos de Consultoria</h2>
            <div className="contatos-list">
                {contatos.map(contato => (
                    <div key={contato.id} className="contato-item" onClick={() => handleContatoClick(contato)}>
                        <p><strong>ID:</strong> {contato.id}</p>
                        <p><strong>Nome do Contatante:</strong> {contato.nome}</p>
                        <p><strong>Email:</strong> {contato.email}</p>
                        <p><strong>Contato:</strong> {contato.celular}</p>
                        <p><strong>Motivo do Contato:</strong> {contato.motivo}</p>
                        <p><strong>Detalhes:</strong> {contato.detalhes}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContatosConsultoria;
