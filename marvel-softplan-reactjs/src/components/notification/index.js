import React from 'react';
import {
    DivNotification, 
    DivNotificationContainer, 
    DivNotificationIcon, 
    DivNotificationTitle 
} from './styled';
import { FiInfo, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

const NOTF_ICON_SZ = 138;

function NotfIcon( { nAlert, nError } ) {

    if (nAlert)
        return <FiAlertTriangle size={NOTF_ICON_SZ} color="yellow"/>

    if (nError)
        return <FiXCircle size={NOTF_ICON_SZ} color="red"/>

    return <FiInfo size={NOTF_ICON_SZ} color="blue" />

}

export default function Notification({ nAlert, nError, children, title }) {
    return (
        <DivNotification>
            <DivNotificationIcon>
                <NotfIcon nAlert={nAlert} nError={nError} />
            </DivNotificationIcon>
            <DivNotificationContainer>
                <DivNotificationTitle
                    inputColor={
                        (nAlert)?
                        "yellow":
                        (nError)?
                        "red":
                        null
                    }
                >
                    {
                        (title)?title:(nAlert)?"Alert":(nError)?"Error":"Info"
                    }
                </DivNotificationTitle>
                {children}
            </DivNotificationContainer>
        </DivNotification>
    );
}