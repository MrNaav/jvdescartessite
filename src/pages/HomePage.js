import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './HomePage.css';

const HomePage = () => {
    const [empresaDescricao, setEmpresaDescricao] = useState('');

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const response = await axios.get('http://192.168.1.22:3000/empresas'); 
                
                if (response.data && response.data.length > 0) {
                    setEmpresaDescricao(response.data[0].descricao);
                }
            } catch (error) {
                console.error('Erro ao buscar informações da empresa:', error);
            }
        };

        fetchCompanyInfo();
    }, []);

    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Header />
                <main>
                    <section className="section-container company-section">
                        <img src="/logoEmpresa.jpg" alt="Empresa" className="company-image" />
                        <div className="company-description">
                            <h2>Sobre Nós</h2>
                            <p>{empresaDescricao}</p>
                            <h2>Missão</h2>
                            <p>Nossa missão é fornecer soluções inovadoras e de alta qualidade que atendam às necessidades dos nossos clientes, contribuindo para o seu sucesso e crescimento.</p>
                            <h2>Visão</h2>
                            <p>Ser reconhecida como líder de mercado, promovendo a sustentabilidade e o desenvolvimento contínuo em nosso setor.</p>
                            <h2>Valores</h2>
                            <p>Integridade, Inovação, Compromisso com o cliente, Excelência e Sustentabilidade</p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};    

export default HomePage;
