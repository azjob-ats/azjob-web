import { eStorageStrategy } from "@core/infra/storage/enums/storage.enum";

export const environment = {
  production: true,
  APP_NAME: import.meta.env.NG_APP_NAME,
  payloadStorage: {
    systemLanguage: {
      encryptionKey: import.meta.env.NG_APP_SYSTEM_LANGUAGE_ENCRYPTION_KEY,
      tableName: import.meta.env.NG_APP_SYSTEM_LANGUAGE_TABLE_NAME,
      storageStrategy: eStorageStrategy.LOCAL_STORAGE,
    },
  },
};
