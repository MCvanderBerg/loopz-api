
export class User {
    constructor(
        id,
        username,
        password,
        name,
        surname,
        phone_number,
        email_address,
    ) {
        this.id = id
        this.username = username
        this.password= password
        this.name = name
        this.surname = surname
        this.phone_number = phone_number
        this.email_address = email_address
    }
    static getUserProperties() {
        return ['username', 'password', 'name', 'surname', 'phone_number', 'email_address'];
    }
    static validateAsUser(props){
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