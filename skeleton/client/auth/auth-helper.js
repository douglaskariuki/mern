import { signout } from "./api-auth";

// Saving JWT credentials that are received from the server
function authenticate(jwt, cb) {
    if(typeof window !== "undefined") { // store credentials in sessionStorage after ensuring window is defined
        sessionStorage.setItem("jwt", JSON.stringify(jwt))
        cb()
    }
}

// Retrieving credentials
function isAuthenticated() {
    if (typeof window == "undefined") {
        return false
    }

    if(sessionStorage.getItem("jwt")) {
        return JSON.parse(sessionStorage.getItem("jwt"))
    } else {
        return false
    }
}

// Deleting credentials when user signs out
function clearJwt(cb) {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("jwt")
        cb()
        signout().then(data => { // dependent on whether cookies are used as the credential storage mechanism
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        }) 
    }
}

export {authenticate, isAuthenticated, clearJwt}