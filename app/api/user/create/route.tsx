import { connectMongoDB } from "@/lib/mongodb";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user'

export async function POST(req: NextRequest) {
    const body = await req.json();
    const uid = randomUUID()


    try {

        await connectMongoDB();

        const response = await User.create({ ...body, uid })

        return NextResponse.json({ success: true, data: response })
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: 'Username not available.' }, { status: 409 });
        }

        console.error('Error creating user:', error);
        return NextResponse.json({ success: false, error: 'An error occurred while creating the user.' }, { status: 500 });
    }
}