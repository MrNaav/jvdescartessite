import React, { useState, useEffect } from 'react';
import './ConsultaLocalidades.css';

const ConsultaLocalidades = () => {
    const [localidades, setLocalidades] = useState([]);
    const [selectedLocalidade, setSelectedLocalidade] = useState(null);

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

    const handleSelectChange = (e) => {
        const selectedLocalidadeId = e.target.value;
        const localidade = localidades.find(localidade => localidade.id === parseInt(selectedLocalidadeId));
        setSelectedLocalidade(localidade);
    };

    return (
        <section id="consulta-localidades">
            <h2>Consulta de Localidades</h2>
            <form id="form-consulta-localidade">
                <label htmlFor="localidade-select">Selecione a Localidade:</label>
                <select id="localidade-select" onChange={handleSelectChange}>
                    <option value="">Selecione...</option>
                    {localidades.map(localidade => (
                        <option key={localidade.id} value={localidade.id}>{localidade.nome}</option>
                    ))}
                </select>
            </form>
            {selectedLocalidade && (
                <div>
                    <h3>Informações da Localidade</h3>
                    <p><strong>Nome:</strong> {selectedLocalidade.nome}</p>
                    <p><strong>Horário de Funcionamento:</strong> {selectedLocalidade.horario_funcionamento}</p>
                    <p><strong>Endereço:</strong> {selectedLocalidade.endereco.rua}, {selectedLocalidade.endereco.numero}, {selectedLocalidade.endereco.complemento}</p>
                    <p>{selectedLocalidade.endereco.bairro}, {selectedLocalidade.endereco.cidade}, {selectedLocalidade.endereco.estado}, {selectedLocalidade.endereco.pais}</p>
                </div>
            )}
        </section>
    );
};

export default ConsultaLocalidades;
