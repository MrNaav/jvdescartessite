// src/components/ConsultaItens.js
import React, { useState, useEffect } from 'react';
import './ConsultaItens.css';

const ConsultaItens = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        // Simulando o fetch dos itens. Em uma aplicação real, você buscaria isso de uma API
        const fetchedItems = [
            { id: 1, nome: 'Bateria', riscos: 'Contaminação do solo', descricao: 'Bateria de carro', locais: 'Posto de coleta' },
            { id: 2, nome: 'Lâmpada', riscos: 'Corte, contaminação', descricao: 'Lâmpada fluorescente', locais: 'Posto de coleta' },
            // Adicione mais itens conforme necessário
        ];
        setItems(fetchedItems);
    }, []);

    const handleSelectChange = (e) => {
        const selectedItemId = e.target.value;
        const item = items.find(item => item.id === parseInt(selectedItemId));
        setSelectedItem(item);
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
                <div id="item-info">
                    <h3>Informações do Item</h3>
                    <p><strong>Nome:</strong> {selectedItem.nome}</p>
                    <p><strong>Riscos:</strong> {selectedItem.riscos}</p>
                    <p><strong>Descrição:</strong> {selectedItem.descricao}</p>
                    <p><strong>Locais para Descarte:</strong> {selectedItem.locais}</p>
                </div>
            )}
        </section>
    );
};

export default ConsultaItens;