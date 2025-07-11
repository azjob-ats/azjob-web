import { StorageStrategy } from '@core/infra/storage/enums/storage.enum';

export const environment = {
  API_BASE_URL: 'https://api-dev.example.com',
  APP_NAME: import.meta.env.NG_APP_NAME,
  PAY_LOAD_STORAGE: {
    systemLanguage: {
      encryptionKey: import.meta.env.NG_APP_SYSTEM_LANGUAGE_ENCRYPTION_KEY,
      tableName: import.meta.env.NG_APP_SYSTEM_LANGUAGE_TABLE_NAME,
      storageStrategy: StorageStrategy.LOCAL_STORAGE,
    },
    token: {
      encryptionKey: '',
      tableName: 'token',
      storageStrategy: StorageStrategy.LOCAL_STORAGE,
    },
    user: {
      encryptionKey: '',
      tableName: 'user',
      storageStrategy: StorageStrategy.LOCAL_STORAGE,
    },
  },
  API: {
    JOBS: 'jobs',
    USERS: 'users',
    APPLICATIONS: 'applications',
  },
  SIDEBAR: {
    banner: {
      avatar: 'image/user-default.png',
    },
  },
  ROUTES: {
    ROOT: '/',
    HOME: {
      ROOT: 'home',
    },
    FOR_YOU: {
      ROOT: 'for-you',
    },
    MY_COMPANY: {
      ROOT: 'my-company',
    },
    APPLICATION: {
      ROOT: 'application',
    },
    NOTIFICATION: {
      ROOT: 'notification',
    },
    RESUME: {
      ROOT: 'resume',
    },
    SHOWCASE: {
      ROOT: 'showcase',
      LOGIN: 'login',
      REGISTER: 'register',
      FORGOT: 'forgot-password',
    },
    CHANGE_LANGUAGE: {
      ROOT: 'change-language',
      LOGIN: 'login',
      REGISTER: 'register',
      FORGOT: 'forgot-password',
    },
    AUTH: {
      ROOT: 'auth',
      SIGN_IN: 'sign-in',
      SIGN_UP: 'sign-up',
      PANEL_SIGN_IN: 'panel-sign-in',
      PANEL_SIGN_UP: 'panel-sign-up',
      CONFIRM_EMAIL: 'confirm-email',
      RESET_PASSWORD: 'reset-password',
      REGISTER: 'register',
      FORGOT: 'forgot-password',
      LOGOUT: 'logout',
    },
    DASHBOARD: {
      ROOT: 'dashboard',
      HOME: 'home',
      PROFILE: 'profile',
      JOB_DETAIL: 'jobs/:id',
    },
    ADMIN: {
      ROOT: 'admin',
      USERS: 'users',
      SETTINGS: 'settings',
    },
    REDIRECT: {
      ROOT: 'redirect',
      NOT_FOUND: 'not-found',
      UNAUTHORIZED: 'unauthorized',
    },
  },
};
