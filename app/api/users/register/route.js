import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, name, country, dateOfBirth } = body;

        if (!email || !password || !name || !country || !dateOfBirth) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                password, // In production, hash this password using bcrypt
                name,
                country,
                dateOfBirth: new Date(dateOfBirth),
            },
        });

        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}
