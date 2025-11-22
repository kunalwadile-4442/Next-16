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
      className="w-[95%] sm:w-[450px] px-4 py-4 bg-white overflow-hidden mx-auto"
      style={{ height: newheight || '180px' }}
      buttonClassName="w-full hover:text-white h-12"
      titleClassName="bg-white"
    >
      <div className="w-full h-full flex flex-col justify-start px-1 items-center text-center">
        <div className="w-25 h-25  rounded-full flex items-center justify-center mb-3">
          <img
            src={icon}
            className="h-25 w-25 "
            alt="popup-icon"
          />
        </div>
        <h2
          className={cn(
            'text-xl font-opensans-semibold text-dark text-balance mb-2',
            classNameTitle,
          )}
        >
          {modalTitle}
        </h2>
        <p
          className={cn(
            'text-[#646767] font-opensans-regular px-4 mb-3 text-15 leading-relaxed',
            classNameSubText,
          )}
        >
          {description}
        </p>
        {rows?.length > 0 && (
          <div className="w-full bg-[#1A5E631A] rounded-sm p-4 text-sm">
            {rows?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center font-opensans-regular py-2 border-b border-[#D6DDDD] last:border-none text-[#2D3436]"
              >
                <span>{item?.label}</span>
                <span className="font-opensans-regular text-[#2D3436]">
                  {item?.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4 w-full mt-3">
          <button
            className="flex-1 h-14 cursor-pointer rounded-sm bg-[#2D3436] text-white"
            onClick={handleSecondary}
          >
            {secondaryText}
          </button>
          <button
            className="flex-1 h-14 cursor-pointer rounded-sm bg-[#aa6435] text-white"
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
