import { m_Actions } from '../actions';
import { LANG_PT_BR, L_PT_BR, LANG_EN_US, L_EN_US } from '../utils/language';

export const m_setLanguage = (state = {lang: L_PT_BR, interface: LANG_PT_BR}, action) => {

    switch (action.type) {

        case m_Actions.MODIFY_LANGUAGE:

            if (action.lang===L_PT_BR)
                return { lang: L_PT_BR, interface: LANG_PT_BR };
            
            if (action.lang===L_EN_US)
                return { lang: L_EN_US, interface: LANG_EN_US};

            return state;

        default:
            return state;

    }

}
