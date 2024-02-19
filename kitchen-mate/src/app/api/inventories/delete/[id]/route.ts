import { NextRequest } from "next/server";
import { InventoryModel } from "@/db/models/inventory";

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return createErrorResponse("Unauthorized", 401);
  }

  const token = authHeader.substring(7);
  const isValidToken = true;

  if (!isValidToken) {
    return createErrorResponse("Forbidden", 403);
  }

  try {
    const id = request.nextUrl.pathname.split("/").pop();
    // console.log(id);
    if (!id) {
      return createErrorResponse("Inventory ID is required", 400);
    }

    const deleteResult = await InventoryModel.Delete(id);

    if (deleteResult.status === "success") {
      return createSuccessResponse(deleteResult.message ?? "", 200);
    } else {
      return createErrorResponse(deleteResult.message ?? "", 404);
    }
  } catch (error) {
    console.error(error);
    return createErrorResponse("Internal Server Error", 500);
  }
}

function createErrorResponse(error: string, status: number) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function createSuccessResponse(message: string, status: number) {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
