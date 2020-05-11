import React from 'react';
import { connect } from 'react-redux';
import { m_openViewerHeroDetail } from '../../actions';
import { m_favoriteAlreadyExists } from '../../reducers/favorite';
import { m_addToFavorite } from '../../actions';
import './style.css';

/*
 * Componente usado para visualizar o herói selecionado
 */
export function HeroViewer( props ) {

    function addToFav(data) {

        let txtmsg;

        if (m_favoriteAlreadyExists(props.heroDetail, props.savedFavorites))
            txtmsg = props.state.interface.fav_already_exist;
        else {

            props.m_addToFav(props.heroDetail);
            txtmsg =  props.state.interface.fav_added;

        }

        alert(txtmsg);

    }
  return (

    <div className="hero-viewer-container" style={{display: (props.heroDetail)?'flex':'none'}}>
        <div className="hero-viewer-window">
            <div className="viewer-img">
                <img 
                    src={(props.heroDetail)?props.heroDetail.thumb:""}
                    className="img-detail" 
                    alt="detail-img" 
                />
            </div>
            <div className="hero-viewer-desc">
                {(props.heroDetail)?props.heroDetail.name:props.state.interface.no_desc}
            </div>
            <div className="hero-viewer-action">
                <button onClick={() => addToFav(props.heroDetail)}>
                    {props.state.interface.add_to_fav}
                </button>
                <button onClick={ props.m_closeViewPage }>{props.state.interface.close}</button>
            </div>
        </div>
    </div>
    
  );
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage,
    savedFavorites: state.m_favorite
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    m_closeViewPage: () => dispatch(m_openViewerHeroDetail(null)),
    m_addToFav: (data) => dispatch(m_addToFavorite(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroViewer);
