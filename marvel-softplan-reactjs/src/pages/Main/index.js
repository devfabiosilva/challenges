import React, { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaLanguage } from 'react-icons/fa';
import Notification from '../../components/notification';
import Paginate from '../../components/pagination';
import { connect } from 'react-redux';
import { checkApiKey } from '../../utils/secure';
import { m_modifyLanguage } from '../../actions';
import { 
    L_PT_BR, 
    L_EN_US, 
    getMarvelLanguageFromLocalStorage,
} from '../../utils/language';
import './style.css';

export function Main(props) {
    useEffect (
    () => {
        let marvelLanguage = getMarvelLanguageFromLocalStorage();

        if (marvelLanguage !== props.state.lang)
            props.mainPageModifyLang(marvelLanguage);

    }, [props]
    )
    return (
        <div className="container">
            <div className="tools">
                <div className="search-tools">
                    <form autoComplete="on" id="search">
                        <input id="search-input" placeholder=
                            {props.state.interface.search_hero}
                        type="search" />
                        <button className="fav-button">
                            <FiSearch size={18} color="#FFF" />
                        </button>
                    </form>
                </div>
                <div className="list-favorites">
                    <button className="saved-list-btn">
                        { props.state.interface.goto_saved_list }
                    </button>
                    <button className="lang-btn"
                        placeholder="Language/Idioma"
                        onClick={
                            () => props.mainPageModifyLang((props.state.lang===L_EN_US)?L_PT_BR:L_EN_US)
                        }
                    ><FaLanguage size={26}/></button>
                </div>
            </div>
            <div className="heroes-page">
                {
                    (checkApiKey())?
                        <Notification nAlert title={ props.state.interface.alert_api_conf_title }
                        >
                            { props.state.interface.alert_api_conf }
                        </Notification>
                    :<Paginate />
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    mainPageModifyLang: (e) => dispatch(m_modifyLanguage(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);