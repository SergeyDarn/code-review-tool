import { Page } from '@/abstracts';

import { v4 as uuidv4 } from 'uuid';
import CodeReviewStorage from './CodeReviewStorage';

export default class CodeReview {
    private static createReviewId(): string {
        return uuidv4();
    }

    public static startReview(): string {
        const reviewId = this.createReviewId();

        CodeReviewStorage.addReview(reviewId);

        return reviewId;
    }

    public static getReviewPage(reviewId: string) {
        return `${Page.codeReview}/${reviewId}`
    }
}
