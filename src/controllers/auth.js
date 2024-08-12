import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import { findUserByEmail } from '../domain/user.js'
import ERR from '../utils/errors.js'

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const foundUser = await findUserByEmail(email)

    const areCredentialsValid = await validateCredentials(password, foundUser)

    if (!areCredentialsValid) {
      return sendDataResponse(res, 400, {
        error: ERR.EMAIL_PASS_INVALID
      })
    }

    const token = generateJwt(foundUser.id)

    return sendDataResponse(res, 200, { token })
  } catch (e) {
    console.log('An error occured while trying to login:', e)
    return sendMessageResponse(res, 500, { error: ERR.INTERNAL_ERROR })
  }
}

function generateJwt(userId) {
  return jwt.sign({ userId }, JWT_SECRET)
}

async function validateCredentials(password, user) {
    if (!user) {
      return false
    }
  
    if (!password) {
      return false
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return false
    }
  
    return true
  }