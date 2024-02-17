import { InventoryModel } from "@/db/models/inventory";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const idUser = request.headers.get("userId") as string;
  const inventories = await InventoryModel.getAll(idUser);
  return new Response(JSON.stringify({
      data: inventories,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
