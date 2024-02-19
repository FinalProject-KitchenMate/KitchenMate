// import { NextRequest, NextResponse } from "next/server";
// import { InventoryModel } from "@/db/models/inventory";

// export async function DELETE(request: NextRequest) {
//   try {
//     const id = request.nextUrl.searchParams.get('id');
//     if (!id) {
//       return new Response(JSON.stringify({
//         error: "Inventory ID is required",
//       }), {
//         status: 400,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }

//     const deleteResult = await InventoryModel.Delete(id);

//     if (deleteResult.status === "success") {
//       return new Response(JSON.stringify({ message: deleteResult.message }), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } else {
//       return new Response(JSON.stringify({ error: deleteResult.message }), {
//         status: 404,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({
//       error: "Internal Server Error",
//     }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }

import { NextRequest } from "next/server";
import { InventoryModel } from "@/db/models/inventory";

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const token = authHeader.substring(7);
  const isValidToken = true;

  if (!isValidToken) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const id = request.nextUrl.pathname.split("/").pop();
    // console.log(id);
    if (!id) {
      return new Response(
        JSON.stringify({
          error: "Inventory ID is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const deleteResult = await InventoryModel.Delete(id);

    if (deleteResult.status === "success") {
      return new Response(JSON.stringify({ message: deleteResult.message }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ error: deleteResult.message }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
