export class User {
    constructor(public email: string,
                public password: string,
                public firstName?: string,
                public lastName?: string,
                public jobdesc?: string,
                public fullName?: string,
                public _id?: string,
                public fewWords?: string,
                public friends?: string[]
                )
                 {}
}
