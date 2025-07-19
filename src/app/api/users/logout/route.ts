import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong during logout",
      success: false,
      status: 500,
    });
  }
}
