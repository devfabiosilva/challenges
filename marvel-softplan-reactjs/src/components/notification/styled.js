import styled from 'styled-components';

export const DivNotification = styled.div`
    background: magenta;
    width: 780px;
    height: 380px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DivNotificationContainer = styled.div`
    width: 80%;
    height: 100%;
    background: yellow;
`;

export const DivNotificationTitle = styled.div`
    background: green;
    width:100%;
    height: 25%;
    color: ${props => props.inputColor || "blue"}
`;

export const DivNotificationIcon = styled.div`
    width: 20%;
    background: palevioletred;
    text-align: center;
`;