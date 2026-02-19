import "@testing-library/jest-dom";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    
    return <img {...props} />;
  },
}));

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));
