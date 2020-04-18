import { combineReducers, createStore} from 'redux';
import { m_favorite } from './favorite';
import { m_setLanguage } from './languageinterface';
import {/* m_setFindHero, */ m_setQuery } from './searchtools';

const m_rootReducer = combineReducers({ m_favorite, m_setLanguage, /* m_setFindHero, */m_setQuery });

export const store = createStore(m_rootReducer);