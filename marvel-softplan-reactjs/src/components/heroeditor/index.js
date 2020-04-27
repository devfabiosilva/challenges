import React
/*{ useEffect } */
from 'react';
import { connect } from 'react-redux';
import { m_showEditor } from '../../actions';
import './style.css';

export function HeroEditor(props) {
/*
    useEffect(
        () => {

            console.log( props.m_editor );

        }, [ props ]
    )
*/
    function closeEditorWindow() {
        props.saveAndClose(null); // Null does not save nothin and exit | Null nao salva nada e sai
    }

    return (
        <div className="hero-editor-container" style={{display:(props.m_editor)?"flex": "none"}}>
            <div className="hero-editor-window">
                <div className="hero-editor-header">
                    { props.state.interface.editor_header_title }
                </div>
                <div className="hero-editor-body">
                    <div className="hero-editor-img-container">
                        <img 
                            className="editor-img"
                            alt="editorImg"
                            src={ (props.m_editor)?props.m_editor.thumb:null }
                        />
                        <input
                            className="hero-title-input"
                            type="text"
                            placeholder={ props.state.interface.edit_placeholder_title }
                            defaultValue={ (props.m_editor)?props.m_editor.name:"" }
                        />
                    </div>
                    <div className="editor-series-container">
                        Container de séries
                    </div>
                </div>
                <div className="hero-editor-footer">
                    <button
                        className="close-editor-window-btn"
                        onClick={ closeEditorWindow }
                    >
                        { props.state.interface.editor_btn_cancel_and_close }
                    </button>
                    <button
                        className="close-and-save"
                    >
                        Salvar e fechar
                    </button>
                </div>
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
