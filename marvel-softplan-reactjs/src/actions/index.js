import { setMarvelLanguageToLocalStorage } from '../utils/language';

const M_NONE = 1;
//const ADD_TO_LIST = 2;
const REMOVE_FROM_LIST = 3;
const MODIFY_LANGUAGE = 4;
const OPEN_VIEWER_DETAIL = 5;
const SET_QUERY = 6;
const ADD_TO_FAVORITE = 7;

export const m_Actions = {
    
    M_NONE,
//    ADD_TO_LIST,
    REMOVE_FROM_LIST,
    MODIFY_LANGUAGE,
    OPEN_VIEWER_DETAIL,
    SET_QUERY,
    ADD_TO_FAVORITE

}

export function m_removeFromList(index) {
    return { type: REMOVE_FROM_LIST, index }
}

export function m_addToFavorite(data) {

    if (data)
        return { type: ADD_TO_FAVORITE, data }

    return {type: M_NONE};

}

export function m_modifyLanguage(lang) {
    return { type: MODIFY_LANGUAGE, lang: setMarvelLanguageToLocalStorage(lang) }
}
export function m_query(query) {

    let query_tmp, page_query_exists, name_query_exists, query_data;

    page_query_exists = (query.page!==null);

    if ((name_query_exists = (query.name!==null)))
        if (!query.name.length)
            name_query_exists=false;

    if (page_query_exists&&name_query_exists)
        query_tmp = `/?name=${query.name}&page=${query.page}`
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

export function m_openViewerHeroDetail(formatedData) {
    return { type: OPEN_VIEWER_DETAIL, data: formatedData };
}