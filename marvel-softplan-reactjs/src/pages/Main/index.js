import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaLanguage } from 'react-icons/fa';
import Notification from '../../components/notification';
import Paginate from '../../components/pagination';
import { connect } from 'react-redux';
import { checkApiKey } from '../../utils/secure';
import { m_modifyLanguage, m_findHero } from '../../actions';
import { 
    L_PT_BR, 
    L_EN_US, 
    getMarvelLanguageFromLocalStorage,
} from '../../utils/language';
import './style.css';

export function Main(props) {

    const [ inputSearch, setInputSearch ] = useState('');

    useEffect (

        () => {
            let marvelLanguage = getMarvelLanguageFromLocalStorage();

            if (marvelLanguage !== props.state.lang)
                props.mainPageModifyLang(marvelLanguage);

        }, [props]

    )

    function findHero(e) {

        e.preventDefault();
        let textToFind=inputSearch.trim();

        if (textToFind)
            props.findMyHero(textToFind);

    }

    function findHeroChange(e) {
        setInputSearch(e.target.value);
    }

    return (
        <div className="container">
            <div className="tools">
                <div className="search-tools">
                    <form autoComplete="on" id="search">
                        <input id="search-input" onChange={findHeroChange} placeholder=
                            {props.state.interface.search_hero}
                        type="search" />
                        <button className="fav-button" onClick={findHero}>
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
    mainPageModifyLang: (e) => dispatch(m_modifyLanguage(e)),
    findMyHero: (e) => dispatch(m_findHero(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);