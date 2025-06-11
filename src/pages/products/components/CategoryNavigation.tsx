import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { PRODUCTS_PAGE_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export default function CategoryNavigation() {
  return (
    <NavigationMenu
      aria-label="Category navigation"
      className="w-full max-w-3xl md:max-w-fit [&>div]:!w-full"
    >
      <NavigationMenuList className="flex w-full justify-between">
        {PRODUCTS_PAGE_CATEGORIES.map(({ id, label, to }) => (
          <NavigationMenuItem key={id}>
            <NavLink to={to} end={to === "/products"}>
              {({ isActive }) => (
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "text-foreground/75 capitalize hover:bg-transparent hover:underline hover:underline-offset-4",
                    isActive && "text-foreground",
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
