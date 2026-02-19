import { NextResponse } from "next/server";
import carsData from "@/data/cars.json";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await Promise.resolve(params);

    const car = carsData.cars.find(
      (car) => car.id === parseInt(resolvedParams.id)
    );

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error("Error in car detail API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
