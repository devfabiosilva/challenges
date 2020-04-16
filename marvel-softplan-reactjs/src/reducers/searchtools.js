import { m_Actions } from '../actions';

export const m_setFindHero = (state = null, action) => {

    switch (action.type) {

        case m_Actions.FIND_HERO:
            return action.whatFindText;

        default:
            return state;

    }

}
