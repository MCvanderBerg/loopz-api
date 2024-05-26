const validator = require('validator')
const db = require('../databases/loopz.database')
const bcrypt = require('bcrypt')

class User {
    constructor(
        username,
        password,
        name,
        surname,
        phone_number,
        email_address,
    ) {
        this.username = username
        this.password= password
        this.name = name
        this.surname = surname
        this.phone_number = phone_number 
        this.email_address = email_address
    }

    static signup = async function(username, password, name, surname, phone_number, email_address ) {
        if (!username || !name || !surname|| !phone_number || !email_address || !password){
            throw Error("All fields must be filled")
        }

        if (!validator.isEmail(email_address)){
            throw Error("Email is not valid")
        }

        if (!validator.isStrongPassword(password)){
            throw Error("Password is not strong enough")
        }

        try {
            const usernameQuery = `SELECT * FROM users WHERE username='${username}'`
            const [results] = await db.promise().query(usernameQuery)

            if (results.length > 0) {
                throw Error("username already in use")
            }
        } catch (err) {
            throw Error(err.message)
        }

        try {
            const query = `SELECT * FROM users WHERE email_address='${email_address}'`    
            const [results] = await db.promise().query(query)

            if (results.length > 0) {
                throw Error("email already in use")
            }
        } catch (err) {
            throw Error(err.message)
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        try {
            const query = `INSERT INTO users(username, password, name, surname, phone_number, email_address) VALUES(?, ?, ?, ?, ?, ?)`
            const values = [username, hash, name, surname, phone_number, email_address]
            console.log(query, values)
            // await db.promise().query(query, values)

            return values
        } catch (err) {
            console.log('here!!!!!!!!!!!!!!!!!!!!!')
            throw Error(err.message)
        }
    }

    static login = async function(email_address, password) {
       if (!email_address || !password) {
        throw Error("All fields must be filled")
       }
       
       const query = `SELECT * FROM users WHERE email_address=? LIMIT 1`
       const [[user]] = await db.promise().query(query, [email_address])

       console.log('user password: ',user)

       if (!user){
        throw Error("Incorrect email")
       }

       console.log('here w')
       const match = await bcrypt.compare(password, user.password)


       if (!match){
        throw Error("Incorrect password")
       }


       return user
    }

    static logout = async function(params) {
        
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

module.exports = User