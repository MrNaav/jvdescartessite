import React, { useState, useEffect } from 'react';
import './AdicionarLocalidades.css';

const AdicionarLocalidades = () => {
    const [nome, setNome] = useState('');
    const [horarioFuncionamento, setHorarioFuncionamento] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairros, setBairros] = useState([]);
    const [selectedBairro, setSelectedBairro] = useState('');

    useEffect(() => {
        const fetchBairros = async () => {
            try {
                const response = await fetch('http://localhost:3000/bairros');
                if (!response.ok) {
                    throw new Error('Erro ao buscar bairros');
                }
                const data = await response.json();
                setBairros(data);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchBairros();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/local_descarte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    horario_funcionamento: horarioFuncionamento,
                    endereco: {
                        rua,
                        numero,
                        complemento,
                        bairro_id: selectedBairro
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar localidade');
            }

            alert('Localidade adicionada com sucesso!');
            
            // Limpar campos após a adição bem-sucedida
            setNome('');
            setHorarioFuncionamento('');
            setRua('');
            setNumero('');
            setComplemento('');
            setSelectedBairro('');
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
                <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <label htmlFor="horarioFuncionamento">Horário de Funcionamento:</label>
                <input type="text" id="horarioFuncionamento" name="horarioFuncionamento" value={horarioFuncionamento} onChange={(e) => setHorarioFuncionamento(e.target.value)} required />
                <label htmlFor="rua">Rua:</label>
                <input type="text" id="rua" name="rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
                <label htmlFor="numero">Número:</label>
                <input type="text" id="numero" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
                <label htmlFor="complemento">Complemento:</label>
                <input type="text" id="complemento" name="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                <label htmlFor="bairro">Bairro:</label>
                <select id="bairro" name="bairro" value={selectedBairro} onChange={(e) => setSelectedBairro(e.target.value)} className="select-css" required>
                    <option value="">Selecione...</option>
                    {bairros.map(bairro => (
                        <option key={bairro.id} value={bairro.id}>
                            {`${bairro.nome}, ${bairro.cidade}, ${bairro.estado}, ${bairro.pais}`}
                        </option>
                    ))}
                </select>
                <button type="submit">Adicionar</button>
            </form>
        </section>
    );
};

export default AdicionarLocalidades;
