import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { firstname, lastname, image, uid, email } = body

    const response = await User.updateOne({ uid }, { $set: { firstname, lastname, image, email } })
    if (response.modifiedCount === 1) {
        return NextResponse.json({ success: true, message: 'Profile updated successfully.' })
    } else {
        return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' })
    }
}