import React, { useState, useEffect } from 'react';
import './ConsultaItens.css';

const ConsultaItens = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [localidades, setLocalidades] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/itensdescarte');
                if (!response.ok) {
                    throw new Error('Erro ao buscar itens');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchItems();
    }, []);

    const handleSelectChange = async (e) => {
        const selectedItemId = e.target.value;
        const item = items.find(item => item.id === parseInt(selectedItemId));
        setSelectedItem(item);

        try {
            const response = await fetch(`http://localhost:3000/itensdescarte/${selectedItemId}/localidades`);
            if (!response.ok) {
                throw new Error('Erro ao buscar localidades');
            }
            const data = await response.json();
            setLocalidades(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <section id="consulta-itens">
            <h2>Consulta de Itens</h2>
            <form id="form-consulta-item">
                <label htmlFor="item-select">Selecione o Item:</label>
                <select id="item-select" onChange={handleSelectChange}>
                    <option value="">Selecione...</option>
                    {items.map(item => (
                        <option key={item.id} value={item.id}>{item.nome}</option>
                    ))}
                </select>
            </form>
            {selectedItem && (
                <div>
                    <h3>Informações do Item</h3>
                    <p><strong>Nome:</strong></p>
                    <p>{selectedItem.nome}</p>
                    <p><strong>Riscos:</strong></p>
                    <p>{selectedItem.riscos}</p>
                    <p><strong>Descrição:</strong></p>
                    <p>{selectedItem.descricao}</p>
                    <p><strong>Locais para Descarte:</strong></p>
                    <p>{selectedItem.locais}</p>
                </div>
            )}
            {localidades.length > 0 && (
                <div>
                        {localidades.map(localidade => (
                            <div key={localidade.id}>
                                <p>Nome: {localidade.nome}</p>
                                <p>Endereço: {localidade.endereco.rua}, {localidade.endereco.numero}, {localidade.endereco.complemento}</p>
                                <p>{localidade.endereco.bairro}, {localidade.endereco.cidade}, {localidade.endereco.estado}, {localidade.endereco.pais}</p>
                                <p>Horário de Funcionamento: {localidade.horario_funcionamento}</p>
                            </div>
                        ))}
                </div>
            )}
        </section>
    );
};

export default ConsultaItens;
