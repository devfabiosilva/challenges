# Desafio Marvel da Softplan

**Tela da aplicação**:

<p align="center">
 <img width="682px" height="384px" src="https://raw.githubusercontent.com/devfabiosilva/challenges/master/marvel-softplan-reactjs/preview/preview.gif">
</p>

Teste: <a href="https://mymarvelchallenge.netlify.app">desafio marvel</a>

## :dart: Aplicação criada como parte do desafio Softplan de:
- Criar uma lista de cards para exibir os personagens mostrando a imagem e o nome;
- Possibilitar o usuário buscar personagens;
- Na lista o usuário pode ir para a página de detalhes do personagem e ver a lista de series dele;
- Criar um formulário para editar um personagem Marvel (salvando apenas no client-side);
- Utilizar o create-react-app como base;
- Utilizar redux para gerenciar o estado;
- Utilizar react-router para trocar de página;
- Utilizar @testing-library/react para testes;

## :star: Recursos extras adicionados ao projeto
- Interface bilingue (**Inglês** e **Portugês**)
- Suporte a multilinguagem utilizando JSON e React Redux
- Paginação e busca podem ser feitas também na barra de navegação do navegador utilizando recursos nativos do JavaScript
- Sistema de busca e offset utilizam apenas um recurso da API da Marvel
- Detecção do formato e tamanho de arquivo de imagem para edição dos heróis Marvel
- Ocultação da ApiKey da barra de navegação utilizando recusos nativos do JavaScript

---

## :computer: Recursos e tecnologias usadas
- ReactJS
- Styled Component
- ESLint
- React Hooks
- React Redux
- md5
- Axios
- React-paginate
- React-icons
- React Route
	
## :books: Instalação:

Crie uma conta Marvel e obtenha sua API Key [aqui](https://www.marvel.com/signin?referer=https%3A%2F%2Fdeveloper.marvel.com%2Faccount)

Clone o repositório:
```sh
$ git clone https://github.com/devfabiosilva/challenges
```
Acesse a pasta do projeto:
```sh
$ cd marvel-softplan-reactjs
```
Instale as dependências:
```sh
$ yarn install
```
Vá em [marvel-softplan-reactjs/src/utils/secure.js](https://github.com/devfabiosilva/challenges/blob/master/marvel-softplan-reactjs/src/utils/secure.js) e adicione sua **API KEY** e sua **CHAVE PRIVADA** que você obteve da Marvel ao criar sua conta.

```javascript
export const MARVEL_API_KEY = "<SUA API KEY MARVEL>"; // Sua Marvel API KEY
export const MARVEL_PRIVATE_KEY = "<SUA CHAVE PRIVADA MARVEL>"; // Sua Marvel PRIVATE KEY
```

Inicie o servidor:
```sh
$ yarn start
```

## :heavy_check_mark: Para iniciar os testes

```sh
$ yarn test
```

----------

## :heavy_exclamation_mark: Observação

Ainda a página não está responsiva para mobile.

## :pushpin: Pendências

- Fazer pequenos ajustes no CSS para tornar a interface mais amigável
- Colocar responsividades

## :warning: Alertas no navegador

O API da Marvel retorna as imagens dos heróis em http (não seguro) ao invés de HTTPS (seguro). No Chrome aparece no console o alerta e a conversão para o acesso HTTPS. No Firefox geralmente aparece um alerta dizendo que alguns dos componentes não estão critografados. Ignore as mensagens.

## :sunglasses: Sobre

Feito com carinho por Fábio Pereira :innocent:

## :copyright: Licença
MIT

