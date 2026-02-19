import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CarImageCarousel from "@/components/CarImageCarousel";

describe("CarImageCarousel Component", () => {
  const mockImages = [
    "https://www.prathammotors.com/pm/images/swift/color/1.webp",
    "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/193021/pexels-photo-193021.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  it("renders with default image when no images provided", () => {
    render(<CarImageCarousel make="Maruti" model="Swift" />);

    // When no images are provided, it should show a placeholder
    const image = screen.getByAltText("Maruti Swift - Image 1");
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/car-placeholder-image.webp");
  });

  it("renders first image from the provided images array", () => {
    render(
      <CarImageCarousel images={mockImages} make="Maruti" model="Swift" />
    );

    // Check if image is rendered with correct alt text
    const image = screen.getByAltText("Maruti Swift - Image 1");
    expect(image).toBeInTheDocument();
  });

  it("renders navigation dots for multiple images", () => {
    render(
      <CarImageCarousel images={mockImages} make="Maruti" model="Swift" />
    );

    // With 3 images, we should have 3 navigation dots
    const navDots = screen.getAllByRole("button", { name: /Go to image/i });
    expect(navDots.length).toBe(3);
  });

  it("has navigation buttons when multiple images are provided", () => {
    render(
      <CarImageCarousel images={mockImages} make="Maruti" model="Swift" />
    );

    const prevButton = screen.getByLabelText("Previous image");
    const nextButton = screen.getByLabelText("Next image");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("handles error when image fails to load", () => {
    // Mock implementation of onError for Image component
    const originalError = console.error;
    console.error = jest.fn();

    render(
      <CarImageCarousel
        images={["invalid-image-url"]}
        make="Maruti"
        model="Swift"
      />
    );

    // Simulate the onError event
    const image = screen.getByAltText("Maruti Swift - Image 1");
    fireEvent.error(image);

    // After error, we should see the placeholder
    expect(
      screen.getByText("Maruti Swift image not available")
    ).toBeInTheDocument();

    // Restore console.error
    console.error = originalError;
  });
});
