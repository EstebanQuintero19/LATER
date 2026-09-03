import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/store';

/** `useDispatch` tipado con los thunks de la app. */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** `useSelector` tipado con `RootState`. */
export const useAppSelector = useSelector.withTypes<RootState>();
