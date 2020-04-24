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

        default:
            return state;

    }

}
