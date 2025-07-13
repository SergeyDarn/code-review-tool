export type CodeReviewId = string;

export interface CodeReview extends CodeReviewBase {
    comments: Comment[]
}

export interface CodeReviewBase {
    id: CodeReviewId
    name: string
}

export interface Comment {
    type: CommentType
    name: string

    file: string
    comment: string
    badCode: string
    goodCode: string

    created: string
    updated: string
}

export enum CommentType {
    minor = 'minor',

    architecture = 'architecture',
    codeStyle = 'codeStyle',
    optimization = 'optimization',
    question = 'question',
}

