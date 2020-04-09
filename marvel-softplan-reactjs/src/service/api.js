import axios from 'axios';
import md5 from 'md5';
import { credentials } from '../utils/secure'

const api = axios.create({
    baseURL: MARVEL_URL
});

export async function allHeroes(offset) {

    const { ts, apiKey, privKey } = credentials;
    const hash = md5(ts + privKey + apiKey);
    const param = `/characters?limit=5&offset=${offset}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    const res = await api.get(param);
    return {link: param, res}

}
/*
import axios from 'axios';
import { MARVEL_URL } from '../utils';

const api = axios.create({
    baseURL: MARVEL_URL
});

export default api;
*/