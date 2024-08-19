import prisma from '@prisma/client'
import bcrypt from 'bcrypt'

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

export const createUser = async (email, password, first_name, last_name) => {
    return await dbClient.user.create({
        data: {
            email,
            password: await bcrypt.hash(password, 10),
            first_name,
            last_name
        }
    })
}

export const findUserById = async (id) => {
    return await dbClient.user.findFirst({
        where: {
            id: id
        }
    })
}

export const editUserById = async (userId, email, first_name, last_name) => {
    return await dbClient.user.update({
        where: {
            id: userId
        },
        data: {
            email: email,
            first_name: first_name,
            last_name: last_name
        }
    })
}