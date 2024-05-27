import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './LocalidadesPage.css';

const LocalidadesPage = () => {
    const [localidades, setLocalidades] = useState([]);
    const [selectedLocalidade, setSelectedLocalidade] = useState(null);
    const [nome, setNome] = useState('');
    const [horarioFuncionamento, setHorarioFuncionamento] = useState('00:00 às 00:00');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [estado, setEstadoNome] = useState('');
    const [pais, setPaisNome] = useState('');

    useEffect(() => {
        fetchLocalidades();
    }, []);

    const fetchLocalidades = async () => {
        try {
            const response = await axios.get('http://192.168.1.22:3000/localidades');

            if (response.status !== 200) {
                throw new Error('Erro ao buscar localidades');
            }
            setLocalidades(response.data);
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

        const confirmacao = window.confirm("Deseja realmente excluir essa localidade?");

        if (confirmacao) {
            try {
                const response = await axios.delete(`http://192.168.1.22:3000/local_descarte/${selectedLocalidade.id}`);

                if (response.status !== 200) {
                    throw new Error('Erro ao remover localidade');
                }

                setLocalidades(prevLocalidades => prevLocalidades.filter(localidade => localidade.id !== selectedLocalidade.id));
                setSelectedLocalidade(null);
            } catch (error) {
                console.error('Erro:', error);
            }
        }
    };

    const handleInputChange = (e, setStateFunction, maxLength) => {
        const inputValue = e.target.value;

        if (inputValue.length <= maxLength) {
            setStateFunction(inputValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmacao = window.confirm("Deseja realmente adicionar essa localidade?");

        if (confirmacao) {
            try {
                if (!Number.isInteger(parseInt(numero))) {
                    alert('Número do local não pode conter letras ou caracteres especiais!');
                } 

                const response = await axios.post('http://192.168.1.22:3000/local_descarte', {
                    nome,
                    horario_funcionamento: horarioFuncionamento,
                    rua,
                    numero,
                    complemento,
                    bairro,
                    cidade,
                    estado,
                    pais,
                });

                if (response.status !== 201) {
                    throw new Error('Erro ao adicionar localidade');
                }

                alert('Localidade adicionada com sucesso!');

                fetchLocalidades(); 
                setNome('');
                setHorarioFuncionamento('');
                setRua('');
                setNumero('');
                setComplemento('');
                setCidade('');
                setEstadoNome('');
                setBairro('');
                setPaisNome('');
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao adicionar localidade');
            }
        }
    };

    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Header />
                <main>
                    <section className="adicionar-e-consultar-localidades">
                        <div className="adicionar-localidades">
                            <h2>Adicionar Localidade</h2>
                            <form className="form-adicionar-localidade" onSubmit={handleSubmit}>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="nome"><strong>Nome do Local de Descarte:</strong></label>
                                        <input 
                                            type="text" 
                                            id="nome" 
                                            name="nome" 
                                            value={nome} 
                                            onChange={(e) => handleInputChange(e, setNome, 50)} 
                                            required 
                                            maxLength="50"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="horarioFuncionamento"><strong>Horário de Funcionamento:</strong></label>
                                        <input 
                                            type="text" 
                                            id="horarioFuncionamento" 
                                            name="horarioFuncionamento" 
                                            value={horarioFuncionamento} 
                                            onChange={(e) => handleInputChange(e, setHorarioFuncionamento, 50)} 
                                            required 
                                            maxLength="50"
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="rua"><strong>Rua:</strong></label>
                                        <input 
                                            type="text" 
                                            id="rua" 
                                            name="rua" 
                                            value={rua} 
                                            onChange={(e) => handleInputChange(e, setRua, 30)} 
                                            required 
                                            maxLength="30"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="numero"><strong>Número:</strong></label>
                                        <input 
                                            type="text" 
                                            id="numero" 
                                            name="numero" 
                                            value={numero} 
                                            onChange={(e) => handleInputChange(e, setNumero, 5)} 
                                            required 
                                            maxLength="5"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="complemento"><strong>Complemento:</strong></label>
                                        <input 
                                            type="text" 
                                            id="complemento" 
                                            name="complemento" 
                                            value={complemento} 
                                            onChange={(e) => handleInputChange(e, setComplemento, 20)} 
                                            maxLength="20"
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group" style={{width: "60%"}}>
                                        <label htmlFor="bairro"><strong>Bairro:</strong></label>
                                        <input 
                                            type="text" 
                                            id="bairro" 
                                            name="bairro" 
                                            value={bairro} 
                                            onChange={(e) => handleInputChange(e, setBairro, 50)} 
                                            required 
                                            maxLength="50"
                                        /> 
                                        </div>
                                    <div className="input-group" style={{width: "20%"}}>
                                        <label htmlFor="cidade"><strong>Cidade:</strong></label>
                                        <input 
                                            type="text" 
                                            id="cidade" 
                                            name="cidade" 
                                            value={cidade} 
                                            onChange={(e) => handleInputChange(e, setCidade, 30)} 
                                            required 
                                            maxLength="30"
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="estado"><strong>Estado:</strong></label>
                                        <input 
                                            type="text" 
                                            id="estado" 
                                            name="estado" 
                                            value={estado} 
                                            onChange={(e) => handleInputChange(e, setEstadoNome, 30)} 
                                            required 
                                            maxLength="30"
                                        /> 
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="pais"><strong>País:</strong></label>
                                        <input 
                                            type="text" 
                                            id="pais" 
                                            name="pais" 
                                            value={pais} 
                                            onChange={(e) => handleInputChange(e, setPaisNome, 30)} 
                                            required 
                                            maxLength="30"
                                        /> 
                                    </div>
                                </div>
                            </form>
                            <button className="button-container" onClick={handleSubmit}>Adicionar</button>
                        </div>
                        <div className="consulta-localidades">
                            <h2>Consulta de Localidades</h2>
                            <form className="form-consulta-localidade">
                                <label htmlFor="localidade-select">Selecione a Localidade:</label>
                                <select className="localidade-select" id="localidade-select" onChange={handleSelectChange}>
                                    <option value="">Selecione...</option>
                                    {localidades.map(localidade => (
                                        <option key={localidade.id} value={localidade.id}>{localidade.nome}</option>
                                    ))}
                                </select>
                            </form>
                            {selectedLocalidade && (
                                <div className="localidade-info">
                                    <h3>Informações da Localidade</h3>
                                    <p><strong>Nome:</strong> {selectedLocalidade.nome}</p>
                                    <p><strong>Horário de Funcionamento:</strong> {selectedLocalidade.horario_funcionamento}</p>
                                    <p>
                                        <strong>Endereço:</strong> 
                                        {selectedLocalidade.endereco.rua}, {selectedLocalidade.endereco.numero}, {selectedLocalidade.endereco.complemento}
                                    </p>
                                    <p>
                                        {selectedLocalidade.endereco.bairro}, {selectedLocalidade.endereco.cidade}, 
                                        {selectedLocalidade.endereco.estado}, {selectedLocalidade.endereco.pais}
                                    </p>
                                </div>
                            )}
                            <div className="buttons-container">
                                <button className="delete-button" onClick={() => handleDeleteLocalidade()}>
                                    Deletar Localidade
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LocalidadesPage;