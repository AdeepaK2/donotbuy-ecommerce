import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
    const { id } = params;

    try {
        // Parse the request body
        const body = await request.json();

        // Construct the data object dynamically
        const data = {};
        if (body.address !== undefined) data.address = body.address;
        if (body.postCode !== undefined) data.postCode = body.postCode;
        if (body.city !== undefined) data.city = body.city;
        if (body.country !== undefined) data.country = body.country;
        // Add additional fields here if needed

        // Update the user
        const updatedUser = await prisma.user.update({
            where: { id },
            data,
        });

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}
