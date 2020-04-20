import React from 'react';
import { connect } from 'react-redux';
import {
    
    DivNotification, 
    DivNotificationContainer, 
    DivNotificationIcon, 
    DivNotificationTitle,
    ALERT_COLOR,
    INFO_COLOR,
    ERROR_COLOR

} from './styled';
import { FiInfo, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

const NOTF_ICON_SZ = 120;

export const notificationType = {

    NOTF_INFO: 1,
    NOTF_ALERT: 2,
    NOTF_ERROR: 3
    
}

function NotfIcon( { nAlert, nError } ) {

    if (nAlert)
        return <FiAlertTriangle size={NOTF_ICON_SZ} color={ALERT_COLOR}/>

    if (nError)
        return <FiXCircle size={NOTF_ICON_SZ} color={ERROR_COLOR}/>

    return <FiInfo size={NOTF_ICON_SZ} color={INFO_COLOR} />

}

export function Notification({ state, nAlert, nError, children, title, nType }) {

    if (nType) {

        nAlert = (nType===notificationType.NOTF_ALERT);

        if (!nAlert)
            nError = (nType===notificationType.NOTF_ERROR);

    }

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
                        ERROR_COLOR:
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
