import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import ERR from '../utils/errors.js'
import { getAllQuestionsByUserId } from '../domain/question.js'

export const getQuestionsByUserId = async (req, res) => {
    const { id: userID } = req.user
    const { resolved, search } = req.query

    try {
        const questions = await getAllQuestionsByUserId(userID, resolved, search)

        return sendDataResponse(res, 201, { questions: questions })
    } catch (error) {
        console.error(ERR.UNABLE_TO_GET_QUESTIONS, error)
        
        return sendMessageResponse(res, 500, ERR.UNABLE_TO_GET_QUESTIONS)
    }
}