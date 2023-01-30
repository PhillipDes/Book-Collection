const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function(username, email, password) {
    //validation
    if(!username || !email || !password) {
        throw Error('All fields must be filled')
    }

    if(!validator.isAlphanumeric(username)) {
        throw Error('Usernames can only contain letters and numbers')
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    
    // if(!validator.isStrongPassword(password))
    // {
    //     throw Error('Password not strong enough')
    // }

    const existsUser = await this.findOne({username: {$regex: new RegExp(`^${username}$`, 'i')}})

    if (existsUser) {
        throw Error('Username already in use')
    }

    //check if email is already used
    const existsEmail = await this.findOne({email})

    if (existsEmail) {
        throw Error('Email already in use')
    }


    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //store in database
    const user = await this.create({username, email, password: hash})

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    //check if email is exists
    const user = await this.findOne({email})

    if (!user) {
        throw Error('Incorrect Email')
    }


    //check if password is correct
    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)