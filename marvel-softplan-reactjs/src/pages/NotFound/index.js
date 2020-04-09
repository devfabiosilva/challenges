import React from 'react';
import Notification from '../../components/notification'

export default function NotFound() {
    return(
        <Notification nError title={"Erro 404. Não encontrado"}>
            Página não encontrada
        </Notification>
    );
}