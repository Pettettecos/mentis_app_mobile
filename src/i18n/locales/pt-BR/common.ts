import type { Translations } from '../../translations';

const ptBR: Translations = {
  login: {
    title: 'MentisTech',
    tagline: 'Sua jornada para o bem-estar mental começa aqui',
    cardTitle: 'Acesse sua conta',
    email: 'E-mail',
    password: 'Senha',
    forgotPassword: 'Esqueceu a senha?',
    enter: 'ENTRAR',
    footer: '© 2026 MentisTech • v1.0.0',
  },
  forgotPassword: {
    title: 'MentisTech',
    cardTitle: 'Recuperar Senha',
    description:
      'Insira seu e-mail cadastrado para receber as instruções de recuperação.',
    email: 'E-mail',
    sendInstructions: 'ENVIAR INSTRUÇÕES',
    backToLogin: 'Lembrou a senha? Fazer login',
    successTitle: 'Instruções enviadas',
    successMessage:
      'Instruções enviadas para {{email}}. Verifique sua caixa de entrada.',
    backToLoginButton: 'CRIAR NOVA SENHA',
    tipTitle: 'Dica do Especialista',
    tipText:
      'Verifique sua pasta de spam se não receber o e-mail em 5 minutos.',
  },
  resetPassword: {
    title: 'MentisTech',
    cardTitle: 'Criar Nova Senha',
    description: 'Sua nova senha deve ser diferente da senha anterior.',
    newPassword: 'Nova senha',
    confirmPassword: 'Confirmar senha',
    save: 'SALVAR SENHA',
    successTitle: 'Senha alterada!',
    successMessage: 'Sua senha foi alterada com sucesso.',
    goToLogin: 'IR PARA O LOGIN',
    passwordMismatch: 'As senhas não coincidem',
    passwordMinLength: 'A senha deve ter pelo menos 6 caracteres',
  },
  common: {
    back: 'Voltar',
  },
  splash: {
    title: 'MentisTech',
    subtitle: 'Sua jornada para o bem-estar mental começa aqui',
  },
};

export default ptBR;
