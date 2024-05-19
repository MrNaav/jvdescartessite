// src/components/AdicionarItens.js
import React from 'react';
import './AdicionarItens.css';

const AdicionarItens = () => {
    return (
        <section id="adicionar-itens">
            <h2>Adicionar Itens</h2>
            <form id="form-adicionar-item">
                <label htmlFor="nome">Nome do Item:</label>
                <input type="text" id="nome" name="nome" required />
                <label htmlFor="riscos">Riscos do Item:</label>
                <input type="text" id="riscos" name="riscos" />
                <label htmlFor="descricao">Descrição:</label>
                <textarea id="descricao" name="descricao" rows="4"></textarea>
                <label htmlFor="locais">Locais para Descarte:</label>
                <input type="text" id="locais" name="locais" />
                <button type="submit">Adicionar</button>
            </form>
        </section>
    );
};

export default AdicionarItens;
