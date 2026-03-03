import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const response = await fetch(`${BACKEND_URL}/cars?${searchParams.toString()}`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying cars list API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
