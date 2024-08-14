import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function seed() {
    const user = await createUser(
        'testemail@test.com',
        'Testpassword1!',
        'Jane',
        'Doe'
    )

    const question1 = await createQuestion(user.id, 'Will I finish my app?')
    const question2 = await createQuestion(user.id, 'Will I win a gold medal at the next olympics?')
    const question3 = await createQuestion(user.id, 'Will I ever see an alien?')

    await createForecast(user.id, question1.id, 0.7)
    await createForecast(user.id, question1.id, 0.65)
    await createForecast(user.id, question2.id, 0.01)

    process.exit(0)
}

async function createQuestion(userId, title, resolution = null) {
    const question = await prisma.question.create({
        data: {
            userId,
            title,
            resolution
        },
        include: {
            user: true,
            forecasts: true
        }
    })

    console.info('Question created', question)

    return question
}

async function createUser(
    email,
    password,
    first_name,
    last_name
) {
    const user = await prisma.user.create({
        data: {
            email,
            password: await bcrypt.hash(password, 10),
            first_name,
            last_name
        }
    })

    console.info(`created`, user)

    return user
}

async function createForecast(userId, questionId, prediction) {
    const forecast = await prisma.forecast.create({
        data: {
            userId,
            questionId,
            prediction
        },
        include: {
            user: true,
            question: true
        }
    })

    console.info('Forecast created', forecast)

    return forecast
}

seed().catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})