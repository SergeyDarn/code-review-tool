import { computed, ref, type Ref } from 'vue';
import type { CodeReview, CommentType, Comment } from '@/abstracts';

const codeReview = ref<CodeReview | null>(null);
const activeCommentType = ref<CommentType | null>(null);

export default function useCodeReviewStore() {
    const processedComments = computed<Comment[]>(() => {
        if (!codeReview.value) {
            return [];
        }

        if (!activeCommentType.value) {
            return codeReview.value.comments;
        }

        const filteredComments = codeReview.value.comments.filter(comment => {
            return isCommentTypeActive(comment.type);
        });

        return filteredComments;
    });

    function setCodeReview(review: CodeReview | null) {
        codeReview.value = review;
    }

    function addComment(commentToAdd: Comment) {
        const type = activeCommentType.value ? activeCommentType.value : commentToAdd.type;
        const comment = { ...commentToAdd, type };

        codeReview.value!.comments = [comment, ...codeReview.value!.comments];
    }

    function updateComment(updatedComment: Comment) {
        codeReview.value!.comments = codeReview.value!.comments.map(comment => {
            if (comment.id !== updatedComment.id) {
                return comment;
            }

            return {
                ...updatedComment,
                updated: new Date().toString()
            }
        })
    }

    function deleteComment(commentToDelete: Comment) {
        codeReview.value!.comments = codeReview.value!.comments.filter(comment => {
            return comment.id !== commentToDelete.id;
        })
    }

    function toggleActiveCommentType(type: CommentType) {
        activeCommentType.value = isCommentTypeActive(type) ? null : type;
    }

    function isCommentTypeActive(type: CommentType) {
        return activeCommentType.value === type;
    }


    return {
        codeReview: codeReview as Ref<CodeReview>,
        processedComments,
        activeCommentType,

        setCodeReview,

        addComment,
        deleteComment,
        updateComment,
        toggleActiveCommentType,
    }
}
