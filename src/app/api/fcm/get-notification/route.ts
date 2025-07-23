import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";

    const accessToken = request.cookies.get("auth-token")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const API_URL = process.env.KLINIK_API_URL;

    if (!API_URL) {
      return NextResponse.json(
        { error: "API_URL key not configured" },
        { status: 500 }
      );
    }

    const finalUrl = `${API_URL}/notification?page=${page}&limit=${limit}`;

    const response = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch notification", details: result },
        { status: response.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching notification list:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
