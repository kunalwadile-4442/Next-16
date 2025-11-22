'use client';

import { useCallback } from 'react';

import { setClearForm } from '@/Shared/Redux/ReduxSlices/uiSlice';
import { useAppDispatch} from './useReduxHook';

type ModalStatus = 'show' | 'hide';

interface ModalStatePayload {
  name?: string;
  url?: unknown;
  key?: string;
  status?: ModalStatus;
}

interface OpenModalPayload extends Omit<ModalStatePayload, 'name'> {
  name: string;
}

export const useModalController = () => {
  const dispatch = useAppDispatch();

  const setModalState = useCallback(
    (payload: ModalStatePayload) => {
      dispatch(
        setClearForm({
          url: payload?.url ?? null,
          name: payload?.name ?? '',
          status: payload?.status ?? 'show',
          key: payload?.key ?? '',
        }),
      );
    },
    [dispatch],
  );

  const openModal = useCallback(
    (payload: OpenModalPayload) => {
      setModalState({ ...payload, status: 'show' });
    },
    [setModalState],
  );

  const closeModal = useCallback(() => {
    setModalState({ status: 'hide', name: '', url: null, key: '' });
  }, [setModalState]);

  return { openModal, closeModal, setModalState };
};
