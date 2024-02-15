import UserModel from "@/db/models/user";
import { ZodError } from "zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = await UserModel.register(body);

        return NextResponse.json({ data: result });
    } catch (error:Error|any) {

        if (error instanceof ZodError) {
            console.log(error);
            const errMessage = error.errors[0].path[0] + " " + error.errors[0].message;
            return NextResponse.json({
                error: errMessage
            }, {
                status: 400
            })
        } else if (typeof error === "object") {
            console.log(error);
            return NextResponse.json({
                error: error?.message || "Internal Server Error"
            }, {
                status: error?.status || 500
            })
        }
    }

}