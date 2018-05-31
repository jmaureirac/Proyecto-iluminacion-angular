export class User {
    
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public role?: string, 
        public google?: string,
        public created_at?: string,
        public updated_at?: string,
        public _id?: string
    ) {

    }

}
