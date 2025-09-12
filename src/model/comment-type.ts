import { CommentType, type CommentTypeView } from '@/abstracts';

export default class CommentTypeModel {
    private static labels: Record<CommentType, string> = {
        [CommentType.architecture]: 'Архитектура',
        [CommentType.optimization]: 'Оптимизация',
        [CommentType.codeStyle]: 'Код стили',
        [CommentType.canBeBetter]: 'Можно лучше',
        [CommentType.major]: 'Важно',
        [CommentType.minor]: 'Мелочь',
        [CommentType.question]: 'Вопрос',
        [CommentType.goodCode]: 'Красиво',
    }

    private static colors: Record<CommentType, string> = {
        [CommentType.architecture]: 'var(--p-rose-500)',
        [CommentType.optimization]: 'var(--p-amber-600)',
        [CommentType.codeStyle]: 'var(--p-indigo-500)',
        [CommentType.major]: 'var(--p-pink-500)',
        [CommentType.minor]: 'var(--p-slate-500)',
        [CommentType.canBeBetter]: 'var(--color-purple)',
        [CommentType.question]: 'var(--p-cyan-500)',
        [CommentType.goodCode]: 'var(--p-green-500)',
    }

    private static commentTypes = Object.keys(CommentType) as CommentType[];


    public static getViewItems(): CommentTypeView[] {
        return this.commentTypes.map(type => {
            return {
                type,
                color: this.colors[type],
                label: this.labels[type]
            }
        })
    }

    public static getLabel(type: CommentType) {
        return this.labels[type];
    }

    public static getColor(type: CommentType) {
        return this.colors[type];
    }
}
