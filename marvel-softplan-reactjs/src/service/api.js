import axios from 'axios';
import md5 from 'md5';
import { credentials } from '../utils/secure'
import { MARVEL_URL } from '../utils';

const api = axios.create({
    baseURL: MARVEL_URL
});

export const THUMBNAIL_PER_PAGE = 8;

export async function allHeroes(offset, findHero=null) {

    const { ts, apiKey, privKey } = credentials;
    const hash = md5(ts + privKey + apiKey);
    const param = `/characters?${(findHero)?`nameStartsWith=${findHero}&`:""}limit=${THUMBNAIL_PER_PAGE}&offset=${offset}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    let data;

    await api.get(param).then(

        (res) => data=res,
        (err) => {

            data = {

                err: err.request.status,
                errTxt: err.request.statusText,
                internalError: (err.request.responseText)?JSON.parse(err.request.responseText):"Unknown"

            }
            
        }

    )

    return new Promise ((resolve, reject) => (data.data)?resolve(data):reject(data));

}
