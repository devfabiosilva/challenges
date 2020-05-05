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

        if ((e.key === "Enter") || (e.key ==="Blur")) {
            
            if (e.evt.target.value.trim()==="") {

                
                if (e.key === "Blur") {
                    e.evt.target.value=heroDataTmp.series.items[e.index].name;
                    return;
                }

                alert( props.state.interface.serie_could_not_be_empty );

                return;

            }

            if (heroDataTmp.series.items.filter(
                (item, index) => {
                    return (index !== e.index)&&(item.name === e.evt.target.value);
                }
            ).length) {
                //alert(`Série existente ${e.evt.target.value}`);
                alert(props.state.interface.serie_already_exists.replace(/%d/, e.evt.target.value))
                e.evt.target.value=heroDataTmp.series.items[e.index].name;
                return;
            }

            if (heroDataTmp.series.items[e.index] !== e.evt.target.value) {

                setHeroDataTmp(
                    {
                        id: heroDataTmp.id,
                        name: heroDataTmp.name,
                        series: {
                            items: heroDataTmp.series.items.map(

                                (value, index) => {

                                    if (index !==e.index)
                                        return value;
                                    
                                    return { name: e.evt.target.value };

                                }

                            )
                        },
                        thumb: heroDataTmp.thumb
                    }
                );

            }

        }

    }

    function addNewSerie(e) {

        let value = e.target.value;

        if (e.key === "Enter") {

            if (value.trim() === "")
                return;

            if (heroDataTmp.series.items.filter(
                (item) => {
                    return item.name === value;
                }
            ).length) {
                alert(props.state.interface.serie_already_exists.replace(/%d/, value));
                return;
            }

        }


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
//if saveHero=true; close and save edited data
//if saveHerp=false; close window and discard data
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
                                                        onKeyPress={(e)=>editSerie({ key: e.key, index, evt: e })}
                                                        onBlur ={(e)=>editSerie({ key: "Blur", index, evt: e})}
                                                    />
                                                    <button
                                                        key={index}
                                                        onClick={() => deleteSerie(index)}
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
                                    onKeyPress={(e) => addNewSerie(e)}
                                    onBlur={(e) => { e.target.value="" } }
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
                        { props.state.interface.editor_btn_save_and_close }
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
