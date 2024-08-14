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

    await createQuestion(user.id, 'Will I finish my app?')
    await createQuestion(user.id, 'Will I win a gold medal at the next olympics?')
    await createQuestion(user.id, 'Will I ever see an alien?')

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
            user: true
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

seed().catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})