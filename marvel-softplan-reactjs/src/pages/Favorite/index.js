import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Notification from '../../components/notification';
import { m_modifyLanguage, m_deleteFromFavorite } from '../../actions';
import { getMarvelLanguageFromLocalStorage } from '../../utils/language';
import { f_getKey } from '../../utils';
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
                    { props.state.interface.favorite_hero_found.replace(/%d/, props.favoriteLists.length) }
                </div>
                <div className="fav-list">
                    <div className="fav-list-container">

                        {
                            props.favoriteLists.map((val) => (
                                <div 
                                    key={f_getKey()}
                                    className="fav-list-item-container"
                                >
                                    <div
                                        key={f_getKey()}
                                        className="fav-img-container"
                                    >
                                        <img
                                            key={f_getKey()}
                                            className="fav-img" alt="img-fav"
                                        />
                                    </div>
                                    <div 
                                        key={f_getKey()}
                                        className="fav-item-name"
                                    >
                                        { val.name }
                                    </div>
                                    <div
                                        key={f_getKey()}
                                        className="fav-item-btn-container"
                                    >
                                        <button
                                            key={f_getKey()}
                                        >
                                            Botao1
                                        </button>
                                        <button
                                            key={val.id}
                                            onClick={() => props.removeFromList(val.id)}
                                        >
                                            Excluir1
                                        </button>
                                    </div>
                                </div>
                            ))
                        }

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
    removeFromList: (e) => dispatch(m_deleteFromFavorite(e))

});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
