import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username & Password required" },
        { status: 400 }
      );
    }

    const API_URL = process.env.KLINIK_API_URL;

    if (!API_URL) {
      return NextResponse.json(
        { error: "API_URL key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json({
        status: 200,
        result: result,
      });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
