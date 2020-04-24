import React from 'react';
import { connect } from 'react-redux';
import { m_showEditor } from '../../actions';
import './style.css';

export function HeroEditor(props) {
/*
    useState(
        () => {

            console.log( props.m_editor );

        }, [ props.m_editor ]
    )
*/
    function closeEditorWindow() {
        props.saveAndClose(null); // Null does not save nothin and exit | Null nao salva nada e sai
    }

    return (
        <div className="hero-editor-container" style={{display:(props.m_editor)?"flex": "none"}}>
            <div className="hero-editor-window"
                onClick={ closeEditorWindow }
            >
                Teste
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({

    m_editor: state.m_editor,
    state: state.m_setLanguage

});

const mapDispatchToProps = (dispatch, ownProps) => ({
    saveAndClose: (e) => dispatch(m_showEditor(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroEditor);
