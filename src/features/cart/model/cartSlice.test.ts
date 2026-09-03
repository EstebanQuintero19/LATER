import type { RootState } from '@/store';
import { Product } from '@/features/catalog/types';

import {
  addItem,
  cartReducer,
  clearCart,
  removeItem,
  selectCartCount,
  selectCartSubtotal,
  setQuantity,
} from './cartSlice';

const product: Product = {
  id: 'prd_1',
  name: 'Encimera de cuarzo',
  category: 'Superficies',
  price: 1_000_000,
  currency: 'COP',
  stock: 5,
  supports3dScan: true,
  supportsAr: true,
  accentColor: '#000',
};

const asRoot = (cart: ReturnType<typeof cartReducer>) =>
  ({ cart }) as RootState;

describe('cartSlice', () => {
  it('añade un producto y acumula cantidad al repetir', () => {
    let state = cartReducer(undefined, addItem({ product }));
    state = cartReducer(state, addItem({ product, quantity: 2 }));

    expect(state.lines[product.id].quantity).toBe(3);
    expect(selectCartCount(asRoot(state))).toBe(3);
    expect(selectCartSubtotal(asRoot(state))).toBe(3_000_000);
  });

  it('limita la cantidad máxima a 99', () => {
    const state = cartReducer(undefined, addItem({ product, quantity: 500 }));
    expect(state.lines[product.id].quantity).toBe(99);
  });

  it('elimina la línea cuando la cantidad baja a 0', () => {
    let state = cartReducer(undefined, addItem({ product }));
    state = cartReducer(
      state,
      setQuantity({ productId: product.id, quantity: 0 }),
    );
    expect(state.lines[product.id]).toBeUndefined();
  });

  it('removeItem y clearCart vacían el carrito', () => {
    let state = cartReducer(undefined, addItem({ product }));
    state = cartReducer(state, removeItem(product.id));
    expect(Object.keys(state.lines)).toHaveLength(0);

    state = cartReducer(undefined, addItem({ product }));
    state = cartReducer(state, clearCart());
    expect(Object.keys(state.lines)).toHaveLength(0);
  });
});
