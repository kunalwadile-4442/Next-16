'use client';

import { cn } from '@/Shared/lib/utils';
import FormPopup from './FormPopup';
import { setClearForm } from '../Redux/ReduxSlices/uiSlice';
import { useAppDispatch } from '@/hooks/useReduxHook';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface RowItem {
  label: string;
  value: string | number;
}
interface CommonPopupProps {
  modalTitle?: string;
  description?: string;
  subText?: string;
  icon?: string;
  buttonText?: string;
  redirectUrl?: string;
  onClose?: () => void;
  classNameTitle?: string;
  newheight?: string;
  classNameSubText?: string;
  rows?: RowItem[];
  primaryText?: string;
  secondaryText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

const LogoutSucess = ({
  modalTitle = 'Default Title',
  description = 'Please complete the required action.',
  icon,
  redirectUrl,
  onClose,
  classNameTitle,
  newheight,
  classNameSubText,
  rows = [],
  primaryText = 'OK',
  secondaryText = 'Cancel',
  onPrimary,
  onSecondary,
}: CommonPopupProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClose = useCallback(() => {
    onClose?.();
    dispatch(setClearForm({ url: null, name: '', status: 'hide', key: '' }));
  }, [dispatch, onClose]);

  const handlePrimary = useCallback(() => {
    if (onPrimary) {
      onPrimary();
    } else if (redirectUrl) {
      router.push(redirectUrl);
    }
    handleClose();
  }, [handleClose, onPrimary, redirectUrl, router]);

  const handleSecondary = useCallback(() => {
    onSecondary?.();
    handleClose();
  }, [handleClose, onSecondary]);

  return (
    <FormPopup
      content={{
        title: modalTitle,
      }}
      hideFooter={true}
      className="mx-auto w-[95%] overflow-hidden bg-white px-4 py-4 sm:w-[450px]"
      style={{ height: newheight || '180px' }}
      buttonClassName="w-full hover:text-white h-12"
      titleClassName="bg-white"
    >
      <div className="flex h-full w-full flex-col items-center justify-start px-1 text-center">
        <div className="mb-3 flex h-25 w-25 items-center justify-center rounded-full">
          <img src={icon} className="h-25 w-25" alt="popup-icon" />
        </div>
        <h2
          className={cn(
            'font-opensans-semibold text-dark mb-2 text-xl text-balance',
            classNameTitle,
          )}
        >
          {modalTitle}
        </h2>
        <p
          className={cn(
            'font-opensans-regular text-15 mb-3 px-4 leading-relaxed text-[#646767]',
            classNameSubText,
          )}
        >
          {description}
        </p>
        {rows?.length > 0 && (
          <div className="w-full rounded-sm bg-[#1A5E631A] p-4 text-sm">
            {rows?.map((item, index) => (
              <div
                key={index}
                className="font-opensans-regular flex items-center justify-between border-b border-[#D6DDDD] py-2 text-[#2D3436] last:border-none"
              >
                <span>{item?.label}</span>
                <span className="font-opensans-regular text-[#2D3436]">
                  {item?.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 flex w-full gap-4">
          <button
            className="h-14 flex-1 cursor-pointer rounded-sm bg-[#2D3436] text-white"
            onClick={handleSecondary}
          >
            {secondaryText}
          </button>
          <button
            className="h-14 flex-1 cursor-pointer rounded-sm bg-[#aa6435] text-white"
            onClick={handlePrimary}
          >
            {primaryText}
          </button>
        </div>
      </div>
    </FormPopup>
  );
};

export default LogoutSucess;
