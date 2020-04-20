import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Notification from '../../components/notification';
import { m_modifyLanguage } from '../../actions';
import { getMarvelLanguageFromLocalStorage } from '../../utils/language';
//import { } from '../../actions';
import './style.css';

export function Favorite(props) {

    useEffect(

        () => {

            let marvelLanguage = getMarvelLanguageFromLocalStorage();

            if (marvelLanguage !== props.state.lang)
                props.favoritePageModifyLang(marvelLanguage);

        }, [ props ]

    )

    if (props.favoriteLists.length)
        return (
            <div className="fav-container">
                <div className="fav-header">
                    Cabeçalho
                </div>
                <div className="fav-list">
                    <div className="fav-list-container">

                        <div className="fav-list-item-container">
                            <div className="fav-img-container">
                                <img className="fav-img" alt="img-fav" />
                            </div>
                            <div className="fav-item-name">Lista1</div>
                            <div className="fav-item-btn-container">
                                <button>Botao1</button>
                                <button>Excluir1</button>
                            </div>
                        </div>
                        <div className="fav-list-item-container">
                            <div className="fav-img-container">
                                <img className="fav-img" alt="img-fav" />
                            </div>
                            <div className="fav-item-name">Lista1</div>
                            <div className="fav-item-btn-container">
                                <button>Botao1</button>
                                <button>Excluir1</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fav-footer">
                    Footer
                </div>
            </div>
        );
    else
        return (
            <div className="fav-container">
                <div className="fav-header">
                    Cabeçalho
                </div>
                <div className="fav-list">
                    <Notification 
                        nAlert 
                        title={ props.state.interface.empty_list_msg_title }
                    >
                            { props.state.interface.empty_list_msg }
                    </Notification>
                </div>
                <div className="fav-footer">
                    <button>
                        { props.state.interface.go_back }
                    </button>
                </div>
            </div>
        );
}

const mapStateToProps = (state, ownProps) => ({

    favoriteLists: state.m_favorite,
    state: state.m_setLanguage

});

const mapDispatchToProps = (dispatch, ownProps) => ({

    favoritePageModifyLang: (e) => dispatch(m_modifyLanguage(e)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
