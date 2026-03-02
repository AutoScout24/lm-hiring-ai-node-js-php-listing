import { NextResponse } from "next/server";

// Server-side only — uses Docker network hostname, not localhost
const BACKEND_URL = process.env.BACKEND_API_URL;

export async function GET(request, { params }) {
  try {
    const resolvedParams = await Promise.resolve(params);

    const response = await fetch(`${BACKEND_URL}/cars/${resolvedParams.id}`, {
      headers: { Accept: "application/json" },
    });

    if (response.status === 404) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying car detail API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
