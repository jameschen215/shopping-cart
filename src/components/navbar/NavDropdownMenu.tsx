import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/hooks";
import type { UserType } from "@/lib/types";

import { CircleUserRound, LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function NavDropdownMenu() {
  const { user, logout } = useAuth();
  const currentUser: UserType | null = user ? user : null;
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          aria-label="User menu"
          className="hover:bg-transparent"
        >
          {currentUser ? (
            <div className="bg-foreground/5 rounded-full p-1 text-xs">
              {currentUser.name.firstname.slice(0, 1).toUpperCase()}
              {currentUser.name.lastname.slice(0, 1).toUpperCase()}
            </div>
          ) : (
            <CircleUserRound
              className="size-5"
              aria-hidden="true"
              strokeWidth={1.5}
              data-testid="account-user-icon"
            />
          )}{" "}
        </Button>
      </DropdownMenuTrigger>

      {/* Logged in */}
      {currentUser ? (
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              aria-label="Sign out"
              onClick={() => {
                logout();
                toast.warning("You are signed out.");
                navigate("/");
              }}
            >
              <LogOut />
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link to={"/login"} className="cursor-pointer" aria-label="Sign in">
              <LogIn />
              Sign in
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
