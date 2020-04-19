import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaLanguage } from 'react-icons/fa';
import Notification from '../../components/notification';
import Paginate from '../../components/pagination';
import { connect } from 'react-redux';
import { checkApiKey } from '../../utils/secure';
import { m_modifyLanguage, m_query } from '../../actions';
import { useQuery } from '../../utils';
import {

    L_PT_BR, 
    L_EN_US, 
    getMarvelLanguageFromLocalStorage,

} from '../../utils/language';
import './style.css';
import { useHistory } from 'react-router-dom';

export function Main(props) {

    const history = useHistory();
    const my_query = useQuery();

    const [ inputSearch, setInputSearch ] = useState('');

    useEffect (

        () => {

            let marvelLanguage = getMarvelLanguageFromLocalStorage();
            let findNameInQuery, findPageInQuery, nameTmp, pageTmp;

            if (marvelLanguage !== props.state.lang)
                props.mainPageModifyLang(marvelLanguage);

            if (!checkApiKey())
                if (props.marvel_query.update_query)
                    history.push(props.marvel_query.query);
                else {

                    findNameInQuery = (my_query.get('name')!==null)?decodeURIComponent(my_query.get('name')):null;
                    findPageInQuery = (my_query.get('page')!==null)?decodeURIComponent(my_query.get('page')):null;

                    nameTmp = props.marvel_query.name;
                    pageTmp = props.marvel_query.page;
    
                    if ((findNameInQuery!==nameTmp)||(findPageInQuery!==pageTmp)) {

                        props.m_setCustomQuery(
                            {
                                name: findNameInQuery,
                                page: findPageInQuery
                            }
                        )

                    } else if (pageTmp === null) {

                        props.m_setCustomQuery(
                            {
                                name: nameTmp,
                                page: 1
                            }
                        )

                    }

            }
        },
        [

            props,
            props.marvel_query,
            history,
            my_query

        ]

    )

    function findHero(e) {

        e.preventDefault();
        let textToFind=inputSearch.trim();

        if (textToFind) {

             props.m_setCustomQuery(
                {
                    name: textToFind,
                    page: 1,
                }
            );

        }

    }

    function findHeroChange(e) {
        setInputSearch(e.target.value);
    }

    function onKeyUpEvt() {

        if (inputSearch==="") {

            if ((m_query.name)||(m_query.page!==null)) {

                props.m_setCustomQuery(
                    {
                        name: null,
                        page: 1
                    }
                );

            }

        }
    }

    return (
        <div className="container">
            <div className="tools">
                <div className="search-tools">
                    <form autoComplete="on" id="search">
                        <input

                            id="search-input"
                            onChange={ findHeroChange }
                            placeholder={ props.state.interface.search_hero }
                            onKeyUp={ onKeyUpEvt }

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
                        <Notification nAlert title={ props.state.interface.alert_api_conf_title } >
                            { props.state.interface.alert_api_conf }
                        </Notification>
                    :<Paginate />
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage,
    marvel_query: state.m_setQuery
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    mainPageModifyLang: (e) => dispatch(m_modifyLanguage(e)),
    m_setCustomQuery: (e) => dispatch(m_query(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);