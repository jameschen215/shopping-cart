import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/mode-toggle/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function handleClick() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <Button
      data-testid="mode-toggle"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Sun
          className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          strokeWidth={1.5}
        />
      ) : (
        <Moon
          className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          strokeWidth={1.5}
        />
      )}
    </Button>
  );
}
