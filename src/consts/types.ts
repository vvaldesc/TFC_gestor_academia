export interface Session {
    user:    User;
    expires: Date;
}

export interface User {
    name:  string;
    email: string;
    image: string;
}