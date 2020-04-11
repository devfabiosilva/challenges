import React from 'react';
import Notification from '../../components/notification';
import { FiArrowLeft } from 'react-icons/fi';
import { connect } from 'react-redux';
//import { store } from '../../reducers';

export function NotFound(props) {
    /*useEffect (
        () => {
           console.log(store.getState())
            console.log(props.state);
        }, [props.state]
    )*/
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
                    Página não encontrada
                </Notification>
            </div>
            <div className="go-back-btn-container" style={
                {
                    margin: "0 auto"
                }
            }>
                <button style={{width: "120px"}}>
                    <FiArrowLeft size={14} /> Voltar
                </button>
            </div>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage
});

export default connect(mapStateToProps)(NotFound);