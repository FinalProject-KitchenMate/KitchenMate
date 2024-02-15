import UserModel from "@/db/models/user";
import { compareTextWithHash } from "@/db/helpers/hash";
import { createToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { z } from "zod";
import {cookies} from 'next/headers';

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
});

type LoginInput = z.infer<typeof userSchema>;

export async function POST(request: Request) {
    try {
        // 1. tangkap body
        const body: LoginInput = await request.json();
        // 2. validasi email dan password
        const validation = userSchema.safeParse(body);
        if (!validation.success) {
            throw validation.error;
        }
        // 3. validasi emailnya ada di db atau tidak
        // 4. validasi passwordnya sesuai atau tidak
        const user = await UserModel.getUserByEmail(body.email);
        if (!user || !compareTextWithHash(body.password, user.password)) {
            return NextResponse.json({
                message: 'Invalid email or password'
            }, { status: 400 });
        }
        // 5. generate access token
        const accessToken = createToken({
            _id: user._id,
            email: user.email
        });

        cookies().set('Authorization', `Bearer ${accessToken}`)

        return NextResponse.json({ accessToken }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errPath = error.issues[0].path[0];
            const errMessage = error.issues[0].message.toLowerCase();

            return NextResponse.json({
                message: `${errPath} ${errMessage}`
            }, { status: 400 });
        }
        return NextResponse.json({
            message: 'Internal server error'
        }, { status: 500 });
    }
}