# 🧠 Mentis App

Plataforma de saúde mental corporativa desenvolvida em React Native com Expo. Suporte para colaboradores, gestores, psicólogos e administradores.

---

## ⚙️ Funcionalidades

### 👤 Funcionário (Employee)

| Recurso                  | Descrição                                                           |
| ------------------------ | ------------------------------------------------------------------- |
| Check-in de Humor        | Registro diário com streak atual e recorde.                         |
| Meditações               | Áudios guiados (cachoeira, paz, místico).                           |
| Exercícios de Respiração | Guia visual com inspiração, pausa e expiração.                      |
| Diário de Gratidão       | Registro diário com prompts.                                        |
| Chat com IA              | Assistente baseado em RAG utilizando documentos de psicologia.      |
| Questionários            | Questionários psicológicos de múltipla escolha e respostas abertas. |

### 👨‍💼 Gestor (Manager)

| Recurso       | Descrição                                                |
| ------------- | -------------------------------------------------------- |
| Dashboard     | Saúde da equipe, usuários ativos e uso por departamento. |
| Indicadores   | Gráficos de atividade e humor semanal.                   |
| Alertas       | Insights de risco por colaborador.                       |
| Relatórios IA | Relatórios estruturados com gráficos e cards.            |
| Gestão        | Administração de usuários e equipes.                     |

### 🩺 Psicólogo (Psychologist)

| Recurso       | Descrição                            |
| ------------- | ------------------------------------ |
| Dashboard     | Visão geral dos atendimentos.        |
| Consultas     | Agendamento de consultas.            |
| Questionários | Acompanhamento de respostas.         |
| Alertas       | Monitoramento de pacientes em risco. |

### 🏢 Administrador (Admin)

| Recurso           | Descrição                           |
| ----------------- | ----------------------------------- |
| Dashboard         | Métricas gerais da plataforma.      |
| Empresas          | Cadastro de empresas/sponsors.      |
| Visão Consolidada | Usuários, patrocinadores e alertas. |

### 🔐 Recursos Gerais

- JWT (Access + Refresh Token)
- Recuperação de senha via Resend
- Reset obrigatório no primeiro login
- Internacionalização (PT-BR, EN, ES)

---

## 🛠 Tech Stack

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

## 📁 Estrutura do Projeto

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
│   │   └── index.ts              # Tema MD3 (React Native Paper)
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

## 🚀 Instalação

```bash
git clone git@github.com:Pettettecos/frontend.git
cd mentis-app
yarn install
cp .env.example .env
yarn start
```

## Variáveis de Ambiente

| Variável              | Descrição       | Padrão                  |
| --------------------- | --------------- | ----------------------- |
| `EXPO_PUBLIC_API_URL` | URL base da API | `http://127.0.0.1:8000` |

## 📦 Scripts

```bash
yarn start
yarn android
yarn ios
yarn web
yarn lint
yarn lint:fix
yarn format
yarn maestro:test
yarn maestro:test:ci
yarn maestro:studio
```

---

## 🧪 Testes de Integração (Maestro)

O projeto utiliza [Maestro](https://maestro.mobile.dev/) para testes de integração de UI.

### Instalação do Maestro

```bash
# macOS
brew tap mobile-dev-inc/tap && brew install maestro

# Linux
curl -Ls "https://get.maestro.mobile.dev" | bash
```

### Executando os Testes

```bash
yarn maestro:test         # Executar todos os fluxos
yarn maestro:test:ci      # Output JUnit para CI/CD
yarn maestro:studio       # Editor visual de testes

# Fluxo específico
maestro test .maestro/flows/002-login-success.yaml
```

### Estrutura dos Fluxos de Teste

```
.maestro/flows/
├── 001-app-launch.yaml                       # Inicialização do app
├── 002-login-success.yaml                    # Login com sucesso
├── 003-login-failure.yaml                    # Login com credenciais inválidas
├── 004-login-validation.yaml                 # Validação de formulário
├── 005-forgot-password.yaml                  # Recuperação de senha
├── 006-forgot-password-validation.yaml       # Validação de forgot password
├── 007-forgot-password-back.yaml             # Voltar da tela de forgot password
├── 010-manager-dashboard-load.yaml           # Dashboard do gestor
├── 011-manager-navigation.yaml               # Navegação do gestor
├── 012-manager-interactions.yaml             # Interações do gestor
├── 013-manager-logout.yaml                   # Logout do gestor
├── 020-enterprise-dashboard-load.yaml        # Dashboard admin
├── 021-enterprise-new-company.yaml           # Cadastro de empresa
├── 022-enterprise-navigation.yaml            # Navegação admin
├── 030-employee-questionnaire-list.yaml      # Lista de questionários
├── 031-employee-questionnaire-navigation.yaml # Navegação questionários
├── 040-employee-chat-list.yaml               # Lista de chats
├── 041-employee-chat-send.yaml               # Envio de mensagem no chat
└── 100-e2e-full-flow.yaml                    # Fluxo completo end-to-end
```

### Pré-requisitos para Testes

- Emulador Android ou dispositivo iOS conectado
- App rodando em modo de desenvolvimento (`yarn android` ou `yarn ios`)
- Backend disponível com as credenciais de teste configuradas

---

## 🌍 Internacionalização

O app detecta automaticamente o idioma do dispositivo via `expo-localization` e oferece suporte a três idiomas:

- **Português (Brasil)** — `pt-BR`
- **Inglês** — `en`
- **Espanhol** — `es`

O usuário pode alterar o idioma a qualquer momento através do seletor na interface. A preferência é persistida no `SecureStore`.

Os arquivos de tradução estão em `src/i18n/locales/{idioma}/common.ts`.

---

## 📚 Documentação e Recursos

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do React Native](https://reactnative.dev/)
- [Documentação do Maestro](https://maestro.mobile.dev/)
