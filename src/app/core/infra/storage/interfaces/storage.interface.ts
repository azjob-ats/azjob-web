import { eStorageStrategy } from '../enums/storage.enum';

export interface iStorage {
  tableName: string;
  storageStrategy: eStorageStrategy;
  encryptionKey?: string;
}
