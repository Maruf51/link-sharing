import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { username } = await req.json()

    await connectMongoDB()

    const user = await User.findOne({ username })
    if (user?.username) {
        const savedUsernames = [...user?.saved]
        const response = await User.find({ username: { $in: savedUsernames } }, { password: 0, createdAt: 0, updatedAt: 0, saved: 0, _id: 0 })

        return NextResponse.json({ success: true, message: 'Profile data loaded', data: response })
    }

    return NextResponse.json({ success: false, message: 'Something went wrong getting profile data.' })
}