import { CommentType as ICommentType, type CommentTypeView } from '@/abstracts';

export default class CommentType {
    private static labels: Record<ICommentType, string> = {
        [ICommentType.architecture]: 'Архитектура',
        [ICommentType.optimization]: 'Оптимизация',
        [ICommentType.codeStyle]: 'Код стили',
        [ICommentType.minor]: 'Мелочь',
        [ICommentType.question]: 'Вопрос',
    }

    private static colors: Record<ICommentType, string> = {
        [ICommentType.architecture]: 'var(--p-rose-500)',
        [ICommentType.optimization]: 'var(--p-yellow-500)',
        [ICommentType.codeStyle]: 'var(--p-teal-500)',
        [ICommentType.minor]: 'var(--p-slate-500)',
        [ICommentType.question]: 'var(--p-cyan-500)',
    }

    private static commentTypes = Object.keys(ICommentType) as ICommentType[];


    public static getViewItems(): CommentTypeView[] {
        return this.commentTypes.map(type => {
            return {
                type,
                color: this.colors[type],
                label: this.labels[type]
            }
        })
    }

    public static getColor(type: ICommentType) {
        return this.colors[type];
    }
}
