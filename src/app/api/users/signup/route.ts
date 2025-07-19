import { connectDB } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "All fields are required.",
        status: 400,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists.",
        status: 409,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User successfully registered.",
      status: 201,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
      status: 500,
    });
  }
}
