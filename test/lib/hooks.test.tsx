import { AuthContext } from '@/context/auth-context';
import { CartContext } from '@/context/cart-context';
import { useAddToCart } from '@/lib/hooks';
import { renderHook } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('sonner', () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
  },
}));

describe('hooks', () => {
  describe('useAddToCart', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should add new item to cart', () => {
      const setCartItems = vi.fn();
      const mockNavigate = vi.fn();
      (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);

      const mockUser = {
        id: 1,
        username: 'fake-user',
        email: 'fakeuser@example.com',
        name: { firstname: 'Fake', lastname: 'User' },
        address: {
          city: 'Fake city',
          street: 'Fake ST',
          number: 12345678,
          zipcode: '123',
        },
        phone: '123-456-7890',
      };

      const mockProduct = {
        id: 101,
        title: 'Product X',
        price: 10,
        description: 'test',
        category: 'x',
        image: '',
        rating: { rate: 0, count: 0 },
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthContext.Provider
          value={{
            token: 'token',
            user: mockUser,
            login: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <CartContext.Provider
            value={{ cartItems: [], setCartItems, isLoading: false }}
          >
            <MemoryRouter>{children}</MemoryRouter>
          </CartContext.Provider>
        </AuthContext.Provider>
      );

      const { result } = renderHook(() => useAddToCart(), { wrapper });

      result.current.addToCart(mockProduct, 2);

      expect(setCartItems).toHaveBeenCalledWith(expect.any(Function));
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringContaining('Item has been added'),
        expect.any(Object),
      );
    });

    it('should show toast when user is not logged in', () => {
      const setCartItems = vi.fn();
      const mockNavigate = vi.fn();
      (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);

      const mockProduct = {
        id: 1,
        title: 'A',
        price: 1,
        description: '',
        category: '',
        image: '',
        rating: { rate: 5, count: 10 },
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthContext.Provider
          value={{ token: null, user: null, login: vi.fn(), logout: vi.fn() }}
        >
          <CartContext.Provider
            value={{ cartItems: [], setCartItems, isLoading: false }}
          >
            <MemoryRouter>{children}</MemoryRouter>
          </CartContext.Provider>
        </AuthContext.Provider>
      );

      const { result } = renderHook(() => useAddToCart(), { wrapper });

      result.current.addToCart(mockProduct, 1);

      expect(toast.info).toHaveBeenCalledWith(
        expect.stringContaining('sign in'),
        expect.any(Object),
      );

      // Click the toast action
      const [, options] = (toast.info as Mock).mock.calls[0];
      options.action.onClick();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
