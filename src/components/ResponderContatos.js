import React, { useState, useEffect } from 'react';
import './ResponderContatos.css';
import axios from 'axios';

const ResponderContatos = () => {
    const [contatos, setContatos] = useState([]);
    const [selectedContatoId, setSelectedContatoId] = useState('');
    const [resposta, setResposta] = useState('');
    const [consultor_id, setConsultorId] = useState('');

    useEffect(() => {
        const fetchContatos = async () => {
            try {
                const response = await axios.get('http://192.168.0.109:3000/contatos_consultoria');
                setContatos(response.data);
            } catch (error) {
                console.error('Erro ao buscar contatos:', error);
            }
        };

        fetchContatos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!selectedContatoId || !resposta) {
                throw new Error('Por favor, selecione um contato e insira uma resposta.');
            }

            const response = await axios.post('http://192.168.0.109:3000/resposta_contato', {
                resposta,
                contato_consultoria_id: selectedContatoId,
                consultor_id
            });

            if (response.status !== 201) {
                throw new Error('Erro ao responder contato!');
            }

            alert('Resposta enviada com sucesso!');
            
            setResposta('');
            setSelectedContatoId('');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao responder contato');
        }
    };

    return (
        <section id="responder-contatos">
            <h2>Responder Contatos do Cliente</h2>
            <form id="form-responder-contato" onSubmit={handleSubmit}>
                <label htmlFor="contato-select">Selecione o Contato:</label>
                <select id="contato-select" value={selectedContatoId} onChange={(e) => setSelectedContatoId(e.target.value)} required>
                    <option value="">Selecione...</option>
                    {contatos.map(contato => (
                        <option key={contato.id} value={contato.id}>{contato.nome}</option>
                    ))}
                </select>
                <label htmlFor="resposta">Resposta:</label>
                <textarea id="resposta" value={resposta} onChange={(e) => setResposta(e.target.value)} rows="4" required maxLength="100"></textarea>
                <button type="submit">Enviar Resposta</button>
            </form>
        </section>
    );
};

export default ResponderContatos;
