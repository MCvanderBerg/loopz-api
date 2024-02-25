export interface IUser {
    id: number;
    username: string;
    password: string;
    name: string;
    surname: string;
    phone_number: string;
    email_address: string;
}

export class User implements  IUser{
    readonly id: number
    readonly username: string
    readonly password: string
    readonly name: string
    readonly surname: string
    readonly phone_number: string
    readonly email_address: string

    constructor(
        id: number,
        username: string,
        password: string,
        name: string,
        surname: string,
        phone_number: string,
        email_address: string,
    ) {
        this.id = id
        this.username = username
        this.password= password
        this.name = name
        this.surname = surname
        this.phone_number = phone_number
        this.email_address = email_address
    }
    static getUserProperties(): string[] {
        return ['username', 'password', 'name', 'surname', 'phone_number', 'email_address'];
    }
    static validateAsUser(props: Object):[boolean, string | null] {
        const requiredFields = this.getUserProperties()
        const propKeys = Object.keys(props)

        for (const field of requiredFields){
            console.log(field, requiredFields)
            if (!propKeys.includes(field)) {
                return [false, field]
            }
        }

        return [true,null]
    }
}