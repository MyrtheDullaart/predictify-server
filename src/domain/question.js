import prisma from '@prisma/client'

const dbClient = new prisma.PrismaClient({
    omit: {
        user: {
            password: true
        }
    }
})

export const getAllQuestionsByUserId = async (userId) => {
    return await dbClient.question.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: true
        }
    })
}