import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setErro('');

        try {
            const resposta = await axios.post('http://192.168.1.22:3000/login', {
                email,
                senha
            });

            const { token } = resposta.data;

            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            window.location.href = '/itens';
        } catch (erro) {
            console.error('Erro ao fazer login:', erro);
            if (erro.response && erro.response.status === 401) {
                setErro('Credenciais inválidas');
            } else {
                setErro('Erro ao fazer login. Por favor, tente novamente mais tarde.');
            }
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="senha">Senha:</label>
                <input
                    type="password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                {erro && <p className="error-message">{erro}</p>}
                <button type="submit" disabled={carregando}>
                    {carregando ? 'Carregando...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
