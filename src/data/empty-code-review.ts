import type { CodeReview } from '@/abstracts';

function getEmptyCodeReview(): CodeReview {
    return {
        id: '',
        name: '',
        comments: []
    }
}

export default getEmptyCodeReview;
