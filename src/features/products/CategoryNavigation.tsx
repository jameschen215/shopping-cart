import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export default function CategoryNavigation() {
  return (
    <NavigationMenu aria-label="Category navigation">
      <NavigationMenuList>
        {CATEGORIES.map(({ id, label, to }) => (
          <NavigationMenuItem key={id}>
            <NavLink to={to}>
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
  );
}
