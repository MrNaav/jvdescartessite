import React, { useState } from 'react';
import './EditarItem.css';

const EditarItem = ({ selectedItem, onClose }) => {
    const [editedItem, setEditedItem] = useState({
        nome: selectedItem.nome,
        riscos: selectedItem.riscos,
        descricao: selectedItem.descricao,
        locais: selectedItem.locais
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para atualizar o item na API
        // Em seguida, chame onClose para fechar a tela de edição
        onClose();
    };

    const handleCancel = () => {
        onClose(); // Fecha a tela de edição
    };

    return (
        <div className="editar-item-container">
            <h2>Editar Item</h2>
            <form className="editar-item-form" onSubmit={handleSubmit}>
                <label htmlFor="nome-input">Nome:</label>
                <input type="text" id="nome-input" name="nome" value={editedItem.nome} onChange={handleChange} required />
                
                <label htmlFor="riscos-input">Riscos:</label>
                <textarea id="riscos-input" name="riscos" value={editedItem.riscos} onChange={handleChange}></textarea>
                
                <label htmlFor="descricao-input">Descrição:</label>
                <textarea id="descricao-input" name="descricao" value={editedItem.descricao} onChange={handleChange}></textarea>
                
                <label htmlFor="locais-input">Locais para Descarte:</label>
                <textarea id="locais-input" name="locais" value={editedItem.locais} onChange={handleChange}></textarea>

                <div className="button-group">
                    <button type="submit" className="submit-button">Confirmar</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditarItem;





















/*
// Importe o método PUT do seu cliente HTTP
import axios from 'axios';

// Defina a função de atualização do item na API
const updateItem = async (itemId, updatedItemData) => {
    try {
        const response = await axios.put(`http://sua-api.com/items/${itemId}`, updatedItemData);
        return response.data; // Se necessário, você pode retornar os dados atualizados do item
    } catch (error) {
        throw new Error('Erro ao atualizar o item na API');
    }
};

// Na função handleSubmit do componente EditarItem
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Chame a função de atualização com o ID do item e os dados editados
        await updateItem(selectedItem.id, editedItem);
        onClose(); // Feche a tela de edição após a atualização bem-sucedida
    } catch (error) {
        console.error('Erro ao atualizar o item:', error);
        // Trate o erro (por exemplo, exiba uma mensagem de erro ao usuário)
    }
};
*/