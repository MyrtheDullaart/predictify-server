import { sendDataResponse } from '../utils/responses.js'
const JWT_SECRET = process.env.JWT_SECRET
import jwt from 'jsonwebtoken'
import { findUserById } from '../domain/user.js'
import ERR from '../utils/errors.js'

export async function validateAuthentication(req, res, next) {
    const header = req.header('Authorization')

    if (!header) {
        return sendDataResponse(res, 401, { error: ERR.MISSING_AUTH_HEADER })
    }

    const [type, token] = header.split(' ')

    const isTypeValid = validateTokenType(type)

    if (!isTypeValid) {
        return sendDataResponse(res, 401, { error: `Invalid token type, expected Bearer but got ${type}` })
    }

    const isTokenValid = validateToken(token)

    if (!isTokenValid) {
        return sendDataResponse(res, 401, { error: ERR.TOKEN_FAILED })
    }

    const { userId } = jwt.decode(token)

    const foundUser = await findUserById(Number(userId))

    req.user = foundUser

    next()
}

function validateToken(token) {
  if (!token) {
    return false
  }

  return jwt.verify(token, JWT_SECRET, (error) => {
    return !error
  })
}

function validateTokenType(type) {
  if (!type) {
    return false
  }

  if (type.toUpperCase() !== 'BEARER') {
    return false
  }
  return true
}