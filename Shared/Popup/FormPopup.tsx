'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomScrollBar from '../components/CustomScrollBar';
import { setClearForm } from '../Redux/ReduxSlices/uiSlice';
import { useAppSelector } from '@/hooks/useReduxHook';
import { useWebSocket } from '../Socket/WebSocketContext';

interface IRequestPayload {
  action: string;
  type: string;
  payload: any;
  demo?: any;
}

interface IFormPopupProps {
  disableEnter?: boolean;
  children: React.ReactNode;
  handleSubmit?: any;
  onSubmit?: Function;
  isCenter?: boolean;
  hideFooter?: boolean;
  isAdd?: boolean;
  edit?: boolean;
  isBack?: boolean;
  item?: any;
  onEditClick?: (item: any) => void;
  onShow?: Function;
  route?: string;
  addTitle?: string;
  type?: string;
  titleButton?: boolean;
  handleOpen?: Function | string;
  modalName?: string;
  titleClassName?: string;
  loader?: boolean;
  className?: string;
  bodyClassName?: string;
  formTitle?: string | React.ReactNode;
  fullWidth?: boolean;
  autoHeight?: boolean;
  content: {
    title: string;
    submit?: string;
    close?: string;
    key?: string;
    attemptTitle?: string;
  };
  showAttempt?: boolean;
  showTitle?: boolean; // NEW: show content.title in top-left corner
  multiSubmit?: {
    callBack: (data: any) => void;
    label: string;
    className?: string;
  }[];
  reset?: Function;
  loader_action?: string[];
  loader_action_reset?: string[];
  initialRequest?: any[];
  footerAction?: Function;
  disable?: boolean;
  request?: IRequestPayload;
  pageTitle?: string;
  pageNumber?: string;
  onClose?: () => void;
  callBackClose?: () => void;
  showHeader?: Function;
  isLoader?: boolean;
  closeBtn?: boolean;
  isDownloadPdf?: boolean;
  data?: any;
  style?: any;
  footerAlign?: 'center' | 'end' | 'start';
  buttonWidth?: string;
  buttonClassName?: string;
  headerContent?: React.ReactNode;
  filters?: React.ReactNode;
  headerContentClassName?: string;
}

const FormPopup: React.FC<IFormPopupProps> = props => {
  const uiSliceData = useAppSelector(state => state.ui);
  const [loaderLabel, setLoaderLabel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { sendMessage, isConnected } = useWebSocket();
  const { clearForm, formLoader } = uiSliceData;

  useEffect(() => {
    if (clearForm?.name === props.content?.title) {
      // Lock background scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll when popup closes
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [clearForm?.name, props.content?.title]);

  useEffect(() => {
    if (props?.initialRequest && clearForm?.status !== 'hide' && isConnected) {
      props.initialRequest.forEach(item => sendMessage('action', item));
    }
  }, [isConnected, clearForm?.status]);

  useEffect(() => {
    if (clearForm?.name === props.content?.title) {
      props.onShow?.(clearForm);
      if (isConnected && props.request) sendMessage('action', props.request);
    }
  }, [clearForm?.name, isConnected]);

  const handleFormSubmit = (e: React.FormEvent, label?: string) => {
    e.preventDefault();
    setLoaderLabel(label || null);

    if (props.handleSubmit && props.onSubmit) {
      props.handleSubmit(props.onSubmit)();
      return;
    }

    if (props.onSubmit && !props.handleSubmit) {
      props.onSubmit();
      return;
    }

    if (props.multiSubmit?.length) {
      props.multiSubmit.forEach(item => {
        if (item.label === label) {
          if (props.handleSubmit) {
            props.handleSubmit(item.callBack)();
          } else {
            item.callBack(undefined);
          }
        }
      });
    }
  };

  const onClearForm = () => {
    dispatch(setClearForm({ url: null, name: '', status: 'hide', key: '' }));
    props.reset?.();
    props.onClose?.();
    props.callBackClose?.();
  };

  const callShowLoader = () => {
    if (
      formLoader?.flag &&
      formLoader?.name === 'FORM_POPUP' &&
      props.isLoader
    ) {
      return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-300/40">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      );
    }
  };

  const callKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (props.disableEnter && e.key === 'Enter') e.preventDefault();
  };

  if (clearForm?.name !== props.content?.title) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`relative rounded-xl shadow-lg ${props.className || 'bg-white'} ${props.isCenter ? 'mx-auto' : ''} `}
      >
        {callShowLoader()}
        <div
          className={`flex items-center justify-between py-1 ${props.titleClassName ?? ''} `}
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-2">
            {props.isBack && (
              <button
                onClick={() =>
                  dispatch(
                    setClearForm({
                      url: null,
                      name: '',
                      status: 'hide',
                      key: '',
                    }),
                  )
                }
                className="rounded p-1 hover:bg-gray-100"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            {props.showTitle && (
              <div className="text-lg font-semibold">{props.content.title}</div>
            )}

            {props.showAttempt && (
              <div className="text-lg font-semibold text-gray-900">
                {props.content.attemptTitle}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {Array.isArray(props.filters) && (
              <div className="filter900 flex items-center gap-2">
                {props?.filters?.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            )}
            {props.headerContent && (
              <div className={`${props.headerContentClassName ?? ''}`}>
                {props.headerContent}
              </div>
            )}
            {props.closeBtn && (
              <button
                onClick={onClearForm}
                className="rounded p-1 text-gray-500 transition hover:cursor-pointer hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <CustomScrollBar style={props?.style} hideHorizontal hideVertical>
          {props.handleSubmit && props.onSubmit ? (
            <form
              ref={formRef}
              onSubmit={handleFormSubmit}
              onKeyDown={callKeyDown}
            >
              {props.children}
            </form>
          ) : (
            props.children
          )}
        </CustomScrollBar>

        {!props.hideFooter && (
          <div
            className={`flex items-center gap-3 rounded-b-xl bg-white py-3 pt-5 ${
              props.footerAlign === 'end'
                ? 'justify-end'
                : props.footerAlign === 'start'
                  ? 'justify-start'
                  : 'justify-center'
            }`}
          >
            {props.multiSubmit?.map(btn => (
              <Button
                key={btn.label}
                onClick={e => handleFormSubmit(e, btn.label)}
                disabled={props.disable || loading || props.loader}
                className={`${props.buttonWidth ?? 'px-4 py-2'} text-sm ${props.buttonClassName ?? ''}`}
              >
                {loading && loaderLabel === btn.label && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {btn.label}
              </Button>
            ))}

            {props.content.submit && props.onSubmit && (
              <Button
                onClick={handleFormSubmit}
                disabled={props.disable || loading || props.loader}
                className={`bg-primary font-opensans-semibold rounded-sm text-sm text-white ${props.buttonWidth ?? 'w-1/2'} ${props.buttonClassName ?? ''}`}
              >
                {(loading || props.loader) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {props.content.submit}
              </Button>
            )}

            {props.content.close && (
              <Button
                variant="outline"
                onClick={onClearForm}
                disabled={loading || props.loader}
                className={`bg-secondary rounded-sm text-sm text-white ${props.buttonWidth ?? 'w-1/2'} ${props.buttonClassName ?? ''}`}
              >
                {props.content.close}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPopup;
