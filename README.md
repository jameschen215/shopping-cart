# Project: Shopping Cart

## What I've learned

### How to change base font family in tailwindcss

Add this lines into your global.css file.

```CSS
@layer base {
  html {
    font-family: "Proxima Nova", system-ui, sans-serif;
  }
}
```

### Vitest + TypeScript Path Alias Issue in VSCode

**The Problem:**
Even though my tests using `@` alias (like `@/routes/layout`) worked with Vitest, VSCode still showed an error:

```lua
Cannot find module '@/routes/layout' or its corresponding type declarations.
```

This happened because VSCode's TypeScript language service does not automatically read `vite.config.ts` or project references in `tsconfig.json`. It only uses the closest `tsconfig` that includes the current file.

✅ **The Solution**

1. Define path aliases in both tsconfig.json and tsconfig.app.json:

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

2. Make sure the test files are included in the active tsconfig:

   - Option A: Add `"test"` to the `include` array in `tsconfig.app.json`:

     ```json
     "include": ["src", "test"]
     ```

   - Option B (cleaner): Create a new `tsconfig.test.json`:

     ```json
     {
       "extends": "./tsconfig.app.json",
       "include": ["test"]
     }
     ```

     Then update your main tsconfig.json:

     ```json
     "references": [
        { "path": "./tsconfig.app.json" },
        { "path": "./tsconfig.node.json" },
        { "path": "./tsconfig.test.json" }
      ]
     ```

3. Restart TS Server in VSCode (`Ctrl + Shift + P` → “TypeScript: Restart TS Server”)

### Image Fitting Inside a Fixed-Size Card (TailwindCSS)

**GOAL:** Make an image completely fill a fixed-size card:

- If there's space on the sides, the image should be full width.
- Otherwise, it should be full height.

**SOLUTION:** TailwindCSS + HTML Solution

```html
<div class="h-64 w-64 overflow-hidden">
  <img src="your-image.jpg" class="h-full w-full object-cover" />
</div>
```

### What does `end` mean in `<NavLink>`?

In React Router, the `end` prop tells the link to match exactly — it’s like saying:

> “Only mark this link as active if the current URL is exactly equal to the `to` prop.”

- If your URL is `/products/category/jewelry` without `end`, then this code - `<NavLink to="/products">` will be considered active, because `/products` is a prefix of `/products/category/jewelry`.

- If your URL is `/products` with `end` - `<NavLink to="/products" end={to === '/products'}>`. Now it only matches `/products` exactly, and won't be active for `/products/category/...`.

When to use end?
✅ Use it for parent routes like `/products`, `/settings`, etc.

❌ Don’t use it when you want the link to stay active for subroutes.

### How to make shadcn/ui NavigationMenu take up the full width of its parent?

Use arbitrary properties from Tailwindcss - `<NavigationMenu className="w-full [&>div]:!w-full">` to override the `div` with inline-style from `NavigationMenuList`, which is `<div style='position: relative'>...</div>`:

```tsx
<NavigationMenu
  aria-label="Category navigation"
  className="w-full max-w-full [&>div]:!w-full"
>
  <NavigationMenuList className="flex w-full justify-between">
    {CATEGORIES.map(({ id, label, to }) => (
      <NavigationMenuItem key={id}>
        <NavLink to={to} end={to === "/products"}>
          {({ isActive }) => (
            <NavigationMenuLink
              asChild
              className={cn(
                "capitalize hover:bg-transparent hover:underline hover:underline-offset-4",
                isActive && "underline underline-offset-4",
              )}
            >
              <span>{label}</span>
            </NavigationMenuLink>
          )}
        </NavLink>
      </NavigationMenuItem>
    ))}
  </NavigationMenuList>
</NavigationMenu>
```

### Handling Redirects in Toast Actions (shadcn/ui + React Router)

- **Problem:**
  The redirect() function didn't work when used inside a toast action callback.

- **Why:**
  redirect() is meant for use in React Router loaders or actions — not inside client-side event handlers.

- **Solution:**
  Use useNavigate() from React Router to imperatively navigate in event handlers instead.

- **Working Example:**

```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

toast.success("Item has been added to your cart.", {
  action: {
    label: "Go to Cart",
    onClick: () => navigate("/cart"),
  },
});
```

- **Bonus:**
  This makes your app feel more dynamic and user-friendly. 🔥

### Don't wrap a complex component inside a Link

Wrapping a complex component like a Card inside a React Router ``can cause semantic and accessibility issues because:

- The `<Link>` renders as an `<a>` tag.

- Nesting interactive elements inside an `<a>` (like buttons or other links) is invalid HTML.

- It can cause unexpected behavior or warnings in browsers and screen readers.

**How to solve it:**
Instead of wrapping the entire Card in a <Link>, you can:

1. Render the Card as a button or div.

2. Use React Router's useNavigate hook to programmatically navigate on click.

Example code:

```tsx
import { useNavigate } from "react-router-dom";

export default function ProductCards({
  products,
}: {
  products: ProductType[];
}) {
  const navigate = useNavigate();

  return (
    <div className="my-6 grid w-full [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-5">
      {products.map((product) => (
        <Card
          key={product.id}
          role="button"
          tabIndex={0}
          onClick={() => navigate(`/products/${product.id}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate(`/products/${product.id}`);
            }
          }}
          className="cursor-pointer gap-6 rounded-sm border-none px-5 shadow-lg transition-transform duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          {/* ...rest of your Card content */}
        </Card>
      ))}
    </div>
  );
}
```

### Vitest Module Mocking - Variable References and Hoisting

**The Problem:**
When mocking modules in Vitest, using external variables in the mock factory doesn't work as expected.

**Key Concept:**
`vi.mock()` is hoisted - it runs before other code, including variable declarations.

**What Doesn't Work:**

```TypeScript
const mockUseTheme = vi.fn();  // Declared after mock runs

vi.mock("@/lib/hooks", () => ({
  useTheme: mockUseTheme,      // undefined when factory executes
}));
```

**What Works:**

```TypeScript
// Option 1: Inline mock creation
vi.mock("@/lib/hooks", () => ({
  useTheme: vi.fn(),
}));
const mockUseTheme = useTheme as ReturnType<typeof vi.fn>;
// This line below works as well
// const mockUseTheme = useTheme as unknown as Mock;

// Option 2: Using vi.hoisted()
const mockUseTheme = vi.hoisted(() => vi.fn());

vi.mock("@/lib/hooks", () => ({
  useTheme: mockUseTheme,
}));

// Option 3: Function wrapper (closure) - accessed when function is called
const mockUseTheme = vi.fn();
vi.mock("@/lib/hooks", () => ({
  useTheme: () => mockUseTheme(),  // Wrap in arrow function
}));
```

### Mock Functions vs Mock Return Values - When to Use Parentheses

**The Rule:**
Whether to use parentheses `()` depends on what the hook should return:

**Pattern 1: Hook Returns a Function**

```TypeScript
// Returns the mock function itself, don't run/call it
useNavigate: () => mockUseNavigate,

// Then you can test if it have been called
expect(mockUseNavigate).toHaveBeenCalledWith('/')
```

**Pattern 2: Hook Returns Data/Object**

```TypeScript
// Calls the mock function and returns result - the theme context
useTheme: () => mockUseTheme(),

// Then you do this line:
mockUseTheme.mockReturnValue({theme: "light", setTheme});
// It means that mockUseTheme is just the theme context -
// context.mockReturnValue(...)
```

### Async vs Sync Mock Factories - Variable Reference

**The Problem:**
External variable references in `vi.mock()` behave differently with `async` vs `sync` factories.

**What Doesn't Work:**

```TypeScript
const mockGetProduct = vi.fn();

vi.mock("@/services/api", () => ({  // Sync factory
  getProduct: () => mockGetProduct(),  // ❌ Variable not accessible
}));
```

**What Works:**

```TypeScript
const mockGetProduct = vi.fn();
vi.mock("@/services/api", async () => {  // Async factory

  const actual = await vi.importActual("@/services/api");
  return {
    ...actual,
    getProduct: () => mockGetProduct(),  // ✅ Variable accessible
  };
});
```

**Key Insight:**
_Async mock factories_ seem to handle external variable references differently than sync factories:

- Sync factory: Stricter variable access during hoisting.
- Async factory: More lenient variable access, possibly due to timing or `vi.importActual()` context.

**Possible Reasons:**

1. _Timing_: Async factories execute later, giving variables time to initialize
2. _Context_: `vi.importActual()` creates different module loading context
3. _Internal processing_: Vitest handles `async/sync` factories differently during hoisting

**Practical Rule:**
When using external variables in mock factories:

- Use async factory with `vi.importActual()` for more reliable variable access
- Or use `vi.hoisted()` for guaranteed availability
- Avoid sync factories with _external variables_

This is a subtle Vitest behavior that can cause mysterious test failures!

<!-- --- divider --- -->

# Acknowledge

## Teslariu Mihai

Photo by <a href="https://unsplash.com/@mihaiteslariu0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Teslariu Mihai</a> on <a href="https://unsplash.com/photos/a-woman-wearing-a-hat-and-a-jacket-lvOy6kAaXXM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## Mubariz Mehdizadeh - for men

Photo by <a href="https://unsplash.com/@mehdizadeh?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mubariz Mehdizadeh</a> on <a href="https://unsplash.com/photos/man-looking-sideways-t3zrEm88ehc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## YY TEOH - for kids

Photo by <a href="https://unsplash.com/@teacheryy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">YY TEOH</a> on <a href="https://unsplash.com/photos/a-little-girl-in-a-white-dress-playing-with-a-frisbee-PK_SHakVl04?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
