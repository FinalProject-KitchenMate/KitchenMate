import { InventoryInputSchema, InventoryModel } from "@/db/models/inventory";
import { NewInventoryInput } from "@/types/type"; // Adjust the import path as necessary
import { ZodError } from "zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const newInventoryData: NewInventoryInput = await request.json();

    // Validate the incoming inventory data with Zod
    const parseResult = InventoryInputSchema.safeParse(newInventoryData);
    if (!parseResult.success) {
      // Extract the first error message for simplicity
      const errorDetail = parseResult.error.issues.map(issue => `${issue.path.join('.')} ${issue.message}`).join(', ');
      return new Response(JSON.stringify({ error: errorDetail }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Create the new inventory item using the validated data
    const creationResult = await InventoryModel.Create(parseResult.data);
    if (creationResult.status === "success") {
      // Assuming creationResult.data contains the necessary details or ID of the created item
      return new Response(JSON.stringify({ message: "Inventory item created successfully", data: creationResult.data }), {
        status: 201, // HTTP 201 Created
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Handle cases where creation fails but not due to a validation error
      return new Response(JSON.stringify({ error: creationResult.message }), {
        status: 400, // Adjust status code based on the error type
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error(error);
    // Handle unexpected errors, including potential ZodError
    let errorMessage = "Internal Server Error";
    if (error instanceof ZodError) {
      // If the error is specifically a Zod validation error, format it
      errorMessage = error.issues.map(issue => `${issue.path.join('.')} ${issue.message}`).join(', ');
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500, // HTTP 500 Internal Server Error
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
