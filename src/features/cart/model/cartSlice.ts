import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import { Product } from '@/features/catalog/types';

export interface CartLine {
  productId: string;
  name: string;
  category: string;
  unitPrice: number;
  currency: Product['currency'];
  quantity: number;
  accentColor: string;
}

export interface CartState {
  lines: Record<string, CartLine>;
}

const initialState: CartState = { lines: {} };

const MAX_QTY = 99;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>,
    ) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.lines[product.id];
      const nextQty = Math.min((existing?.quantity ?? 0) + quantity, MAX_QTY);
      state.lines[product.id] = {
        productId: product.id,
        name: product.name,
        category: product.category,
        unitPrice: product.price,
        currency: product.currency,
        accentColor: product.accentColor,
        quantity: nextQty,
      };
    },
    setQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const line = state.lines[action.payload.productId];
      if (!line) return;
      const q = Math.max(0, Math.min(action.payload.quantity, MAX_QTY));
      if (q === 0) delete state.lines[action.payload.productId];
      else line.quantity = q;
    },
    removeItem(state, action: PayloadAction<string>) {
      delete state.lines[action.payload];
    },
    clearCart(state) {
      state.lines = {};
    },
  },
});

export const { addItem, setQuantity, removeItem, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// ---- Selectores -------------------------------------------------------------
const selectLinesMap = (state: RootState) => state.cart.lines;

export const selectCartLines = createSelector([selectLinesMap], (lines) =>
  Object.values(lines).sort((a, b) => a.name.localeCompare(b.name)),
);

export const selectCartCount = createSelector([selectCartLines], (lines) =>
  lines.reduce((sum, l) => sum + l.quantity, 0),
);

export const selectCartSubtotal = createSelector([selectCartLines], (lines) =>
  lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0),
);

export const selectCartQuantityFor = (productId: string) =>
  createSelector([selectLinesMap], (lines) => lines[productId]?.quantity ?? 0);
