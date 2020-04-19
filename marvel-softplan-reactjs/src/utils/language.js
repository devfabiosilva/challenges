export const L_PT_BR = "pt-br";
export const L_EN_US = "en-us";
const MARVEL_LANGUAGE = 'marvel_language';

export const LANG_PT_BR = {

    search_hero: "Buscar herói",
    next: "Próximo  >",
    previous: "< Anterior",
    go_back: "Voltar",
    not_found: "Não encontrado",
    goto_saved_list: "Ir para lista de itens salvos",
    err404_title: "Erro 404. Não encontrado",
    err404_pag_not_found: "Página não encontrada",
    alert_title: "Alerta",
    info_title: "Info",
    error_title: "Erro",
    alert_api_conf_title: "Configuração de API necessária",
    alert_api_conf: "Você precisa incluir sua chave API e sua chave privada em ./src/utils/secure.js nos campos 'MARVEL_API_KEY' (apiKey) para chave API e 'MARVEL_PRIVATE_KEY' (privKey) para a chave privada",
    pag_header_search_text: "Resultado(s): Encontrado %d heróis [Página %e de %f]",
    loading_characters: "Carregando heróis... espere ...",
    loading_page: "Carregando página %d de %e",
    finding: 'Encontrando "%d" ...',
    err_search_not_found: 'Herói não encontrado: "%d"',
    err_not_found_title: "Não encontrado",
    err_marvel_server_error_msg: "Erro no servidor Marvel '%d' com a mensagem %e"

}

export const LANG_EN_US = {

    search_hero: "Search hero",
    next: "Next >",
    previous: "< Previous",
    go_back: "Go back",
    not_found: "Not found",
    goto_saved_list: "Go to saved items list",
    err404_title: "Error 404. Not found",
    err404_pag_not_found: "Page not found",
    alert_title: "Alert",
    info_title: "Info",
    error_title: "Error",
    alert_api_conf_title: "API configuration needed",
    alert_api_conf: "You need to change your API key and your private key in ./src/utils/secure.js in consts 'MARVEL_API_KEY' (apiKey) and 'MARVEL_PRIVATE_KEY' (privKey)",
    pag_header_search_text: "Result(s): Found %d heroes(s) [Page %e of %f]",
    loading_characters: "Loading heroes... please wait ...",
    loading_page: "Loading page %d of %e",
    finding: 'Finding "%d"...',
    err_search_not_found: 'Hero NOT FOUND: "%d"',
    err_not_found_title: "NOT FOUND",
    err_marvel_server_error_msg: "Marvel server error '%d' with message %e"

}

export function getMarvelLanguageFromLocalStorage() {

    let language = localStorage.getItem(MARVEL_LANGUAGE);

    if ( ( language === null ) || ( language === undefined ) ) {

        localStorage.setItem(MARVEL_LANGUAGE, L_EN_US)
        language = localStorage.getItem(MARVEL_LANGUAGE);

    }

    return language;

}

export function setMarvelLanguageToLocalStorage(lang) {

    localStorage.setItem(MARVEL_LANGUAGE, lang);

    return localStorage.getItem(MARVEL_LANGUAGE);

}

