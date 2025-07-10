export type CodeReviewId = string;

export interface CodeReview extends CodeReviewBase {
    comments: Comment[]
}

export interface CodeReviewBase {
    id: CodeReviewId
    name: string
}

export interface Comment {
    id: string
    type: CommentType
    file: string
    badCode: string
    comment: string
    goodCode?: string
}

export enum CommentType {
    major = 'major',
    minor = 'minor',

    architecture = 'architecture',
    optimization = 'optimization',
    readability = 'readability',
    codeStyle = 'codeStyle',

    question = 'question',
}


