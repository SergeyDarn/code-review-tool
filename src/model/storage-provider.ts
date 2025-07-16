import type { Storage } from '@/abstracts';
import LocalStorage from './local-storage';

export default class StorageProvider {
    private static storage: Storage

    public static getStorage(): Storage {
        if (this.storage) {
            return this.storage;
        }

        return new LocalStorage()
    }
}
