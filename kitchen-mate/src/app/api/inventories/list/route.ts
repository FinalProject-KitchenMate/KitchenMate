import { InventoryModel } from "@/db/models/inventory";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const inventories = await InventoryModel.getAll();
    return NextResponse.json({
        data: inventories,
    })
}