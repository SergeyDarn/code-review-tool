import type { CodeReview, Comment } from '@/abstracts';
import { CommentType } from '@/abstracts';

import { v4 as uuidv4 } from 'uuid';

export function getNewCodeReview(): CodeReview {
    return {
        id: uuidv4(),
        name: '',
        comments: [getNewComment()]
    }
}

export function getNewComment(): Comment {
    const date = new Date().toString();

    return {
        name: '',
        type: CommentType.minor,
        file: '',
        badCode: '',
        goodCode: '',
        comment: '',
        created: date,
        updated: date,
    }
}

