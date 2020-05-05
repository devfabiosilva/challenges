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
    err_marvel_server_error_msg: "Erro no servidor Marvel '%d' com a mensagem %e",
    no_descr: "Nenhuma descrição",
    close: "Fechar",
    add_to_fav: "Adicionar aos favoritos",
    fav_already_exist: "Este herói já foi adicionado aos favoritos",
    fav_added: "Herói adicionado aos favoritos",
    fav_list_empty: "Lista de heróis favoritos vazia",
    empty_list_msg: "A lista de heróis está vazia. Adiciona para visualizar ou editar/excluir",
    empty_list_msg_title: "Lista de heróis vazia",
    favorite_hero_found: "Você tem %d herói(s) na lista",
    delete_all_hero_list: "Remover todos",
    found_n_series: "Encontrado: %d série(s)",
    no_series_found: "Nenhuma série encontrada",
    editor_header_title: "Clique nos campos para editar/excluir",
    edit_placeholder_title: "Edite o título aqui",
    editor_btn_cancel_and_close: "Cancelar e fechar",
    editor_btn_save_and_close: "Salvar e fechar",
    serie_could_not_be_empty: "Série não pode estar vazia",
    serie_already_exists: "Série já existe %d",
    hero_name_already_exists: "Herói '%d' já existe",
    hero_name_empty_err: "Nome do herói não deve estar vazio"

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
    err_marvel_server_error_msg: "Marvel server error '%d' with message %e",
    no_descr: "No description",
    close: "Close",
    add_to_fav: "Add to favorites",
    fav_already_exist: "This hero is already added to favorites",
    fav_added: "Hero added to favorites",
    fav_list_empty: "Empty favorite hero list",
    empty_list_msg: "Hero list is empty. Please add at least one hero to edit/delete",
    empty_list_msg_title: "Empty hero list",
    favorite_hero_found: "You have %d hero(es)",
    delete_all_hero_list: "Remove all",
    found_n_series: "Found %d serie(s)",
    no_series_found: "No series found",
    editor_header_title: "Click in field to edit/delete",
    edit_placeholder_title: "Edit title here",
    editor_btn_cancel_and_close: "Cancel and close",
    editor_btn_save_and_close: "Save and close",
    serie_could_not_be_empty: "Serie can not have empty field",
    serie_already_exists: "Serie already exists %d",
    hero_name_already_exists: "Hero '%d' already exists",
    hero_name_empty_err: "Hero name can not be empty"

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

