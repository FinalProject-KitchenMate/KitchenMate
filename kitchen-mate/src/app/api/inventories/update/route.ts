import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { InventoryModel } from "@/db/models/inventory";

export async function PATCH(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const token = authHeader.substring(7);

    const isValidToken = true;

    if (!isValidToken) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const id = request.nextUrl.searchParams.get('id');
        if (!id) {
            return new Response(JSON.stringify({
                error: "Product ID is required",
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const body = await request.json();
        const updateResult = await InventoryModel.Update(id, body);

        if (updateResult.status === "success") {
            return new Response(JSON.stringify({ message: "Product Updated Successfully", data: updateResult.data }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({
                error: updateResult.message,
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof ZodError ? error.issues.map(issue => `${issue.path.join('.')} ${issue.message}`).join(', ') : "Internal Server Error";
        return new Response(JSON.stringify({
            error: errorMessage,
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
