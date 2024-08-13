import { emailRegex, passwordRegex } from './regexMatchers.js'
import ERR from './errors.js'
  
export function register(email, password, first_name, last_name) {
    if (!email || !password || !first_name || !last_name) {
        throw Error(ERR.FILL_THE_REQUIRED_FIELDS)
    }

    if (!email.match(emailRegex)) {
        throw Error(ERR.EMAIL_FORMATING)
    }

    if (!password.match(passwordRegex)) {
        throw Error(ERR.PASSWORD_REQUIREMENTS)
    }
}