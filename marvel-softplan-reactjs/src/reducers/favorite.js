import { m_Actions } from '../actions';
import { f_getKey } from '../utils';

export const m_favorite = (state = [], action) => {

    switch (action.type) {

        case m_Actions.ADD_TO_LIST:
            return [
                ...state, {
                    id: f_getKey(),
                    text: action.text,
                }
            ];

        case m_Actions.REMOVE_FROM_LIST:
            return state.filter((index) => {
                return index.id !== action.index
            });

        default:
            return state;

    }

}