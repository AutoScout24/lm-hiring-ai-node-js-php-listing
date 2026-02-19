import { NextResponse } from "next/server";
import carsData from "@/data/cars.json";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const year = searchParams.get("year");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const type = searchParams.get("type");
    const transmission = searchParams.get("transmission");
    const fuelType = searchParams.get("fuelType");
    const minYear = searchParams.get("minYear");
    const maxYear = searchParams.get("maxYear");
    const sortBy = searchParams.get("sortBy") || "price";
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    let filteredCars = [...carsData.cars];

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCars = filteredCars.filter(
        (car) =>
          car.make.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower) ||
          (car.type && car.type.toLowerCase().includes(searchLower)) ||
          (car.city && car.city.toLowerCase().includes(searchLower)) ||
          (car.description &&
            car.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter (new or used)
    if (category) {
      // Handle comma-separated values
      const categoryValues = category.split(",").map((c) => c.toLowerCase());
      filteredCars = filteredCars.filter((car) =>
        categoryValues.includes(car.category?.toLowerCase())
      );
    }

    // Apply filters
    if (make) {
      // Handle comma-separated values
      const makeValues = make.split(",").map((m) => m.toLowerCase());
      filteredCars = filteredCars.filter((car) =>
        makeValues.some((m) => car.make.toLowerCase().includes(m))
      );
    }

    if (model) {
      // Handle comma-separated values
      const modelValues = model.split(",").map((m) => m.toLowerCase());
      filteredCars = filteredCars.filter((car) =>
        modelValues.some((m) => car.model.toLowerCase().includes(m))
      );
    }

    if (year) {
      filteredCars = filteredCars.filter((car) => car.year === parseInt(year));
    }

    if (minYear && maxYear) {
      filteredCars = filteredCars.filter(
        (car) => car.year >= parseInt(minYear) && car.year <= parseInt(maxYear)
      );
    } else if (minYear) {
      filteredCars = filteredCars.filter(
        (car) => car.year >= parseInt(minYear)
      );
    } else if (maxYear) {
      filteredCars = filteredCars.filter(
        (car) => car.year <= parseInt(maxYear)
      );
    }

    if (minPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.price >= parseInt(minPrice)
      );
    }

    if (maxPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.price <= parseInt(maxPrice)
      );
    }

    if (type) {
      // Handle comma-separated values
      const typeValues = type.split(",").map((t) => t.toLowerCase());
      filteredCars = filteredCars.filter((car) =>
        typeValues.some((t) => car.type.toLowerCase().includes(t))
      );
    }

    if (transmission) {
      // Handle comma-separated values
      const transmissionValues = transmission
        .split(",")
        .map((t) => t.toLowerCase());
      filteredCars = filteredCars.filter((car) =>
        transmissionValues.some((t) =>
          car.transmission.toLowerCase().includes(t)
        )
      );
    }

    if (fuelType) {
      // Handle comma-separated values
      const fuelTypeValues = fuelType.split(",").map((f) => f.toLowerCase());
      filteredCars = filteredCars.filter((car) =>
        fuelTypeValues.some((f) => car.fuelType.toLowerCase().includes(f))
      );
    }

    // Apply sorting
    if (sortBy) {
      filteredCars.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        // Handle string vs number comparison
        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCars = filteredCars.slice(startIndex, endIndex);

    return NextResponse.json({
      cars: paginatedCars,
      total: filteredCars.length,
      totalResults: filteredCars.length,
      page,
      totalPages: Math.ceil(filteredCars.length / limit),
    });
  } catch (error) {
    console.error("Error in cars API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
