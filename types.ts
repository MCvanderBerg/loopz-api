export interface IConfig {
    db_host: string | undefined,
    db_user: string | undefined,
    db_password: string | undefined,
    db_database: string | undefined
}

export interface IUser {
    id: number;
    username: string;
    password: string;
    name: string;
    surname: string;
    phone_number: string;
    email_address: string;
}