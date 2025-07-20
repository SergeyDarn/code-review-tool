import { computed, ref, type Ref } from 'vue';
import type { CodeReview, CommentType, Comment } from '@/abstracts';

const codeReview = ref<CodeReview | null>(null);
const commentTypeFilter = ref<CommentType | null>(null);
const searchValue = ref<string>('');

export default function useCodeReviewStore() {
    const processedComments = computed<Comment[]>(() => {
        if (!codeReview.value) {
            return [];
        }

        return codeReview.value.comments.filter(filterComment);
    });


    function setCodeReview(review: CodeReview | null) {
        codeReview.value = review;
    }

    function setCommentsCount() {
        codeReview.value!.commentsCount = codeReview.value!.comments.length;
    }

    function toggleCommentTypeFilter(type: CommentType) {
        commentTypeFilter.value = isCommentTypeActive(type) ? null : type;
    }

    function setSearch(value: string) {
        searchValue.value = value;
    }


    function addComment(commentToAdd: Comment) {
        const type = commentTypeFilter.value ? commentTypeFilter.value : commentToAdd.type;
        const comment = { ...commentToAdd, type };

        codeReview.value!.comments = [comment, ...codeReview.value!.comments];
        setCommentsCount();
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
        setCommentsCount();
    }



    function filterComment(comment: Comment) {
        const commentTypeMatch = !commentTypeFilter.value || isCommentTypeActive(comment.type);

        const fileMatch = matchSearch(comment.file);
        const nameMatch = matchSearch(comment.name);
        const commentTextMatch = matchSearch(comment.comment);
        const searchMatch = fileMatch || nameMatch || commentTextMatch;

        return commentTypeMatch && searchMatch;
    }

    function matchSearch(value: string) {
        return value.toLowerCase().includes(searchValue.value.toLowerCase());
    }

    function isCommentTypeActive(type: CommentType) {
        return commentTypeFilter.value === type;
    }


    return {
        codeReview: codeReview as Ref<CodeReview>,
        processedComments,
        commentTypeFilter,
        searchValue,

        setCodeReview,

        addComment,
        deleteComment,
        updateComment,

        toggleCommentTypeFilter,
        setSearch
    }
}
