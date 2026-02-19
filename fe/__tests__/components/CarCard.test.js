import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CarCard from "@/components/CarCard";
import { useRouter } from "next/navigation";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CarCard Component", () => {
  const mockPush = jest.fn();
  const mockCar = {
    id: 1,
    make: "Maruti Suzuki",
    model: "Swift",
    year: 2023,
    price: 800000,
    mileage: 5000,
    transmission: "Manual",
    fuelType: "Petrol",
    images: [
      "https://www.prathammotors.com/pm/images/swift/color/1.webp",
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    featured: false,
  };

  beforeEach(() => {
    // Setup router mock implementation
    useRouter.mockImplementation(() => ({
      push: mockPush,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders car details correctly", () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText("2023 Maruti Suzuki Swift")).toBeInTheDocument();
    expect(screen.getByText("₹8,00,000")).toBeInTheDocument();
    expect(screen.getByText("5K km")).toBeInTheDocument();
    expect(screen.getByText("Petrol")).toBeInTheDocument();
    expect(screen.getByText("Manual")).toBeInTheDocument();
  });

  it("navigates to car details page when clicked", () => {
    render(<CarCard car={mockCar} />);

    // Find the card and click it
    const card = screen
      .getByText("View Details →")
      .closest("div").parentElement;
    fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith("/cars/1");
  });

  it("shows the view details button", () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText("View Details →")).toBeInTheDocument();
  });

  it("renders featured label when car is featured", () => {
    const featuredCar = { ...mockCar, featured: true };
    render(<CarCard car={featuredCar} />);

    expect(screen.getByText("FEATURED")).toBeInTheDocument();
  });
});
