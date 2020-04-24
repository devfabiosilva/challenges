import { combineReducers, createStore} from 'redux';
import { m_favorite, m_editor } from './favorite';
import { m_setLanguage } from './languageinterface';
import { m_setQuery } from './searchtools';
import { m_setOpenViewerDetail } from './viewerdetails';

const m_rootReducer = combineReducers(

        { 

            m_favorite, 
            m_setLanguage, 
            m_setQuery,
            m_setOpenViewerDetail,
            m_editor

        }

    );

export const store = createStore(m_rootReducer);