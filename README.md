# Mentis App

Um projeto mobile desenvolvido com **Expo**, **React Native** e **TypeScript**.

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
git clone git@github.com:Pettettecos/frontend.git
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

## Testes de Integracao com Maestro

Este projeto utiliza [Maestro](https://maestro.mobile.dev/) para testes de integracao UI.

### Instalacao do Maestro

**macOS:**
```bash
brew tap mobile-dev-inc/tap
brew install maestro
```

**Linux:**
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

### Configuracao

1. Copie o arquivo de exemplo de variaveis de ambiente:
```bash
cp .maestro/.env.example .maestro/.env
```

2. Preencha as credenciais de teste no arquivo `.maestro/.env`

### Executando os Testes

```bash
# Executar todos os testes
yarn maestro:test

# Executar testes com output JUnit (CI)
yarn maestro:test:ci

# Abrir Maestro Studio para criar testes visuais
yarn maestro:studio

# Executar um fluxo especifico
maestro test .maestro/flows/002-login-success.yaml
```

### Estrutura dos Testes

```
.maestro/
├── .env.example          # Variaveis de ambiente para testes
└── flows/
    ├── 001-app-launch.yaml           # Teste de inicializacao
    ├── 002-login-success.yaml        # Login com sucesso
    ├── 003-login-failure.yaml        # Login com credenciais invalidas
    ├── 004-login-validation.yaml     # Validacao de formulario de login
    ├── 005-forgot-password.yaml      # Recuperacao de senha
    ├── 006-forgot-password-validation.yaml
    ├── 007-forgot-password-back.yaml
    ├── 010-manager-dashboard-load.yaml
    ├── 011-manager-navigation.yaml
    ├── 012-manager-interactions.yaml
    ├── 013-manager-logout.yaml
    ├── 020-enterprise-dashboard-load.yaml
    ├── 021-enterprise-new-company.yaml
    ├── 022-enterprise-navigation.yaml
    ├── 030-employee-questionnaire-list.yaml
    ├── 031-employee-questionnaire-navigation.yaml
    ├── 040-employee-chat-list.yaml
    ├── 041-employee-chat-send.yaml
    └── 100-e2e-full-flow.yaml        # Fluxo E2E completo
```

### Pre-requisitos para Testes

- Emulador Android ou dispositivo iOS conectado
- App rodando em modo de desenvolvimento (`yarn android` ou `yarn ios`)
- Credenciais de teste configuradas em `.maestro/.env`

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
