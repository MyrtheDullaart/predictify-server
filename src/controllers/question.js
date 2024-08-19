import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import ERR from '../utils/errors.js'
import { createNewQuestion, getAllQuestionsByUserId, resolveQuestionById } from '../domain/question.js'

export const getQuestionsByUserId = async (req, res) => {
    const { id: userId } = req.user
    const { resolved, search } = req.query

    try {
        const questions = await getAllQuestionsByUserId(userId, resolved, search)

        return sendDataResponse(res, 200, { questions: questions })
    } catch (error) {
        console.error(ERR.UNABLE_TO_GET_QUESTIONS, error)
        
        return sendMessageResponse(res, 500, ERR.UNABLE_TO_GET_QUESTIONS)
    }
}

export const resolveQuestion = async (req, res) => {
    const { questionId, resolution } = req.body

    try {
        const resolvedQuestion = await resolveQuestionById(questionId, resolution)

        return sendDataResponse(res, 200, { question: resolvedQuestion })
    } catch (error) {
        console.error(ERR.UNABLE_TO_GET_QUESTIONS, error)
        
        return sendMessageResponse(res, 500, ERR.UNABLE_TO_GET_QUESTIONS)
    }
}

export const createQuestion = async (req, res) => {
    const { title } = req.body
    const { id: userId } = req.user

    try {
        const question = await createNewQuestion(userId, title)

        return sendDataResponse(res, 201, { question: question })
    } catch (error) {
        console.error(ERR.UNABLE_TO_CREATE_QUESTION, error)
        
        return sendMessageResponse(res, 500, ERR.UNABLE_TO_CREATE_QUESTION)
    }
}