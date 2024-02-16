// import { InventoryModel } from "@/db/models/inventory";
// import { NextResponse } from "next/server";

// export const dynamic = 'force-dynamic'

// export async function GET(request: Request) {
//     const inventories = await InventoryModel.getAll();
//     return NextResponse.json({
//         data: inventories,
//     })
// }

import { InventoryModel } from "@/db/models/inventory";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
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

  const inventories = await InventoryModel.getAll();
  return new Response(JSON.stringify({
      data: inventories,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
