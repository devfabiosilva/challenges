import { m_Actions } from '../actions';

const VIEW_DETAILS = null;
/*{

    id: null,
    name: null,
    thumb: null,
    series: null

}*/

export function m_setOpenViewerDetail(state = VIEW_DETAILS, action) {

    switch (action.type) {

        case m_Actions.OPEN_VIEWER_DETAIL:
            return action.data;

        default:
            return state;

    }

}