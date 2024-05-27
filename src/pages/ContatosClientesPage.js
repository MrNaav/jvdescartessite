import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './ContatosClientesPage.css';

const ContatosClientesPage = () => {
    const [contatos, setContatos] = useState([]);
    const [selectedContato, setSelectedContato] = useState(null);
    const [resposta, setResposta] = useState('');
    const [consultorNome, setConsultorNome] = useState('');
    const [consultores, setConsultores] = useState([]);

    const fetchData = async () => {
        try {
            const contatosResponse = await axios.get('http://192.168.1.22:3000/contatos_consultoria');
            const contatosData = contatosResponse.data;

            const respostasResponse = await axios.get('http://192.168.1.22:3000/respostas');
            const respostasData = respostasResponse.data;

            const contatosSemResposta = contatosData.filter(contato => 
                !respostasData.some(resposta => resposta.contato_consultoria_id === contato.id)
            );

            setContatos(contatosSemResposta);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        const fetchConsultores = async () => {
            try {
                const response = await axios.get('http://192.168.1.22:3000/consultores');

                const nomesConsultores = response.data.map(consultor => consultor.nome);

                setConsultores(nomesConsultores);
            } catch (error) {
                console.error('Erro ao buscar consultores:', error);
            }
        };
    
        fetchConsultores();

        fetchData();
    }, []);

    const handleContatoClick = (contato) => {
        setSelectedContato(contato);
    };

    const handleChange = (e) => {
        setResposta(e.target.value);
    };

    const handleConsultorNomeChange = (e) => {
        setConsultorNome(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmacao = window.confirm("Deseja realmente enviar essa resposta?");

        if (confirmacao) {
            try {
                const consultorResponse = await axios.get(`http://192.168.1.22:3000/consultores/${consultorNome}`);

                if (consultorResponse.data.length === 0) {
                    throw new Error('Consultor não encontrado');
                }
                const consultor = consultorResponse.data[0];

                const response = await axios.post('http://192.168.1.22:3000/resposta_contato', {
                    resposta: resposta,
                    contato_consultoria_id: selectedContato.id,
                    consultor_id: consultor.id_consultor
                });

                if (response.status !== 201) {
                    throw new Error(`Erro ao enviar resposta resposta! `);
                }

                alert('Resposta enviada com sucesso!');
                setResposta('');
                setConsultorNome('');
                setSelectedContato(null);

                fetchData();
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao enviar resposta: ' + error.message);
            }
        }
    };

    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Header />
                <main>
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
                    {selectedContato && (
                        <section className="responder-contatos">
                            <h2>Responder Contatos do Cliente - ID {selectedContato.id}</h2>
                            <form className="form-responder-contato" onSubmit={handleSubmit}>
                                <div className="contato-info">
                                    <div className="contato-field">
                                        <label htmlFor="nome" className="label-container">Nome</label>
                                        <input 
                                            className="campo" 
                                            type="text" 
                                            id="nome" 
                                            name="nome" 
                                            value={selectedContato.nome} 
                                            readOnly 
                                        />
                                    </div>
                                    <div className="contato-field">
                                        <label htmlFor="email" className="label-container">Email</label>
                                        <input 
                                            className="campo" 
                                            type="text" 
                                            id="email" 
                                            name="email" 
                                            value={selectedContato.email} 
                                            readOnly 
                                        />
                                    </div>
                                    <div className="contato-field">
                                        <label htmlFor="contato" className="label-container">Contato</label>
                                        <input 
                                            className="campo" 
                                            type="text" 
                                            id="contato" 
                                            name="contato" 
                                            value={selectedContato.celular} 
                                            readOnly 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="contato-field">
                                        <label htmlFor="motivo" className="label-container">Motivo do Contato</label>
                                        <input 
                                            className="campo" 
                                            type="text" 
                                            id="motivo" 
                                            name="motivo" 
                                            value={selectedContato.motivo} 
                                            readOnly 
                                        />
                                    </div>
                                    <div className="contato-field">
                                        <label htmlFor="detalhes" className="label-container">Detalhes</label>
                                        <textarea 
                                            className="campo" 
                                            id="detalhes" 
                                            name="detalhes" 
                                            value={selectedContato.detalhes} 
                                            style={{ border: '1px solid #000000' }} 
                                            readOnly
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="contato-field">
                                    <label htmlFor="consultorNome" className="label-container">Nome do Consultor</label>
                                    <select 
                                        className="campo" 
                                        id="consultorNome" 
                                        value={consultorNome} 
                                        onChange={handleConsultorNomeChange} 
                                        required
                                    >
                                        <option value="">Selecione o consultor...</option>
                                        {consultores.map((nome, index) => (
                                            <option key={index} value={nome}>{nome}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="contato-field">
                                    <label htmlFor="resposta" className="label-container">Resposta</label>
                                    <textarea 
                                        className="campo" 
                                        id="resposta" 
                                        value={resposta} 
                                        onChange={handleChange} 
                                        rows="4" 
                                        required 
                                        maxLength="100" 
                                        style={{ border: '1px solid #000000' }}
                                    ></textarea>
                                </div>
                                <button className="button" type="submit">Enviar Resposta</button>
                            </form>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ContatosClientesPage;
