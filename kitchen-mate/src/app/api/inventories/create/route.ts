// import { InventoryInputSchema, InventoryModel } from "@/db/models/inventory";
// import { NewInventoryInput } from "@/types/type"; // Adjust the import path as necessary
// import { ZodError } from "zod";

// export async function POST(request: Request) {
//   try {
//     const newInventoryData: NewInventoryInput = await request.json();
//     const parseResult = InventoryInputSchema.safeParse(newInventoryData);
//     if (!parseResult.success) {
//       const errorDetail = parseResult.error.issues.map(issue => `${issue.path.join('.')} ${issue.message}`).join(', ');
//       return new Response(JSON.stringify({ error: errorDetail }), {
//         status: 400,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }

//     const creationResult = await InventoryModel.Create(parseResult.data);
//     if (creationResult.status === "success") {
//       return new Response(JSON.stringify({ message: "Inventory item created successfully", data: creationResult.data }), {
//         status: 201,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } else {
//       return new Response(JSON.stringify({ error: creationResult.message }), {
//         status: 400,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     let errorMessage = "Internal Server Error";
//     if (error instanceof ZodError) {
//       errorMessage = error.issues.map(issue => `${issue.path.join('.')} ${issue.message}`).join(', ');
//     }
//     return new Response(JSON.stringify({ error: errorMessage }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }

import { InventoryInputSchema, InventoryModel } from "@/db/models/inventory";
import { NewInventoryInput } from "@/types/type";
import { ZodError } from "zod";

export async function POST(request: Request) {
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
    const newInventoryData: NewInventoryInput = await request.json();
    const parseResult = InventoryInputSchema.safeParse(newInventoryData);
    if (!parseResult.success) {
      const errorDetail = parseResult.error.issues.map(issue => `${issue.path.join('.')} ${issue.message}`).join(', ');
      return new Response(JSON.stringify({ error: errorDetail }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const creationResult = await InventoryModel.Create(parseResult.data);
    if (creationResult.status === "success") {
      return new Response(JSON.stringify({ message: "Inventory item created successfully", data: creationResult.data }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ error: creationResult.message }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error(error);
    let errorMessage = "Internal Server Error";
    if (error instanceof ZodError) {
      errorMessage = error.issues.map(issue => `${issue.path.join('.')} ${issue.message}`).join(', ');
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

