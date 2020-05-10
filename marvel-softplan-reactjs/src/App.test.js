import { MARVEL_API_KEY, MARVEL_PRIVATE_KEY, CHECK_API } from './utils/secure';
import { allHeroes } from './service/api';

test("check if marvel api key exists and is set", 
    () => {
        let validate = (MARVEL_API_KEY!==CHECK_API);
        /*
         * Erro: API Key não encontrada. Você precisa de uma conta na Marvel para obter sua Key
         * Detalhes aqui: https://developer.marvel.com/documentation/authorization
         * Depois de obter sua chave privada e chave publica (Api Key), vá em: ./utils/secure.js
         * e coloque sua api em MARVEL_API_KEY = "SUA_API_KEY"
         * e sua chave privada em MARVEL_PRIVATE_KEY = "SUA_CHAVE_PRIVADA"
         */
        if (!validate)
            console.log("Erro: API Key não encontrada. Você precisa de uma conta na Marvel para obter sua Key\n\
Detalhes aqui: https://developer.marvel.com/documentation/authorization\n\
Depois de obter sua chave privada e chave publica (Api Key), vá em: ./utils/secure.js\n\
e coloque sua api em MARVEL_API_KEY = 'SUA_API_KEY'\n\
e sua chave privada em MARVEL_PRIVATE_KEY = 'SUA_CHAVE_PRIVADA')\n");
        expect(validate).toBe(true)
    }
);

test("check if marvel private key exists and is set",
    () => {
        let validate = MARVEL_PRIVATE_KEY!==CHECK_API;
        /*
         * Erro: Private Key não encontrada. Você precisa de uma conta na Marvel para obter sua Key
         * Detalhes aqui: https://developer.marvel.com/documentation/authorization
         * Depois de obter sua chave privada e chave publica (Api Key), vá em: ./utils/secure.js
         * e coloque sua api em MARVEL_API_KEY = "SUA_API_KEY"
         * e sua chave privada em MARVEL_PRIVATE_KEY = "SUA_CHAVE_PRIVADA"
         */
        if (!validate)
            console.log("Erro: Private Key não encontrada. Você precisa de uma conta na Marvel para obter sua Key\n\
Detalhes aqui: https://developer.marvel.com/documentation/authorization\n\
Depois de obter sua chave privada e chave publica (Api Key), vá em: ./utils/secure.js\n\
e coloque sua api em MARVEL_API_KEY = 'SUA_API_KEY'\n\
e sua chave privada em MARVEL_PRIVATE_KEY = 'SUA_CHAVE_PRIVADA'\n");

        expect(validate).toBe(true);

    }
);

test("tests promises api data marvel in api service",
    () => {
        expect.assertions(1);
        return allHeroes(0).then(
            data => {
                // Esta api deve retornar em sucesso => data.data.code = 200
                // Ao carregar os 8 primeiros heróis
                expect((data.data)?(data.data.code)?data.data.code:1:2).toEqual(200);
            });
    }
);

test("tests promises empty lists in marvel api service",
    () => {
        expect.assertions(1);
        return allHeroes(0, "EsteHeroiNaoExisteEDeveRetornarUmaListaVazia").then(
            res => {
                return expect((res.data)?(res.data.data!==undefined)?res.data.data.count:1:2).toEqual(0);
            }
        )
    }
);

test("simulate an hash error in api key and it should return a forbidden server error 401",
    () => {
        expect.assertions(1);
        return allHeroes(0, null, true).then(
            res => {

            },
            error => {
                return expect(error.err!==0).toEqual(true)
            }
        )
    }
);
