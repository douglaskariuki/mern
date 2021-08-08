import mongoose from 'mongoose';
import * as bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: Number
});

UserSchema.methods = {
    authenticate: async function(plainText) { // method is called to verify sign-in attempts by matching the user-provided password text with the hashed_password stored in the db
        const hash = await bcrypt.hash(plainText, this.salt)
        return hash == this.hashed_password;
    },

    encryptPassword: async function(password) { // method is used to generate an encrypted hash from the plain-text password and a unique salt value
        if (!password) return ''
        try {
            return await bcrypt
                .hash(password, this.salt)

        } catch (err) {
            return ''
        }
    },

    makeSalt: function() { // method generates a unique and random salt value using current timestamp at execution and Math.random()
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

UserSchema // password string provided by the user is not stored directly in user doc, it is handled as a virtual field
    .virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = toString(this.encryptPassword(password))
        console.log("salt", this.salt, "password", this._password, "hash", this.hashed_password)
    })
    .get(function() {
        return this._password
    })

// validation constraints to the actual password string selected by user
UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)

export default mongoose.model('User', UserSchema);