import React from 'react';
import './style.css';

// import { Container } from './styles';

export default function HeroViewer() {
  return (

    <div className="hero-viewer-container">
        <div className="hero-viewer-window">
            <div className="viewer-img">
                Imagem
            </div>
            <div className="hero-viewer-desc">
                Descrição
            </div>
            <div className="hero-viewer-action">
                <button>Editar</button>
                <button>Adicionar aos favoritos</button>
                <button>Fechar</button>
            </div>
        </div>
    </div>
    
  );
}
