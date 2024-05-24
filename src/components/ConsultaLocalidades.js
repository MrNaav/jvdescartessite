import React, { useState, useEffect } from 'react';
import './ConsultaLocalidades.css';

const ConsultaLocalidades = () => {
    const [localidades, setLocalidades] = useState([]);
    const [selectedLocalidade, setSelectedLocalidade] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        fetchLocalidades();
    }, []);

    const fetchLocalidades = async () => {
        try {
            const response = await fetch('http://192.168.1.22:3000/localidades');
            if (!response.ok) {
                throw new Error('Erro ao buscar localidades');
            }
            const data = await response.json();
            setLocalidades(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleSelectChange = (e) => {
        const selectedLocalidadeId = e.target.value;
        const localidade = localidades.find(localidade => localidade.id === parseInt(selectedLocalidadeId));
        setSelectedLocalidade(localidade);
    };

    const handleDeleteLocalidade = async () => {
        if (!selectedLocalidade) return;

        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }

        try {
            const response = await fetch(`http://192.168.1.22:3000/local_descarte/${selectedLocalidade.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao remover localidade');
            }

            // Remove a localidade da lista após a remoção bem-sucedida
            setLocalidades(prevLocalidades => prevLocalidades.filter(localidade => localidade.id !== selectedLocalidade.id));
            setSelectedLocalidade(null); // Limpa a localidade selecionada
            setConfirmDelete(false); // Reseta a confirmação
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleUpdateLocalidades = () => {
        fetchLocalidades();
    };

    return (
        <section className="consulta-localidades">
            <h2>Consulta de Localidades</h2>
            <form className="form-consulta-localidade">
                <label htmlFor="localidade-select">Selecione a Localidade:</label>
                <select id="localidade-select" onChange={handleSelectChange}>
                    <option value="">Selecione...</option>
                    {localidades.map(localidade => (
                        <option key={localidade.id} value={localidade.id}>{`${localidade.nome}, ${localidade.endereco.rua}, ${localidade.endereco.numero}, ${localidade.endereco.complemento}, ${localidade.endereco.bairro}, ${localidade.endereco.cidade}, ${localidade.endereco.estado}, ${localidade.endereco.pais}`}</option>
                    ))}
                </select>
            </form>
            {selectedLocalidade && (
                <div className="localidade-info">
                    <h3>Informações da Localidade</h3>
                    <p><strong>Nome:</strong> {selectedLocalidade.nome}</p>
                    <p><strong>Horário de Funcionamento:</strong> {selectedLocalidade.horario_funcionamento}</p>
                    <p><strong>Endereço:</strong> {selectedLocalidade.endereco.rua}, {selectedLocalidade.endereco.numero}, {selectedLocalidade.endereco.complemento}</p>
                    <p>{selectedLocalidade.endereco.bairro}, {selectedLocalidade.endereco.cidade}, {selectedLocalidade.endereco.estado}, {selectedLocalidade.endereco.pais}</p>
                </div>
            )}
            <div className="buttons-container">
                {confirmDelete ? (
                    <button className="delete-button" onClick={handleDeleteLocalidade}>
                        Confirmar Deleção
                    </button>
                ) : (
                    <button className="delete-button" onClick={() => setConfirmDelete(true)}>
                        Deletar Localidade
                    </button>
                )}
                <button className="update-button" onClick={handleUpdateLocalidades}>
                    Atualizar Localidades
                </button>
            </div>
        </section>
    );
};

export default ConsultaLocalidades;
