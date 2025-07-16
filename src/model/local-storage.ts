import type { Storage } from '@/abstracts';

export default class LocalStorage implements Storage {
    public getItem<T>(key: string, isJson = false): T | null {
        const item = localStorage.getItem(key)

        if (!isJson || !item) {
            return item as T
        }

        try {
            return JSON.parse(item)
        } catch (err) {
            console.log(`Something went wrong when parsing json: ${item}`)
            return null
        }
    }

    public setItem<T>(key: string, value: T): void {
        const isSimpleType = ['string', 'number'].includes(typeof value);
        let storageValue = null;

        try {
            storageValue = isSimpleType ? String(value) : JSON.stringify(value);
        } catch (err) {
            console.log(`Couldn't stringify ${value} to json`)
            return
        }

        return localStorage.setItem(key, storageValue)
    }
}
