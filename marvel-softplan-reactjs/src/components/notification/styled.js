import styled from 'styled-components';
export const ALERT_COLOR = "#e8b006";//"#FFC107";
export const INFO_COLOR = "#0099ff";
export const ERROR_COLOR = "red";

export const DivNotification = styled.div`
    /* background: magenta; */
    width: 780px;
    height: 380px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DivNotificationContainer = styled.div`
    width: 80%;
    height: 100%;
    /* background: yellow; */
`;

export const DivNotificationTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: green; */
    width:100%;
    height: 25%;
    color: ${props => props.inputColor || INFO_COLOR};
`;

export const DivNotificationIcon = styled.div`
    width: 20%;
    /* background: palevioletred; */
    text-align: center;
`;
