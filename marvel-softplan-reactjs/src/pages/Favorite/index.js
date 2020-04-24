import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Notification from '../../components/notification';
import { m_modifyLanguage, m_deleteFromFavorite } from '../../actions';
import { getMarvelLanguageFromLocalStorage } from '../../utils/language';
import { f_getKey } from '../../utils';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
//import { m_force_query } from '../../actions';
import './style.css';

export function Favorite(props) {

    const history = useHistory();

    useEffect(

        () => {

            let marvelLanguage = getMarvelLanguageFromLocalStorage();

            if (marvelLanguage !== props.state.lang)
                props.favoritePageModifyLang(marvelLanguage);

        }, [ props ]

    )

    function goBack() {
//        props.m_setForceQuery();
        history.goBack();
    }

    if (props.favoriteLists.length)
        return (
            <div className="fav-container">
                <div className="fav-header">
                    <p className="fav-header-txt">
                        { props.state.interface.favorite_hero_found.replace(/%d/, props.favoriteLists.length) }
                    </p>
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
                                            className="edit-btn"
                                            key={f_getKey()}
                                        >
                                           <FiEdit size={16} />
                                        </button>
                                        <button
                                            className="remove-btn"
                                            key={val.id}
                                            onClick={() => props.removeFromList(val.id)}
                                        >
                                             <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className="fav-footer">
                    <button
                        onClick={goBack}
                    >
                        { props.state.interface.go_back }
                    </button>
                </div>
            </div>
        );
    else
        return (
            <div className="fav-container">
                <div className="fav-header">
                    <p className="fav-header-txt">
                        { props.state.interface.empty_list_msg_title }
                    </p>
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
                    <button
                        onClick={goBack}
                    >
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
    removeFromList: (e) => dispatch(m_deleteFromFavorite(e)),
//    m_setForceQuery: () => dispatch(m_force_query(null)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
