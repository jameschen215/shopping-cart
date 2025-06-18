// @/lib/hooks.ts

import { AuthContext } from '@/context/auth-context';
import { CartContext } from '@/context/cart-context';
import { ThemeProviderContext } from '@/context/theme-context';
import { useContext, useEffect, useState } from 'react';
import { matchPath, useNavigate, useNavigation } from 'react-router-dom';
import type { LocalCartType, ProductType } from './types';
import { toast } from 'sonner';

import { getCart, getProduct } from '@/services/api';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used inside AuthProvider!');

  return context;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) throw new Error('useCart must be used inside CartProvider!');

  return context;
}

export function useStayOnRoute(pattern: string) {
  const navigation = useNavigation();

  return (
    navigation.state === 'loading' &&
    matchPath(pattern, navigation.location.pathname ?? '') !== null
  );
}

export function useAddToCart() {
  const { user } = useAuth();
  const { setCartItems } = useCart();
  const navigate = useNavigate();

  function addToCart(product: ProductType, count: number) {
    if (!user) {
      toast.info('You should sign in to get your cart.', {
        action: {
          label: 'Sign in',
          onClick: () => navigate('/login'),
        },
      });

      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + count }
            : item,
        );
      } else {
        return [...prev, { product, quantity: count }];
      }
    });

    toast.success('Item has been added to cart.', {
      action: {
        label: 'Go to Cart',
        onClick: () => navigate('/cart'),
      },
    });
  }

  return { addToCart };
}

export function useCartInitializer() {
  const [cartItems, setCartItems] = useState<LocalCartType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get user from useAuth to make sure the cart page is re-rendered
  // when the user is changing;
  // If you get user directly from storage - `const user = getStoredUser()`,
  // it won't trigger page re-rendering!!
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    async function createCartItems(id: number) {
      try {
        setIsLoading(true);

        const cart = await getCart(id);

        const products = await Promise.all(
          cart.products.map(async ({ productId, quantity }) => {
            const product = await getProduct(productId);
            return { product, quantity };
          }),
        );

        setCartItems(products);
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    }

    createCartItems(user.id);
  }, [user?.id, user]); //  re-render cart page when user id is changed

  return { cartItems, setCartItems, isLoading };
}
