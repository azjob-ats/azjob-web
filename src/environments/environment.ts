import { StorageStrategy } from '@core/infra/storage/enums/storage.enum';

export const environment = {
  apiBaseUrl: 'https://api-dev.example.com',
  APP_NAME: import.meta.env.NG_APP_NAME,
  payloadStorage: {
    systemLanguage: {
      encryptionKey: import.meta.env.NG_APP_SYSTEM_LANGUAGE_ENCRYPTION_KEY,
      tableName: import.meta.env.NG_APP_SYSTEM_LANGUAGE_TABLE_NAME,
      storageStrategy: StorageStrategy.LOCAL_STORAGE,
    },
  },
  API: {
    JOBS: 'jobs',
    USERS: 'users',
    APPLICATIONS: 'applications',
  },
  ROUTES: {
    ROOT: '',
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
      LOGIN: 'login',
      REGISTER: 'register',
      FORGOT: 'forgot-password',
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
    ERROR: {
      NOT_FOUND: 'not-found',
      UNAUTHORIZED: 'unauthorized',
    },
  },
};
