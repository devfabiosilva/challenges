import React from 'react';
import { connect } from 'react-redux';
import {
    DivNotification, 
    DivNotificationContainer, 
    DivNotificationIcon, 
    DivNotificationTitle,
    ALERT_COLOR,
    INFO_COLOR
} from './styled';
import { FiInfo, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

const NOTF_ICON_SZ = 120;

function NotfIcon( { nAlert, nError } ) {

    if (nAlert)
        return <FiAlertTriangle size={NOTF_ICON_SZ} color={ALERT_COLOR}/>

    if (nError)
        return <FiXCircle size={NOTF_ICON_SZ} color="red"/>

    return <FiInfo size={NOTF_ICON_SZ} color={INFO_COLOR} />

}

export function Notification({ state, nAlert, nError, children, title }) {
    return (
        <DivNotification>
            <DivNotificationIcon>
                <NotfIcon nAlert={nAlert} nError={nError} />
            </DivNotificationIcon>
            <DivNotificationContainer>
                <DivNotificationTitle
                    inputColor={
                        (nAlert)?
                        ALERT_COLOR:
                        (nError)?
                        "red":
                        null
                    }
                >
                    <p style={{fontSize: "34px"}}>
                        {(title)?title:(nAlert)?
                            state.interface.alert_title:(nError)?
                            state.interface.error_title:
                            state.interface.info_title
                        }
                    </p>
                </DivNotificationTitle>
                <div style={
                    {
                        display: "flex",
                        padding: "10px",
                        width: "100%",
                        height: "75%",
                        
                    }}>
                    <p style={
                        {
                            color: "#5e5e5e",
                            fontSize: "32px",
                        }
                        }>
                            { children }
                    </p>
                </div>
            </DivNotificationContainer>
        </DivNotification>
    );
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage
});

export default connect(mapStateToProps)(Notification);
