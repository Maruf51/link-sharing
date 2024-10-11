import { connectMongoDB } from "@/lib/mongodb";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user'

export async function POST(req: NextRequest) {
    const body = await req.json();
    const uid = randomUUID()

    await connectMongoDB();

    const exists = await User.findOne({ email: body.email })
    if (exists) {
        return NextResponse.json({ success: false, error: 'Account already exists with this email.' })
    } else {
        const response = await User.create({ ...body, uid })
        
        return NextResponse.json({ success: true, data: response })
    }
}