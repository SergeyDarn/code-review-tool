import type { CodeReview, CodeReviewId, Storage, StoredCodeReviews } from '@/abstracts';
import StorageProvider from './storage-provider';

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

    private static setReviews(reviews: StoredCodeReviews) {
        this.getStorage().setItem(this.REVIEWS_KEY, reviews)
    }


    public static getReviews(): StoredCodeReviews {
        const reviews = this.getStorage().getItem<StoredCodeReviews>(this.REVIEWS_KEY, true)

        return reviews || {};
    }

    public static addNewReview(newReview: CodeReview): CodeReviewId {
        const reviewsIds = this.getReviewIds();

        this.setReviewsIds([...reviewsIds, newReview.id]);
        this.setReview(newReview);

        return newReview.id;
    }

    public static setReview(review: CodeReview) {
        const reviews = this.getReviews();

        this.setReviews({
            ...reviews,
            [review.id]: review
        });
    }

    public static hasReview(reviewId: CodeReviewId): boolean {
        const reviewsIds = this.getReviewIds();

        return reviewsIds.includes(reviewId);
    }

    public static getReview(reviewId: CodeReviewId): CodeReview | null {
        const reviews = this.getReviews();

        return reviews[reviewId] || null;
    }

    public static removeReview(reviewId: CodeReviewId) {
        let reviewsIds = this.getReviewIds();
        const reviews = this.getReviews();

        if (!reviewsIds.length || !Object.keys(reviews).length) {
            return;
        }

        reviewsIds = reviewsIds.filter(id => id != reviewId);
        delete reviews[reviewId];

        this.setReviewsIds(reviewsIds);
        this.setReviews(reviews);
    }
}
