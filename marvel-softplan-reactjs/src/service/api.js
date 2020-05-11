import axios from 'axios';
import md5 from 'md5';
import { credentials } from '../utils/secure'
import { MARVEL_URL } from '../utils';

const api = axios.create({
    baseURL: MARVEL_URL
});

export const THUMBNAIL_PER_PAGE = 8;


/*
 * A função 'allHeroes' de busca de todos os heróis ou heróis específicos e o offset foi 
 * simplificada em apenas um recurso da Marvel em apenas uma função
 * 
 *  - offset: offset da consulta
 *  - findHero: Herói a ser buscado. Se null busca todos os heróis do banco de dados da Marvel
 *  - simulateError: Reservado para o @test
 * 
 *  Retorno no SUCESSO: Dados da Marvel
 * 
 *  Retorno no ERRO: {err: "Erro", errTtx: "Razão do erro", internalError: "Erro interno do servico marvel (se disponivel)"}
 */

export async function allHeroes(offset, findHero=null, simulateError=false) {

    const { ts, apiKey, privKey } = credentials;
    // Detalhes aqui: https://developer.marvel.com/documentation/authorization
    const hash = (simulateError)?"testError":md5(ts + privKey + apiKey);
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
