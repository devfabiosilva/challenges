import { setMarvelLanguageToLocalStorage } from '../utils/language';

const M_NONE = '0';
const ADD_TO_LIST = '1';
const REMOVE_FROM_LIST = '2';
const MODIFY_LANGUAGE = '3';
//const FIND_HERO = '4';
const SET_QUERY = '5';

export const m_Actions = {
    ADD_TO_LIST,
    REMOVE_FROM_LIST,
    MODIFY_LANGUAGE,
//    FIND_HERO,
    M_NONE,
    SET_QUERY
}

export function m_addToList(text) {
    if (text.trim())
        return { type: ADD_TO_LIST, text }

    return {type: M_NONE};
}
  
export function m_removeFromList(index) {
    return { type: REMOVE_FROM_LIST, index }
}

export function m_modifyLanguage(lang) {
    return { type: MODIFY_LANGUAGE, lang: setMarvelLanguageToLocalStorage(lang) }
}
/*
export function m_findHero(whatFindText) {
    return { type: FIND_HERO, whatFindText }
}
*/
export function m_query(query) {

    let query_tmp, page_query_exists, name_query_exists, query_data;

    page_query_exists = (query.page!==null);
    name_query_exists = (query.name!==null);

    if (name_query_exists)
        if (!query.name.length)
            name_query_exists=false;

    if (page_query_exists&&name_query_exists)
        query_tmp = `/?name=${query.name}&page=${query.page}`
        //query_tmp = `/?name=${encodeURIComponent(query.name)}&page=${encodeURIComponent(query.page)}`
    else if (name_query_exists)
        query_tmp = `/?name=${query.name}`
    else if (page_query_exists)
        query_tmp = `/?page=${query.page}`
    else
        query_tmp = "/"

        query_data = {

            name: query.name,
            page: query.page,
            query: query_tmp

        }

    return { type: SET_QUERY, query: query_data }

}