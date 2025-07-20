export type CodeReviewId = string;

export interface CodeReview extends CodeReviewBase {
    comments: Comment[]
}

export interface CodeReviewBase {
    id: CodeReviewId
    name: string
    commentsCount: number
}

export interface Comment {
    id: string
    type: CommentType
    name: string

    file: string
    comment: string
    badCode: string
    goodCode: string

    created: string
    updated: string

    isOpen: boolean
}

export enum CommentType {
    minor = 'minor',

    architecture = 'architecture',
    codeStyle = 'codeStyle',
    canBeBetter = 'canBeBetter',
    optimization = 'optimization',
    question = 'question',
    goodCode = 'goodCode',
}

export interface CommentTypeView {
    type: CommentType,
    label: string,
    color: string
}

