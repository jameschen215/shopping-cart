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
