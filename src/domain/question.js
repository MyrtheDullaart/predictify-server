import prisma from '@prisma/client'

const dbClient = new prisma.PrismaClient({
    omit: {
        user: {
            password: true
        }
    }
})

export const getAllQuestionsByUserId = async (userId, resolved) => {
    return await dbClient.question.findMany({
        where: {
            userId: userId,
            resolved: resolved
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: true
        }
    })
}