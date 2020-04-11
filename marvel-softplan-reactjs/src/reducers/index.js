import { combineReducers, createStore} from 'redux';
import { m_favorite } from './favorite';
import { m_setLanguage } from './languageinterface';

const m_rootReducer = combineReducers({ m_favorite, m_setLanguage });

export const store = createStore(m_rootReducer);