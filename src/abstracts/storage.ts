import type { CodeReview, CodeReviewId } from './code-review'

export interface Storage {
    getItem<T>(key: string, isJson: boolean): T | null
    setItem<T>(key: string, value: T): void
}

export type StoredCodeReviews = Partial<Record<CodeReviewId, CodeReview>>

