export interface Session {
    user:    User;
    expires: Date;
}

export interface User {
    name:  string;
    email: string;
    image: string;
}

export interface Client {
    id:            number;
    name?:         string;
    surname?:      string;
    email:         string;
    phone_number:  string;
    address?:      string;
    city?:         string;
    bornDate?:     Date;
    created_at?:   Date;
    updated_at?:   Date;
    username?:     string;
    password?:     string;
    confirmed?:    boolean;
    image?:        string;
    active?:       boolean;
}

export type ClientSession = { OAuth: Session } & { client: Client } & { profilePhotoSrc: string };
