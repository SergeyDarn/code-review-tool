import { v4 as uuidv4 } from 'uuid';

import { CommentType, type Comment } from '@/abstracts';

export default class CommentModel {
    public static getNewComment(): Comment {
        const date = new Date().toString();

        return {
            name: '',
            id: uuidv4(),
            type: CommentType.minor,
            file: '',
            badCode: '',
            goodCode: '',
            comment: '',
            created: date,
            updated: date,
            isOpen: true
        }
    }
}
