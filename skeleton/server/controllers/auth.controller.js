import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if(!user) {
            return res.status("401").json({ error: "Incorrect credentials" })
        }

        if(!user.authenticate(req.body.password)) {
            return res.status("401").send({error: "Incorrect credentials"})
        }

        const token = jwt.sign(
            {_id: user._id}, 
            config.jwtSecret
        ) // generate a signed jwt using secret key and users id value

        res.cookie(
            "t", 
            token, 
            {expire: new Date() + 9999}
        ) // set token to a cookie in the res object so that it is available to the client

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return res.status("401").json({error: "Could not sign in"})
    }
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status("200").json({
        message: "Signed out"
    })
}

const requireSignin = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['RS256'],
    userProperty: "auth"
}) // uses express-jwt to verify that the incoming request has a valid jwt in the Authorization header, if valid it appends the verified user's ID in a "auth" key

const hasAuthorization = (req, res) => {
    const authorized = 
        req.profile 
        && req.auth 
        && req.profile._id == req.auth._id // req.auth obj is populated by express-jwt, req.profile is populated by the userByID func in user.controller
    if(!(authorized)) {
        return res.status("403").json({
            error: "User is not authorized"
        })
    } 
    next()
} // add this function to routes that require both authentication and authorization

export default { signin, signout, requireSignin, hasAuthorization }