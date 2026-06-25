# Mentis App

## Funcionalidades

### Funcionário (Employee)

- **Check-in diário de humor** com streak (sequência atual e recorde)
- **Meditações guiadas** com áudio (cachoeira, paz, místico)
- **Exercícios de respiração** com guia visual (inspirar, segurar, expirar)
- **Diário de gratidão** com prompts diários
- **Chat com IA** — conversa com assistente baseado em RAG (documentos de psicologia)
- **Questionários psicológicos** — abertos e de múltipla escolha

### Gestor (Manager)

- **Dashboard da equipe** com índice de saúde, usuários ativos e uso por departamento
- **Gráficos de atividade** diária e humor semanal
- **Alertas de risco** com insights por colaborador
- **Relatórios gerados por IA** com blocos estruturados (parágrafos, cards, gráficos)
- **Gestão de usuários e times** (criar, remover, listar)

### Psicólogo (Psychologist)

- **Dashboard** com visão geral dos atendimentos
- **Agendamento de consultas**
- **Acompanhamento de questionários**
- **Alertas de risco** dos pacientes

### Administrador (Admin)

- **Dashboard de métricas** da plataforma
- **Cadastro de empresas/sponsors** com logo, CNPJ e dados de contato
- **Visão consolidada** de usuários, patrocinadores e alertas

### Geral

- **Autenticação JWT** com access + refresh tokens
- **Recuperação de senha** por e-mail (código de 6 dígitos via Resend)
- **Reset de senha obrigatório** no primeiro login
- **Internacionalização** (Português, Inglês e Espanhol)

---

## Tech Stack

### Mobile

| Tecnologia                                                                             | Versão | Descrição                      |
| -------------------------------------------------------------------------------------- | ------ | ------------------------------ |
| [Expo](https://expo.dev/)                                                              | 54     | Framework React Native         |
| [React Native](https://reactnative.dev/)                                               | 0.81.5 | UI multiplataforma             |
| [React](https://react.dev/)                                                            | 19.1.0 | Biblioteca de componentes      |
| [TypeScript](https://www.typescriptlang.org/)                                          | 5.9    | Tipagem estática               |
| [Expo Router](https://docs.expo.dev/router/introduction/)                              | 6      | Roteamento file-based          |
| [React Native Paper](https://callstack.github.io/react-native-paper/)                  | 5      | Material Design 3              |
| [React Hook Form](https://react-hook-form.com/)                                        | 7      | Gerenciamento de formulários   |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)         | 4      | Animações de alto desempenho   |
| [React Native Gifted Charts](https://gifted-charts.web.app/)                           | 1.4    | Gráficos interativos           |
| [i18next](https://www.i18next.com/)                                                    | 26     | Internacionalização            |
| [Axios](https://axios-http.com/)                                                       | 1.16   | Cliente HTTP                   |
| [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)             | 15     | Armazenamento seguro de tokens |
| [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/)                               | 16     | Reprodução de áudio            |
| [React Native Toast Message](https://github.com/calintamas/react-native-toast-message) | 2.3    | Notificações toast             |

### Qualidade de Código

| Ferramenta                             | Descrição               |
| -------------------------------------- | ----------------------- |
| [ESLint](https://eslint.org/)          | Linting TypeScript      |
| [Prettier](https://prettier.io/)       | Formatação de código    |
| [Maestro](https://maestro.mobile.dev/) | Testes de integração UI |

---

## Estrutura do Projeto

```
mentis-app/
├── app/                          # Rotas Expo Router (file-based)
│   ├── _layout.tsx               # Layout raiz (providers, i18n)
│   ├── index.tsx                 # Splash + redirect
│   ├── (public)/                 # Rotas públicas
│   │   ├── login.tsx
│   │   ├── forgot-password.tsx
│   │   └── reset-password.tsx
│   └── (protected)/              # Rotas autenticadas
│       ├── (admin)/              # Dashboard, Nova Empresa
│       ├── (employee)/           # Dashboard, Chat, Meditação, Respiração,
│       │   │                      Diário, Questionários, Configurações
│       │   ├── chat/
│       │   │   ├── index.tsx     # Lista de conversas
│       │   │   └── [id].tsx      # Conversa individual
│       │   └── questionnaires/
│       │       ├── index.tsx     # Lista de questionários
│       │       └── [id].tsx      # Questionário individual
│       ├── (manager)/            # Dashboard, Usuários, Times, Alertas,
│       │                          Relatórios, Configurações
│       └── (psychologist)/       # Dashboard, Consultas, Questionários
├── src/                          # Código fonte
│   ├── components/               # Componentes reutilizáveis
│   │   ├── BottomNav/            # Navegação inferior por papel
│   │   ├── TopBar/               # Barra superior
│   │   ├── GradientText/         # Texto com gradiente
│   │   ├── LanguageSelector/     # Seletor de idioma
│   │   └── chat/                 # Subcomponentes do chat
│   ├── screens/                  # Telas (lógica + UI)
│   │   ├── LoginScreen/
│   │   ├── ForgotPasswordScreen/
│   │   ├── ResetPasswordScreen/
│   │   ├── AdminScreens/
│   │   ├── EmployeeScreens/
│   │   ├── ManagerScreens/
│   │   └── PsychologistScreens/
│   ├── services/api/             # Camada de API
│   │   ├── client.ts             # Axios + interceptors (JWT + refresh)
│   │   ├── config.ts             # URL da API
│   │   ├── types.ts              # Tipos TypeScript
│   │   └── *.ts                  # Módulos por domínio
│   ├── context/
│   │   └── AuthContext.tsx        # Estado global de autenticação
│   ├── i18n/
│   │   ├── index.ts              # Configuração i18next
│   │   ├── translations.ts       # Interface de traduções
│   │   └── locales/
│   │       ├── pt-BR/common.ts
│   │       ├── en/common.ts
│   │       └── es/common.ts
│   ├── theme/
│   │   ├── colors.ts             # Paleta de cores
│   │   └── index.ts             # Tema MD3 (React Native Paper)
│   └── utils/
│       └── chatDate.ts           # Formatação de datas
├── assets/                       # Recursos estáticos
│   ├── icon.png
│   ├── splash.png
│   └── audios/                   # Áudios de meditação
├── .maestro/                     # Testes de integração UI
│   ├── config.yaml
│   └── flows/                    # Cenários de teste
├── app.json                      # Configuração Expo
├── tsconfig.json                 # Configuração TypeScript
├── babel.config.cjs              # Configuração Babel
├── eslint.config.js              # Configuração ESLint (flat config)
├── .prettierrc.json              # Configuração Prettier
└── package.json                  # Dependências e scripts
```

---

## Instalação

```bash
git clone git@github.com:Pettettecos/frontend.git
cd mentis-app
```

```bash
yarn install
cp .env.example .env
# Configure EXPO_PUBLIC_API_URL no arquivo .env
```

```bash
yarn start           # Servidor de desenvolvimento Expo (menu interativo)
yarn android         # Executar no Android
yarn ios             # Executar no iOS
```

---

## Variáveis de Ambiente

| Variável              | Descrição       | Padrão                  |
| --------------------- | --------------- | ----------------------- |
| `EXPO_PUBLIC_API_URL` | URL base da API | `http://127.0.0.1:8000` |

## Scripts Disponíveis

```bash
yarn start               # Iniciar servidor de desenvolvimento
yarn android             # Executar no Android
yarn ios                 # Executar no iOS
yarn web                 # Executar no navegador
yarn lint                # Verificar qualidade do código (ESLint)
yarn lint:fix            # Corrigir erros de lint automaticamente
yarn format              # Formatar código (Prettier)
yarn maestro:test        # Executar testes de integração
yarn maestro:test:ci     # Testes com output JUnit (CI)
yarn maestro:studio      # Abrir editor visual de testes
```

---

## Testes de Integração (Maestro)

O projeto utiliza [Maestro](https://maestro.mobile.dev/) para testes de integração de UI.

### Instalação do Maestro

```bash
# macOS
brew tap mobile-dev-inc/tap
brew install maestro

# Linux
curl -Ls "https://get.maestro.mobile.dev" | bash
```

### Executando os Testes

```bash
yarn maestro:test           # Executar todos os fluxos
yarn maestro:test:ci        # Output JUnit para CI/CD
yarn maestro:studio         # Editor visual de testes
maestro test .maestro/flows/002-login-success.yaml   # Fluxo específico
```

### Estrutura dos Fluxos de Teste

```
.maestro/flows/
├── 001-app-launch.yaml                     # Inicialização do app
├── 002-login-success.yaml                  # Login com sucesso
├── 003-login-failure.yaml                  # Login com credenciais inválidas
├── 004-login-validation.yaml               # Validação de formulário
├── 005-forgot-password.yaml                # Recuperação de senha
├── 006-forgot-password-validation.yaml     # Validação de forgot password
├── 007-forgot-password-back.yaml           # Voltar da tela de forgot password
├── 010-manager-dashboard-load.yaml         # Dashboard do gestor
├── 011-manager-navigation.yaml             # Navegação do gestor
├── 012-manager-interactions.yaml           # Interações do gestor
├── 013-manager-logout.yaml                 # Logout do gestor
├── 020-enterprise-dashboard-load.yaml      # Dashboard admin
├── 021-enterprise-new-company.yaml         # Cadastro de empresa
├── 022-enterprise-navigation.yaml          # Navegação admin
├── 030-employee-questionnaire-list.yaml    # Lista de questionários
├── 031-employee-questionnaire-navigation.yaml  # Navegação questionários
├── 040-employee-chat-list.yaml             # Lista de chats
├── 041-employee-chat-send.yaml             # Envio de mensagem no chat
└── 100-e2e-full-flow.yaml                  # Fluxo completo end-to-end
```

### Pré-requisitos para Testes

- Emulador Android ou dispositivo iOS conectado
- App rodando em modo de desenvolvimento (`yarn android` ou `yarn ios`)
- Backend disponível com as credenciais de teste configuradas

---

## Internacionalização

O app detecta automaticamente o idioma do dispositivo via `expo-localization` e oferece suporte a três idiomas:

- **Português (Brasil)** — `pt-BR`
- **Inglês** — `en`
- **Espanhol** — `es`

O usuário pode alterar o idioma a qualquer momento através do seletor de idioma na interface. A preferência é persistida no `SecureStore`.

Os arquivos de tradução estão em `src/i18n/locales/{idioma}/common.ts`.

---

## Documentação e Recursos

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do React Native](https://reactnative.dev/)
- [Documentação do Maestro](https://maestro.mobile.dev/)
