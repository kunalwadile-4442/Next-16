'use client';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from './storage';
import { rootReducer, RootState } from './combineReducer';

const persistConfig = {
  key: 'nextjs-app',
  storage,
  whitelist: Object.keys(rootReducer({} as any, { type: '' })),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// ---------------- Types ----------------
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
