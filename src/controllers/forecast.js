import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import ERR from '../utils/errors.js'
import { createNewForecast } from '../domain/forecast.js'

export const createForecast = async (req, res) => {
    const { id: userId } = req.user
    const { questionId, prediction } = req.body

    try {
        const forecast = await createNewForecast(userId, questionId, prediction)

        return sendDataResponse(res, 201, { forecast: forecast })
    } catch (error) {
        console.error(ERR.UNABLE_TO_CREATE_FORECAST, error)
        
        return sendMessageResponse(res, 500, ERR.UNABLE_TO_CREATE_FORECAST)
    }
}