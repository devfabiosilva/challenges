import { m_Actions } from '../actions';

const MARVEL_INITIAL_STATE_QUERY = {

    update_query: false,
    name: null,
    page: null,
    query: null

}

export function m_setQuery(state = MARVEL_INITIAL_STATE_QUERY, action) {


    switch (action.type) {

        case m_Actions.SET_QUERY:

            return {

                update_query: (state.query!==action.query.query),
                name: action.query.name,
                page: action.query.page,
                query: action.query.query

            }

        default:
            return state;

    }

}