'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type profileImg = {
  profileImg: string;
};

type UiState = {
  clearForm: { url: any | null; status: string; name: string; key?: string };
  formLoader: { flag: boolean; name: string };
  loading: boolean;
  accessToken: string | null;
};

const initialState: UiState = {
  clearForm: { url: null, status: 'hide', name: '', key: '' },
  formLoader: { flag: false, name: '' },
  loading: false,
  accessToken:
    'iuygtfrdfyguhiou897y6t5rtyfhjbknlhiudrtcfgjnkiocfgjknidrtjilouertduhio6resdfxgjlitderuhygfcvbhnjmkl',
};

const authslice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authslice.actions;
export const { reducer: authReducer } = authslice;
