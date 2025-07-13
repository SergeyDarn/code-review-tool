import { Page } from '@/abstracts';

import CodeReviewStorage from './CodeReviewStorage';

export default class CodeReview {
    private static DEFAULT_REVIEW_TITLE = 'Ревью без названия'

    public static startReview(): string {
        return CodeReviewStorage.createNewReview();
    }

    public static getReviewPage(reviewId: string): string {
        return `${Page.codeReview}/${reviewId}`
    }

    public static getDefaultReviewTitle(): string {
        return this.DEFAULT_REVIEW_TITLE;
    }
}
