import React, { useState } from 'react';
import axios from 'axios';
import './AdicionarLocalidades.css';

const AdicionarLocalidades = () => {
    const [nome, setNome] = useState('');
    const [horarioFuncionamento, setHorarioFuncionamento] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState(''); 
    const [estado, setEstadoNome] = useState(''); 
    const [pais, setPaisNome] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://192.168.0.109:3000/local_descarte', {
                nome,
                horario_funcionamento: horarioFuncionamento,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado, 
                pais, 
            });

            if (response.status !== 201) {
                throw new Error('Erro ao adicionar localidade');
            }

            alert('Localidade adicionada com sucesso!');
            
            setNome('');
            setHorarioFuncionamento('');
            setRua('');
            setNumero('');
            setComplemento('');
            setCidade('');
            setEstadoNome(''); 
            setBairro('');
            setPaisNome(''); 
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar localidade');
        }
    };

    return (
        <section id="adicionar-localidades">
            <h2>Adicionar Localidade</h2>
            <form id="form-adicionar-localidade" onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do Local de Descarte:</label>
                <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required maxLength="50"/>
                <label htmlFor="horarioFuncionamento">Horário de Funcionamento:</label>
                <input type="text" id="horarioFuncionamento" name="horarioFuncionamento" value={horarioFuncionamento} onChange={(e) => setHorarioFuncionamento(e.target.value)} required maxLength="50"/>
                <label htmlFor="rua">Rua:</label>
                <input type="text" id="rua" name="rua" value={rua} onChange={(e) => setRua(e.target.value)} required maxLength="30"/>
                <label htmlFor="numero">Número:</label>
                <input type="text" id="numero" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
                <label htmlFor="complemento">Complemento:</label>
                <input type="text" id="complemento" name="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} maxLength="20"/>
                <label htmlFor="bairro">Bairro:</label>
                <input type="text" id="bairro" name="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required maxLength="50"/> 
                <label htmlFor="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required maxLength="30"/>
                <label htmlFor="estado">Estado:</label>
                <input type="text" id="estado" name="estado" value={estado} onChange={(e) => setEstadoNome(e.target.value)} required maxLength="30"/> 
                <label htmlFor="pais">País:</label>
                <input type="text" id="pais" name="pais" value={pais} onChange={(e) => setPaisNome(e.target.value)} required maxLength="30"/> 
                <button type="submit">Adicionar</button>
            </form>
        </section>
    );
};

export default AdicionarLocalidades;
