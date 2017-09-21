export class Image {
    constructor(public content?: string,
                public firstName?: string,
                public lastName?: string,
                public imageId?: string,
                public userId?: string,
                public likes?: number,
                public desc?: string,
                public likedbyuser?: string[],
                public created_at?: Date,
                public status?: string
                ) {}
}
