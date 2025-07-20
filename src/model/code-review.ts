import { Page, type CodeReview } from '@/abstracts';

import { v4 as uuidv4 } from 'uuid';

import CodeReviewStorage from './code-review-storage';
import Comment from './comment.ts';

export default class CodeReviewModel {
    private static DEFAULT_REVIEW_TITLE = 'Ревью без названия'

    private static getNewReview(): CodeReview {
        return {
            id: uuidv4(),
            name: '',
            comments: [Comment.getNewComment()],
            commentsCount: 1
        }
    }


    public static startReview(): string {
        return CodeReviewStorage.addNewReview(
            this.getNewReview()
        );
    }

    public static getReviewPage(reviewId: string): string {
        return `${Page.codeReview}/${reviewId}`
    }

    public static getDefaultReviewTitle(): string {
        return this.DEFAULT_REVIEW_TITLE;
    }
}
