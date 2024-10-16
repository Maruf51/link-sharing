import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { action, user, username } = body;

    await connectMongoDB();

    if (action === 'save') {
        const response = await User.updateOne(
            { username: user },
            { $addToSet: { saved: username } }
        );

        if (response.modifiedCount === 0) {
            return NextResponse.json({ success: false, message: 'No changes made or user not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Saved change successful' });
    }

    if (action === 'remove') {
        const response = await User.updateOne(
            { username: user },
            { $pull: { saved: username } }
        );

        if (response.modifiedCount === 0) {
            return NextResponse.json({ success: false, message: 'No changes made or user not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Removed from saved successfully' });
    }

    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 400 });
}