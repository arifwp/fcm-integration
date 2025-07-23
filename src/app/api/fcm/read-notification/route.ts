import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const accessToken = request.cookies.get("auth-token")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const API_URL = process.env.KLINIK_API_URL;

    if (!API_URL) {
      return NextResponse.json(
        { error: "API_URL key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(`${API_URL}/notification/mark-read/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
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
