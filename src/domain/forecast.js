import prisma from '@prisma/client'

const dbClient = new prisma.PrismaClient({
    omit: {
        user: {
            password: true
        }
    }
})

export const createNewForecast = async (userId, questionId, prediction) => {
    return await dbClient.forecast.create({
        data: {
            userId: userId,
            questionId: Number(questionId),
            prediction: Number(prediction)
        }
    })
}