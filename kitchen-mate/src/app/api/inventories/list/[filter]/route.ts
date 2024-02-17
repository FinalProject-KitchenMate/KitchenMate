import { InventoryModel } from "@/db/models/inventory";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const idUser = request.headers.get("userId") as string;
    const url = new URL(request.url);
    const category = url.searchParams.get("category") as string;
    const inventories = await InventoryModel.filterByCategory(idUser, category);
    return new Response(JSON.stringify({
        data: inventories,
    }), {
        headers: {
        'Content-Type': 'application/json',
        },
    });
}
