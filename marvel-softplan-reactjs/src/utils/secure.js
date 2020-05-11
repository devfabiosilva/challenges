/*
 * Para iniciar a aplicação deve se primeiro obter a chave publica e privada da Marvel.
 * Para isso, vá em https://developer.marvel.com/documentation/authorization para mais detalhes
 * e criar uma conta para obter acesso ao API.
 */
export const CHECK_API = 'checkapi';
export const MARVEL_API_KEY = CHECK_API; // Sua Marvel API KEY
export const MARVEL_PRIVATE_KEY = CHECK_API; // Sua Marvel PRIVATE KEY

export const credentials = {

    ts: new Date().getTime(),
    apiKey: MARVEL_API_KEY,
    privKey: MARVEL_PRIVATE_KEY

}

export function checkApiKey() {
    return ((MARVEL_API_KEY===CHECK_API)||(MARVEL_PRIVATE_KEY===CHECK_API));
}