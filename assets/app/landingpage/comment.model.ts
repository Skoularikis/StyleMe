export class Comment {
    constructor(public content: string,
                public firstName?: string,
                public lastName?: string,
                public commentId?: string,
                public userId?: string,
                public imageId?: string,
                public likes?: number,
                public likedbyuser?: string[],
                public status?: string) {}
}
