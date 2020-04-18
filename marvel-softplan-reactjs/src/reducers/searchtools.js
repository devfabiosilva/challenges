import { m_Actions } from '../actions';

export function m_setFindHero(state = null, action) {

    switch (action.type) {

        case m_Actions.FIND_HERO:
            return action.whatFindText;

        default:
            return state;

    }

}

const MARVEL_INITIAL_STATE_QUERY = {
    update_query: false,
    name: null,
    page: null,
    query: null
}


export function m_setQuery(state = MARVEL_INITIAL_STATE_QUERY, action) {

    let new_state;

    switch (action.type) {

        case m_Actions.SET_QUERY:

            new_state = {

                update_query: (state.query!==action.query.query),
                name: action.query.name,
                page: action.query.page,
                query: action.query.query

            }

            return new_state;

        default:
            return state;

    }

}