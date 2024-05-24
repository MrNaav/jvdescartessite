import React, { useState, useEffect } from 'react';
import './ConsultaItens.css';
import EditarItem from './EditarItem';

const ConsultaItens = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [localidades, setLocalidades] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://192.168.1.22:3000/itensdescarte');
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
            const response = await fetch(`http://192.168.1.22:3000/itensdescarte/${selectedItemId}/localidades`);
            if (!response.ok) {
                throw new Error('Erro ao buscar localidades');
            }
            const data = await response.json();
            setLocalidades(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleDeleteItem = async () => {
        if (!selectedItem) return;

        try {
            const response = await fetch(`http://192.168.1.22:3000/itensdescarte/${selectedItem.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao remover item');
            }

            // Remove o item da lista após a remoção bem-sucedida
            setItems(prevItems => prevItems.filter(item => item.id !== selectedItem.id));
            setSelectedItem(null); // Limpa o item selecionado
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleEditItem = () => {
        setIsEditing(true); // Abre a tela de edição
    };

    const handleCloseEdit = () => {
        setIsEditing(false); // Fecha a tela de edição
    };

    return (
        <section className="consulta-itens">
            <h2>Consulta de Itens</h2>
            <form className="form-consulta-item">
                <label htmlFor="item-select">Selecione o Item:</label>
                <select id="item-select" onChange={handleSelectChange}>
                    <option value="">Selecione...</option>
                    {items.map(item => (
                        <option key={item.id} value={item.id}>{item.nome}</option>
                    ))}
                </select>
            </form>
            {selectedItem && (
                <div className="item-info">
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
                <div className="localidades-info">
                    {localidades.map(localidade => (
                        <div key={localidade.id} className="localidade-item">
                            <p>Nome: {localidade.nome}</p>
                            <p>Endereço: {localidade.endereco.rua}, {localidade.endereco.numero}, {localidade.endereco.complemento}</p>
                            <p>{localidade.endereco.bairro}, {localidade.endereco.cidade}, {localidade.endereco.estado}, {localidade.endereco.pais}</p>
                            <p>Horário de Funcionamento: {localidade.horario_funcionamento}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="buttons-container">
                <button className="delete-button" onClick={handleDeleteItem}>
                    <i className="fas fa-trash"></i> Remover Item
                </button>
                <button className="edit-button" onClick={handleEditItem}>
                    <i className="fas fa-edit"></i> Editar Item
                </button>
            </div>
            {isEditing && (
                <EditarItem selectedItem={selectedItem} onClose={handleCloseEdit} />
            )}
        </section>
    );
};

export default ConsultaItens;
