import { RootState } from '@/Shared/Redux/combineReducer';
import { AppDispatch } from '@/Shared/Redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
