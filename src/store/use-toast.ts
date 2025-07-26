import type { ToastServiceMethods } from 'primevue';

const INSTANCE_ERROR = 'Cannot use toast without passing it to the store first';
const DEFAULT_LIFE = 3000;


export function useToast(toast: ToastServiceMethods | null) {
    function showError(text: string, life = DEFAULT_LIFE) {
        if (!toast) {
            throw Error(INSTANCE_ERROR);
        }

        toast.add({
            summary: 'Ошибка',
            severity: 'error',
            detail: text,
            life
        })
    }

    function showSuccess(text: string, life = DEFAULT_LIFE) {
        if (!toast) {
            throw Error(INSTANCE_ERROR);
        }

        toast.add({
            summary: 'Успех',
            severity: 'success',
            detail: text,
            life
        })
    }

    return {
        showSuccess,
        showError
    }
}
