import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { RootState, AppDispatch } from './store';
import * as TodoActionCreators from './todos.action-creators';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(TodoActionCreators, dispatch);
};
