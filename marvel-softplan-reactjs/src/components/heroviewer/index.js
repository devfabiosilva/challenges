import React from 'react';
import './style.css';

import { connect } from 'react-redux';
import { m_openViewerHeroDetail } from '../../actions';

export function HeroViewer( props ) {

  return (

    <div className="hero-viewer-container" style={{display: (props.heroDetail)?'flex':'none'}}>
        <div className="hero-viewer-window">
            <div className="viewer-img">
                Imagem
            </div>
            <div className="hero-viewer-desc">
                Descrição
            </div>
            <div className="hero-viewer-action">
                <button>Adicionar aos favoritos</button>
                <button onClick={ props.m_closeViewPage }>Fechar</button>
            </div>
        </div>
    </div>
    
  );
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage,
    //heroDataDetail: state.m_setOpenViewerDetail
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    m_closeViewPage: () => dispatch(m_openViewerHeroDetail(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroViewer);
