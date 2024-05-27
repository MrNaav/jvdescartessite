import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './ItensPage.css';

const ItensPage = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [localidades, setLocalidades] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [nome, setNome] = useState('');
    const [riscos, setRiscos] = useState('');
    const [descricao, setDescricao] = useState('');
    const [selectedLocalidade, setSelectedLocalidade] = useState('');
    const [localidadesSearch, setLocalidadesSearch] = useState('');

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://192.168.1.22:3000/itensdescarte');

            setItems(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    };

    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const response = await axios.get('http://192.168.1.22:3000/localidades');

                setLocalidades(response.data);
            } catch (error) {
                console.error('Erro ao buscar localidades:', error);
            }
        };

        fetchItems();
        fetchLocalidades();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmacao = window.confirm("Deseja realmente adicionar esse item?");

        if (confirmacao) {
            try {
                const response = await axios.post('http://192.168.1.22:3000/item_descarte', {
                    nome,
                    riscos,
                    descricao,
                });

                if (response.status !== 201) {
                    throw new Error('Erro ao adicionar item!');
                }

                const itemId = response.data.id;

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

                fetchItems();
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao adicionar item de descarte');
            }
        }
    };

    const handleSelectChange = async (e) => {
        const selectedItemId = e.target.value;
        const item = items.find(item => item.id === parseInt(selectedItemId));

        setSelectedItem(item);
    
        if (item) { 
            try {
                const response = await axios.get(`http://192.168.1.22:3000/itensdescarte/${selectedItemId}/localidades`);

                setLocalidadesSearch(response.data);
            } catch (error) {
                console.error('Erro ao buscar localidades:', error);
            }
        } else {
            setLocalidadesSearch([]);
        }
    };
    
    const handleDeleteItem = async () => {
        if (!selectedItem) { 
            alert('Selecione um item para excluir!');
            return;
        }

        const confirmacao = window.confirm("Deseja realmente excluir esse item?");
        
        if (confirmacao) {
            try {
                const response = await axios.delete(`http://192.168.1.22:3000/item_descarte/${selectedItem.id}`);

                if (!response.status === 204) {
                    throw new Error('Erro ao remover item');
                }

                setItems(prevItems => prevItems.filter(item => item.id !== selectedItem.id));
                setSelectedItem(null);
            } catch (error) {
                console.error('Erro ao remover item:', error);
            }
        }
    };

    const handleEditItem = () => {
        if (!selectedItem) { 
            alert('Selecione um item para editar.');
            return;
        }

        setIsEditing(true);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const confirmacao = window.confirm("Deseja realmente atualizar esse item?");

        if (confirmacao) {
            try {
                const { id, nome, descricao, riscos, locais } = selectedItem;
        
                const itemUpdateResponse = await axios.put(`http://192.168.1.22:3000/item_descarte/${id}`, {
                    nome,
                    descricao,
                    riscos,
                    locais 
                });
        
                if (itemUpdateResponse.status === 200) {
                    setIsEditing(false);
                    fetchItems();
                    setSelectedItem(null);
                    document.getElementById('item-select').value = "";
                } else {
                    throw new Error('Erro ao atualizar o item');
                }
            } catch (error) {
                console.error('Erro ao atualizar o item:', error);
            }
        } 
    };

    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Header />
                <main>
                    <section className="section-container adicionar-itens">
                        <h2>Adicionar Itens</h2>
                        <form className="form-adicionar-item" onSubmit={handleSubmit}>
                            <label htmlFor="nome" className="label-container"><strong>Nome do Item:</strong></label>
                            <input 
                                type="text" 
                                id="nome" 
                                name="nome" 
                                value={nome} 
                                onChange={(e) => setNome(e.target.value)} 
                                required 
                                maxLength="30" 
                                className="input-container" 
                            />
                            <label htmlFor="riscos" className="label-container"><strong>Riscos do Item:</strong></label>
                            <textarea 
                                id="riscos" 
                                name="riscos" 
                                value={riscos} 
                                onChange={(e) => setRiscos(e.target.value)} 
                                rows="2" 
                                required 
                                maxLength="200" 
                                className="textarea-container"
                            ></textarea>
                            <label htmlFor="descricao" className="label-container"><strong>Descrição do Item:</strong></label>
                            <textarea 
                                id="descricao" 
                                name="descricao" 
                                value={descricao} 
                                onChange={(e) => setDescricao(e.target.value)} 
                                rows="2" 
                                required 
                                maxLength="200" 
                                className="textarea-container"
                            ></textarea>
                            <label htmlFor="localidade" className="label-container"><strong>Localidade para descarte:</strong></label>
                            <select 
                                id="localidade" 
                                name="localidade" 
                                value={selectedLocalidade} 
                                onChange={(e) => setSelectedLocalidade(e.target.value)} 
                                className="adicionar-itens select-container"
                            >
                                <option value="">Selecione...</option>
                                {localidades.map(localidade => (
                                    <option key={localidade.id} value={localidade.id} className="nome-do-itemCSS">
                                        {`${localidade.nome}, ${localidade.endereco.rua}, ${localidade.endereco.numero}, 
                                          ${localidade.endereco.complemento}, ${localidade.endereco.bairro}, ${localidade.endereco.cidade}, 
                                          ${localidade.endereco.estado}, ${localidade.endereco.pais}`}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className="button-container">Adicionar item</button>
                        </form>
                    </section>
                    <section className="section-container consulta-itens">
                        <h2>Consulta de Itens</h2>
                        <form className="form-consulta-item">
                            <label htmlFor="item-select" className="label-container"><strong>Selecione o Item:</strong></label>
                            <select id="item-select" onChange={handleSelectChange} className="consulta-itens select-container">
                                <option value="">Selecione...</option>
                                {items.map(item => (
                                    <option key={item.id} value={item.id} className="nome-do-itemCSS">{item.nome}</option>
                                ))}
                            </select>
                        </form>
                        {selectedItem && (
                            <div className="item-info">
                                <h3>Informações do Item</h3>
                                <p><strong>Nome:</strong> {selectedItem.nome}</p>
                                <p><strong>Riscos:</strong> {selectedItem.riscos}</p>
                                <p><strong>Descrição:</strong> {selectedItem.descricao}</p>
                                <p><strong>Locais para Descarte:</strong></p>
                                {localidadesSearch.length > 0 && (
                                <div className="localidades-info">
                                    {localidadesSearch.map(localidade => (
                                        <div key={localidade.id} className="localidade-item">
                                            <p>
                                                <strong> • Nome:</strong> 
                                                {localidade.nome}
                                            </p>
                                            <p>
                                                <strong> • Horário de Funcionamento:</strong> 
                                                {localidade.horario_funcionamento}
                                            </p>
                                            <p>
                                                <strong> • Endereço:</strong> 
                                                {localidade.endereco.rua}, {localidade.endereco.numero}, 
                                                {localidade.endereco.complemento}, {localidade.endereco.bairro}, {localidade.endereco.cidade}, 
                                                {localidade.endereco.estado}, {localidade.endereco.pais}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                    </section>
                    {isEditing && selectedItem && (
                        <div className="section-container consulta-itens">
                            <h2>Editar Item</h2>
                            <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleEditSubmit(); }}>
                                <label htmlFor="nome-input" className="label-container"><strong>Nome:</strong></label>
                                <input 
                                    type="text" 
                                    id="nome-input" 
                                    name="nome" 
                                    value={selectedItem.nome} 
                                    onChange={(e) => setSelectedItem({ ...selectedItem, nome: e.target.value })} 
                                    required 
                                    className="input-container" 
                                />
                                <label htmlFor="riscos-input" className="label-container"><strong>Riscos:</strong></label>
                                <textarea 
                                    id="riscos-input" 
                                    name="riscos" 
                                    value={selectedItem.riscos} 
                                    onChange={(e) => setSelectedItem({ ...selectedItem, riscos: e.target.value })} 
                                    className="textarea-container"
                                ></textarea>
                                <label htmlFor="descricao-input" className="label-container"><strong>Descrição:</strong></label>
                                <textarea 
                                    id="descricao-input" 
                                    name="descricao" 
                                    value={selectedItem.descricao} 
                                    onChange={(e) => setSelectedItem({ ...selectedItem, descricao: e.target.value })} 
                                    className="textarea-container" 
                                    readOnly
                                ></textarea>
                                <label htmlFor="locais-input" className="label-container">
                                    <strong>
                                        Locais para Descarte (Marque os checkbox das localidades que dem ser vinculadas ao item):
                                    </strong>
                                </label>
                                {localidades.map((localidade) => (
                                    <div key={localidade.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                        <label htmlFor={`localidade-${localidade.id}`} className="label-container" style={{ marginRight: '10px' }}>
                                            {` • ${localidade.nome}, ${localidade.endereco.rua}, ${localidade.endereco.numero}, 
                                                 ${localidade.endereco.complemento}, ${localidade.endereco.bairro}, 
                                                 ${localidade.endereco.cidade}, ${localidade.endereco.estado}, ${localidade.endereco.pais}`}
                                        </label>
                                        <input
                                            type="checkbox"
                                            id={`localidade-${localidade.id}`}
                                            name={`localidade-${localidade.id}`}
                                            value={localidade.id}
                                            checked={(selectedItem.locais || []).includes(localidade.id)}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                const localidadeId = localidade.id;
                                                let updatedLocais = [...(selectedItem.locais || [])];

                                                if (isChecked) {
                                                    updatedLocais.push(localidadeId);
                                                } else {
                                                    updatedLocais = updatedLocais.filter((id) => id !== localidadeId);
                                                }

                                                setSelectedItem({ ...selectedItem, locais: updatedLocais });
                                            }}
                                            style={{ marginLeft: '5px' }}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <button type="submit" className="confirm-button" onClick={handleEditSubmit}>
                                        Confirmar
                                    </button>
                                    <button type="button" className="cancel-button" onClick={handleCloseEdit}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ItensPage;

