import BrandAndLogo from '@/components/navbar/BrandAndLogo';
import CartButton from '@/components/navbar/CartButton';
import NavDropdownMenu from '@/components/navbar/NavDropdownMenu';
import ModeToggle from '@/components/navbar/ModeToggle';

export default function Navbar() {
  return (
    <header className="dark:bg-background supports-[backdrop-filter]:dark:bg-background/60 sticky top-0 z-50 mx-auto w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center px-4">
        <BrandAndLogo />

        <div className="flex flex-1 items-center justify-end space-x-2">
          <CartButton />
          <ModeToggle />
          <NavDropdownMenu />
        </div>
      </div>
    </header>
  );
}
