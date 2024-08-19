import prisma from '@prisma/client'

const dbClient = new prisma.PrismaClient({
    omit: {
        user: {
            password: true
        }
    }
})

export const getAllQuestionsByUserId = async (userId, resolved, search) => {
    if (resolved === "") {
        return await dbClient.question.findMany({
            where: {
                userId: userId,
                title: {
                    contains: search
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true,
                forecasts: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        user: true
                    }
                }
            }
        })
    }

    const isResolved = resolved === "true"

    return await dbClient.question.findMany({
        where: {
            userId: userId,
            resolved: isResolved,
            title: {
                contains: search
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: true,
            forecasts: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    user: true
                }
            }
        }
    })
}

export const resolveQuestionById = async (questionId, resolution) => {
    return await dbClient.question.update({
        where: {
            id: questionId
        },
        data: {
            resolution: resolution,
            resolved: true
        }
    })
}

export const createNewQuestion = async (userId, title) => {
    return await dbClient.question.create({
        data: {
            userId:userId,
            title: title
        }
    })
}

export const deleteQuestionById = async (questionId) => {
    return await dbClient.question.delete({
        where: {
            id: questionId
        }
    })
}

export const getQuestionById = async (questionId) => {
    return await dbClient.question.findFirst({
        where: {
            id: questionId
        }
    })
}