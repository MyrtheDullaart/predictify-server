import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import * as validation from '../utils/validation.js'
import ERR from '../utils/errors.js'
import { createUser, findUserByEmail, findUserById } from '../domain/user.js'

export const create = async (req, res) => {
    const { email, password, first_name, last_name } = req.body

    try {
        validation.register(email, password, first_name, last_name)
    } catch (e) {
        return sendDataResponse(res, 400, { error: e.message })
    }

    try {
        const existingUser = await findUserByEmail(email)

        if (existingUser) {
            return sendDataResponse(res, 400, { error: ERR.EMAIL_IN_USE })
        }

        const createdUser = await createUser(email, password, first_name, last_name)

        return sendDataResponse(res, 201, createdUser)
    } catch (error) {
        console.error(ERR.UNABLE_TO_CREATE_USER, error)
        
        return sendMessageResponse(res, 500, ERR.UNABLE_TO_CREATE_USER)
    }
}

export const getUserById = async (req, res) => {
    const userId = Number(req.params.id)

    try {
        const foundUser = await findUserById(userId)

        if (!foundUser) {
            return sendDataResponse(res, 404, { error: ERR.USER_NOT_FOUND }) 
        }

        return sendDataResponse(res, 200, { user: foundUser })
    } catch (e) {
        return sendMessageResponse(res, 500, { error: ERR.UNABLE_TO_GET_USER })
    }
}