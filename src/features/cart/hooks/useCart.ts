import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Product } from '@/features/catalog/types';

import {
  addItem,
  clearCart,
  removeItem,
  selectCartCount,
  selectCartLines,
  selectCartSubtotal,
  setQuantity,
} from '../model/cartSlice';

export function useCart() {
  const dispatch = useAppDispatch();
  const lines = useAppSelector(selectCartLines);
  const count = useAppSelector(selectCartCount);
  const subtotal = useAppSelector(selectCartSubtotal);

  return {
    lines,
    count,
    subtotal,
    isEmpty: lines.length === 0,
    add: (product: Product, quantity?: number) =>
      dispatch(addItem({ product, quantity })),
    setQuantity: (productId: string, quantity: number) =>
      dispatch(setQuantity({ productId, quantity })),
    remove: (productId: string) => dispatch(removeItem(productId)),
    clear: () => dispatch(clearCart()),
  };
}

export function useCartQuantity(productId: string) {
  return useAppSelector((s) => s.cart.lines[productId]?.quantity ?? 0);
}
