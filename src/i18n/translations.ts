export interface Translations {
  login: {
    title: string;
    tagline: string;
    cardTitle: string;
    email: string;
    password: string;
    forgotPassword: string;
    enter: string;
    footer: string;
    error: {
      invalidCredentials: string;
    };
    validation: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
    };
  };
  forgotPassword: {
    title: string;
    cardTitle: string;
    description: string;
    email: string;
    sendInstructions: string;
    backToLogin: string;
    successTitle: string;
    successMessage: string;
    backToLoginButton: string;
    tipTitle: string;
    tipText: string;
  };
  resetPassword: {
    title: string;
    cardTitle: string;
    description: string;
    newPassword: string;
    confirmPassword: string;
    save: string;
    successTitle: string;
    successMessage: string;
    goToLogin: string;
    passwordMismatch: string;
    passwordMinLength: string;
  };
  common: {
    back: string;
    logout: string;
  };
  managerDashboard: {
    headerTitle: string;
    headerBody: string;
    healthTitle: string;
    healthComparison: string;
    activeUsersTitle: string;
    activeUsersCaption: string;
    riskAlertsTitle: string;
    riskAlertsCaption: string;
    riskAlertsButton: string;
    sentimentTitle: string;
    sentimentSubtitle: string;
    sentimentBadge: string;
    sentimentLegendHappy: string;
    sentimentLegendCalm: string;
    sentimentLegendTired: string;
    sentimentLegendStressed: string;
    sentimentWeek1: string;
    sentimentWeek2: string;
    sentimentWeek3: string;
    sentimentWeek4: string;
    insightsTitle: string;
    insightsButton: string;
    departmentTitle: string;
    departmentEngineering: string;
    departmentDesign: string;
    departmentSales: string;
    dayMon: string;
    dayTue: string;
    dayWed: string;
    dayThu: string;
    dayFri: string;
    navDashboard: string;
    navUsers: string;
    navSettings: string;
  };
  splash: {
    title: string;
    subtitle: string;
  };
}
