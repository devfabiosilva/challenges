const M_NONE = '0';
const ADD_TO_LIST = '1';
const REMOVE_FROM_LIST = '2';

export const m_Actions = {
    ADD_TO_LIST,
    REMOVE_FROM_LIST,
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