import { m_Actions } from '../actions';

export function m_favoriteAlreadyExists(data, saved_data) {

    if (saved_data.filter( (fav) => {
        return (fav.id===data.id)
    }).length) return true;

    return false;

}

export const m_favorite = (state = [], action) => {

    switch (action.type) {

        case m_Actions.ADD_TO_FAVORITE:

            return [
                ...state, action.data
            ];

        case m_Actions.REMOVE_FROM_FAVORITE:
            return state.filter((index) => {
                return index.id !== action.id
            });

        case m_Actions.REMOVE_ALL_FROM_FAVORITE:
            return [];

        case m_Actions.SAVE_EDITED_HERO:

            return state.map (

                (value) => {

                    if ( value.id !== action.hero_to_edit.id )
                        return value;

                    return action.hero_to_edit;

                }

            );

        default:
            return state;

    }

}

export function m_editor(state = null, action) {

    switch (action.type) {

        case m_Actions.SHOW_EDITOR:
            return action.hero_to_edit;

        default:
            return state;
    
    }
}