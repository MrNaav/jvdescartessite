import React, { useState, useEffect } from 'react';
import './ResponderContatos.css';

const ResponderContatos = ({ selectedContato, handleSubmit, handleChange, resposta }) => {
    const [isResponderVisible, setIsResponderVisible] = useState(false);

    useEffect(() => {
        if (selectedContato) {
            setIsResponderVisible(true);
        }
    }, [selectedContato]);

    const handleCancelar = () => {
        setIsResponderVisible(false);
    };

    return (
        <section className="responder-contatos">
            {isResponderVisible && (
                <>
                    <h2>Responder Contatos do Cliente</h2>
                    <form className="form-responder-contato" onSubmit={handleSubmit}>
                        <div className="contato-info">
                            <div className="contato-field">
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" id="nome" name="nome" value={selectedContato.nome} readOnly />
                            </div>
                            <div className="contato-field">
                                <label htmlFor="email">Email:</label>
                                <input type="text" id="email" name="email" value={selectedContato.email} readOnly />
                            </div>
                            <div className="contato-field">
                                <label htmlFor="contato">Contato:</label>
                                <input type="text" id="contato" name="contato" value={selectedContato.celular} readOnly />
                            </div>
                        </div>
                        <div className="motivo-detalhes">
                            <div className="contato-field">
                                <label htmlFor="motivo">Motivo do Contato:</label>
                                <input type="text" id="motivo" name="motivo" value={selectedContato.motivo} readOnly />
                            </div>
                            <div className="contato-field">
                                <label htmlFor="detalhes">Detalhes:</label>
                                <textarea id="detalhes" name="detalhes" value={selectedContato.detalhes} readOnly></textarea>
                            </div>
                        </div>
                        <label htmlFor="resposta">Resposta:</label>
                        <textarea id="resposta" value={resposta} onChange={handleChange} rows="4" required maxLength="100"></textarea>
                        <button type="submit">Enviar Resposta</button>
                        <button type="button" onClick={handleCancelar}>Cancelar</button>
                    </form>
                </>
            )}
        </section>
    );
};

export default ResponderContatos;
