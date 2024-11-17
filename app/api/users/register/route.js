import prisma from '@/lib/prisma'; // Ensure prisma is correctly set up
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { name, email, password, dateOfBirth, country, address, postCode, city } = await request.json();

        // Validate required fields
        if (!name || !email || !password || !dateOfBirth || !country) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: name, email, password, dateOfBirth, and country are mandatory.' }),
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                dateOfBirth: new Date(dateOfBirth), // Ensure valid DateTime format
                country,
                address,  // Optional
                postCode, // Optional
                city,     // Optional
            },
        });

        return new Response(
            JSON.stringify({ message: 'User created successfully', user }),
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error.message }),
            { status: 500 }
        );
    }
}
