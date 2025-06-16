import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Suspense } from "react";

// Mock page components for simple testing
const MockLandingPage = () => (
  <div data-testid="landing-page">Landing Page</div>
);
const MockProductsPage = () => (
  <div data-testid="products-page">Products Page</div>
);
const MockProductPage = () => (
  <div data-testid="product-page">Product Page</div>
);

const MockCartPage = () => <div data-testid="cart-page">Cart Page</div>;
const MockLoginPage = () => <div data-testid="login-page">Login Page</div>;
const MockErrorPage = () => <div data-testid="error-page">Error Page</div>;

// ✅ Fake auth context with prop injection
function ProtectedRoute({
  isAuthenticated = false,
}: {
  isAuthenticated?: boolean;
}) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// A simplified routes config for testing
const TestRoutes = ({
  isAuthenticated = false,
}: {
  isAuthenticated?: boolean;
}) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<MockLandingPage />} />
      <Route path="/products" element={<MockProductsPage />} />
      <Route path="/products/:productId" element={<MockProductPage />} />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/cart" element={<MockCartPage />} />
      </Route>
      <Route path="/login" element={<MockLoginPage />} />
      <Route path="*" element={<MockErrorPage />} />
    </Routes>
  </Suspense>
);

const renderApp = (path: string, isAuthenticated: boolean = false) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <TestRoutes isAuthenticated={isAuthenticated} />
    </MemoryRouter>,
  );
};

describe("App Routing", () => {
  it("renders landing page on root path", () => {
    renderApp("/");

    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });

  it("renders landing page on /products", () => {
    renderApp("/products");

    expect(screen.getByTestId("products-page")).toBeInTheDocument();
  });

  it("renders landing page on /products/:productId", () => {
    renderApp("/products/1");

    expect(screen.getByTestId("product-page")).toBeInTheDocument();
  });

  it("renders landing page on /login", () => {
    renderApp("/login");

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("renders error page on unknown route", () => {
    renderApp("/random");

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });

  it("redirects unauthenticated user from /cart to /login", () => {
    renderApp("/cart");
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("renders cart page for authenticated user", () => {
    renderApp("/cart", true);
    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
  });
});
