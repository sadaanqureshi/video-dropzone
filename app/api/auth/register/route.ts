import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connecttodb } from "@/lib/db";
import { error } from "console";


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if (!email || !password) {
            return NextResponse.json(
                { error: "email and password are required" },
                { status: 400 }
            )
        }
        await connecttodb();
        const euser = await User.findOne({ email })
        if (euser) {
            return NextResponse.json(
                { error: "user already registered" },
                { status: 400 })
        }

        const newuser = await User.create({ email, password })
        return NextResponse.json(
            { message: "user is registered" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "failed to register user" },
            { status: 200 }
        )
    }
}

