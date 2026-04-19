# Mentis App

Um projeto mobile desenvolvido com **Expo**, **React Native**, **TypeScript** e **React 19**.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Yarn** v1.22+ ([Instalação](https://classic.yarnpkg.com/en/docs/install))
- **Expo CLI** (será instalado como dependência do projeto)

### Para rodar no Android:

- **Android Studio** com emulador configurado, OU
- Um dispositivo Android fisicamente conectado

### Para rodar no iOS (apenas macOS):

- **Xcode** instalado
- Um simulador iOS ou dispositivo físico

## Instalação

1. **Clone o repositório**:

```bash
git clone <seu-repositorio>
cd mentis-app
```

2. **Instale as dependências**:

```bash
yarn install
```

## Rodando o Projeto

### 1. Iniciar o Expo dev server:

```bash
yarn start
```

Você verá um menu com as opções disponíveis.

### 2. Escolher uma plataforma:

#### Web

```bash
yarn web
```

Abre automaticamente no navegador padrão em `http://localhost:19006`

#### Android

```bash
yarn android
```

Certifique-se de que o emulador Android está rodando ou um dispositivo está conectado.

#### iOS

```bash
yarn ios
```

Abre o simulador do iOS automaticamente (apenas em macOS).

#### Expo App (celular físico)

1. Instale o app **Expo** em seu celular:
   - [iOS](https://apps.apple.com/us/app/expo-go/id982107779)
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Execute `yarn start`
3. Escaneie o QR code exibido no terminal com seu celular

## Scripts Disponíveis

```bash
# Iniciar dev server (menu interativo)
yarn start

# Rodar em web
yarn web

# Rodar em Android
yarn android

# Rodar em iOS
yarn ios

# Linting - verifica qualidade do código
yarn lint

# Linting - corrige erros automaticamente
yarn lint:fix

# Formatação - formata o código com Prettier
yarn format
```

## Recursos Úteis

- [Documentação Expo](https://docs.expo.dev/)
- [Documentação React Native](https://reactnative.dev/)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação ESLint](https://eslint.org/docs/)
- [Documentação Prettier](https://prettier.io/docs/en/index.html)

## Notas Adicionais

- O projeto usa **ES modules** (import/export) em vez de CommonJS
- TypeScript é necessário - todos os arquivos usam `.ts` ou `.tsx`
- ESLint e Prettier rodam automaticamente em formato e lint scripts
