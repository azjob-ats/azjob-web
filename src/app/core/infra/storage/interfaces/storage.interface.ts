import { StorageStrategy } from '@core/infra/storage/enums/storage.enum';

export interface Storage {
  tableName: string;
  storageStrategy: StorageStrategy;
  encryptionKey?: string;
}
