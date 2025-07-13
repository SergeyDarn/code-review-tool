import { CommentType as ICommentType, type SelectItem } from '@/abstracts';

export default class CommentType {
    private static labels: Record<ICommentType, string> = {
        [ICommentType.architecture]: 'Архитектура',
        [ICommentType.optimization]: 'Оптимизация',
        [ICommentType.codeStyle]: 'Код стили',
        [ICommentType.minor]: 'Мелочь',
        [ICommentType.question]: 'Вопрос',
    }

    public static getSelectTypes(): SelectItem<ICommentType>[] {
        return Object.keys(ICommentType)
            .map((type) => this.typeToSelectItem(type as ICommentType));
    }

    public static typeToSelectItem(type: ICommentType) {
        return {
            label: this.labels[type],
            value: type
        }
    }
}
