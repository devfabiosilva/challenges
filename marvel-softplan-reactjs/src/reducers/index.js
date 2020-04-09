import { combineReducers, createStore} from 'redux';
import { m_favorite } from './favorite';

const m_rootReducer = combineReducers({ m_favorite });

export const store = createStore(m_rootReducer);