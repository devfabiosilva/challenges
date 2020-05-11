import { useLocation } from 'react-router-dom';

 //My reference: https://reacttraining.com/react-router/web/example/query-parameters (line 29)
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function f_getKey() {
    return Math.random().toString(36).substring(2);
}

// https://developer.marvel.com/documentation/authorization
export const MARVEL_URL='https://gateway.marvel.com/v1/public/';
