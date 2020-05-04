import React,
{ useEffect, useState }
from 'react';
import { connect } from 'react-redux';
import { m_showEditor, m_editHero } from '../../actions';
import { f_getKey } from '../../utils';
import './style.css';

export function HeroEditor(props) {

    const [ heroDataTmp, setHeroDataTmp ] = useState(null)

    useEffect(
        () => {

            if (!heroDataTmp)
                setHeroDataTmp(props.m_editor);

        },
        [
            props.m_editor, 
            heroDataTmp
        ]
    )

    function editSerie(e) {
        console.log(e);
    }

    function deleteSerie(index) {

        setHeroDataTmp(
            {
                id: heroDataTmp.id,
                name: heroDataTmp.name,
                series: (heroDataTmp.series)?{
                    //available: heroDataTmp.series.available,
                    //collectionURI: heroDataTmp.series.collectionURI,
                    items: heroDataTmp.series.items.filter(
                        (value, item_index) => { return item_index!==index }
                    )
                }:[],
                thumb: heroDataTmp.thumb
            }
        );
    }

    function saveAndCloseWindow(saveHero) {

        props.m_close(null);

        if (saveHero)
            props.m_saveModifiedHero(heroDataTmp);

        setHeroDataTmp(null);

    }

    return (
        <div className="hero-editor-container" style={{display:(heroDataTmp)?"flex": "none"}}>
            <div className="hero-editor-window">
                <div className="hero-editor-header">
                    { props.state.interface.editor_header_title }
                </div>
                <div className="hero-editor-body">
                    <div className="hero-editor-img-container">
                        <img 
                            className="editor-img"
                            alt="editorImg"
                            src={ (heroDataTmp)?heroDataTmp.thumb:null }
                        />
                        <input
                            className="hero-title-input"
                            type="text"
                            placeholder={ props.state.interface.edit_placeholder_title }
                            defaultValue={ (heroDataTmp)?heroDataTmp.name:"" }
                        />
                    </div>
                    <div className="editor-series-container">
                        <div className="series-name">
                            {
                                (heroDataTmp)?
                                    (heroDataTmp.series.items.length)?
                                        heroDataTmp.series.items.map(
                                            (item, index) => (
                                                <div key={f_getKey()} className="serie-container">
                                                    <input
                                                        className="serie-container-input"
                                                        key={f_getKey()}
                                                        type="text"
                                                        defaultValue={ item.name }
                                                        onKeyPress={(e)=>editSerie({value: e.target.value, index})}
                                                        onBlur ={(e)=>editSerie({value: e.target.value, index})}
                                                    />
                                                    <button
                                                        key={index}
                                                        onClick={(e) => deleteSerie(index)}
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            )
                                        )
                                    :null
                                :null
                            }
                            <div className="add-new-serie">
                                <input 
                                    className="new-serie-input"
                                    type="text"
                                    placeholder="Digite nova série aqui"
                                />                                    
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-editor-footer">
                    <button
                        className="close-editor-window-btn"
                        onClick={ () => saveAndCloseWindow(false) }
                    >
                        { props.state.interface.editor_btn_cancel_and_close }
                    </button>
                    <button
                        className="close-and-save"
                        onClick={ () => saveAndCloseWindow(true) }
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
    m_close: (e) => dispatch(m_showEditor(e)),
    m_saveModifiedHero: (e) => dispatch(m_editHero(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroEditor);
