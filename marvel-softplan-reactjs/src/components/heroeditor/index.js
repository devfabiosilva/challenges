import React,
{ useEffect, useState }
from 'react';
import { connect } from 'react-redux';
import { m_showEditor, m_editHero } from '../../actions';
import { f_getKey } from '../../utils';
import { FiTrash2 } from 'react-icons/fi';
import './style.css';

const MAX_FILE_SIZE = 100000;
/*
 * Componente responsável por editar os heróis marvel e salvá-lo localmente no estado global
 * do Redux
 */
export function HeroEditor(props) {

    /* Dados do herói a ser editado (temporário). Pode ser cancelado */
    const [ heroDataTmp, setHeroDataTmp ] = useState(null)
    const [ heroName, setHeroName ] = useState("");

    useEffect(
        () => {
            (heroDataTmp)?setHeroName(heroDataTmp.name):setHeroDataTmp(props.m_editor);
        },
        [
            props.m_editor, 
            heroDataTmp
        ]
    )

    function editHeroName(e) {

        if ((e.key === "Enter") || (e.key ==="Blur")) {

            if (e.evt.target.value.trim()==="") {
                
                if (e.key === "Blur")
                    return;

                alert(props.state.interface.hero_name_empty_err);

                return;

            }

            if (props.m_favorites.filter(
                (item) => {
                    return ((item.id !== heroDataTmp.id)&&(item.name === e.evt.target.value))
                }
            ).length) {
                alert(props.state.interface.hero_name_already_exists.replace(/%d/, e.evt.target.value));
                e.evt.target.value=heroDataTmp.name;
                return;

            }

            setHeroDataTmp(
                {
                    id: heroDataTmp.id,
                    name: e.evt.target.value,
                    series: {
                        items: heroDataTmp.series.items
                    },
                    thumb: heroDataTmp.thumb
                }
            );

        }

    }

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

                                    if (index !== e.index)
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
        let newItem = null;

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

            newItem = heroDataTmp.series.items;
            newItem.push({name: value});

            setHeroDataTmp(
                {
                    id: heroDataTmp.id,
                    name: heroDataTmp.name,
                    series: {
                        items: newItem
                    },
                    thumb: heroDataTmp.thumb
                }
            );
            e.target.value = "";
            document.getElementById('editor-series-container-id').scrollTop = document.getElementById('editor-series-container-id').scrollHeight;
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
        if (saveHero) {

            if (heroName.trim()==="") {
                alert(props.state.interface.hero_name_empty_err);
                return;
            }

            if (props.m_favorites.filter(
                (item) => {
                    return ((item.id !== heroDataTmp.id)&&(item.name === heroDataTmp.name))
                }
            ).length) {
                alert(props.state.interface.hero_name_already_exists.replace(/%d/, heroDataTmp.name));
                return;
            }
        }

        props.m_close(null);

        if (saveHero)
            props.m_saveModifiedHero(heroDataTmp);

        setHeroDataTmp(null);

    }

    function openFile() {
        document.getElementById('file-uploader-id').click();
    }

    function checkFile() {
        var reader = new FileReader();
        var fileUploader = document.getElementById('file-uploader-id');
        var newImage = null;

        if (fileUploader.files.length>1) {
            alert(props.state.interface.err_multiple_files);
            return;
        }

        if (fileUploader.files.length) {
            if (fileUploader.files[0].size>MAX_FILE_SIZE) {
                alert(props.state.interface.err_image_size.replace(/%d/, MAX_FILE_SIZE/1000));
                return;
            }

            switch (fileUploader.files[0].type) {
                case "image/gif":
                case "image/jpeg":
                case "image/png":
                case "image/svg+xml":
                    reader.onloadend = function () {
                        newImage = reader.result;
                        setHeroDataTmp(
                            {
                                id: heroDataTmp.id,
                                name: heroDataTmp.name,
                                series: heroDataTmp.series,    
                                thumb: newImage
                            }
                        );
                    }
                    reader.readAsDataURL(fileUploader.files[0]);
                    break;
                default:
                    alert(props.state.interface.err_invalid_image_type.replace(/%d/, fileUploader.files[0].type));
            }
        }
    }

    return (
        <div className="hero-editor-container" style={{display:(heroDataTmp)?"flex": "none"}}>
            <div className="hero-editor-window">
                <div className="hero-editor-header">
                    { props.state.interface.editor_header_title }
                </div>
                <div className="hero-editor-body">
                    <div className="hero-editor-img-container">
                        <input 
                            type="file"
                            id="file-uploader-id"
                            className="file-uploader"
                            onChange={() => checkFile()}
                        />
                        <img 
                            className="editor-img"
                            id="editor-img-id"
                            alt="editorImg"
                            src={ (heroDataTmp)?heroDataTmp.thumb:null }
                            onClick={openFile}
                            title={ props.state.interface.edit_image_title }
                        />
                        <input
                            className="hero-title-input"
                            type="text"
                            placeholder={ props.state.interface.edit_placeholder_title }
                            value={heroName}
                            onChange={(e) => setHeroName(e.target.value)}
                            onKeyPress={(e) => editHeroName({ key: e.key, evt: e })}
                            onBlur ={(e) => editHeroName({ key: "Blur", evt: e})}
                            title= { props.state.interface.hero_name_title_edit }
                        />
                    </div>
                    <div 
                        className="editor-series-container"
                        id="editor-series-container-id"
                    >
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
                                                        title={props.state.interface.edit_serie_title}
                                                    />
                                                    <button
                                                        key={index}
                                                        className="remove-serie-btn"
                                                        onClick={() => deleteSerie(index)}
                                                        title={props.state.interface.remove_serie_btn_title}
                                                    >
                                                        <FiTrash2 size={12} />
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
                                    placeholder={props.state.interface.type_new_serie}
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
                        title={ props.state.interface.editor_btn_cancel_and_close }
                    >
                        { props.state.interface.editor_btn_cancel_and_close }
                    </button>
                    <button
                        className="close-and-save"
                        onClick={ () => saveAndCloseWindow(true) }
                        title={ props.state.interface.editor_btn_save_and_close }
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
    m_favorites: state.m_favorite,
    state: state.m_setLanguage

});

const mapDispatchToProps = (dispatch, ownProps) => ({
    m_close: (e) => dispatch(m_showEditor(e)),
    m_saveModifiedHero: (e) => dispatch(m_editHero(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroEditor);
