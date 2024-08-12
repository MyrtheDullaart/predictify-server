import prisma from '@prisma/client'
const dbClient = new prisma.PrismaClient({
    omit: {
        user: {
            password: true
        }
    }
})

export const findUserByEmail = async (email) => {
    return await dbClient.user.findUnique({
        where: {
            email: email
        },
        omit: {
            password: false
        }
    })
}