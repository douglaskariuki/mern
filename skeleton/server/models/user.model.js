import mongoose from 'mongoose';

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
    salt: String
});

UserSchema // password string provided by the user is not stored directly in user doc, it is handled as a virtual field
    .virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

UserSchema.methods = {
    authenticate: function(plainText) { // method is called to verify sign-in attempts by matching the user-provided password text with the hashed_password stored in the db
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password) { // method is used to generate an encrypted hash from the plain-text password and a unique salt value
        if (!password) return ''
        try {
            return crypto // crypto module from node
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },

    makeSalt: function() { // method generates a unique and random salt value using current timestamp at execution and Math.random()
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

// validation constraints to the actual password string selected by user
UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) { // ensure password value is provided and it has a length of atleast 6 characters
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)

export default mongoose.model('User', UserSchema);