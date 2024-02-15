import { NextRequest, NextResponse } from "next/server";
import { InventoryModel } from "@/db/models/inventory";

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({
        error: "Inventory ID is required",
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const deleteResult = await InventoryModel.Delete(id);

    if (deleteResult.status === "success") {
      return new Response(JSON.stringify({ message: deleteResult.message }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ error: deleteResult.message }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      error: "Internal Server Error",
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
