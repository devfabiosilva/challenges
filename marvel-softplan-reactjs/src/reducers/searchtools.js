import { m_Actions } from '../actions';
/*
 * Informaões da barra de navegação e iterações são guardadas neste estado global
 */
const MARVEL_INITIAL_STATE_QUERY = {

    update_query: false,
    name: null,
    page: null,
    query: null

}

export function m_setQuery(state = MARVEL_INITIAL_STATE_QUERY, action) {

    let name, page, query;

    switch (action.type) {

        case m_Actions.SET_QUERY:

            return {

                update_query: (state.query!==action.query.query),
                name: action.query.name,
                page: action.query.page,
                query: action.query.query

            }

        case m_Actions.FORCE_SET_QUERY_UPDATE:

            if (action.query) {

                name = action.query.name;
                page = action.query.page;
                query = action.query.query;

            } else {

                name =  state.name;
                page = state.page;
                query = state.query;

            }

            return {

                update_query: true,
                name: name,
                page: page,
                query: query
    
            }

        default:
            return state;

    }

}