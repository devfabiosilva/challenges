import React, { useEffect } from 'react';
import Notification from '../../components/notification';
import { FiArrowLeft } from 'react-icons/fi';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { m_modifyLanguage } from '../../actions';
import { getMarvelLanguageFromLocalStorage } from '../../utils/language';

export function NotFound(props) {

    const history = useHistory();

    useEffect (
        () => {

            let marvelLanguage = getMarvelLanguageFromLocalStorage();

            if (marvelLanguage !== props.state.lang)
                props.notFoundPageModifyLang(marvelLanguage);

        }, [props]
    )

    function notFoundGoBack() {
        history.goBack();
    }

    return(
        <div className="notfound-container" style={
            {
                display: "inline-grid",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "500px"
            }
        }>
            <div className="notfound-not-container">
                <Notification nError title={props.state.interface.err404_title}>
                    {props.state.interface.err404_pag_not_found}
                </Notification>
            </div>
            <div className="go-back-btn-container" style={
                {
                    margin: "0 auto"
                }
            }>
                <button style={{width: "120px"}} onClick={notFoundGoBack}>
                    <FiArrowLeft size={14} /> {props.state.interface.go_back}
                </button>
            </div>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    notFoundPageModifyLang: (e) => dispatch(m_modifyLanguage(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);