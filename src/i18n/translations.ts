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
  psychologistArea: {
    brand: string;
    tabs: {
      dashboard: string;
      collaborators: string;
      questionnaires: string;
      schedule: string;
    };
    dashboard: {
      title: string;
      description: string;
      insightsTitle: string;
      wellbeingMetric: string;
      wellbeingLabel: string;
      requestsTitle: string;
      requestOneName: string;
      requestOneDescription: string;
      requestTwoName: string;
      requestTwoDescription: string;
    };
    collaborators: {
      title: string;
      description: string;
      collaboratorOneName: string;
      collaboratorOneStatus: string;
      collaboratorTwoName: string;
      collaboratorTwoStatus: string;
      collaboratorThreeName: string;
      collaboratorThreeStatus: string;
    };
    questionnaires: {
      title: string;
      description: string;
      gadTitle: string;
      gadDescription: string;
      phqTitle: string;
      phqDescription: string;
      moodTitle: string;
      moodDescription: string;
    };
    schedule: {
      title: string;
      description: string;
      appointmentOneTitle: string;
      appointmentOneDescription: string;
      appointmentTwoTitle: string;
      appointmentTwoDescription: string;
      appointmentThreeTitle: string;
      appointmentThreeDescription: string;
    };
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
  newCompany: {
    headerTitle: string;
    title: string;
    subtitle: string;
    logoLabel: string;
    logoHint: string;
    companyName: string;
    companyNamePlaceholder: string;
    cnpj: string;
    cnpjPlaceholder: string;
    contactName: string;
    contactNamePlaceholder: string;
    contactPhone: string;
    contactPhonePlaceholder: string;
    submitButton: string;
    infoTitle: string;
    infoBody: string;
    infoBodyBold: string;
    infoBodyEnd: string;
  };
  enterpriseDashboard: {
    headerTitle: string;
    headerBody: string;
    createCompany: string;
    registeredCompanies: string;
    activeUsers: string;
    vsLastMonth: string;
    recentCompanies: string;
    seeAll: string;
    collaborators: string;
    platformInsights: string;
    storageUsage: string;
    apiRequests: string;
    recentAlerts: string;
    licenseExpiring: string;
    licenseExpiringBody: string;
    newRoleRequest: string;
    newRoleRequestBody: string;
    navHome: string;
    navSettings: string;
  };
  splash: {
    title: string;
    subtitle: string;
  };
}
