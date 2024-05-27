import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="nav-bar">
            <ul className="nav-links">
                <li>
                    <NavLink to="/itens" end activeClassName="active-link">
                        Itens
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contatosClientes" activeClassName="active-link">
                        Contatos de Clientes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/adicionarLocalidades" activeClassName="active-link">
                        Atualizar Localidades
                    </NavLink>
                </li>
            </ul>
            <div style={{ position: 'absolute', top: 0, left: '30%'}}>
                <button className="button-group" onClick={handleLogout}>
                    Sair
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
