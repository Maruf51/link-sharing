import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { uid, links } = body

    const response = await User.updateOne({ uid }, { $set: { links } })
    if (response.modifiedCount === 1) {
        return NextResponse.json({ success: true, message: 'Links successfully saved.' })
    } else {
        return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' })
    }
}