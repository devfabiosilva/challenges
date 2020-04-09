import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Notification from '../../components/notification';
import './style.css';

export default function Main() {
    return (
        <div className="container">
            <div className="tools">
                <div className="search-tools">
                    <form autoComplete="on" id="search">
                        <input id="search-input" placeholder="Buscar herói" type="search" />
                        <button className="fav-button">
                            <FiSearch size={18} color="#FFF" />
                        </button>
                    </form>
                </div>
                <div className="list-favorites">
                    <button className="saved-list-btn">Ir para lista de itens salvos</button>
                </div>
            </div>
            <div className="heroes-page">
                <Notification nAlert title="Alerta, Alerta">Ola</Notification>
            </div>
        </div>
    );
}