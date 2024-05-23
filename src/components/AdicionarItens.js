import React, { useState, useEffect } from 'react';
import './AdicionarItens.css'; // Importando o arquivo de estilos CSS

import axios from 'axios';

const AdicionarItens = () => {
    const [nome, setNome] = useState('');
    const [riscos, setRiscos] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localidades, setLocalidades] = useState([]);
    const [selectedLocalidade, setSelectedLocalidade] = useState('');

    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const response = await axios.get('http://192.168.1.22:3000/localidades');

                const data = response.data;
                setLocalidades(data);
            } catch (error) {
                console.error('Erro ao buscar localidades:', error);
            }
        };

        fetchLocalidades();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://192.168.1.22:3000/item_descarte', {
                nome,
                riscos,
                descricao,
            });

            if (response.status !== 201) {
                throw new Error('Erro ao adicionar item!');
            }

            const itemId = response.data.id

            const responseTwo = await axios.post('http://192.168.1.22:3000/local_item_descarte', {
                idItemDescarte: itemId,
                idLocalDescarte: selectedLocalidade,
            });

            if (responseTwo.status !== 201) {
                throw new Error('Erro ao adicionar localidade ao item!');
            }

            alert('Item de descarte criado com sucesso!');
            
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
        <section className="adicionar-itens"> {/* Alterado de id para className */}
            <h2>Adicionar Itens</h2>
            <form className="form-adicionar-item" onSubmit={handleSubmit}> {/* Alterado de id para className */}
                <label htmlFor="nome">Nome do Item:</label>
                <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required maxLength="30"/>
                <label htmlFor="riscos">Riscos do Item:</label>
                <textarea type="text" id="riscos" name="riscos" value={riscos} onChange={(e) => setRiscos(e.target.value)} rows="2" required maxLength="200"></textarea>
                <label htmlFor="descricao">Descrição:</label>
                <textarea id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="2" required maxLength="200"></textarea>
                <label htmlFor="localidade">Localidades para Descarte:</label>
                <select id="localidade" name="localidade" value={selectedLocalidade} onChange={(e) => setSelectedLocalidade(e.target.value)} className="select-css" required> {/* Adicionado className */}
                    <option value="">Selecione...</option>
                    {localidades.map(localidade => (
                        <option key={localidade.id} value={localidade.id}>
                         {`${localidade.nome}, ${localidade.endereco.rua}, ${localidade.endereco.numero}, ${localidade.endereco.complemento}, ${localidade.endereco.bairro}, ${localidade.endereco.cidade}, ${localidade.endereco.estado}, ${localidade.endereco.pais}`}
                        </option>
                    ))}
                </select>
                <button type="submit">Add</button>
            </form>
        </section>
    );
};

export default AdicionarItens;
