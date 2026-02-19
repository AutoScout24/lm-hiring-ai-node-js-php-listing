import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Setup router mock implementation
    useRouter.mockImplementation(() => ({
      push: mockPush,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logo and brand name", () => {
    render(<Header />);
    const logoImage = screen.getByAltText("Suzuki");
    const brandName = screen.getByText("Suzuki");

    expect(logoImage).toBeInTheDocument();
    expect(brandName).toBeInTheDocument();
  });

  it("navigates to home page when logo is clicked", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link");

    fireEvent.click(logoLink);

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("renders navigation menu items", () => {
    render(<Header />);

    expect(screen.getAllByText("New Cars")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Used Cars")[0]).toBeInTheDocument();
    expect(screen.getAllByText("News & Reviews")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Videos")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Car Types")[0]).toBeInTheDocument();
  });

  it("renders login/register button", () => {
    render(<Header />);

    expect(screen.getAllByText("Login / Register")[0]).toBeInTheDocument();
  });
});
