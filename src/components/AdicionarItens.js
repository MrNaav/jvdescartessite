import React, { useState, useEffect } from 'react';
import './AdicionarItens.css';

const AdicionarItens = () => {
    const [nome, setNome] = useState('');
    const [riscos, setRiscos] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localidades, setLocalidades] = useState([]);
    const [selectedLocalidade, setSelectedLocalidade] = useState('');

    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const response = await fetch('http://localhost:3000/localidades');
                if (!response.ok) {
                    throw new Error('Erro ao buscar localidades');
                }
                const data = await response.json();
                setLocalidades(data);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchLocalidades();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/item_descarte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    riscos,
                    descricao,
                    localidade_id: selectedLocalidade
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar item de descarte');
            }

            alert('Item de descarte adicionado com sucesso!');
            
            // Limpar campos após a adição bem-sucedida
            setNome('');
            setRiscos('');
            setDescricao('');
            setSelectedLocalidade('');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar item de descarte');
        }
    };

    return (
        <section id="adicionar-itens">
            <h2>Adicionar Itens</h2>
            <form id="form-adicionar-item" onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do Item:</label>
                <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <label htmlFor="riscos">Riscos do Item:</label>
                <input type="text" id="riscos" name="riscos" value={riscos} onChange={(e) => setRiscos(e.target.value)} />
                <label htmlFor="descricao">Descrição:</label>
                <textarea id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="4"></textarea>
                <label htmlFor="localidade">Localidades para Descarte:</label>
                <select id="localidade" name="localidade" value={selectedLocalidade} onChange={(e) => setSelectedLocalidade(e.target.value)} className="select-css"required>
                    <option value="">Selecione...</option>
                    {localidades.map(localidade => (
                        <option key={localidade.id} value={localidade.id}>
                         {`${localidade.nome}, ${localidade.endereco.rua}, ${localidade.endereco.numero}, ${localidade.endereco.complemento}, ${localidade.endereco.bairro}, ${localidade.endereco.cidade}, ${localidade.endereco.estado}, ${localidade.endereco.pais}`}
                        </option>
                    ))}
                </select>
                <button type="submit">Adicionar</button>
            </form>
        </section>
    );
};

export default AdicionarItens;
