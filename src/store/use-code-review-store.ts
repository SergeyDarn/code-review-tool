import { computed, ref, type Ref } from 'vue';
import type { CodeReview, CommentType, Comment, CodeReviewBase } from '@/abstracts';
import type { ToastServiceMethods } from 'primevue';

import { downloadJson, readFile } from '@/utils/file';
import CodeReviewStorage from '@/model/code-review-storage';
import { useToast } from './use-toast';

const codeReviews = ref<CodeReviewBase[]>([]);

const codeReview = ref<CodeReview | null>(null);
const commentTypeFilter = ref<CommentType | null>(null);
const searchValue = ref<string>('');

const REVIEW_IMPORT_ERROR = 'Не получилось импортировать ревью';
const REVIEW_IMPORT_DUPLICATE_ERROR = 'Это ревью уже есть в списке';
const REVIEW_IMPORT_SUCCESS = 'Ревью успешно импортировано';

export default function useCodeReviewStore(toast: ToastServiceMethods | null = null) {
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

    function exportReview() {
        downloadJson(
            codeReview.value as CodeReview,
            `review_${codeReview.value!.id}`
        );
    }

    async function importReview(file: File) {
        const { showError, showSuccess } = useToast(toast)

        try {
            const review = await readFile(file, true);

            if (!review || !review.id || !review.comments) {
                showError(REVIEW_IMPORT_ERROR);
                return;
            }

            const isReviewAlreadyLoaded = codeReviews.value.some(codeReview => codeReview.id === review.id);

            if (isReviewAlreadyLoaded) {
                showError(REVIEW_IMPORT_DUPLICATE_ERROR);
                return;
            }

            codeReviews.value.push(review);
            CodeReviewStorage.addNewReview(review);
            showSuccess(REVIEW_IMPORT_SUCCESS);
        } catch (err) {
            console.error(`${REVIEW_IMPORT_ERROR}: ${err}`)
            showError(REVIEW_IMPORT_ERROR);
        }
    }


    function loadReviews() {
        codeReviews.value = Object.values(CodeReviewStorage.getReviews()) as CodeReviewBase[];
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
        codeReviews,
        codeReview: codeReview as Ref<CodeReview>,
        processedComments,
        commentTypeFilter,
        searchValue,

        setCodeReview,

        addComment,
        deleteComment,
        updateComment,
        exportReview,
        importReview,
        loadReviews,

        toggleCommentTypeFilter,
        setSearch
    }
}
