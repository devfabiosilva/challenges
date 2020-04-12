import { setMarvelLanguageToLocalStorage } from '../utils/language';

const M_NONE = '0';
const ADD_TO_LIST = '1';
const REMOVE_FROM_LIST = '2';
const MODIFY_LANGUAGE = '3'

export const m_Actions = {
    ADD_TO_LIST,
    REMOVE_FROM_LIST,
    MODIFY_LANGUAGE,
    M_NONE
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