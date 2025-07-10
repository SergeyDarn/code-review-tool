import type { CodeReview, CodeReviewId, Storage, StoredCodeReviews } from '@/abstracts';
import StorageProvider from './StorageProvider';
import getEmptyCodeReview from '@/data/empty-code-review';

export default class CodeReviewStorage {
    private static REVIEWS_IDS_KEY = 'CODE_REVIEWS_IDS';
    private static REVIEWS_KEY = 'CODE_REVIEWS';

    private static getStorage(): Storage {
        return StorageProvider.getStorage();
    }

    private static getReviewIds(): CodeReviewId[] {
        const reviewsIds = this.getStorage().getItem<CodeReviewId[]>(this.REVIEWS_IDS_KEY, true);

        return reviewsIds || [];
    }

    private static setReviewsIds(reviewsIds: CodeReviewId[]) {
        this.getStorage().setItem(this.REVIEWS_IDS_KEY, reviewsIds)
    }

    private static getReviews(): StoredCodeReviews {
        const reviews = this.getStorage().getItem<StoredCodeReviews>(this.REVIEWS_KEY, true)

        return reviews || {};
    }

    private static setReviews(reviews: StoredCodeReviews) {
        this.getStorage().setItem(this.REVIEWS_KEY, reviews)
    }


    public static addReview(
        reviewId: CodeReviewId,
        review: CodeReview = getEmptyCodeReview()
    ) {
        const reviewsIds = this.getReviewIds();
        const reviews = this.getReviews();

        reviewsIds.push(reviewId);
        reviews[reviewId] = review;

        this.setReviewsIds(reviewsIds);
        this.setReviews(reviews);
    }

    public static hasReview(reviewId: CodeReviewId) {
        const reviewsIds = this.getReviewIds();

        return reviewsIds.includes(reviewId);
    }

    public static removeReview(reviewId: CodeReviewId) {
        let reviewsIds = this.getReviewIds();
        const reviews = this.getReviews();

        if (!reviewsIds.length || Object.keys(reviews).length) {
            return;
        }

        reviewsIds = reviewsIds.filter(id => id != reviewId);
        delete reviews[reviewId]

        this.setReviewsIds(reviewsIds)
        this.setReviews(reviews)
    }
}
