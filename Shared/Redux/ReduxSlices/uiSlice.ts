'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type profileImg = {
  profileImg: string;
};

type UiState = {
  clearForm: { url: any | null; status: string; name: string; key?: string };
  formLoader: { flag: boolean; name: string };
  loading: boolean;
};

const initialState: UiState = {
  clearForm: { url: null, status: 'hide', name: '', key: '' },
  formLoader: { flag: false, name: '' },
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setClearForm: (state, action: PayloadAction<UiState['clearForm']>) => {
      state.clearForm = action.payload;
    },
    setFormLoader: (state, action: PayloadAction<UiState['formLoader']>) => {
      state.formLoader = action.payload;
    },
    setLoader(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setClearForm, setFormLoader, setLoader } = uiSlice.actions;
export const { reducer: uiReducer } = uiSlice;
