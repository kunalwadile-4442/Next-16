import { combineReducers } from 'redux';
import { counterReducer } from '@/components/home/redux/counterSlice';
import { uiReducer } from './ReduxSlices/uiSlice';
import { authReducer } from './ReduxSlices/authSlice';

// Base reducer
const appReducer = combineReducers({
  counter: counterReducer,
  ui: uiReducer,
  auth: authReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT_USER') {
    localStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;
