import { setMarvelLanguageToLocalStorage } from '../utils/language';

const M_NONE = 1;
const MODIFY_LANGUAGE = 4;
const OPEN_VIEWER_DETAIL = 5;
const SET_QUERY = 6;
const ADD_TO_FAVORITE = 7;
const REMOVE_FROM_FAVORITE = 8;
const FORCE_SET_QUERY_UPDATE = 9;
const REMOVE_ALL_FROM_FAVORITE = 10;
const SHOW_EDITOR = 11;

export const m_Actions = {
    
    M_NONE,
    MODIFY_LANGUAGE,
    OPEN_VIEWER_DETAIL,
    SET_QUERY,
    ADD_TO_FAVORITE,
    REMOVE_FROM_FAVORITE,
    FORCE_SET_QUERY_UPDATE,
    REMOVE_ALL_FROM_FAVORITE,
    SHOW_EDITOR

}

export function m_addToFavorite(data) {

    if (data)
        return { type: ADD_TO_FAVORITE, data }

    return {type: M_NONE};

}

export function m_deleteFromFavorite(id) {
    return { type: REMOVE_FROM_FAVORITE, id }
}

export function m_deleteAllFromFavorite() {
    return { type: REMOVE_ALL_FROM_FAVORITE }
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

export function m_force_query(query) {
    return { type: FORCE_SET_QUERY_UPDATE, query }
}

export function m_showEditor(hero_to_edit) {
    return { type: SHOW_EDITOR, hero_to_edit }
}
