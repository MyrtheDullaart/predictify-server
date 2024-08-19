import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import ERR from '../utils/errors.js'
import { createNewQuestion, deleteQuestionById, editQuestionById, getAllQuestionsByUserId, getQuestionById, resolveQuestionById } from '../domain/question.js'

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

export const editQuestion = async (req, res) => {
    const { questionId, resolution, title } = req.body

    const foundQuestion = await getQuestionById(questionId)

    if (!foundQuestion) {
        return sendDataResponse(res, 404, { error: ERR.QUESTION_NOT_FOUND })
    }

    if (foundQuestion.userId !== userId) {
        return sendDataResponse(res, 403, { error: ERR.NOT_AUTHORISED })
    }

    if (resolution) {
        try {
            const resolvedQuestion = await resolveQuestionById(questionId, resolution)
    
            return sendDataResponse(res, 200, { question: resolvedQuestion })
        } catch (error) {
            console.error(ERR.UNABLE_TO_RESOLVE_QUESTION, error)
            
            return sendMessageResponse(res, 500, ERR.UNABLE_TO_RESOLVE_QUESTION)
        }
    }

    if (title) {
        try {
            const editedQuestion = await editQuestionById(questionId, title)
    
            return sendDataResponse(res, 200, { question: editedQuestion })
        } catch (error) {
            console.error(ERR.UNABLE_TO_EDIT_QUESTION, error)
            
            return sendMessageResponse(res, 500, ERR.UNABLE_TO_EDIT_QUESTION)
        }
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

export const deleteQuestion = async (req, res) => {
    const { questionId } = req.body
    const { id: userId } = req.user

    const foundQuestion = await getQuestionById(questionId)

    if (!foundQuestion) {
        return sendDataResponse(res, 404, { error: ERR.QUESTION_NOT_FOUND })
    }

    if (foundQuestion.userId !== userId) {
        return sendDataResponse(res, 403, { error: ERR.NOT_AUTHORISED })
    }

    try {
        const deletedQuestion = await deleteQuestionById(questionId)

        return sendDataResponse(res, 200, { question: deletedQuestion })
    } catch (error) {
        console.error(ERR.UNABLE_TO_DELETE_QUESTION, error)
        
        return sendMessageResponse(res, 500, ERR.UNABLE_TO_DELETE_QUESTION)
    }
}