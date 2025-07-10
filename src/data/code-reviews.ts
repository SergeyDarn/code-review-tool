import { CommentType, type CodeReview } from '@/abstracts';

const codeReviews: CodeReview[] = [
    {
        id: '1',
        name: 'The best review ever',
        comments: [
            {
                id: '1',
                type: CommentType.minor,
                file: 'hop/hey.js',
                badCode: 'const app_name = \'Code Review\'',
                goodCode: 'const APP_NAME = \'Code Review\'',
                comment: 'Давай отрефакторим'
            },
            {
                id: '1',
                type: CommentType.minor,
                file: 'hop/hey.js',
                badCode: 'const u = \'Sergey\'',
                goodCode: 'const user = \'Sergey\'',
                comment: 'Давай отрефакторим'
            }
        ]
    }
]

export default codeReviews;
