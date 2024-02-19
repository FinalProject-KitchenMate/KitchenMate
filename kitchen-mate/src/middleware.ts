import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/api/inventories") ||
    request.nextUrl.pathname.startsWith("/api/wishlists") ||
    request.nextUrl.pathname.startsWith("/api/inventories/create") ||
    request.nextUrl.pathname.startsWith("/api/generate") ||
    request.nextUrl.pathname.startsWith("/api/myrecipes")
  ) {
    let cookie = cookies().get("Authorization");
    // console.log(cookie, "ini cookie");
    let token = cookie?.value.split(" ")[1] as string;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    try {
      const verifiedData = await jose.jwtVerify<{
        _id: string;
        username: string;
      }>(token, secret);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("Authorization", `Bearer ${token}`);
      requestHeaders.set("userId", verifiedData.payload._id);
      requestHeaders.set("username", verifiedData.payload.username);
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return response;
    } catch (error) {
      console.log(error, "ini error");

      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
  }
  if (request.nextUrl.pathname.startsWith("/inventories")) {
    let cookie = request.cookies.get("Authorization");
    let token = cookie?.value.split(" ")[1] as string;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    {
      return NextResponse.next();
    }
  }

  const response = NextResponse.next();

  return response;
}
export const config = {
  matcher: [
    "/api/wishlists/:path*",
    "/api/inventories/:path*",
    "/api/myrecipes/:path*",
  ],
};


// import { NextResponse, NextRequest } from "next/server";
// import { cookies } from "next/headers";

// export async function middleware(request: NextRequest) {
//   if (
//     request.nextUrl.pathname.startsWith("/api/inventories") ||
//     request.nextUrl.pathname.startsWith("/api/wishlists")
//   ) {
//     let cookie = cookies().get("Authorization");
//     let token = cookie?.value.split(" ")[1] as string;
//     if (!token) {
//       return NextResponse.json(
//         {
//           error: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     try {
//       const requestHeaders = new Headers(Object.entries(request.headers));
//       NextResponse.next({
//         request: {
//           headers: requestHeaders,
//         },
//       });
//     } catch (error) {
//       console.log(error, "ini error");

//       return NextResponse.json(
//         {
//           error: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }
//     let response = null;

//     try {
//       const requestHeaders = new Headers(Object.entries(request.headers));
//       response = NextResponse.next({
//         request: {
//           headers: requestHeaders,
//         },
//       });
//     } catch (error) {
//       console.log(error, "ini error");

//       return NextResponse.json(
//         {
//           error: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     return response;
//   }
//   if (request.nextUrl.pathname.startsWith("/inventories")) {
//     let cookie = request.cookies.get("Authorization");
//     let token = cookie?.value.split(" ")[1] as string;
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     {
//       return NextResponse.next();
//     }
//   }

//   const response = NextResponse.next();

//   return response;
// }
// export const config = {
//   matcher: ["/api/wishlists/:path*", "/api/inventories/:path*"],
// };

