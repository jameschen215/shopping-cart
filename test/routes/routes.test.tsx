import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
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
const MockLoginPage = () => <div data-testid="login-page">Login Page</div>;
const MockErrorPage = () => <div data-testid="error-page">Error Page</div>;

// A simplified routes config for testing
const TestRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<MockLandingPage />} />
      <Route path="/products" element={<MockProductsPage />} />
      <Route path="/products/:productId" element={<MockProductPage />} />
      <Route path="/login" element={<MockLoginPage />} />
      <Route path="*" element={<MockErrorPage />} />
    </Routes>
  </Suspense>
);

const renderApp = (path: string) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <TestRoutes />
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
});
