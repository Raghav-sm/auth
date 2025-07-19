import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password are required.",
        status: 400,
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({
        success: false,
        message: "User does not exist.",
        status: 404,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials.",
        status: 401,
      });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_TOKEN!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      status: 200,
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
      status: 500,
    });
  }
}
