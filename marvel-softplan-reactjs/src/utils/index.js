import { useLocation } from 'react-router-dom';

export function useQuery() {
    //minha referencia: https://reacttraining.com/react-router/web/example/query-parameters (linha 29)
    return new URLSearchParams(useLocation().search);
}

export function f_getKey() {
    return Math.random().toString(36).substring(2);
}



//export const MARVEL_URL="http://localhost";
export const MARVEL_URL='http://gateway.marvel.com/v1/public/';
// https://developer.marvel.com/documentation/authorization