import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    await connectMongoDB()

    const user = await User.findOne({ email })
    let newUser = {...user._doc}
    delete newUser.password
    delete newUser._id
    delete newUser.createdAt
    delete newUser.updatedAt

    return NextResponse.json({ success: true, data: newUser })
}