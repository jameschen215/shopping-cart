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

# Acknowledge

## Teslariu Mihai

Photo by <a href="https://unsplash.com/@mihaiteslariu0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Teslariu Mihai</a> on <a href="https://unsplash.com/photos/a-woman-wearing-a-hat-and-a-jacket-lvOy6kAaXXM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## Mubariz Mehdizadeh - for men

Photo by <a href="https://unsplash.com/@mehdizadeh?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mubariz Mehdizadeh</a> on <a href="https://unsplash.com/photos/man-looking-sideways-t3zrEm88ehc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## YY TEOH - for kids

Photo by <a href="https://unsplash.com/@teacheryy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">YY TEOH</a> on <a href="https://unsplash.com/photos/a-little-girl-in-a-white-dress-playing-with-a-frisbee-PK_SHakVl04?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
