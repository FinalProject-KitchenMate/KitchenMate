import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { MyResponse, UserType } from "@/types/type";
import UserModel from "@/db/models/user";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await UserModel.Register(body);
    return NextResponse.json<MyResponse<UserType>>({ message: "User Created Successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      const err = error.issues[0].message;
      return NextResponse.json<MyResponse<UserType>>(
        {
          error: err,
        },
        {
          status: 400,
        }
      );
    }
    if (error instanceof Error) {
      if (error.message === "Username has been taken") {
        return NextResponse.json(
          {
            error: "Username has been taken",
          },
          {
            status: 400,
          }
        );
      }
    }
    return NextResponse.json<MyResponse<UserType>>(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}